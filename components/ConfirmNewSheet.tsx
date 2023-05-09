import { AppDispatch, RootState } from "@/utils/store";
import { useDispatch, useSelector } from "react-redux";
import { addSheet } from "@/features/sheets/sheetsSlice";
import { useRouter } from "next/navigation";
import SheetInfoTable from "./SheetInfoTable";
import { Button, Stack } from "@mui/material";
import { finalizeNewSheet } from "@/features/newSheet/newSheetSlice";
import { useEffect } from "react";

export default function ConfirmNewSheet() {
	const dispatch = useDispatch<AppDispatch>();
	const newSheet = useSelector((state: RootState) => state.newSheet);
	const router = useRouter();

	useEffect(() => {
		dispatch(finalizeNewSheet());
	}, []);

	const handleClick = async () => {
		await dispatch(addSheet(newSheet));
		router.replace(`/sheet/${newSheet.id}`);
	};

	return (
		<Stack spacing={4}>
			<SheetInfoTable sheet={newSheet} />
			<Button
				variant="contained"
				size="large"
				sx={{
					borderRadius: "100rem",
				}}
				onClick={handleClick}
			>
				Next
			</Button>
		</Stack>
	);
}
