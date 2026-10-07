import { readFileSync } from "node:fs";
import { join } from "node:path";
import { type Locale, locales } from "../i18n/index";

export type CvPlatform = "blog" | "linkedin" | "x" | "youtube" | "tiktok" | "github";

export interface CvWritingChannel {
	platform: CvPlatform;
	handle: string;
	description: string;
}

export interface CvWriting {
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
	};
	experience: Array<{
		company: string;
		role: string;
		period: string;
		summary: string;
		highlights: string[];
		headline?: string;
		stack?: string[];
	}>;
	projects: Array<{
		name: string;
		headline: string;
		stack: string[];
		url?: string;
		github?: string[];
		private?: boolean;
		featured?: boolean;
	}>;
	certifications: Array<{
		name: string;
		issuer: string;
		date: string;
		url?: string;
	}>;
	writing?: CvWriting;
};

export interface CvChannel {
	platform: CvPlatform;
	label: string;
	href: string;
	handle: string;
	description: string;
}

const PLATFORM_LABELS: Record<CvPlatform, string> = {
	blog: "Blog",
	linkedin: "LinkedIn",
	x: "X",
	youtube: "YouTube",
	tiktok: "TikTok",
	github: "GitHub",
};

/** Channels in `writing.channels` order, with their URL taken from `basics.urls`. */
export function getChannels(cv: CvData): CvChannel[] {
	const channels = cv.writing?.channels ?? [];
	return channels.flatMap((channel) => {
		const href = cv.basics.urls[channel.platform];
		if (!href) return [];
		return [
			{
				platform: channel.platform,
				label: PLATFORM_LABELS[channel.platform],
				href,
				handle: channel.handle,
				description: channel.description,
			},
		];
	});
}

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
