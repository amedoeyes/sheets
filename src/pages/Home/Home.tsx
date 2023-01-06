import { useNavigate } from "react-router-dom";
import { SheetData } from "../../App";
import HeaderText from "../../components/HeaderText";
import DeleteSheetButton from "./components/DeleteSheetButton";
import SheetButton from "./components/SheetButton";

type HomeProps = {
	sheetsData: SheetData[];
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

export default function Home({ sheetsData, setSheetsData }: HomeProps) {
	const navigate = useNavigate();

	const handleClick = () => navigate("/newSheet");

	return (
		<div className="max-w-lg px-10 pb-10 flex flex-col items-center m-auto">
			<HeaderText>Sheets</HeaderText>
			<div className="w-full flex flex-col gap-4">
				{sheetsData.map(({ id, title, creationDate, stations }) => (
					<SheetButton
						key={id}
						title={title}
						creationDate={creationDate}
						stations={stations}
						to={`sheet/${id}`}
					>
						<DeleteSheetButton
							id={id}
							setSheetsData={setSheetsData}
						/>
					</SheetButton>
				))}
				<button
					className="bg-primary w-full p-6 relative flex flex-col justify-center gap-2 text-lg border border-secondary border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 rounded-3xl outline-none"
					onClick={handleClick}
				>
					New Sheet
				</button>
			</div>
		</div>
	);
}
