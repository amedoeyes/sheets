import { FaEdit } from "react-icons/fa";

type DeleteSheetButtonProps = {
	id: string;
};

export default function EditSheetButton({ id }: DeleteSheetButtonProps) {
	const handleClick = () => {};

	return (
		<button
			className="h-full w-16 flex justify-center items-center absolute top-0 right-0"
			onClick={handleClick}
		>
			<FaEdit />
		</button>
	);
}
