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
		"seo.title": "Sergio Márquez · Ingeniero backend e IA · Agentes, RAG y LLMs (Python, GCP)",
		"seo.description":
			"Ingeniero backend e IA. Diseño y llevo a producción sistemas con LLMs sobre Google Cloud: asistentes multi-agente con RAG, validación de documentos y pipelines de datos. Programo a diario con agentes (Claude Code y Codex).",
		"skip.main": "Ir al contenido principal",
		"aria.sendEmail": "Enviar email a Sergio Márquez",
		"aria.mainNav": "Navegación principal",
		"aria.mobileNav": "Navegación móvil",
		"aria.viewProject": "Ver proyecto",
		"aria.viewCert": "Ver certificado",
		"structured.knowsAbout":
			"Inteligencia Artificial,Machine Learning,LLMs,RAG,Claude Code,Vertex AI,GCP,Python,FastAPI,Backend,Asistentes conversacionales,Búsqueda semántica",
		"og.locale": "es_ES",
		"og.imageAlt": "Sergio Márquez · Ingeniero backend e IA",
		"lang.switch": "EN",
		"lang.switchLabel": "Switch to English",
		"footer.cta": "¿Hablamos?",
		"footer.contact": "Hablemos",
		"hero.role": "Ingeniero backend e IA",
		"hero.proof": "Backend, datos e IA · Python, TypeScript y GCP",
		"hero.now": "Ahora",
		"case.current": "Puesto actual",
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
		"cmdk.results": "resultados",
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
		"seo.title": "Sergio Márquez · Backend & AI Engineer · Agents, RAG and LLMs (Python, GCP)",
		"seo.description":
			"Backend & AI engineer. I design and ship LLM systems on Google Cloud: multi-agent assistants with RAG, document validation and data pipelines. I code with agents every day (Claude Code and Codex).",
		"skip.main": "Skip to main content",
		"aria.sendEmail": "Send email to Sergio Márquez",
		"aria.mainNav": "Main navigation",
		"aria.mobileNav": "Mobile navigation",
		"aria.viewProject": "View project",
		"aria.viewCert": "View certificate",
		"structured.knowsAbout":
			"Artificial Intelligence,Machine Learning,LLMs,RAG,Claude Code,Vertex AI,GCP,Python,FastAPI,Backend,Conversational assistants,Semantic search",
		"og.locale": "en_US",
		"og.imageAlt": "Sergio Márquez · Backend & AI Engineer",
		"lang.switch": "ES",
		"lang.switchLabel": "Cambiar a español",
		"footer.cta": "Want to talk?",
		"footer.contact": "Let's talk",
		"hero.role": "Backend & AI engineer",
		"hero.proof": "Backend, data and AI · Python, TypeScript and GCP",
		"hero.now": "Now",
		"case.current": "Current role",
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
		"cmdk.results": "results",
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
