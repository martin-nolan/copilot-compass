import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Plus, Download, Upload, Info, Check } from "lucide-react";
import { useDecisions, type Decision } from "@/hooks/useDecisions";
import { DecisionCard } from "@/components/site/DecisionCard";
import { DecisionForm } from "@/components/site/DecisionForm";
import { Button } from "@/components/ui/button";
import { pathFilters, type PathFilter } from "@/data/pathways";
import { cn } from "@/lib/utils";
import { useLocalStore } from "@/hooks/useLocalStore";

export const Route = createFileRoute("/decisions")({
  head: () => ({
    meta: [
      { title: "Decisions — Copilot Pathways" },
      {
        name: "description",
        content:
          "Capture personal Copilot implementation decisions — chosen path, agent type, PoC and production notes, and what to learn next.",
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
  const { decisions, add, remove, replaceAll, hydrated } = useDecisions();
  const localStore = useLocalStore();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<PathFilter>("All");
  const [feedback, setFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const visible = useMemo(() => {
    if (filter === "All") return decisions;
    return decisions.filter((d) => d.chosenPath.includes(filter));
  }, [decisions, filter]);

  const flash = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2200);
  };

  const exportAll = () => {
    const blob = {
      exportedAt: new Date().toISOString(),
      version: 1,
      decisions,
      store: localStore.state,
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(blob, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `copilot-pathways-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    flash("Exported");
  };

  const onImportFile = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed?.decisions)) {
        replaceAll(parsed.decisions as Decision[]);
      }
      if (parsed?.store) {
        localStore.importStore(parsed.store);
      }
      flash("Imported");
    } catch {
      flash("Couldn't read that file");
    }
  };

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
            right, and what to do next.
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

      <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground rounded-lg border border-border bg-background/40 p-3 max-w-2xl">
        <Info className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber" />
        <p>
          These decisions are stored locally in this browser and may be deleted
          if local storage is cleared. Use Export to back them up or move them
          between devices.
        </p>
      </div>

      <div className="hairline mt-10" />

      {showForm && (
        <div className="mt-10">
          <DecisionForm
            onSave={(d) => {
              add(d);
              setShowForm(false);
              flash("Decision saved");
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
        <span className="ml-auto flex items-center gap-2">
          <button
            onClick={exportAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md border border-border"
          >
            <Download className="h-3 w-3" /> Export
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md border border-border"
          >
            <Upload className="h-3 w-3" /> Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onImportFile(f);
              e.target.value = "";
            }}
          />
          <span className="text-xs text-muted-foreground">
            {hydrated ? `${visible.length} of ${decisions.length}` : "—"}
          </span>
        </span>
      </div>

      {feedback && (
        <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-amber rounded-full border border-amber/30 bg-amber/10 px-3 py-1.5">
          <Check className="h-3 w-3" />
          {feedback}
        </div>
      )}

      <div className="mt-6 space-y-4">
        {hydrated && visible.length === 0 && (
          <div className="premium-card p-12 text-center">
            <div className="editorial-eyebrow mb-2">Empty</div>
            <p className="text-muted-foreground">
              {decisions.length === 0
                ? "Save route choices, first moves, and what to learn next."
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
