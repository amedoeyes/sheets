type FormInputProps = {
	id: string;
	className?: string;
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
	type?: string;
	accept?: string;
	value?: string | number | readonly string[];
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	message: string;
};

export default function FormInput({
	id,
	className = "",
	value,
	label,
	inputMode,
	type,
	accept,
	onChange,
	message,
}: FormInputProps) {
	return (
		<div className="flex flex-col items-center gap-4">
			<label className="text-lg" htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				className={`bg-primary w-full h-12 p-2 text-center border border-secondary border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 rounded-3xl outline-none dark:bg-darkPrimary dark:text-darkSecondary dark:border-darkSecondary dark:border-opacity-50 dark:hover:border-opacity-100 dark:focus:border-opacity-100 ${className}`}
				inputMode={inputMode}
				type={type}
				accept={accept}
				value={value}
				onChange={onChange}
			/>
			{message && <p className="text-red-400">{message}</p>}
		</div>
	);
}
