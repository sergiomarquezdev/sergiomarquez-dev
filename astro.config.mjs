import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://sergiomarquez.dev",
  output: "static", // Explicit SSG mode

  // Internationalization
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false, // / = es, /en/ = en
    },
  },

  // Build optimizations
  build: {
    // Default "directory" format keeps canonical/hreflang/sitemap URLs consistent (/en/)
    assets: "_astro", // Clean asset organization
    inlineStylesheets: "always", // Single-page site: inlining removes render-blocking CSS requests
  },

  // Integrations with optimized configuration
  integrations: [
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      // Exclude social redirect stubs: they carry noindex, listing them contradicts it
      filter: (page) =>
        !/\/(blog|github|instagram|linkedin|tiktok|twitter|x|yt|youtube)\/?$/.test(
          new URL(page).pathname,
        ),
      i18n: {
        defaultLocale: "es",
        locales: { es: "es", en: "en" },
      },
    }),
  ],

  // Compress HTML for better performance
  compressHTML: true,

  // Vite optimizations
  vite: {
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
