import { readFileSync } from "node:fs";
import { join } from "node:path";
import { defaultLocale, type Locale, locales } from "../i18n/index";

export interface CvMetric {
	value: string;
	label: string;
	context?: string;
}

export interface CvKpi {
	value: string;
	label: string;
}

export interface CvStatus {
	available: boolean;
	label: string;
}

export interface CvWritingChannel {
	platform: "blog" | "linkedin" | "x" | "tiktok";
	handle: string;
	description: string;
}

export interface CvAlsoRunning {
	name: string;
	url: string;
	description: string;
}

export interface CvWriting {
	blogUrl: string;
	channels: CvWritingChannel[];
}

export type CvData = {
	basics: {
		name: string;
		tagline: string;
		email: string;
		urls: {
			site: string;
			linkedin: string;
			github: string;
			x: string;
			tiktok: string;
			blog?: string;
		};
		summary: string;
		headline?: string;
		headlineAccent?: string;
		stackChips?: string[];
		status?: CvStatus;
		alsoRunning?: CvAlsoRunning;
	};
	experience: Array<{
		company: string;
		role: string;
		period: string;
		summary: string;
		highlights: string[];
		headline?: string;
		kpis?: CvKpi[];
	}>;
	projects: Array<{
		name: string;
		headline: string;
		stack: string[];
		url?: string;
		github?: string[];
		private?: boolean;
		image?: string;
		featured?: boolean;
		kpi?: CvKpi;
	}>;
	certifications: Array<{
		name: string;
		issuer: string;
		date: string;
		url?: string;
	}>;
	metrics?: CvMetric[];
	writing?: CvWriting;
};

function loadCv(locale: Locale): CvData {
	// Resolve from project root: module-relative paths break in Astro 7,
	// whose prerender chunks execute from dist/.prerender/chunks/
	const cvPath = join(process.cwd(), `public/cv.${locale}.json`);
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
