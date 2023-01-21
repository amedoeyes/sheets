type FormButtonProps = {
	className?: string;
	disabled?: boolean;
	children?: React.ReactNode;
};

export default function FormButton({
	className = "",
	disabled,
	children,
}: FormButtonProps) {
	return (
		<button
			className={`bg-primary w-full h-12 mt-4 border border-secondary border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 rounded-3xl outline-none disabled:border-opacity-25 disabled:text-neutral-600 dark:bg-darkPrimary dark:text-darkSecondary dark:border-darkSecondary dark:border-opacity-50 dark:hover:border-opacity-100 dark:focus:border-opacity-100 ${className}`}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
