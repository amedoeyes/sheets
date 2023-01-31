import { Navigate, Route, Routes } from "react-router-dom";
import { SheetData } from "../../App";
import NewSheet from "./pages/New";
import SurveySheet from "./pages/SurveySheet";

type SheetProps = {
	sheetsData: SheetData[];
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

export default function Sheet({ sheetsData, setSheetsData }: SheetProps) {
	return (
		<Routes>
			<Route
				path="new/*"
				element={<NewSheet setSheetsData={setSheetsData} />}
			/>
			<Route
				path=":id"
				element={
					<SurveySheet
						sheetsData={sheetsData}
						setSheetsData={setSheetsData}
					/>
				}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
