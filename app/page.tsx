import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Hero } from "@/components/hero/Hero";
import { CurrentFocus } from "@/components/sections/CurrentFocus";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { ResearchPreview } from "@/components/sections/ResearchPreview";
import { StackSection } from "@/components/sections/StackSection";
import { GithubSection } from "@/components/sections/GithubSection";
import { LabTeaser } from "@/components/sections/LabTeaser";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Structured data — helps the name/alias pairing resolve in search results. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.alias,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Software engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: site.education.institution,
  },
  knowsAbout: [
    "Artificial intelligence",
    "Cybersecurity",
    "Anomaly detection",
    "Full-stack engineering",
    "Graph databases",
  ],
  sameAs: [site.github, site.instagram],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, build-time constant — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Hero />
      <CurrentFocus />
      <FeaturedWork />
      <ResearchPreview />
      <StackSection index="05" />
      <GithubSection />
      <LabTeaser />
      <Contact index="08" />
    </>
  );
}
