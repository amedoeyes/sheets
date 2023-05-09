import { AddRounded } from "@mui/icons-material";
import { Box, Button, Fade, Slide, useScrollTrigger } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type HideOnScrollProps = {
	children: React.ReactElement;
};

function HideOnScroll({ children }: HideOnScrollProps) {
	const isWindow = typeof window !== "undefined";

	const trigger = useScrollTrigger({
		target: isWindow ? window : undefined,
	});

	return (
		<Slide appear={false} direction="up" in={!trigger}>
			{children}
		</Slide>
	);
}

export default function NewSheetButton() {
	const router = useRouter();
	const routeToNewSheet = () => router.push("/sheet/new");

	return (
		<HideOnScroll>
			<Fade in={true} timeout={1000}>
				<Box
					height="100%"
					width="100%"
					position="fixed"
					top={0}
					right={0}
					zIndex={1}
					sx={{
						pointerEvents: "none",
					}}
				>
					<Button
						variant="contained"
						sx={{
							margin: "2rem",
							position: "absolute",
							bottom: "0",
							right: "0",
							aspectRatio: "1",
							borderRadius: "100rem",
							pointerEvents: "auto",
						}}
						onClick={routeToNewSheet}
					>
						<AddRounded
							sx={{
								width: "2rem",
								height: "2rem",
							}}
						/>
					</Button>
				</Box>
			</Fade>
		</HideOnScroll>
	);
}
