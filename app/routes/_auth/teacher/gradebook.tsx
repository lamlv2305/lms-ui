import { DataTable, PageHeading, StatGrid } from "~/components/placeholders";

export default function TeacherGradebook() {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Gradebook"
				description="Review and record grades for your students."
			/>
			<StatGrid
				stats={[
					{ label: "Class Average", value: "B+" },
					{ label: "Pending Entries", value: "23" },
					{ label: "At Risk", value: "3", hint: "Below 60%" },
				]}
			/>
			<DataTable
				title="Algebra II — Grades"
				columns={["Student", "Quiz 1", "Quiz 2", "Midterm", "Grade"]}
				rows={[
					["Ava Bennett", "92", "88", "90", { text: "A-", badge: "secondary" }],
					["Liam Carter", "75", "80", "78", { text: "C+", badge: "default" }],
					["Noah Diaz", "55", "60", "58", { text: "F", badge: "destructive" }],
					["Mia Evans", "98", "95", "96", { text: "A", badge: "secondary" }],
				]}
			/>
		</div>
	);
}
