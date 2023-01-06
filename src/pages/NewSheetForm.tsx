import { useNavigate } from "react-router-dom";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import HeaderText from "../components/HeaderText";
import useFormReducer from "../hooks/useFormReducer";
import { z } from "zod";

export default function NewSheetForm() {
	const navigate = useNavigate();
	const formValues = z.object({
		title: z.object({ value: z.string().min(1, { message: "Required" }) }),
		startStation: z.object({
			value: z
				.number({ invalid_type_error: "Must be a number" })
				.min(1, { message: "Required" })
				.refine((value) => value % 20 === 0, {
					message: "Must be dividable by 20",
				}),
		}),
		endStation: z.object({
			value: z
				.number({ invalid_type_error: "Must be a number" })
				.min(1, { message: "Required" })
				.refine((value) => value % 20 === 0, {
					message: "Must be dividable by 20",
				}),
		}),
		pointsWidth: z.object({
			value: z
				.number({ invalid_type_error: "Must be a number" })
				.min(1, { message: "Required" }),
		}),
		sectionWidth: z.object({
			value: z
				.number({ invalid_type_error: "Must be a number" })
				.min(1, { message: "Required" }),
		}),
		offset: z.object({
			value: z
				.number({ invalid_type_error: "Must be a number" })
				.optional(),
		}),

		slope: z.object({
			value: z
				.number({ invalid_type_error: "Must be a number" })
				.optional(),
		}),

		backsight: z.object({
			value: z
				.number({ invalid_type_error: "Must be a number" })
				.min(1, { message: "Required" }),
		}),
		benchmark: z.object({
			value: z
				.number({ invalid_type_error: "Must be a number" })
				.min(1, { message: "Required" }),
		}),
		thickness: z.object({
			value: z
				.number({ invalid_type_error: "Must be a number" })
				.optional(),
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
		if (e.target.inputMode === "numeric") {
			return setForm(e.target.id, {
				value: Number(e.target.value),
				message: "",
			});
		}

		return setForm(e.target.id, { value: e.target.value, message: "" });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const validate = formValues.safeParse(form);

		if (!validate.success)
			return validate.error.issues.forEach((issue) => {
				const key = issue.path[0].toString();
				const value = form[key as keyof typeof form];

				setForm(key, {
					...value,
					message: value.message || issue.message,
				});
			});

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
					id="title"
					label="Title"
					onChange={handleChange}
					message={form.title.message}
				/>
				<div className="flex gap-4">
					<FormInput
						id="startStation"
						label="Start Stations"
						inputMode="numeric"
						onChange={handleChange}
						message={form.startStation.message}
					/>
					<FormInput
						id="endStation"
						label="End Stations"
						inputMode="numeric"
						onChange={handleChange}
						message={form.endStation.message}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						id="pointsWidth"
						label="Points Width"
						inputMode="numeric"
						onChange={handleChange}
						message={form.pointsWidth.message}
					/>
					<FormInput
						id="sectionWidth"
						label="Section Width"
						inputMode="numeric"
						onChange={handleChange}
						message={form.sectionWidth.message}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						id="offset"
						label="Offset"
						inputMode="numeric"
						onChange={handleChange}
						message={form.offset.message}
					/>
					<FormInput
						id="slope"
						label="Slope"
						inputMode="numeric"
						onChange={handleChange}
						message={form.slope.message}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						id="backsight"
						label="Backsight"
						inputMode="numeric"
						onChange={handleChange}
						message={form.backsight.message}
					/>
					<FormInput
						id="benchmark"
						label="Benchmark"
						inputMode="numeric"
						onChange={handleChange}
						message={form.benchmark.message}
					/>
					<FormInput
						id="thickness"
						label="Thickness"
						inputMode="numeric"
						onChange={handleChange}
						message={form.thickness.message}
					/>
				</div>
				<FormButton>Next</FormButton>
			</form>
		</div>
	);
}
