import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Download, Info, Plus, Upload, Check } from "lucide-react";
import { useDecisions, type Decision } from "@/hooks/useDecisions";
import { DecisionCard } from "@/components/site/DecisionCard";
import { DecisionForm } from "@/components/site/DecisionForm";
import { Button } from "@/components/ui/button";
import { decisionPathFilters, type DecisionPathFilter } from "@/data/paths";
import { cn, daysSince } from "@/lib/utils";
import { useLocalStore } from "@/hooks/useLocalStore";

export const Route = createFileRoute("/decisions")({
  head: () => ({
    meta: [
      { title: "Decisions — Copilot Compass" },
      {
        name: "description",
        content:
          "Capture personal Copilot implementation decisions — chosen path, agent type, PoC and production notes, and what to learn next.",
      },
      { property: "og:title", content: "Decisions — Copilot Compass" },
      {
        property: "og:description",
        content: "A lightweight, local-only place to record Copilot implementation decisions.",
      },
    ],
  }),
  component: DecisionsPage,
});

function DecisionsPage() {
  const { decisions, add, update, remove, replaceAll, hydrated } = useDecisions();
  const localStore = useLocalStore();
  const backup = localStore.getBackup();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Decision | null>(null);
  const [filter, setFilter] = useState<DecisionPathFilter>("All");
  const [feedback, setFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const visible = useMemo(() => {
    if (filter === "All") return decisions;
    return decisions.filter((decision) => decision.chosenPath === filter);
  }, [decisions, filter]);

  const flash = (message: string) => {
    setFeedback(message);
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
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `copilot-compass-export-${Date.now()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    flash("Exported");
  };

  const onImportFile = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed?.decisions)) replaceAll(parsed.decisions as Decision[]);
      if (parsed?.store) localStore.importStore(parsed.store);
      flash("Imported");
    } catch {
      flash("Couldn't read that file");
    }
  };

  const flagsForDecision = (decision: Decision) => {
    const flags: string[] = [];

    if (decision.chosenPath === "High-code custom" && !decision.productionNotes.trim()) {
      flags.push("Heaviest path, lightest notes — revisit.");
    }

    if (decision.mode === "Production" && !decision.nextSteps.trim()) {
      flags.push("Production call with no learning anchored to it yet.");
    }

    if (daysSince(decision.updatedAt ?? decision.createdAt) > 90) {
      flags.push("Worth re-reading — the ecosystem has moved.");
    }

    return flags;
  };

  const activeDecision = editing;

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="editorial-eyebrow mb-4">Decisions</div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
            Notes you will thank yourself for.
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Capture which path you chose, why, what still feels risky, and the next thing that
            should happen.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setShowForm((current) => !current);
          }}
          className="bg-amber text-amber-foreground hover:bg-amber/90"
        >
          <Plus className="mr-1 h-4 w-4" />
          {showForm ? "Close" : "New decision"}
        </Button>
      </div>

      <div className="mt-6 max-w-2xl rounded-lg border border-border bg-background/40 p-3 text-xs text-muted-foreground">
        <div className="flex items-start gap-2">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber" />
          <p>
            Decisions stay local to this browser. Export is the portable backup. Weekly auto-backups
            stay in local storage too.
          </p>
        </div>
        {backup ? (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span>Last auto-backup: {daysSince(backup.savedAt)} days ago</span>
            <button
              type="button"
              onClick={() => {
                if (localStore.restoreBackup()) flash("Backup restored");
              }}
              className="text-amber transition-colors hover:text-amber/80"
            >
              Restore
            </button>
          </div>
        ) : null}
      </div>

      {(showForm || activeDecision) && (
        <div className="mt-10">
          <DecisionForm
            initialValue={activeDecision ?? undefined}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
            onSave={(decision) => {
              if (activeDecision) {
                update(activeDecision.id, decision);
                flash("Decision updated");
              } else {
                add(decision);
                flash("Decision saved");
              }
              setShowForm(false);
              setEditing(null);
            }}
            submitLabel={activeDecision ? "Update decision" : "Save decision"}
          />
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-2">
        {decisionPathFilters.map((pathFilter) => (
          <button
            key={pathFilter}
            onClick={() => setFilter(pathFilter)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none",
              filter === pathFilter
                ? "border-amber/30 bg-amber/10 text-amber"
                : "border-border bg-transparent text-muted-foreground hover:text-foreground",
            )}
            type="button"
          >
            {pathFilter}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-2">
          <button
            onClick={exportAll}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            type="button"
          >
            <Download className="h-3 w-3" /> Export
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            type="button"
          >
            <Upload className="h-3 w-3" /> Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void onImportFile(file);
              event.target.value = "";
            }}
          />
          <span className="text-xs text-muted-foreground">
            {hydrated ? `${visible.length} of ${decisions.length}` : "—"}
          </span>
        </span>
      </div>

      {feedback ? (
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-3 py-1.5 text-xs text-amber">
          <Check className="h-3 w-3" />
          {feedback}
        </div>
      ) : null}

      <div className="mt-6 space-y-4">
        {hydrated && visible.length === 0 ? (
          <div className="premium-card p-12 text-center">
            <div className="editorial-eyebrow mb-2">Empty</div>
            <p className="text-muted-foreground">
              {decisions.length === 0
                ? "Save route choices, first moves, and what to learn next."
                : "No decisions match this filter."}
            </p>
          </div>
        ) : null}

        {visible.map((decision) => (
          <DecisionCard
            key={decision.id}
            decision={decision}
            flags={flagsForDecision(decision)}
            onDelete={remove}
            onEdit={(item) => {
              setEditing(item);
              setShowForm(true);
            }}
          />
        ))}
      </div>
    </div>
  );
}
