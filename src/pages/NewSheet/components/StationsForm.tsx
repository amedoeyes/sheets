import React from "react";
import { useNavigate } from "react-router-dom";
import { SheetData } from "../../../App";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import HeaderText from "../../../components/HeaderText";
import shortUUID from "short-uuid";
import useValidateForm from "../../../hooks/useValidateForm";
import { LocationState } from "../Stations";
import { z } from "zod";
import { StationsFormReducer } from "../NewSheet";

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
						).toFixed(2)
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

		window.history.replaceState({}, "");
		navigate(`/sheet/${id}`, { replace: true });
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
