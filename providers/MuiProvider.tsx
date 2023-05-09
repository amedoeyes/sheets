"use client";

import themes from "@/utils/themes";
import { CssBaseline, Slide, Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import {
	Experimental_CssVarsProvider as CssVarsProvider,
	getInitColorSchemeScript,
	experimental_extendTheme as extendTheme,
} from "@mui/material/styles";

type MuiProviderProps = {
	children: React.ReactNode;
};

export default function MuiProvider({ children }: MuiProviderProps) {
	const pathName = usePathname();

	const direction = useMemo(
		() => (pathName !== "/" ? "left" : "right"),
		[pathName]
	);

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const extendedTheme = extendTheme({
		colorSchemes: themes,
	});

	getInitColorSchemeScript();

	return (
		<NextAppDirEmotionCacheProvider
			options={{
				key: "css",
			}}
		>
			<CssVarsProvider theme={extendedTheme}>
				<CssBaseline />
				<Slide
					key={pathName}
					direction={direction}
					in={true}
					appear={mounted}
				>
					<Box>{children}</Box>
				</Slide>
			</CssVarsProvider>
		</NextAppDirEmotionCacheProvider>
	);
}
