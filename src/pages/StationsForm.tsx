import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { SheetData } from "../App";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import HeaderText from "../components/HeaderText";
import useFormReducer from "../hooks/useFormReducer";

type LocationState = {
	title: string;
	stations: string[];
	points: number[];
	sectionWidth: number;
	inclination: number;
	level: number;
};

type StationsFormProps = {
	setSheetsData: React.Dispatch<React.SetStateAction<SheetData[]>>;
};

const StationsForm = ({ setSheetsData }: StationsFormProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	if (!location.state) return <Navigate to="/" replace />;

	const { title, stations, points, inclination, level }: LocationState =
		location.state;

	const stationsStates = stations.reduce(
		(acc: { [key: string]: number }, station) => ({ ...acc, [station]: 0 }),
		{}
	);

	const [state, dispatch, Enum] = useFormReducer(stationsStates);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		dispatch({
			type: Enum.CHANGE_VALUE,
			payload: { key: e.target.id, value: Number(e.target.value) },
		});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const sheet: { value: number }[][] = stations.map((station) =>
			points.map((point) => ({
				value: level - state[station] + (point / 100) * inclination,
			}))
		);

		setSheetsData((prev) => [
			...prev,
			{
				title: title,
				creationDate: new Date(),
				stations: stations,
				points: points,
				sheet: sheet,
			},
		]);

		navigate(`/sheet/${title}`, { replace: true });
	};

	return (
		<div className="min-h-screen max-w-lg m-auto px-4 pb-4 flex flex-col justify-center items-center">
			<HeaderText>Stations</HeaderText>
			<form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
				{stations.map((station) => (
					<FormInput
						key={station}
						name={station}
						pattern="[0-9.]+"
						inputMode="numeric"
						required
						id={station}
						onChange={handleChange}
					/>
				))}
				<FormButton className="col-span-2">Create Sheet</FormButton>
			</form>
		</div>
	);
};

export default StationsForm;
