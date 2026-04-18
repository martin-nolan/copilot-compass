import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { comparisons } from "@/data/pathways";
import { ComparisonSection } from "@/components/site/ComparisonSection";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare — Copilot Pathways" },
      {
        name: "description",
        content:
          "Side-by-side comparisons: Agent Builder vs Copilot Studio, Declarative vs Custom Engine, Microsoft-native vs React, PoC vs Production.",
      },
      { property: "og:title", content: "Compare — Copilot Pathways" },
      {
        property: "og:description",
        content:
          "Practical tradeoffs across Copilot paths, with a clear bottom-line recommendation for each.",
      },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const [activeId, setActiveId] = useState<string>(comparisons[0]?.id ?? "");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    comparisons.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <div className="editorial-eyebrow mb-4">Compare</div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
          Tradeoffs, side by side.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Four lenses for the same decision: which platform, which approach,
          where the experience lives, and which delivery mode you're in. Each
          comparison ends with a clear bottom-line.
        </p>
      </div>

      {/* sticky tab nav */}
      <div className="sticky top-16 z-30 -mx-6 px-6 mt-10 py-3 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex flex-wrap gap-2">
          {comparisons.map((c) => {
            const active = activeId === c.id;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  active
                    ? "bg-amber/10 text-amber border-amber/40"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-border-strong"
                }`}
              >
                {c.title}
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-16 space-y-28">
        {comparisons.map((c) => (
          <ComparisonSection key={c.id} comparison={c} />
        ))}
      </div>
    </div>
  );
}
