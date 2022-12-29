const FormButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
	className,
	children,
	...rest
}) => {
	return (
		<button
			className={`bg-primary w-full h-12 mt-4 border border-secondary border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 rounded-3xl outline-none ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
};

export default FormButton;
