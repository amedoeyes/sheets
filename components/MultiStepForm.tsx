import { Children, useEffect, useMemo, useRef, useState } from "react";
import { Box, Slide } from "@mui/material";

type MultiStepFormProps = {
	currentStep: number;
	children: React.ReactNode;
};

export default function MultiStepForm({
	currentStep,
	children,
}: MultiStepFormProps) {
	const currentChild = Children.toArray(children)[currentStep];
	const prevStep = useRef(0);
	const direction = useMemo(
		() => (currentStep > prevStep.current ? "left" : "right"),
		[currentStep]
	);

	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const handleExit = () => (prevStep.current = currentStep);

	return (
		<Slide
			key={currentStep}
			direction={direction}
			in={true}
			appear={mounted}
			onAnimationEnd={handleExit}
		>
			<Box>{currentChild}</Box>
		</Slide>
	);
}
