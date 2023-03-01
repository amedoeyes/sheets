import { FaTrashAlt } from "react-icons/fa";
import { useSheetsContext } from "@/contexts/SheetsContext";

type DeleteSheetButtonProps = {
	id: string;
};

export default function DeleteSheetButton({ id }: DeleteSheetButtonProps) {
	const { removeSheet } = useSheetsContext();
	const handleClick = () => removeSheet(id);
	return (
		<button
			className="h-full w-16 flex justify-center items-center absolute top-0 left-0"
			onClick={handleClick}
		>
			<FaTrashAlt />
		</button>
	);
}
