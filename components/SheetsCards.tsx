"use client";

import { getAllSheets } from "@/features/sheets/sheetsSlice";
import { AppDispatch, RootState } from "@/utils/store";
import { Inventory2Outlined } from "@mui/icons-material";
import { Box, Fade, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SheetCard from "./SheetCard";

export default function SheetsCards() {
	const dispatch = useDispatch<AppDispatch>();
	const { sheets, status } = useSelector((state: RootState) => state.sheets);

	useEffect(() => {
		dispatch(getAllSheets());
	}, []);

	return status === "loading" ? (
		<Grid
			container
			maxWidth="xl"
			padding={2}
			marginX="auto"
			justifyContent="center"
			gap={2}
		>
			{Array.from({ length: 10 }).map((_, i) => (
				<Grid key={i} item xs="auto">
					<Skeleton
						variant="rectangular"
						width="20rem"
						height="10rem"
						sx={{
							borderRadius: "1rem",
						}}
					/>
				</Grid>
			))}
		</Grid>
	) : sheets.length === 0 ? (
		<Box
			position="absolute"
			top="0"
			left="0"
			width="100%"
			height="100%"
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			<Stack alignItems="center" sx={{ opacity: "0.25" }}>
				<Inventory2Outlined
					style={{
						width: "8rem",
						height: "8rem",
					}}
				/>
				<Typography variant="h3" fontWeight="bold">
					Empty
				</Typography>
			</Stack>
		</Box>
	) : (
		<Grid
			container
			maxWidth="xl"
			padding={2}
			marginX="auto"
			justifyContent="center"
			gap={2}
		>
			{sheets.map((sheet) => (
				<Fade key={sheet.id} in={true} timeout={1000}>
					<Grid item xs="auto">
						<SheetCard sheet={sheet} />
					</Grid>
				</Fade>
			))}
		</Grid>
	);
}
