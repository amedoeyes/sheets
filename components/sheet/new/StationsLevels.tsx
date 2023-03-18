import { useNewSheetContext } from "@/contexts/NewSheetContext";
import ParsePDFForm from "./forms/ParsePDFForm";
import StationsForm from "./forms/StationsForm";

export default function StationsLevels() {
	const { showPDFForm } = useNewSheetContext();

	return (
		<>
			{showPDFForm && <ParsePDFForm />}
			<StationsForm />
		</>
	);
}
