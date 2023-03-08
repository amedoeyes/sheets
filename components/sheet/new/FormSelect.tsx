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
				className="bg-primary100 w-full h-12 p-2 text-center rounded-3xl outline-none"
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
