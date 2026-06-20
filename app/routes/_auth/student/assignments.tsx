import { DataTable, PageHeading, StatGrid } from "~/components/placeholders";

export default function StudentAssignments() {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Assignments"
				description="Track what's due and what you've submitted."
			/>
			<StatGrid
				stats={[
					{ label: "Open", value: "4" },
					{ label: "Submitted", value: "11" },
					{ label: "Graded", value: "9" },
					{ label: "Late", value: "1" },
				]}
			/>
			<DataTable
				title="My Assignments"
				columns={["Title", "Course", "Due", "Status"]}
				rows={[
					["Quadratics Quiz", "Algebra II", "Jun 22", { text: "Open", badge: "default" }],
					["Lab Report 3", "Biology", "Jun 23", { text: "In progress", badge: "default" }],
					["Essay Draft", "History", "Jun 25", { text: "Submitted", badge: "secondary" }],
					["Vocab Set 2", "Spanish", "Jun 15", { text: "Late", badge: "destructive" }],
				]}
			/>
		</div>
	);
}
