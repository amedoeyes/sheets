type HeaderTextProps = {
	className?: string;
	children: React.ReactNode;
};

export default function HeaderText({ className, children }: HeaderTextProps) {
	return <h1 className={`text-4xl my-10 ${className}`}>{children}</h1>;
}
