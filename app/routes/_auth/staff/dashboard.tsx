import { DataTable, PageHeading, StatGrid } from "~/components/placeholders";

export default function StaffDashboard() {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Administration Dashboard"
				description="School-wide overview of enrollment, staff, and operations."
			/>
			<StatGrid
				stats={[
					{ label: "Students", value: "1,284" },
					{ label: "Staff", value: "96" },
					{ label: "Classes", value: "212" },
					{ label: "Open Tickets", value: "7" },
				]}
			/>
			<DataTable
				title="Recent Activity"
				columns={["When", "Event", "By", "Status"]}
				rows={[
					["09:12", "New enrollment", "Admissions", { text: "Done", badge: "secondary" }],
					["08:40", "Schedule change", "S. Kim", { text: "Pending", badge: "default" }],
					["08:05", "Staff onboarding", "HR", { text: "In review", badge: "outline" }],
				]}
			/>
		</div>
	);
}
