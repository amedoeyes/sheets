import DeleteSheetButton from "./DeleteSheetButton";
import EditSheetButton from "./EditSheetButton";
import SheetButton from "./SheetButton";

type SheetCardProps = {
	id: string;
	title: string;
	creationDate: Date;
	stations: Stations;
};

export default function SheetCard({
	id,
	title,
	creationDate,
	stations,
}: SheetCardProps) {
	return (
		<div className="bg-primary w-full  flex justify-center relative border border-secondary border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 rounded-3xl outline-none overflow-hidden dark:bg-darkPrimary dark:text-darkSecondary dark:border-darkSecondary dark:border-opacity-50 dark:hover:border-opacity-100 dark:focus:border-opacity-100">
			<DeleteSheetButton id={id} />
			<SheetButton
				title={title}
				creationDate={creationDate}
				stations={stations}
				to={`sheet/${id}`}
			/>
			<EditSheetButton id={id} />
		</div>
	);
}