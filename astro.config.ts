import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import wasm from 'vite-plugin-wasm';
import node from '@astrojs/node';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://stryxus.xyz',
  integrations: [
    wasm(), 
    preact({
      compat: true
    }), 
    tailwind(), 
    robotsTxt({
      sitemap: true,
      policy: [{
        userAgent: '*',
        allow: '/'
      }]
    }), 
    icon({
      iconDir: 'src/assets/icons',
    }),
  ],
  build: {
    serverEntry: 'entry.mjs',
    inlineStylesheets: 'always',
  },
  output: 'hybrid',
  adapter: node({
    mode: 'middleware'
  }),
  vite: {
    build: {
      emptyOutDir: true
    },
    plugins: [
      wasm(),
    ],
    optimizeDeps: {
      include: ['preact/devtools', 'preact/debug', 'preact/jsx-dev-runtime', 'preact', 'preact/hooks']
    },
    resolve: {
      alias: {
        '~/*': 'src/*'
      }
    },
  },
  experimental: {
    directRenderScript: true,
    clientPrerender: true,
    serverIslands: true,
  },
});