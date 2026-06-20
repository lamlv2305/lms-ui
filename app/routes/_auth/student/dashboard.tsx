import { DataTable, PageHeading, StatGrid } from "~/components/placeholders";

export default function StudentDashboard() {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Student Dashboard"
				description="Your courses, upcoming deadlines, and recent grades."
			/>
			<StatGrid
				stats={[
					{ label: "Enrolled Courses", value: "6" },
					{ label: "Due This Week", value: "4" },
					{ label: "GPA", value: "3.7" },
					{ label: "Attendance", value: "97%" },
				]}
			/>
			<DataTable
				title="Upcoming Deadlines"
				columns={["Course", "Assignment", "Due", "Status"]}
				rows={[
					["Algebra II", "Quadratics Quiz", "Jun 22", { text: "Not started", badge: "outline" }],
					["Biology", "Lab Report 3", "Jun 23", { text: "In progress", badge: "default" }],
					["History", "Essay Draft", "Jun 25", { text: "Submitted", badge: "secondary" }],
				]}
			/>
		</div>
	);
}
