import SheetCardDeleteButton from "./SheetCardDeleteButton";
import parseDate from "@/utils/parseDate";
import { Sheet } from "@/types";
import SheetCardInfoButton from "./SheetCardInfoButton";
import { useRouter } from "next/navigation";
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";

type SheetCardProps = {
	sheet: Sheet;
};

export default function SheetCard({ sheet }: SheetCardProps) {
	const router = useRouter();
	const date = new Date(sheet.creationDate);
	const parsedDate = parseDate(date);

	const stationsLabels = Object.keys(sheet.processedData.stations);
	const stationsFromTo = `${stationsLabels[0]} - ${
		stationsLabels[stationsLabels.length - 1]
	}`;

	const routeToSheet = () => router.push(`/sheet/${sheet.id}`);

	return (
		<Card
			variant="outlined"
			sx={{
				width: "20rem",
				height: "10rem",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				position: "relative",
				borderRadius: "1rem",
			}}
		>
			<CardActions
				sx={{
					width: "4rem",
					height: "100%",
					padding: "0",
					position: "absolute",
					zIndex: 1,
				}}
			>
				<SheetCardDeleteButton id={sheet.id} />
			</CardActions>

			<CardActionArea
				sx={{
					height: "100%",
					width: "100%",
					display: "flex",
					justifyContent: "center",
				}}
				onClick={routeToSheet}
			>
				<CardContent
					sx={{
						width: "12rem",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography
						variant="h5"
						marginBottom={1}
						textOverflow="ellipsis"
						overflow="hidden"
						whiteSpace="nowrap"
						maxWidth="10rem"
					>
						{sheet.title}
					</Typography>
					<Typography variant="body2">{stationsFromTo}</Typography>
					<Typography variant="body2">{parsedDate}</Typography>
				</CardContent>
			</CardActionArea>

			<CardActions
				sx={{
					width: "4rem",
					height: "100%",
					padding: "0",
					position: "absolute",
					right: "0",
					zIndex: 1,
				}}
			>
				<SheetCardInfoButton sheet={sheet} />
			</CardActions>
		</Card>
	);
}
