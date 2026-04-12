import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getLatestCommit } from "../github";

function assertDefined<T>(value: T | null | undefined): asserts value is T {
	expect(value).not.toBeNull();
	if (value == null) throw new Error("Expected value to be defined");
}

function createPushEvent(
	overrides: { sha?: string; message?: string; repoName?: string; createdAt?: string } = {},
) {
	return {
		type: "PushEvent",
		repo: { name: overrides.repoName ?? "sergiomarquezdev/my-repo" },
		payload: {
			commits: [
				{
					sha: overrides.sha ?? "abc1234567890def",
					message: overrides.message ?? "fix: short message",
				},
			],
		},
		created_at: overrides.createdAt ?? "2025-01-15T10:00:00Z",
	};
}

function mockFetchSuccess(events: unknown[]) {
	return vi.fn().mockResolvedValue({
		ok: true,
		json: () => Promise.resolve(events),
	});
}

describe("getLatestCommit", () => {
	beforeEach(() => {
		vi.stubGlobal("fetch", vi.fn());
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("shortens SHA to 7 characters", async () => {
		const fullSha = "abc1234567890abcdef1234567890abcdef123456";
		vi.stubGlobal("fetch", mockFetchSuccess([createPushEvent({ sha: fullSha })]));

		const result = await getLatestCommit();

		assertDefined(result);
		expect(result.sha).toBe("abc1234");
		expect(result.sha).toHaveLength(7);
	});

	it("keeps short messages as-is without ellipsis", async () => {
		const shortMsg = "fix: update button color";
		vi.stubGlobal("fetch", mockFetchSuccess([createPushEvent({ message: shortMsg })]));

		const result = await getLatestCommit();

		assertDefined(result);
		expect(result.message).toBe(shortMsg);
		expect(result.message).not.toContain("...");
	});

	it("truncates messages longer than 50 characters and adds ellipsis", async () => {
		const longMsg =
			"feat: implement a very long commit message that exceeds fifty characters easily";
		vi.stubGlobal("fetch", mockFetchSuccess([createPushEvent({ message: longMsg })]));

		const result = await getLatestCommit();

		assertDefined(result);
		expect(result.message).toHaveLength(53); // 50 + "..."
		expect(result.message.endsWith("...")).toBe(true);
		expect(result.message).toBe(`${longMsg.substring(0, 50)}...`);
	});

	it("uses only the first line of multi-line messages", async () => {
		const multiLineMsg = "fix: short first line\n\nDetailed body paragraph.";
		vi.stubGlobal("fetch", mockFetchSuccess([createPushEvent({ message: multiLineMsg })]));

		const result = await getLatestCommit();

		assertDefined(result);
		expect(result.message).toBe("fix: short first line");
		expect(result.message).not.toContain("\n");
	});

	it("extracts repo name after the slash", async () => {
		vi.stubGlobal(
			"fetch",
			mockFetchSuccess([createPushEvent({ repoName: "sergiomarquezdev/portfolio-site" })]),
		);

		const result = await getLatestCommit();

		assertDefined(result);
		expect(result.repo).toBe("portfolio-site");
	});

	it("returns the created_at date from the event", async () => {
		const date = "2025-06-01T14:30:00Z";
		vi.stubGlobal("fetch", mockFetchSuccess([createPushEvent({ createdAt: date })]));

		const result = await getLatestCommit();

		assertDefined(result);
		expect(result.date).toBe(date);
	});

	it("finds the first PushEvent with commits, skipping other event types", async () => {
		const events = [
			{
				type: "WatchEvent",
				repo: { name: "user/repo" },
				payload: {},
				created_at: "2025-01-01T00:00:00Z",
			},
			{
				type: "CreateEvent",
				repo: { name: "user/repo" },
				payload: {},
				created_at: "2025-01-02T00:00:00Z",
			},
			createPushEvent({ message: "feat: the right one" }),
		];
		vi.stubGlobal("fetch", mockFetchSuccess(events));

		const result = await getLatestCommit();

		assertDefined(result);
		expect(result.message).toBe("feat: the right one");
	});

	it("skips PushEvents with no commits", async () => {
		const events = [
			{
				type: "PushEvent",
				repo: { name: "user/empty-repo" },
				payload: { commits: [] },
				created_at: "2025-01-01T00:00:00Z",
			},
			createPushEvent({ message: "fix: from second push event" }),
		];
		vi.stubGlobal("fetch", mockFetchSuccess(events));

		const result = await getLatestCommit();

		assertDefined(result);
		expect(result.message).toBe("fix: from second push event");
	});

	it("returns null when events array is empty", async () => {
		vi.stubGlobal("fetch", mockFetchSuccess([]));

		const result = await getLatestCommit();

		expect(result).toBeNull();
	});

	it("returns null when no PushEvent exists in events", async () => {
		const events = [
			{
				type: "WatchEvent",
				repo: { name: "user/repo" },
				payload: {},
				created_at: "2025-01-01T00:00:00Z",
			},
			{
				type: "ForkEvent",
				repo: { name: "user/repo" },
				payload: {},
				created_at: "2025-01-02T00:00:00Z",
			},
		];
		vi.stubGlobal("fetch", mockFetchSuccess(events));

		const result = await getLatestCommit();

		expect(result).toBeNull();
	});

	it("returns null when fetch throws a network error", async () => {
		vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

		const result = await getLatestCommit();

		expect(result).toBeNull();
	});

	it("returns null when API returns non-ok status", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: false,
				status: 403,
			}),
		);

		const result = await getLatestCommit();

		expect(result).toBeNull();
	});

	it("keeps exactly 50-char messages without ellipsis", async () => {
		// Exactly 50 characters -- should NOT be truncated
		const exactMsg = "12345678901234567890123456789012345678901234567890";
		expect(exactMsg).toHaveLength(50);

		vi.stubGlobal("fetch", mockFetchSuccess([createPushEvent({ message: exactMsg })]));

		const result = await getLatestCommit();

		assertDefined(result);
		expect(result.message).toBe(exactMsg);
		expect(result.message).not.toContain("...");
	});
});
