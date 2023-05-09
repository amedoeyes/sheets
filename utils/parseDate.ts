export default function parseDate(
	date: Date,
	timeZone: string = "UTC",
	locale: string = "en-US"
): string {
	const options: Intl.DateTimeFormatOptions = {
		timeZone: timeZone,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	};

	return Intl.DateTimeFormat(locale, options).format(date).replace(",", " -");
}
