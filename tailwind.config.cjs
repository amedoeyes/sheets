/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: { secondary: "#101010", primary: "#aaa" },
		},
	},
	plugins: [],
};
