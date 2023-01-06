type FormButtonProps = {
	className?: string;
	children?: React.ReactNode;
};

export default function FormButton({ className, children }: FormButtonProps) {
	return (
		<button
			className={`bg-primary w-full h-12 mt-4 border border-secondary border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 rounded-3xl outline-none ${className}`}
		>
			{children}
		</button>
	);
}
