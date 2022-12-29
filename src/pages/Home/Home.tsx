import { SheetData } from "../../App";
import HeaderText from "../../components/HeaderText";
import SheetButton from "./components/SheetButton";

type HomeProps = {
	sheetsData: SheetData[];
};

const Home = ({ sheetsData }: HomeProps) => {
	return (
		<div className="max-w-lg px-10 pb-10 flex flex-col items-center m-auto">
			<HeaderText>Sheets</HeaderText>
			<div className="w-full flex flex-col gap-4">
				{sheetsData.map(({ title, creationDate, stations }) => (
					<SheetButton
						key={title}
						title={title}
						creationDate={creationDate}
						stations={stations}
						to={`sheet/${title}`}
					/>
				))}
				<SheetButton title="New Sheet" to="newSheet" />
			</div>
		</div>
	);
};

export default Home;
