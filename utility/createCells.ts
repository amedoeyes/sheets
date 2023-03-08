export default function createCells(processedData: ProcessedData): Cells {
	return processedData.stationsLabels
		.map((station) =>
			processedData.points.map((point) => ({
				value: Number(
					(
						processedData.level -
						processedData.stations[station] +
						(point / 100) * processedData.rawData.slope
					).toFixed(3)
				),
				locked: true,
			}))
		)
		.flatMap((row) => [
			row,
			processedData.points.map((_) => ({
				value: "",
				inputMode: "decimal",
			})),
		]);
}
