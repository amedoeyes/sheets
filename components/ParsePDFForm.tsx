import { z } from "zod";
import { useState } from "react";
import parsePDFStations from "@/utils/parsePDFStations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/store";
import { setStations } from "@/features/newSheet/newSheetSlice";
import { Stations } from "@/types";
import { useFormik } from "formik";
import {
	Box,
	Button,
	FormHelperText,
	Grid,
	Stack,
	TextField,
} from "@mui/material";
import { toFormikValidationSchema } from "zod-formik-adapter";

type ParsePDFFormProps = {
	nextStep?: () => void;
	prevStep?: () => void;
};

export default function ParsePDFForm({
	nextStep,
	prevStep,
}: ParsePDFFormProps) {
	const dispatch = useDispatch<AppDispatch>();
	const { processedData } = useSelector((state: RootState) => state.newSheet);

	const initialValues = {
		file: new File([], ""),
		column: "",
	};

	const validationSchema = toFormikValidationSchema(
		z.object({
			file: z
				.instanceof(File)
				.refine((file) => file.size > 0, "Required")
				.refine(
					(file) => file.type === "application/pdf",
					"Must be PDF"
				),
			column: z
				.string()
				.min(1, "Required")
				.refine((value) => !isNaN(Number(value)), "Must be a number"),
		})
	);

	const [parsingStatus, setParsingStatus] = useState({
		isParsing: false,
		progress: 0,
	});

	const parseFile = (file: File, column: number) => {
		return new Promise<Stations>((resolve, reject) => {
			const reader = new FileReader();

			reader.readAsArrayBuffer(file);

			reader.onload = async (e) => {
				try {
					const parsedStations = await parsePDFStations(
						e.target!.result as ArrayBuffer,
						column,
						(parsingStatus) => setParsingStatus(parsingStatus)
					);

					resolve(parsedStations);
				} catch (err) {
					reject(err);
				}
			};
		});
	};

	const handleSubmit = async (values: typeof initialValues) => {
		const parsedStations = await parseFile(
			values.file,
			Number(values.column)
		);

		const stations = Object.fromEntries(
			Object.keys(processedData.stations).map((station) => [
				station,
				parsedStations[station] || 0,
			])
		);

		dispatch(setStations(stations));
		nextStep && nextStep();

		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth",
		});
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Stack spacing={4}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Button
							type="submit"
							variant="outlined"
							color={formik.errors.file ? "error" : "primary"}
							component={"label" as any}
							sx={{
								width: "100%",
								height: "3.5rem",
								borderRadius: "100rem",
								overflow: "hidden",
							}}
						>
							{formik.values.file?.name || "Select PDF File"}
							<input
								hidden
								accept="application/pdf"
								type="file"
								onChange={(e) => {
									formik.setFieldValue(
										"file",
										e.target.files![0]
									);
								}}
							/>
						</Button>
						{!formik.errors.file ? (
							<FormHelperText variant="filled">
								PDF file to parse
							</FormHelperText>
						) : (
							<FormHelperText error variant="filled">
								{formik.errors.file as string}
							</FormHelperText>
						)}
					</Grid>
					<Grid item xs={6}>
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
							id="column"
							label="Column"
							inputMode="numeric"
							value={formik.values.column}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.column &&
								Boolean(formik.errors.column)
							}
							helperText={
								formik.touched.column && formik.errors.column
									? formik.errors.column
									: "The column containing the stations levels"
							}
						/>
					</Grid>
				</Grid>
				<Button
					type="submit"
					variant="contained"
					size="large"
					sx={{
						borderRadius: "100rem",
					}}
					disabled={parsingStatus.isParsing}
				>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						{parsingStatus.isParsing ? (
							<svg
								fill="none"
								height="26"
								width="26"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<circle
									cx="12"
									cy="12"
									r="10"
									strokeWidth="4"
									strokeLinecap="round"
									strokeLinejoin="round"
									fill="none"
									strokeDasharray={`${
										(parsingStatus.progress / 100) * 65
									},100`}
								>
									<animateTransform
										attributeName="transform"
										type="rotate"
										from="0 12 12"
										to="360 12 12"
										dur="1s"
										repeatCount="indefinite"
									/>
								</circle>
							</svg>
						) : (
							"Parse"
						)}
					</Box>
				</Button>
			</Stack>
		</form>
	);
}
