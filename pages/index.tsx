import Head from "next/head";
import packageInfo from "@/package.json";
import Header from "@/components/home/Header/Header";
import SheetCard from "@/components/home/SheetCard/SheetCard";
import { FaFile } from "react-icons/fa";
import { useSheetsContext } from "@/contexts/SheetsContext";
import { useEffect } from "react";
import { useProcessedDataContext } from "@/contexts/ProcessedDataContext";

export default function Home() {
	const { sheets } = useSheetsContext();
	const { deleteProcessedData } = useProcessedDataContext();

	useEffect(() => {
		deleteProcessedData();
	}, []);

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
				<Header />
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
							stations={sheet.stations}
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
