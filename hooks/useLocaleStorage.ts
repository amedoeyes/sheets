import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
	key: string,
	initialValue: T | (() => T)
) {
	const [value, setValue] = useState<T>(initialValue);

	useEffect(() => {
		const item = window.localStorage.getItem(key);
		if (item) setValue(JSON.parse(item));
	}, []);

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	const removeItem = () => {
		window.localStorage.removeItem(key);
	};

	return { value, setValue, removeItem } as const;
}
