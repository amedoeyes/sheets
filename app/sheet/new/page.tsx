"use client";

import ConfirmNewSheet from "@/components/ConfirmNewSheet";
import RawDataForm from "@/components/RawDataForm";
import StationsForm from "@/components/StationsForm";
import MultiStepForm from "@/components/MultiStepForm";
import { resetState } from "@/features/newSheet/newSheetSlice";
import { AppDispatch } from "@/utils/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "@/components/Header";
import ParsePDFForm from "@/components/ParsePDFForm";
import {
	ArrowBackIosNewRounded,
	PictureAsPdfOutlined,
} from "@mui/icons-material";
import {
	Box,
	Container,
	IconButton,
	Modal,
	Slide,
	Stack,
	Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function NewSheet() {
	const [step, setStep] = useState(0);
	const [showParsePdfForm, setShowParsePdfForm] = useState(false);
	const router = useRouter();

	const nextStep = () => setStep((prevStep) => prevStep + 1);
	const prevStep = () => setStep((prevStep) => prevStep - 1);
	const openParsePdfForm = () => setShowParsePdfForm(true);
	const closeParsePdfForm = () => setShowParsePdfForm(false);
	const routeBack = () => router.back();

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(resetState());

		return () => {
			dispatch(resetState());
		};
	}, [dispatch]);

	return (
		<>
			<MultiStepForm currentStep={step}>
				<Box>
					<Header>
						<Stack direction="row" spacing={1} alignItems="center">
							<IconButton color="inherit" onClick={routeBack}>
								<ArrowBackIosNewRounded />
							</IconButton>
							<Typography variant="h6">New Sheet</Typography>
						</Stack>
					</Header>

					<Container
						maxWidth="sm"
						sx={{
							padding: "1rem",
						}}
					>
						<RawDataForm nextStep={nextStep} />
					</Container>
				</Box>

				<Box>
					<Header>
						<Stack direction="row" spacing={1} alignItems="center">
							<IconButton color="inherit" onClick={prevStep}>
								<ArrowBackIosNewRounded />
							</IconButton>
							<Typography variant="h6">
								Stations Levels
							</Typography>
						</Stack>
						<div>
							<IconButton
								color="inherit"
								onClick={openParsePdfForm}
							>
								<PictureAsPdfOutlined />
							</IconButton>
						</div>
					</Header>

					<Container
						maxWidth="sm"
						sx={{
							padding: "1rem",
						}}
					>
						<StationsForm nextStep={nextStep} />
					</Container>

					<Modal open={showParsePdfForm}>
						<Slide direction="left" in={showParsePdfForm}>
							<Box
								bgcolor="background.default"
								width="100%"
								height="100%"
							>
								<Header freeze>
									<Stack
										direction="row"
										spacing={1}
										alignItems="center"
									>
										<IconButton
											color="inherit"
											onClick={closeParsePdfForm}
										>
											<ArrowBackIosNewRounded />
										</IconButton>
										<Typography variant="h6">
											PDF Parse Stations
										</Typography>
									</Stack>
								</Header>

								<Container
									maxWidth="sm"
									sx={{
										padding: "1rem",
									}}
								>
									<ParsePDFForm
										nextStep={closeParsePdfForm}
										prevStep={closeParsePdfForm}
									/>
								</Container>
							</Box>
						</Slide>
					</Modal>
				</Box>

				<Box>
					<Header>
						<Stack direction="row" spacing={1} alignItems="center">
							<IconButton color="inherit" onClick={prevStep}>
								<ArrowBackIosNewRounded />
							</IconButton>
							<Typography variant="h6">Confirm Sheet</Typography>
						</Stack>
					</Header>

					<Container
						maxWidth="sm"
						sx={{
							padding: "1rem",
						}}
					>
						<ConfirmNewSheet />
					</Container>
				</Box>
			</MultiStepForm>
		</>
	);
}
