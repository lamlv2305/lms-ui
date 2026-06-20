import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { mockUser } from "~/store/mock-auth";
import type { Role, User } from "~/types/user";

// Kratos public API, reached same-origin via the vite proxy (see vite.config.ts).
const KRATOS = import.meta.env.VITE_KRATOS_URL ?? "/.ory/kratos";

type KratosIdentity = {
	id: string;
	traits: {
		email?: string;
		name?: string;
		roles?: Role[];
	};
};

// Map a Kratos identity onto our User. Roles drive the sidebar + landing page;
// Kratos has no school object, so id/name stay empty for the POC.
function userFromIdentity(identity: KratosIdentity, fallbackEmail = ""): User {
	const traits = identity.traits;
	return {
		id: identity.id,
		name: traits.name ?? traits.email ?? fallbackEmail,
		email: traits.email ?? fallbackEmail,
		avatar: "",
		school: { id: "", name: "", roles: traits.roles ?? [] },
	};
}

// Pull the csrf_token value out of a browser-flow's ui nodes.
function csrfToken(flow: {
	ui: { nodes: { attributes: { name?: string; value?: string } }[] };
}): string {
	for (const node of flow.ui.nodes) {
		if (node.attributes.name === "csrf_token") return node.attributes.value ?? "";
	}
	return "";
}

// Native form POST so the browser follows Kratos's 303 redirect to the provider.
function submitForm(action: string, fields: Record<string, string>) {
	const form = document.createElement("form");
	form.method = "POST";
	form.action = action;
	for (const [name, value] of Object.entries(fields)) {
		const input = document.createElement("input");
		input.type = "hidden";
		input.name = name;
		input.value = value;
		form.appendChild(input);
	}
	document.body.appendChild(form);
	form.submit();
}

// ---------------------------------------------------------------------------
// Data sources
//
// The auth backend is chosen from the URL: /login?debug=mock, ?debug=staging…
// No ?debug param falls back to "kratos" (the real backend). An unrecognised
// key resolves to nothing, so callers surface "data source not found" instead
// of silently hardcoding a backend. Add a backend by registering it in SOURCES.
// ---------------------------------------------------------------------------

/** What a backend returns on sign-in. accessToken is omitted for cookie sessions. */
type AuthResult = { user: User; accessToken?: string };

type AuthSource = {
	passwordLogin(username: string, password: string): Promise<AuthResult>;
	/** Resolves with a user for in-page backends, or void when it redirects away. */
	oidcLogin(provider: string): Promise<AuthResult | void>;
	syncSession(): Promise<AuthResult | null>;
	logout(accessToken?: string): Promise<void>;
};

const kratosSource: AuthSource = {
	// Password sign-in via Kratos native (API) flow: returns a session_token.
	// No cookies, so it works same-origin through the proxy alone.
	async passwordLogin(identifier, password) {
		const init = await fetch(`${KRATOS}/self-service/login/api`, {
			headers: { Accept: "application/json" },
		});
		if (!init.ok) throw new Error("Could not start login. Try again.");
		const flow = await init.json();

		// Build the action ourselves so it stays same-origin through the proxy,
		// rather than trusting Kratos's externally-configured public URL.
		const res = await fetch(`${KRATOS}/self-service/login?flow=${flow.id}`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Accept: "application/json" },
			body: JSON.stringify({ method: "password", identifier, password }),
		});
		const body = await res.json().catch(() => null);
		if (!res.ok) {
			throw new Error(
				body?.ui?.messages?.[0]?.text ?? "Invalid email or password.",
			);
		}
		return {
			user: userFromIdentity(body.session.identity, identifier),
			accessToken: body.session_token,
		};
	},

	// OIDC needs a browser flow (cookie + redirect), not the API flow. This
	// navigates the page away to the provider and never resolves with a user;
	// the session is picked up by syncSession() on return.
	async oidcLogin(provider) {
		const init = await fetch(`${KRATOS}/self-service/login/browser`, {
			headers: { Accept: "application/json" },
			credentials: "include",
		});
		if (!init.ok) throw new Error("Could not start social login.");
		const flow = await init.json();
		submitForm(`${KRATOS}/self-service/login?flow=${flow.id}`, {
			csrf_token: csrfToken(flow),
			provider,
		});
	},

	async syncSession() {
		const res = await fetch(`${KRATOS}/sessions/whoami`, {
			credentials: "include",
		});
		if (!res.ok) return null;
		const session = await res.json();
		return { user: userFromIdentity(session.identity) };
	},

	async logout(accessToken) {
		if (accessToken) {
			// API-flow session: revoke the session_token.
			await fetch(`${KRATOS}/self-service/logout/api`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ session_token: accessToken }),
			});
			return;
		}
		// Cookie session (OIDC): fetch the logout token, then call it.
		const r = await fetch(`${KRATOS}/self-service/logout/browser`, {
			headers: { Accept: "application/json" },
			credentials: "include",
		});
		if (r.ok) {
			const { logout_token } = await r.json();
			await fetch(`${KRATOS}/self-service/logout?token=${logout_token}`, {
				credentials: "include",
			});
		}
	},
};

// In-memory backend for local dev without Kratos. See ~/store/mock-auth.
const mockSource: AuthSource = {
	async passwordLogin(username) {
		return { user: mockUser(username), accessToken: "mock-access-token" };
	},
	async oidcLogin(provider) {
		// No provider to redirect to; resolve with a demo user to navigate with.
		return { user: mockUser(`${provider}@social.dev`), accessToken: "mock-access-token" };
	},
	async syncSession() {
		// No remote session; persisted store state covers reloads.
		return null;
	},
	async logout() {},
};

const SOURCES: Record<string, AuthSource> = { kratos: kratosSource };

// Debug data sources are dev-only. In a prod build `import.meta.env.DEV` is
// statically false, so this block — and the mock source / mock-auth module it
// pulls in — is dead-code eliminated from the bundle.
if (import.meta.env.DEV) {
	SOURCES.mock = mockSource;
}

/**
 * Active backend. Production always uses "kratos"; the ?debug= override is
 * honored in dev only, so debug flags can't switch the backend in prod.
 */
function resolveSource(): AuthSource | undefined {
	let key = "kratos";
	if (import.meta.env.DEV && typeof location !== "undefined") {
		key = new URLSearchParams(location.search).get("debug") || "kratos";
	}
	return SOURCES[key];
}

function requireSource(): AuthSource {
	const source = resolveSource();
	if (!source) throw new Error("Data source not found");
	return source;
}

type State = {
	user?: User;
	accessToken?: string;
	refreshToken?: string;
	/** True once persisted state has rehydrated on the client. */
	hasHydrated: boolean;
};

type Mutation = {
	passwordLogin: (username: string, password: string) => Promise<User>;
	/** Start a social sign-in. Resolves with a user, or void when it redirects. */
	oidcLogin: (provider: string) => Promise<User | void>;
	/** Populate the profile from an existing remote session, if any. */
	syncSession: () => Promise<boolean>;
	logout: () => Promise<void>;
	setHasHydrated: (value: boolean) => void;
};

type ProfileStore = State & Mutation;

export const useProfile = create<ProfileStore>()(
	persist(
		immer((set, get) => ({
			hasHydrated: false,
			passwordLogin: async (username, password) => {
				const { user, accessToken } = await requireSource().passwordLogin(
					username,
					password,
				);
				set((state) => {
					state.user = user;
					state.accessToken = accessToken;
					state.refreshToken = undefined;
				});
				return user;
			},
			oidcLogin: async (provider) => {
				const res = await requireSource().oidcLogin(provider);
				if (!res) return; // redirected away to the provider
				set((state) => {
					state.user = res.user;
					state.accessToken = res.accessToken;
					state.refreshToken = undefined;
				});
				return res.user;
			},
			syncSession: async () => {
				// Unknown ?debug source -> treat as unauthenticated, don't throw.
				const source = resolveSource();
				if (!source) return false;
				const res = await source.syncSession();
				if (!res) return false;
				set((state) => {
					state.user = res.user;
					state.accessToken = res.accessToken;
					state.refreshToken = undefined;
				});
				return true;
			},
			logout: async () => {
				const token = get().accessToken;
				try {
					await requireSource().logout(token);
				} catch {
					// Clear local state regardless of source/network outcome.
				}
				set((state) => {
					state.user = undefined;
					state.accessToken = undefined;
					state.refreshToken = undefined;
				});
			},
			setHasHydrated: (value) => {
				set((state) => {
					state.hasHydrated = value;
				});
			},
		})),
		{
			name: "profile-storage",
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({
				user: state.user,
				accessToken: state.accessToken,
				refreshToken: state.refreshToken,
			}),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		},
	),
);
