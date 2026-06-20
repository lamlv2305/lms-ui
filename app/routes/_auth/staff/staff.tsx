import { DataTable, PageHeading, StatGrid } from "~/components/placeholders";

export default function StaffStaff() {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Staff"
				description="Manage teachers and administrative staff."
			/>
			<StatGrid
				stats={[
					{ label: "Total Staff", value: "96" },
					{ label: "Teachers", value: "74" },
					{ label: "Admin", value: "22" },
				]}
			/>
			<DataTable
				title="Staff Directory"
				columns={["Name", "Role", "Department", "Status"]}
				rows={[
					["Jane Cooper", "Teacher", "Mathematics", { text: "Active", badge: "secondary" }],
					["Ravi Patel", "Teacher", "Science", { text: "Active", badge: "secondary" }],
					["Sara Kim", "Coordinator", "History", { text: "Active", badge: "secondary" }],
					["Tom Lee", "Admin", "Operations", { text: "On leave", badge: "outline" }],
				]}
			/>
		</div>
	);
}
