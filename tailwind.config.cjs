/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: "#eeeeee",
				secondary: "#202020",
				darkPrimary: "#101010",
				darkSecondary: "#aaaaaa",
			},
		},
	},
	plugins: [],
};
