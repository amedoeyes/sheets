import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import HeaderButton from "./HeaderButton";

type BeforeInstallPromptEvent = {
	readonly platforms: Array<string>;
	readonly userChoice: Promise<{
		outcome: "accepted" | "dismissed";
		platform: string;
	}>;
	prompt(): Promise<void>;
} & Event;

export default function InstallButton() {
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent>();
	const [installed, setInstalled] = useState(true);

	window.addEventListener("beforeinstallprompt", (e) => {
		setDeferredPrompt(e as BeforeInstallPromptEvent);
		setInstalled(false);
	});

	window.addEventListener("appinstalled", () => setInstalled(true));

	const handleClick = () => deferredPrompt!.prompt();

	return (
		<>
			{!installed && (
				<HeaderButton onClick={handleClick}>
					<FaDownload />
				</HeaderButton>
			)}
		</>
	);
}
