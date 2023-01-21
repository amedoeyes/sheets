import * as pdfjs from "pdfjs-dist";
import { TextItem } from "pdfjs-dist/types/src/display/api";

pdfjs.GlobalWorkerOptions.workerSrc =
	"../../../node_modules/pdfjs-dist/build/pdf.worker.js";

export default async function useParsePDFStations(
	file: ArrayBuffer,
	column: number
) {
	const doc = await pdfjs.getDocument(file).promise;
	const stations: Record<string, string> & Object = {};

	for (let currentPage = 1; currentPage <= doc.numPages; currentPage++) {
		const page = await doc.getPage(currentPage);
		const textContent = await page.getTextContent();
		let stationY = 0;
		let station = "";
		let row = "";

		for (const item of textContent.items as TextItem[]) {
			if (item.str.includes("+")) stationY = item.transform[5];

			if (item.transform[5] === stationY) {
				if (item.str.includes("+")) {
					const splitStation = item.str.split("+");

					station = [
						splitStation[0],
						splitStation[1].slice(0, 3),
					].join("+");
					row = "";
				}

				row += item.str;

				if (row.split(" ")[column - 1])
					stations[station] = row.split(" ")[column - 1];
			}
		}
	}

	return stations;
}
