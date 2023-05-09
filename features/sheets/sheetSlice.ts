import { Sheet } from "@/types";
import SheetsDB from "@/utils/sheetsDB";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
	sheet: Sheet | null;
	status: "idle" | "loading" | "failed";
};

const sheetsDB = new SheetsDB();

const getSheetById = createAsyncThunk(
	"sheet/getSheetById",
	async (id: string) => {
		try {
			return await sheetsDB.getById(id);
		} catch (error) {
			console.error(error);
		}
	}
);

const updateSheet = createAsyncThunk(
	"sheet/updateSheet",
	async (sheet: Sheet) => {
		try {
			sheetsDB.update(sheet);
			return sheet;
		} catch (error) {
			console.error(error);
		}
	}
);

const initialState: InitialState = {
	sheet: null,
	status: "loading",
};

const sheetSlice = createSlice({
	name: "sheet",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getSheetById.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getSheetById.fulfilled, (state, action) => {
				state.status = "idle";
				state.sheet = action.payload || null;
			})

			.addCase(updateSheet.fulfilled, (state, action) => {
				state.sheet = action.payload || null;
			});
	},
});

export default sheetSlice;
export { getSheetById, updateSheet };
