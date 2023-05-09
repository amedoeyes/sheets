export declare type RawData = {
	stationsInterval: number;
	startStation: number;
	endStation: number;
	pointsWidth: number;
	layerWidth: number;
	layerHeight: number;
	offset: number;
	slope: number;
	backsight: number;
	benchmark: number;
};

export declare type Stations = Record<string, number>;
export declare type StationsLabels = Array<string>;
export declare type Points = Array<number>;

export declare type ProcessedData = {
	stations: Stations;
	points: Points;
	level: number;
};

export declare type Cell = {
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

export declare type Cells = Array<Array<Cell>>;

export declare type Sheet = {
	id: string;
	title: string;
	creationDate: string;
	cells: Cells;
	processedData: ProcessedData;
	rawData: RawData;
};

export declare type Sheets = Array<Sheet>;
