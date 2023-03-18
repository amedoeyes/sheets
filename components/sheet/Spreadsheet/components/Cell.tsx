type CellProps = {
	children?: React.ReactNode;
	className?: string;
};

export default function Cell({ className, children }: CellProps) {
	return (
		<td
			className={`bg-primary text-secondary h-10 w-24 border border-primary300 ${className}`}
		>
			{children}
		</td>
	);
}
