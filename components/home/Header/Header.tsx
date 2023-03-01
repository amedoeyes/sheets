import NewSheetButton from "./NewSheetButton";
import InstallButton from "./InstallButton";
import H2 from "@/components/H2";

export default function Header() {
	return (
		<header className="bg-primary h-20 w-full flex justify-between items-center sticky top-0 z-50">
			<div className="ml-4">
				<H2 className="font-bold">SHEETS</H2>
			</div>
			<div className="flex gap-2 mr-4">
				<InstallButton />
				<NewSheetButton />
			</div>
		</header>
	);
}
