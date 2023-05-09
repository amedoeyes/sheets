"use client";

import { ThemeProvider } from "next-themes";

type NextThemeProviderProps = {
	children: React.ReactNode;
};

export default function NextThemeProvider({
	children,
}: NextThemeProviderProps) {
	return (
		<ThemeProvider attribute="data-mui-color-scheme">
			{children}
		</ThemeProvider>
	);
}
