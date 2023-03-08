import SheetsProvider from "@/contexts/SheetsContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SheetsProvider>
			<Component {...pageProps} />
		</SheetsProvider>
	);
}
