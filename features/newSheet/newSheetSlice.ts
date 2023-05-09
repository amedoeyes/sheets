import { Sheet } from "@/types";
import createStationsCells from "@/utils/createCells";
import processRawData from "@/utils/processRawData";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState: Sheet = {
	id: "",
	title: "",
	creationDate: "",
	cells: [],
	processedData: {
		stations: {},
		points: [],
		level: 0,
	},
	rawData: {
		stationsInterval: 10,
		startStation: 0,
		endStation: 0,
		pointsWidth: 0,
		layerWidth: 0,
		layerHeight: 0,
		offset: 0,
		slope: 0,
		backsight: 0,
		benchmark: 0,
	},
};

const newSheetSlice = createSlice({
	name: "newSheet",
	initialState,
	reducers: {
		setTitle: (state, action) => {
			state.title = action.payload;
		},
		setRawData: (state, action) => {
			state.rawData = action.payload;
			state.processedData = processRawData(action.payload);
		},
		setStations(state, action) {
			state.processedData.stations = action.payload;
			state.cells = createStationsCells(
				state.processedData.stations,
				state.processedData.points,
				state.processedData.level,
				state.rawData.layerHeight,
				state.rawData.slope
			);
		},
		finalizeNewSheet: (state) => {
			state.id = uuidv4();
			state.creationDate = new Date().toISOString();
		},
		resetState: () => initialState,
	},
});

export const {
	setTitle,
	setRawData,
	setStations,
	finalizeNewSheet,
	resetState,
} = newSheetSlice.actions;
export default newSheetSlice;
