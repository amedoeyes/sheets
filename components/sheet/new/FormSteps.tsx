import { useNewSheetContext } from "@/contexts/NewSheetContext";
import { Children, useState } from "react";
import FormButton from "./FormButton";

type FormStepsProps = {
	children: React.ReactNode;
};

export default function FormSteps({ children }: FormStepsProps) {
	const { step } = useNewSheetContext();

	const currentChild = Children.toArray(children)[step];
	return <>{currentChild}</>;
}
