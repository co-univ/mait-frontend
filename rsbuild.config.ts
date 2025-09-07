import { defineConfig, type PostCSSPlugin } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import autoprefixer from "autoprefixer";
// import * as dotenv from "dotenv";
import tailwindcss from "tailwindcss";

export default defineConfig({
	plugins: [pluginReact()],
	resolve: {
		alias: {
			"@": "./src",
			"@/components": "./src/components",
			"@/pages": "./src/pages",
			"@/hooks": "./src/hooks",
			"@/layouts": "./src/layouts",
			"@/stores": "./src/stores",
			"@/utils": "./src/utils",
			"@/apis": "./src/apis",
			"@/assets": "./src/assets",
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
