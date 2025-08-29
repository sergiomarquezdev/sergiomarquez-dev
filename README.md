# 🚀 Sergio Márquez Pérez - Personal Portfolio

> **Enterprise-grade portfolio built with modern web technologies and automated quality assurance**

[![CI/CD Status](https://github.com/sergiomarquezdev/sergiomarquez-dev/workflows/CI%2FCD%20Portfolio/badge.svg)](https://github.com/sergiomarquezdev/sergiomarquez-dev/actions)
[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen)](https://pagespeed.web.dev/)
[![Lighthouse SEO](https://img.shields.io/badge/SEO-100%2F100-brightgreen)](https://pagespeed.web.dev/)

This repository contains the source code for my **professional portfolio website**, featuring a **modern tech stack** with **automated quality assurance**, **performance optimization**, and **enterprise-grade CI/CD pipeline**.

🌐 **Live Site**: [sergiomarquez.dev](https://sergiomarquez.dev)

---

## ✨ **Key Features**

### 🎯 **Professional Portfolio**

- **Minimalist Design**: Dark-mode-first, clean and professional
- **Performance Optimized**: Lighthouse scores 95+ across all metrics
- **SEO Ready**: Complete meta tags, structured data, automatic sitemap
- **Social Sharing**: Custom OG images and Twitter Cards

### 🛠️ **Developer Experience**

- **Type Safety**: Full TypeScript integration with strict checking
- **Code Quality**: Automated formatting with Prettier
- **Pre-commit Validation**: Quality checks before every commit
- **Hot Reload**: Fast development with Astro's dev server

### 🤖 **Automation & CI/CD**

- **Automated Testing**: Build validation, type checking, format checking
- **Dependency Management**: Weekly automatic updates with testing
- **Quality Gates**: No broken code reaches production
- **Performance Monitoring**: Lighthouse CI integration

---

## 🏗️ **Tech Stack**

### **Frontend**

- **[Astro 5.13.4](https://astro.build/)** - Static site generator with server-side rendering
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Non.geist](https://vercel.com/font/sans)** - Modern typography

### **Quality Assurance**

- **[Prettier](https://prettier.io/)** - Code formatting
- **[ESLint](https://eslint.org/)** - Code quality analysis
- **[Astro Check](https://docs.astro.build/en/reference/cli-reference/#astro-check)** - TypeScript validation
- **Pre-commit Hooks** - Automated validation

### **CI/CD & Automation**

- **[GitHub Actions](https://github.com/features/actions)** - Continuous integration
- **[Dependabot](https://docs.github.com/en/code-security/dependabot)** - Dependency updates
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Deployment platform
- **Automated workflows** - Testing, validation, deployment

### **SEO & Performance**

- **Automatic Sitemap** - Generated with @astrojs/sitemap
- **Structured Data** - Schema.org implementation
- **Open Graph** - Social media optimization
- **Performance Optimization** - Compressed assets, optimized builds

---

## 📁 **Project Structure**

```
sergiomarquez-dev/
├── .github/workflows/          # GitHub Actions CI/CD
│   ├── ci.yml                 # Main validation pipeline
│   └── dependency-updates.yml # Automated dependency management
├── docs/                      # Project documentation
│   ├── scratchpad.md         # Development notes and lessons learned
│   └── implementation-plan/   # Detailed planning documents
├── public/                    # Static assets
│   ├── favicon.ico           # Site favicon
│   ├── robots.txt            # Search engine directives
│   └── og-image.svg          # Custom Open Graph image
├── scripts/                   # Development automation
│   ├── pre-commit-hook.sh    # Quality validation before commits
│   └── setup-dev-environment.sh # Development setup automation
├── src/
│   ├── components/           # Reusable Astro components
│   │   ├── BaseHead.astro   # SEO and meta tags
│   │   ├── Header.astro     # Site navigation
│   │   ├── CookieBanner.astro # GDPR cookie consent
│   │   └── icons/           # SVG icon components
│   ├── layouts/             # Page layout templates
│   │   └── Layout.astro     # Main layout wrapper
│   ├── pages/               # Site pages (file-based routing)
│   │   ├── index.astro      # Homepage
│   │   ├── privacy.astro    # Privacy policy
│   │   └── [redirects]/     # Social media redirects
│   └── styles/              # Global styling
│       └── global.css       # CSS variables and base styles
├── astro.config.mjs          # Astro configuration with optimizations
├── tailwind.config.mjs       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── .prettierrc              # Code formatting rules
└── package.json             # Dependencies and scripts
```

---

## 🚀 **Quick Start**

### **Prerequisites**

- **Node.js 20+** (LTS recommended)
- **npm** or **yarn** package manager

### **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sergiomarquezdev/sergiomarquez-dev.git
   cd sergiomarquez-dev
   ```

2. **Setup development environment:**

   ```bash
   npm run setup
   ```

   This will:
   - Install all dependencies
   - Setup pre-commit hooks
   - Validate the installation
   - Run initial quality checks

3. **Start development server:**

   ```bash
   npm run dev
   ```

   - Site available at: `http://localhost:4321`
   - Hot reload enabled for instant feedback

---

## 📜 **Available Scripts**

### **Development**

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build optimized production version
npm run preview      # Preview production build locally
```

### **Quality Assurance**

```bash
npm run validate     # Run complete validation pipeline
npm run type-check   # TypeScript validation with Astro
npm run format       # Format code with Prettier
npm run format:check # Check code formatting (CI-friendly)
npm run lint         # Alias for format:check
npm run lint:fix     # Alias for format
```

### **Development Environment**

```bash
npm run setup        # Complete development environment setup
```

---

## 🔧 **Development Workflow**

### **Quality Gates**

Every code change goes through multiple validation layers:

1. **Pre-commit Hook** (automatic):
   - ✅ TypeScript type checking
   - ✅ Code formatting validation
   - ✅ Build verification
   - ⚠️ Security audit (non-blocking)

2. **CI/CD Pipeline** (GitHub Actions):
   - ✅ Cross-platform testing (Ubuntu)
   - ✅ Dependency validation
   - ✅ Production build testing
   - ✅ Artifact generation

3. **Automated Maintenance**:
   - 🔄 Weekly dependency updates (Sundays 2 AM UTC)
   - 🔄 Security patch automation
   - 🔄 Auto-testing of updates

### **Code Standards**

- **TypeScript**: Strict mode enabled for maximum type safety
- **Formatting**: Prettier with custom configuration for Astro
- **Linting**: ESLint rules for code quality
- **Commits**: Descriptive conventional commit messages

### **Performance Standards**

- **Lighthouse Performance**: 95+ score required
- **Lighthouse SEO**: 100/100 score required
- **Bundle Size**: Optimized with tree-shaking and compression
- **Core Web Vitals**: Excellent ratings across all metrics

---

## 🎯 **Performance & SEO**

### **Lighthouse Scores**

- **Performance**: 95+ ✅
- **Accessibility**: 100/100 ✅
- **Best Practices**: 100/100 ✅
- **SEO**: 100/100 ✅

### **SEO Features**

- ✅ **Automatic Sitemap**: Generated at build time
- ✅ **Structured Data**: Schema.org Person markup
- ✅ **Open Graph**: Custom images for social sharing
- ✅ **Meta Tags**: Complete SEO optimization
- ✅ **Canonical URLs**: Prevent duplicate content
- ✅ **Robots.txt**: Proper search engine directives

### **Performance Optimizations**

- ✅ **Static Generation**: Pre-rendered at build time
- ✅ **Asset Optimization**: Compressed CSS and images
- ✅ **Tree Shaking**: Unused code elimination
- ✅ **Critical CSS**: Inlined for faster rendering
- ✅ **CDN Ready**: Optimized for global distribution

---

## 🔒 **Privacy & Compliance**

- **GDPR Compliant**: Cookie consent banner implemented
- **AdSense Integration**: Privacy-friendly ad serving
- **Analytics Ready**: Google Analytics 4 compatible
- **Privacy Policy**: Comprehensive privacy documentation

---

## 🤝 **Contributing**

This is a personal portfolio, but if you find bugs or have suggestions:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** (following our quality standards)
4. **Run validation**: `npm run validate`
5. **Commit your changes**: `git commit -m 'feat: add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

---

## 📊 **Project Stats**

- **Bundle Size**: ~50KB (optimized)
- **Build Time**: <30 seconds
- **Lighthouse Score**: 95+ across all metrics
- **Dependencies**: Minimal and secure
- **Test Coverage**: 100% build validation

---

## 📞 **Contact**

**Sergio Márquez Pérez**
_AI/ML & Backend Developer_

- 🌐 **Website**: [sergiomarquez.dev](https://sergiomarquez.dev)
- 📧 **Email**: [cntacto@sergiomarquez.dev](mailto:cntacto@sergiomarquez.dev)
- 💼 **LinkedIn**: [sergio-marquez-perez](https://linkedin.com/in/sergio-marquez-perez/)
- 🐙 **GitHub**: [sergiomarquezdev](https://github.com/sergiomarquezdev)
- 🐦 **X/Twitter**: [@sergiomzdev](https://x.com/sergiomzdev)
- 📺 **YouTube**: [@sergiomarquezdev](https://www.youtube.com/@sergiomarquezdev)

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
