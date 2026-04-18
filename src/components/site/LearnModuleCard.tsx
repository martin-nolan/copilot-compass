import type { LearnModule } from "@/data/learnModules";
import { learnExtras } from "@/data/learnExtras";
import { learnModules } from "@/data/learnModules";
import { paths } from "@/data/paths";
import { LearningReferenceList } from "./LearningReferenceList";
import { CommonMistakes } from "./CommonMistakes";
import { TagPill } from "./TagPill";
import { BookmarkButton } from "./BookmarkButton";
import { useLocalStore } from "@/hooks/useLocalStore";
import { Link } from "@tanstack/react-router";
import { Check, Minus, ArrowRight, CircleCheck, Circle } from "lucide-react";
import { useState } from "react";

export function LearnModuleCard({ module, index }: { module: LearnModule; index: number }) {
  const extras = learnExtras[module.id];
  const { state, toggleModuleComplete, hydrated } = useLocalStore();
  const completed = hydrated && state.completedModules.includes(module.id);
  const [refsOpen, setRefsOpen] = useState(false);

  const learnNextMods = (extras?.learnNext ?? [])
    .map((id) => learnModules.find((m) => m.id === id))
    .filter(Boolean);

  return (
    <article id={module.id} className="scroll-mt-24 premium-card p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-baseline gap-4 min-w-0">
          <span className="font-serif italic text-amber/70 text-2xl tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <div className="editorial-eyebrow mb-1.5">Module</div>
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight">
              {module.title}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleModuleComplete(module.id)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
              completed
                ? "border-amber/40 bg-amber/10 text-amber"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {completed ? (
              <CircleCheck className="h-3.5 w-3.5" />
            ) : (
              <Circle className="h-3.5 w-3.5" />
            )}
            {completed ? "Completed" : "Mark complete"}
          </button>
          <BookmarkButton kind="modules" id={module.id} size="sm" />
        </div>
      </div>

      {extras && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          <TagPill tone="amber">Complexity: {extras.complexity}</TagPill>
          {extras.bestForPaths.slice(0, 3).map((pid) => {
            const p = paths.find((x) => x.id === pid);
            return p ? (
              <TagPill key={pid} tone="outline">
                {p.shortName}
              </TagPill>
            ) : null;
          })}
        </div>
      )}

      <p className="mt-5 text-foreground/90 leading-relaxed max-w-3xl">
        {module.summary}
      </p>

      {extras && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-xl border border-border bg-background/30 p-5">
            <div className="editorial-eyebrow mb-2">What it is</div>
            <p className="text-sm text-foreground/90 leading-relaxed">{extras.whatItIs}</p>
          </div>
          <div className="rounded-xl border border-border bg-background/30 p-5">
            <div className="editorial-eyebrow mb-2 text-amber">Why it matters</div>
            <p className="text-sm text-foreground/90 leading-relaxed">{extras.whyItMatters}</p>
          </div>
        </div>
      )}

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="editorial-eyebrow mb-2.5 text-amber">Good for</div>
          <ul className="space-y-1.5">
            {module.goodFor.map((g) => (
              <li key={g} className="flex gap-2 text-sm text-foreground/90 leading-relaxed">
                <Check className="h-3.5 w-3.5 mt-1 shrink-0 text-amber" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="editorial-eyebrow mb-2.5">Less ideal for</div>
          <ul className="space-y-1.5">
            {module.lessIdealFor.map((g) => (
              <li key={g} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                <Minus className="h-3.5 w-3.5 mt-1 shrink-0" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hairline mt-8" />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="editorial-eyebrow mb-1.5">PoC shape</div>
          <p className="text-sm text-foreground/90 leading-relaxed">{module.pocShape}</p>
        </div>
        <div>
          <div className="editorial-eyebrow mb-1.5">Production shape</div>
          <p className="text-sm text-foreground/90 leading-relaxed">{module.productionShape}</p>
        </div>
      </div>

      {extras && extras.commonMistakes.length > 0 && (
        <div className="mt-6">
          <CommonMistakes items={extras.commonMistakes} />
        </div>
      )}

      {extras && (
        <div className="mt-6 rounded-xl border border-amber/30 bg-amber/5 p-5">
          <div className="editorial-eyebrow mb-3 text-amber flex items-center gap-1.5">
            <ArrowRight className="h-3 w-3" /> Read next
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <ProgCue
              label="If you're on a low-code path"
              moduleId={extras.ifLowCodeNext}
            />
            <ProgCue
              label="If you're on the React/product path"
              moduleId={extras.ifReactNext}
            />
            <ProgCue
              label="If you're evaluating production"
              moduleId={extras.ifProductionNext}
            />
          </div>
          {learnNextMods.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {learnNextMods.map((m) => (
                <Link
                  key={m!.id}
                  to="/learn"
                  hash={m!.id}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-background/40 text-foreground/85 hover:text-amber hover:border-amber/40 transition-colors"
                >
                  {m!.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {module.learningReferenceIds.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setRefsOpen((o) => !o)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowRight
              className={`h-3 w-3 transition-transform ${refsOpen ? "rotate-90" : ""}`}
            />
            {refsOpen ? "Hide" : "Show"} official references ({module.learningReferenceIds.length})
          </button>
          {refsOpen && (
            <div className="mt-4">
              <LearningReferenceList ids={module.learningReferenceIds} title="Official references" />
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function ProgCue({ label, moduleId }: { label: string; moduleId?: string }) {
  if (!moduleId) return null;
  const m = learnModules.find((x) => x.id === moduleId);
  if (!m) return null;
  return (
    <Link
      to="/learn"
      hash={m.id}
      className="block rounded-lg border border-border bg-background/40 p-3 hover:border-amber/40 transition-colors group"
    >
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
        {label}
      </div>
      <div className="text-sm font-medium text-foreground/90 group-hover:text-amber transition-colors leading-snug">
        {m.title}
      </div>
    </Link>
  );
}
