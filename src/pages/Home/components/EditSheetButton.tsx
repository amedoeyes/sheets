import { FaEdit } from "react-icons/fa";
import { SheetData } from "../../../App";

type DeleteSheetButtonProps = {
	id: string;
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

export default function EditSheetButton({
	id,
	setSheetsData,
}: DeleteSheetButtonProps) {
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
