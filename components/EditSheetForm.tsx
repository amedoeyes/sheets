import createStationsCells from "@/utils/createCells";
import processRawData from "@/utils/processRawData";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/store";
import { updateSheet } from "@/features/sheets/sheetSlice";
import { RawData, Sheet } from "@/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormikValues, useFormik } from "formik";
import { useMemo } from "react";
import { Button, Stack, TextField } from "@mui/material";

type EditSheetFormProps = {
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

export default function EditSheetForm({
	nextStep,
	prevStep,
}: EditSheetFormProps) {
	const dispatch = useDispatch<AppDispatch>();
	const { sheet } = useSelector((state: RootState) => state.sheet);

	const initialValues = {
		title: sheet!.title,
		pointsWidth: sheet!.rawData.pointsWidth.toString(),
		layerWidth: sheet!.rawData.layerWidth.toString(),
		layerHeight: sheet!.rawData.layerHeight.toString(),
		offset: sheet!.rawData.offset.toString(),
		slope: sheet!.rawData.slope.toString(),
		backsight: sheet!.rawData.backsight.toString(),
		benchmark: sheet!.rawData.benchmark.toString(),
	};

	const validationSchema = toFormikValidationSchema(
		z.object({
			title: z.string(),

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
			stationsInterval: sheet!.rawData.stationsInterval,
			startStation: sheet!.rawData.startStation,
			endStation: sheet!.rawData.endStation,
			pointsWidth: Number(values.pointsWidth),
			layerWidth: Number(values.layerWidth),
			layerHeight: Number(values.layerHeight),
			offset: Number(values.offset),
			slope: Number(values.slope),
			backsight: Number(values.backsight),
			benchmark: Number(values.benchmark),
		};

		const processedData = processRawData(
			rawData,
			sheet!.processedData.stations
		);

		const cells = createStationsCells(
			processedData.stations,
			processedData.points,
			processedData.level,
			rawData.layerHeight,
			rawData.slope
		);

		const updatedSheet: Sheet = {
			...sheet!,
			title: values.title,
			cells,
			processedData,
			rawData,
		};

		dispatch(updateSheet(updatedSheet));
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
					Edit
				</Button>
			</Stack>
		</form>
	);
}
