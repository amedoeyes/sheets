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

declare type Stations = Array<string>;
declare type Points = Array<number>;

declare type ProcessedData = {
	stations: Stations;
	points: Points;
	level: number;
	rawData: RawData | undefined;
};

declare type Cell = {
	value: number | string;
	locked?: boolean;
};

declare type Cells = Array<Array<Cell>>;

declare type Sheet = {
	id: string;
	title: string;
	creationDate: Date;
	stations: Stations;
	points: Points;
	cells: Cells;
};

declare type Sheets = Array<Sheet>;
