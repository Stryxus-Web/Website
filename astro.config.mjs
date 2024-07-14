import { fileURLToPath } from 'url';
import path from 'path';
import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import tsconfigPaths from "vite-tsconfig-paths";
import webfontDownload from "vite-plugin-webfont-dl";
import wasm from "vite-plugin-wasm";
// @ts-ignore
import vitePluginSass from "vite-plugin-sass";
import { imagetools } from "vite-imagetools";
import node from "@astrojs/node";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// https://astro.build/config
export default defineConfig({
  integrations: [preact(), tailwind(), sitemap(), robotsTxt()],
  vite: {
    build: {
      target: "es2022",
      emptyOutDir: true
    },
    plugins: [tsconfigPaths(), webfontDownload(["https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"], {
      injectAsStyleTag: true,
      minifyCss: true,
      async: true,
      cache: true,
      proxy: false
    }), wasm(), imagetools(), vitePluginSass()],
    optimizeDeps: {
      include: ['preact/devtools', 'preact/debug', 'preact/jsx-dev-runtime', 'preact', 'preact/hooks']
    },
    resolve: {
      alias: {
        ".//..": __dirname
      }
    }
  },
  output: "hybrid",
  adapter: node({
    mode: "middleware"
  }),
});