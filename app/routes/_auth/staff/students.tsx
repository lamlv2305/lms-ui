import { DataTable, PageHeading, StatGrid } from "~/components/placeholders";

export default function StaffStudents() {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Students"
				description="Manage student records and enrollment."
			/>
			<StatGrid
				stats={[
					{ label: "Total", value: "1,284" },
					{ label: "New This Term", value: "86" },
					{ label: "On Leave", value: "12" },
					{ label: "Graduating", value: "204" },
				]}
			/>
			<DataTable
				title="Student Directory"
				columns={["Name", "Grade", "Advisor", "Status"]}
				rows={[
					["Ava Bennett", "11", "J. Cooper", { text: "Active", badge: "secondary" }],
					["Liam Carter", "10", "R. Patel", { text: "Active", badge: "secondary" }],
					["Noah Diaz", "12", "S. Kim", { text: "On leave", badge: "outline" }],
					["Mia Evans", "11", "L. Garcia", { text: "Active", badge: "secondary" }],
				]}
			/>
		</div>
	);
}
