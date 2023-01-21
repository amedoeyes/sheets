import FormButton from "./FormButton";
import FormInput from "./FormInput";
import HeaderText from "../../../components/HeaderText";
import useFormReducer from "../../../hooks/useFormReducer";
import useParsePDFStations from "../../../hooks/useParsePDFStations";
import useValidateForm from "../../../hooks/useValidateForm";
import { z } from "zod";
import { useState } from "react";
import { StationsFormReducer } from "../NewSheet";

type PDFParseFormProps = {
	stationsForm: StationsFormReducer;
};

export default function PDFParseForm({ stationsForm }: PDFParseFormProps) {
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

	const form = useFormReducer({
		file: { value: "", message: "" },
		column: { value: "", message: "" },
	});

	const [parsing, setParsing] = useState(false);

	const readFile = (file: File, column: number) => {
		const reader = new FileReader();

		reader.readAsArrayBuffer(file);

		reader.onloadstart = () => setParsing(true);

		reader.onload = async (e) => {
			try {
				const parsedStations = await useParsePDFStations(
					e.target!.result as ArrayBuffer,
					column
				);

				if (Object.keys(parsedStations).length === 0)
					return setParsing(false);

				for (const station in stationsForm.state)
					parsedStations.hasOwnProperty(station)
						? stationsForm.setValueOf(
								station,
								parsedStations[station]
						  )
						: stationsForm.setMessageOf(
								station,
								"Does not exist in PDF"
						  );
			} catch (err) {
				console.error(err);
			}

			setParsing(false);
		};
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === "file")
			return form.setValueOf(e.target.id, e.target.files![0]);

		form.setValueOf(e.target.id, e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validate = useValidateForm(schema, form);

		if (!validate.success) return;

		readFile(validate.data.file.value, validate.data.column.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<HeaderText className="text-2xl text-center my-4">
				Auto (PDF)
			</HeaderText>
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
		</form>
	);
}
