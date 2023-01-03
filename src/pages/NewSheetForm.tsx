import { useNavigate } from "react-router-dom";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import HeaderText from "../components/HeaderText";
import useFormReducer from "../hooks/useFormReducer";
import { z } from "zod";

const NewSheetForm = () => {
	const navigate = useNavigate();
	const FormValues = z.object({
		title: z.object({ value: z.string().min(1, { message: "Required" }) }),
		startStation: z.object({
			value: z.number().refine((value) => value % 20 === 0, {
				message: "Must be dividable by 20",
			}),
		}),
		endStation: z.object({
			value: z
				.number()
				.min(1, { message: "Required" })
				.refine((value) => value % 20 === 0, {
					message: "Must be dividable by 20",
				}),
		}),
		pointsWidth: z.object({
			value: z.number().min(1, { message: "Required" }),
		}),
		sectionWidth: z.object({
			value: z.number().min(1, { message: "Required" }),
		}),
		offset: z.object({
			value: z.number().optional(),
		}),

		slope: z.object({
			value: z.number().optional(),
		}),

		backsight: z.object({
			value: z.number().min(1, { message: "Required" }),
		}),
		benchmark: z.object({
			value: z.number().min(1, { message: "Required" }),
		}),
		thickness: z.object({
			value: z.number().optional(),
		}),
	});

	const [form, setForm] = useFormReducer({
		title: { value: "", message: "" },
		startStation: { value: 0, message: "" },
		endStation: { value: 0, message: "" },
		pointsWidth: { value: 0, message: "" },
		sectionWidth: { value: 0, message: "" },
		offset: { value: 0, message: "" },
		slope: { value: 0, message: "" },
		backsight: { value: 0, message: "" },
		benchmark: { value: 0, message: "" },
		thickness: { value: 0, message: "" },
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.inputMode === "numeric")
			return setForm(e.target.id, {
				value: Number(e.target.value),
				message: "",
			});

		return setForm(e.target.id, { value: e.target.value, message: "" });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const validate = FormValues.safeParse(form);

		if (!validate.success)
			return validate.error.issues.forEach((issue) =>
				setForm(issue.path[0].toString(), {
					...form[issue.path[0].toString() as keyof typeof form],
					message: issue.message,
				})
			);

		const stations = Array.from(
			Array((form.endStation.value - form.startStation.value) / 20 + 1),
			(_, index) =>
				(form.startStation.value + index * 20)
					.toLocaleString()
					.replace(",", "+")
		);

		const points = Array.from(
			Array(
				Math.ceil(form.sectionWidth.value / form.pointsWidth.value) + 1
			),
			(_, index) =>
				index * form.pointsWidth.value > form.sectionWidth.value
					? form.sectionWidth.value -
					  index * form.pointsWidth.value +
					  index * form.pointsWidth.value
					: index * form.pointsWidth.value
		);

		if (form.offset.value) points.unshift(form.offset.value);

		const level =
			form.backsight.value + form.benchmark.value + form.thickness.value;

		navigate("stations", {
			state: {
				title: form.title.value,
				stations: stations,
				points: points,
				sectionWidth: form.sectionWidth.value,
				slope: form.slope.value,
				level: level,
			},
			replace: true,
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
					name="Title"
					id="title"
					onChange={handleChange}
					message={form.title.message}
				/>
				<div className="flex gap-4">
					<FormInput
						name="Start Stations"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="startStation"
						onChange={handleChange}
						message={form.startStation.message}
					/>
					<FormInput
						name="End Stations"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="endStation"
						onChange={handleChange}
						message={form.endStation.message}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						name="Points Width"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="pointsWidth"
						onChange={handleChange}
						message={form.pointsWidth.message}
					/>
					<FormInput
						name="Section Width"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="sectionWidth"
						onChange={handleChange}
						message={form.sectionWidth.message}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						name="Offset"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="offset"
						onChange={handleChange}
						message={form.offset.message}
					/>
					<FormInput
						name="Slope"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="slope"
						onChange={handleChange}
						message={form.slope.message}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						name="Backsight"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="backsight"
						onChange={handleChange}
						message={form.backsight.message}
					/>
					<FormInput
						name="Benchmark"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="benchmark"
						onChange={handleChange}
						message={form.benchmark.message}
					/>
					<FormInput
						name="Thickness"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="thickness"
						onChange={handleChange}
						message={form.thickness.message}
					/>
				</div>
				<FormButton>Next</FormButton>
			</form>
		</div>
	);
};

export default NewSheetForm;
