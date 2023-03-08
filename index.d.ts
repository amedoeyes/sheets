declare type RawData = {
	title: string;
	stationsDivision: number;
	startStation: number;
	endStation: number;
	pointsWidth: number;
	sectionWidth: number;
	offset: number;
	slope: number;
	backsight: number;
	benchmark: number;
	thickness: number;
};

declare type Stations = Record<string, number>;
declare type StationsLabels = Array<string>;
declare type Points = Array<number>;

declare type ProcessedData = {
	stations: Stations;
	stationsLabels: StationsLabels;
	points: Points;
	level: number;
};

declare type Cell = {
	value: number | string;
	locked?: boolean;
	inputMode?:
		| "search"
		| "text"
		| "none"
		| "tel"
		| "url"
		| "email"
		| "numeric"
		| "decimal";
};

declare type Cells = Array<Array<Cell>>;

declare type Sheet = {
	id: string;
	title: string;
	creationDate: Date;
	cells: Cells;
	processedData: ProcessedData;
	rawData: RawData;
};

declare type Sheets = Array<Sheet>;
