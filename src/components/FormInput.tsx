type FormInputProps = {
	id: string;
	label: string;
	inputMode?:
		| "search"
		| "text"
		| "none"
		| "tel"
		| "url"
		| "email"
		| "numeric"
		| "decimal";
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	message?: string;
};

export default function FormInput({
	id,
	label,
	inputMode,
	onChange,
	message,
}: FormInputProps) {
	return (
		<div className="flex flex-col items-center gap-4">
			<label className="text-lg" htmlFor={id}>
				{label}
			</label>
			<input
				className="bg-primary w-full h-12 p-2 text-center border border-secondary border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 rounded-3xl outline-none placeholder-neutral-500"
				id={id}
				inputMode={inputMode}
				onChange={onChange}
			/>
			{message && <p className="text-red-400">{message}</p>}
		</div>
	);
}
