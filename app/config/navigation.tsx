import {
	BookOpenIcon,
	ClipboardListIcon,
	FileBarChartIcon,
	GraduationCapIcon,
	LayoutDashboardIcon,
	type LucideIcon,
	UsersIcon,
} from "lucide-react";
import type { Role } from "~/types/user";

export type NavItem = {
	title: string;
	url: string;
	icon: LucideIcon;
};

export type RoleNav = {
	/** Sidebar group label for this role. */
	label: string;
	/** First item is the role's landing page (used by the index redirect). */
	items: NavItem[];
};

export const ROLE_NAV: Record<Role, RoleNav> = {
	teacher: {
		label: "Teaching",
		items: [
			{ title: "Dashboard", url: "/teacher", icon: LayoutDashboardIcon },
			{ title: "Classes", url: "/teacher/classes", icon: UsersIcon },
			{
				title: "Assignments",
				url: "/teacher/assignments",
				icon: ClipboardListIcon,
			},
			{ title: "Gradebook", url: "/teacher/gradebook", icon: GraduationCapIcon },
		],
	},
	student: {
		label: "Learning",
		items: [
			{ title: "Dashboard", url: "/student", icon: LayoutDashboardIcon },
			{ title: "Courses", url: "/student/courses", icon: BookOpenIcon },
			{
				title: "Assignments",
				url: "/student/assignments",
				icon: ClipboardListIcon,
			},
			{ title: "Grades", url: "/student/grades", icon: GraduationCapIcon },
		],
	},
	schoolstaff: {
		label: "Administration",
		items: [
			{ title: "Dashboard", url: "/staff", icon: LayoutDashboardIcon },
			{ title: "Students", url: "/staff/students", icon: GraduationCapIcon },
			{ title: "Staff", url: "/staff/staff", icon: UsersIcon },
			{ title: "Reports", url: "/staff/reports", icon: FileBarChartIcon },
		],
	},
};

/** Roles in a stable display order, filtered to those the user holds. */
export function rolesInOrder(roles: Role[] = []): Role[] {
	const order: Role[] = ["teacher", "student", "schoolstaff"];
	return order.filter((role) => roles.includes(role));
}

/** Landing path for a user, based on their first available role. */
export function landingPath(roles: Role[] = []): string {
	const first = rolesInOrder(roles)[0];
	return first ? ROLE_NAV[first].items[0].url : "/login";
}
