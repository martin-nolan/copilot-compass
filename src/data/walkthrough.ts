import type { PathId } from "./paths";

export type WalkthroughOption = {
  id: string;
  label: string;
  hint?: string;
  // weights: how much this answer favours each path
  weights: Partial<Record<PathId, number>>;
};

export type WalkthroughQuestion = {
  id: string;
  number: number;
  optional?: boolean;
  question: string;
  helper?: string;
  options: WalkthroughOption[];
};

export const walkthroughQuestions: WalkthroughQuestion[] = [
  {
    id: "where",
    number: 1,
    question: "Where should this experience live?",
    helper: "The home for the experience changes everything downstream.",
    options: [
      {
        id: "m365",
        label: "Inside Microsoft 365",
        hint: "Teams, Outlook, Copilot chat, SharePoint",
        weights: { "fastest-low-code": 3, "structured-low-code": 2 },
      },
      {
        id: "custom",
        label: "Inside a custom app",
        hint: "Your own product UX",
        weights: { "product-led-react": 3, "high-code-custom": 2 },
      },
      {
        id: "unsure",
        label: "Not sure yet",
        weights: { "fastest-low-code": 1, "structured-low-code": 1 },
      },
    ],
  },
  {
    id: "goal",
    number: 2,
    question: "What is the main goal?",
    options: [
      {
        id: "knowledge",
        label: "Quick knowledge help",
        weights: { "fastest-low-code": 3, "structured-low-code": 1 },
      },
      {
        id: "workflow",
        label: "Structured workflow or task completion",
        weights: { "structured-low-code": 3, "high-code-custom": 1 },
      },
      {
        id: "training",
        label: "Training or guided learning",
        weights: { "structured-low-code": 2, "product-led-react": 2 },
      },
      {
        id: "insight",
        label: "Insight / dashboard support",
        weights: { "product-led-react": 3 },
      },
      {
        id: "research",
        label: "Research / synthesis",
        weights: { "fastest-low-code": 1, "product-led-react": 2 },
      },
      {
        id: "product",
        label: "Broader product experience",
        weights: { "product-led-react": 3, "high-code-custom": 2 },
      },
    ],
  },
  {
    id: "matters",
    number: 3,
    question: "What matters most right now?",
    options: [
      {
        id: "speed",
        label: "Speed to prototype",
        weights: { "fastest-low-code": 3 },
      },
      {
        id: "native",
        label: "Staying Microsoft-native",
        weights: { "fastest-low-code": 2, "structured-low-code": 2 },
      },
      {
        id: "ops",
        label: "Stronger orchestration & operational structure",
        weights: { "structured-low-code": 3 },
      },
      {
        id: "ux",
        label: "Better custom UX",
        weights: { "product-led-react": 3 },
      },
      {
        id: "control",
        label: "More technical control",
        weights: { "high-code-custom": 3, "product-led-react": 1 },
      },
    ],
  },
  {
    id: "shell",
    number: 4,
    question: "Do I need a custom app shell?",
    helper: "A React app around the assistant — dashboards, navigation, saved state.",
    options: [
      {
        id: "yes",
        label: "Yes, definitely",
        weights: { "product-led-react": 3, "high-code-custom": 1 },
      },
      {
        id: "probably",
        label: "Probably",
        weights: { "product-led-react": 2 },
      },
      {
        id: "probably-not",
        label: "Probably not",
        weights: { "structured-low-code": 2, "fastest-low-code": 1 },
      },
      {
        id: "no",
        label: "No",
        weights: { "fastest-low-code": 2, "structured-low-code": 2 },
      },
    ],
  },
  {
    id: "seriousness",
    number: 5,
    question: "How serious is this likely to become?",
    options: [
      {
        id: "exploring",
        label: "Just exploring",
        weights: { "fastest-low-code": 3 },
      },
      {
        id: "small-poc",
        label: "PoC for a small group",
        weights: { "fastest-low-code": 2, "structured-low-code": 1 },
      },
      {
        id: "real-tool",
        label: "Likely to become a real internal tool",
        weights: { "structured-low-code": 3 },
      },
      {
        id: "broad",
        label: "Likely to need broader ownership and rollout",
        weights: { "structured-low-code": 2, "product-led-react": 2, "high-code-custom": 1 },
      },
    ],
  },
  {
    id: "control",
    number: 6,
    question: "Do I need more control over orchestration, models, or integrations?",
    options: [
      {
        id: "no",
        label: "No",
        weights: { "fastest-low-code": 2, "structured-low-code": 2 },
      },
      {
        id: "little",
        label: "A little",
        weights: { "structured-low-code": 2 },
      },
      {
        id: "yes",
        label: "Yes",
        weights: { "high-code-custom": 3, "product-led-react": 1 },
      },
      {
        id: "unsure",
        label: "Not sure",
        weights: { "structured-low-code": 1 },
      },
    ],
  },
  {
    id: "channels",
    number: 7,
    optional: true,
    question: "Does this need multiple channels or broader publishing?",
    options: [
      {
        id: "no",
        label: "No",
        weights: { "fastest-low-code": 1 },
      },
      {
        id: "later",
        label: "Maybe later",
        weights: { "structured-low-code": 1 },
      },
      {
        id: "yes",
        label: "Yes",
        weights: { "structured-low-code": 2, "product-led-react": 2, "high-code-custom": 1 },
      },
    ],
  },
  {
    id: "scope",
    number: 8,
    optional: true,
    question: "Is the assistant the whole experience, or one feature inside a product?",
    options: [
      {
        id: "whole",
        label: "The whole experience",
        weights: { "fastest-low-code": 2, "structured-low-code": 2 },
      },
      {
        id: "feature",
        label: "One feature inside a larger product",
        weights: { "product-led-react": 3, "high-code-custom": 1 },
      },
      {
        id: "unsure",
        label: "Not sure yet",
        weights: { "structured-low-code": 1 },
      },
    ],
  },
];

export type Answers = Record<string, string>;

export function scoreAnswers(answers: Answers): Record<PathId, number> {
  const scores: Record<PathId, number> = {
    "fastest-low-code": 0,
    "structured-low-code": 0,
    "product-led-react": 0,
    "high-code-custom": 0,
  };
  for (const q of walkthroughQuestions) {
    const chosen = answers[q.id];
    if (!chosen) continue;
    const opt = q.options.find((o) => o.id === chosen);
    if (!opt) continue;
    for (const [k, v] of Object.entries(opt.weights)) {
      scores[k as PathId] += v ?? 0;
    }
  }
  return scores;
}

export type Recommendation = {
  pathId: PathId;
  scores: Record<PathId, number>;
  platform: string;
  agentType: "Declarative" | "Declarative first" | "Custom engine" | "Depends";
  why: string;
  bestFirstMove: string;
  learnNext: string[]; // module ids
  commonMistake: string;
  whenToRevisit: string;
};

export function recommend(answers: Answers): Recommendation {
  const scores = scoreAnswers(answers);
  const winner = (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] ??
    "fastest-low-code") as PathId;

  const map: Record<PathId, Omit<Recommendation, "pathId" | "scores">> = {
    "fastest-low-code": {
      platform: "Agent Builder (inside Microsoft 365 Copilot)",
      agentType: "Declarative",
      why: "The answers point to speed, narrow scope, and a Microsoft-native home. Agent Builder lets you ship a useful declarative agent in hours, not weeks.",
      bestFirstMove:
        "Open Agent Builder, pick a template, point it at a small curated doc set, write a tight instruction, share with 3–5 people.",
      learnNext: ["agent-builder", "knowledge-instructions-actions", "declarative"],
      commonMistake:
        "Adding actions and broad knowledge before the basic Q&A loop feels right. Most weak agents fail on instructions and scope, not on tooling.",
      whenToRevisit:
        "When you need workflows, channels, analytics, or more than a couple of actions — that's the signal to graduate to Copilot Studio.",
    },
    "structured-low-code": {
      platform: "Copilot Studio",
      agentType: "Declarative first",
      why: "The work is becoming structured, multi-step, or operational. Studio gives you orchestration, tools, channels, testing, and analytics without owning a backend.",
      bestFirstMove:
        "Start with one tool, one knowledge source, and generative orchestration. Add a test pane run before each change.",
      learnNext: [
        "studio",
        "generative-orchestration",
        "topics-tools-children",
        "testing-analytics",
      ],
      commonMistake:
        "Authoring every branch as a topic. Generative orchestration usually picks well from clearly described tools and topics — let it.",
      whenToRevisit:
        "When you need a custom UX shell, dashboards, or saved state that doesn't fit a host channel — that's React-shell territory.",
    },
    "product-led-react": {
      platform: "React app + embedded agent (Studio or custom engine)",
      agentType: "Depends",
      why: "The product is broader than the assistant. You need dashboards, navigation, role-aware state, or a custom journey that a host channel can't carry.",
      bestFirstMove:
        "Embed a Studio agent into one screen of an existing React app. Wire one piece of contextual handoff. Don't rebuild the product around it yet.",
      learnNext: ["react-shell", "studio", "topics-tools-children"],
      commonMistake:
        "Treating chat-on-the-side as the product. The agent should participate in the journey, not float beside it.",
      whenToRevisit:
        "When orchestration, models, or integrations stop fitting Studio's shape — that's when custom engine starts to earn its weight.",
    },
    "high-code-custom": {
      platform: "Custom engine agents (Microsoft 365 Agents SDK)",
      agentType: "Custom engine",
      why: "You need real control over orchestration, models, or integrations — and the cost of owning more of the stack is justified.",
      bestFirstMove:
        "Smallest viable orchestration on one model and one channel. Prove the architectural choice before fanning out.",
      learnNext: ["custom-engine", "react-shell", "testing-analytics"],
      commonMistake:
        "Choosing custom engine before a real limitation in declarative or Studio has appeared. Heaviness is a tax, not a feature.",
      whenToRevisit:
        "Always — if Studio or declarative could have carried the case, simplify back down.",
    },
  };

  return { pathId: winner, scores, ...map[winner] };
}
