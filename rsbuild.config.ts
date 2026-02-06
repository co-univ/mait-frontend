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
			// Google Tag Manager (head)
			{
				tag: "script",
				children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WMGGPMHZ');`,
				head: true,
				append: false,
			},
			// Google Tag Manager (noscript) - body
			{
				tag: "noscript",
				children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WMGGPMHZ" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
				head: false,
				append: false,
			},
			// Beusable
			{
				tag: "script",
				attrs: { type: "text/javascript" },
				children: `(function(w, d, a){
    w.__beusablerumclient__ = {
        load : function(src){
            var b = d.createElement("script");
            b.src = src; b.async=true; b.type = "text/javascript";
            d.getElementsByTagName("head")[0].appendChild(b);
        }
    };w.__beusablerumclient__.load(a + "?url=" + encodeURIComponent(d.URL));
})(window, document, "//rum.beusable.net/load/b260130e144720u845");`,
				head: false,
				append: true,
			},
			{
				tag: "meta",
				attrs: { property: "og:title", content: "MAIT | AI 문제 제작" },
			},
			{
				tag: "meta",
				attrs: {
					property: "og:description",
					content:
						"문제 제작은 자동으로, 학습은 함께\n메잇으로 더 똑똑하게 학습하세요!",
				},
			},
			{ tag: "meta", attrs: { property: "og:type", content: "website" } },
			{
				tag: "meta",
				attrs: { property: "og:url", content: "https://mait.kr/" },
			},
			{
				tag: "meta",
				attrs: {
					property: "og:image",
					content:
						"https://mait-prod.s3.ap-northeast-2.amazonaws.com/assets/og-image.png",
				},
			},
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
