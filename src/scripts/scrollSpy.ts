export interface ScrollSpyOptions {
	/** CSS selector for the nav links to manage */
	linkSelector: string;
	/** Reads the target section id from a nav link */
	getSectionId: (link: HTMLAnchorElement) => string | undefined;
	/** Mirror the active state to aria-current (desktop nav) */
	setAriaCurrent?: boolean;
}

/**
 * Shared scroll-spy used by the desktop sidebar nav and the mobile bottom nav.
 * Highlights the link whose section is closest to the top of the viewport,
 * with a short lock after click so smooth-scroll doesn't fight the highlight.
 */
export function initScrollSpy({
	linkSelector,
	getSectionId,
	setAriaCurrent = false,
}: ScrollSpyOptions): void {
	const links = document.querySelectorAll<HTMLAnchorElement>(linkSelector);
	// Resolve targets by the IDs declared in nav links so we also pick up
	// the contact footer (which is a <footer> rather than <section>).
	const targetIds = Array.from(links)
		.map(getSectionId)
		.filter((id): id is string => !!id);
	const sections = targetIds
		.map((id) => document.getElementById(id))
		.filter((el): el is HTMLElement => el !== null);

	if (links.length === 0 || sections.length === 0) return;

	let currentActive: string | null = null;
	let clickLockUntil = 0;

	function setActive(sectionId: string, fromClick = false): void {
		if (currentActive === sectionId) return;
		currentActive = sectionId;
		links.forEach((link) => {
			const isActive = getSectionId(link) === sectionId;
			link.classList.toggle("active", isActive);
			if (setAriaCurrent) {
				if (isActive) {
					link.setAttribute("aria-current", "true");
				} else {
					link.removeAttribute("aria-current");
				}
			}
		});
		if (fromClick) {
			clickLockUntil = Date.now() + 800;
		}
	}

	function updateActiveSection(): void {
		if (Date.now() < clickLockUntil) return;

		const scrollY = window.scrollY;
		const viewportHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;

		// Near the top of the page - activate first section
		if (scrollY < viewportHeight * 0.25) {
			setActive(sections[0].id);
			return;
		}

		// Near the bottom of the page - activate last section
		if (scrollY + viewportHeight >= documentHeight - 100) {
			setActive(sections[sections.length - 1].id);
			return;
		}

		// Find section whose top is closest to viewport top (with offset)
		const targetLine = viewportHeight * 0.2;
		let bestSection: string | null = null;
		let bestScore = -Infinity;

		sections.forEach((section) => {
			const rect = section.getBoundingClientRect();
			// Skip if section is not visible
			if (rect.bottom < 0 || rect.top > viewportHeight) return;

			// Prefer sections whose top is at or above the target line
			let score = 0;
			if (rect.top <= targetLine) {
				score = 1000 - Math.abs(rect.top);
			} else {
				score = -rect.top;
			}

			if (score > bestScore) {
				bestScore = score;
				bestSection = section.id;
			}
		});

		if (bestSection) {
			setActive(bestSection);
		}
	}

	// Throttled scroll handler
	let ticking = false;
	function onScroll(): void {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				updateActiveSection();
				ticking = false;
			});
			ticking = true;
		}
	}

	window.addEventListener("scroll", onScroll, { passive: true });

	// Lock active state briefly on click so the smooth scroll doesn't override it
	links.forEach((link) => {
		link.addEventListener("click", () => {
			const sectionId = getSectionId(link);
			if (sectionId) {
				setActive(sectionId, true);
			}
		});
	});

	// Set initial active state
	const hash = window.location.hash.slice(1);
	if (hash && document.getElementById(hash)) {
		setActive(hash, true);
	} else {
		updateActiveSection();
	}
}
