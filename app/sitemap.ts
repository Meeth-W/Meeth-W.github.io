import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = ["", "/projects", "/research", "/lab", "/about"].map((path) => ({
    url: `${site.url}${path}/`.replace(/([^:])\/\/+/g, "$1/"),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectPages = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.7 : 0.5,
  }));

  return [...pages, ...projectPages];
}
