import { Navigate, useParams } from "react-router-dom";
import { Spreadsheet } from "react-spreadsheet";
import { SheetData } from "../App";

type SheetProps = {
	sheetsData: SheetData[];
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

const SurveySheet = ({ sheetsData, setSheetsData }: SheetProps) => {
	const { title } = useParams();

	if (!sheetsData.some((sheetData) => sheetData.title === title))
		return <Navigate to="/" replace />;

	const { stations, points, sheet } = sheetsData.find(
		(sheet) => sheet.title === title
	) as SheetData;

	const setSheet = (newSheet: { value: number }[][]) => {
		const newSheets = sheetsData.map((sheet) =>
			sheet.title === title ? { ...sheet, sheet: newSheet } : sheet
		);
		setSheetsData(newSheets);
	};

	return (
		<Spreadsheet
			columnLabels={points.map((point) => point.toString())}
			rowLabels={stations}
			data={sheet}
			onChange={setSheet}
			darkMode
		/>
	);
};

export default SurveySheet;
