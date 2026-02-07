import { describe, expect, it } from "vitest";
import { cv } from "../cv";

describe("cv data loader", () => {
	it("loads cv object successfully", () => {
		expect(cv).toBeDefined();
		expect(typeof cv).toBe("object");
	});

	it("has basics with a name", () => {
		expect(cv.basics).toBeDefined();
		expect(cv.basics.name).toBeDefined();
		expect(typeof cv.basics.name).toBe("string");
		expect(cv.basics.name.length).toBeGreaterThan(0);
	});

	it("has basics with tagline, email, urls, and summary", () => {
		expect(cv.basics.tagline).toBeDefined();
		expect(cv.basics.email).toBeDefined();
		expect(cv.basics.urls).toBeDefined();
		expect(cv.basics.summary).toBeDefined();
	});

	it("has experience as a non-empty array", () => {
		expect(Array.isArray(cv.experience)).toBe(true);
		expect(cv.experience.length).toBeGreaterThan(0);
	});

	it("has experience entries with required fields", () => {
		for (const entry of cv.experience) {
			expect(entry.company).toBeDefined();
			expect(entry.role).toBeDefined();
			expect(entry.period).toBeDefined();
			expect(entry.summary).toBeDefined();
			expect(Array.isArray(entry.highlights)).toBe(true);
		}
	});

	it("has projects as a non-empty array", () => {
		expect(Array.isArray(cv.projects)).toBe(true);
		expect(cv.projects.length).toBeGreaterThan(0);
	});

	it("has project entries with required fields", () => {
		for (const project of cv.projects) {
			expect(project.name).toBeDefined();
			expect(project.headline).toBeDefined();
			expect(Array.isArray(project.stack)).toBe(true);
		}
	});

	it("has certifications as an array", () => {
		expect(Array.isArray(cv.certifications)).toBe(true);
	});
});
