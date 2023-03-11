import Spreadsheet from "@/components/sheet/Spreadsheet";
import { useRouter } from "next/router";
import { useSheetsContext } from "@/contexts/SheetsContext";
import BackButton from "@/components/Header/components/BackButton";
import Header from "@/components/Header";
import H2 from "@/components/H2";
import Head from "next/head";

export default function Sheet() {
	const { sheets, updateSheet } = useSheetsContext();
	const router = useRouter();
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
				<title>{sheet.title}</title>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
			</Head>
			<div className="overflow-auto">
				<Header>
					<BackButton onClick={() => router.back()} />
					<H2 className="ml-4">{sheet.title}</H2>
				</Header>
				<Spreadsheet
					cells={sheet.cells}
					onChange={onChange}
					rowHeader={sheet.processedData.points}
					colHeader={stationsHeader}
				/>
			</div>
		</>
	);
}
