import { Navigate, useParams } from "react-router-dom";
import { Spreadsheet } from "react-spreadsheet";
import { SheetData } from "../App";
import HeaderText from "../components/HeaderText";

type SurveySheetProps = {
	sheetsData: SheetData[];
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

const SurveySheet = ({ sheetsData, setSheetsData }: SurveySheetProps) => {
	const params = useParams();

	if (!sheetsData.some((sheetData) => sheetData.id === params.id))
		return <Navigate to="/" replace />;

	const { title, stations, points, sheet } = sheetsData.find(
		(sheet) => sheet.id === params.id
	) as SheetData;

	const setSheet = (newSheet: { value: number }[][]) => {
		const newSheets = sheetsData.map((sheet) =>
			sheet.id === params.id ? { ...sheet, sheet: newSheet } : sheet
		);
		setSheetsData(newSheets);
	};

	return (
		<div>
			<HeaderText className="ml-4">{title}</HeaderText>
			<Spreadsheet
				columnLabels={points.map((point) => point.toString())}
				rowLabels={stations}
				data={sheet}
				//@ts-ignore
				onChange={setSheet}
			/>
		</div>
	);
};

export default SurveySheet;
