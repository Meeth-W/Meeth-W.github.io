"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  fetchGithubStats,
  githubSnapshot,
  type GithubStats,
} from "@/lib/github";
import { Panel } from "@/components/ui/Panel";

export function GithubPanel() {
  const [stats, setStats] = useState<GithubStats>(githubSnapshot);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetchGithubStats(controller.signal)
      .then((next) => {
        setStats(next);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const total = stats.languages.reduce((sum, [, n]) => sum + n, 0) || 1;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      {/* ---- Language distribution ---- */}
      <Panel ticks className="p-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="label">Languages</span>
          <span className="font-mono text-[0.6875rem] text-fg-muted">
            {stats.publicRepos} repos
          </span>
        </div>

        {/* A single stacked bar, then a legend. No pie chart, no percentages
            beyond what the counts already say. */}
        <div
          className="mt-5 flex h-1.5 w-full overflow-hidden bg-white/4"
          aria-hidden="true"
        >
          {stats.languages.map(([name, count], i) => (
            <span
              key={name}
              className="h-full"
              style={{
                width: `${(count / total) * 100}%`,
                backgroundColor: `color-mix(in oklab, var(--color-accent) ${92 - i * 14}%, transparent)`,
              }}
            />
          ))}
        </div>

        <ul className="mt-5 space-y-2.5">
          {stats.languages.map(([name, count], i) => (
            <li
              key={name}
              className="flex items-center gap-3 font-mono text-xs"
            >
              <span
                className="size-2 shrink-0"
                style={{
                  backgroundColor: `color-mix(in oklab, var(--color-accent) ${92 - i * 14}%, transparent)`,
                }}
                aria-hidden="true"
              />
              <span className="flex-1 text-fg-dim">{name}</span>
              <span className="tabular-nums text-fg-muted">{count}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 border-t border-line pt-4 font-mono text-[0.625rem] tracking-wide text-fg-muted uppercase">
          {loading
            ? "fetching…"
            : stats.live
              ? `live · github api · ${stats.capturedAt}`
              : `snapshot · ${stats.capturedAt}`}
        </p>
      </Panel>

      {/* ---- Recently pushed ---- */}
      <Panel className="divide-y divide-line">
        <div className="px-6 py-4">
          <span className="label">Recently pushed</span>
        </div>
        {stats.recent.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-start gap-4 px-6 py-4 transition-colors hover:bg-white/2"
          >
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 font-mono text-sm text-fg transition-colors group-hover:text-accent">
                {repo.name}
                <ArrowUpRight
                  className="size-3.5 shrink-0 text-fg-muted transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-accent"
                  aria-hidden="true"
                />
              </p>
              {repo.description && (
                <p className="mt-1.5 line-clamp-2 text-sm text-fg-muted">
                  {repo.description}
                </p>
              )}
            </div>
            <div className="shrink-0 text-right">
              <p className="font-mono text-[0.625rem] tracking-wide text-fg-muted tabular-nums">
                {repo.pushedAt}
              </p>
              {repo.language && (
                <p className="mt-1 font-mono text-[0.625rem] text-accent/70">
                  {repo.language}
                </p>
              )}
            </div>
          </a>
        ))}
      </Panel>
    </div>
  );
}
