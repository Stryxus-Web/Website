import path from "path";

import progress from "vite-plugin-progress";
import mkcert from "vite-plugin-mkcert";
import tsconfigPaths from "vite-tsconfig-paths";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import webfontDownload from "vite-plugin-webfont-dl";
import imagemin from "unplugin-imagemin/vite";
import wasm from "vite-plugin-wasm";
import vitePluginSass from "vite-plugin-sass";
import { imagetools } from "vite-imagetools";
import vike from "vike/plugin";

import { UserConfig, defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
	const isDev = mode === "development";
	return {
		build: {
			outDir: "./dist",
			assetsDir: "./",
			target: "es2022",
			emptyOutDir: true,
		},
		server: {
			port: 7076,
		},
		preview: {
			port: 7076,
		},
		plugins: [
			progress(),
			mkcert({
				autoUpgrade: true,
				savePath: "./certs",
			}),
			tsconfigPaths(),
			eslintPlugin(),
			webfontDownload([
				"https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
			],
			{
				injectAsStyleTag: true,
				minifyCss: true,
				async: true,
				cache: true,
				proxy: false,
			}
			),
			/*
			imagemin({
				mode: "sharp",
				beforeBundle: true,
				compress: {
					avif: {
						cqLevel: 33,
						speed: isDev ? 0 : 9,
					},
				},
				conversion: [
				  { from: "jpeg", to: "avif" },
				  { from: "png", to: "avif" },
				  { from: "JPG", to: "avif" },
				  { from: "gif", to: "avif" },
				  { from: "webp", to: "avif" },
				],
				cache: isDev,
			}),
			*/
			preact(),
			wasm(),
			imagetools(),
			vitePluginSass(),
			vike({
				prerender: true
			}),
		],
		optimizeDeps: {
			include: ['preact/devtools', 'preact/debug', 'preact/jsx-dev-runtime', 'preact', 'preact/hooks']
		},
		resolve: {
			alias: {
				".//..": __dirname,
			}
		}
	};
});
