import { z } from "zod";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/store";
import { setStations } from "@/features/newSheet/newSheetSlice";
import { useFormik } from "formik";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { toFormikValidationSchema } from "zod-formik-adapter";

type StationsFormProps = {
	nextStep?: () => void;
	prevStep?: () => void;
};

export default function StationsForm({
	nextStep,
	prevStep,
}: StationsFormProps) {
	const dispatch = useDispatch<AppDispatch>();
	const { processedData } = useSelector((state: RootState) => state.newSheet);

	const initialValues = useMemo(
		() =>
			Object.entries(processedData.stations).reduce(
				(acc, [key, value]) => ({
					...acc,
					[key]: value === 0 ? "" : value.toString(),
				}),
				{}
			) as Record<string, string>,
		[]
	);

	useEffect(() => {
		const isStationsDifferent = Object.entries(processedData.stations).some(
			([key, value]) => Number(initialValues[key]) !== value
		);

		if (isStationsDifferent) {
			const stations = Object.fromEntries(
				Object.entries(processedData.stations).map(([key, value]) => [
					key,
					value === 0 ? "" : value.toString(),
				])
			);

			formik.setValues(stations);
		}
	}, [processedData.stations]);

	const validationSchema = toFormikValidationSchema(
		z.object(
			Object.fromEntries(
				Object.keys(processedData.stations).map((station) => [
					station,
					z
						.string()
						.min(1, "Required")
						.refine(
							(value) => !isNaN(Number(value)),
							"Must be a number"
						),
				])
			)
		)
	);

	const handleSubmit = (values: typeof initialValues) => {
		const stations = Object.fromEntries(
			Object.entries(values).map(([key, value]) => [key, Number(value)])
		);

		dispatch(setStations(stations));
		nextStep && nextStep();
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: handleSubmit,
	});

	const FormTextFields = useMemo(
		() =>
			Object.keys(processedData.stations).map((station) => (
				<Grid key={station} item xs={6}>
					<TextField
						inputProps={{
							inputMode: "decimal",
						}}
						InputProps={{
							sx: {
								borderRadius: "100rem",
							},
						}}
						fullWidth
						variant="outlined"
						id={station}
						label={station}
						inputMode="decimal"
						value={formik.values[station]}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched[station] &&
							Boolean(formik.errors[station])
						}
						helperText={
							formik.touched[station] && formik.errors[station]
								? formik.errors[station]
								: `${station} level. meters`
						}
					/>
				</Grid>
			)),
		[formik.values, formik.touched, formik.errors]
	);

	return (
		<form onSubmit={formik.handleSubmit}>
			<Stack spacing={4}>
				<Grid container spacing={2}>
					{FormTextFields}
				</Grid>

				<Button
					type="submit"
					variant="contained"
					size="large"
					sx={{
						borderRadius: "100rem",
					}}
				>
					Next
				</Button>
			</Stack>
		</form>
	);
}
