import * as pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
import { TextItem } from "pdfjs-dist/types/src/display/api";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default async function useParsePDFStations(
	file: ArrayBuffer,
	column: number
) {
	const doc = await pdfjs.getDocument(file).promise;
	const stations: Record<string, string> & Object = {};

	for (let currentPage = 1; currentPage <= doc.numPages; currentPage++) {
		const page = await doc.getPage(currentPage);
		const textContent = await page.getTextContent();
		let station = "";
		let row = "";

		for (const item of textContent.items as TextItem[]) {
			if (item.str.includes("+")) {
				const splitStation = item.str.split("+");
				station = [splitStation[0], splitStation[1].slice(0, 3)].join(
					"+"
				);
				row = "";
			}
			row += item.str;

			if (station && row.split(" ")[column - 1])
				stations[station] = row.split(" ")[column - 1];
		}
	}
	return stations;
}
