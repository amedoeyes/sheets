import { createContext, useContext, useState } from "react";

type ProcessedDataContextType = {
	processedData: ProcessedData;
	setProcessedData: (processedData: ProcessedData) => void;
	deleteProcessedData: () => void;
};

const ProcessedDataContext = createContext<ProcessedDataContextType>({
	processedData: { level: 0, stations: [], points: [], rawData: undefined },
	setProcessedData: () => {},
	deleteProcessedData: () => {},
});

export default function ProcessedDataProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [processedData, setProcessedData] = useState<ProcessedData>({
		level: 0,
		stations: [],
		points: [],
		rawData: undefined,
	});

	const deleteProcessedData = () => {
		setProcessedData({
			level: 0,
			stations: [],
			points: [],
			rawData: undefined,
		});
	};

	const contextValue = {
		processedData,
		setProcessedData,
		deleteProcessedData,
	};

	return (
		<ProcessedDataContext.Provider value={contextValue}>
			{children}
		</ProcessedDataContext.Provider>
	);
}

export function useProcessedDataContext() {
	return useContext(ProcessedDataContext);
}
