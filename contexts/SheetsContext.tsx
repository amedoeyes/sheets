import sheetsDB from "@/utility/sheetsDB";
import { createContext, useContext, useEffect, useState } from "react";

type SheetsContextType = {
	sheets: Sheets;
	getSheet: (id: string) => Sheet | undefined;
	addSheet: (sheet: Sheet) => void;
	removeSheet: (id: string) => void;
	updateSheet: (id: string, sheet: Sheet) => void;
};

const SheetsContext = createContext<SheetsContextType>({
	sheets: [],
	getSheet: (id: string) => undefined,
	addSheet: () => {},
	removeSheet: () => {},
	updateSheet: () => {},
});

export default function SheetsProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sheets, setSheets] = useState<Sheets>([]);

	useEffect(() => {
		sheetsDB.getAll().then((res) => setSheets(res));
	}, []);

	const getSheet = (id: string) => sheets.find((sheet) => sheet.id === id);

	const addSheet = (newSheet: Sheet) => {
		setSheets((prev) => [...prev, newSheet]);
		sheetsDB.add(newSheet);
	};

	const removeSheet = (id: string) => {
		setSheets((prev) => prev.filter((sheet) => sheet.id !== id));
		sheetsDB.deleteById(id);
	};

	const updateSheet = (id: string, newSheet: Sheet) => {
		setSheets((prev) =>
			prev.map((sheet) => (sheet.id === id ? newSheet : sheet))
		);
		sheetsDB.update(newSheet);
	};

	const contextValue: SheetsContextType = {
		sheets,
		getSheet,
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
