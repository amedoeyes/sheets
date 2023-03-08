import Head from "next/head";
import packageInfo from "@/package.json";
import SheetCard from "@/components/home/SheetCard/SheetCard";
import { FaFile } from "react-icons/fa";
import { useSheetsContext } from "@/contexts/SheetsContext";
import Header from "@/components/Header/Header";
import H2 from "@/components/H2";
import InstallButton from "@/components/Header/InstallButton";
import NewSheetButton from "@/components/Header/NewSheetButton";

export default function Home() {
	const { sheets } = useSheetsContext();

	return (
		<>
			<Head>
				<title>Sheets</title>
				<meta
					name="description"
					content="Web app to create survey spreadsheets"
				/>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
				<link rel="manifest" href="/manifest.json" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Header className="justify-between">
					<H2 className="ml-4">SHEETS</H2>
					<div className="flex gap-2 mr-4">
						<InstallButton />
						<NewSheetButton />
					</div>
				</Header>
				<div className="max-w-lg p-10 m-auto flex flex-col items-center gap-4">
					{sheets.length === 0 && (
						<div className="pt-20 flex flex-col items-center gap-2 absolute top-1/2 -translate-y-1/2 opacity-25">
							<FaFile size={75} />
							<p className="text-4xl font-bold">Empty</p>
						</div>
					)}
					{sheets.map((sheet) => (
						<SheetCard
							key={sheet.id}
							id={sheet.id}
							title={sheet.title}
							stationsLabels={sheet.processedData.stationsLabels}
							creationDate={sheet.creationDate}
						/>
					))}
				</div>
				<p className="p-2 opacity-50 fixed bottom-0 right-0">
					{packageInfo.version}
				</p>
			</main>
		</>
	);
}
