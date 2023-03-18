import Spreadsheet from "@/components/sheet/Spreadsheet";
import { useRouter } from "next/router";
import { useSheetsContext } from "@/contexts/SheetsContext";
import BackButton from "@/components/Header/components/BackButton";
import Header from "@/components/Header";
import H2 from "@/components/H2";
import Head from "next/head";
import EditSheetButton from "@/components/Header/components/EditSheetButton";
import { useState } from "react";
import EditSheetForm from "@/components/sheet/EditSheetForm";

export default function Sheet() {
	const { sheets, updateSheet } = useSheetsContext();
	const router = useRouter();
	const [showEditSheet, setShowEditSheet] = useState(false);
	if (!router.isReady) return <></>;

	const id = router.query.id!.toString();
	const sheet: Sheet | undefined = sheets?.find((sheet) => sheet.id === id);

	if (!sheet) return <></>;

	const onChange = (cells: Cells) => updateSheet(id, { ...sheet, cells });

	const stationsHeader = sheet.processedData.stationsLabels.flatMap(
		(station) => [station, "Act", "Diff"]
	);

	return (
		<>
			<Head>
				<title>{sheet.rawData.title}</title>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
			</Head>
			<Header className="justify-between">
				<div className="flex items-center gap-2">
					<BackButton onClick={() => router.replace("/")} />
					<H2>{sheet.rawData.title}</H2>
				</div>
				<div>
					<EditSheetButton onclick={() => setShowEditSheet(true)} />
				</div>
			</Header>
			{showEditSheet && (
				<EditSheetForm setShowEditSheet={setShowEditSheet} id={id} />
			)}
			<Spreadsheet
				cells={sheet.cells}
				onChange={onChange}
				rowHeader={sheet.processedData.points}
				colHeader={stationsHeader}
			/>
		</>
	);
}
