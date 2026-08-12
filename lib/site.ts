export const site = {
  handle: "ghostyy",
  name: "Meeth Waghela",
  alias: "Ghostyy",
  title: "Ghostyy — Meeth Waghela",
  tagline: "AI · Security · Systems",
  description:
    "Meeth Waghela / Ghostyy — IT engineer building AI systems, cybersecurity tools, full-stack applications and experimental software.",
  url: "https://meeth-w.github.io",
  location: "Mumbai, India",
  education: {
    degree: "B.E. Information Technology",
    institution: "Thakur College of Engineering & Technology",
    year: "Final year",
  },
  email: "meeth2111@gmail.com",
  github: "https://github.com/Meeth-W",
  githubUser: "Meeth-W",
  instagram: "https://www.instagram.com/meeth._05/",
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Terminal-style path shown alongside the label. */
  path: string;
  index: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/", path: "~", index: "01" },
  { label: "Projects", href: "/projects", path: "~/projects", index: "02" },
  { label: "Research", href: "/research", path: "~/research", index: "03" },
  { label: "Lab", href: "/lab", path: "~/lab", index: "04" },
  { label: "About", href: "/about", path: "~/about", index: "05" },
];

/** The four lines of system info under the hero. Kept honest — no fake uptime. */
export const systemInfo: { key: string; value: string }[] = [
  { key: "status", value: "online" },
  { key: "mode", value: "building" },
  { key: "focus", value: "ai / security / systems" },
  { key: "location", value: site.location },
];
