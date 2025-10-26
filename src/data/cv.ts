import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const cvPath = join(currentDir, "../../public/cv.json");

export type CvData = {
	basics: {
		name: string;
		tagline: string;
		email: string;
		urls: Record<string, string>;
		summary: string;
	};
	technologies: Array<{
		title: string;
		summary: string;
	}>;
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
	}>;
	certifications: Array<{
		name: string;
		issuer: string;
		date: string;
		url?: string;
	}>;
};

// Read synchronously since Astro evaluates this at build time only
const cvRaw = readFileSync(cvPath, "utf8");

export const cv: CvData = JSON.parse(cvRaw);
