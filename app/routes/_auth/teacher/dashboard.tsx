import { DataTable, PageHeading, StatGrid } from "~/components/placeholders";

export default function TeacherDashboard() {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Teacher Dashboard"
				description="Overview of your classes, upcoming work, and grading queue."
			/>
			<StatGrid
				stats={[
					{ label: "Active Classes", value: "5", hint: "Spring term" },
					{ label: "Students", value: "142" },
					{ label: "To Grade", value: "23", hint: "Across 3 assignments" },
					{ label: "Avg. Attendance", value: "94%" },
				]}
			/>
			<DataTable
				title="Today's Schedule"
				description="Your classes for today."
				columns={["Time", "Class", "Room", "Status"]}
				rows={[
					["08:00", "Algebra II", "B-204", { text: "Done", badge: "secondary" }],
					["10:00", "Geometry", "B-204", { text: "Now", badge: "default" }],
					["13:00", "Calculus", "C-101", { text: "Upcoming", badge: "outline" }],
				]}
			/>
		</div>
	);
}
