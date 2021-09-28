const colors = require("tailwindcss/colors");

module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "media", // or 'media' or 'class'
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			gray: colors.trueGray,
			indigo: colors.indigo,
			blue: colors.blue,
			red: colors.rose,
			yellow: colors.amber,
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
