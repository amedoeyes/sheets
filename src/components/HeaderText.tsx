const HeaderText: React.FC<React.BaseHTMLAttributes<HTMLParagraphElement>> = ({
	className,
	children,
	...rest
}) => {
	return (
		<h1 className={`text-4xl my-10 ${className}`} {...rest}>
			{children}
		</h1>
	);
};

export default HeaderText;
