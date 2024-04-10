import "dotenv/config";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Server, createServer } from "http";

import express from "express";
import { ViteDevServer, createServer as createViteServer } from "vite";

import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import { debug } from "console";
import { Server as HttpsServer, createServer as createHttpsServer } from "https";

const isDev = process.env.NODE_ENV.indexOf("development") > -1;
const port = process.env.PORT || 7076;

const app = express();
let server: HttpsServer<any, any> | Server<any, any>; 

if (isDev) {
  const vite: ViteDevServer = await createViteServer();
  app.use(vite.middlewares);
  app.use("*", async (req, res) => {
    const url = req.originalUrl;
    try {
      const template = await vite.transformIndexHtml(url, fs.readFileSync("index.html", "utf-8"));
      const { prerender } = await vite.ssrLoadModule("./src/entry-server.tsx");
    
      const html = template.replace(`<!--SSR-->`, prerender);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      debug(error);
      res.status(500).end(error);
    }
  });

  server = createHttpsServer({
    key: fs.readFileSync("./certs/dev.pem", "utf8"),
    cert: fs.readFileSync("./certs/cert.pem", "utf8"),
  }, app).listen(port, () => debug("HTTPS Dev Server Started..."));
  
} else {
  app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "dist/client"), { index: false }));
  app.use("*", async (_, res) => {
    try {
      const template = fs.readFileSync("./dist/client/index.html", "utf-8");
      const { prerender } = await import("./dist/server/entry-server.tsx");
   
      const html = template.replace(`<!--outlet-->`, prerender);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      debug(error);
      res.status(500).end(error);
    }
  });

  server = createServer(app).listen(port, () => debug("HTTP Dev Server Started..."));
}

process.on("SIGTERM", () => {
  server.close(() => {
    debug("HTTP('s) Dev Server Closed.");
  });
});

/*

// Azure

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
if (!accountName) throw Error("Azure Storage accountName not found");

const blobServiceClient = new BlobServiceClient(
	`https://${accountName}.blob.core.windows.net`,
	new DefaultAzureCredential()
);

*/