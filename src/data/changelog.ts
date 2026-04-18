export type ChangelogEntry = {
  date: string;
  summary: string;
  relatedModuleIds?: string[];
};

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-04-18",
    summary:
      "Collapsed the guide into a sharper home page, merged tradeoff reading into Choose a Path, and upgraded the walkthrough to support drafts, editing, and sharing.",
    relatedModuleIds: ["poc-vs-production", "react-shell"],
  },
  {
    date: "2026-04-12",
    summary:
      "Added continuity features: saved library, recents tracking, learn progress, and freshness markers across guide content.",
    relatedModuleIds: ["testing-analytics", "studio"],
  },
  {
    date: "2026-03-24",
    summary:
      "Expanded the learning field guide around React shell, custom engine, and delivery mindset so the product teaches tradeoffs, not just routes.",
    relatedModuleIds: ["react-shell", "custom-engine", "poc-vs-production"],
  },
];
