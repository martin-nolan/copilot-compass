import { createFileRoute } from "@tanstack/react-router";
import { comparisons } from "@/data/pathways";
import { ComparisonSection } from "@/components/site/ComparisonSection";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare — Copilot Pathways" },
      {
        name: "description",
        content:
          "Side-by-side comparisons: M365 Copilot vs Copilot Studio, PoC vs Production, Microsoft-native vs React app.",
      },
      { property: "og:title", content: "Compare — Copilot Pathways" },
      {
        property: "og:description",
        content:
          "Practical tradeoffs across Copilot paths, PoC vs Production, and where the experience should live.",
      },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <div className="editorial-eyebrow mb-4">Compare</div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
          Tradeoffs, side by side.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Three lenses for the same decision: which path, which mode, and
          where the experience actually lives.
        </p>
      </div>

      {/* anchor nav */}
      <div className="mt-10 flex flex-wrap gap-2">
        {comparisons.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-amber/40 transition-colors"
          >
            {c.title}
          </a>
        ))}
      </div>

      <div className="mt-20 space-y-28">
        {comparisons.map((c) => (
          <ComparisonSection key={c.id} comparison={c} />
        ))}
      </div>
    </div>
  );
}
