import { useNavigate } from "react-router-dom";
import { SheetData } from "../App";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import HeaderText from "../components/HeaderText";
import useFormReducer from "../hooks/useFormReducer";

type NewSheetFormProps = {
	sheetsData: SheetData[];
};

const NewSheetForm = ({ sheetsData }: NewSheetFormProps) => {
	const navigate = useNavigate();
	const [state, dispatch, Enum] = useFormReducer({
		title: "",
		startStation: 0,
		endStation: 0,
		pointsWidth: 0,
		sectionWidth: 0,
		offset: 0,
		inclination: 0,
		backsight: 0,
		benchmark: 0,
		thickness: 0,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value =
			e.target.id === "title" ? e.target.value : Number(e.target.value);

		dispatch({
			type: Enum.CHANGE_VALUE,
			payload: {
				key: e.target.id,
				value: value,
			},
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (sheetsData.some((sheetData) => sheetData.title === state.title))
			return;

		const stations = Array.from(
			Array((state.endStation - state.startStation) / 20 + 1),
			(_, index) =>
				(state.startStation + index * 20)
					.toLocaleString()
					.replace(",", "+")
		);

		const points = Array.from(
			Array(Math.ceil(state.sectionWidth / state.pointsWidth) + 1),
			(_, index) =>
				index * state.pointsWidth > state.sectionWidth
					? state.sectionWidth -
					  index * state.pointsWidth +
					  index * state.pointsWidth
					: index * state.pointsWidth
		);

		if (state.offset) points.unshift(state.offset);

		const level = state.backsight + state.benchmark + state.thickness;

		navigate("stations", {
			state: {
				title: state.title,
				stations: stations,
				points: points,
				sectionWidth: state.sectionWidth,
				inclination: state.inclination,
				level: level,
			},
			replace: true,
		});
	};

	return (
		<div className="max-w-lg min-h-screen m-auto px-4 pb-4 flex flex-col justify-center items-center">
			<HeaderText>New Sheet</HeaderText>
			<form
				className="flex flex-col justify-center gap-4"
				onSubmit={handleSubmit}
			>
				<FormInput
					name="Title"
					required
					id="title"
					onChange={handleChange}
					message="Must be unique"
				/>
				<div className="flex gap-4">
					<FormInput
						name="Start Stations"
						pattern="[0-9.-]+"
						required
						id="startStation"
						onChange={handleChange}
					/>
					<FormInput
						name="End Stations"
						pattern="[0-9.-]+"
						required
						id="endStation"
						onChange={handleChange}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						name="Points Width"
						pattern="[0-9.-]+"
						required
						id="pointsWidth"
						onChange={handleChange}
					/>
					<FormInput
						name="Section Width"
						pattern="[0-9.-]+"
						required
						id="sectionWidth"
						onChange={handleChange}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						name="Offset"
						pattern="[0-9.-]+"
						id="offset"
						onChange={handleChange}
					/>
					<FormInput
						name="Inclination"
						pattern="[0-9.-]+"
						id="inclination"
						onChange={handleChange}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						name="Backsight"
						pattern="[0-9.-]+"
						required
						id="backsight"
						onChange={handleChange}
					/>
					<FormInput
						name="Benchmark"
						pattern="[0-9.-]+"
						required
						id="benchmark"
						onChange={handleChange}
					/>
					<FormInput
						name="Thickness"
						pattern="[0-9.-]+"
						id="thickness"
						onChange={handleChange}
					/>
				</div>
				<FormButton>Next</FormButton>
			</form>
		</div>
	);
};

export default NewSheetForm;
