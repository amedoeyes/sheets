import {
	FormControl,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	Typography,
} from "@mui/material";
import { useTheme } from "next-themes";

export default function SelectTheme() {
	const { theme, setTheme } = useTheme();

	const handleChange = (e: SelectChangeEvent) => setTheme(e.target.value);

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="center"
		>
			<Typography variant="h6">Theme</Typography>
			<FormControl>
				<Select
					value={theme}
					onChange={handleChange}
					sx={{
						borderRadius: "100rem",
					}}
				>
					<MenuItem value="system">System</MenuItem>
					<MenuItem value="light">Light</MenuItem>
					<MenuItem value="dark">Dark</MenuItem>
				</Select>
			</FormControl>
		</Stack>
	);
}
