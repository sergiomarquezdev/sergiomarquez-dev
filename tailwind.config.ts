import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "primary-text": "var(--primary-text)",
        "secondary-text": "var(--secondary-text)",
        "border-color": "var(--border-color)",
      },
      fontFamily: {
        sans: "var(--font-family-sans)",
      },
    },
  },
  plugins: [],
} satisfies Config;
