import path from "path";

import progress from "vite-plugin-progress";
import mkcert from "vite-plugin-mkcert";
import tsconfigPaths from "vite-tsconfig-paths";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import webfontDownload from "vite-plugin-webfont-dl";
import imagemin from "unplugin-imagemin/vite";

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
		},
		server: {
			port: 7076,
			middlewareMode: true,
		},
		preview: {
			port: 7076,
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
				react: 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat',
			}
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
			preact(),
		],
	};
});
