import { useNavigate } from "react-router-dom";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import HeaderText from "../../../components/HeaderText";
import useValidateForm from "../../../hooks/useValidateForm";
import FormSelect from "./FormSelect";
import { z } from "zod";
import { NewSheetFormReducer } from "../NewSheet";

type NewSheetFormProps = {
	form: NewSheetFormReducer;
};

export default function NewSheetForm({ form }: NewSheetFormProps) {
	const navigate = useNavigate();

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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validate = useValidateForm(schema, form);

		if (!validate.success) return;

		const stations = Array.from(
			Array(
				(validate.data.endStation.value -
					validate.data.startStation.value) /
					validate.data.stationsDivision.value +
					1
			),
			(_, index) =>
				(
					validate.data.startStation.value +
					index * validate.data.stationsDivision.value
				)
					.toLocaleString()
					.replace(",", "+")
		).map((station: string) =>
			station.length < 4 ? "0+" + station.padStart(3, "0") : station
		);

		const points = Array.from(
			Array(
				Math.ceil(
					validate.data.sectionWidth.value /
						validate.data.pointsWidth.value
				) + 1
			),
			(_, index) =>
				index * validate.data.pointsWidth.value >
				validate.data.sectionWidth.value
					? validate.data.sectionWidth.value -
					  index * validate.data.pointsWidth.value +
					  index * validate.data.pointsWidth.value
					: index * validate.data.pointsWidth.value
		);

		if (validate.data.offset.value)
			points.unshift(validate.data.offset.value);

		const level =
			validate.data.backsight.value +
			validate.data.benchmark.value +
			validate.data.thickness.value;

		navigate("stations", {
			state: {
				title: validate.data.title.value,
				slope: validate.data.slope.value,
				stations: stations,
				points: points,
				level: level,
			},
		});
	};

	return (
		<div className="max-w-lg min-h-screen m-auto px-4 pb-4 flex flex-col justify-center items-center">
			<HeaderText>New Sheet</HeaderText>
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
						inputMode="numeric"
						value={form.state.startStation.value}
						onChange={handleChange}
						message={form.state.startStation.message}
					/>
					<FormInput
						id="endStation"
						label="End Station"
						inputMode="numeric"
						value={form.state.endStation.value}
						onChange={handleChange}
						message={form.state.endStation.message}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						id="pointsWidth"
						label="Points Width"
						inputMode="numeric"
						value={form.state.pointsWidth.value}
						onChange={handleChange}
						message={form.state.pointsWidth.message}
					/>
					<FormInput
						id="sectionWidth"
						label="Section Width"
						inputMode="numeric"
						value={form.state.sectionWidth.value}
						onChange={handleChange}
						message={form.state.sectionWidth.message}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						id="offset"
						label="Offset"
						inputMode="numeric"
						value={form.state.offset.value}
						onChange={handleChange}
						message={form.state.offset.message}
					/>
					<FormInput
						id="slope"
						label="Slope"
						inputMode="numeric"
						value={form.state.slope.value}
						onChange={handleChange}
						message={form.state.slope.message}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						id="backsight"
						label="Backsight"
						inputMode="numeric"
						value={form.state.backsight.value}
						onChange={handleChange}
						message={form.state.backsight.message}
					/>
					<FormInput
						id="benchmark"
						label="Benchmark"
						inputMode="numeric"
						value={form.state.benchmark.value}
						onChange={handleChange}
						message={form.state.benchmark.message}
					/>
					<FormInput
						id="thickness"
						label="Thickness"
						inputMode="numeric"
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
