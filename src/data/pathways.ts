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
  bestWhenLeft: string;
  bestWhenRight: string;
  likelyFirstMove: string;
  learningReferenceIds: string[];
};

export type AgentType = "Declarative" | "Custom Engine" | "Mixed" | "Depends";

export type UseCase = {
  id: string;
  title: string;
  summary: string;
  recommendedPath: string;
  recommendedAgentType: AgentType;
  pocFit: string;
  productionFit: string;
  reactFit: string;
  why: string;
  pocShape: string;
  productionShape: string;
  reactAngle: string;
  risks: string;
  relatedModuleIds: string[];
  learningReferenceIds: string[];
};

export const learningReferences: LearningReference[] = [
  {
    id: "agents-overview",
    title: "Microsoft 365 Copilot agents overview",
    summary: "What agents are, the two main approaches, and where they fit in the Copilot ecosystem.",
    category: "Agents",
    href: "https://learn.microsoft.com/microsoft-365-copilot/extensibility/overview-agents",
  },
  {
    id: "declarative-agents",
    title: "Declarative agents",
    summary: "Tailor M365 Copilot using instructions, knowledge, and actions on Microsoft's orchestrator and models.",
    category: "Declarative",
    href: "https://learn.microsoft.com/microsoft-365-copilot/extensibility/overview-declarative-agent",
  },
  {
    id: "custom-engine-agents",
    title: "Custom engine agents",
    summary: "Bring your own orchestration and AI services for advanced, full-stack agent scenarios.",
    category: "Custom Engine",
    href: "https://learn.microsoft.com/microsoft-365-copilot/extensibility/overview-custom-engine-agent",
  },
  {
    id: "agent-builder",
    title: "Agent Builder overview",
    summary: "In-context, no-code authoring for declarative agents inside Microsoft 365 Copilot.",
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
    id: "studio-guidance",
    title: "Copilot Studio guidance hub",
    summary: "End-to-end guidance: planning, design, architecture, RAG, orchestration, channels, testing, analytics, governance.",
    category: "Copilot Studio",
    href: "https://learn.microsoft.com/microsoft-copilot-studio/guidance/",
  },
  {
    id: "studio-publishing",
    title: "Publishing & channels",
    summary: "Publish agents to Teams, web, custom apps, and other surfaces.",
    category: "Copilot Studio",
    href: "https://learn.microsoft.com/microsoft-copilot-studio/publication-fundamentals-publish-channels",
  },
  {
    id: "studio-custom-app",
    title: "Embed in a website or custom app",
    summary: "Connect Copilot Studio agents to your own React or web application.",
    category: "Copilot Studio",
    href: "https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-custom-application",
  },
  {
    id: "generative-orchestration",
    title: "Generative orchestration",
    summary: "Let the model dynamically choose topics, tools, knowledge, and child agents to answer.",
    category: "Copilot Studio",
    href: "https://learn.microsoft.com/microsoft-copilot-studio/advanced-generative-actions",
  },
  {
    id: "studio-tools",
    title: "Agent tools",
    summary: "Tools let agents take real actions — connectors, prompts, flows, custom code.",
    category: "Copilot Studio",
    href: "https://learn.microsoft.com/microsoft-copilot-studio/advanced-plugins",
  },
  {
    id: "studio-testing",
    title: "Testing & evaluation",
    summary: "Test pane, conversation traces, and evaluation flow for Studio agents.",
    category: "Copilot Studio",
    href: "https://learn.microsoft.com/microsoft-copilot-studio/authoring-test-pane",
  },
  {
    id: "studio-analytics",
    title: "Analytics & improvement",
    summary: "Use analytics to understand usage, find gaps, and improve agent performance.",
    category: "Copilot Studio",
    href: "https://learn.microsoft.com/microsoft-copilot-studio/analytics-overview",
  },
  {
    id: "agents-sdk",
    title: "Microsoft 365 Agents SDK",
    summary: "Pro-code SDK for building custom engine agents and multi-channel experiences.",
    category: "Custom Engine",
    href: "https://learn.microsoft.com/microsoft-365/agents-sdk/",
  },
  {
    id: "m365-admin-basics",
    title: "Agents admin & governance",
    summary: "Lifecycle, controls, and governance for agents across the tenant.",
    category: "Admin",
    href: "https://learn.microsoft.com/microsoft-365-copilot/extensibility/manage",
  },
];

export const comparisons: Comparison[] = [
  {
    id: "builder-vs-studio",
    title: "Agent Builder vs Copilot Studio",
    summary:
      "Both build declarative-style agents. One stays inside M365 Copilot. The other gives you the full platform.",
    leftEyebrow: "In-context · Lightweight",
    rightEyebrow: "Platform · Operational",
    leftTitle: "Agent Builder",
    rightTitle: "Copilot Studio",
    criteria: [
      {
        label: "What it is",
        leftValue:
          "A no-code authoring surface inside Microsoft 365 Copilot for building declarative agents fast.",
        rightValue:
          "A full agent platform: planning, orchestration, tools, channels, testing, analytics, governance.",
      },
      {
        label: "Best for",
        leftValue:
          "Quick learning, fast prototyping, lightweight Microsoft-native assistants.",
        rightValue:
          "Structured, multi-step, multi-channel agents with real lifecycle needs.",
      },
      {
        label: "Less ideal for",
        leftValue: "Broader product experiences, advanced operational scenarios.",
        rightValue: "Throwaway demos that only need a prompt and a doc set.",
      },
      {
        label: "Speed to prototype",
        leftValue: "Minutes — directly inside the Copilot UI.",
        rightValue: "Fast, but with more setup, topics, and authoring overhead.",
      },
      {
        label: "Control & flexibility",
        leftValue: "Limited — declarative building blocks only.",
        rightValue: "High — topics, tools, knowledge, generative orchestration, child agents.",
      },
      {
        label: "UX flexibility",
        leftValue: "You inherit the Copilot UI; little room to redesign.",
        rightValue: "Channel-dependent; embed in custom apps for richer UX.",
      },
      {
        label: "Rollout & publishing",
        leftValue: "Lives inside M365 Copilot for the people who can see it.",
        rightValue: "Multiple channels: Teams, web, custom apps, voice.",
      },
      {
        label: "Production readiness",
        leftValue: "Good for narrow internal scopes.",
        rightValue: "Stronger story for testing, analytics, governance, lifecycle.",
      },
      {
        label: "Engineering effort",
        leftValue: "Almost none — configuration over code.",
        rightValue: "Moderate — authoring, possibly tools, channels, and integration work.",
      },
    ],
    bestWhenLeft:
      "You want to learn fast, prototype an internal helper, or stay inside Microsoft 365.",
    bestWhenRight:
      "The idea is becoming structured, multi-step, or needs to be owned and rolled out.",
    likelyFirstMove:
      "Start in Agent Builder to learn the shape. Move to Copilot Studio when you need orchestration, tools, or channels.",
    learningReferenceIds: [
      "agent-builder",
      "studio-guidance",
      "choosing-builder-vs-studio",
      "studio-publishing",
    ],
  },
  {
    id: "declarative-vs-custom",
    title: "Declarative vs Custom Engine",
    summary:
      "Two architectural approaches to Microsoft 365 Copilot agents. One leans on Microsoft. The other lets you bring your own.",
    leftEyebrow: "Microsoft-native",
    rightEyebrow: "Pro-code · Flexible",
    leftTitle: "Declarative agents",
    rightTitle: "Custom engine agents",
    criteria: [
      {
        label: "What it is",
        leftValue:
          "Instructions + knowledge + actions, running on Copilot's orchestrator and models.",
        rightValue:
          "Bring your own orchestration, models, and integration architecture.",
      },
      {
        label: "Best for",
        leftValue:
          "Microsoft-native scenarios, lightweight to moderately structured business cases.",
        rightValue:
          "Advanced control, custom orchestration, multi-channel, full-stack scenarios.",
      },
      {
        label: "Less ideal for",
        leftValue: "Deep control over models, orchestration, or architecture.",
        rightValue: "Cases where speed and simplicity beat flexibility.",
      },
      {
        label: "Speed to prototype",
        leftValue: "Very fast — Microsoft does the heavy lifting.",
        rightValue: "Slower — you own more of the stack.",
      },
      {
        label: "Control & flexibility",
        leftValue: "Bounded by the declarative surface.",
        rightValue: "Wide — model choice, orchestration logic, integrations.",
      },
      {
        label: "UX flexibility",
        leftValue: "Lives inside Microsoft surfaces by default.",
        rightValue: "Can be embedded anywhere your engineering reaches.",
      },
      {
        label: "Rollout & publishing",
        leftValue: "Through M365 Copilot and Studio channels.",
        rightValue: "Anywhere you can ship code — Teams, web, mobile, custom.",
      },
      {
        label: "Production readiness",
        leftValue: "Strong for Microsoft-shaped workflows.",
        rightValue: "Strong when you want full ownership of the experience.",
      },
      {
        label: "Engineering effort",
        leftValue: "Low — configuration and authoring.",
        rightValue: "High — real backend, orchestration, observability work.",
      },
    ],
    bestWhenLeft:
      "The work belongs inside Microsoft 365 and you want speed and a maintained orchestrator.",
    bestWhenRight:
      "You need control over models, orchestration, or integrations the declarative path can't give you.",
    likelyFirstMove:
      "Default to declarative. Only adopt custom engine when a specific limitation forces it.",
    learningReferenceIds: [
      "declarative-agents",
      "custom-engine-agents",
      "agents-overview",
      "agents-sdk",
    ],
  },
  {
    id: "native-vs-react",
    title: "Microsoft-native vs React app shell",
    summary:
      "Where should the experience actually live — inside the user's existing flow, or inside your own product?",
    leftEyebrow: "Inside the workflow",
    rightEyebrow: "Inside the product",
    leftTitle: "Microsoft-native experience",
    rightTitle: "React app shell",
    criteria: [
      {
        label: "What it is",
        leftValue:
          "The agent lives in Teams, Outlook, Word, SharePoint — wherever the user already is.",
        rightValue:
          "The agent is one feature inside a custom app you design and own end-to-end.",
      },
      {
        label: "Best for",
        leftValue:
          "Work that already happens in Microsoft 365 day-to-day.",
        rightValue:
          "Dashboards, workflow tools, training, role-aware copilots inside a broader product.",
      },
      {
        label: "Less ideal for",
        leftValue: "Cases where UX is the product and needs full control.",
        rightValue: "Quick internal helpers that don't justify a custom app.",
      },
      {
        label: "Speed to prototype",
        leftValue: "Very fast — no app shell to build.",
        rightValue: "Slower — you build the surrounding product too.",
      },
      {
        label: "Control & flexibility",
        leftValue: "Constrained by the host app's chrome and patterns.",
        rightValue: "Full — layout, journey, role state, custom flows.",
      },
      {
        label: "UX flexibility",
        leftValue: "Familiar surface, zero onboarding.",
        rightValue: "You own everything — including the parts you'd rather not.",
      },
      {
        label: "Rollout & publishing",
        leftValue: "Tenant-scoped, governed by M365 admin patterns.",
        rightValue: "Your own deployment, auth, and tenancy story.",
      },
      {
        label: "Production readiness",
        leftValue: "Inherits Microsoft's platform maturity.",
        rightValue: "Depends entirely on what your team builds and operates.",
      },
      {
        label: "Engineering effort",
        leftValue: "Configuration over code; less infra to own.",
        rightValue: "Real frontend, auth, state, embedding, API surface.",
      },
    ],
    bestWhenLeft:
      "The workflow already lives in Microsoft 365 and the assistant should stay light.",
    bestWhenRight:
      "UX matters deeply and the assistant is one part of a broader product experience.",
    likelyFirstMove:
      "Pilot inside Microsoft 365 if the work happens there. Build a React shell when the broader product is the point.",
    learningReferenceIds: ["studio-custom-app", "studio-publishing", "agents-sdk"],
  },
  {
    id: "poc-vs-production",
    title: "PoC vs Production",
    summary:
      "Not a product comparison — a delivery lens. Knowing which mode you're in changes every choice.",
    leftEyebrow: "Validate · Move fast",
    rightEyebrow: "Own · Sustain",
    leftTitle: "PoC mode",
    rightTitle: "Production mode",
    criteria: [
      {
        label: "What it is",
        leftValue: "A small, sharp build aimed at proving a single idea is worth pursuing.",
        rightValue: "A real product slice people will rely on and you will support.",
      },
      {
        label: "Best for",
        leftValue: "Demoability, narrow scope, fast iteration, real user reactions.",
        rightValue: "Reliability, ownership, repeatable behaviour, supportability.",
      },
      {
        label: "Less ideal for",
        leftValue: "Anything you'll quietly hand to real users next quarter.",
        rightValue: "Disposable explorations or speculative ideas.",
      },
      {
        label: "Speed to prototype",
        leftValue: "Maximum — shortcuts are the point.",
        rightValue: "Deliberate — speed traded for soundness.",
      },
      {
        label: "Control & flexibility",
        leftValue: "Hard-coded data, narrow prompts, rough edges in UX.",
        rightValue: "Considered, role-aware, predictable, accessible.",
      },
      {
        label: "UX flexibility",
        leftValue: "Good enough to feel the idea; not pixel-perfect.",
        rightValue: "Cohesive, role-aware, supportable.",
      },
      {
        label: "Rollout & publishing",
        leftValue: "A few invited users, scripted flow, manual fallback.",
        rightValue: "Real channel strategy, lifecycle, comms, support model.",
      },
      {
        label: "Production readiness",
        leftValue: "Throwaway-grade is fine if learning is real.",
        rightValue: "Tests, infra, monitoring, deployment hygiene.",
      },
      {
        label: "Engineering effort",
        leftValue: "Lowest acceptable to learn the thing.",
        rightValue: "What it actually takes to own the thing.",
      },
    ],
    bestWhenLeft:
      "You don't yet know if the idea is worth building, and a small build will tell you.",
    bestWhenRight:
      "You already know it works and people now depend on it.",
    likelyFirstMove:
      "Name the mode out loud. Most failed builds happen when one mode is judged by the other's rules.",
    learningReferenceIds: ["studio-testing", "studio-analytics", "generative-orchestration"],
  },
];

export const useCases: UseCase[] = [
  {
    id: "internal-knowledge",
    title: "Internal knowledge assistant",
    summary:
      "A small, trustworthy way for a team to ask questions over a known set of docs.",
    recommendedPath: "Agent Builder or Microsoft-native declarative route first",
    recommendedAgentType: "Declarative",
    pocFit: "Excellent",
    productionFit: "Good",
    reactFit: "Optional",
    why: "Strong fit for quick knowledge retrieval and internal assistance — and a great early case to learn instructions + knowledge + actions.",
    pocShape:
      "Narrow document set, simple Q&A, small audience, minimal grounding rules.",
    productionShape:
      "Better knowledge boundaries, clearer ownership, stronger review and evaluation, lifecycle management.",
    reactAngle:
      "Only needed if it becomes part of a wider internal tool with its own UX and navigation.",
    risks:
      "Scope creep, stale content, weak evaluation, blurry boundaries on what the assistant should and shouldn't know.",
    relatedModuleIds: ["declarative", "agent-builder", "knowledge-instructions-actions"],
    learningReferenceIds: ["agents-overview", "declarative-agents", "agent-builder", "agent-templates"],
  },
  {
    id: "training-assistant",
    title: "Training assistant",
    summary:
      "Helps someone learn a topic, tool, or internal process — with structure, not just chat.",
    recommendedPath: "Copilot Studio or React app + agent layer",
    recommendedAgentType: "Declarative",
    pocFit: "Good",
    productionFit: "Strong with structure",
    reactFit: "Strong",
    why: "Training usually needs more structure, progression, and stronger UX than a chat helper alone can provide.",
    pocShape:
      "Guided lesson flow, narrow content scope, a few core interactions to feel the loop.",
    productionShape:
      "Richer UX, progress and state, role-specific experiences, clearer evaluation of learning outcomes.",
    reactAngle:
      "Strong fit when training is part of a broader app — onboarding, certification, skills tracking.",
    risks:
      "Treating it as 'just a chatbot' and missing the structure that makes training actually work.",
    relatedModuleIds: ["studio", "topics-tools-children", "react-shell"],
    learningReferenceIds: ["studio-guidance", "studio-custom-app", "generative-orchestration"],
  },
  {
    id: "workflow-assistant",
    title: "Workflow assistant",
    summary:
      "Helps a user complete a real task — request, approval, status update, structured action.",
    recommendedPath: "Copilot Studio",
    recommendedAgentType: "Declarative",
    pocFit: "Good",
    productionFit: "Strong",
    reactFit: "Useful",
    why: "Workflow ideas almost always need controlled interaction paths, tools, orchestration, and consistent behaviour.",
    pocShape:
      "One or two simple tasks, narrow flow, light orchestration, happy-path only.",
    productionShape:
      "Stronger guardrails, ownership, failure handling, retry and escalation, operational maturity.",
    reactAngle:
      "Useful when workflows involve steps, forms, approvals, task states, or dashboards.",
    risks:
      "Over-trusting freeform generation in a place that really needs structured tools and validations.",
    relatedModuleIds: ["studio", "generative-orchestration", "topics-tools-children", "testing-analytics"],
    learningReferenceIds: [
      "studio-guidance",
      "generative-orchestration",
      "studio-tools",
      "studio-testing",
    ],
  },
  {
    id: "support-triage",
    title: "Support triage assistant",
    summary:
      "Suggests answers, classifies tickets, and helps route incoming support work.",
    recommendedPath: "Agent Builder for exploration, Copilot Studio for the real version",
    recommendedAgentType: "Declarative",
    pocFit: "Excellent",
    productionFit: "Strong with structure",
    reactFit: "Good in a console",
    why: "Starts simple, becomes operational quickly — once people rely on it, it needs proper edges.",
    pocShape:
      "Triage suggestions, common FAQ support, lightweight routing logic, manual fallback.",
    productionShape:
      "Better evaluation, stronger edge-case handling, clearer escalation, audit and review.",
    reactAngle:
      "Good when support is embedded into a wider console or internal tool.",
    risks:
      "Silent misclassification, broken escalation paths, no review loop on what the assistant suggested.",
    relatedModuleIds: ["agent-builder", "studio", "testing-analytics"],
    learningReferenceIds: [
      "agent-builder",
      "choosing-builder-vs-studio",
      "studio-testing",
      "studio-analytics",
    ],
  },
  {
    id: "dashboard-companion",
    title: "Dashboard companion",
    summary:
      "An assistant that lives next to charts and metrics, helping users make sense of what they're seeing.",
    recommendedPath: "React app shell + agent layer",
    recommendedAgentType: "Depends",
    pocFit: "Good",
    productionFit: "Strong",
    reactFit: "Essential",
    why: "The dashboard is the product. The assistant supports it. That dynamic doesn't fit inside a host Copilot UI.",
    pocShape:
      "Assistant beside a few charts, predefined prompts, suggested insights, narrow context.",
    productionShape:
      "Role-aware context, embedded actions, deeper workflow awareness, richer journey across the app.",
    reactAngle:
      "Essential or near-essential — the surrounding UI is the whole point.",
    risks:
      "Generic 'chat-on-the-side' that doesn't actually understand what the user is looking at.",
    relatedModuleIds: ["react-shell", "custom-engine", "generative-orchestration"],
    learningReferenceIds: ["studio-custom-app", "generative-orchestration", "agents-sdk"],
  },
  {
    id: "research-copilot",
    title: "Research copilot",
    summary:
      "Helps with summarising sources, comparing options, and turning rough notes into structured outputs.",
    recommendedPath: "Depends on where the work happens",
    recommendedAgentType: "Depends",
    pocFit: "Excellent",
    productionFit: "Good with structure",
    reactFit: "Useful",
    why: "Flexible — fits inside Microsoft surfaces for fast value, or inside a custom app when outputs need state and review.",
    pocShape:
      "Quick summaries, narrow sources, fast iteration, single-user feel.",
    productionShape:
      "Stronger source boundaries, review flow, repeatable outputs, more structured UX.",
    reactAngle:
      "Useful when outputs need saved state, comparisons, review queues, or navigation.",
    risks:
      "Confident summaries over weak sources; no traceability back to what was actually read.",
    relatedModuleIds: ["declarative", "custom-engine", "react-shell"],
    learningReferenceIds: ["agents-overview", "declarative-agents", "studio-custom-app"],
  },
];

export const pathFilters = [
  "All",
  "M365 Copilot",
  "Copilot Studio",
  "React App",
] as const;

export type PathFilter = (typeof pathFilters)[number];
