import { useRouter } from "next/router";
import parseDate from "@/utility/parseDate";

type SheetButtonProps = {
	title: string;
	creationDate: Date;
	stations: string[];
	to: string;
};

export default function SheetButton({
	title,
	creationDate,
	stations,
	to,
}: SheetButtonProps) {
	const router = useRouter();
	const handleClick = () => router.push(to);
	const date = parseDate(creationDate);

	return (
		<button
			type="button"
			className="w-full py-6 flex flex-col justify-center items-center gap-2 text-lg"
			onClick={handleClick}
		>
			<h2 className="text-2xl">{title}</h2>
			<div className="flex justify-center">
				<p>
					{stations[0]} - {stations[stations.length - 1]}
				</p>
			</div>
			<p>{date}</p>
		</button>
	);
}
