import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Section";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Security tooling, AI systems and full-stack applications built by Meeth W (Ghostyy) — including BASIS SDK, a zero-day malware behaviour predictor, and graph-based fraud detection.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        path="~/projects"
        title="Projects"
        lead="Things I built to answer a question, with the reasoning left in. Every entry has a case study covering the problem, the approach, and where it falls short."
        meta={[
          { label: "Count", value: String(projects.length) },
          { label: "Sorted", value: "By weight" },
        ]}
      />

      <Container className="py-14 sm:py-20">
        <ProjectExplorer projects={projects} />
      </Container>
    </>
  );
}
