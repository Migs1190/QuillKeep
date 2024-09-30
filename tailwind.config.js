/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: [""],
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#fff",
				secondary: "#FF4023",
				"mine-shaft": "#2a2a2a",
				"wood-smoke": "#161A1B",
				shark: "#1C2022",
			},
			fontFamily: {
				robotob: ["Roboto-Black", "sans-serif"],
				robotobit: ["Roboto-BlackItalic", "sans-serif"],
				robotobd: ["Roboto-Bold", "sans-serif"],
				robotobdit: ["Roboto-BoldItalic", "sans-serif"],
				robotocn: ["Roboto-Condensed", "sans-serif"],
				robotocnit: ["Roboto-CondensedItalic", "sans-serif"],
				robotobdcn: ["Roboto-BoldCondensed", "sans-serif"],
				robotobdcnit: ["Roboto-BoldCondensedItalic", "sans-serif"],
				robotol: ["Roboto-Light", "sans-serif"],
				robotolit: ["Roboto-LightItalic", "sans-serif"],
				robotom: ["Roboto-Medium", "sans-serif"],
				robotomit: ["Roboto-MediumItalic", "sans-serif"],
				robotor: ["Roboto-Regular", "sans-serif"],
				robototh: ["Roboto-Thin", "sans-serif"],
				robotothit: ["Roboto-ThinItalic", "sans-serif"],
			},
		},
	},
	plugins: [],
};
