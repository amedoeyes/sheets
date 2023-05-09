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
	parsingStatusCallback?: (parsingStatus: ParsingStatus) => void
): Promise<Stations> {
	const stations: Stations = {};

	try {
		parsingStatusCallback?.({
			isParsing: true,
			progress: 0,
		});

		const doc = await pdfjs.getDocument(file).promise;

		for (let currentPage = 1; currentPage <= doc.numPages; currentPage++) {
			const page = await doc.getPage(currentPage);
			const textContent = await page.getTextContent();

			let currentStationName = "";
			let currentRowText = "";

			for (const item of textContent.items) {
				if ("str" in item) {
					const stationRegex = /^([0-9]+)\+([0-9]{3})/;
					const match = stationRegex.exec(item.str);

					if (match) {
						currentStationName = `${match[1]}+${match[2]}`;
						currentRowText = "";
					}

					currentRowText += item.str;
					const levelColumn = currentRowText.split(" ")[column - 1];

					if (currentStationName && Number(levelColumn))
						stations[currentStationName] = Number(levelColumn);
				}
			}

			parsingStatusCallback?.({
				isParsing: true,
				progress: (currentPage / doc.numPages) * 100,
			});
		}
		parsingStatusCallback?.({
			isParsing: false,
			progress: 100,
		});
	} catch (error) {
		console.error(error);
		parsingStatusCallback?.({
			isParsing: false,
			progress: 0,
		});
	}

	return stations;
}
