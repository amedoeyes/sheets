import { useSheetsContext } from "@/contexts/SheetsContext";
import useFormReducer from "@/hooks/useFormReducer";
import createCells from "@/utility/createCells";
import processRawData from "@/utility/processRawData";
import validateForm from "@/utility/validateForm";
import { z } from "zod";
import Form from "../Form";
import H2 from "../H2";
import Header from "../Header";
import BackButton from "../Header/components/BackButton";
import Modal from "../Modal";
import FormButton from "./new/FormButton";
import FormInput from "./new/FormInput";

type EditSheetProps = {
	setShowEditSheet: React.Dispatch<React.SetStateAction<boolean>>;
	id: string;
};

export default function EditSheetForm({
	setShowEditSheet,
	id,
}: EditSheetProps) {
	const { getSheet, updateSheet } = useSheetsContext();
	const sheet = getSheet(id)!;

	const initialFormState = Object.fromEntries(
		Object.entries(sheet.rawData).map(([key, value]) => [
			key,
			{
				value: value.toString(),
				message: "",
			},
		])
	) as Record<keyof RawData, { value: string; message: string }>;

	const form = useFormReducer(initialFormState);

	const schema = z.object({
		title: z.object({
			value: z.string().refine((value) => value !== "", {
				message: "Required",
			}),
		}),
		pointsWidth: z.object({
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
		layerWidth: z.object({
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
		layerThickness: z.object({
			value: z
				.string()
				.transform(Number)
				.refine((value) => !isNaN(value), {
					message: "Must be a number",
				}),
		}),
		offset: z.object({
			value: z
				.string()
				.transform(Number)
				.refine((value) => !isNaN(value), {
					message: "Must be a number",
				}),
		}),
		slope: z.object({
			value: z
				.string()
				.transform(Number)
				.refine((value) => !isNaN(value), {
					message: "Must be a number",
				}),
		}),
		backsight: z.object({
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
		benchmark: z.object({
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

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => form.setValueOf(e.target.id, e.target.value);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validate = validateForm(schema, form);

		if (!validate.success) return;

		const rawData: RawData = {
			title: validate.data.title.value,
			stationsInterval: sheet.rawData.stationsInterval,
			startStation: sheet.rawData.startStation,
			endStation: sheet.rawData.endStation,
			pointsWidth: validate.data.pointsWidth.value,
			layerWidth: validate.data.layerWidth.value,
			layerThickness: validate.data.layerThickness.value,
			offset: validate.data.offset.value,
			slope: validate.data.slope.value,
			backsight: validate.data.backsight.value,
			benchmark: validate.data.benchmark.value,
		};

		const processedData = processRawData(rawData);
		processedData.stations = sheet.processedData.stations;

		const cells = createCells(rawData, processedData);

		const newSheet: Sheet = {
			...sheet,
			cells,
			processedData,
			rawData,
		};

		updateSheet(id, newSheet);
		setShowEditSheet(false);
	};

	return (
		<Modal>
			<Header>
				<BackButton onClick={() => setShowEditSheet(false)} />
				<H2>Edit Sheet</H2>
			</Header>
			<Form onSubmit={handleSubmit}>
				<FormInput
					id="title"
					label="Title"
					value={form.state.title.value}
					onChange={handleChange}
					message={form.state.title.message}
				/>
				<div className="text-center flex items-end gap-4">
					<FormInput
						id="pointsWidth"
						label="Points Width"
						inputMode="decimal"
						value={form.state.pointsWidth.value}
						onChange={handleChange}
						message={form.state.pointsWidth.message}
					/>
					<FormInput
						id="layerWidth"
						label="Layer Width"
						inputMode="decimal"
						value={form.state.layerWidth.value}
						onChange={handleChange}
						message={form.state.layerWidth.message}
					/>
					<FormInput
						id="layerThickness"
						label="Layer Thickness"
						inputMode="decimal"
						value={form.state.layerThickness.value}
						onChange={handleChange}
						message={form.state.layerThickness.message}
					/>
				</div>
				<div className="text-center flex items-end gap-4">
					<FormInput
						id="offset"
						label="Offset"
						inputMode="decimal"
						value={form.state.offset.value}
						onChange={handleChange}
						message={form.state.offset.message}
					/>
					<FormInput
						id="slope"
						label="Slope"
						inputMode="decimal"
						value={form.state.slope.value}
						onChange={handleChange}
						message={form.state.slope.message}
					/>
				</div>
				<div className="text-center flex items-end gap-4">
					<FormInput
						id="backsight"
						label="Backsight"
						inputMode="decimal"
						value={form.state.backsight.value}
						onChange={handleChange}
						message={form.state.backsight.message}
					/>
					<FormInput
						id="benchmark"
						label="Benchmark"
						inputMode="decimal"
						value={form.state.benchmark.value}
						onChange={handleChange}
						message={form.state.benchmark.message}
					/>
				</div>
				<FormButton>Edit</FormButton>
			</Form>
		</Modal>
	);
}
