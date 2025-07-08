# Personal Portfolio - sergiomarquez.dev

This repository contains the source code for my personal portfolio website, built with Astro and Tailwind CSS. The design is minimalist, dark-mode-first, and inspired by [rasmic.xyz](https://www.rasmic.xyz/).

The project is deployed automatically to Cloudflare Pages on every push to the `main` branch.

## Tech Stack

-   **Framework**: [Astro](https://astro.build/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/) via [GitHub Actions](https://github.com/features/actions) for build validation.

## Project Structure

-   `src/components`: Reusable Astro components.
-   `src/layouts`: Base layout components.
-   `src/pages`: Site pages (file-based routing).
-   `src/styles`: Global styles and design tokens.
-   `public/`: Static assets (images, fonts, etc.).

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sergiomarquezdev/sergiomarquez-dev.git
    cd sergiomarquez-dev
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:4321`.

## Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run preview`: Previews the production build locally.
