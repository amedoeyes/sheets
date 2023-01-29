type HeaderButtonProps = {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
};

export default function HeaderButton({ onClick, children }: HeaderButtonProps) {
	return (
		<button
			className="w-10 h-10 flex flex-col justify-center items-center text-lg border border-secondary border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 rounded-3xl outline-none dark:bg-darkPrimary dark:text-darkSecondary dark:border-darkSecondary dark:border-opacity-50 dark:hover:border-opacity-100 dark:focus:border-opacity-100"
			onClick={onClick}
		>
			{children}
		</button>
	);
}
