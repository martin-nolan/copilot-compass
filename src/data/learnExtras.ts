import type { PathId } from "./paths";

export type LearnExtras = {
  bestForPaths: PathId[];
  complexity: "Low" | "Medium" | "High";
  whatItIs: string;
  whyItMatters: string;
  commonMistakes: string[];
  learnNext: string[]; // module ids
  // contextual progression cues
  ifLowCodeNext?: string;
  ifReactNext?: string;
  ifProductionNext?: string;
};

export const learnExtras: Record<string, LearnExtras> = {
  "what-is-an-agent": {
    bestForPaths: [
      "fastest-low-code",
      "structured-low-code",
      "product-led-react",
      "high-code-custom",
    ],
    complexity: "Low",
    whatItIs:
      "A specialised assistant that retrieves, summarises, guides, or acts. Microsoft documents two main approaches for M365 Copilot agents: declarative and custom engine.",
    whyItMatters:
      "Most failed builds confuse 'agent' with 'chatbot'. Naming the four shapes — retrieve, summarise, guide, act — keeps scope honest.",
    commonMistakes: [
      "Trying to do all four shapes in one PoC",
      "Skipping the declarative vs custom-engine distinction and choosing tools first",
    ],
    learnNext: ["declarative", "custom-engine"],
    ifLowCodeNext: "declarative",
    ifReactNext: "react-shell",
    ifProductionNext: "poc-vs-production",
  },
  declarative: {
    bestForPaths: ["fastest-low-code", "structured-low-code"],
    complexity: "Low",
    whatItIs:
      "Instructions, knowledge, and actions that run on Microsoft 365 Copilot's orchestrator and trusted models.",
    whyItMatters:
      "It's the lightest path that produces a real agent. Getting it right teaches the building blocks every heavier path also uses.",
    commonMistakes: [
      "Vague or overlong instructions",
      "Pointing at a giant knowledge source instead of a curated one",
      "Adding actions before the basic loop feels right",
    ],
    learnNext: ["knowledge-instructions-actions", "agent-builder", "studio"],
    ifLowCodeNext: "knowledge-instructions-actions",
    ifReactNext: "react-shell",
    ifProductionNext: "testing-analytics",
  },
  "custom-engine": {
    bestForPaths: ["high-code-custom", "product-led-react"],
    complexity: "High",
    whatItIs:
      "An advanced path where you bring your own orchestration, models, and integration architecture using the Microsoft 365 Agents SDK.",
    whyItMatters:
      "It unlocks ceiling — model choice, orchestration logic, multi-channel reach — at the cost of owning much more of the stack.",
    commonMistakes: [
      "Adopting it before a real declarative or Studio limitation appears",
      "Underestimating the operational tax (eval, observability, deploys)",
    ],
    learnNext: ["react-shell", "testing-analytics"],
    ifLowCodeNext: "studio",
    ifReactNext: "react-shell",
    ifProductionNext: "testing-analytics",
  },
  "agent-builder": {
    bestForPaths: ["fastest-low-code"],
    complexity: "Low",
    whatItIs:
      "A no-code authoring surface inside Microsoft 365 Copilot for building declarative agents fast — templates, instructions, knowledge, light actions.",
    whyItMatters:
      "It's the shortest path from idea to a working agent. Best place to learn the declarative shape without authoring overhead.",
    commonMistakes: [
      "Treating it as a production platform — operational depth lives in Studio",
      "Skipping templates and trying to design from scratch",
    ],
    learnNext: ["knowledge-instructions-actions", "studio"],
    ifLowCodeNext: "knowledge-instructions-actions",
    ifReactNext: "studio",
    ifProductionNext: "studio",
  },
  studio: {
    bestForPaths: ["structured-low-code", "product-led-react"],
    complexity: "Medium",
    whatItIs:
      "The broader low-code platform: planning, orchestration, tools, knowledge, channels, testing, analytics, governance.",
    whyItMatters:
      "It's the natural graduation from Agent Builder when something becomes structured, multi-step, or operational.",
    commonMistakes: [
      "Authoring every branch as a topic instead of trusting generative orchestration",
      "Skipping the test pane and analytics until rollout",
      "Ignoring channel-specific UX",
    ],
    learnNext: ["generative-orchestration", "topics-tools-children", "testing-analytics"],
    ifLowCodeNext: "generative-orchestration",
    ifReactNext: "react-shell",
    ifProductionNext: "testing-analytics",
  },
  "knowledge-instructions-actions": {
    bestForPaths: ["fastest-low-code", "structured-low-code"],
    complexity: "Low",
    whatItIs:
      "The three core declarative building blocks. Instructions shape behaviour. Knowledge shapes what the agent grounds on. Actions shape what it can do.",
    whyItMatters:
      "Most quality issues trace back to weak versions of these three. They're the contract between intent and behaviour.",
    commonMistakes: [
      "Vague instructions ('be helpful')",
      "Knowledge that's too broad to be trusted",
      "Adding actions before instructions are sharp",
    ],
    learnNext: ["generative-orchestration", "testing-analytics"],
    ifLowCodeNext: "generative-orchestration",
    ifReactNext: "topics-tools-children",
    ifProductionNext: "testing-analytics",
  },
  "generative-orchestration": {
    bestForPaths: ["structured-low-code", "product-led-react"],
    complexity: "Medium",
    whatItIs:
      "An LLM-driven orchestration layer that interprets intent and selects relevant topics, tools, knowledge, and child agents.",
    whyItMatters:
      "It replaces rigid hand-authored branching for open-ended behaviour — but only works if descriptions and instructions are clear.",
    commonMistakes: [
      "Weak names and descriptions on tools and topics",
      "Mixing it with deterministic flows that should stay deterministic",
    ],
    learnNext: ["topics-tools-children", "testing-analytics"],
    ifLowCodeNext: "topics-tools-children",
    ifReactNext: "topics-tools-children",
    ifProductionNext: "testing-analytics",
  },
  "topics-tools-children": {
    bestForPaths: ["structured-low-code", "product-led-react"],
    complexity: "Medium",
    whatItIs:
      "How Studio composes behaviour: topics, tools/actions, knowledge sources, child or connected agents.",
    whyItMatters:
      "Composition is how complex behaviour becomes maintainable. Naming and ownership matter as much as the logic.",
    commonMistakes: [
      "One giant topic instead of focused units",
      "Adding child agents before a single agent has earned its scope",
    ],
    learnNext: ["testing-analytics"],
    ifLowCodeNext: "testing-analytics",
    ifReactNext: "react-shell",
    ifProductionNext: "testing-analytics",
  },
  "testing-analytics": {
    bestForPaths: ["structured-low-code", "product-led-react", "high-code-custom"],
    complexity: "Medium",
    whatItIs:
      "Test pane, evaluations, channel-aware testing, analytics, governance — the operational backbone.",
    whyItMatters:
      "This is where 'works in demo' becomes 'holds up in production'. Most regressions are caught here or by users.",
    commonMistakes: [
      "Eyeballing quality instead of running an eval set",
      "Treating analytics as a dashboard to glance at, not a loop to act on",
    ],
    learnNext: ["poc-vs-production"],
    ifLowCodeNext: "poc-vs-production",
    ifReactNext: "react-shell",
    ifProductionNext: "poc-vs-production",
  },
  "react-shell": {
    bestForPaths: ["product-led-react", "high-code-custom"],
    complexity: "High",
    whatItIs:
      "A custom React app that owns the broader UX — dashboards, navigation, role-aware state — with an agent embedded inside it.",
    whyItMatters:
      "When UX is the product, the assistant should participate in the journey, not be the journey.",
    commonMistakes: [
      "Chat-on-the-side that doesn't understand what the user is looking at",
      "Rebuilding the product around the agent instead of embedding it",
    ],
    learnNext: ["custom-engine", "testing-analytics"],
    ifLowCodeNext: "studio",
    ifReactNext: "custom-engine",
    ifProductionNext: "testing-analytics",
  },
  "poc-vs-production": {
    bestForPaths: [
      "fastest-low-code",
      "structured-low-code",
      "product-led-react",
      "high-code-custom",
    ],
    complexity: "Low",
    whatItIs:
      "Two delivery modes judged by different rules. PoC optimises for speed and validation. Production optimises for reliability and ownership.",
    whyItMatters:
      "Most failed builds happen when one mode is judged by the other's rules. Naming the mode out loud changes every choice.",
    commonMistakes: [
      "Treating a PoC like a product (over-investing too early)",
      "Treating a production build like a PoC (under-investing in ops)",
    ],
    learnNext: ["testing-analytics"],
    ifLowCodeNext: "agent-builder",
    ifReactNext: "react-shell",
    ifProductionNext: "testing-analytics",
  },
};
