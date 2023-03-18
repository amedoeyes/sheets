import EditableCell from "./components/EditableCell";
import HeaderCell from "./components/HeaderCell";
import RowHeader from "./components/RowHeader";
import LockedCell from "./components/LockedCell";

export type Header = Array<string | number>;

type SpreadsheetProps = {
	cells: Cells;
	onChange: (cells: Cells) => void;
	rowHeader?: Header;
	colHeader?: Header;
};

export default function SpreadSheet({
	cells,
	onChange,
	rowHeader,
	colHeader,
}: SpreadsheetProps) {
	return (
		<div className="overflow-auto">
			<table className="w-max">
				<tbody>
					<RowHeader rowHeader={rowHeader} cells={cells} />
					{cells.map((row, rowIndex) => (
						<tr key={rowIndex}>
							<HeaderCell>
								{colHeader ? colHeader[rowIndex] : rowIndex + 1}
							</HeaderCell>
							{row.map((col, colIndex) =>
								col.locked ? (
									<LockedCell key={colIndex}>
										{col.value}
									</LockedCell>
								) : (
									<EditableCell
										key={colIndex}
										rowIndex={rowIndex}
										colIndex={colIndex}
										cells={cells}
										onChange={onChange}
									></EditableCell>
								)
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
