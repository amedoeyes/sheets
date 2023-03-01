import useLocalStorage from "@/hooks/useLocaleStorage";
import { createContext, useContext, useEffect, useState } from "react";

type SheetsContextType = {
	sheets: Sheets;
	addSheet: (sheet: Sheet) => void;
	removeSheet: (id: string) => void;
	updateSheet: (id: string, sheet: Sheet) => void;
};

const SheetsContext = createContext<SheetsContextType>({
	sheets: [],
	addSheet: () => {},
	removeSheet: () => {},
	updateSheet: () => {},
});

export function SheetsProvider({ children }: { children: React.ReactNode }) {
	const sheets = useLocalStorage<Sheets>("sheets", []);

	const addSheet = (newSheet: Sheet) => {
		sheets.setValue((prev) => [...prev, newSheet]);
	};

	const removeSheet = (id: string) => {
		sheets.setValue((prev) => prev.filter((sheet) => sheet.id !== id));
	};

	const updateSheet = (id: string, newSheet: Sheet) => {
		sheets.setValue((prev) =>
			prev.map((sheet) => (sheet.id === id ? newSheet : sheet))
		);
	};

	const contextValue: SheetsContextType = {
		sheets: sheets.value,
		addSheet,
		removeSheet,
		updateSheet,
	};

	return (
		<SheetsContext.Provider value={contextValue}>
			{children}
		</SheetsContext.Provider>
	);
}

export function useSheetsContext() {
	return useContext(SheetsContext);
}
