import HeaderText from "../../../../../components/HeaderText";
import NewSheetForm, { NewSheetFormReducer } from "../components/NewSheetForm";

type NewSheetProps = {
	form: NewSheetFormReducer;
};

export default function NewSheet({ form }: NewSheetProps) {
	return (
		<div className="max-w-lg min-h-screen m-auto px-4 pb-4 flex flex-col justify-center items-center">
			<HeaderText>New Sheet</HeaderText>
			<NewSheetForm form={form} />
		</div>
	);
}
