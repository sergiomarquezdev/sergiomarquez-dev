import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://sergiomarquez.dev",
  output: "static", // Explicit SSG mode

  // Build optimizations
  build: {
    format: "file", // Generate files instead of directories for better SEO
    assets: "_astro", // Clean asset organization
    inlineStylesheets: "auto", // Inline critical CSS automatically
  },

  // Integrations with optimized configuration
  integrations: [
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],

  // Compress HTML for better performance
  compressHTML: true,

  // Markdown configuration (if needed for future content)
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: true,
    },
  },

  // Vite optimizations
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: "lightningcss",
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name].[hash][extname]",
        },
      },
    },
  },
});
