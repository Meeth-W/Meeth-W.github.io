export type ProjectStatus =
  | "building"
  | "active"
  | "research"
  | "experimental"
  | "archived";

export type ProjectCategory =
  | "cybersecurity"
  | "ai"
  | "full-stack"
  | "data"
  | "experimental";

export type ProjectSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Project = {
  slug: string;
  /** Stable display id, e.g. PRJ-001. Purely a visual anchor. */
  id: string;
  name: string;
  /** One line. Shows on cards. */
  tagline: string;
  /** Two or three sentences. Shows on the detail page header. */
  summary: string;
  category: ProjectCategory;
  status: ProjectStatus;
  technologies: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  /** Year range of activity, from repository history. */
  period: string;
  /** Pipeline stages, rendered as a flow diagram. Optional. */
  flow?: string[];
  /** Long-form detail. Sections are only rendered when present. */
  sections?: ProjectSection[];
};

export const statusMeta: Record<
  ProjectStatus,
  { label: string; tone: "accent" | "signal" | "caution" | "muted" }
> = {
  building: { label: "Building", tone: "accent" },
  active: { label: "Active", tone: "signal" },
  research: { label: "Research", tone: "caution" },
  experimental: { label: "Experimental", tone: "caution" },
  archived: { label: "Archived", tone: "muted" },
};

export const categoryMeta: Record<ProjectCategory, string> = {
  cybersecurity: "Cybersecurity",
  ai: "AI",
  "full-stack": "Full Stack",
  data: "Data",
  experimental: "Experimental",
};

export const projects: Project[] = [
  {
    slug: "basis-sdk",
    id: "PRJ-001",
    name: "BASIS SDK",
    tagline:
      "Behavioural anomaly detection shipped as Django middleware, with the experiment suite used to prove it works.",
    summary:
      "BASIS (Behavioral Anomaly Security & Intelligence System) is a pip-installable Django app that learns what an application's ordinary traffic looks like and flags actors who stop matching it. It ships as middleware plus a staff-only dashboard, and it comes with the attack scenarios and benchmark harness used to measure whether the detection actually holds. Built as my Bachelor's engineering thesis.",
    category: "cybersecurity",
    status: "building",
    technologies: [
      "Python",
      "Django",
      "scikit-learn",
      "Isolation Forest",
      "One-Class SVM",
      "Telemetry",
      "SQLite",
    ],
    github: "https://github.com/Meeth-W/BASIS-SDK",
    featured: true,
    period: "2026 — present",
    flow: [
      "Attack simulation",
      "Live application",
      "Request telemetry",
      "Feature windows",
      "ML detection",
      "Risk score",
      "Dashboard",
    ],
    sections: [
      {
        heading: "Problem",
        paragraphs: [
          "Signature rules and WAF policies describe attacks somebody has already seen. They are good at the known cases and structurally blind to everything else — which is most of what an application will actually get hit by.",
          "But an application's own traffic has a shape. Its endpoints get visited in recognisable orders, at recognisable rates, with recognisable database and response costs. The question BASIS is built around is whether that shape can be learned from ordinary middleware-level telemetry, with no labelled attack data, and whether departures from it are specific enough to be worth alerting on.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "BASIS scores one actor over one time window, not one request. A single request carries almost no behavioural information; five minutes of an actor's requests carries volume, pacing, endpoint traversal, authentication outcomes and query cost — enough to be judged.",
          "Isolation Forest is the primary detector, with One-Class SVM, Local Outlier Factor and a statistical baseline kept alongside it as comparisons rather than decoration: the benchmark suite scores all four on the same synthetic scenarios. Scores are emitted as percentile ranks against the training distribution, which makes the alert threshold directly interpretable — a threshold of 0.95 is a stated 5% expected false-positive rate, not an arbitrary dial.",
        ],
      },
      {
        heading: "Architecture",
        bullets: [
          "collectors/ — pulls raw signals off each request: HTTP metadata, authentication behaviour, database interaction patterns.",
          "detection/ — turns telemetry into feature vectors, maintains per-application baselines, scores windows with explainable output, and adapts the baseline over time.",
          "detection/models/ — the four detector implementations behind a common interface.",
          "dashboard/ — a staff-only Django dashboard: live request stream, anomaly investigation views, baseline state, feature drift, endpoint-transition map, model benchmarks and health checks.",
          "experiments/ — traffic generators and attack scenarios that drive a real server over real HTTP, plus a deterministic benchmark harness.",
        ],
      },
      {
        heading: "Implementation notes",
        paragraphs: [
          "Baseline adaptation is trust-weighted. Windows that score above the trust threshold are withheld from future retraining, so an attacker who runs slowly cannot walk the baseline toward their own behaviour — the poisoning defence was hardened against a measured attack rather than assumed.",
          "The demo is a real Django storefront with BASIS wired in as an observer, and the experiment scripts drive it over genuine HTTP: normal shoppers, brute-force login, credential stuffing, scraper enumeration, checkout fraud bursts, injection probes and a DDoS burst. Nothing writes to the database directly, so what the dashboard shows is what a real visitor or attacker would have produced.",
          "Live scoring is a separate concern from measurement. The traffic scripts depend on wall-clock timing and on whatever else is in the database, which makes them the right tool for verifying the pipeline and the wrong one for judging detector quality. A separate benchmark harness synthesises labelled telemetry with a fixed seed, pushes it through the real feature pipeline and the real detector classes, and reports per-model, per-scenario numbers that reproduce exactly.",
        ],
      },
      {
        heading: "Observations",
        paragraphs: [
          "Measured through the benchmark suite, Isolation Forest's mean recall across seven attack scenarios climbs with baseline size — roughly 0.14 at 25 training windows, 0.48 at 50, 0.86 at 100, and 1.00 at 300. That curve is the reason the default minimum training size is set where it is.",
          "Distributed credential stuffing is recorded as NOT SCORED rather than as a failure. It opens a fresh session per attempt, so per-actor aggregation never accumulates enough of any one actor to judge. That is an architectural blind spot in the design, and the benchmark reports it as one instead of hiding it inside an average.",
        ],
      },
      {
        heading: "What I learned",
        paragraphs: [
          "The failure mode that worried me most turned out to be the quiet one. An under-trained baseline does not throw errors — it reports an anomaly rate of zero, which is indistinguishable from a healthy application. Most of the cold-start handling exists because of that: a system that cannot yet judge has to say so out loud.",
          "Feature engineering mattered more than model choice. Letting sparse endpoint-transition columns outnumber the dense behavioural features quietly stopped Isolation Forest responding to anomalies at all, because it splits on one randomly chosen feature at a time. Capping them fixed a problem no amount of retuning the model would have.",
        ],
      },
    ],
  },

  {
    slug: "zero-day-malware-predictor",
    id: "PRJ-002",
    name: "Zero-Day Malware Behavior Predictor",
    tagline:
      "Static behavioural analysis, MITRE ATT&CK mapping and an LLM reasoning layer — inferring intent without ever running the file.",
    summary:
      "A full-stack malware analysis platform that reads what a file is capable of instead of asking whether anyone has seen it before. It extracts behavioural artefacts statically, maps them onto MITRE ATT&CK techniques, and passes the resulting summary — never the raw file — to a language model that infers intent and refines the risk score.",
    category: "cybersecurity",
    status: "active",
    technologies: [
      "Python",
      "Django",
      "Next.js",
      "TypeScript",
      "MongoDB",
      "LangChain",
      "Gemini",
      "MITRE ATT&CK",
    ],
    github: "https://github.com/Meeth-W/Malware-Tracer",
    featured: true,
    period: "2026",
    flow: [
      "File upload",
      "Metadata & hashing",
      "Static behavioural scan",
      "MITRE ATT&CK mapping",
      "LLM intent inference",
      "Dual risk score",
      "Remediation plan",
    ],
    sections: [
      {
        heading: "Problem",
        paragraphs: [
          "Signature matching answers a question about the past: has this exact artefact been seen and catalogued? Zero-day malware fails that test by definition, and modern tradecraft makes it worse — fileless execution and living-off-the-land abuse mean the malicious logic may never touch disk as a recognisable binary at all.",
          "Dynamic sandboxes answer a better question but at a cost: they are heavy, and advanced samples detect and evade them. That leaves a gap for pre-execution reasoning about intent.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "The analysis is deliberately hybrid. A deterministic pass extracts observable capabilities — network downloaders, in-memory execution, credential access, registry persistence, obfuscation — and those get mapped onto standardised ATT&CK techniques so the finding is expressible in the language a defender already uses.",
          "Only then does the language model see anything, and what it sees is the behavioural summary rather than the file. It infers a primary intent with a confidence value, adjusts the static risk score with a written justification, and produces an analyst-facing overview. Keeping raw content away from the model is a hallucination control, not a performance optimisation.",
        ],
      },
      {
        heading: "Implementation notes",
        bullets: [
          "Dual risk scoring — the static score and the AI-adjusted score are reported separately, so the model's contribution to a verdict is visible instead of blended away.",
          "Structured output — the LLM is constrained to strict JSON schemas, with fallback defaults so the platform degrades to pure static analysis when the model is unavailable or over quota.",
          "Recommendations are tiered into immediate, cleanup and preventive actions rather than a single undifferentiated list.",
          "Django backend with MongoDB for analysis records; Next.js and React frontend for upload and the results dashboard.",
        ],
      },
      {
        heading: "Limitations",
        paragraphs: [
          "This is static analysis, so runtime-only behaviour is invisible to it, and heavily obfuscated code can slip past pattern extraction — the same obfuscation that defeats the regex pass also starves the model of anything to reason about. A low score is evidence, not a guarantee.",
        ],
      },
    ],
  },

  {
    slug: "graph-fraud-detection",
    id: "PRJ-003",
    name: "Graph-Based Fraud Detection",
    tagline:
      "Banking fraud modelled as structure rather than rows — laundering loops and shared-ownership rings surfaced in Neo4j.",
    summary:
      "A fraud detection prototype that stores accounts, customers and transfers in Neo4j and looks for suspicious shapes instead of suspicious amounts. Circular transfer loops, one identity quietly controlling many accounts, and rapid high-value movement inside a small cluster are all structural patterns — invisible when transactions are scored one at a time.",
    category: "data",
    status: "research",
    technologies: [
      "Python",
      "FastAPI",
      "Neo4j",
      "Cypher",
      "React",
      "Vite",
      "Graph Analytics",
    ],
    github: "https://github.com/Meeth-W/FraudDetectionBanking",
    featured: true,
    period: "2025",
    flow: [
      "Accounts & customers",
      "Transaction edges",
      "Graph traversal",
      "Structural patterns",
      "Investigation views",
    ],
    sections: [
      {
        heading: "Problem",
        paragraphs: [
          "A transfer of ten thousand between two accounts is unremarkable. Five of them arranged in a ring that returns the money to where it started is money laundering. The signal is not in any single row — it is in how the rows connect, which is exactly what a relational schema makes expensive to ask about.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "Accounts and customers become nodes, transfers and ownership become relationships, and the fraud questions become traversals. Cypher expresses 'find a cycle of transfers returning to its origin' or 'find one customer owning an unusual number of accounts' directly, in a way that does not degrade as the pattern gets deeper.",
          "The dataset is synthetic and seeded with deliberately planted structures — normal banking activity, laundering loops, identity-fraud ownership rings and high-frequency high-value clusters — so a detection query can be checked against a known answer.",
        ],
      },
      {
        heading: "Implementation notes",
        bullets: [
          "FastAPI service wrapping the Neo4j driver, exposing transaction, account and detection endpoints.",
          "React and Vite frontend with separate views for accounts, transactions, entity relations and circular-transfer detection.",
          "Graph seeding is scripted in Cypher, so the whole dataset — including the fraud patterns — is reproducible from scratch.",
        ],
      },
      {
        heading: "Observations",
        paragraphs: [
          "The detection here is structural rather than statistical: it finds shapes it was asked to look for, and makes no claim to catch patterns nobody wrote a query for. That limit is the interesting part — it is what pushed me toward learned anomaly detection in later work.",
        ],
      },
    ],
  },

  {
    slug: "dashboard",
    id: "PRJ-004",
    name: "Personal Dashboard",
    tagline:
      "A self-hosted workspace — notes, files, scraping and an assistant running on a local model rather than someone else's API.",
    summary:
      "A full-stack personal dashboard with a locally hosted AI assistant at the centre of it. The backend is FastAPI over MongoDB; the assistant runs through LangChain against Ollama, with per-user context and conversation history composed into every prompt so it carries state between sessions.",
    category: "full-stack",
    status: "archived",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "MongoDB",
      "Ollama",
      "LangChain",
    ],
    github: "https://github.com/Meeth-W/Dashboard",
    featured: true,
    period: "2025",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The point of this one was to own the whole stack rather than assemble it out of hosted services. Frontend and backend are separate applications, the database is local, and the model is local — the assistant keeps working with no network and no API key.",
        ],
      },
      {
        heading: "Implementation notes",
        bullets: [
          "FastAPI backend with a versioned API surface covering accounts, notes, uploads, scraping and assistant messaging.",
          "LangChain prompt template composing the user's stored name, a free-text context field and the rolling conversation history before each turn, so the assistant is conditioned rather than stateless.",
          "MongoDB collections for users, conversations and notes; uploads served back through the API.",
          "React, Vite and Tailwind frontend with dedicated pages for the assistant, notes, files, scraper and profile.",
        ],
      },
      {
        heading: "What I learned",
        paragraphs: [
          "Building it made the boundary between 'personal tool' and 'application' obvious, mostly by crossing it badly — the authentication here is a direct credential comparison, which is fine for something running on my own machine and would be indefensible anywhere else. Later projects start from that distinction instead of discovering it.",
        ],
      },
    ],
  },

  {
    slug: "author",
    id: "PRJ-005",
    name: "Author",
    tagline:
      "A long-form writing environment where the persona, the reader profile and the whole conversation are part of the prompt.",
    summary:
      "An AI writing platform built around persona-conditioned generation on a local model. A FastAPI backend composes a configurable author identity, a stored profile of the person writing, and the full conversation history into a single prompt each turn, then persists the exchange so a piece can be continued across sessions.",
    category: "ai",
    status: "archived",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "LangChain",
      "Ollama",
      "MongoDB",
    ],
    github: "https://github.com/Meeth-W/Author",
    featured: false,
    period: "2025",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Most writing tools treat each request as isolated: a prompt goes in, prose comes out, and nothing is carried forward. Author is built the other way round — the generating identity is configurable and stored, the user has a persistent profile, and every exchange is appended to a history that is replayed into the next prompt.",
          "The whole thing runs against a local model through Ollama, so the working state stays on the machine it was written on.",
        ],
      },
      {
        heading: "Implementation notes",
        bullets: [
          "LangChain prompt template assembling author name, author description, user profile and chat history into one structured prompt.",
          "MongoDB-backed users, bot configuration and conversation collections; history can be archived and reset without losing prior work.",
          "React, TypeScript and Vite frontend with a chat-shaped writing surface — sidebar, main area and composer.",
        ],
      },
    ],
  },

  {
    slug: "azelia",
    id: "PRJ-006",
    name: "Azelia",
    tagline:
      "A Discord bot with no API key — local language models answering in a channel, with an editable persona and resettable memory.",
    summary:
      "A Discord bot that puts a locally hosted language model into a conversation. Built on discord.py cogs with a YAML-configured model and persona, it listens to one designated channel, ignores commands and other bots, and keeps a conversation history that can be archived and reset without losing what came before.",
    category: "ai",
    status: "experimental",
    technologies: ["Python", "discord.py", "Ollama", "LLMs", "YAML"],
    github: "https://github.com/Meeth-W/Azelia",
    featured: false,
    period: "2025",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The interesting constraint here was doing it without a hosted model. Everything — the model, the history, the persona — lives on the machine running the bot, which changes the cost profile of a chat bot completely: there is no per-message billing, so the design questions become latency and context size instead.",
          "Structurally it is a small, tidy discord.py application: cogs for chat and owner commands, a YAML config for prefix, model and channel scoping, and a chat handler that owns prompt assembly and history persistence.",
        ],
      },
    ],
  },

  {
    slug: "ghost",
    id: "PRJ-007",
    name: "Ghost",
    tagline:
      "The Hypixel SkyBlock mod the username came from — fourteen modules of dungeon tooling, rendering and automation.",
    summary:
      "A client-side Minecraft QoL mod for Hypixel SkyBlock dungeons, written as ChatTriggers modules and later ported to a Kotlin Forge client. Custom world rendering, movement prediction, slot binding presets, party automation and timers — this is where I learned to read someone else's runtime and build inside it.",
    category: "experimental",
    status: "archived",
    technologies: [
      "JavaScript",
      "ChatTriggers",
      "Kotlin",
      "Forge",
      "Minecraft",
      "Gradle",
    ],
    github: "https://github.com/Meeth-W/Ghost",
    featured: false,
    period: "2024",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Ghost is fourteen independent modules behind one config: automatic equipment swapping, ESP rendering for specific mob types, leap routing and prediction, ghost-block placement presets, slot binding with locking and colour schemes, party-finder automation, positional messaging and ability timers.",
          "None of it is professionally important and all of it taught me something structural — how to instrument a running client, how to keep modules from tripping over each other, and how quickly a feature list becomes an architecture problem. A later port, GhostClient, rebuilt the same ideas as a Kotlin Forge mod compiled to a JAR.",
        ],
      },
      {
        heading: "Why it's here",
        paragraphs: [
          "Also the most literal explanation available for the username.",
        ],
      },
    ],
  },

  {
    slug: "aimer",
    id: "PRJ-008",
    name: "AIMER",
    tagline:
      "A browser aim trainer with a hand-written game loop — pointer lock, canvas rendering and per-session reaction analytics.",
    summary:
      "A browser-based aim training platform built around a custom gameplay engine rather than a UI framework's render cycle. Pointer Lock and Fullscreen APIs for input, canvas rendering driven by requestAnimationFrame, Valorant crosshair-code import, and a persisted analytics layer tracking accuracy and reaction time across sessions.",
    category: "full-stack",
    status: "active",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Zustand",
      "Prisma",
      "SQLite",
      "Canvas",
    ],
    github: "https://github.com/Meeth-W/Aim-Trainer",
    featured: false,
    period: "2026",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The engine is the project. Scenario logic, input handling, target spawning, scoring and rendering are separated into their own layers under a game loop that runs independently of React, because a frame budget and a component tree want very different things.",
          "Around it sits the ordinary application: three training scenarios, a crosshair system that imports and exports real Valorant crosshair codes, sensitivity configuration, and session history persisted through Prisma so improvement is measurable rather than felt.",
        ],
      },
    ],
  },

  {
    slug: "fitai",
    id: "PRJ-009",
    name: "FitAI",
    tagline:
      "Three trained scikit-learn models behind a health recommendation dashboard — regression for calories, classifiers for plans.",
    summary:
      "A full-stack health recommendation platform driven by trained models rather than lookup tables: a Random Forest regressor for caloric prediction and two Random Forest classifiers for diet and exercise recommendations, with BMR computed via Mifflin-St Jeor and progress tracked over time.",
    category: "ai",
    status: "active",
    technologies: [
      "Python",
      "FastAPI",
      "scikit-learn",
      "React",
      "Vite",
      "MongoDB",
      "SQLite",
      "JWT",
    ],
    github: "https://github.com/Meeth-W/FitAI",
    featured: false,
    period: "2026",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Built for an AI and data science elective, and forked from an existing recommendation system rather than started blank — the work was in the prediction layer and the application around it: JWT authentication with bcrypt hashing, historical persistence for time-series views, and dashboards for weight, BMI, caloric breakdown and fitness profile.",
        ],
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Categories that actually have projects, in a stable order. */
export const activeCategories: ProjectCategory[] = (
  ["cybersecurity", "ai", "full-stack", "data", "experimental"] as const
).filter((c) => projects.some((p) => p.category === c));
