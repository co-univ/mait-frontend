import { defineConfig, type PostCSSPlugin } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import autoprefixer from "autoprefixer";
import * as dotenv from "dotenv";
import tailwindcss from "tailwindcss";

dotenv.config({ path: '.env.production' });

export default defineConfig({
	plugins: [pluginReact()],
	source: {
		define: {
			"process.env.RSBUILD_WS_ENDPOINT": JSON.stringify(
				process.env.RSBUILD_WS_ENDPOINT,
			),
			"process.env.PUBLIC_BASE_URL": JSON.stringify(
				process.env.PUBLIC_BASE_URL,
			),
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
	html: {
		title: "MAIT",
		favicon: "./src/assets/favicon.svg",
	},
	server: {
		port: 3000,
		proxy: {
			"/ws": {
				target: "http://localhost:8080",
				changeOrigin: true,
				ws: true,
			},
		},
	},
});
