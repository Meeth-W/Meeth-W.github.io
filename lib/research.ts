export type ResearchEntry = {
  id: string;
  slug: string;
  title: string;
  /** The one-line question. This is the hook. */
  question: string;
  /** Where the thinking currently is. */
  state: "open" | "in progress" | "grounded";
  body: string[];
  /** Concrete things that would answer it, or that already partly do. */
  threads: string[];
  tags: string[];
  /** Project slugs this line of work touches. */
  related?: string[];
};

export const researchEntries: ResearchEntry[] = [
  {
    id: "001",
    slug: "ai-memory-and-token-efficiency",
    title: "AI memory & token efficiency",
    question: "How much context does an AI system actually need?",
    state: "in progress",
    body: [
      "The default answer to a model forgetting something is to give it more context, and the default cost of that answer is paid on every subsequent request. Context length is not free memory — it is a recurring bill, and most of what gets paid for on any given turn is never referenced.",
      "What I want to know is where the useful information density actually sits. If a conversation of forty turns can be reconstructed well enough from a structured summary plus five retrieved fragments, then the full transcript was never memory — it was just storage that happened to be adjacent.",
    ],
    threads: [
      "Measuring what fraction of supplied context a response demonstrably depends on.",
      "Structured state versus raw transcript as the carrier of long-running memory.",
      "Where summarisation loses the specific detail that turns out to matter later.",
    ],
    tags: ["LLM", "context", "efficiency", "memory"],
  },
  {
    id: "002",
    slug: "behavioral-cybersecurity",
    title: "Behavioural cybersecurity",
    question: "Can malicious behaviour be detected before a signature exists?",
    state: "grounded",
    body: [
      "Signature detection is a lookup against the past. It works, it is cheap, and it is structurally incapable of recognising anything novel — which means the interesting question is what remains detectable when you delete the signature database entirely.",
      "The bet behind BASIS is that an application's ordinary traffic has a learnable shape, and that attacks are conspicuous as departures from it rather than as matches against anything. That bet is testable: generate controlled attacks against a live application, and measure whether models trained only on normal behaviour actually notice.",
    ],
    threads: [
      "Per-actor time windows as the unit of judgement, instead of individual requests.",
      "Calibrating anomaly scores so a threshold means a stated false-positive rate.",
      "Baseline poisoning — whether an attacker patient enough can teach the system to accept them.",
      "The blind spot: attacks that spread thin enough to never accumulate under one actor.",
    ],
    tags: ["anomaly detection", "telemetry", "ML", "security"],
    related: ["basis-sdk", "zero-day-malware-predictor"],
  },
  {
    id: "003",
    slug: "graph-intelligence",
    title: "Graph intelligence",
    question: "What does fraud look like once transactions become a graph?",
    state: "grounded",
    body: [
      "Fraud that survives contact with a rules engine is usually fraud that looks ordinary one row at a time. The laundering loop is made of unremarkable transfers; the identity ring is made of legitimate accounts. What is anomalous is the arrangement.",
      "Representing financial activity as a graph moves those arrangements from expensive joins into first-class queries. The open part is where the ceiling of hand-written traversal sits, and at what point structural detection has to give way to something learned.",
    ],
    threads: [
      "Cycle detection and shared-ownership structures as first-class Cypher queries.",
      "Which suspicious shapes are enumerable, and which have to be learned.",
      "Graphs as a retrieval substrate for AI systems, not only for analytics.",
    ],
    tags: ["Neo4j", "graphs", "fraud", "Cypher"],
    related: ["graph-fraud-detection"],
  },
  {
    id: "004",
    slug: "retrieval-and-structured-knowledge",
    title: "Retrieval & structured knowledge",
    question:
      "When should a system reach for vectors, a graph, or an ordinary database?",
    state: "open",
    body: [
      "Vector search became the default retrieval answer fast enough that the question stopped being asked. But embeddings answer 'what is similar to this', and a great many real queries are actually 'what is connected to this' or 'what is exactly this' — questions a graph or a plain index answers better, cheaper, and without a similarity threshold to tune.",
      "I am more interested in the routing problem than in any one store: deciding which substrate a question belongs to, and what it costs to be wrong.",
    ],
    threads: [
      "Failure modes of pure embedding retrieval on relational and exact-match queries.",
      "Hybrid retrieval where structure narrows the candidate set before similarity ranks it.",
      "How much retrieval quality is really chunking strategy wearing a model's clothes.",
    ],
    tags: ["RAG", "embeddings", "vector DB", "graphs"],
  },
  {
    id: "005",
    slug: "local-model-efficiency",
    title: "Local models & the cost of intelligence",
    question:
      "How much of a hosted model's capability survives running it yourself?",
    state: "in progress",
    body: [
      "Almost everything I have built with language models runs against a local one. Partly that is a privacy and cost decision, but mostly it is an information one: when the model runs on your own hardware, the trade-offs stop being abstract. Latency, memory pressure and context limits become things you feel rather than things you read about in a pricing page.",
      "Treating a hosted API as a magic box hides exactly the constraints that determine how a system should be designed. Running the model locally puts them back in front of you.",
    ],
    threads: [
      "Where a small local model is sufficient, and where the gap is genuinely capability rather than prompt design.",
      "Inference cost as an architectural constraint instead of a billing line.",
      "Quantisation and model size against task-specific quality.",
    ],
    tags: ["Ollama", "local LLM", "inference", "efficiency"],
    related: ["dashboard", "author", "azelia"],
  },
];

export function getResearchEntry(slug: string): ResearchEntry | undefined {
  return researchEntries.find((e) => e.slug === slug);
}
