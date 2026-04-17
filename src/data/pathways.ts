export type LearningReference = {
  id: string;
  title: string;
  summary: string;
  category: string;
  href: string;
};

export type ComparisonCriterion = {
  label: string;
  leftValue: string;
  rightValue: string;
};

export type Comparison = {
  id: string;
  title: string;
  summary: string;
  leftTitle: string;
  rightTitle: string;
  leftEyebrow: string;
  rightEyebrow: string;
  criteria: ComparisonCriterion[];
  learningReferenceIds: string[];
};

export type UseCase = {
  id: string;
  title: string;
  summary: string;
  recommendedPath: string;
  pocFit: string;
  productionFit: string;
  reactFit: string;
  why: string;
  pocShape: string;
  productionShape: string;
  reactAngle: string;
  risks: string;
  learningReferenceIds: string[];
};

export const learningReferences: LearningReference[] = [
  {
    id: "m365-agents-overview",
    title: "Microsoft 365 Copilot agents overview",
    summary: "What agents are inside M365 Copilot and how they extend the host experience.",
    category: "M365 Copilot",
    href: "https://learn.microsoft.com/microsoft-365-copilot/extensibility/overview-agents",
  },
  {
    id: "agent-builder",
    title: "Agent Builder overview",
    summary: "Lightweight, no-code agent creation directly inside Microsoft 365 Copilot.",
    category: "M365 Copilot",
    href: "https://learn.microsoft.com/microsoft-365-copilot/extensibility/agent-builder",
  },
  {
    id: "choosing-builder-vs-studio",
    title: "Agent Builder vs Copilot Studio",
    summary: "Practical guidance on when to stay in M365 vs move to Copilot Studio.",
    category: "Decision",
    href: "https://learn.microsoft.com/microsoft-365-copilot/extensibility/decision-guide",
  },
  {
    id: "agent-templates",
    title: "Agent templates",
    summary: "Starter templates that shape an agent's purpose, instructions, and grounding.",
    category: "M365 Copilot",
    href: "https://learn.microsoft.com/microsoft-365-copilot/extensibility/agent-templates",
  },
  {
    id: "studio-publishing",
    title: "Copilot Studio publishing & channels",
    summary: "How to publish agents to Teams, web, custom apps, and other surfaces.",
    category: "Copilot Studio",
    href: "https://learn.microsoft.com/microsoft-copilot-studio/publication-fundamentals-publish-channels",
  },
  {
    id: "studio-custom-app",
    title: "Studio: website & custom app integration",
    summary: "Embed Copilot Studio agents into your own React or web application.",
    category: "Copilot Studio",
    href: "https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-custom-application",
  },
  {
    id: "generative-orchestration",
    title: "Generative orchestration",
    summary: "Let the model dynamically choose tools, topics, and knowledge to answer.",
    category: "Copilot Studio",
    href: "https://learn.microsoft.com/microsoft-copilot-studio/advanced-generative-actions",
  },
  {
    id: "studio-testing",
    title: "Testing in Copilot Studio",
    summary: "Test pane, conversation traces, and evaluation flow for Studio agents.",
    category: "Copilot Studio",
    href: "https://learn.microsoft.com/microsoft-copilot-studio/authoring-test-pane",
  },
  {
    id: "m365-admin-basics",
    title: "M365 agents admin basics",
    summary: "Governance, lifecycle, and admin controls for agents across the tenant.",
    category: "Admin",
    href: "https://learn.microsoft.com/microsoft-365-copilot/extensibility/manage",
  },
];

export const comparisons: Comparison[] = [
  {
    id: "m365-vs-studio",
    title: "Microsoft 365 Copilot vs Copilot Studio",
    summary:
      "Where the intelligence lives — and how much control you really need over it.",
    leftEyebrow: "Lightweight · Native",
    rightEyebrow: "Structured · Extensible",
    leftTitle: "Microsoft 365 Copilot / Agent Builder",
    rightTitle: "Copilot Studio",
    criteria: [
      {
        label: "Best for",
        leftValue:
          "Quick exploration, Microsoft-native workflows, lightweight internal assistants.",
        rightValue:
          "Structured agents, broader rollout, deeper workflows, serious builds.",
      },
      {
        label: "Less ideal for",
        leftValue: "Custom UX, complex orchestration, cross-system workflows.",
        rightValue: "Throwaway demos that only need a few prompts and a doc set.",
      },
      {
        label: "Speed to prototype",
        leftValue: "Very fast — minutes to a usable agent inside Copilot.",
        rightValue: "Fast, but with more setup, topics, and authoring overhead.",
      },
      {
        label: "Control & flexibility",
        leftValue: "Limited — you live inside the M365 Copilot frame.",
        rightValue: "High — topics, tools, knowledge, orchestration, channels.",
      },
      {
        label: "UX flexibility",
        leftValue: "You inherit the Copilot UI; little room to redesign.",
        rightValue: "Channel-dependent; embed in custom apps for richer UX.",
      },
      {
        label: "Production readiness",
        leftValue: "Good for internal, narrow scopes.",
        rightValue: "Stronger story for governance, testing, lifecycle.",
      },
      {
        label: "React app relevance",
        leftValue: "Low — designed to live inside Microsoft surfaces.",
        rightValue: "High — can be embedded into custom React experiences.",
      },
    ],
    learningReferenceIds: [
      "m365-agents-overview",
      "agent-builder",
      "choosing-builder-vs-studio",
      "studio-publishing",
    ],
  },
  {
    id: "poc-vs-production",
    title: "PoC vs Production",
    summary:
      "The same idea, judged by very different rules. Knowing which mode you're in changes everything.",
    leftEyebrow: "Validate · Move fast",
    rightEyebrow: "Own · Sustain",
    leftTitle: "PoC Mode",
    rightTitle: "Production Mode",
    criteria: [
      {
        label: "Main goal",
        leftValue: "Prove a small, sharp idea is worth pursuing.",
        rightValue: "Deliver a reliable experience people depend on.",
      },
      {
        label: "What matters most",
        leftValue: "Demoability, narrow scope, fast iteration.",
        rightValue: "Reliability, ownership, repeatable behaviour.",
      },
      {
        label: "Acceptable shortcuts",
        leftValue: "Hard-coded data, narrow prompts, rough edges in UX.",
        rightValue:
          "Very few — shortcuts now become incidents and rewrites later.",
      },
      {
        label: "Risky to ignore",
        leftValue: "Asking real users, capturing the actual use moment.",
        rightValue: "Evaluation, edge cases, data boundaries, observability.",
      },
      {
        label: "UX expectations",
        leftValue: "Good enough to feel the idea; not pixel-perfect.",
        rightValue: "Considered, role-aware, predictable, accessible.",
      },
      {
        label: "Engineering expectations",
        leftValue: "Throwaway-grade code is fine if learning is real.",
        rightValue: "Tests, infra, monitoring, deployment hygiene.",
      },
      {
        label: "Delivery mindset",
        leftValue: "Ship something rough today, learn tomorrow.",
        rightValue: "Ship something owned this quarter, support it next year.",
      },
    ],
    learningReferenceIds: ["studio-testing", "generative-orchestration"],
  },
  {
    id: "native-vs-react",
    title: "Microsoft-native vs React app experience",
    summary:
      "Where should the experience actually live — inside the user's existing flow, or inside your own product?",
    leftEyebrow: "Inside the workflow",
    rightEyebrow: "Inside the product",
    leftTitle: "Microsoft-native experience",
    rightTitle: "React app experience",
    criteria: [
      {
        label: "When it makes sense",
        leftValue:
          "The work already happens in Teams, Outlook, Word, SharePoint.",
        rightValue:
          "UX matters deeply and the assistant is one part of a broader product.",
      },
      {
        label: "UX strengths",
        leftValue: "Familiar surface, zero onboarding, available where users are.",
        rightValue:
          "Full control of layout, journey, role-aware states, custom flows.",
      },
      {
        label: "UX limitations",
        leftValue: "Constrained by the host app's chrome and patterns.",
        rightValue: "You own everything — including the things you'd rather not.",
      },
      {
        label: "Best use cases",
        leftValue: "Internal Q&A, quick lookups, lightweight assistants.",
        rightValue:
          "Dashboards, workflow tools, training, role-specific copilots.",
      },
      {
        label: "Engineering implications",
        leftValue: "Configuration over code; less infra to own.",
        rightValue:
          "Real frontend work, auth, state, embedding agents, API surface.",
      },
      {
        label: "How copilots fit",
        leftValue: "The host *is* the copilot; you extend it with agents.",
        rightValue:
          "Embed Studio agents or custom models as one feature among many.",
      },
    ],
    learningReferenceIds: ["studio-custom-app", "studio-publishing"],
  },
];

export const useCases: UseCase[] = [
  {
    id: "internal-knowledge",
    title: "Internal knowledge assistant",
    summary:
      "A small, trustworthy way for a team to ask questions over a known set of docs.",
    recommendedPath: "Microsoft 365 Copilot first",
    pocFit: "Excellent",
    productionFit: "Good",
    reactFit: "Optional",
    why: "Fast knowledge retrieval and lightweight internal assistance — exactly what M365 Copilot agents are shaped for.",
    pocShape:
      "Narrow document set, simple Q&A, small audience, minimal grounding rules.",
    productionShape:
      "Better knowledge boundaries, clearer ownership, stronger review and evaluation, lifecycle management.",
    reactAngle:
      "Only needed if it becomes part of a wider internal tool with its own UX and navigation.",
    risks:
      "Scope creep, stale content, weak evaluation, blurry boundaries on what the assistant should and shouldn't know.",
    learningReferenceIds: ["m365-agents-overview", "agent-builder", "agent-templates"],
  },
  {
    id: "training-assistant",
    title: "Training assistant",
    summary:
      "Helps someone learn a topic, a tool, or an internal process — with structure, not just chat.",
    recommendedPath: "Copilot Studio or React app + copilot layer",
    pocFit: "Good",
    productionFit: "Strong with structure",
    reactFit: "Strong",
    why: "Training usually needs more structure than a simple chat helper — guided flow, progress, role context.",
    pocShape:
      "Guided lesson flow, narrow content scope, a few core interactions to feel the loop.",
    productionShape:
      "Richer UX, progress and state, role-specific experiences, clearer evaluation of learning outcomes.",
    reactAngle:
      "Strong fit when training is part of a broader app — onboarding, certification, skills tracking.",
    risks:
      "Treating it as 'just a chatbot' and missing the structure that makes training actually work.",
    learningReferenceIds: ["studio-custom-app", "generative-orchestration"],
  },
  {
    id: "workflow-assistant",
    title: "Workflow assistant",
    summary:
      "Helps a user complete a real task — request, approval, status update, structured action.",
    recommendedPath: "Copilot Studio",
    pocFit: "Good",
    productionFit: "Strong",
    reactFit: "Useful",
    why: "Workflow ideas almost always need controlled interaction paths, tools, and consistent behaviour.",
    pocShape:
      "One or two simple tasks, narrow flow, light orchestration, happy-path only.",
    productionShape:
      "Stronger guardrails, ownership, failure handling, retry and escalation, operational maturity.",
    reactAngle:
      "Useful when workflows involve steps, forms, approvals, task states, or dashboards.",
    risks:
      "Over-trusting freeform generation in a place that really needs structured tools and validations.",
    learningReferenceIds: [
      "generative-orchestration",
      "studio-publishing",
      "studio-testing",
    ],
  },
  {
    id: "support-triage",
    title: "Support triage assistant",
    summary:
      "Suggests answers, classifies tickets, and helps route incoming support work.",
    recommendedPath: "M365 Copilot to explore, Copilot Studio for a real version",
    pocFit: "Excellent",
    productionFit: "Strong with structure",
    reactFit: "Good in a console",
    why: "Starts simple but becomes operational quickly — once people rely on it, it needs proper edges.",
    pocShape:
      "Triage suggestions, common FAQ support, lightweight routing logic, manual fallback.",
    productionShape:
      "Better evaluation, stronger edge-case handling, clearer escalation, audit and review.",
    reactAngle:
      "Good when support is embedded into a wider console or internal tool.",
    risks:
      "Silent misclassification, broken escalation paths, no review loop on what the assistant suggested.",
    learningReferenceIds: [
      "agent-builder",
      "choosing-builder-vs-studio",
      "studio-testing",
    ],
  },
  {
    id: "dashboard-companion",
    title: "Dashboard companion",
    summary:
      "An assistant that lives next to charts and metrics, helping users make sense of what they're seeing.",
    recommendedPath: "React app with copilot layer",
    pocFit: "Good",
    productionFit: "Strong",
    reactFit: "Essential",
    why: "The dashboard is the product; the assistant supports it. That dynamic doesn't fit inside a host Copilot UI.",
    pocShape:
      "Assistant beside a few charts, predefined prompts, suggested insights, narrow context.",
    productionShape:
      "Role-aware context, embedded actions, deeper workflow awareness, richer journey across the app.",
    reactAngle:
      "Essential or near-essential — the surrounding UI is the whole point.",
    risks:
      "Generic 'chat-on-the-side' that doesn't actually understand what the user is looking at.",
    learningReferenceIds: ["studio-custom-app", "generative-orchestration"],
  },
  {
    id: "research-copilot",
    title: "Research copilot",
    summary:
      "Helps with summarising sources, comparing options, and turning rough notes into structured outputs.",
    recommendedPath: "Depends on where the work happens",
    pocFit: "Excellent",
    productionFit: "Good with structure",
    reactFit: "Useful",
    why: "Flexible — fits inside Microsoft surfaces for fast value, or inside a custom app when outputs need state.",
    pocShape:
      "Quick summaries, narrow sources, fast iteration, single-user feel.",
    productionShape:
      "Stronger source boundaries, review flow, repeatable outputs, more structured UX.",
    reactAngle:
      "Useful when outputs need saved state, comparisons, review queues, or navigation.",
    risks:
      "Confident summaries over weak sources; no traceability back to what was actually read.",
    learningReferenceIds: ["m365-agents-overview", "studio-custom-app"],
  },
];

export const pathFilters = [
  "All",
  "M365 Copilot",
  "Copilot Studio",
  "React App",
] as const;

export type PathFilter = (typeof pathFilters)[number];
