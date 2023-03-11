import { FaFilePdf, FaRegFilePdf } from "react-icons/fa";
import HeaderButton from "./HeaderButton";

type ParsePDFButtonProps = {
	onClick: () => void;
};

export default function ParsePDFButton({ onClick }: ParsePDFButtonProps) {
	return (
		<HeaderButton onClick={onClick}>
			<FaRegFilePdf />
		</HeaderButton>
	);
}
