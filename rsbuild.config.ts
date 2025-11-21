import { defineConfig, type PostCSSPlugin } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";
import autoprefixer from "autoprefixer";
// import * as dotenv from "dotenv";
import tailwindcss from "tailwindcss";

export default defineConfig({
	plugins: [
		pluginReact(),
		pluginSvgr({
			svgrOptions: {
				exportType: "default",
				svgo: false,
			},
		}),
	],
	source: {
		alias: {
			"@": "./src",
			"@/components": "./src/components",
			"@/domains": "./src/domains",
			"@/hooks": "./src/hooks",
			"@/layouts": "./src/layouts",
			"@/stores": "./src/stores",
			"@/utils": "./src/utils",
			"@/apis": "./src/apis",
			"@/assets": "./src/assets",
			"@/libs": "./src/libs",
			"@/pages": "./src/pages",
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
