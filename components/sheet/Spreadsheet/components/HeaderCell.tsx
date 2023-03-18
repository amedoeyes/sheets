import Cell from "./Cell";

type HeaderCellProps = {
	children?: React.ReactNode;
};

export default function HeaderCell({ children }: HeaderCellProps) {
	return (
		<Cell className="bg-primary200 text-center text-opacity-75 font-semibold">
			{children}
		</Cell>
	);
}
