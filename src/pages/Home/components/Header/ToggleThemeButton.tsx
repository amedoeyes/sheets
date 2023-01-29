import { FaSun, FaMoon } from "react-icons/fa";
import HeaderButton from "./HeaderButton";
import useTheme from "../../../../hooks/useTheme";

export default function ToggleThemeButton() {
	const [darkTheme, toggleTheme] = useTheme();
	return (
		<HeaderButton onClick={toggleTheme}>
			{darkTheme ? <FaSun /> : <FaMoon />}
		</HeaderButton>
	);
}
