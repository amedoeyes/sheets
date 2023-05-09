import { Cells, Points, Stations } from "@/types";

export default function createStationsCells(
	stations: Stations,
	points: Points,
	level: number,
	layerHeight: number,
	slope: number
): Cells {
	const stationsLabels = Object.keys(stations);

	const stationsLevelsCells: Cells = stationsLabels.map((station) =>
		points.map((point) => {
			const value = Number(
				stations[station] + layerHeight + (point / 100) * slope
			).toFixed(3);

			const cell = {
				value: value,
				locked: true,
			};

			return cell;
		})
	);

	const actualStationsLevelsCells: Cells = stationsLabels.map((station) =>
		points.map((point) => {
			const value = Number(
				(
					level -
					(stations[station] + layerHeight) +
					(point / 100) * slope
				).toFixed(3)
			);

			const cell = {
				value: value,
				locked: true,
			};

			return cell;
		})
	);

	const differenceCells: Cells = stationsLabels.map((_) =>
		points.map((_) => ({
			value: "",
			inputMode: "decimal",
		}))
	);

	const cells: Cells = stationsLabels.flatMap((_, stationIndex) => [
		stationsLevelsCells[stationIndex],
		actualStationsLevelsCells[stationIndex],
		differenceCells[stationIndex],
	]);

	return cells;
}
