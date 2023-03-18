import { useEffect } from "react";

type HeaderProps = {
	className?: string;
	children: React.ReactNode;
};

export default function Header({ className, children }: HeaderProps) {
	useEffect(() => {
		window.onscroll = () => {
			console.log(window.scrollY);
		};
	}, []);
	return (
		<header
			className={`bg-primary h-18 w-full p-2 flex items-center gap-2 sticky top-0 left-0 z-10 ${className}`}
		>
			{children}
		</header>
	);
}
