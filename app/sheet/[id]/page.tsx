"use client";

import Header from "@/components/Header";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/store";
import Spreadsheet from "@amedoeyes/spreadsheet";
import EditSheetForm from "@/components/EditSheetForm";
import { getSheetById, updateSheet } from "@/features/sheets/sheetSlice";
import { Cells } from "@/types";
import { ArrowBackIosNewRounded, EditOutlined } from "@mui/icons-material";
import {
	Box,
	Container,
	Fade,
	IconButton,
	Modal,
	Skeleton,
	Slide,
	Stack,
	Typography,
} from "@mui/material";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function Sheet({ params }: { params: { id: string } }) {
	const dispatch = useDispatch<AppDispatch>();
	const { sheet, status } = useSelector((state: RootState) => state.sheet);

	const router = useRouter();
	const routeBack = () => router.back();

	const [showEditSheetForm, setShowEditSheetForm] = useState(false);
	const openEditSheetForm = () => setShowEditSheetForm(true);
	const closeEditSheetForm = () => setShowEditSheetForm(false);

	const { resolvedTheme } = useTheme();

	const { id } = params;

	useEffect(() => {
		if (id) dispatch(getSheetById(id));
	}, [id]);

	const stationsHeader = useMemo(
		() =>
			Object.keys(sheet?.processedData.stations || {}).flatMap(
				(station) => [station, "Act", "Diff"]
			),
		[sheet?.processedData.stations]
	);

	if (!sheet || status === "loading")
		return (
			<>
				<Header>
					<Stack direction="row" spacing={1} alignItems="center">
						<IconButton color="inherit" onClick={routeBack}>
							<ArrowBackIosNewRounded />
						</IconButton>
						<Typography variant="h6">Loading</Typography>
					</Stack>
				</Header>

				<Container
					sx={{
						maxWidth: "100%",
						padding: "1rem",
						margin: "0",
						overflowX: "auto",
					}}
				>
					<Skeleton
						variant="rectangular"
						width="100%"
						height="100vh"
						sx={{
							borderRadius: "0.25rem",
						}}
					/>
				</Container>
			</>
		);

	const handleChange = (cells: Cells) =>
		dispatch(updateSheet({ ...sheet, cells }));

	return (
		<>
			<Header>
				<Stack direction="row" spacing={1} alignItems="center">
					<IconButton color="inherit" onClick={routeBack}>
						<ArrowBackIosNewRounded />
					</IconButton>
					<Typography
						variant="h6"
						textOverflow="ellipsis"
						overflow="hidden"
						whiteSpace="nowrap"
						width="10rem"
					>
						{sheet.title}
					</Typography>
				</Stack>
				<div>
					<IconButton color="inherit" onClick={openEditSheetForm}>
						<EditOutlined />
					</IconButton>
				</div>
			</Header>

			<Container
				sx={{
					maxWidth: "auto",
					padding: "1rem",
					margin: "0",
					overflowX: "auto",
				}}
			>
				<Fade in={true} timeout={1000}>
					<Box>
						<Spreadsheet
							cells={sheet.cells}
							onChange={handleChange}
							rowHeader={sheet.processedData.points}
							colHeader={stationsHeader}
							darkMode={resolvedTheme === "dark"}
						/>
					</Box>
				</Fade>
			</Container>

			<Modal open={showEditSheetForm}>
				<Slide direction="left" in={showEditSheetForm}>
					<Box
						bgcolor="background.default"
						width="100%"
						height="100%"
					>
						<Header>
							<Stack
								direction="row"
								spacing={1}
								alignItems="center"
							>
								<IconButton
									color="inherit"
									onClick={closeEditSheetForm}
								>
									<ArrowBackIosNewRounded />
								</IconButton>
								<Typography variant="h6">EditSheet</Typography>
							</Stack>
						</Header>

						<Container
							maxWidth="sm"
							sx={{
								marginTop: "1rem",
							}}
						>
							<EditSheetForm nextStep={closeEditSheetForm} />
						</Container>
					</Box>
				</Slide>
			</Modal>
		</>
	);
}
