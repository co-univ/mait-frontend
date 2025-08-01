import type { Config } from "tailwindcss";

const tokens = require("./config/tailwind.tokens.js");

const config: Config = {
	content: [
		"./src/**/*.{html,js,ts,jsx,tsx}",
		"../../lib1/src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			alpha: {
				black: {
					100: "rgba(0, 0, 0, 1)",
					75: "rgba(0, 0, 0, 0.75)",
					50: "rgba(0, 0, 0, 0.5)",
					25: "rgba(0, 0, 0, 0.25)",
					10: "rgba(0, 0, 0, 0.1)",
				},
				white: {
					100: "rgba(255, 255, 255, 1)",
					75: "rgba(255, 255, 255, 0.75)",
					50: "rgba(255, 255, 255, 0.5)",
					25: "rgba(255, 255, 255, 0.25)",
					10: "rgba(255, 255, 255, 0.1)",
				},
			},
			gray: {
				5: "#F4F5F6",
				10: "#E6E8EA",
				20: "#CDD1D5",
				30: "#B1B8BE",
				40: "#8A949E",
				50: "#6D7882",
				60: "#58616A",
				70: "#464C53",
				80: "#33363D",
				90: "#1E2124",
				95: "#131416",
			},
			primary: {
				5: "#ECF2FE",
				10: "#D8E5FD",
				20: "#B1CEFB",
				30: "#86AFF9",
				40: "#4C87F6",
				50: "#256EF4",
				60: "#0B50D0",
				70: "#083891",
				80: "#052561",
				90: "#03163A",
				95: "#020F27",
			},
			secondary: {
				5: "#F2ECFE",
				10: "#E4D8FD",
				20: "#CBB1FB",
				30: "#AC86F9",
				40: "#7F4CF6",
				50: "#6325F4",
				60: "#4D0BD0",
				70: "#360891",
				80: "#1E0561",
				90: "#12033A",
				95: "#0B0227",
			},
			point: {
				5: "#FDF2F3",
				10: "#FBD6D8",
				20: "#F5A3A8",
				30: "#F1747C",
				40: "#EC4651",
				50: "#E71825",
				60: "#B9131E",
				70: "#8B0E16",
				80: "#5C0A0F",
				90: "#2E0507",
			},
			system: {
				danger: {
					5: "#FEECF0",
					10: "#FCD4DE",
					20: "#F799B1",
					30: "#F36689",
					40: "#EF3E5E",
					50: "#EB003B",
					60: "#D50136",
					70: "#8D0023",
					80: "#5E0018",
					90: "#2F000C",
				},
				warning: {
					5: "#FFF8E9",
					10: "#FFEAC1",
					20: "#FFE2A7",
					30: "#FFD47C",
					40: "#FFC550",
					50: "#FFB724",
					60: "#98690A",
					70: "#66490E",
					80: "#4D370B",
					90: "#332507",
				},
				success: {
					5: "#EEF7F0",
					10: "#CEE9D4",
					20: "#B2DCBB",
					30: "#8CCA99",
					40: "#33A14B",
					50: "#008A1E",
					60: "#006E18",
					70: "#005312",
					80: "#00370C",
					90: "#002207",
				},
				info: {
					5: "#F0FBFF",
					10: "#D4F3FE",
					20: "#A9E6FC",
					30: "#7DDAFB",
					40: "#52CDF9",
					50: "#27C1F8",
					60: "#1F9AC6",
					70: "#177495",
					80: "#104D63",
					90: "#082732",
				},
			},
		},
		fontFamily: {
			Paperlogy: ["Paperlogy"],
			Pretendard: ["Pretendard"],
			Line: ["LINE Seed Sans KR"],
		},
		extend: {
			// Import all generated tokens directly
			...tokens.theme,
		},
	},
	plugins: [
		// Add any Tailwind plugins you need
		// require('@tailwindcss/forms'),
		require("@tailwindcss/typography"),
		// require('@tailwindcss/aspect-ratio'),

		// Custom plugin to generate typography utility classes
		({ addUtilities, theme }) => {
			const typography = theme("typography");
			const utilities = {};

			Object.entries(typography).forEach(([key, styles]) => {
				utilities[`.typo-${key}`] = styles;
			});

			addUtilities(utilities);
		},

		// Custom plugin to allow font family override
		({ addUtilities, theme }) => {
			const fontFamilies = theme("fontFamily");
			const utilities = {};

			Object.entries(fontFamilies).forEach(([key, value]) => {
				utilities[`.font-${key}`] = {
					"font-family": `${Array.isArray(value) ? value.join(", ") : value} !important`,
				};
			});

			addUtilities(utilities, ["responsive"]);
		},
	],
};

export default config;
