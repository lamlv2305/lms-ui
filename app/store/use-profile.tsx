import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { User } from "~/types/user";

type State = {
	user?: User;
	accessToken?: string;
	refreshToken?: string;
	/** True once persisted state has rehydrated on the client. */
	hasHydrated: boolean;
};

type Mutation = {
	passwordLogin: (username: string, password: string) => Promise<User>;
	logout: () => void;
	setHasHydrated: (value: boolean) => void;
};

type ProfileStore = State & Mutation;

// Placeholder profile. Real impl swaps this for an API call.
const MOCK_USER: User = {
	id: "u_1",
	name: "Jane Cooper",
	email: "jane.cooper@school.edu",
	avatar: "",
	school: {
		id: "s_1",
		name: "Greenwood High",
		// Multi-role demo: every sidebar group renders.
		roles: ["teacher", "student", "schoolstaff"],
	},
};

export const useProfile = create<ProfileStore>()(
	persist(
		immer((set) => ({
			hasHydrated: false,
			passwordLogin: async (username) => {
				const user: User = { ...MOCK_USER, email: username || MOCK_USER.email };
				set((state) => {
					state.user = user;
					state.accessToken = "mock-access-token";
					state.refreshToken = "mock-refresh-token";
				});
				return user;
			},
			logout: () => {
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
