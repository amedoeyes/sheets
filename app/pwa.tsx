"use client";

import { useEffect } from "react";

export default function Pwa() {
	let sw: ServiceWorkerContainer | undefined;

	if (typeof window !== "undefined") sw = window?.navigator?.serviceWorker;

	useEffect(() => {
		if (sw) sw.register("/sw.js", { scope: "/" });
	}, [sw]);

	return <></>;
}
