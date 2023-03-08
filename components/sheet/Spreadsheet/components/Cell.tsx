type CellProps = {
	children?: React.ReactNode;
	className?: string;
};

export default function Cell({ className, children }: CellProps) {
	return (
		<td
			className={`h-10 w-24 bg-wite text-black border border-neutral-400 ${className}`}
		>
			{children}
		</td>
	);
}
