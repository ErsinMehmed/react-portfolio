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
          res.setHeader(
            "content-type",
            response.headers.get("content-type") ?? "application/json"
          );

          // Pipe the body through chunk-by-chunk so the function's streaming
          // (SSE) responses reach the browser incrementally in dev, matching
          // production Netlify. Non-streaming JSON errors flow through the same
          // loop as a single chunk.
          if (response.body) {
            const reader = response.body.getReader();
            for (;;) {
              const { done, value } = await reader.read();
              if (done) break;
              res.write(Buffer.from(value));
            }
            res.end();
          } else {
            res.end(await response.text());
          }
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
export default defineConfig(async ({ mode }) => {
  // "" prefix loads every var (incl. the non-VITE_ GROQ_API_KEY) for server use.
  const env = loadEnv(mode, process.cwd(), "");

  // rollup-plugin-visualizer is ESM-only; a static import makes Vite's CJS
  // config loader try to `require` it and fail, so pull it in dynamically.
  const { visualizer } = await import("rollup-plugin-visualizer");

  return {
    plugins: [
      react(),
      askCvDevServer(env),
      // Emits a treemap of the bundle after each build. Written outside
      // `build/` so it is never deployed; CI keeps it as a downloadable
      // artifact. Inert during dev/test (only hooks build output).
      visualizer({
        filename: "bundle-stats.html",
        gzipSize: true,
        brotliSize: true,
        template: "treemap",
      }) as Plugin,
    ],
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
      // Unit tests only. The Playwright specs in e2e/ are `*.spec.ts` too, so
      // scope Vitest to src and keep it from trying to run browser tests.
      include: ["src/**/*.test.{ts,tsx}"],
      exclude: ["e2e/**", "node_modules/**"],
    },
  };
});
