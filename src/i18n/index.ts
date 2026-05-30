export const defaultLocale = "es";
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

const ui = {
	es: {
		"nav.about": "Sobre mí",
		"nav.experience": "Experiencia",
		"nav.cases": "Experiencia",
		"nav.projects": "Proyectos",
		"nav.writing": "Blog",
		"nav.certifications": "Certificaciones",
		"nav.contact": "Contacto",
		"section.experience": "Experiencia",
		"section.projects": "Proyectos",
		"section.certifications": "Certificaciones",
		"seo.title": "Sergio Márquez — Construyo software con agentes de IA",
		"seo.description":
			"Builder enfocado en agentes de IA: Claude Code, flujos agénticos y spec-driven development. Sistemas de IA llevados a producción con métricas, no demos.",
		"skip.main": "Ir al contenido principal",
		"aria.sendEmail": "Enviar email a Sergio Márquez",
		"aria.mainNav": "Navegación principal",
		"aria.mobileNav": "Navegación móvil",
		"aria.viewProject": "Ver proyecto",
		"aria.viewCert": "Ver certificado",
		"structured.knowsAbout":
			"Agentes de IA,Claude Code,Agentic Development,Spec-Driven Development,Inteligencia Artificial,Pipelines RAG,LLMs,Python,FastAPI,Automatización",
		"og.locale": "es_ES",
		"og.imageAlt": "Sergio Márquez - Builder de software con agentes de IA",
		"lang.switch": "EN",
		"lang.switchLabel": "Switch to English",
		"footer.cta": "Interesado en trabajar juntos?",
		"footer.contact": "Hablemos",
		"hero.role": "builder · IA aplicada",
		"hero.proof": "Sistemas de IA en producción · 40+ repos open source",
		"hero.now": "Ahora",
		"cmdk.hint": "comandos",
		"cmdk.placeholder": "Escribe un comando o busca…",
		"cmdk.empty": "Sin resultados",
		"cmdk.groupNav": "Ir a",
		"cmdk.groupLinks": "Enlaces",
		"cmdk.groupActions": "Acciones",
		"cmdk.toggleLang": "Cambiar a inglés",
		"cmdk.openGithub": "Abrir GitHub",
		"cmdk.openLinkedin": "Abrir LinkedIn",
		"cmdk.openBlog": "Abrir el blog",
		"cmdk.openX": "Abrir X (Twitter)",
		"cmdk.copyEmail": "Copiar email",
		"cmdk.copied": "Email copiado",
	},
	en: {
		"nav.about": "About",
		"nav.experience": "Experience",
		"nav.cases": "Experience",
		"nav.projects": "Projects",
		"nav.writing": "Blog",
		"nav.certifications": "Certifications",
		"nav.contact": "Contact",
		"section.experience": "Experience",
		"section.projects": "Projects",
		"section.certifications": "Certifications",
		"seo.title": "Sergio Márquez — I build software with AI agents",
		"seo.description":
			"Builder focused on AI agents: Claude Code, agentic workflows, and spec-driven development. AI systems shipped to production with metrics, not demos.",
		"skip.main": "Skip to main content",
		"aria.sendEmail": "Send email to Sergio Márquez",
		"aria.mainNav": "Main navigation",
		"aria.mobileNav": "Mobile navigation",
		"aria.viewProject": "View project",
		"aria.viewCert": "View certificate",
		"structured.knowsAbout":
			"AI Agents,Claude Code,Agentic Development,Spec-Driven Development,Artificial Intelligence,RAG Pipelines,LLMs,Python,FastAPI,Automation",
		"og.locale": "en_US",
		"og.imageAlt": "Sergio Márquez - Builder of software with AI agents",
		"lang.switch": "ES",
		"lang.switchLabel": "Cambiar a español",
		"footer.cta": "Interested in working together?",
		"footer.contact": "Let's talk",
		"hero.role": "builder · applied AI",
		"hero.proof": "AI systems in production · 40+ open-source repos",
		"hero.now": "Now",
		"cmdk.hint": "commands",
		"cmdk.placeholder": "Type a command or search…",
		"cmdk.empty": "No results",
		"cmdk.groupNav": "Go to",
		"cmdk.groupLinks": "Links",
		"cmdk.groupActions": "Actions",
		"cmdk.toggleLang": "Switch to Spanish",
		"cmdk.openGithub": "Open GitHub",
		"cmdk.openLinkedin": "Open LinkedIn",
		"cmdk.openBlog": "Open the blog",
		"cmdk.openX": "Open X (Twitter)",
		"cmdk.copyEmail": "Copy email",
		"cmdk.copied": "Email copied",
	},
} as const;

type TranslationKey = keyof (typeof ui)["es"];

export function t(locale: Locale, key: TranslationKey): string {
	return ui[locale][key];
}

export function getLocale(astroLocale: string | undefined): Locale {
	if (astroLocale === "en") return "en";
	return defaultLocale;
}

export function formatDate(dateStr: string, locale: Locale): string {
	// Dates like "2023" (year only) stay as-is
	if (/^\d{4}$/.test(dateStr)) return dateStr;
	const date = new Date(dateStr);
	if (Number.isNaN(date.getTime())) return dateStr;
	return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
		year: "numeric",
		month: "long",
	}).format(date);
}
