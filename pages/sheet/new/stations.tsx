import H1 from "@/components/H1";
import useFormReducer from "@/hooks/useFormReducer";
import PDFParseForm from "@/components/sheet/new/PDFParseForm";
import StationsForm from "@/components/sheet/new/StationsForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useProcessedDataContext } from "@/contexts/ProcessedDataContext";

type StationsData = {
	title: string;
	slope: number;
	stations: string[];
	points: number[];
	level: number;
};

export default function Stations() {
	const router = useRouter();
	const { processedData } = useProcessedDataContext();

	useEffect(() => {
		if (!processedData.rawData) router.replace("/sheet/new");
	}, [processedData.rawData, router]);

	if (!processedData.rawData) return <>Loading...</>;

	const stationsData = {
		title: processedData.rawData.title,
		slope: processedData.rawData.slope,
		stations: processedData.stations,
		points: processedData.points,
		level: processedData.level,
	};
	if (typeof window === "undefined") return <>loading</>;

	return <StationsWrapper stationsData={stationsData} />;
}

type StationsWrapperProps = {
	stationsData: StationsData;
};

function StationsWrapper({ stationsData }: StationsWrapperProps) {
	const stationsForm = useFormReducer(
		stationsData.stations.reduce(
			(
				acc: Record<string, { value: string; message: string }>,
				station: string
			) => ({ ...acc, [station]: { value: "", message: "" } }),
			{}
		)
	);
	return (
		<div className="p-4 flex flex-col justify-center items-center gap-4">
			<H1>{stationsData.title} Stations</H1>
			<PDFParseForm stationsForm={stationsForm} />
			<StationsForm form={stationsForm} stationsData={stationsData} />
		</div>
	);
}
