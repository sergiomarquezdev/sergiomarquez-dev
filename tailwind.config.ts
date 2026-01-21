import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "primary-text": "var(--primary-text)",
        "secondary-text": "var(--secondary-text)",
        "tertiary-text": "var(--tertiary-text)",
        "border-color": "var(--border-color)",
        accent: "var(--accent)",
        "accent-muted": "var(--accent-muted)",
        "accent-hover": "var(--accent-hover)",
        "navy-light": "var(--navy-light)",
        "navy-lighter": "var(--navy-lighter)",
      },
      fontFamily: {
        sans: "var(--font-family-sans)",
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        pulse: "pulse 2s ease-in-out infinite",
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [],
} satisfies Config;
