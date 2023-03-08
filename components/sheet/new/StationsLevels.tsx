import H2 from "@/components/H2";
import BackButton from "@/components/Header/BackButton";
import Header from "@/components/Header/Header";
import ParsePDFButton from "@/components/Header/ParsePDFButton";
import Modal from "@/components/Modal";
import { useNewSheetContext } from "@/contexts/NewSheetContext";
import { useState } from "react";
import ParsePDFForm from "./forms/ParsePDFForm";
import StationsForm from "./forms/StationsForm";

export default function StationsLevels() {
	const { prevStep } = useNewSheetContext();
	const [showPDFForm, setShowPDFForm] = useState(false);

	return (
		<>
			{showPDFForm && (
				<Modal>
					<Header>
						<BackButton onClick={() => setShowPDFForm(false)} />
						<H2>Parse PDF</H2>
					</Header>
					<ParsePDFForm />
				</Modal>
			)}
			<Header className="justify-between">
				<div className="flex items-center gap-2">
					<BackButton onClick={() => prevStep()} />
					<H2>Stations Levels</H2>
				</div>
				<div>
					<ParsePDFButton onClick={() => setShowPDFForm(true)} />
				</div>
			</Header>
			<StationsForm />
		</>
	);
}
