import Cell from "./Cell";

type EditableCellProps = {
	rowIndex: number;
	colIndex: number;
	cells: Cells;
	onChange: (cells: Cells) => void;
};

export default function EditableCell({
	rowIndex,
	colIndex,
	cells,
	onChange,
}: EditableCellProps) {
	const handleChange =
		(rowIndex: number, colIndex: number) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const updatedCells = [...cells];
			updatedCells[rowIndex][colIndex].value = e.target.value;
			onChange(updatedCells);
		};

	const handleKeyDown =
		(rowIndex: number, colIndex: number) =>
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				const nextInput = document.querySelector(
					`[data-row-index="${rowIndex}"][data-col-index="${
						colIndex + 1
					}"]`
				) as HTMLElement;

				if (!nextInput)
					return (document.activeElement as HTMLElement).blur();

				nextInput.focus();
			}
		};
	return (
		<Cell>
			<input
				className="h-full w-full outline-neutral-500"
				data-row-index={rowIndex}
				data-col-index={colIndex}
				type="text"
				value={cells[rowIndex][colIndex].value}
				inputMode={cells[rowIndex][colIndex].inputMode}
				onChange={handleChange(rowIndex, colIndex)}
				onKeyDown={handleKeyDown(rowIndex, colIndex)}
			/>
		</Cell>
	);
}
