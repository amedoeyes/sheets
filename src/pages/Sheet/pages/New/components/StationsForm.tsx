import React from "react";
import { useNavigate } from "react-router-dom";
import { SheetData } from "../../../../../App";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import HeaderText from "../../../../../components/HeaderText";
import shortUUID from "short-uuid";
import useValidateForm from "../../../../../hooks/useValidateForm";
import { LocationState } from "../pages/Stations";
import { z } from "zod";
import { Value } from "../../../../../hooks/useFormReducer";

export type StationsFormReducer = {
	state: Record<
		string,
		{
			value: string;
			message: string;
		}
	> &
		Object;
	setValueOf: (key: string, value: Value) => void;
	setMessageOf: (key: string, message: string) => void;
};

type StationsFormProps = {
	form: StationsFormReducer;
	locationState: LocationState;
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

export default function StationsForm({
	form,
	locationState,
	setSheetsData,
}: StationsFormProps) {
	const navigate = useNavigate();

	const schema = z.object(
		locationState.stations.reduce(
			(acc: Record<string, z.ZodTypeAny>, station: string) => ({
				...acc,
				[station]: z.object({
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
			}),
			{}
		)
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		form.setValueOf(e.target.id, e.target.value);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const validate = useValidateForm(schema, form);

		if (!validate.success) return;

		const sheet: { value: number | null }[][] = locationState.stations
			.map((station) =>
				locationState.points.map((point) => ({
					value: Number(
						(
							locationState.level -
							validate.data[station].value +
							(point / 100) * locationState.slope
						).toFixed(3)
					),
				}))
			)
			.flatMap((row) => [
				row,
				locationState.points.map((_) => ({
					value: null,
				})),
			]);

		const id = shortUUID.generate();

		setSheetsData((prev) => [
			...prev,
			{
				id: id,
				title: locationState.title,
				creationDate: new Date(),
				stations: locationState.stations,
				points: locationState.points,
				sheet: sheet,
			},
		]);

		navigate(-2);
		setTimeout(() => {
			navigate(`/sheet/${id}`);
		}, 100);
	};

	return (
		<form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
			<HeaderText className="text-2xl text-center my-4 col-span-2">
				Manual
			</HeaderText>
			{locationState.stations.map((station) => (
				<FormInput
					key={station}
					id={station}
					value={form.state[station].value}
					label={station}
					inputMode="numeric"
					onChange={handleChange}
					message={form.state[station].message}
				/>
			))}
			<FormButton className="col-span-2">Create Sheet</FormButton>
		</form>
	);
}
