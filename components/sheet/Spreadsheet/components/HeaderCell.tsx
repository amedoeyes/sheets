import Cell from "./Cell";

type HeaderCellProps = {
	children?: React.ReactNode;
};

export default function HeaderCell({ children }: HeaderCellProps) {
	return (
		<Cell className="text-center bg-neutral-200 text-opacity-75 font-semibold border select-none">
			{children}
		</Cell>
	);
}
