import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NewSheetForm from "./pages/NewSheetForm";
import StationsForm from "./pages/StationsForm";
import SurveySheet from "./pages/SurveySheet";
import { useLocalStorage } from "./hooks/useLocaleStorage";

export type SheetData = {
	title: string;
	creationDate: Date;
	stations: string[];
	points: number[];
	sheet: { value: number }[][];
};

const App = () => {
	const [sheetsData, setSheetsData] = useLocalStorage<SheetData[]>(
		"sheetsData",
		[]
	);

	return (
		<Routes>
			<Route path="/" element={<Home sheetsData={sheetsData} />} />
			<Route
				path="newSheet/"
				element={<NewSheetForm sheetsData={sheetsData} />}
			/>
			<Route
				path="newSheet/stations"
				element={<StationsForm setSheetsData={setSheetsData} />}
			/>
			<Route
				path="/sheet/:title"
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
};

export default App;
