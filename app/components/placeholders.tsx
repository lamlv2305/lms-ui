import { Badge } from "~/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";

export function PageHeading({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className="space-y-1">
			<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	);
}

export type Stat = { label: string; value: string; hint?: string };

export function StatGrid({ stats }: { stats: Stat[] }) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat) => (
				<Card key={stat.label}>
					<CardHeader>
						<CardDescription>{stat.label}</CardDescription>
						<CardTitle className="text-3xl">{stat.value}</CardTitle>
					</CardHeader>
					{stat.hint && (
						<CardContent className="text-xs text-muted-foreground">
							{stat.hint}
						</CardContent>
					)}
				</Card>
			))}
		</div>
	);
}

export type Cell =
	| string
	| {
			text: string;
			badge: "default" | "secondary" | "outline" | "destructive";
	  };

export function DataTable({
	title,
	description,
	columns,
	rows,
}: {
	title: string;
	description?: string;
	columns: string[];
	rows: Cell[][];
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map((column) => (
								<TableHead key={column}>{column}</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row, rowIndex) => (
							// Placeholder data has no stable id; index key is fine here.
							// biome-ignore lint/suspicious/noArrayIndexKey: static placeholder rows
							<TableRow key={rowIndex}>
								{row.map((cell, cellIndex) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: static placeholder cells
									<TableCell key={cellIndex}>
										{typeof cell === "string" ? (
											cell
										) : (
											<Badge variant={cell.badge}>{cell.text}</Badge>
										)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
