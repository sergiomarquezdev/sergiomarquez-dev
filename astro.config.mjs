import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import cv from "./public/cv.es.json" with { type: "json" };

// Short links shared in bios and videos. Static output emits a noindex
// meta-refresh page per entry, and the sitemap skips redirects.
const { urls } = cv.basics;
const socialRedirects = {
  "/blog": urls.blog,
  "/github": urls.github,
  "/linkedin": urls.linkedin,
  "/tiktok": urls.tiktok,
  "/x": urls.x,
  "/twitter": urls.x,
  "/youtube": urls.youtube,
  "/yt": urls.youtube,
};

// https://astro.build/config
export default defineConfig({
  site: "https://sergiomarquez.dev",
  output: "static", // Explicit SSG mode
  redirects: socialRedirects,

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
    inlineStylesheets: "always", // Single-page site: inlining removes render-blocking CSS requests
  },

  // Integrations with optimized configuration
  integrations: [
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      i18n: {
        defaultLocale: "es",
        locales: { es: "es", en: "en" },
      },
    }),
  ],

  // Compress HTML for better performance
  compressHTML: true,
});
