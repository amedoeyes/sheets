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
	const [value, setValue] = useFormReducer({
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
	const [message, setMessage] = useFormReducer({
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.id, "");

		if (sheetsData.some((sheetData) => sheetData.title === e.target.value))
			return setMessage("title", "Title must be unique");

		if (e.target.validity.valueMissing) setMessage(e.target.id, "Required");

		const value =
			e.target.id === "title" ? e.target.value : Number(e.target.value);

		setValue(e.target.id, value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const stations = Array.from(
			Array((value.endStation - value.startStation) / 20 + 1),
			(_, index) =>
				(value.startStation + index * 20)
					.toLocaleString()
					.replace(",", "+")
		);

		const points = Array.from(
			Array(Math.ceil(value.sectionWidth / value.pointsWidth) + 1),
			(_, index) =>
				index * value.pointsWidth > value.sectionWidth
					? value.sectionWidth -
					  index * value.pointsWidth +
					  index * value.pointsWidth
					: index * value.pointsWidth
		);

		if (value.offset) points.unshift(value.offset);

		const level = value.backsight + value.benchmark + value.thickness;

		navigate("stations", {
			state: {
				title: value.title,
				stations: stations,
				points: points,
				sectionWidth: value.sectionWidth,
				inclination: value.inclination,
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
					message={message.title}
				/>
				<div className="flex gap-4">
					<FormInput
						name="Start Stations"
						pattern="[0-9.-]+"
						inputMode="numeric"
						required
						id="startStation"
						onChange={handleChange}
						message={message.startStation}
					/>
					<FormInput
						name="End Stations"
						pattern="[0-9.-]+"
						inputMode="numeric"
						required
						id="endStation"
						onChange={handleChange}
						message={message.endStation}
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
						message={message.pointsWidth}
					/>
					<FormInput
						name="Section Width"
						pattern="[0-9.-]+"
						inputMode="numeric"
						required
						id="sectionWidth"
						onChange={handleChange}
						message={message.sectionWidth}
					/>
				</div>
				<div className="flex gap-4">
					<FormInput
						name="Offset"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="offset"
						onChange={handleChange}
						message={message.offset}
					/>
					<FormInput
						name="Inclination"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="inclination"
						onChange={handleChange}
						message={message.inclination}
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
						message={message.backsight}
					/>
					<FormInput
						name="Benchmark"
						pattern="[0-9.-]+"
						inputMode="numeric"
						required
						id="benchmark"
						onChange={handleChange}
						message={message.benchmark}
					/>
					<FormInput
						name="Thickness"
						pattern="[0-9.-]+"
						inputMode="numeric"
						id="thickness"
						onChange={handleChange}
						message={message.thickness}
					/>
				</div>
				<FormButton>Next</FormButton>
			</form>
		</div>
	);
};

export default NewSheetForm;
