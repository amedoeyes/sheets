import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HeaderButton from "./HeaderButton";

export default function NewSheetButton() {
	const navigate = useNavigate();
	const handleClick = () => navigate("/newSheet");
	return (
		<HeaderButton onClick={handleClick}>
			<FaPlus />
		</HeaderButton>
	);
}
