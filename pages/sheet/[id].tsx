import H1 from "@/components/H1";
import Spreadsheet from "@/components/sheet/Spreadsheet";
import { useRouter } from "next/router";
import { useSheetsContext } from "@/contexts/SheetsContext";

export default function Sheet() {
	const { sheets, updateSheet } = useSheetsContext();
	const router = useRouter();
	if (!router.isReady) return <H1>Loading...</H1>;

	const id = router.query.id!.toString();
	const sheet: Sheet | undefined = sheets?.find((sheet) => sheet.id === id);

	if (!sheet) return <H1>Loading...</H1>;

	const onChange = (cells: Cells) => updateSheet(id, { ...sheet, cells });

	const stationsHeader = sheet.processedData.stationsLabels.flatMap(
		(station) => [station, "Diff"]
	);

	return (
		<div>
			<H1 className="ml-4">{sheet.title}</H1>
			<Spreadsheet
				cells={sheet.cells}
				onChange={onChange}
				rowHeader={sheet.processedData.points}
				colHeader={stationsHeader}
			/>
		</div>
	);
}
