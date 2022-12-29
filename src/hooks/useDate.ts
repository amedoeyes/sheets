export function useDate(date: Date) {
	const newDate = new Date(date);
	const locale = navigator.language;
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const localTime = newDate.toLocaleTimeString(locale, {
		timeZone: timeZone,
		hour: "2-digit",
		minute: "2-digit",
	});

	const localDate = newDate.toLocaleDateString(locale, {
		timeZone: timeZone,
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
	});

	return `${localTime} ${localDate}`;
}
