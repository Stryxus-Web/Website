// https://vike.dev/onRenderHtml
export default onRenderHtml

import renderToString from "preact-render-to-string";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import PageShell from "../components/PageShell/PageShell";

import favicon from ".//../assets/img/favicon.png";
import og from ".//../assets/og.png";

async function onRenderHtml(pageContext) {
  const { Page, pageProps } = pageContext;
  const pageHtml = renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );

  // See https://vike.dev/head
  const { documentProps } = pageContext;
  const title = (documentProps && documentProps.title) || "Stryxus";
  const desc = (documentProps && documentProps.description) || "Stryxus' Personal Website.";

  const documentHtml = escapeInject`
  <!DOCTYPE html>
  <html lang="en" prefix="og: https://ogp.me/ns#">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
      <!-- Primary Meta Tags -->
      <title>${title}</title>
      <meta name="title" content="${title}">
      <meta name="description" content="${desc}">
      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="website">
      <meta property="og:url" content="https://stryxus.xyz/">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${desc}">
      <meta property="og:image" content="${og}">
      <!-- Twitter -->
      <meta property="twitter:card" content="summary_large_image">
      <meta property="twitter:url" content="https://stryxus.xyz/">
      <meta property="twitter:title" content="${title}">
      <meta property="twitter:description" content="${desc}">
      <meta property="twitter:image" content="${og}">
  
      <link rel="icon" type="image/png" href="${favicon}">
    </head>
    <body>
      ${dangerouslySkipEscape(pageHtml)}
    </body>
  </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    }
  }
}