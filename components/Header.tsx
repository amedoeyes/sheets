import { AppBar, Slide, Toolbar, useScrollTrigger } from "@mui/material";

type HeaderProps = {
	freeze?: boolean;
	children: React.ReactNode;
};

type HideOnScrollProps = {
	children: React.ReactElement;
};

function HideOnScroll({ children }: HideOnScrollProps) {
	const isWindow = typeof window !== "undefined";

	const trigger = useScrollTrigger({
		target: isWindow ? window : undefined,
	});

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

export default function Header({ children }: HeaderProps) {
	return (
		<HideOnScroll>
			<AppBar
				position="sticky"
				sx={{
					bgcolor: "background.default",
					backgroundImage: "none",
					color: "text.primary",
					boxShadow: "none",
				}}
			>
				<Toolbar
					sx={{ padding: "1rem", justifyContent: "space-between" }}
				>
					{children}
				</Toolbar>
			</AppBar>
		</HideOnScroll>
	);
}
