import H2 from "@/components/H2";
import BackButton from "@/components/Header/BackButton";
import Header from "@/components/Header/Header";
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
				<FormButton>Create Sheet</FormButton>
			</form>
		</div>
	);
}
