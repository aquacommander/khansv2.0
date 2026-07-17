export interface ProcessStep {
  index: string;
  title: string;
  activity: string;
  artifact: string;
}

// The Khanstruct BuildLoop — a repeatable operating process.
export const buildLoop: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    activity: "Interviews, audits, and a hard look at what's actually blocking you.",
    artifact: "Findings & scope brief",
  },
  {
    index: "02",
    title: "Map",
    activity: "We model the system, the data, and the decisions before writing code.",
    artifact: "Architecture diagram",
  },
  {
    index: "03",
    title: "Design",
    activity: "Information and interface design that engineers can build as written.",
    artifact: "Design & decision records",
  },
  {
    index: "04",
    title: "Build",
    activity: "Incremental delivery with weekly demonstrations — no surprise reveals.",
    artifact: "Working software, weekly",
  },
  {
    index: "05",
    title: "Validate",
    activity: "Testing, evaluation suites, and performance budgets against real targets.",
    artifact: "Test & eval reports",
  },
  {
    index: "06",
    title: "Launch",
    activity: "Observability, runbooks, and a controlled path to production.",
    artifact: "Runbooks & monitoring",
  },
  {
    index: "07",
    title: "Improve",
    activity: "We measure what shipped and iterate — the loop repeats.",
    artifact: "Metrics & next iteration",
  },
];

export const commitments = [
  {
    index: "01",
    title: "Research-grade rigor",
    body: "Every model change is gated by evaluation. We measure lift instead of assuming it.",
  },
  {
    index: "02",
    title: "Engineering first",
    body: "AI is a medium, not a magic trick. What we ship has tests, monitoring, and runbooks.",
  },
  {
    index: "03",
    title: "Outcome obsessed",
    body: "We're accountable to your commercial result, not a demo that impresses in a meeting.",
  },
];
