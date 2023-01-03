import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { SheetData } from "../App";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import HeaderText from "../components/HeaderText";
import useFormReducer from "../hooks/useFormReducer";
import shortUUID from "short-uuid";

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

	const stationsErrors = stations.reduce(
		(acc: { [key: string]: string }, station) => ({
			...acc,
			[station]: "",
		}),
		{}
	);

	const [value, setValue] = useFormReducer(stationsStates);
	const [errors, setErrors] = useFormReducer(stationsErrors);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setErrors(e.target.id, "");

		setValue(e.target.id, Number(e.target.value));
	};

	const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
		let error = "";

		if (e.target.validity.valueMissing) error = "Required";

		setErrors(e.target.id, error);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const sheet: { value: number }[][] = stations.map((station) =>
			points.map((point) => ({
				value: Number(
					(
						level -
						value[station] +
						(point / 100) * inclination
					).toFixed(2)
				),
			}))
		);

		const id = shortUUID.generate();
		console.log(id);

		setSheetsData((prev) => [
			...prev,
			{
				id: id,
				title: title,
				creationDate: new Date(),
				stations: stations,
				points: points,
				sheet: sheet,
			},
		]);

		navigate(`/sheet/${id}`, { replace: true });
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
						message={errors[station]}
						onInvalid={handleInvalid}
					/>
				))}
				<FormButton className="col-span-2">Create Sheet</FormButton>
			</form>
		</div>
	);
};

export default StationsForm;
