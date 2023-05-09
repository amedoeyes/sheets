import createCache from "@emotion/cache";

export default function createEmotionCache() {
	const isBrowser = typeof document !== "undefined";

	let insertionPoint: HTMLElement | undefined;

	if (isBrowser) {
		const emotionInsertionPoint = document.querySelector(
			'meta[name="emotion-insertion-point"]'
		);

		insertionPoint = emotionInsertionPoint as HTMLElement;
	}

	return createCache({
		key: "mui-style",
		insertionPoint,
	});
}
