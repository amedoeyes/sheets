type FormInputProps = {
	message?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput: React.FC<FormInputProps> = ({
	name,
	id,
	message,
	...rest
}) => {
	return (
		<div className="flex flex-col items-center gap-4">
			<label className="text-lg" htmlFor={id}>
				{name}
			</label>
			<input
				className="bg-primary w-full h-12 p-2 text-center border border-secondary border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 rounded-3xl outline-none placeholder-neutral-500"
				id={id}
				{...rest}
			/>
			{message && <p className="text-red-400">{message}</p>}
		</div>
	);
};

export default FormInput;
