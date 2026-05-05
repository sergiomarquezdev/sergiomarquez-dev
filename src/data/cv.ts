import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultLocale, type Locale, locales } from "../i18n/index";

const currentDir = dirname(fileURLToPath(import.meta.url));

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
	platform: "blog" | "youtube" | "linkedin" | "x" | "tiktok";
	handle: string;
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
			youtube: string;
			tiktok: string;
			blog?: string;
		};
		summary: string;
		headline?: string;
		stackChips?: string[];
		status?: CvStatus;
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
