type FormButtonProps = {
	className?: string;
	value?: string;
	disabled?: boolean;
	children?: React.ReactNode;
};

export default function FormButton({
	className,
	value,
	disabled,
	children,
}: FormButtonProps) {
	return (
		<button
			className={`bg-primary100 disabled:text-primary900 disabled:bg-primary300 w-full h-12 mt-4 rounded-3xl outline-none ${className}`}
			value={value}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
