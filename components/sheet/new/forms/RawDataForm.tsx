import FormButton from "@/components/sheet/new/FormButton";
import FormInput from "@/components/sheet/new/FormInput";
import FormSelect from "@/components/sheet/new/FormSelect";
import { z } from "zod";
import useFormReducer from "@/hooks/useFormReducer";
import validateForm from "@/utility/validateForm";
import processRawData from "@/utility/processRawData";
import { useNewSheetContext } from "@/contexts/NewSheetContext";
import BackButton from "@/components/Header/components/BackButton";
import Header from "@/components/Header";
import H2 from "@/components/H2";
import { useRouter } from "next/router";

export default function RawDataForm() {
	const { nextStep } = useNewSheetContext();
	const { rawData, setRawData, setProcessedData } = useNewSheetContext();

	const initialFormState = Object.fromEntries(
		Object.entries(rawData).map(([key, value]) => [
			key,
			{
				value: value ? (value === 0 ? "" : value.toString()) : "",
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
		stationsInterval: z.object({
			value: z.string().transform(Number),
		}),
		startStation: z.object({
			value: z
				.string()
				.refine((value) => value !== "", {
					message: "Required",
				})
				.transform(Number)
				.refine((value) => !isNaN(value), {
					message: "Must be a number",
				})
				.refine(
					(value) =>
						value % Number(form.state.stationsInterval.value) === 0,
					{
						message: `Must be dividable by ${form.state.stationsInterval.value}`,
					}
				)
				.refine(
					(value) => value <= Number(form.state.endStation.value),
					{
						message:
							"Start station can't be higher than end station",
					}
				),
		}),
		endStation: z.object({
			value: z
				.string()
				.refine((value) => value !== "", {
					message: "Required",
				})
				.transform(Number)
				.refine((value) => !isNaN(value), {
					message: "Must be a number",
				})
				.refine(
					(value) =>
						value % Number(form.state.stationsInterval.value) === 0,
					{
						message: `Must be dividable by ${form.state.stationsInterval.value}`,
					}
				),
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
		layerThickness: z.object({
			value: z
				.string()
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
			stationsInterval: validate.data.stationsInterval.value,
			startStation: validate.data.startStation.value,
			endStation: validate.data.endStation.value,
			pointsWidth: validate.data.pointsWidth.value,
			layerWidth: validate.data.layerWidth.value,
			offset: validate.data.offset.value,
			slope: validate.data.slope.value,
			backsight: validate.data.backsight.value,
			benchmark: validate.data.benchmark.value,
			layerThickness: validate.data.layerThickness.value,
		};

		setRawData(rawData);
		setProcessedData(processRawData(rawData));
		nextStep();
	};

	const router = useRouter();
	return (
		<div className="max-w-lg m-auto">
			<Header>
				<BackButton onClick={() => router.back()} />
				<H2>New Sheet</H2>
			</Header>
			<form
				className="p-4 flex flex-col justify-center gap-4"
				onSubmit={handleSubmit}
			>
				<FormInput
					id="title"
					label="Title"
					value={form.state.title.value}
					onChange={handleChange}
					message={form.state.title.message}
				/>
				<div className="text-center flex items-end gap-4">
					<FormInput
						id="stationsInterval"
						label="Interval"
						value={form.state.stationsInterval.value}
						onChange={handleChange}
						message={form.state.stationsInterval.message}
					/>
					<FormInput
						id="startStation"
						label="Start Station"
						inputMode="decimal"
						value={form.state.startStation.value}
						onChange={handleChange}
						message={form.state.startStation.message}
					/>
					<FormInput
						id="endStation"
						label="End Station"
						inputMode="decimal"
						value={form.state.endStation.value}
						onChange={handleChange}
						message={form.state.endStation.message}
					/>
				</div>
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
					<FormInput
						id="layerThickness"
						label="Layer Thickness"
						inputMode="decimal"
						value={form.state.layerThickness.value}
						onChange={handleChange}
						message={form.state.layerThickness.message}
					/>
				</div>
				<FormButton>Next</FormButton>
			</form>
		</div>
	);
}
