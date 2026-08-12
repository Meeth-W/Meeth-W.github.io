import { site } from "./site";

/**
 * GitHub data for the "live" panel.
 *
 * This site is a static export on GitHub Pages, so there is no server to
 * proxy through and no place to keep a token — nor is one needed: the public
 * REST endpoints used here are unauthenticated. The fetch happens in the
 * browser, and if it fails (rate limit, offline, blocked) the snapshot below
 * is what renders. The snapshot is labelled with its own date so a stale
 * number is never presented as a live one.
 */

export type RepoSummary = {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  pushedAt: string;
};

export type GithubStats = {
  publicRepos: number;
  /** [language, repo count], most first. */
  languages: [string, number][];
  recent: RepoSummary[];
  /** ISO date the data is accurate to. */
  capturedAt: string;
  live: boolean;
};

/** Captured 2026-08-12 from the public API. Fallback only. */
export const githubSnapshot: GithubStats = {
  publicRepos: 39,
  languages: [
    ["JavaScript", 15],
    ["Python", 13],
    ["TypeScript", 5],
    ["HTML", 3],
    ["Java", 1],
    ["C", 1],
  ],
  recent: [
    {
      name: "BASIS-SDK",
      description:
        "ML-based behavioral anomaly detection as Django security middleware, with a built-in dashboard.",
      language: "Python",
      url: "https://github.com/Meeth-W/BASIS-SDK",
      pushedAt: "2026-08-12",
    },
    {
      name: "Aim-Trainer",
      description:
        "Browser-based aim training platform with a custom gameplay engine.",
      language: "TypeScript",
      url: "https://github.com/Meeth-W/Aim-Trainer",
      pushedAt: "2026-06-12",
    },
    {
      name: "FitAI",
      description:
        "ML-powered fitness and health recommendation platform.",
      language: "JavaScript",
      url: "https://github.com/Meeth-W/FitAI",
      pushedAt: "2026-04-17",
    },
    {
      name: "Neural-Networks-Demo",
      description: "Handwritten digit recognition with a CNN trained on MNIST.",
      language: "Python",
      url: "https://github.com/Meeth-W/Neural-Networks-Demo",
      pushedAt: "2026-03-29",
    },
    {
      name: "Malware-Tracer",
      description: "AI-powered zero-day malware behavior predictor.",
      language: "TypeScript",
      url: "https://github.com/Meeth-W/Malware-Tracer",
      pushedAt: "2026-02-10",
    },
  ],
  capturedAt: "2026-08-12",
  live: false,
};

type ApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  pushed_at: string;
  fork: boolean;
  private: boolean;
};

/**
 * Fetches a fresh view of the public profile. Resolves to the snapshot on any
 * failure — this panel is decoration, and it must never be able to break the
 * page it sits on.
 */
export async function fetchGithubStats(
  signal?: AbortSignal,
): Promise<GithubStats> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${site.githubUser}/repos?per_page=100&sort=pushed`,
      { signal, headers: { Accept: "application/vnd.github+json" } },
    );
    if (!res.ok) return githubSnapshot;

    const raw: unknown = await res.json();
    if (!Array.isArray(raw)) return githubSnapshot;

    const repos = (raw as ApiRepo[]).filter((r) => !r.fork && !r.private);
    if (repos.length === 0) return githubSnapshot;

    const counts = new Map<string, number>();
    for (const r of repos) {
      if (!r.language) continue;
      counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    }

    return {
      publicRepos: repos.length,
      languages: [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6),
      recent: repos.slice(0, 5).map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        url: r.html_url,
        pushedAt: r.pushed_at.slice(0, 10),
      })),
      capturedAt: new Date().toISOString().slice(0, 10),
      live: true,
    };
  } catch {
    return githubSnapshot;
  }
}
