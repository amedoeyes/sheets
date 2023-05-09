import { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Pwa from "./pwa";

type RootLayoutProps = {
	children: React.ReactNode;
};

export const metadata: Metadata = {
	title: "Sheets",
	description: "Web app to create survey spreadsheets",
	viewport:
		"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no",
	manifest: "/manifest.json",
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
				<Pwa />
			</body>
		</html>
	);
}
