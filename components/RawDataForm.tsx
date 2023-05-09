import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/store";
import { setRawData, setTitle } from "@/features/newSheet/newSheetSlice";
import { RawData } from "@/types";
import { FormikValues, useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Button, Stack, TextField } from "@mui/material";
import { useMemo } from "react";

type RawDataFormProps = {
	nextStep?: () => void;
	prevStep?: () => void;
};

const formLayout = [
	[
		{
			label: "Title*",
			id: "title",
			inputMode: "text",
			textHelper: "Sheet title",
		},
	],
	[
		{
			label: "Stations Interval*",
			id: "stationsInterval",
			inputMode: "numeric",
			textHelper: "Interval between each station. meters",
		},
		{
			label: "Start Station*",
			id: "startStation",
			inputMode: "numeric",
			textHelper: "The starting station. meters",
		},
		{
			label: "End Station*",
			id: "endStation",
			inputMode: "numeric",
			textHelper: "The ending station. meters",
		},
	],
	[
		{
			label: "Points Width*",
			id: "pointsWidth",
			inputMode: "decimal",
			textHelper: "Width of each point. meters",
		},
		{
			label: "Layer Width*",
			id: "layerWidth",
			inputMode: "decimal",
			textHelper: "The width of the layer. meters",
		},
		{
			label: "Layer Height",
			id: "layerHeight",
			inputMode: "decimal",
			textHelper: "The height of the layer. meters",
		},
	],
	[
		{
			label: "Offset",
			id: "offset",
			inputMode: "decimal",
			textHelper: "The offset. meters",
		},
		{
			label: "Slope",
			id: "slope",
			inputMode: "decimal",
			textHelper: "The slope. percentage",
		},
	],
	[
		{
			label: "Backsight*",
			id: "backsight",
			inputMode: "decimal",
			textHelper: "The backsight. meters",
		},
		{
			label: "Benchmark*",
			id: "benchmark",
			inputMode: "decimal",
			textHelper: "The benchmark. meters",
		},
	],
];

export default function RawDataForm({ nextStep, prevStep }: RawDataFormProps) {
	const dispatch = useDispatch<AppDispatch>();
	const { title, rawData } = useSelector(
		(state: RootState) => state.newSheet
	);

	const initialValues = {
		title: title ? title : "",
		stationsInterval: title ? rawData.stationsInterval.toString() : "10",
		startStation: title ? rawData.startStation.toString() : "",
		endStation: title ? rawData.endStation.toString() : "",
		pointsWidth: title ? rawData.pointsWidth.toString() : "",
		layerWidth: title ? rawData.layerWidth.toString() : "",
		layerHeight: title ? rawData.layerHeight.toString() : "",
		offset: title ? rawData.offset.toString() : "",
		slope: title ? rawData.slope.toString() : "",
		backsight: title ? rawData.backsight.toString() : "",
		benchmark: title ? rawData.benchmark.toString() : "",
	};

	const validationSchema = toFormikValidationSchema(
		z.object({
			title: z.string(),

			stationsInterval: z
				.string()
				.refine((value) => !isNaN(Number(value)), "Must be a number")
				.refine((value) => Number(value) >= 0, "Must be positive"),

			startStation: z
				.string()
				.refine((value) => !isNaN(Number(value)), "Must be a number")
				.refine(
					(value) =>
						Number(value) %
							Number(formik.values.stationsInterval) ===
						0,
					"Must be dividable by stations interval"
				)
				.refine((value) => Number(value) >= 0, "Must be positive"),

			endStation: z
				.string()
				.refine((value) => !isNaN(Number(value)), "Must be a number")
				.refine(
					(value) =>
						Number(value) %
							Number(formik.values.stationsInterval) ===
						0,
					"Must be dividable by stations interval"
				)
				.refine(
					(value) =>
						Number(value) >= Number(formik.values.startStation),
					"Must be greater or equal to start station"
				)
				.refine((value) => Number(value) >= 0, "Must be positive"),

			pointsWidth: z
				.string()
				.refine((value) => !isNaN(Number(value)), "Must be a number")
				.refine((value) => Number(value) >= 0, "Must be positive"),

			layerWidth: z
				.string()
				.refine((value) => !isNaN(Number(value)), "Must be a number")
				.refine(
					(value) =>
						Number(value) >= Number(formik.values.pointsWidth),
					"Must be greater or equal to points width"
				)
				.refine((value) => Number(value) >= 0, "Must be positive"),

			layerHeight: z
				.string()
				.refine((value) => !isNaN(Number(value)), "Must be a number")
				.refine((value) => Number(value) >= 0, "Must be positive")
				.optional(),

			offset: z
				.string()
				.refine((value) => !isNaN(Number(value)), "Must be a number")
				.optional(),

			slope: z
				.string()
				.refine((value) => !isNaN(Number(value)), "Must be a number")
				.refine((value) => Number(value) >= 0, "Must be positive")
				.optional(),

			backsight: z
				.string()
				.refine((value) => !isNaN(Number(value)), "Must be a number")
				.refine((value) => Number(value) >= 0, "Must be positive"),

			benchmark: z
				.string()
				.refine((value) => !isNaN(Number(value)), "Must be a number")
				.refine((value) => Number(value) >= 0, "Must be positive"),
		})
	);

	const handleSubmit = (values: typeof initialValues) => {
		const rawData: RawData = {
			stationsInterval: Number(values.stationsInterval),
			startStation: Number(values.startStation),
			endStation: Number(values.endStation),
			pointsWidth: Number(values.pointsWidth),
			layerWidth: Number(values.layerWidth),
			layerHeight: Number(values.layerHeight),
			offset: Number(values.offset),
			slope: Number(values.slope),
			backsight: Number(values.backsight),
			benchmark: Number(values.benchmark),
		};

		dispatch(setTitle(values.title));
		dispatch(setRawData(rawData));
		nextStep && nextStep();
	};

	const formik: FormikValues = useFormik({
		initialValues,
		validationSchema,
		onSubmit: handleSubmit,
	});

	const FormTextFields = useMemo(
		() =>
			formLayout.map((section, index) => (
				<Stack key={index} spacing={2} direction="row">
					{section.map((input) => (
						<TextField
							key={input.id}
							inputProps={{
								inputMode: input.inputMode as
									| "decimal"
									| "text",
							}}
							InputProps={{
								sx: {
									borderRadius: "100rem",
								},
							}}
							fullWidth
							variant="outlined"
							id={input.id}
							label={input.label}
							value={
								formik.values[
									input.id as keyof typeof formik.values
								]
							}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched[
									input.id as keyof typeof formik.touched
								] &&
								Boolean(
									formik.errors[
										input.id as keyof typeof formik.errors
									]
								)
							}
							helperText={
								formik.touched[
									input.id as keyof typeof formik.touched
								] &&
								formik.errors[
									input.id as keyof typeof formik.errors
								]
									? formik.errors[
											input.id as keyof typeof formik.errors
									  ]
									: input.textHelper
							}
						/>
					))}
				</Stack>
			)),
		[formik.values, formik.touched, formik.errors]
	);

	return (
		<form onSubmit={formik.handleSubmit}>
			<Stack spacing={4}>
				{FormTextFields}

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
