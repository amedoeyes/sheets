import { Navigate, Route, Routes } from "react-router-dom";
import { SheetData } from "../../../../App";
import useFormReducer from "../../../../hooks/useFormReducer";
import NewSheet from "./pages/NewSheet";
import Stations from "./pages/Stations";

type NewSheetProps = {
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

export default function New({ setSheetsData }: NewSheetProps) {
	const newSheetForm = useFormReducer({
		title: { value: "", message: "" },
		stationsDivision: { value: "10", message: "" },
		startStation: { value: "", message: "" },
		endStation: { value: "", message: "" },
		pointsWidth: { value: "", message: "" },
		sectionWidth: { value: "", message: "" },
		offset: { value: "", message: "" },
		slope: { value: "", message: "" },
		backsight: { value: "", message: "" },
		benchmark: { value: "", message: "" },
		thickness: { value: "", message: "" },
	});

	return (
		<Routes>
			<Route path="/" element={<NewSheet form={newSheetForm} />} />
			<Route
				path="stations"
				element={<Stations setSheetsData={setSheetsData} />}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
