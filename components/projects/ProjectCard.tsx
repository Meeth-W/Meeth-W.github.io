import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { categoryMeta, type Project } from "@/lib/projects";
import { StatusBadge, Tag } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

/**
 * The whole card is a link to the case study; the source link is a separate
 * anchor lifted above it so it stays independently clickable and focusable.
 */
export function ProjectCard({
  project,
  size = "default",
  className,
}: {
  project: Project;
  size?: "default" | "large";
  className?: string;
}) {
  const large = size === "large";

  return (
    <article
      className={cn(
        "group ticked relative flex flex-col border border-line bg-surface/60 transition-colors duration-300",
        "hover:border-accent/35 hover:bg-surface",
        className,
      )}
    >
      {/* Accent hairline that draws in from the left on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent/60 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />

      <div className={cn("flex flex-1 flex-col p-5 sm:p-7", large && "sm:p-8")}>
        <div className="flex items-center justify-between gap-4">
          <span className="label transition-colors group-hover:text-accent">
            {project.id}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3
          className={cn(
            "mt-5 font-display font-medium tracking-tight",
            large ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
          )}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.name}
          </Link>
        </h3>

        <p
          className={cn(
            "mt-3 leading-relaxed text-fg-dim",
            large ? "text-base" : "text-sm",
          )}
        >
          {project.tagline}
        </p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, large ? 7 : 5).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {project.technologies.length > (large ? 7 : 5) && (
            <li>
              <Tag className="text-fg-muted">
                +{project.technologies.length - (large ? 7 : 5)}
              </Tag>
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <span className="label">{categoryMeta[project.category]}</span>

          <div className="flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="relative z-10 text-fg-muted transition-colors hover:text-accent"
                aria-label={`${project.name} source on GitHub`}
              >
                <GithubIcon className="size-4" />
              </a>
            )}
            <span
              className="flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.14em] text-fg-muted uppercase transition-colors group-hover:text-accent"
              aria-hidden="true"
            >
              Read
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
