export const defaultLocale = "es";
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

const ui = {
	es: {
		"nav.about": "Sobre mí",
		"nav.experience": "Experiencia",
		"nav.projects": "Proyectos",
		"nav.certifications": "Certificaciones",
		"section.experience": "Experiencia",
		"section.projects": "Proyectos",
		"section.certifications": "Certificaciones",
		"seo.title": "Sergio Marquez - Desarrollador Python e IA",
		"seo.description":
			"Portfolio de Sergio Marquez, desarrollador Python especializado en IA y Backend con FastAPI, integraciones LLM y automatizaciones pragmáticas.",
		"skip.main": "Ir al contenido principal",
		"aria.sendEmail": "Enviar email a Sergio Márquez",
		"aria.mainNav": "Navegación principal",
		"aria.viewProject": "Ver proyecto",
		"aria.viewCert": "Ver certificado",
		"structured.knowsAbout":
			"Inteligencia Artificial,Aprendizaje Automático,Desarrollo Backend,Python,FastAPI,Pipelines RAG,LLMs,Google Cloud Platform",
		"og.locale": "es_ES",
		"og.imageAlt": "Sergio Márquez - Portfolio de Desarrollador IA & Backend",
		"lang.switch": "EN",
		"lang.switchLabel": "Switch to English",
	},
	en: {
		"nav.about": "About",
		"nav.experience": "Experience",
		"nav.projects": "Projects",
		"nav.certifications": "Certifications",
		"section.experience": "Experience",
		"section.projects": "Projects",
		"section.certifications": "Certifications",
		"seo.title": "Sergio Marquez - Python AI Developer",
		"seo.description":
			"Portfolio of Sergio Marquez, a Python AI & Backend Developer focused on FastAPI services, LLM integrations, and pragmatic automations.",
		"skip.main": "Skip to main content",
		"aria.sendEmail": "Send email to Sergio Márquez",
		"aria.mainNav": "Main navigation",
		"aria.viewProject": "View project",
		"aria.viewCert": "View certificate",
		"structured.knowsAbout":
			"Artificial Intelligence,Machine Learning,Backend Development,Python,FastAPI,RAG Pipelines,LLMs,Google Cloud Platform",
		"og.locale": "en_US",
		"og.imageAlt": "Sergio Márquez - AI & Backend Developer portfolio",
		"lang.switch": "ES",
		"lang.switchLabel": "Cambiar a español",
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
