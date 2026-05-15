// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

const root = fileURLToPath(new URL(".", import.meta.url));

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: "https://blakezajac.com",
  integrations: [mdx(), sitemap()],
  vite: {
    resolve: {
      alias: {
        "@components": path.resolve(root, "src/components/index.ts"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: ["./src/scss"],
        },
      },
    },
  },
});
