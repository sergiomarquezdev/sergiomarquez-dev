export const defaultLocale = "es";
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

const ui = {
	es: {
		"seo.title": "Sergio Márquez · Ingeniero backend e IA · Agentes y LLMs",
		"seo.description":
			"Ingeniero backend e IA. Llevo a producción sistemas con LLMs en Google Cloud: asistentes multi-agente con RAG, validación documental y pipelines de datos.",
		"skip.main": "Ir al contenido principal",
		"structured.knowsAbout":
			"Inteligencia Artificial,Machine Learning,LLMs,RAG,Claude Code,Vertex AI,GCP,Python,FastAPI,Backend,Asistentes conversacionales,Búsqueda semántica",
		"og.locale": "es_ES",
		"og.imageAlt": "Sergio Márquez · Ingeniero backend e IA",
		"lang.switch": "English",
		"section.about": "Sobre mí",
		"section.projects": "Proyectos",
		"section.experience": "Experiencia",
		"section.certifications": "Certificaciones y formación",
		"intro.contactLabel": "Contacto y canales",
		"intro.emailLabel": "Email",
		"projects.openSource": "Código abierto",
		"projects.more": "Más proyectos en GitHub",
		"experience.details": "Detalle del puesto",
		"experience.stack": "Stack",
		"footer.title": "Contacto",
		"footer.line": "La vía más directa para hablar conmigo es el correo.",
		"footer.channelsLabel": "Canales",
		"notFound.description": "Esta página no existe.",
		"notFound.message": "Esta página no existe o se ha movido.",
		"notFound.cta": "Volver al inicio",
	},
	en: {
		"seo.title": "Sergio Márquez · Backend & AI Engineer · Agents and LLMs",
		"seo.description":
			"Backend & AI engineer. I design and ship LLM systems on Google Cloud: multi-agent assistants with RAG, document validation and data pipelines.",
		"skip.main": "Skip to main content",
		"structured.knowsAbout":
			"Artificial Intelligence,Machine Learning,LLMs,RAG,Claude Code,Vertex AI,GCP,Python,FastAPI,Backend,Conversational assistants,Semantic search",
		"og.locale": "en_US",
		"og.imageAlt": "Sergio Márquez · Backend & AI Engineer",
		"lang.switch": "Español",
		"section.about": "About",
		"section.projects": "Projects",
		"section.experience": "Experience",
		"section.certifications": "Certifications & training",
		"intro.contactLabel": "Contact and channels",
		"intro.emailLabel": "Email",
		"projects.openSource": "Open source",
		"projects.more": "More projects on GitHub",
		"experience.details": "Role details",
		"experience.stack": "Stack",
		"footer.title": "Contact",
		"footer.line": "Email is the most direct way to reach me.",
		"footer.channelsLabel": "Channels",
		"notFound.description": "This page does not exist.",
		"notFound.message": "This page does not exist or has been moved.",
		"notFound.cta": "Back to home",
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

/** Root path of a locale: "/" for the default one, "/en/" otherwise. */
export function homePath(locale: Locale): string {
	return locale === defaultLocale ? "/" : `/${locale}/`;
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
