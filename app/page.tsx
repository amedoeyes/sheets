"use client";

import Header from "@/components/Header";
import Logo from "@/components/Logo";
import NewSheetButton from "@/components/NewSheetButton";
import Settings from "@/components/Settings";
import SheetsCards from "@/components/SheetsCards";
import { Icon, Stack, Typography } from "@mui/material";

export default function Home() {
	return (
		<>
			<Header>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Icon
						component={Logo}
						sx={{
							width: "2.5rem",
							height: "2.5rem",
						}}
					/>
					<Typography variant="h5">Sheets</Typography>
				</Stack>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Settings />
				</Stack>
			</Header>

			<SheetsCards />

			<NewSheetButton />
		</>
	);
}
