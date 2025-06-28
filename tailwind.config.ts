import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/**/*.{html,js,ts,jsx,tsx}",
		"../../lib1/src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};

export default config;
