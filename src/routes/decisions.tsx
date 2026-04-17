import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useDecisions } from "@/hooks/useDecisions";
import { DecisionCard } from "@/components/site/DecisionCard";
import { DecisionForm } from "@/components/site/DecisionForm";
import { Button } from "@/components/ui/button";
import { pathFilters, type PathFilter } from "@/data/pathways";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/decisions")({
  head: () => ({
    meta: [
      { title: "Decisions — Copilot Pathways" },
      {
        name: "description",
        content:
          "Capture personal Copilot implementation decisions — chosen path, PoC notes, production notes, next steps.",
      },
      { property: "og:title", content: "Decisions — Copilot Pathways" },
      {
        property: "og:description",
        content:
          "A lightweight, local-only place to record Copilot implementation decisions.",
      },
    ],
  }),
  component: DecisionsPage,
});

function DecisionsPage() {
  const { decisions, add, remove, hydrated } = useDecisions();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<PathFilter>("All");

  const visible = useMemo(() => {
    if (filter === "All") return decisions;
    return decisions.filter((d) => d.chosenPath.includes(filter));
  }, [decisions, filter]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="max-w-2xl">
          <div className="editorial-eyebrow mb-4">Decisions</div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
            Notes you'll thank yourself for.
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            A lightweight place to capture which path you chose, why it felt
            right, and what to do next. Stored locally, just for you.
          </p>
        </div>
        <Button
          onClick={() => setShowForm((s) => !s)}
          className="bg-amber text-amber-foreground hover:bg-amber/90"
        >
          <Plus className="h-4 w-4 mr-1" />
          {showForm ? "Close" : "New decision"}
        </Button>
      </div>

      <div className="hairline mt-12" />

      {showForm && (
        <div className="mt-10">
          <DecisionForm
            onSave={(d) => {
              add(d);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="mt-10 flex items-center gap-2 flex-wrap">
        {pathFilters.map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full border transition-colors",
              filter === p
                ? "bg-amber/10 text-amber border-amber/30"
                : "bg-transparent text-muted-foreground border-border hover:text-foreground",
            )}
          >
            {p}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">
          {hydrated ? `${visible.length} of ${decisions.length}` : "—"}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {hydrated && visible.length === 0 && (
          <div className="premium-card p-12 text-center">
            <div className="editorial-eyebrow mb-2">Empty</div>
            <p className="text-muted-foreground">
              {decisions.length === 0
                ? "No decisions yet. Capture the first one when you're ready."
                : "No decisions match this filter."}
            </p>
          </div>
        )}

        {visible.map((d) => (
          <DecisionCard key={d.id} decision={d} onDelete={remove} />
        ))}
      </div>
    </div>
  );
}
