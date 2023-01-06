import { useNavigate } from "react-router-dom";
import useDate from "../../../hooks/useDate";

type SheetButtonProps = {
	title: string;
	creationDate: Date;
	stations: string[];
	to: string;
	children?: React.ReactNode;
};

export default function SheetButton({
	title,
	creationDate,
	stations,
	to,
	children,
}: SheetButtonProps) {
	const navigate = useNavigate();
	const handleClick = () => navigate(to);
	const date = useDate(creationDate);

	return (
		<button
			type="button"
			className="bg-primary w-full p-6 relative flex flex-col justify-center gap-2 text-lg border border-secondary border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 rounded-3xl outline-none overflow-hidden"
			onClick={handleClick}
		>
			<h2 className="text-2xl">{title}</h2>

			{stations && (
				<div className="flex justify-center">
					<p>
						{stations[0]} - {stations[stations.length - 1]}
					</p>
				</div>
			)}
			{date && <p>{date}</p>}
			{children}
		</button>
	);
}
