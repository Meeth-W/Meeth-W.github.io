export type LabGroup = {
  key: string;
  title: string;
  blurb: string;
  items: LabItem[];
};

export type LabItem = {
  name: string;
  note: string;
  tech: string[];
  github?: string;
  year: string;
};

export const labGroups: LabGroup[] = [
  {
    key: "experiments",
    title: "Experiments",
    blurb: "Things built to find out whether they would work.",
    items: [
      {
        name: "Neural Network Number Recognition",
        note: "A CNN trained on MNIST behind a drawing canvas — convolution, ReLU and max pooling implemented as an explanation rather than an import. Draw a digit, watch the softmax argue with itself.",
        tech: ["Python", "PyTorch", "Flask", "CNN"],
        github: "https://github.com/Meeth-W/Neural-Networks-Demo",
        year: "2026",
      },
      {
        name: "Python Image Processing",
        note: "Image manipulation written against raw pixel data for a data structures course, back when the interesting part was the array and not the library wrapping it.",
        tech: ["Python", "Algorithms"],
        github: "https://github.com/Meeth-W/PythonImageProcessing",
        year: "2024",
      },
      {
        name: "Python Data Structures",
        note: "A reference repository of data structure implementations, kept because writing one is the only reliable way to stop misremembering how it works.",
        tech: ["Python", "C"],
        github: "https://github.com/Meeth-W/PythonDataStructures",
        year: "2024",
      },
    ],
  },
  {
    key: "tools",
    title: "Tools",
    blurb: "Built because the alternative was doing it by hand.",
    items: [
      {
        name: "API Tester",
        note: "A frontend for hitting any backend: URL, JSON body with syntax highlighting, send, read the response. Written during a stretch of building APIs where the debugging loop was the slow part.",
        tech: ["React", "Tailwind CSS", "Axios"],
        github: "https://github.com/Meeth-W/API-Tester",
        year: "2025",
      },
      {
        name: "Resume Assist",
        note: "Builds, grades and critiques resumes. FastAPI and MongoDB underneath, Next.js on top, Firebase handling auth.",
        tech: ["Python", "FastAPI", "Next.js", "MongoDB", "Firebase"],
        github: "https://github.com/Meeth-W/Resume-Assist",
        year: "2025",
      },
      {
        name: "Learning Tracker",
        note: "Course and goal tracking with no backend at all — everything lives in browser storage. A deliberate exercise in how much application you can build with nothing behind it.",
        tech: ["React", "Tailwind CSS", "Framer Motion"],
        github: "https://github.com/Meeth-W/Learning-Tracker",
        year: "2025",
      },
      {
        name: "Status Tracker",
        note: "A Discord bot that watches Minecraft account uptime on Hypixel and reports it. Small, dumb, ran for months.",
        tech: ["Python", "discord.py"],
        github: "https://github.com/Meeth-W/StatusTracker",
        year: "2024",
      },
    ],
  },
  {
    key: "ai",
    title: "AI tests",
    blurb: "Applications built to probe what models are actually good at.",
    items: [
      {
        name: "AI Code Builder",
        note: "A Next.js frontend over a FastAPI service, testing how far model-generated code holds together when it has to compose into a project rather than a snippet.",
        tech: ["Next.js", "TypeScript", "FastAPI", "Python"],
        github: "https://github.com/Meeth-W/AI-Code-Builder",
        year: "2026",
      },
      {
        name: "AI Agriculture Portal",
        note: "A domain-specific advisory portal — the interesting constraint being how quickly a general model becomes unhelpful once the questions get specific.",
        tech: ["Next.js", "TypeScript", "FastAPI", "Python"],
        github: "https://github.com/Meeth-W/AI-Agriculture-Portal",
        year: "2026",
      },
      {
        name: "AI Assistant (NoSQL)",
        note: "An assistant built as a NoSQL mini-project, where the database design was the assignment and the assistant was the excuse.",
        tech: ["JavaScript", "NoSQL"],
        github: "https://github.com/Meeth-W/AI-Assistant--NoSQL-Mini-Project-",
        year: "2025",
      },
    ],
  },
  {
    key: "mods",
    title: "Game mods",
    blurb:
      "Client-side Minecraft tooling. Where the username came from, and where I learned to build inside someone else's runtime.",
    items: [
      {
        name: "GhostClient",
        note: "The Kotlin port — the same ideas as Ghost rebuilt as a Forge 1.8.9 mod compiled to a JAR, with mixins and access transformers instead of a scripting runtime.",
        tech: ["Kotlin", "Java", "Forge", "Gradle"],
        github: "https://github.com/Meeth-W/GhostClient",
        year: "2024",
      },
      {
        name: "GhostAddons",
        note: "The first version, and the one that taught me how fast a feature list turns into an architecture problem.",
        tech: ["JavaScript", "ChatTriggers"],
        github: "https://github.com/Meeth-W/GhostAddons",
        year: "2024",
      },
      {
        name: "DungeonExtras",
        note: "Dungeon quality-of-life: stat lookups, personal-best checks, a config GUI. The one that started it.",
        tech: ["JavaScript", "ChatTriggers"],
        github: "https://github.com/Meeth-W/DungeonExtras",
        year: "2024",
      },
      {
        name: "autofish",
        note: "It fishes for you. That is the entire README, and it is accurate.",
        tech: ["JavaScript"],
        github: "https://github.com/Meeth-W/autofish",
        year: "2024",
      },
    ],
  },
  {
    key: "coursework",
    title: "Coursework that escaped",
    blurb: "Academic work that turned out to be worth keeping.",
    items: [
      {
        name: "EduFolio",
        note: "A centralised student activity record for higher-education institutions — uploads, faculty validation, resume generation and compliance reporting. Built for Smart India Hackathon problem statement SIH25093.",
        tech: ["Next.js", "TypeScript", "React"],
        github: "https://github.com/Meeth-W/Student-Management-System",
        year: "2025",
      },
      {
        name: "Operating Systems Algorithms",
        note: "Scheduling, paging and synchronisation algorithms implemented in Python. Written out longhand because the exam version never explains why anything deadlocks.",
        tech: ["Python"],
        github: "https://github.com/Meeth-W/B.E-IT-Sem-V---Operating-Systems",
        year: "2025",
      },
      {
        name: "Pharma Data Analytics",
        note: "Drug sales trend analysis with pandas and seaborn, including time-series decomposition for seasonality. An internship final project.",
        tech: ["Python", "pandas", "Matplotlib", "Seaborn"],
        github: "https://github.com/Meeth-W/Pharma---Data-Analytics",
        year: "2025",
      },
    ],
  },
];
