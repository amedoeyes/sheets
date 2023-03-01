import ProcessedDataProvider from "@/contexts/ProcessedDataContext";
import { SheetsProvider } from "@/contexts/SheetsContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ProcessedDataProvider>
			<SheetsProvider>
				<Component {...pageProps} />
			</SheetsProvider>
		</ProcessedDataProvider>
	);
}
