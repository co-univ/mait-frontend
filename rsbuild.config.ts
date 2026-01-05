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
			"@/guards": "./src/guards",
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
		tags: [
			{ tag: "meta", attrs: { property: "og:title", content: "MAIT | AI 문제 제작" } },
			{ tag: "meta", attrs: { property: "og:description", content: "문제 제작은 자동으로, 학습은 함께\n메잇으로 더 똑똑하게 학습하세요!" } },
			{ tag: "meta", attrs: { property: "og:type", content: "website" } },
			{ tag: "meta", attrs: { property: "og:url", content: "https://mait.kr/" } },
			{ tag: "meta", attrs: { property: "og:image", content: "https://mait-prod.s3.ap-northeast-2.amazonaws.com/assets/og-image.png" } },
			{ tag: "meta", attrs: { property: "og:locale", content: "ko_KR" } },
		],
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
