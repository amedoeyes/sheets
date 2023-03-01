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

	let { title, stations, points, cells } = sheet;

	const onChange = (cells: Cells) => updateSheet(id, { ...sheet, cells });

	stations = stations.flatMap((station) => [station, "Diff"]);

	return (
		<div>
			<H1 className="ml-4">{title}</H1>
			<Spreadsheet
				cells={cells}
				onChange={onChange}
				colHeader={stations}
				rowHeader={points}
			/>
		</div>
	);
}
