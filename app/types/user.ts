export type Role = "teacher" | "student" | "schoolstaff";

export type User = {
	id: string;
	avatar: string;
	name: string;
	email: string;

	school?: {
		id: string;
		name: string;
		roles: Role[];
	};
};
