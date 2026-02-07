const GITHUB_USERNAME = "sergiomarquezdev";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`;

export interface GitHubCommit {
	sha: string;
	message: string;
	repo: string;
	date: string;
}

interface GitHubEvent {
	type: string;
	repo: { name: string };
	payload: {
		commits?: Array<{
			sha: string;
			message: string;
		}>;
	};
	created_at: string;
}

export async function getLatestCommit(): Promise<GitHubCommit | null> {
	try {
		const response = await fetch(GITHUB_API_URL, {
			headers: {
				Accept: "application/vnd.github.v3+json",
				"User-Agent": "sergiomarquez-portfolio",
			},
			signal: AbortSignal.timeout(5000),
		});

		if (!response.ok) {
			console.warn(`GitHub API returned ${response.status}`);
			return null;
		}

		const events: GitHubEvent[] = await response.json();

		// Find the first PushEvent with commits
		const pushEvent = events.find(
			(event) =>
				event.type === "PushEvent" && event.payload.commits && event.payload.commits.length > 0,
		);

		if (!pushEvent || !pushEvent.payload.commits) {
			return null;
		}

		const latestCommit = pushEvent.payload.commits[0];
		const shortSha = latestCommit.sha.substring(0, 7);
		const shortMessage = latestCommit.message.split("\n")[0].substring(0, 50);

		return {
			sha: shortSha,
			message:
				shortMessage.length < latestCommit.message.split("\n")[0].length
					? `${shortMessage}...`
					: shortMessage,
			repo: pushEvent.repo.name.split("/")[1],
			date: pushEvent.created_at,
		};
	} catch (error) {
		console.warn("Failed to fetch GitHub activity:", error);
		return null;
	}
}
