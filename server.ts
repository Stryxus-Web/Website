import "dotenv/config";

import path from "path";
import fs from "fs";
import express from "express";
import { ViteDevServer, createServer as createViteServer } from "vite";

import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import { debug } from "console";
import { Server as HttpsServer, createServer as createHttpsServer } from "https";
import { Server, createServer } from "http";

const isDev = process.env.NODE_ENV.indexOf("development") > -1;
const port = process.env.PORT || 7076;
const __dirname = path.resolve(path.dirname(""));

const app = express();
let server: HttpsServer<any, any> | Server<any, any>; 

if (isDev) {

  const vite: ViteDevServer = await createViteServer({
    server: {
      middlewareMode: true,
    },
    //appType: "custom",
  });
   
  app.use(vite.middlewares);

  app.use("*", async (req, res) => {
    try {
      res.status(200).set({ "Content-Type": "text/html" }).end( await vite.transformIndexHtml(req.originalUrl, fs.readFileSync("index.html", "utf-8")));
    } catch (error) {
      res.status(500).end(error);
    }
  });

  server = createHttpsServer({
    key: fs.readFileSync("./certs/dev.pem", "utf8"),
    cert: fs.readFileSync("./certs/cert.pem", "utf8"),
  }, app).listen(port, () => debug("HTTPS Dev Server Started..."));
  
} else {
  app.use(express.static("dist"))
  // TODO: This needs to route to the appropriate Preact page
  app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
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