import "dotenv/config";

import path from "path";
import fs from "fs";
import express from "express";
import { createServer } from "vite";

import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import { debug } from "console";

const isDev = process.env.NODE_ENV.indexOf("development") > -1;
const port = process.env.PORT || 7076;
const __dirname = path.resolve(path.dirname(""));

const app = express();
 
if (isDev) {
  const vite = await createServer({
    server: {
      middlewareMode: true,
    },
    appType: "custom",
  });
   
  app.use(vite.middlewares);

  app.use("*", async (req, res) => {
    try {
      res.status(200).set({ "Content-Type": "text/html" }).end( await vite.transformIndexHtml(req.originalUrl, fs.readFileSync("index.html", "utf-8")));
    } catch (error) {
      res.status(500).end(error);
    }
  });
} else {
  app.use(express.static("dist"))
  // TODO: This needs to route to the appropriate Preact page
  app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
}

const server = app.listen(port, () => debug("HTTP Dev Server Started..."));

process.on("SIGTERM", () => {
  server.close(() => {
    debug("HTTP Dev Server Closed.");
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