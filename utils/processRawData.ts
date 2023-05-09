import { ProcessedData, RawData, Stations } from "@/types";

export default function processRawData(
	rawData: RawData,
	initialStations?: Stations
): ProcessedData {
	const stationsLabels = Array.from(
		{
			length:
				(rawData.endStation - rawData.startStation) /
					rawData.stationsInterval +
				1,
		},
		(_, index) => {
			const station = (
				rawData.startStation +
				index * rawData.stationsInterval
			).toLocaleString();

			const formattedStation =
				station.length > 4
					? station.replace(",", "+")
					: "0+" + station.padStart(3, "0");

			return formattedStation;
		}
	);

	const stations: Stations = Object.fromEntries(
		stationsLabels.map((station) => [
			station,
			initialStations?.[station] || 0,
		])
	);

	const points =
		rawData.pointsWidth <= 0
			? [0]
			: Array.from(
					{
						length:
							Math.ceil(
								rawData.layerWidth / rawData.pointsWidth
							) + 1,
					},
					(_, index) =>
						index * rawData.pointsWidth > rawData.layerWidth
							? rawData.layerWidth
							: index * rawData.pointsWidth
			  );

	if (rawData.offset) points.unshift(rawData.offset);

	const level = rawData.backsight + rawData.benchmark;

	return {
		stations,
		points,
		level,
	};
}
