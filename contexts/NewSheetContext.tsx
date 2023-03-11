import { createContext, useContext, useState } from "react";

type NewSheetContextType = {
	step: number;
	nextStep: () => void;
	prevStep: () => void;
	showPDFForm: boolean;
	setShowPDFForm: React.Dispatch<React.SetStateAction<boolean>>;
	rawData: RawData;
	setRawData: React.Dispatch<React.SetStateAction<RawData>>;
	processedData: ProcessedData;
	setProcessedData: React.Dispatch<React.SetStateAction<ProcessedData>>;
};

const NewSheetContext = createContext<NewSheetContextType>({
	step: 0,
	nextStep: () => {},
	prevStep: () => {},
	showPDFForm: false,
	setShowPDFForm: () => {},
	rawData: {
		title: "",
		stationsInterval: 10,
		startStation: 0,
		endStation: 0,
		pointsWidth: 0,
		layerWidth: 0,
		offset: 0,
		slope: 0,
		backsight: 0,
		benchmark: 0,
		layerThickness: 0,
	},
	setRawData: () => {},
	processedData: {
		stationsLabels: [],
		stations: {},
		points: [],
		level: 0,
	},
	setProcessedData: () => {},
});

type NewSheetProviderProps = {
	children: React.ReactNode;
};

export default function NewSheetProvider({ children }: NewSheetProviderProps) {
	const [step, setStep] = useState(0);

	const nextStep = () => setStep((step) => step + 1);
	const prevStep = () => setStep((step) => step - 1);

	const [showPDFForm, setShowPDFForm] = useState(false);

	const [rawData, setRawData] = useState<RawData>({
		title: "",
		stationsInterval: 10,
		startStation: 0,
		endStation: 0,
		pointsWidth: 0,
		layerWidth: 0,
		offset: 0,
		slope: 0,
		backsight: 0,
		benchmark: 0,
		layerThickness: 0,
	});

	const [processedData, setProcessedData] = useState<ProcessedData>({
		stationsLabels: [],
		stations: {},
		points: [],
		level: 0,
	});

	const contextValue = {
		step,
		nextStep,
		prevStep,
		showPDFForm,
		setShowPDFForm,
		rawData,
		setRawData,
		processedData,
		setProcessedData,
	};

	return (
		<NewSheetContext.Provider value={contextValue}>
			{children}
		</NewSheetContext.Provider>
	);
}

export function useNewSheetContext() {
	return useContext(NewSheetContext);
}
