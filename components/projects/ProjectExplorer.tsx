"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  activeCategories,
  categoryMeta,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "all";

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const reduced = useReducedMotion();

  const filters: Filter[] = useMemo(
    () => ["all", ...activeCategories],
    [],
  );

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["all", projects.length]]);
    for (const p of projects) {
      map.set(p.category, (map.get(p.category) ?? 0) + 1);
    }
    return map;
  }, [projects]);

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [projects, filter],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filters.map((key) => {
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(key)}
              className={cn(
                "flex shrink-0 items-center gap-2 border px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors",
                active
                  ? "border-accent/45 bg-accent/12 text-accent-bright"
                  : "border-line text-fg-muted hover:border-fg-muted/40 hover:text-fg-dim",
              )}
            >
              {key === "all" ? "All" : categoryMeta[key]}
              <span className={active ? "text-accent/70" : "text-fg-muted/60"}>
                {counts.get(key) ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} project{visible.length === 1 ? "" : "s"} shown.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex"
            >
              <ProjectCard project={project} className="w-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
