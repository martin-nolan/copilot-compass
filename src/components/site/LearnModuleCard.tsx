import type { LearnModule } from "@/data/learnModules";
import { learnExtras } from "@/data/learnExtras";
import { learnModules } from "@/data/learnModules";
import { paths } from "@/data/paths";
import { LearningReferenceList } from "./LearningReferenceList";
import { CommonMistakes } from "./CommonMistakes";
import { TagPill } from "./TagPill";
import { BookmarkButton } from "./BookmarkButton";
import { useLocalStore } from "@/hooks/useLocalStore";
import { useTrackRecentOnView } from "@/hooks/useTrackRecentOnView";
import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, CircleCheck, Circle } from "lucide-react";
import { useMemo, useState } from "react";
import { cn, daysSince, formatMonthYear } from "@/lib/utils";

export function LearnModuleCard({ module, index }: { module: LearnModule; index: number }) {
  const extras = learnExtras[module.id];
  const { state, toggleModuleComplete, hydrated } = useLocalStore();
  const completed = hydrated && state.completedModules.includes(module.id);
  const [refsOpen, setRefsOpen] = useState(false);
  const [shapeView, setShapeView] = useState<"poc" | "production">("poc");
  const recentRef = useTrackRecentOnView(
    useMemo(
      () => ({
        type: "module" as const,
        id: module.id,
        label: module.title,
        href: `/learn#${module.id}`,
      }),
      [module.id, module.title],
    ),
  );

  const learnNextMods = (extras?.learnNext ?? [])
    .map((id) => learnModules.find((m) => m.id === id))
    .filter(Boolean);
  const relatedModules = (module.relatedModuleIds ?? [])
    .map((id) => learnModules.find((candidate) => candidate.id === id))
    .filter(Boolean);
  const isStale = daysSince(module.reviewedAt) > 180;

  return (
    <article id={module.id} className="scroll-mt-24 premium-card p-6 sm:p-8" ref={recentRef}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-baseline gap-4 min-w-0">
          <span className="font-serif italic text-amber/70 text-2xl tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <div className="editorial-eyebrow mb-1.5">Module</div>
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight">{module.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleModuleComplete(module.id)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none ${
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
          <TagPill tone={isStale ? "amber" : "muted"}>
            {isStale ? "Worth re-checking" : `Reviewed ${formatMonthYear(module.reviewedAt)}`}
          </TagPill>
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

      <p className="mt-5 text-foreground/90 leading-relaxed max-w-3xl">{module.summary}</p>

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
        <div className="rounded-xl border border-border bg-background/30 p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="editorial-eyebrow">Shape in practice</div>
            <div className="flex rounded-full border border-border bg-background/40 p-1">
              <button
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] transition-colors focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none",
                  shapeView === "poc" ? "bg-amber text-amber-foreground" : "text-muted-foreground",
                )}
                onClick={() => setShapeView("poc")}
                type="button"
              >
                PoC
              </button>
              <button
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] transition-colors focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none",
                  shapeView === "production"
                    ? "bg-amber text-amber-foreground"
                    : "text-muted-foreground",
                )}
                onClick={() => setShapeView("production")}
                type="button"
              >
                Production
              </button>
            </div>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {shapeView === "poc" ? module.pocShape : module.productionShape}
          </p>
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
            <ProgCue label="If you're on a low-code path" moduleId={extras.ifLowCodeNext} />
            <ProgCue label="If you're on the React/product path" moduleId={extras.ifReactNext} />
            <ProgCue label="If you're evaluating production" moduleId={extras.ifProductionNext} />
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

      {relatedModules.length > 0 && (
        <div className="mt-6">
          <div className="editorial-eyebrow mb-3">See also</div>
          <div className="flex flex-wrap gap-2">
            {relatedModules.map((related) => (
              <Link
                key={related!.id}
                to="/learn"
                hash={related!.id}
                className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-foreground/85 transition-colors hover:border-amber/40 hover:text-amber"
              >
                {related!.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {module.learningReferenceIds.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setRefsOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
          >
            <ArrowRight className={`h-3 w-3 transition-transform ${refsOpen ? "rotate-90" : ""}`} />
            {refsOpen ? "Hide" : "Show"} official references ({module.learningReferenceIds.length})
          </button>
          {refsOpen && (
            <div className="mt-4">
              <LearningReferenceList
                ids={module.learningReferenceIds}
                title="Official references"
              />
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
