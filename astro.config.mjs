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

// /build.txt holds the commit the build came from, so the CI deploy job can
// wait until production serves the exact commit it tested (deploy hooks build
// the branch head, not a given SHA). Cloudflare Pages sets CF_PAGES_COMMIT_SHA.
const buildMarker = {
  name: "build-marker",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      const sha = process.env.CF_PAGES_COMMIT_SHA ?? process.env.GITHUB_SHA ?? "local";
      await writeFile(new URL("build.txt", dir), `${sha}\n`);
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
    buildMarker,
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: { es: "es", en: "en" },
      },
    }),
  ],

  // Lossless whitespace collapsing (the pre-7 behavior). Astro 7 defaults to
  // "jsx", which drops whitespace between inline elements at line breaks.
  compressHTML: true,
});
