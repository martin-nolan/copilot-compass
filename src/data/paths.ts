export type PathId =
  | "fastest-low-code"
  | "structured-low-code"
  | "product-led-react"
  | "high-code-custom";

export type PathDef = {
  id: PathId;
  number: string;
  eyebrow: string;
  name: string;
  shortName: string;
  tagline: string;
  complexity: "Low" | "Medium" | "High" | "Highest";
  whenRight: string;
  whyThis: string;
  keyTradeoff: string;
  bestFitMode: "PoC" | "Production" | "Both";
  bestFirstMove: string;
  learnNext: string[]; // module ids
  avoidIf: string;
  relatedComparisons: string[]; // comparison ids
  relatedUseCaseIds: string[];
  learningReferenceIds: string[];
  focus: string[];
};

export const paths: PathDef[] = [
  {
    id: "fastest-low-code",
    number: "01",
    eyebrow: "Path 01",
    name: "Fastest low-code start",
    shortName: "Fastest low-code",
    tagline:
      "The lightest possible route. Build a declarative agent inside Microsoft 365 Copilot using Agent Builder.",
    complexity: "Low",
    focus: [
      "Agent Builder",
      "Declarative basics",
      "Instructions / knowledge / actions",
      "Small internal helpers",
      "Quick PoCs",
    ],
    whenRight:
      "The work already lives in Microsoft 365, the audience is small, and the value is in shipping something usable this week.",
    whyThis:
      "Almost no infra to own. You configure rather than code, and Microsoft does the orchestration and model work for you.",
    keyTradeoff:
      "Bounded by the declarative surface. As soon as you need richer orchestration, channels, tools, or analytics, you outgrow it.",
    bestFitMode: "PoC",
    bestFirstMove:
      "Pick a template in Agent Builder, point it at a small, curated doc set, write tight instructions, ship to a handful of users.",
    learnNext: ["agent-builder", "knowledge-instructions-actions", "declarative"],
    avoidIf:
      "You already need workflows, multiple channels, analytics, or governance — that's structured low-code territory.",
    relatedComparisons: ["builder-vs-studio", "declarative-vs-custom"],
    relatedUseCaseIds: ["internal-knowledge", "support-triage"],
    learningReferenceIds: [
      "agent-builder",
      "agent-templates",
      "declarative-agents",
      "agents-overview",
    ],
  },
  {
    id: "structured-low-code",
    number: "02",
    eyebrow: "Path 02",
    name: "Structured low-code",
    shortName: "Structured low-code",
    tagline:
      "Operational depth without leaving low-code. Copilot Studio for orchestration, tools, channels, testing, analytics.",
    complexity: "Medium",
    focus: [
      "Copilot Studio",
      "Topics & tools",
      "Generative orchestration",
      "Testing & analytics",
      "Publishing & channels",
      "Governance",
    ],
    whenRight:
      "The idea is becoming a real workflow, needs more than chat, and people are starting to depend on it.",
    whyThis:
      "Stronger lifecycle story: real testing, evaluation, channels, analytics, governance — without owning a backend.",
    keyTradeoff:
      "More authoring overhead than Agent Builder. You're still inside Microsoft's platform — model and orchestration choices stay constrained.",
    bestFitMode: "Production",
    bestFirstMove:
      "Start with one tool, one knowledge source, and generative orchestration. Resist the urge to author every branch as a topic.",
    learnNext: [
      "studio",
      "generative-orchestration",
      "topics-tools-children",
      "testing-analytics",
    ],
    avoidIf:
      "You only need a tiny internal helper (Agent Builder is faster), or you need full control over the model and runtime (go custom engine).",
    relatedComparisons: ["builder-vs-studio", "declarative-vs-custom"],
    relatedUseCaseIds: ["workflow-assistant", "support-triage", "training-assistant"],
    learningReferenceIds: [
      "studio-guidance",
      "generative-orchestration",
      "studio-tools",
      "studio-publishing",
      "studio-testing",
      "studio-analytics",
    ],
  },
  {
    id: "product-led-react",
    number: "03",
    eyebrow: "Path 03",
    name: "Product-led / React",
    shortName: "Product-led React",
    tagline:
      "The assistant is one feature inside a broader product you design and own. The app shell carries the experience.",
    complexity: "High",
    focus: [
      "React shell + embedded agent",
      "Dashboards and workflows",
      "Navigation and state",
      "Role-aware UX",
      "Saved outputs",
    ],
    whenRight:
      "UX is the product. There are dashboards, forms, role-aware views, saved state, or a journey that doesn't fit inside a host Copilot UI.",
    whyThis:
      "You get full control over layout, journey, role state, and how the assistant participates in the broader product.",
    keyTradeoff:
      "You also own everything you'd rather not — auth, infra, deployment, embedding patterns, contextual handoff.",
    bestFitMode: "Both",
    bestFirstMove:
      "Embed a Studio agent into one screen of an existing React app. Don't rebuild the product around it on day one.",
    learnNext: ["react-shell", "studio", "topics-tools-children"],
    avoidIf:
      "The work already happens inside Microsoft 365 day-to-day and an internal helper would be enough.",
    relatedComparisons: ["native-vs-react", "builder-vs-studio"],
    relatedUseCaseIds: ["dashboard-companion", "training-assistant", "research-copilot"],
    learningReferenceIds: [
      "studio-custom-app",
      "studio-publishing",
      "agents-sdk",
      "generative-orchestration",
    ],
  },
  {
    id: "high-code-custom",
    number: "04",
    eyebrow: "Path 04",
    name: "High-code / custom engine",
    shortName: "High-code custom",
    tagline:
      "Bring your own orchestration, models, and integration architecture. The Microsoft 365 Agents SDK route.",
    complexity: "Highest",
    focus: [
      "Custom engine agents",
      "Microsoft 365 Agents SDK",
      "Orchestration control",
      "Model choice",
      "Deeper integrations",
      "Full-stack ownership",
    ],
    whenRight:
      "A specific limitation in declarative or Studio is forcing you off it: model choice, orchestration logic, integrations, or multi-channel reach.",
    whyThis:
      "Maximum control. You can shape every layer of the stack to match the product and integration story.",
    keyTradeoff:
      "Maximum cost too. Real backend, observability, evaluation harness, deployment hygiene — and you own all of it.",
    bestFitMode: "Production",
    bestFirstMove:
      "Pick the smallest viable orchestration on one model and one channel. Prove the architectural choice before fanning out.",
    learnNext: ["custom-engine", "react-shell", "testing-analytics"],
    avoidIf:
      "There's no concrete limitation pushing you here — start lighter and let the platform earn the move up.",
    relatedComparisons: ["declarative-vs-custom", "native-vs-react"],
    relatedUseCaseIds: ["dashboard-companion", "research-copilot"],
    learningReferenceIds: [
      "custom-engine-agents",
      "agents-sdk",
      "studio-custom-app",
    ],
  },
];

export function getPath(id: PathId | null | undefined): PathDef | undefined {
  if (!id) return undefined;
  return paths.find((p) => p.id === id);
}
