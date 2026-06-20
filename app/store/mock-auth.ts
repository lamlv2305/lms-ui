import type { User } from "~/types/user";

// Demo accounts for the "mock" data source (~/store/use-profile), used for
// local development without a running Kratos backend. Activate it with the
// ?debug=mock query param, e.g. /login?debug=mock.
//
// Sign in with any email below (the password is ignored). An unknown email
// falls back to the multi-role admin so every sidebar group renders.
export const MOCK_USERS: Record<string, User> = {
	"teacher@school.edu": {
		id: "u_teacher",
		name: "Tom Teacher",
		email: "teacher@school.edu",
		avatar: "",
		school: { id: "s_1", name: "Greenwood High", roles: ["teacher"] },
	},
	"student@school.edu": {
		id: "u_student",
		name: "Sara Student",
		email: "student@school.edu",
		avatar: "",
		school: { id: "s_1", name: "Greenwood High", roles: ["student"] },
	},
	"staff@school.edu": {
		id: "u_staff",
		name: "Sam Staff",
		email: "staff@school.edu",
		avatar: "",
		school: { id: "s_1", name: "Greenwood High", roles: ["schoolstaff"] },
	},
	"admin@school.edu": {
		id: "u_admin",
		name: "Alex Admin",
		email: "admin@school.edu",
		avatar: "",
		school: {
			id: "s_1",
			name: "Greenwood High",
			roles: ["teacher", "student", "schoolstaff"],
		},
	},
};

const DEFAULT_MOCK_EMAIL = "admin@school.edu";

/** Resolve a demo user by email; unknown emails get the multi-role admin. */
export function mockUser(email: string): User {
	const found = MOCK_USERS[email.toLowerCase()];
	if (found) return found;
	const fallback = MOCK_USERS[DEFAULT_MOCK_EMAIL];
	return { ...fallback, email: email || fallback.email };
}
