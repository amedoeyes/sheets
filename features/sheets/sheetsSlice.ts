import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SheetsDB from "@/utils/sheetsDB";
import { Sheet, Sheets } from "@/types";

type InitialState = {
	sheets: Sheets;
	status: "idle" | "loading" | "failed";
};

const sheetsDB = new SheetsDB();

const getAllSheets = createAsyncThunk("sheets/getAllSheets", async () => {
	try {
		const sheets = await sheetsDB.getAll();

		if (sheets) {
			sheets.sort(
				(a, b) =>
					new Date(b.creationDate).getTime() -
					new Date(a.creationDate).getTime()
			);
		}

		return sheets;
	} catch (error) {
		console.error(error);
	}
});

const addSheet = createAsyncThunk("sheets/addSheet", async (sheet: Sheet) => {
	try {
		return await sheetsDB.add(sheet);
	} catch (error) {
		console.error(error);
	}
});

const deleteSheet = createAsyncThunk(
	"sheets/deleteSheet",
	async (id: string) => {
		try {
			return sheetsDB.deleteById(id);
		} catch (error) {
			console.error(error);
		}
	}
);

const initialState: InitialState = {
	sheets: [],
	status: "loading",
};

const sheetsSlice = createSlice({
	name: "sheets",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllSheets.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getAllSheets.fulfilled, (state, action) => {
				state.status = "idle";
				state.sheets = action.payload || [];
			})

			.addCase(addSheet.fulfilled, (state, action) => {
				if (action.payload) state.sheets.unshift(action.payload);
			})

			.addCase(deleteSheet.fulfilled, (state, action) => {
				if (action.payload)
					state.sheets = state.sheets.filter(
						(sheet) => sheet.id !== action.payload
					);
			});
	},
});

export default sheetsSlice;
export { getAllSheets, addSheet, deleteSheet };
