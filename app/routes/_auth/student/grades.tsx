import { DataTable, PageHeading, StatGrid } from "~/components/placeholders";

export default function StudentGrades() {
	return (
		<div className="space-y-6">
			<PageHeading
				title="Grades"
				description="Your grades across all enrolled courses."
			/>
			<StatGrid
				stats={[
					{ label: "GPA", value: "3.7" },
					{ label: "Highest", value: "A" },
					{ label: "Lowest", value: "C-" },
				]}
			/>
			<DataTable
				title="Grade Summary"
				columns={["Course", "Teacher", "Current Grade", "Trend"]}
				rows={[
					["Algebra II", "J. Cooper", { text: "A-", badge: "secondary" }, "Up"],
					["Biology", "R. Patel", { text: "B+", badge: "default" }, "Steady"],
					["History", "S. Kim", { text: "C-", badge: "destructive" }, "Down"],
					["Spanish", "L. Garcia", { text: "A", badge: "secondary" }, "Up"],
				]}
			/>
		</div>
	);
}
