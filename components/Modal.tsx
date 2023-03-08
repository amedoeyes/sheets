import { FaTimes } from "react-icons/fa";
import H1 from "./H1";

type ModalProps = {
	children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
	return (
		<div className="bg-primary max-w-lg h-full m-auto fixed top-0 left-0 right-0 z-50 overflow-y-scroll">
			{children}
		</div>
	);
}
