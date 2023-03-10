type H3 = {
	className?: string;
	children: React.ReactNode;
};

export default function H3({ className, children }: H3) {
	return (
		<h1 className={`text-xl my-4 font-bold ${className}`}>{children}</h1>
	);
}
