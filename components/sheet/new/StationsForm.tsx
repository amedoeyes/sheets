import React from "react";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import H1 from "@/components/H1";
import shortUUID from "short-uuid";
import validateForm from "@/utility/validateForm";
import { z } from "zod";
import { Value } from "@/hooks/useFormReducer";
import { useRouter } from "next/router";
import { useSheetsContext } from "@/contexts/SheetsContext";

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

type StationsData = {
	title: string;
	slope: number;
	stations: string[];
	points: number[];
	level: number;
};

type StationsFormProps = {
	form: StationsFormReducer;
	stationsData: StationsData;
};

export default function StationsForm({
	form,
	stationsData,
}: StationsFormProps) {
	const { addSheet } = useSheetsContext();

	const schema = z.object(
		stationsData.stations.reduce(
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

	const router = useRouter();
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const validate = validateForm(schema, form);

		if (!validate.success) return;

		const cells: Cells = stationsData.stations
			.map((station) =>
				stationsData.points.map((point) => ({
					value: Number(
						(
							stationsData.level -
							validate.data[station].value +
							(point / 100) * stationsData.slope
						).toFixed(3)
					),
					locked: true,
				}))
			)
			.flatMap((row) => [
				row,
				stationsData.points.map((_) => ({
					value: "",
				})),
			]);

		const id = shortUUID.generate();

		const newSheet: Sheet = {
			id: id,
			title: stationsData.title,
			creationDate: new Date(),
			stations: stationsData.stations,
			points: stationsData.points,
			cells: cells,
		};

		addSheet(newSheet);

		router.back();
		setTimeout(() => {
			router.replace(`/sheet/${id}`);
		}, 100);
	};

	return (
		<form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
			<H1 className="text-2xl text-center my-4 col-span-2">Manual</H1>
			{stationsData.stations.map((station) => (
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
