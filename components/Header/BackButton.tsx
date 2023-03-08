import { FaArrowLeft } from "react-icons/fa";
import HeaderButton from "./HeaderButton";

type BackButtonProps = {
	onClick: () => void;
};

export default function BackButton({ onClick }: BackButtonProps) {
	return (
		<HeaderButton onClick={onClick}>
			<FaArrowLeft />
		</HeaderButton>
	);
}
