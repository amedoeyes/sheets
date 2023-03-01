import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import HeaderButton from "./HeaderButton";

export default function NewSheetButton() {
	const router = useRouter();
	const handleClick = () => router.push("/sheet/new");
	return (
		<HeaderButton onClick={handleClick}>
			<FaPlus />
		</HeaderButton>
	);
}
