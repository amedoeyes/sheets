import MuiProvider from "@/providers/MuiProvider";
import NextThemeProvider from "@/providers/NextThemeProvider";
import ReduxProvider from "@/providers/ReduxProvider";

type ProviderProps = {
	children: React.ReactNode;
};

export default function Providers({ children }: ProviderProps) {
	return (
		<ReduxProvider>
			<NextThemeProvider>
				<MuiProvider>{children}</MuiProvider>
			</NextThemeProvider>
		</ReduxProvider>
	);
}
