export type LearnModule = {
  id: string;
  chapter: string;
  title: string;
  summary: string;
  goodFor: string[];
  lessIdealFor: string[];
  pocShape: string;
  productionShape: string;
  learningReferenceIds: string[];
};

export const learnChapters = [
  { id: "foundations", title: "Foundations" },
  { id: "approaches", title: "The two approaches" },
  { id: "tools", title: "Authoring surfaces" },
  { id: "design", title: "Design building blocks" },
  { id: "operations", title: "Operations" },
  { id: "delivery", title: "Delivery mindset" },
] as const;

export const learnModules: LearnModule[] = [
  {
    id: "what-is-an-agent",
    chapter: "foundations",
    title: "What is a Copilot agent?",
    summary:
      "A specialised helper that can retrieve information, summarise content, guide users, and take actions. Microsoft documents two main approaches for M365 Copilot agents: declarative and custom engine.",
    goodFor: [
      "Forming a clear mental model before choosing tools",
      "Anchoring conversations with stakeholders in the same vocabulary",
    ],
    lessIdealFor: [
      "Skipping past — the rest of the field guide builds on this distinction",
    ],
    pocShape:
      "Pick one shape (knowledge, summarisation, guidance, or action) and one user. Don't try to do all four in a first build.",
    productionShape:
      "Be explicit about what the agent is and isn't responsible for. Most production failures are scope failures, not model failures.",
    learningReferenceIds: ["agents-overview"],
  },
  {
    id: "declarative",
    chapter: "approaches",
    title: "Declarative agents",
    summary:
      "The Microsoft-native path. You define instructions, knowledge, and actions, and the agent runs on Microsoft 365 Copilot's orchestrator, foundation models, and trusted AI services.",
    goodFor: [
      "Fast prototyping",
      "Microsoft-native experiences",
      "Lightweight to moderately structured business scenarios",
    ],
    lessIdealFor: [
      "Deep control over orchestration, models, or architecture",
      "Workloads that must run outside Microsoft surfaces",
    ],
    pocShape:
      "One template, one knowledge source, a tight set of instructions. Resist adding actions until the basic loop feels right.",
    productionShape:
      "Sharper instructions, governed knowledge, tested actions. Treat the declarative spec as the contract.",
    learningReferenceIds: ["declarative-agents", "agents-overview", "agent-templates"],
  },
  {
    id: "custom-engine",
    chapter: "approaches",
    title: "Custom engine agents",
    summary:
      "The advanced path. Bring your own orchestration and AI services, with more control over workflows, models, and integrations. A pro-code option that fits broader full-stack and multi-channel scenarios.",
    goodFor: [
      "Advanced engineering control",
      "Custom orchestration or model choice",
      "Multi-channel, full-stack scenarios",
    ],
    lessIdealFor: [
      "Cases where speed and simplicity matter more than flexibility",
      "Teams without backend ownership",
    ],
    pocShape:
      "Smallest viable orchestration, one model, one channel. Prove the architectural choice before fanning out.",
    productionShape:
      "Real observability, evaluation harness, model and prompt versioning, deployment hygiene.",
    learningReferenceIds: ["custom-engine-agents", "agents-sdk"],
  },
  {
    id: "agent-builder",
    chapter: "tools",
    title: "Agent Builder",
    summary:
      "The fast, accessible, in-context way to build declarative agents inside Microsoft 365 Copilot. Strong for learning, prototyping, lightweight internal assistants, and template-based starts.",
    goodFor: [
      "Fast getting-started",
      "Templates and quick wins",
      "Microsoft-native assistant ideas",
    ],
    lessIdealFor: [
      "Broader product experiences",
      "More advanced operational scenarios",
    ],
    pocShape:
      "Pick a template, point at a small doc set, ship to a handful of users.",
    productionShape:
      "Once it's relied on, it usually graduates into Copilot Studio for governance, channels, and depth.",
    learningReferenceIds: ["agent-builder", "agent-templates", "choosing-builder-vs-studio"],
  },
  {
    id: "studio",
    chapter: "tools",
    title: "Copilot Studio",
    summary:
      "The broader, more advanced platform. Covers planning, orchestration, tools, knowledge, channels, testing, analytics, and governance — better when a solution becomes structured, operational, or production-shaped.",
    goodFor: [
      "Broader publishing and channel support",
      "Richer orchestration and tools",
      "Testing, evaluation, analytics, governance",
    ],
    lessIdealFor: [
      "The lightest possible internal helper — that's Agent Builder territory",
    ],
    pocShape:
      "One topic or generative orchestration, one tool, one knowledge source. Resist authoring sprawl.",
    productionShape:
      "Defined topics or orchestration policy, tested tools, channel-specific UX, analytics loop.",
    learningReferenceIds: ["studio-guidance", "studio-publishing", "studio-analytics"],
  },
  {
    id: "knowledge-instructions-actions",
    chapter: "design",
    title: "Knowledge, instructions, and actions",
    summary:
      "The three core declarative building blocks. Instructions shape behaviour. Knowledge shapes what the agent grounds on. Actions shape what the agent can do.",
    goodFor: [
      "Designing a declarative agent that behaves predictably",
      "Communicating intent across PoC and production",
    ],
    lessIdealFor: [
      "Skimming — most quality issues trace back to weak versions of these three",
    ],
    pocShape:
      "Crisp one-paragraph instructions, narrow knowledge, zero or one action.",
    productionShape:
      "Versioned instructions, governed knowledge, tested actions with clear failure modes.",
    learningReferenceIds: ["declarative-agents", "agents-overview"],
  },
  {
    id: "generative-orchestration",
    chapter: "design",
    title: "Generative orchestration",
    summary:
      "An LLM-driven orchestration layer interprets intent and chooses among relevant topics, tools, other agents, and knowledge sources. Reduces rigid hand-authored branching and unlocks open-ended, multi-step behaviour.",
    goodFor: [
      "Open-ended or multi-step interactions",
      "Reducing topic sprawl",
      "Shipping behaviour change without rewiring flows",
    ],
    lessIdealFor: [
      "Hard-deterministic flows where every branch must be auditable",
    ],
    pocShape:
      "Trust the orchestrator on a small set of well-described tools and topics.",
    productionShape:
      "Invest in clear instructions and tool/topic descriptions — the orchestrator selects on those. Add evals.",
    learningReferenceIds: ["generative-orchestration", "studio-tools"],
  },
  {
    id: "topics-tools-children",
    chapter: "design",
    title: "Topics, tools, and child agents",
    summary:
      "Copilot Studio combines topics, tools/actions, knowledge sources, and child or connected agents. Structured topics still matter sometimes — generative orchestration becomes the better mental model elsewhere.",
    goodFor: [
      "Composing complex behaviour from smaller, focused pieces",
      "Reusing capabilities across agents",
    ],
    lessIdealFor: [
      "Tiny single-purpose helpers that don't need composition",
    ],
    pocShape:
      "One or two tools, one knowledge source, no child agents yet.",
    productionShape:
      "Clear ownership per tool and topic, naming and description quality treated as a first-class concern.",
    learningReferenceIds: ["studio-tools", "generative-orchestration", "studio-guidance"],
  },
  {
    id: "testing-analytics",
    chapter: "operations",
    title: "Testing, analytics, and publishing",
    summary:
      "Once an agent becomes serious, testing, evaluation, channels, analytics, and governance matter much more. Studio guidance covers testing strategy, evaluations, channel publishing, and analytics-driven improvement.",
    goodFor: [
      "Catching regressions before users do",
      "Understanding what the agent is actually used for",
      "Closing the loop from usage back into design",
    ],
    lessIdealFor: [
      "PoCs that haven't earned the operational weight yet",
    ],
    pocShape:
      "Manual test pane, a handful of trace reviews, eyeballed quality.",
    productionShape:
      "Defined evaluation set, channel-aware testing, analytics review cadence, lifecycle and governance.",
    learningReferenceIds: ["studio-testing", "studio-analytics", "studio-publishing", "m365-admin-basics"],
  },
  {
    id: "react-shell",
    chapter: "tools",
    title: "React app shell",
    summary:
      "React is often the outer product shell when the assistant is one part of a broader UX. Dashboards, forms, navigation, role-aware states, saved outputs, and progress tracking point to a custom shell with the agent inside.",
    goodFor: [
      "Dashboards and workflow tools",
      "Role-aware product experiences",
      "Saved state, history, comparisons, review queues",
    ],
    lessIdealFor: [
      "Quick internal helpers that already live in Microsoft 365",
    ],
    pocShape:
      "Embed a Studio agent into one screen of an existing React app. Don't rebuild the product around it.",
    productionShape:
      "Real auth and state, considered embedding pattern, contextual handoff between app and agent.",
    learningReferenceIds: ["studio-custom-app", "agents-sdk"],
  },
  {
    id: "poc-vs-production",
    chapter: "delivery",
    title: "PoC vs Production mindset",
    summary:
      "Two delivery modes, judged by different rules. PoC mode optimises for speed, narrow scope, demoability, and validation. Production mode optimises for reliability, ownership, supportability, and rollout maturity.",
    goodFor: [
      "Naming the mode you're actually in",
      "Setting fair expectations with stakeholders",
    ],
    lessIdealFor: [
      "Pretending one mode is the other — the most common cause of failed builds",
    ],
    pocShape:
      "Speed, narrow scope, demoability, low friction, fast validation.",
    productionShape:
      "Reliability, ownership, supportability, better UX, data and workflow boundaries, repeatability.",
    learningReferenceIds: ["studio-testing", "studio-analytics", "studio-guidance"],
  },
];
