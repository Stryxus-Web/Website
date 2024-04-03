import path from 'path';

import progress from 'vite-plugin-progress';
import mkcert from'vite-plugin-mkcert';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from "@nabla/vite-plugin-eslint";
import webfontDownload from 'vite-plugin-webfont-dl';
import imagemin from 'unplugin-imagemin/vite';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

import * as vite from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default vite.defineConfig(({ mode }) => {
	const isDev = mode === 'development';
	return {
		build: {
			outDir: './dist',
			assetsDir: './',
		},
		server: {
			port: 7076,
			https: false,
			hmr: {
				host: "localhost",
				protocol: "ws",
			},
		},
		preview: {
			port: 7076,
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			  	'~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
			  	'~bootstrap-icons': path.resolve(__dirname, 'node_modules/bootstrap-icons'),
			}
		},
		plugins: [
			progress(),
			mkcert(),
			tsconfigPaths(),
			eslintPlugin(),
			webfontDownload([
				"https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
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
				mode: 'sharp',
				beforeBundle: true,
				compress: {
					avif: {
						cqLevel: 31,
						speed: isDev ? 0 : 9,
					},
				},
				conversion: [
				  { from: 'jpeg', to: 'avif' },
				  { from: 'png', to: 'avif' },
				  { from: 'JPG', to: 'avif' },
				  { from: 'gif', to: 'avif' },
				  { from: 'webp', to: 'avif' },
				],
				cache: isDev,
			}),
			chunkSplitPlugin(),
			preact({
				prerender: {
					enabled: true,
					renderTarget: '#app',
					additionalPrerenderRoutes: ['/404'],
				},
			}),
		],
	};
});
