import H2 from "@/components/H2";
import BackButton from "@/components/Header/components/BackButton";
import Header from "@/components/Header";
import { useNewSheetContext } from "@/contexts/NewSheetContext";
import { useSheetsContext } from "@/contexts/SheetsContext";
import createCells from "@/utility/createCells";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import FormButton from "../FormButton";

export default function CreateSheetForm() {
	const { prevStep, rawData, processedData } = useNewSheetContext();
	const { addSheet } = useSheetsContext();
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const cells = createCells(rawData, processedData);
		const id = uuidv4();

		const newSheet: Sheet = {
			id: id,
			title: rawData.title,
			creationDate: new Date(),
			cells: cells,
			rawData,
			processedData,
		};

		addSheet(newSheet);
		router.replace(`/sheet/${id}`);
	};

	return (
		<div className="max-w-lg m-auto">
			<Header>
				<BackButton onClick={prevStep} />
				<H2>Create Sheet</H2>
			</Header>
			<form
				className="p-4 flex flex-col justify-center gap-4"
				onSubmit={handleSubmit}
			>
				<p>Title: {rawData.title}</p>
				<p>Interval: {rawData.stationsInterval}</p>
				<p>
					From: {processedData.stationsLabels[0]} To:{" "}
					{
						processedData.stationsLabels[
							processedData.stationsLabels.length - 1
						]
					}
				</p>
				<p>Points Width: {rawData.pointsWidth}</p>
				<p>Layer Width: {rawData.layerWidth}</p>
				<p>Offset: {rawData.offset}</p>
				<p>Slope: {rawData.slope}</p>
				<p>Backsight: {rawData.backsight}</p>
				<p>Benchmark: {rawData.benchmark}</p>
				<p>Layer Thickness {rawData.layerThickness}</p>
				<FormButton>Create Sheet</FormButton>
			</form>
		</div>
	);
}
