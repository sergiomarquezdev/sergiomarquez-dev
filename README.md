# 🚀 Sergio Márquez - Personal Portfolio

> **Minimal, content-driven portfolio built with Astro and Tailwind CSS**

[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen)](https://pagespeed.web.dev/)
[![Lighthouse SEO](https://img.shields.io/badge/SEO-100%2F100-brightgreen)](https://pagespeed.web.dev/)

This repository contains the source code for my **personal portfolio website**. It is a lightweight Astro build that reads profile data from `public/cv.json`, keeping the UI and content in sync while staying true to a minimalist look.

🌐 **Live Site**: [sergiomarquez.dev](https://sergiomarquez.dev)

---

## ✨ Key Features

- **Data-driven content**: Portfolio sections (about, experience, projects, certifications) are rendered straight from `public/cv.json`.
- **Minimalist design**: Dark-mode-first layout with deliberate typography and spacing.
- **Performance ready**: Lighthouse scores 95+ on every metric.
- **SEO friendly**: Comprehensive meta tags, structured data, and auto-generated sitemap.
- **Type safe**: Astro + TypeScript with shared types in `src/data/cv.ts`.
- **Simple deployment**: Cloudflare Pages handles builds straight from `main`.

---

## 🧰 Tech Stack

- **[Astro 5.15.1](https://astro.build/)** – Static site generator
- **[Tailwind CSS 4.1.16](https://tailwindcss.com/)** – Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** – Type-safe JavaScript
- **[non.geist](https://vercel.com/font/sans)** – Modern typography
- **[Biome](https://biomejs.dev/)** – Fast linting and formatting
- **[Bun](https://bun.sh/)** – Preferred package manager
- **[Cloudflare Pages](https://pages.cloudflare.com/)** – Hosting & CDN

---

## 📁 Project Structure

```
sergiomarquez-dev/
├── .husky/                   # Git hooks (pre-commit via lint-staged)
├── .vscode/                  # Shared VS Code settings & extensions
├── public/                   # Static assets served as-is
│   ├── cv.json               # Portfolio data source
│   ├── favicon.ico
│   ├── og-image.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── About.astro       # Intro section powered by cv.json
│   │   ├── Certifications.astro
│   │   ├── Experience.astro
│   │   ├── Header.astro      # Social links & branding
│   │   ├── Projects.astro
│   │   ├── Technologies.astro
│   │   └── icons/            # SVG icon components
│   ├── data/
│   │   └── cv.ts             # Typed loader for public/cv.json
│   ├── layouts/
│   │   └── Layout.astro      # Base layout wrapper
│   └── pages/
│       └── index.astro       # Home page using data-driven sections
├── CLAUDE.md                 # Claude Code guidance file
├── astro.config.mjs          # Astro configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── biome.json                # Biome lint/format config
└── package.json              # Scripts and dependencies
```

---

## ⚙️ Quick Start

### Prerequisites

- **Node.js 20+** (LTS recommended)
- **[Bun](https://bun.sh/)** (recommended) or **npm**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sergiomarquezdev/sergiomarquez-dev.git
   cd sergiomarquez-dev
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun run dev
   ```

   - Local URL: `http://localhost:4321`
   - Hot reload enabled for instant feedback

---

## 📜 Available Scripts

```bash
# Development
bun run dev          # Start development server with hot reload
bun run build        # Create production build
bun run preview      # Preview production build locally

# Quality checks
bun run type-check   # TypeScript validation with Astro
bun run lint         # Biome linting
bun run lint:fix     # Auto-fix linting issues
bun run validate     # type-check + lint + build
```

---

## 🧪 Development Workflow

1. Update content in `public/cv.json` or tweak components.
2. Test locally with `bun run dev`.
3. Commit changes (pre-commit hook runs basic validation).
4. Push to `main` – Cloudflare Pages builds and deploys automatically.

### Optional Checks

- `bun run type-check` – ensure TypeScript types are clean.
- `bun run lint` – run Biome linting.
- `bun run validate` – run full pipeline before committing larger changes.

---

## 📈 Performance & SEO

- **Lighthouse**: 95+ performance, 100/100 SEO
- **Sitemap**: Generated automatically via `@astrojs/sitemap`
- **Structured data**: Provided through `BaseHead.astro`
- **Fast delivery**: Static output served from Cloudflare Pages

---

## 📬 Contact

**Sergio Márquez**
_Python AI Developer — FastAPI, LLMs, RAG_

- 🌐 **Website**: [sergiomarquez.dev](https://sergiomarquez.dev)
- ✉️ **Email**: [contacto@sergiomarquez.dev](mailto:contacto@sergiomarquez.dev)
- 💼 **LinkedIn**: [sergiomarquezp](https://www.linkedin.com/in/sergiomarquezp/)
- 💻 **GitHub**: [sergiomarquezdev](https://github.com/sergiomarquezdev)
- 🐦 **X (Twitter)**: [@sergiomarquezp\_](https://x.com/sergiomarquezp_)
- 📺 **YouTube**: [@sergiomarquezp](https://www.youtube.com/@sergiomarquezp)

---

<div align="center">

[![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>
