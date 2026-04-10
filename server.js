import http from "node:http";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = Number(process.env.PORT) || 3000;

loadEnvFile();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const outputSchema = {
  name: "idea_to_app_plan",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: [
      "productSummary",
      "targetUser",
      "whyNow",
      "mvpFeatures",
      "techStack",
      "sevenDayBuildPlan",
      "landingPageHeadline",
      "callToAction"
    ],
    properties: {
      productSummary: { type: "string" },
      targetUser: { type: "string" },
      whyNow: { type: "string" },
      mvpFeatures: {
        type: "array",
        items: { type: "string" }
      },
      techStack: {
        type: "array",
        items: { type: "string" }
      },
      sevenDayBuildPlan: {
        type: "array",
        items: { type: "string" }
      },
      landingPageHeadline: { type: "string" },
      callToAction: { type: "string" }
    }
  }
};

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "POST" && url.pathname === "/api/generate") {
    await handleGenerate(request, response);
    return;
  }

  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Method not allowed." });
    return;
  }

  if (url.pathname === "/" || url.pathname === "/index.html") {
    await sendFile(response, "index.html", "text/html; charset=utf-8");
    return;
  }

  if (url.pathname === "/styles.css") {
    await sendFile(response, "styles.css", "text/css; charset=utf-8");
    return;
  }

  if (url.pathname === "/app.js") {
    await sendFile(response, "app.js", "application/javascript; charset=utf-8");
    return;
  }

  sendJson(response, 404, { error: "Not found." });
});

server.listen(port, () => {
  console.log(`Idea-to-App Agent running at http://localhost:${port}`);
});

async function handleGenerate(request, response) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key_here") {
    sendJson(response, 500, {
      error: "Add a real OPENAI_API_KEY to your .env file before generating."
    });
    return;
  }

  const rawBody = await readRequestBody(request);
  let payload;

  try {
    payload = JSON.parse(rawBody);
  } catch {
    sendJson(response, 400, { error: "Invalid JSON body." });
    return;
  }

  const { idea } = payload ?? {};

  if (!idea || typeof idea !== "string") {
    sendJson(response, 400, { error: "A product idea is required." });
    return;
  }

  try {
    const aiResponse = await client.responses.create({
      model: "gpt-5.2",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "You are a startup product strategist and technical founder coach. Return JSON only. Keep outputs concise, specific, and launch-oriented. Favor realistic MVP scope and practical implementation choices."
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Turn this rough product idea into a focused app plan:\n\n${idea}`
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          ...outputSchema
        }
      }
    });

    sendJson(response, 200, JSON.parse(aiResponse.output_text));
  } catch (error) {
    console.error("Idea generation failed", error);
    sendJson(response, 500, {
      error: "The app plan could not be generated. Check your API key and try again."
    });
  }
}

async function sendFile(response, relativePath, contentType) {
  try {
    const filePath = path.join(__dirname, relativePath);
    const file = await fsPromises.readFile(filePath);
    response.writeHead(200, { "Content-Type": contentType });
    response.end(file);
  } catch {
    sendJson(response, 404, { error: "File not found." });
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      resolve(body);
    });

    request.on("error", reject);
  });
}

function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");

  try {
    const envFile = fs.readFileSync(envPath, "utf-8");
    const lines = envFile.split(/\r?\n/);

    lines.forEach((line) => {
      if (!line || line.trim().startsWith("#")) {
        return;
      }

      const separatorIndex = line.indexOf("=");

      if (separatorIndex === -1) {
        return;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();

      if (key && !process.env[key]) {
        process.env[key] = value;
      }
    });
  } catch {
    // No local .env file yet.
  }
}
