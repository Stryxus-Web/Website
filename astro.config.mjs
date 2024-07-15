import { fileURLToPath } from 'url';
import path from 'path';
import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import tailwind from '@astrojs/tailwind';
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
  site: "https://stryxus.xyz",
  integrations: [preact(), tailwind(), robotsTxt({
    sitemap: true,
    policy: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  })],
  build: {
    serverEntry: "entry.mjs",
    inlineStylesheets: "always",
  },
  output: "hybrid",
  adapter: node({
    mode: "middleware"
  }),
  vite: {
    build: {
      target: "es2022",
      emptyOutDir: true
    },
    plugins: [tsconfigPaths(), webfontDownload([
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap", 
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    ], {
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
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  experimental: {
    directRenderScript: true,
    clientPrerender: true,
    rewriting: true,
  },
});