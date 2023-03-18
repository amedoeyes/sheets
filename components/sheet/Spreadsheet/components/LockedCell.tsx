import Cell from "./Cell";

type LockedCellProps = {
	children?: React.ReactNode;
};

export default function LockedCell({ children }: LockedCellProps) {
	return <Cell className="bg-primary100">{children}</Cell>;
}
