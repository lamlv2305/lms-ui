import { DataTable, PageHeading, StatGrid } from "~/components/placeholders";

export default function StaffReports() {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Reports"
				description="School performance and operational reports."
			/>
			<StatGrid
				stats={[
					{ label: "Avg. GPA", value: "3.4" },
					{ label: "Attendance", value: "95%" },
					{ label: "Pass Rate", value: "91%" },
					{ label: "Reports Ready", value: "5" },
				]}
			/>
			<DataTable
				title="Available Reports"
				columns={["Report", "Period", "Generated", "Status"]}
				rows={[
					["Enrollment Summary", "Spring", "Jun 19", { text: "Ready", badge: "secondary" }],
					["Attendance Audit", "May", "Jun 01", { text: "Ready", badge: "secondary" }],
					["Grade Distribution", "Spring", "—", { text: "Generating", badge: "default" }],
					["Staff Workload", "Q2", "—", { text: "Queued", badge: "outline" }],
				]}
			/>
		</div>
	);
}
