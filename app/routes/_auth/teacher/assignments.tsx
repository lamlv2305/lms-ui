import { DataTable, PageHeading, StatGrid } from "~/components/placeholders";

export default function TeacherAssignments() {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Assignments"
				description="Create, publish, and track assignments across your classes."
			/>
			<StatGrid
				stats={[
					{ label: "Published", value: "18" },
					{ label: "Drafts", value: "4" },
					{ label: "Awaiting Grade", value: "23" },
					{ label: "Overdue", value: "2" },
				]}
			/>
			<DataTable
				title="Recent Assignments"
				columns={["Title", "Class", "Due", "Submitted", "Status"]}
				rows={[
					["Quadratics Quiz", "Algebra II", "Jun 22", "30/32", { text: "Grading", badge: "default" }],
					["Proof Set 4", "Geometry", "Jun 24", "12/28", { text: "Open", badge: "secondary" }],
					["Limits Worksheet", "Calculus", "Jun 18", "24/24", { text: "Closed", badge: "outline" }],
					["Intro Survey", "Statistics", "—", "0/30", { text: "Draft", badge: "outline" }],
				]}
			/>
		</div>
	);
}
