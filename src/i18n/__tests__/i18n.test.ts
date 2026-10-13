import { describe, expect, it } from "vitest";
import { defaultLocale, formatDate, getLocale, homePath, otherLocale } from "../index";

describe("getLocale", () => {
	it("keeps a known locale", () => {
		expect(getLocale("es")).toBe("es");
		expect(getLocale("en")).toBe("en");
	});

	it("falls back to the default locale", () => {
		expect(getLocale(undefined)).toBe(defaultLocale);
		expect(getLocale("fr")).toBe(defaultLocale);
		expect(getLocale("")).toBe(defaultLocale);
	});
});

describe("otherLocale and homePath", () => {
	it("swaps between the two locales", () => {
		expect(otherLocale("es")).toBe("en");
		expect(otherLocale("en")).toBe("es");
	});

	it("serves the default locale at the root", () => {
		expect(homePath("es")).toBe("/");
		expect(homePath("en")).toBe("/en/");
	});
});

describe("formatDate", () => {
	it("keeps a year-only date as-is", () => {
		expect(formatDate("2023", "es")).toBe("2023");
	});

	it("keeps an unparseable date as-is", () => {
		expect(formatDate("not a date", "en")).toBe("not a date");
	});

	it("formats month and year per locale", () => {
		expect(formatDate("2024-01-03", "es")).toBe("enero de 2024");
		expect(formatDate("2024-01-03", "en")).toBe("January 2024");
	});

	// ISO dates parse as UTC midnight: the month must not depend on the
	// build machine's time zone (west of UTC this used to print January)
	it("formats the first day of a month in UTC", () => {
		expect(formatDate("2024-02-01", "es")).toBe("febrero de 2024");
		expect(formatDate("2024-02-01", "en")).toBe("February 2024");
	});
});
