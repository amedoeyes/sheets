type FormSelectProps = {
	id: string;
	label: string;
	message: string;
	value: string | number | readonly string[];
	onChange: React.ChangeEventHandler<HTMLSelectElement>;
	children?: React.ReactNode;
};

export default function FormSelect({
	id,
	label,
	message,
	value,
	onChange,
	children,
}: FormSelectProps) {
	return (
		<div className="flex flex-col items-center gap-4">
			<label className="text-lg" htmlFor={id}>
				{label}
			</label>
			<select
				className="bg-primary w-full h-12 p-2 text-center border border-secondary border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 rounded-3xl outline-none dark:bg-darkPrimary dark:text-darkSecondary dark:border-darkSecondary dark:border-opacity-50 dark:hover:border-opacity-100 dark:focus:border-opacity-100"
				id={id}
				value={value}
				onChange={onChange}
			>
				{children}
			</select>
			{message && <p className="text-red-400">{message}</p>}
		</div>
	);
}
