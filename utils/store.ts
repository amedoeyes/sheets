import { configureStore } from "@reduxjs/toolkit";
import newSheetSlice from "../features/newSheet/newSheetSlice";
import sheetsSlice from "../features/sheets/sheetsSlice";
import sheetSlice from "../features/sheets/sheetSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
	reducer: {
		newSheet: newSheetSlice.reducer,
		sheets: sheetsSlice.reducer,
		sheet: sheetSlice.reducer,
	},
});

export default store;
