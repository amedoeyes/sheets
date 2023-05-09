import { Sheet } from "@/types";
import { InfoOutlined } from "@mui/icons-material";
import { forwardRef, useState } from "react";
import SheetInfoTable from "./SheetInfoTable";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grow,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

type SheetCardInfoButtonProps = {
	sheet: Sheet;
};

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Grow ref={ref} {...props} />;
});

export default function SheetCardInfoButton({
	sheet,
}: SheetCardInfoButtonProps) {
	const [showInfoDialog, setShowInfoDialog] = useState(false);

	const openInfoDialog = () => setShowInfoDialog(true);
	const closeInfoDialog = () => setShowInfoDialog(false);

	return (
		<>
			<Button
				variant="text"
				sx={{
					height: "100%",
					width: "100%",
					borderRadius: "0",
				}}
				onClick={openInfoDialog}
			>
				<InfoOutlined />
			</Button>

			<Dialog
				open={showInfoDialog}
				onClose={closeInfoDialog}
				TransitionComponent={Transition}
				PaperProps={{
					sx: {
						backgroundImage: "none",
						padding: "1rem",
						borderRadius: "1rem",
					},
				}}
			>
				<DialogTitle textAlign="center">Sheet Info</DialogTitle>
				<DialogContent>
					<SheetInfoTable sheet={sheet} />
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						fullWidth
						size="large"
						sx={{
							borderRadius: "100rem",
						}}
						onClick={closeInfoDialog}
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
