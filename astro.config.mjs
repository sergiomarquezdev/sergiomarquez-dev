import { writeFile } from "node:fs/promises";
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
  "/instagram": urls.instagram,
  "/x": urls.x,
  "/twitter": urls.x,
  "/youtube": urls.youtube,
  "/yt": urls.youtube,
};

// Cloudflare Pages answers these with a real 302 before any asset is served,
// so a shared short link costs one hop instead of 308 + meta refresh page.
// Generated from the same map: the URLs still live only in the JSON. The
// meta refresh pages stay as the fallback (and are what `astro dev` serves).
// 302, not 301: the destinations follow the JSON and may change.
const cloudflareRedirects = {
  name: "cloudflare-redirects",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      const lines = Object.entries(socialRedirects).flatMap(([from, to]) => [
        `${from} ${to} 302`,
        `${from}/ ${to} 302`,
      ]);
      await writeFile(new URL("_redirects", dir), `${lines.join("\n")}\n`);
    },
  },
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
    cloudflareRedirects,
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
