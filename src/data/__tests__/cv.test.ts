import { describe, expect, it } from "vitest";
import { type CvData, cv, getCv } from "../cv";

function validateCvStructure(data: CvData) {
	expect(data).toBeDefined();
	expect(typeof data).toBe("object");

	// basics
	expect(data.basics).toBeDefined();
	expect(data.basics.name).toBeDefined();
	expect(typeof data.basics.name).toBe("string");
	expect(data.basics.name.length).toBeGreaterThan(0);
	expect(data.basics.tagline).toBeDefined();
	expect(data.basics.email).toBeDefined();
	expect(data.basics.urls).toBeDefined();
	expect(data.basics.summary).toBeDefined();

	// experience
	expect(Array.isArray(data.experience)).toBe(true);
	expect(data.experience.length).toBeGreaterThan(0);
	for (const entry of data.experience) {
		expect(entry.company).toBeDefined();
		expect(entry.role).toBeDefined();
		expect(entry.period).toBeDefined();
		expect(entry.summary).toBeDefined();
		expect(Array.isArray(entry.highlights)).toBe(true);
	}

	// projects
	expect(Array.isArray(data.projects)).toBe(true);
	expect(data.projects.length).toBeGreaterThan(0);
	for (const project of data.projects) {
		expect(project.name).toBeDefined();
		expect(project.headline).toBeDefined();
		expect(Array.isArray(project.stack)).toBe(true);
	}

	// certifications
	expect(Array.isArray(data.certifications)).toBe(true);
}

describe("cv data loader", () => {
	it("loads default cv (es) successfully", () => {
		validateCvStructure(cv);
	});

	it("loads Spanish cv via getCv", () => {
		const esData = getCv("es");
		validateCvStructure(esData);
	});

	it("loads English cv via getCv", () => {
		const enData = getCv("en");
		validateCvStructure(enData);
	});

	it("returns same data for default cv and getCv('es')", () => {
		const esData = getCv("es");
		expect(cv.basics.name).toBe(esData.basics.name);
		expect(cv.basics.email).toBe(esData.basics.email);
	});

	it("has different content between locales", () => {
		const esData = getCv("es");
		const enData = getCv("en");
		// Tagline should differ between locales
		expect(esData.basics.tagline).not.toBe(enData.basics.tagline);
		// But name and email stay the same
		expect(esData.basics.name).toBe(enData.basics.name);
		expect(esData.basics.email).toBe(enData.basics.email);
	});

	it("has structural parity between locales", () => {
		const esData = getCv("es");
		const enData = getCv("en");
		expect(esData.experience.length).toBe(enData.experience.length);
		expect(esData.projects.length).toBe(enData.projects.length);
		expect(esData.certifications.length).toBe(enData.certifications.length);
		// Verify highlight counts match per experience entry
		for (let i = 0; i < esData.experience.length; i++) {
			expect(esData.experience[i].highlights.length).toBe(enData.experience[i].highlights.length);
		}
	});
});
