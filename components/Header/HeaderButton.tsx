type HeaderButtonProps = {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
};

export default function HeaderButton({ onClick, children }: HeaderButtonProps) {
	return (
		<button
			className="w-10 h-10 text-xl flex flex-col justify-center items-center"
			onClick={onClick}
		>
			{children}
		</button>
	);
}
