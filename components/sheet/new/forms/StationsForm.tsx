import React, { useEffect } from "react";
import FormButton from "@/components/sheet/new/FormButton";
import FormInput from "@/components/sheet/new/FormInput";
import validateForm from "@/utility/validateForm";
import { z } from "zod";
import useFormReducer from "@/hooks/useFormReducer";
import { useNewSheetContext } from "@/contexts/NewSheetContext";
import Header from "@/components/Header/Header";
import BackButton from "@/components/Header/BackButton";
import H2 from "@/components/H2";

export default function StationsForm() {
	const { nextStep, prevStep, processedData, setProcessedData } =
		useNewSheetContext();

	const form = useFormReducer(
		Object.fromEntries(
			processedData.stationsLabels.map((station) => [
				station,
				{
					value: "",
					message: "",
				},
			])
		)
	);

	const schema = z.object(
		Object.fromEntries(
			processedData.stationsLabels.map((station) => [
				station,
				z.object({
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
			])
		)
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		form.setValueOf(e.target.id, e.target.value);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const validate = validateForm(schema, form);

		if (!validate.success) return;

		const stations = Object.fromEntries(
			processedData.stationsLabels.map((station) => [
				station,
				validate.data[station].value,
			])
		);

		setProcessedData((prev) => ({
			...prev,
			stations,
		}));

		nextStep();
	};

	return (
		<div className="max-w-lg m-auto">
			<form
				className="p-4 grid grid-cols-2 gap-4"
				onSubmit={handleSubmit}
			>
				{processedData.stationsLabels.map((station) => (
					<FormInput
						key={station}
						id={station}
						value={form.state[station].value}
						label={station}
						inputMode="decimal"
						onChange={handleChange}
						message={form.state[station].message}
					/>
				))}
				<FormButton className="col-span-2">Next</FormButton>
			</form>
		</div>
	);
}
