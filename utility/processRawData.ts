export default function processRawData(rawData: RawData): ProcessedData {
	if (!rawData) {
		return {
			stations: [],
			points: [],
			level: 0,
			rawData: undefined,
		};
	}

	const stations = Array.from(
		Array(
			(rawData.endStation - rawData.startStation) /
				rawData.stationsDivision +
				1
		),
		(_, index) =>
			(rawData.startStation + index * rawData.stationsDivision)
				.toLocaleString()
				.replace(",", "+")
	).map((station: string) =>
		station.length < 4 ? "0+" + station.padStart(3, "0") : station
	);

	const points = Array.from(
		Array(Math.ceil(rawData.sectionWidth / rawData.pointsWidth) + 1),
		(_, index) =>
			index * rawData.pointsWidth > rawData.sectionWidth
				? rawData.sectionWidth -
				  index * rawData.pointsWidth +
				  index * rawData.pointsWidth
				: index * rawData.pointsWidth
	);

	if (rawData.offset) points.unshift(rawData.offset);

	const level = rawData.backsight + rawData.benchmark + rawData.thickness;

	return {
		stations,
		points,
		level,
		rawData,
	};
}
