import { FaEdit } from "react-icons/fa";
import HeaderButton from "./HeaderButton";

type EditSheetButtonProps = {
	onclick: () => void;
};

export default function EditSheetButton({ onclick }: EditSheetButtonProps) {
	return (
		<HeaderButton onClick={onclick}>
			<FaEdit />
		</HeaderButton>
	);
}
