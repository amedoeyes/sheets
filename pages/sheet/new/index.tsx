import FormButton from "@/components/sheet/new/FormButton";
import FormInput from "@/components/sheet/new/FormInput";
import FormSelect from "@/components/sheet/new/FormSelect";
import { z } from "zod";
import useFormReducer from "@/hooks/useFormReducer";
import validateForm from "@/utility/validateForm";
import { useRouter } from "next/router";
import H1 from "@/components/H1";
import { useEffect } from "react";
import processRawData from "@/utility/processRawData";
import { useProcessedDataContext } from "@/contexts/ProcessedDataContext";

export default function NewSheet() {
	const form = useFormReducer({
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

	const { processedData, setProcessedData } = useProcessedDataContext();

	useEffect(() => {
		const rawData = processedData.rawData;
		if (rawData) {
			for (const key in rawData) {
				form.setValueOf(key, rawData[key as keyof RawData].toString());
			}
		}
	}, []);

	const schema = z.object({
		title: z.object({ value: z.string() }),
		stationsDivision: z.object({
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
						value % Number(form.state.stationsDivision.value) === 0,
					{
						message: `Must be dividable by ${form.state.stationsDivision.value}`,
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
						value % Number(form.state.stationsDivision.value) === 0,
					{
						message: `Must be dividable by ${form.state.stationsDivision.value}`,
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
		sectionWidth: z.object({
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
				.transform((value) => -Number(value))
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
		thickness: z.object({
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

	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validate = validateForm(schema, form);

		if (!validate.success) return;

		const rawData = {
			title: validate.data.title.value,
			stationsDivision: validate.data.stationsDivision.value,
			startStation: validate.data.startStation.value,
			endStation: validate.data.endStation.value,
			pointsWidth: validate.data.pointsWidth.value,
			sectionWidth: validate.data.sectionWidth.value,
			offset: validate.data.offset.value,
			slope: validate.data.slope.value,
			backsight: validate.data.backsight.value,
			benchmark: validate.data.benchmark.value,
			thickness: validate.data.thickness.value,
		};

		setProcessedData(processRawData(rawData));

		router.push("/sheet/new/stations");
	};

	return (
		<div className="max-w-lg min-h-screen m-auto px-4 pb-4 flex flex-col justify-center items-center">
			<H1>New Sheet</H1>
			<form
				className="flex flex-col justify-center gap-4"
				onSubmit={handleSubmit}
			>
				<FormInput
					id="title"
					label="Title"
					value={form.state.title.value}
					onChange={handleChange}
					message={form.state.title.message}
				/>
				<div className="flex gap-4">
					<FormSelect
						id="stationsDivision"
						label="Division"
						value={form.state.stationsDivision.value}
						onChange={handleChange}
						message={form.state.stationsDivision.message}
					>
						<option value="10">10</option>
						<option value="20">20</option>
					</FormSelect>
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
				<div className="flex gap-4">
					<FormInput
						id="pointsWidth"
						label="Points Width"
						inputMode="decimal"
						value={form.state.pointsWidth.value}
						onChange={handleChange}
						message={form.state.pointsWidth.message}
					/>
					<FormInput
						id="sectionWidth"
						label="Section Width"
						inputMode="decimal"
						value={form.state.sectionWidth.value}
						onChange={handleChange}
						message={form.state.sectionWidth.message}
					/>
				</div>
				<div className="flex gap-4">
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
				<div className="flex gap-4">
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
						id="thickness"
						label="Thickness"
						inputMode="decimal"
						value={form.state.thickness.value}
						onChange={handleChange}
						message={form.state.thickness.message}
					/>
				</div>
				<FormButton>Next</FormButton>
			</form>
		</div>
	);
}
