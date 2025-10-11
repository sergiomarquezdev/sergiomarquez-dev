# 🚀 Sergio Márquez Pérez - Personal Portfolio

> **Simple, fast personal portfolio built with modern web technologies**

[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen)](https://pagespeed.web.dev/)
[![Lighthouse SEO](https://img.shields.io/badge/SEO-100%2F100-brightgreen)](https://pagespeed.web.dev/)

This repository contains the source code for my **personal portfolio website**. Built with **Astro** and **Tailwind CSS** following the **KISS principle** (Keep It Simple, Stupid).

🌐 **Live Site**: [sergiomarquez.dev](https://sergiomarquez.dev)

---

## ✨ **Key Features**

- **Minimalist Design**: Dark-mode-first, clean and professional
- **Performance Optimized**: Lighthouse scores 95+ across all metrics
- **SEO Ready**: Complete meta tags, structured data, automatic sitemap
- **Type Safety**: Full TypeScript integration
- **Fast Development**: Hot reload with Astro's dev server
- **Simple Deployment**: Automatic deployment via Cloudflare Pages

---

## 🏗️ **Tech Stack**

- **[Astro 5.13.5](https://astro.build/)** - Static site generator
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Non.geist](https://vercel.com/font/sans)** - Modern typography
- **[Biome](https://biomejs.dev/)** - Fast linting and formatting
- **[Bun](https://bun.sh/)** - Fast package manager
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Deployment platform

---

## 📁 **Project Structure**

```
sergiomarquez-dev/
├── docs/                      # Project documentation
│   ├── scratchpad.md         # Development notes and lessons learned
│   └── implementation-plan/   # Detailed planning documents
├── public/                    # Static assets
│   ├── favicon.ico           # Site favicon
│   ├── robots.txt            # Search engine directives
│   └── og-image.svg          # Custom Open Graph image
├── scripts/                   # Simple development helpers
│   └── pre-commit-hook.sh    # Basic quality validation
├── src/
│   ├── components/           # Reusable Astro components
│   │   ├── BaseHead.astro   # SEO and meta tags
│   │   ├── Header.astro     # Site navigation
│   │   └── icons/           # SVG icon components
│   ├── layouts/             # Page layout templates
│   │   └── Layout.astro     # Main layout wrapper
│   ├── pages/               # Site pages (file-based routing)
│   │   ├── index.astro      # Homepage
│   │   └── [redirects]/     # Social media redirects
│   └── styles/              # Global styling
│       └── global.css       # CSS variables and base styles
├── astro.config.mjs          # Astro configuration
├── tailwind.config.mjs       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── biome.json               # Simple Biome configuration
└── package.json             # Dependencies and scripts
```

---

## 🚀 **Quick Start**

### **Prerequisites**

- **Node.js 20+** (LTS recommended)
- **[Bun](https://bun.sh/)** package manager (recommended) or **npm**

### **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sergiomarquezdev/sergiomarquez-dev.git
   cd sergiomarquez-dev
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Start development server:**

   ```bash
   bun run dev
   ```

   - Site available at: `http://localhost:4321`
   - Hot reload enabled for instant feedback

---

## 📜 **Available Scripts**

```bash
# Development
bun run dev          # Start development server with hot reload
bun run build        # Build optimized production version
bun run preview      # Preview production build locally

# Quality checks (when needed)
bun run type-check   # TypeScript validation with Astro
bun run lint         # Check code quality with Biome
bun run lint:fix     # Fix auto-fixable issues with Biome
bun run validate     # Run type-check + lint + build
```

---

## 🔧 **Development Workflow**

Simple and straightforward:

1. **Make changes** to your code
2. **Test locally** with `bun run dev`
3. **Commit changes** - basic pre-commit validation runs automatically
4. **Push to main** - Cloudflare Pages deploys automatically

### **Optional Quality Checks**

Run these when you want to validate your code:

- `bun run type-check` - TypeScript validation
- `bun run lint` - Code quality check
- `bun run validate` - Full validation (type + lint + build)

---

## 🎯 **Performance & SEO**

- **Lighthouse Scores**: 95+ Performance, 100/100 SEO ✅
- **Automatic Sitemap**: Generated at build time
- **SEO Optimized**: Complete meta tags and structured data
- **Fast Loading**: Static generation with Astro
- **CDN Ready**: Deployed on Cloudflare Pages

---

## 🤝 **Contributing**

This is a personal portfolio, but if you find bugs or have suggestions, feel free to open an issue or submit a pull request.

---

## 📞 **Contact**

**Sergio Márquez Pérez**
_AI/ML & Backend Developer_

- 🌐 **Website**: [sergiomarquez.dev](https://sergiomarquez.dev)
- 📧 **Email**: [sergiomarqueztech@gmail.com](mailto:sergiomarqueztech@gmail.com)
- 💼 **LinkedIn**: [sergiomarquezp](https://www.linkedin.com/in/sergiomarquezp/)
- 🐙 **GitHub**: [sergiomarquezdev](https://github.com/sergiomarquezdev)
- 🐦 **X/Twitter**: [@sergiomarquezp_](https://x.com/sergiomarquezp_)
- 📺 **YouTube**: [@sergiomarquezp](https://www.youtube.com/@sergiomarquezp)

---

## 📄 **License**

This project is for personal portfolio use. Feel free to use the **structure and configuration** as inspiration for your own projects, but please don't copy the content directly.

---

<div align="center">

**Built with ❤️ using modern web technologies**

[![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>
