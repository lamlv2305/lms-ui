import { DataTable, PageHeading, StatGrid } from "~/components/placeholders";

export default function StudentCourses() {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Courses"
				description="Courses you are enrolled in this term."
			/>
			<StatGrid
				stats={[
					{ label: "Enrolled", value: "6" },
					{ label: "Credits", value: "18" },
					{ label: "Completed", value: "2" },
				]}
			/>
			<DataTable
				title="Enrolled Courses"
				columns={["Course", "Teacher", "Schedule", "Progress"]}
				rows={[
					["Algebra II", "J. Cooper", "Mon/Wed 08:00", { text: "On track", badge: "secondary" }],
					["Biology", "R. Patel", "Tue/Thu 09:00", { text: "On track", badge: "secondary" }],
					["History", "S. Kim", "Mon 11:00", { text: "Behind", badge: "destructive" }],
					["Spanish", "L. Garcia", "Fri 13:00", { text: "On track", badge: "secondary" }],
				]}
			/>
		</div>
	);
}
