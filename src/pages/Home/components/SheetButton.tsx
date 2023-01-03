import { useNavigate } from "react-router-dom";
import useDate from "../../../hooks/useDate";
import { SheetData } from "../../../App";

type SheetButtonProps = {
	id: string;
	title: string;
	creationDate?: Date;
	stations?: string[];
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
	to: string;
};

type DeleteSheetButtonProps = {
	id: string;
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

const DeleteSheetButton = ({ id, setSheetsData }: DeleteSheetButtonProps) => {
	const handleClick = () =>
		setSheetsData((prev) =>
			prev.filter((sheetData) => sheetData.id !== id)
		);
	return (
		<button className="h-full w-16 left-0 absolute" onClick={handleClick}>
			X
		</button>
	);
};

const SheetButton = ({
	id,
	title,
	creationDate,
	stations,
	setSheetsData,
	to,
}: SheetButtonProps) => {
	const navigate = useNavigate();
	const handleClick = () => navigate(to);
	const date = creationDate ? useDate(creationDate) : null;

	return (
		<button
			type="button"
			className="bg-primary w-full p-6 relative flex flex-col justify-center gap-2 text-lg border border-secondary border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 rounded-3xl outline-none overflow-hidden"
			onClick={handleClick}
		>
			<h2 className="text-2xl">{title}</h2>

			{stations && (
				<div className="flex justify-center">
					<p>
						{stations[0]} - {stations[stations.length - 1]}
					</p>
				</div>
			)}
			{date && <p>{date}</p>}
			<DeleteSheetButton id={id} setSheetsData={setSheetsData} />
		</button>
	);
};

export default SheetButton;
