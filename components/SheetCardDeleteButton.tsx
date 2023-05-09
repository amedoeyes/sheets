import { deleteSheet } from "@/features/sheets/sheetsSlice";
import { AppDispatch } from "@/utils/store";
import { DeleteOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { forwardRef, useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	Grow,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

type DeleteSheetButtonProps = {
	id: string;
};

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Grow ref={ref} {...props} />;
});

export default function SheetCardDeleteButton({ id }: DeleteSheetButtonProps) {
	const dispatch = useDispatch<AppDispatch>();
	const handleDelete = () => dispatch(deleteSheet(id));
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const openDeleteDialog = () => setShowDeleteDialog(true);
	const closeDeleteDialog = () => setShowDeleteDialog(false);

	return (
		<>
			<Button
				variant="text"
				sx={{
					height: "100%",
					width: "100%",
					borderRadius: "0",
				}}
				onClick={openDeleteDialog}
			>
				<DeleteOutline />
			</Button>

			<Dialog
				open={showDeleteDialog}
				onClose={closeDeleteDialog}
				TransitionComponent={Transition}
				PaperProps={{
					sx: {
						backgroundImage: "none",
						padding: "1rem",
						borderRadius: "1rem",
					},
				}}
			>
				<DialogTitle textAlign="center">Delete Sheet</DialogTitle>
				<DialogActions>
					<Button
						variant="outlined"
						sx={{
							borderRadius: "100rem",
						}}
						size="large"
						onClick={closeDeleteDialog}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						sx={{
							borderRadius: "100rem",
						}}
						size="large"
						onClick={handleDelete}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
