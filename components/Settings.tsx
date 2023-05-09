import {
	Box,
	Container,
	IconButton,
	Modal,
	Slide,
	Stack,
	Typography,
} from "@mui/material";
import Header from "./Header";
import {
	ArrowBackIosNewRounded,
	GitHub,
	SettingsOutlined,
} from "@mui/icons-material";
import SelectTheme from "./SelectTheme";
import { useState } from "react";

export default function Settings() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const openRepo = () =>
		window.open("https://github.com/amedoeyes/sheets", "_blank");

	return (
		<>
			<IconButton color="inherit" onClick={handleOpen}>
				<SettingsOutlined />
			</IconButton>

			<Modal open={open} onClose={handleClose}>
				<Slide direction="left" in={open}>
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
									onClick={handleClose}
								>
									<ArrowBackIosNewRounded />
								</IconButton>
								<Typography variant="h6">Settings</Typography>
							</Stack>
						</Header>

						<Container
							maxWidth="sm"
							sx={{
								padding: "1rem",
							}}
						>
							<SelectTheme />
						</Container>

						<Box
							position="absolute"
							bottom={0}
							width="100%"
							textAlign="center"
						>
							<IconButton color="inherit" onClick={openRepo}>
								<GitHub fontSize="large" />
							</IconButton>
						</Box>
					</Box>
				</Slide>
			</Modal>
		</>
	);
}
