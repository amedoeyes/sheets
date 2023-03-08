type H2 = {
	className?: string;
	children?: React.ReactNode;
};

export default function H2({ className, children }: H2) {
	return (
		<h1 className={`text-2xl my-3 font-bold ${className}`}>{children}</h1>
	);
}
