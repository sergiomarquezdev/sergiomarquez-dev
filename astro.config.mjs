import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap()],

  // Build optimizations
  build: {
    inlineStylesheets: "auto",
  },

  // Compress HTML for better performance
  compressHTML: true,

  // Static site generation (default for portfolios)
  output: "static",

  // Site configuration for sitemap and SEO
  site: "https://sergiomarquez.dev",

  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },

  // Vite optimizations
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
