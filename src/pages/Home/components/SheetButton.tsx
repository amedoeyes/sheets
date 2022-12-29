import { useNavigate } from "react-router-dom";
import { useDate } from "../../../hooks/useDate";

type SheetButtonProps = {
	title: string;
	creationDate?: Date;
	stations?: string[];
	to: string;
};

const SheetButton = ({
	title,
	creationDate,
	stations,
	to,
}: SheetButtonProps) => {
	const navigate = useNavigate();
	const handleClick = () => navigate(to);
	const date = creationDate ? useDate(creationDate) : null;

	return (
		<button
			type="button"
			className="bg-primary w-full p-6 flex flex-col justify-center gap-2 text-lg border border-secondary border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 rounded-3xl outline-none;"
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
		</button>
	);
};

export default SheetButton;
