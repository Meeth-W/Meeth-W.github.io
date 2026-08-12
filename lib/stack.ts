export type StackGroup = {
  key: string;
  title: string;
  /** What this group is actually used for, in one line. */
  note: string;
  items: string[];
};

export const stackGroups: StackGroup[] = [
  {
    key: "languages",
    title: "Languages",
    note: "Python and TypeScript carry most of the weight; the rest show up where they have to.",
    items: ["Python", "TypeScript", "JavaScript", "Java", "Kotlin", "C", "C++"],
  },
  {
    key: "frontend",
    title: "Frontend",
    note: "React everywhere, Next.js when routing and rendering matter, Vite when they don't.",
    items: ["React", "Next.js", "Tailwind CSS", "Vite", "Framer Motion"],
  },
  {
    key: "backend",
    title: "Backend",
    note: "FastAPI for services, Django when the batteries are the point.",
    items: ["FastAPI", "Django", "REST APIs", "Uvicorn"],
  },
  {
    key: "data",
    title: "Databases",
    note: "Chosen by the shape of the question — documents, graphs, columns or a single file.",
    items: ["MongoDB", "Neo4j", "Cassandra", "HBase", "SQLite", "Prisma"],
  },
  {
    key: "ai",
    title: "AI / ML",
    note: "Local models by default; scikit-learn where a classifier beats a language model.",
    items: [
      "Ollama",
      "Llama",
      "Gemini",
      "LangChain",
      "scikit-learn",
      "PyTorch",
      "RAG",
      "Embeddings",
    ],
  },
  {
    key: "infra",
    title: "Infrastructure",
    note: "Enough to run what I build without renting someone else's opinion about it.",
    items: ["Linux", "Docker", "Git", "GitHub Actions", "Terraform"],
  },
];
