import { defineConfig, type PostCSSPlugin } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

export default defineConfig({
	plugins: [pluginReact()],
	source: {
		define: {
			"process.env.REACT_APP_BASE_URL": JSON.stringify(process.env.REACT_APP_BASE_URL),
		},
	},
	tools: {
		postcss: {
			postcssOptions: {
				plugins: [
					tailwindcss() as PostCSSPlugin,
					autoprefixer() as PostCSSPlugin,
				],
			},
		},
	},
});
