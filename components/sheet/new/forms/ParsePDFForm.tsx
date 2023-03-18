import FormButton from "../FormButton";
import FormInput from "../FormInput";
import useFormReducer from "@/hooks/useFormReducer";
import { z } from "zod";
import { useState } from "react";
import parsePDFStations from "@/utility/parsePDFStations";
import validateForm from "@/utility/validateForm";
import { useNewSheetContext } from "@/contexts/NewSheetContext";
import Header from "@/components/Header";
import BackButton from "@/components/Header/components/BackButton";
import H2 from "@/components/H2";
import Form from "@/components/Form";
import Modal from "@/components/Modal";

export default function ParsePDFForm() {
	const { setShowPDFForm, processedData, setProcessedData } =
		useNewSheetContext();

	const form = useFormReducer({
		file: { value: "", message: "" },
		column: { value: "", message: "" },
	});

	const schema = z.object({
		file: z.object({
			value: z
				.instanceof(File, { message: "Required" })
				.refine((file) => file.type === "application/pdf", {
					message: "Must be PDF",
				}),
		}),
		column: z.object({
			value: z
				.string()
				.refine((value) => value !== "", {
					message: "Required",
				})
				.transform(Number)
				.refine((value) => !isNaN(value), {
					message: "Must be a number",
				}),
		}),
	});

	const [parsing, setParsing] = useState(false);

	const parseFile = (file: File, column: number) => {
		return new Promise<Stations>((resolve, reject) => {
			const reader = new FileReader();

			reader.readAsArrayBuffer(file);

			reader.onloadstart = () => setParsing(true);

			reader.onload = async (e) => {
				try {
					const parsedStations = await parsePDFStations(
						e.target!.result as ArrayBuffer,
						column
					);

					if (Object.keys(parsedStations).length === 0)
						return setParsing(false);

					resolve(parsedStations);
				} catch (err) {
					reject(err);
				}

				setParsing(false);
			};
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === "file")
			return form.setValueOf(e.target.id, e.target.files![0]);

		form.setValueOf(e.target.id, e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validate = validateForm(schema, form);

		if (!validate.success) return;

		const parsedStations = await parseFile(
			validate.data.file.value,
			validate.data.column.value
		);

		const stations = Object.fromEntries(
			processedData.stationsLabels.map((station) => [
				station,
				parsedStations[station],
			])
		);

		setProcessedData((prev) => ({
			...prev,
			stations,
		}));

		setShowPDFForm(false);
	};

	return (
		<Modal>
			<Header>
				<BackButton onClick={() => setShowPDFForm(false)} />
				<H2>Parse PDF</H2>
			</Header>
			<Form onSubmit={handleSubmit}>
				<div className="flex gap-4">
					<FormInput
						className="file:hidden text-start"
						id="file"
						label="File"
						type="file"
						accept="application/pdf"
						onChange={handleChange}
						message={form.state.file.message}
					/>
					<FormInput
						id="column"
						label="Column"
						value={form.state.column.value}
						onChange={handleChange}
						message={form.state.column.message}
					/>
				</div>
				<FormButton disabled={parsing}>
					{parsing ? "Parsing..." : "Parse"}
				</FormButton>
			</Form>
		</Modal>
	);
}
