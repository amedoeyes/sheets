import { useRouter } from "next/router";
import parseDate from "@/utility/parseDate";
import H2 from "@/components/H2";

type SheetButtonProps = {
	id: string;
	title: string;
	creationDate: Date;
	stationsLabels: StationsLabels;
};

export default function SheetButton({
	title,
	creationDate,
	stationsLabels,
	id,
}: SheetButtonProps) {
	const router = useRouter();
	const handleClick = () => router.push(id);
	const date = parseDate(creationDate);

	return (
		<button
			type="button"
			className="w-full py-6 flex flex-col justify-center items-center gap-2 text-lg"
			onClick={handleClick}
		>
			<H2 className="my-1 font-normal">{title}</H2>
			<p>
				{stationsLabels[0]} -{" "}
				{stationsLabels[stationsLabels.length - 1]}
			</p>
			<p>{date}</p>
		</button>
	);
}
