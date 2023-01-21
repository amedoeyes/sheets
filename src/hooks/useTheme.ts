import useLocalStorage from "./useLocaleStorage";

export default function useTheme() {
	const [darkTheme, setDarkTheme] = useLocalStorage(
		"darkTheme",
		window.matchMedia("(prefers-color-scheme: dark)").matches
	);

	if (darkTheme) document.documentElement.classList.add("dark");

	const toggleTheme = () => {
		document.documentElement.classList.toggle("dark");
		setDarkTheme((prev) => !prev);
	};

	return [darkTheme, toggleTheme] as const;
}
