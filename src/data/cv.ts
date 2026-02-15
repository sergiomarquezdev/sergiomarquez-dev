import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultLocale, type Locale, locales } from "../i18n/index";

const currentDir = dirname(fileURLToPath(import.meta.url));

export type CvData = {
	basics: {
		name: string;
		tagline: string;
		email: string;
		urls: Record<string, string>;
		summary: string;
	};
	experience: Array<{
		company: string;
		role: string;
		period: string;
		summary: string;
		highlights: string[];
	}>;
	projects: Array<{
		name: string;
		headline: string;
		stack: string[];
		url?: string;
		github?: string[];
		private?: boolean;
	}>;
	certifications: Array<{
		name: string;
		issuer: string;
		date: string;
		url?: string;
	}>;
};

function loadCv(locale: Locale): CvData {
	const cvPath = join(currentDir, `../../public/cv.${locale}.json`);
	return JSON.parse(readFileSync(cvPath, "utf8"));
}

// Pre-load all locales at build time
const cvCache = Object.fromEntries(locales.map((locale) => [locale, loadCv(locale)])) as Record<
	Locale,
	CvData
>;

export function getCv(locale: Locale): CvData {
	return cvCache[locale];
}

// Default export for backward compatibility (redirect pages, tests)
export const cv: CvData = cvCache[defaultLocale];
