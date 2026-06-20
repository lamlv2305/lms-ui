import { DataTable, PageHeading, StatGrid } from "~/components/placeholders";

export default function TeacherClasses() {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Classes"
				description="Manage the classes you teach this term."
			/>
			<StatGrid
				stats={[
					{ label: "Total Classes", value: "5" },
					{ label: "Total Students", value: "142" },
					{ label: "Open Sections", value: "1" },
				]}
			/>
			<DataTable
				title="Your Classes"
				columns={["Class", "Subject", "Students", "Schedule", "Status"]}
				rows={[
					["Algebra II", "Math", "32", "Mon/Wed 08:00", { text: "Active", badge: "secondary" }],
					["Geometry", "Math", "28", "Tue/Thu 10:00", { text: "Active", badge: "secondary" }],
					["Calculus", "Math", "24", "Mon/Fri 13:00", { text: "Active", badge: "secondary" }],
					["Statistics", "Math", "30", "Wed 15:00", { text: "Draft", badge: "outline" }],
				]}
			/>
		</div>
	);
}
