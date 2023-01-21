import { SheetData } from "../../App";
import DeleteSheetButton from "./components/DeleteSheetButton";
import EditSheetButton from "./components/EditSheetButton";
import Header from "./components/Header";
import SheetButton from "./components/SheetButton";
import SheetCard from "./components/SheetCard";

type HomeProps = {
	sheetsData: SheetData[];
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

export default function Home({ sheetsData, setSheetsData }: HomeProps) {
	return (
		<>
			<Header />
			<div className="max-w-lg p-10 m-auto flex flex-col items-center gap-4">
				{sheetsData.map((sheet) => (
					<SheetCard
						key={sheet.id}
						id={sheet.id}
						title={sheet.title}
						stations={sheet.stations}
						creationDate={sheet.creationDate}
						setSheetsData={setSheetsData}
					/>
				))}
			</div>
		</>
	);
}
