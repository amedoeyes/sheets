/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: { primary: "#101010", secondary: "#aaa" },
		},
	},
	plugins: [],
};
