import { readFileSync } from "node:fs";
import { join } from "node:path";
import { type Locale, locales } from "../i18n/index";

export type CvPlatform = "blog" | "linkedin" | "x" | "youtube" | "tiktok" | "instagram" | "github";

export type CvProjectGroup = "publishing" | "agents" | "tools" | "games";

/** Order in which project groups are shown. */
export const PROJECT_GROUPS: readonly CvProjectGroup[] = ["publishing", "agents", "tools", "games"];

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
			instagram: string;
			blog: string;
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
		group: CvProjectGroup;
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
	instagram: "Instagram",
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

export type CvChannelGroupKey = "blog" | "video" | "profiles";

const CHANNEL_GROUP: Record<CvPlatform, CvChannelGroupKey> = {
	blog: "blog",
	youtube: "video",
	tiktok: "video",
	instagram: "video",
	linkedin: "profiles",
	x: "profiles",
	github: "profiles",
};

const CHANNEL_GROUP_ORDER: readonly CvChannelGroupKey[] = ["blog", "video", "profiles"];

export interface CvChannelGroup {
	key: CvChannelGroupKey;
	channels: CvChannel[];
	/** Shared description, only when every channel in the group has the same one. */
	description?: string;
}

/**
 * Channels grouped by what they publish (blog, short videos, profiles), keeping
 * `writing.channels` order inside each group. Empty groups are dropped.
 */
export function getChannelGroups(cv: CvData): CvChannelGroup[] {
	const channels = getChannels(cv);
	return CHANNEL_GROUP_ORDER.flatMap((key) => {
		const members = channels.filter((channel) => CHANNEL_GROUP[channel.platform] === key);
		const first = members[0];
		if (!first) return [];
		const shared = members.every((channel) => channel.description === first.description);
		const group: CvChannelGroup = { key, channels: members };
		if (shared) group.description = first.description;
		return [group];
	});
}

export type CvProject = CvData["projects"][number];

export interface CvProjectSection {
	group: CvProjectGroup;
	projects: CvProject[];
}

/**
 * Projects bucketed by `group` in PROJECT_GROUPS order, JSON order inside each
 * group. The featured project leads its group.
 */
export function groupProjects(projects: CvProject[]): CvProjectSection[] {
	return PROJECT_GROUPS.flatMap((group) => {
		const members = projects.filter((project) => project.group === group);
		if (members.length === 0) return [];
		const featured = members.filter((project) => project.featured);
		const rest = members.filter((project) => !project.featured);
		return [{ group, projects: [...featured, ...rest] }];
	});
}

export type CvRole = CvData["experience"][number] & { current: boolean };

export interface CvCompanyGroup {
	company: string;
	roles: CvRole[];
}

/**
 * Consecutive roles at the same company share one company heading.
 * The first entry is the current role.
 */
export function groupByCompany(experience: CvData["experience"]): CvCompanyGroup[] {
	const groups: CvCompanyGroup[] = [];
	experience.forEach((entry, index) => {
		const role: CvRole = { ...entry, current: index === 0 };
		const last = groups.at(-1);
		if (last && last.company === entry.company) last.roles.push(role);
		else groups.push({ company: entry.company, roles: [role] });
	});
	return groups;
}

/** Link target of a project: private repos never link to their code; a public URL still wins. */
export function projectHref(project: CvProject): string | undefined {
	return project.url ?? (project.private ? undefined : project.github?.[0]);
}

/** A URL as shown in running text: no scheme, no trailing slash. */
export function displayUrl(href: string): string {
	return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
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
