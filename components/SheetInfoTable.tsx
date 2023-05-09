import { Sheet } from "@/types";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";

type SheetInfoTableProps = {
	sheet: Sheet;
};

export default function SheetInfoTable({ sheet }: SheetInfoTableProps) {
	return (
		<TableContainer
			variant="outlined"
			component={Paper}
			sx={{
				borderRadius: "1rem",
			}}
		>
			<Table sx={{ minWidth: "15rem" }}>
				<TableBody>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell>{sheet.title}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Interval</TableCell>
						<TableCell>{sheet.rawData.stationsInterval}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Start Station</TableCell>
						<TableCell>{sheet.rawData.startStation}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>End Station</TableCell>
						<TableCell>{sheet.rawData.endStation}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Points Width</TableCell>
						<TableCell>{sheet.rawData.pointsWidth}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Layer Width</TableCell>
						<TableCell>{sheet.rawData.layerWidth}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Layer hight</TableCell>
						<TableCell>{sheet.rawData.layerHeight}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Offset</TableCell>
						<TableCell>{sheet.rawData.offset}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Slope</TableCell>
						<TableCell>{sheet.rawData.slope}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Backsight</TableCell>
						<TableCell>{sheet.rawData.backsight}</TableCell>
					</TableRow>
					<TableRow
						sx={{
							"&:last-child td, &:last-child th": {
								border: 0,
							},
						}}
					>
						<TableCell>Benchmark</TableCell>
						<TableCell>{sheet.rawData.benchmark}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
