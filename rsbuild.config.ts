import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

export default defineConfig({
	plugins: [pluginReact()],
	tools: {
		postcss: {
			postcssOptions: {
				plugins: [tailwindcss() as any, autoprefixer() as any],
			},
		},
	},
});
