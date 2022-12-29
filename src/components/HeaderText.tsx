const HeaderText: React.FC<React.BaseHTMLAttributes<HTMLParagraphElement>> = ({
	children,
	...rest
}) => {
	return (
		<h1 className="text-4xl my-10" {...rest}>
			{children}
		</h1>
	);
};

export default HeaderText;
