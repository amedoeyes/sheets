type FormProps = {
	className?: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	children: React.ReactNode;
};

export default function Form({ className, onSubmit, children }: FormProps) {
	return (
		<form
			className={`p-4 flex flex-col justify-center gap-4 ${className}`}
			onSubmit={onSubmit}
		>
			{children}
		</form>
	);
}
