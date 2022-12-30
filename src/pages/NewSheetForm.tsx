import { useNavigate } from "react-router-dom";
import { SheetData } from "../App";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import HeaderText from "../components/HeaderText";
import useFormReducer from "../hooks/useFormReducer";
import useFormValidity from "../hooks/useFormValidity";

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

	const [errors, setErrors] = useFormValidity({
		title: "",
		startStation: "",
		endStation: "",
		pointsWidth: "",
		sectionWidth: "",
		offset: "",
		inclination: "",
		backsight: "",
		benchmark: "",
		thickness: "",
	});

	const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
		let error: string = "";

		if (e.target.validity.valueMissing) error = "Required";

		setErrors(e.target.id, error);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setErrors(e.target.id, "");

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
			return setErrors("title", "Title Must be unique");

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
					message={errors.title}
					onInvalid={handleInvalid}
				/>
				<div className="flex gap-4">
					<FormInput
						name="Start Stations"
						pattern="[0-9.-]+"
						inputMode="numeric"
						required
						id="startStation"
						onChange={handleChange}
						message={errors.startStation}
						onInvalid={handleInvalid}
					/>
					<FormInput
						name="End Stations"
						pattern="[0-9.-]+"
						inputMode="numeric"
						required
						id="endStation"
						onChange={handleChange}
						message={errors.startStation}
						onInvalid={handleInvalid}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						name="Points Width"
						pattern="[0-9.-]+"
						inputMode="numeric"
						required
						id="pointsWidth"
						onChange={handleChange}
						message={errors.endStation}
						onInvalid={handleInvalid}
					/>
					<FormInput
						name="Section Width"
						pattern="[0-9.-]+"
						inputMode="numeric"
						required
						id="sectionWidth"
						onChange={handleChange}
						message={errors.sectionWidth}
						onInvalid={handleInvalid}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						name="Offset"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="offset"
						onChange={handleChange}
						message={errors.offset}
						onInvalid={handleInvalid}
					/>
					<FormInput
						name="Inclination"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="inclination"
						onChange={handleChange}
						message={errors.inclination}
						onInvalid={handleInvalid}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						name="Backsight"
						pattern="[0-9.-]+"
						inputMode="numeric"
						required
						id="backsight"
						onChange={handleChange}
						message={errors.backsight}
						onInvalid={handleInvalid}
					/>
					<FormInput
						name="Benchmark"
						pattern="[0-9.-]+"
						inputMode="numeric"
						required
						id="benchmark"
						onChange={handleChange}
						message={errors.benchmark}
						onInvalid={handleInvalid}
					/>
					<FormInput
						name="Thickness"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="thickness"
						onChange={handleChange}
						message={errors.thickness}
						onInvalid={handleInvalid}
					/>
				</div>
				<FormButton>Next</FormButton>
			</form>
		</div>
	);
};

export default NewSheetForm;
