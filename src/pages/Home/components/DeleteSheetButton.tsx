import { FaTrashAlt } from "react-icons/fa";
import { SheetData } from "../../../App";

type DeleteSheetButtonProps = {
	id: string;
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

export default function DeleteSheetButton({
	id,
	setSheetsData,
}: DeleteSheetButtonProps) {
	const handleClick = () =>
		setSheetsData((prev) =>
			prev.filter((sheetData) => sheetData.id !== id)
		);
	return (
		<button
			className="h-full w-16 flex justify-center items-center absolute top-0 left-0"
			onClick={handleClick}
		>
			<FaTrashAlt />
		</button>
	);
}
