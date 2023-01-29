import { Navigate, Route, Routes } from "react-router-dom";
import { SheetData } from "../../App";
import useFormReducer, { Value } from "../../hooks/useFormReducer";
import NewSheetForm from "./components/NewSheetForm";
import Stations from "./Stations";

export type NewSheetFormReducer = {
	state: Record<
		| "title"
		| "stationsDivision"
		| "startStation"
		| "endStation"
		| "pointsWidth"
		| "sectionWidth"
		| "offset"
		| "slope"
		| "backsight"
		| "benchmark"
		| "thickness",
		{
			value: string;
			message: string;
		}
	> &
		Object;
	setValueOf: (key: string, value: Value) => void;
	setMessageOf: (key: string, message: string) => void;
};

export type StationsFormReducer = {
	state: Record<
		string,
		{
			value: string;
			message: string;
		}
	> &
		Object;
	setValueOf: (key: string, value: Value) => void;
	setMessageOf: (key: string, message: string) => void;
};

type NewSheetProps = {
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

export default function NewSheet({ setSheetsData }: NewSheetProps) {
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
			<Route path="/" element={<NewSheetForm form={newSheetForm} />} />
			<Route
				path="stations"
				element={<Stations setSheetsData={setSheetsData} />}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
