/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#fff",
				primary100: "#f2f2f2",
				primary200: "#e6e6e6",
				primary300: "#d9d9d9",
				primary400: "#cccccc",
				primary500: "#bfbfbf",
				primary600: "#b3b3b3",
				primary700: "#a6a6a6",
				primary800: "#999999",
				primary900: "#8c8c8c",
				secondary: "#000",
			},
		},
	},
	plugins: [],
};
