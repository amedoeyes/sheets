import HeaderText from "../../../components/HeaderText";
import NewSheetButton from "./NewSheetButton";
import ToggleThemeButton from "./ToggleThemeButton";

export default function Header() {
	return (
		<div className="bg-primary h-20 w-full flex justify-between items-center sticky top-0 z-50 border-b border-secondary border-opacity-50 dark:bg-darkPrimary dark:border-darkSecondary dark:border-opacity-50">
			<div className="ml-4">
				<HeaderText className="text-2xl font-bold">Sheets</HeaderText>
			</div>
			<div className="flex gap-2 mr-4">
				<NewSheetButton />
				<ToggleThemeButton />
			</div>
		</div>
	);
}
