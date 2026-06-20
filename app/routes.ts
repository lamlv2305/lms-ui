import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	route("login", "routes/_public/login.tsx"),
	route("terms", "routes/_public/terms.tsx"),
	route("privacy", "routes/_public/privacy.tsx"),

	// Protected area: sidebar shell + client auth guard.
	layout("routes/_auth/route.tsx", [
		index("routes/_auth/home.tsx"),

		// Teacher
		route("teacher", "routes/_auth/teacher/dashboard.tsx"),
		route("teacher/classes", "routes/_auth/teacher/classes.tsx"),
		route("teacher/assignments", "routes/_auth/teacher/assignments.tsx"),
		route("teacher/gradebook", "routes/_auth/teacher/gradebook.tsx"),

		// Student
		route("student", "routes/_auth/student/dashboard.tsx"),
		route("student/courses", "routes/_auth/student/courses.tsx"),
		route("student/assignments", "routes/_auth/student/assignments.tsx"),
		route("student/grades", "routes/_auth/student/grades.tsx"),

		// School staff
		route("staff", "routes/_auth/staff/dashboard.tsx"),
		route("staff/students", "routes/_auth/staff/students.tsx"),
		route("staff/staff", "routes/_auth/staff/staff.tsx"),
		route("staff/reports", "routes/_auth/staff/reports.tsx"),
	]),
] satisfies RouteConfig;
