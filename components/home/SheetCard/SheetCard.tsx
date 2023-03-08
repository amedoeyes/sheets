import DeleteSheetButton from "./DeleteSheetButton";
import SheetButton from "./SheetButton";

type SheetCardProps = {
	id: string;
	title: string;
	creationDate: Date;
	stationsLabels: StationsLabels;
};

export default function SheetCard({
	id,
	title,
	creationDate,
	stationsLabels,
}: SheetCardProps) {
	return (
		<div className="bg-primary w-full flex justify-center relative shadow-md rounded-3xl active:shadow-sm">
			<DeleteSheetButton id={id} />
			<SheetButton
				title={title}
				creationDate={creationDate}
				stationsLabels={stationsLabels}
				id={`sheet/${id}`}
			/>
		</div>
	);
}
