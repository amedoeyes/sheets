import Cell from "./Cell";

type LockedCellProps = {
	children?: React.ReactNode;
};

export default function LockedCell({ children }: LockedCellProps) {
	return <Cell className="bg-neutral-300">{children}</Cell>;
}
