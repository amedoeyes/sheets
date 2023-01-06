import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { SheetData } from "../App";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import HeaderText from "../components/HeaderText";
import useFormReducer from "../hooks/useFormReducer";
import shortUUID from "short-uuid";
import { z } from "zod";

type LocationState = {
	title: string;
	stations: string[];
	points: number[];
	sectionWidth: number;
	slope: number;
	level: number;
};

type StationsFormProps = {
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

export default function StationsForm({ setSheetsData }: StationsFormProps) {
	const navigate = useNavigate();
	const location = useLocation();

	if (!location.state) return <Navigate to="/" replace />;

	const { title, stations, points, slope, level }: LocationState =
		location.state;

	const formValues = z.object(
		stations.reduce(
			(
				acc: {
					[key: string]: z.ZodObject<
						{
							value: z.ZodNumber;
						},
						"strip",
						z.ZodTypeAny,
						{
							value: number;
						},
						{
							value: number;
						}
					>;
				},
				station: string
			) => ({
				...acc,
				[station]: z.object({
					value: z
						.number({ invalid_type_error: "Must be a number" })
						.min(1, { message: "Required" }),
				}),
			}),
			{}
		)
	);

	const FormInitialState = stations.reduce(
		(
			acc: { [key: string]: { value: number; message: string } },
			station: string
		) => ({ ...acc, [station]: { value: 0, message: "" } }),
		{}
	);

	const [form, setForm] = useFormReducer(FormInitialState);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm(e.target.id, {
			value: Number(e.target.value),
			message: "",
		});
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

		const sheet: { value: number }[][] | any = stations
			.map((station) =>
				points.map((point) => ({
					value: Number(
						(
							level -
							form[station].value +
							(point / 100) * slope
						).toFixed(2)
					),
				}))
			)
			.flatMap((row) => [
				row,
				points.map((_) => ({
					value: null,
				})),
			]);

		const id = shortUUID.generate();

		setSheetsData((prev) => [
			...prev,
			{
				id: id,
				title: title,
				creationDate: new Date(),
				stations: stations,
				points: points,
				sheet: sheet,
			},
		]);

		navigate(`/sheet/${id}`, { replace: true });
	};

	return (
		<div className="min-h-screen max-w-lg m-auto px-4 pb-4 flex flex-col justify-center items-center">
			<HeaderText>Stations</HeaderText>
			<form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
				{stations.map((station) => (
					<FormInput
						key={station}
						id={station}
						label={station}
						inputMode="numeric"
						onChange={handleChange}
						message={form[station].message}
					/>
				))}
				<FormButton className="col-span-2">Create Sheet</FormButton>
			</form>
		</div>
	);
}
