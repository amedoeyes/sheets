import { Stations } from "@/types";
import * as pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

type ParsingStatus = {
	isParsing: boolean;
	progress: number;
};

export default async function parsePDFStations(
	file: ArrayBuffer,
	column: number,
	parsingStatusCallback?: (parsingStatus: ParsingStatus) => void,
): Promise<Stations> {
	const stations: Stations = {};

	try {
		parsingStatusCallback?.({ isParsing: true, progress: 0 });

		const doc = await pdfjs.getDocument(file).promise;

		for (let i = 1; i <= doc.numPages; i++) {
			const page = await doc.getPage(i);
			const textContent = await page.getTextContent();

			let station = "";
			let rowText = "";

			for (const item of textContent.items) {
				if ("str" in item) {
					const match = /^([0-9]+)\+([0-9]{3})/.exec(item.str);

					if (match) {
						station = `${Number(match[1])}+${match[2]}`;
						rowText = "";
					}

					rowText += item.str;
					const level = rowText.split(" ")[column - 1];
					console.log(station, level);

					if (station && Number(level)) stations[station] = Number(level);
				}
			}

			parsingStatusCallback?.({ isParsing: true, progress: (i / doc.numPages) * 100 });
		}
		parsingStatusCallback?.({ isParsing: false, progress: 100 });
	} catch (error) {
		console.error(error);
		parsingStatusCallback?.({ isParsing: false, progress: 0 });
	}

	return stations;
}
