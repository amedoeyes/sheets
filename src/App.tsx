import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SurveySheet from "./pages/SurveySheet";
import useLocalStorage from "./hooks/useLocaleStorage";
import NewSheet from "./pages/NewSheet/NewSheet";
import useTheme from "./hooks/useTheme";

export type SheetData = {
	id: string;
	title: string;
	creationDate: Date;
	stations: string[];
	points: number[];
	sheet: { value: number | null }[][];
};

export default function App() {
	useTheme();
	const [sheetsData, setSheetsData] = useLocalStorage<SheetData[]>(
		"sheetsData",
		[]
	);

	return (
		<Routes>
			<Route
				index
				element={
					<Home
						sheetsData={sheetsData}
						setSheetsData={setSheetsData}
					/>
				}
			/>
			<Route
				path="newSheet/*"
				element={<NewSheet setSheetsData={setSheetsData} />}
			/>
			<Route
				path="sheet/:id"
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
