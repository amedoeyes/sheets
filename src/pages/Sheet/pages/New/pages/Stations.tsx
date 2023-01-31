import { Navigate, useLocation } from "react-router-dom";
import { SheetData } from "../../../../../App";
import HeaderText from "../../../../../components/HeaderText";
import useFormReducer from "../../../../../hooks/useFormReducer";
import PDFParseForm from "../components/PDFParseForm";
import StationsForm from "../components/StationsForm";

export type LocationState = {
	title: string;
	slope: number;
	stations: string[];
	points: number[];
	level: number;
} & Object;

type StationsProps = {
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

export default function Stations({ setSheetsData }: StationsProps) {
	const location = useLocation();

	if (!location.state) return <Navigate to="/" replace />;

	const locationState: LocationState = location.state;

	const stationsForm = useFormReducer(
		locationState.stations.reduce(
			(
				acc: Record<string, { value: string; message: string }>,
				station: string
			) => ({ ...acc, [station]: { value: "", message: "" } }),
			{}
		)
	);

	return (
		<div className="p-4 flex flex-col justify-center items-center gap-4">
			<HeaderText>{locationState.title} Stations</HeaderText>
			<PDFParseForm stationsForm={stationsForm} />
			<StationsForm
				form={stationsForm}
				locationState={locationState}
				setSheetsData={setSheetsData}
			/>
		</div>
	);
}
