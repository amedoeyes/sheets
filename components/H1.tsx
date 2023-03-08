type H1 = {
	className?: string;
	children?: React.ReactNode;
};

export default function H1({ className, children }: H1) {
	return (
		<h1 className={`text-4xl my-2 font-bold ${className}`}>{children}</h1>
	);
}
