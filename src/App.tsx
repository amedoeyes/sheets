import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import useLocalStorage from "./hooks/useLocaleStorage";
import useTheme from "./hooks/useTheme";
import Sheet from "./pages/Sheet";

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
				path="sheet/*"
				element={
					<Sheet
						sheetsData={sheetsData}
						setSheetsData={setSheetsData}
					/>
				}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
