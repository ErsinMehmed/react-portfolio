import { defineConfig } from "vitest/config";
import { loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import type { IncomingMessage, ServerResponse } from "node:http";

// Dev-only: serve the Netlify function under `npm run dev` too, so the
// "Ask my CV" endpoint works on localhost without running `netlify dev`. The
// GROQ_API_KEY is read from .env into the Node process here and stays
// server-side — it is never exposed to the browser. In production the real
// Netlify Function handles the same path; this plugin does nothing at build time.
const askCvDevServer = (env: Record<string, string>): Plugin => ({
  name: "ask-cv-dev-server",
  apply: "serve",
  configureServer(server) {
    // Make the key visible to the function handler (which reads process.env).
    if (env.GROQ_API_KEY) process.env.GROQ_API_KEY = env.GROQ_API_KEY;

    server.middlewares.use(
      "/.netlify/functions/ask-cv",
      async (req: IncomingMessage, res: ServerResponse) => {
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const body = Buffer.concat(chunks).toString("utf8");

          // Plain .mjs serverless handler, no type declarations.
          // @ts-expect-error untyped module
          const mod = await import("./netlify/functions/ask-cv.mjs");
          const handler = mod.default as (req: Request) => Promise<Response>;
          const request = new Request("http://localhost/.netlify/functions/ask-cv", {
            method: req.method,
            headers: {
              "content-type": "application/json",
              origin: (req.headers.origin as string) ?? "",
            },
            body: req.method === "POST" ? body : undefined,
          });

          const response = await handler(request);
          res.statusCode = response.status;
          res.setHeader("content-type", "application/json");
          res.end(await response.text());
        } catch (err) {
          res.statusCode = 500;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ error: String(err) }));
        }
      }
    );
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // "" prefix loads every var (incl. the non-VITE_ GROQ_API_KEY) for server use.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), askCvDevServer(env)],
    build: {
      // Keep the CRA-era output dir so netlify.toml, the CI Lighthouse budget
      // and .gitignore all keep working unchanged.
      outDir: "build",
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      css: false,
    },
  };
});
