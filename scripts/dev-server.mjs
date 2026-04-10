import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicRoot = path.join(projectRoot, "public");
const port = Number(process.env.PORT) || 3000;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const server = http.createServer(async (request, response) => {
  if (request.method !== "GET") {
    response.writeHead(405, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ error: "Method not allowed." }));
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host}`);
  let relativePath = url.pathname === "/" ? "index.html" : url.pathname.slice(1);

  if (!relativePath) {
    relativePath = "index.html";
  }

  const filePath = path.join(publicRoot, relativePath);

  try {
    const file = await fs.readFile(filePath);
    const extension = path.extname(filePath);
    const contentType = contentTypes[extension] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": contentType });
    response.end(file);
  } catch {
    response.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ error: "Not found." }));
  }
});

server.listen(port, () => {
  console.log(`Idea-to-App Agent running at http://localhost:${port}`);
});
