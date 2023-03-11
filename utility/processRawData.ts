export default function processRawData(rawData: RawData): ProcessedData {
	if (!rawData) {
		return {
			stationsLabels: [],
			stations: {},
			points: [],
			level: 0,
		};
	}

	const stationsLabels = Array.from(
		Array(
			(rawData.endStation - rawData.startStation) /
				rawData.stationsInterval +
				1
		),
		(_, index) =>
			(rawData.startStation + index * rawData.stationsInterval)
				.toLocaleString()
				.replace(",", "+")
	).map((station: string) =>
		station.length < 4 ? "0+" + station.padStart(3, "0") : station
	);

	const stations: Stations = Object.fromEntries(
		stationsLabels.map((station) => [station, 0])
	);

	const points = Array.from(
		Array(Math.ceil(rawData.layerWidth / rawData.pointsWidth) + 1),
		(_, index) =>
			index * rawData.pointsWidth > rawData.layerWidth
				? rawData.layerWidth -
				  index * rawData.pointsWidth +
				  index * rawData.pointsWidth
				: index * rawData.pointsWidth
	);

	if (rawData.offset) points.unshift(rawData.offset);

	const level = rawData.backsight + rawData.benchmark;

	return {
		stationsLabels,
		stations,
		points,
		level,
	};
}
