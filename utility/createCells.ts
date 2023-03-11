export default function createCells(
	rawData: RawData,
	processedData: ProcessedData
): Cells {
	return processedData.stationsLabels
		.map((station) =>
			processedData.points.map((point) => ({
				value: Number(
					(
						processedData.level -
						(processedData.stations[station] +
							rawData.layerThickness) +
						(point / 100) * rawData.slope
					).toFixed(3)
				),
				locked: true,
			}))
		)
		.flatMap((row, index) => [
			processedData.stationsLabels.map((station) =>
				processedData.points.map((point) => ({
					value: Number(
						processedData.stations[station] +
							rawData.layerThickness +
							(point / 100) * rawData.slope
					).toFixed(3),
					locked: true,
				}))
			)[index],
			row,
			processedData.points.map((_) => ({
				value: "",
				inputMode: "decimal",
			})),
		]);
}
