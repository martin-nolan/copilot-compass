import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { paths, type PathDef } from "@/data/paths";
import { learnModules } from "@/data/learnModules";
import { comparisons, useCases } from "@/data/pathways";
import { TagPill } from "@/components/site/TagPill";
import { BookmarkButton } from "@/components/site/BookmarkButton";
import { LearningReferenceList } from "@/components/site/LearningReferenceList";
import { ComparisonSection } from "@/components/site/ComparisonSection";
import { useLocalStore } from "@/hooks/useLocalStore";
import { ArrowRight, Check, ChevronDown, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/choose-path")({
  head: () => ({
    meta: [
      { title: "Choose a Path — Copilot Compass" },
      {
        name: "description",
        content:
          "Pick the right Copilot build path: fastest low-code, structured low-code, product-led React, or high-code custom engine.",
      },
      { property: "og:title", content: "Choose a Path — Copilot Compass" },
      {
        property: "og:description",
        content:
          "Four routes to a Copilot agent. Choose the lightest path that fits the problem — and only move heavier when a real limitation appears.",
      },
    ],
  }),
  component: ChoosePathPage,
});

function ChoosePathPage() {
  const { state, hydrated, setCurrentPath } = useLocalStore();
  const current = hydrated ? state.currentPath : null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-3xl">
        <div className="editorial-eyebrow mb-4">Choose a Path</div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
          Pick the lightest path that fits the problem.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Four practical routes. Stay light until a real limitation forces more weight. If you are
          unsure,{" "}
          <Link to="/walkthrough" className="text-amber">
            take the walkthrough
          </Link>
          .
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          to="/walkthrough"
          className="inline-flex items-center gap-2 rounded-md bg-amber px-4 py-2 text-sm font-medium text-amber-foreground transition-colors hover:bg-amber/90"
        >
          <Compass className="h-4 w-4" /> Take the walkthrough
        </Link>
        {current ? (
          <span className="text-xs text-muted-foreground">
            Current focus:{" "}
            <span className="text-amber">
              {paths.find((path) => path.id === current)?.shortName}
            </span>
          </span>
        ) : null}
      </div>

      <div className="mt-16 space-y-6">
        {paths.map((path) => (
          <PathSummary
            key={path.id}
            isCurrent={current === path.id}
            onSetCurrent={() => setCurrentPath(current === path.id ? null : path.id)}
            path={path}
          />
        ))}
      </div>

      <section className="mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="editorial-eyebrow mb-2">Tradeoffs</div>
            <h2 className="text-3xl font-medium tracking-tight">Side-by-side lenses</h2>
          </div>
          <Link
            to="/walkthrough"
            className="text-sm text-muted-foreground transition-colors hover:text-amber"
          >
            Still unsure? Re-run the walkthrough
          </Link>
        </div>
        <div className="mt-10 space-y-24">
          {comparisons.map((comparison) => (
            <ComparisonSection key={comparison.id} comparison={comparison} />
          ))}
        </div>
      </section>
    </div>
  );
}

function PathSummary({
  path,
  isCurrent,
  onSetCurrent,
}: {
  path: PathDef;
  isCurrent: boolean;
  onSetCurrent: () => void;
}) {
  const [open, setOpen] = useState(false);
  const learnNextMods = path.learnNext
    .map((id) => learnModules.find((module) => module.id === id))
    .filter(Boolean);
  const relComparisons = comparisons.filter((comparison) =>
    path.relatedComparisons.includes(comparison.id),
  );
  const relUseCases = useCases.filter((useCase) => path.relatedUseCaseIds.includes(useCase.id));

  return (
    <article id={path.id} className="scroll-mt-24 premium-card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-4">
            <span className="font-serif italic text-amber/70 text-3xl tabular-nums leading-none">
              {path.number}
            </span>
            <div>
              <div className="editorial-eyebrow mb-1.5">{path.eyebrow}</div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">{path.name}</h2>
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-foreground/90 leading-relaxed">{path.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <TagPill tone="amber">Complexity: {path.complexity}</TagPill>
            <TagPill tone="outline">Best fit: {path.bestFitMode}</TagPill>
            {path.focus.slice(0, 3).map((focus) => (
              <TagPill key={focus} tone="muted">
                {focus}
              </TagPill>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-amber/30 bg-amber/5 p-5">
            <div className="editorial-eyebrow mb-1.5 flex items-center gap-1.5 text-amber">
              <ArrowRight className="h-3 w-3" /> Best first move
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">{path.bestFirstMove}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            onClick={onSetCurrent}
            type="button"
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none ${
              isCurrent
                ? "border-amber/40 bg-amber/10 text-amber"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {isCurrent ? <Check className="h-3.5 w-3.5" /> : null}
            {isCurrent ? "Current focus" : "Set as my path"}
          </button>
          <BookmarkButton kind="paths" id={path.id} size="sm" />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
        >
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          {open ? "Hide full profile" : "Full profile"}
        </button>
      </div>

      {open ? (
        <>
          <div className="hairline my-8" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Block label="When this is right" value={path.whenRight} />
            <Block label="Why this path" value={path.whyThis} />
            <Block label="Key tradeoff" value={path.keyTradeoff} />
            <Block label="Avoid if" value={path.avoidIf} />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div>
              <div className="editorial-eyebrow mb-3">Learn next</div>
              <ul className="space-y-2">
                {learnNextMods.map((module) => (
                  <li key={module!.id}>
                    <Link
                      to="/learn"
                      hash={module!.id}
                      className="group flex items-start gap-2 text-sm text-foreground/90 transition-colors hover:text-amber"
                    >
                      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-amber" />
                      <span>{module!.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="editorial-eyebrow mb-3">Tradeoffs to read</div>
              <ul className="space-y-2">
                {relComparisons.map((comparison) => (
                  <li key={comparison.id}>
                    <a
                      href={`#${comparison.id}`}
                      className="group flex items-start gap-2 text-sm text-foreground/90 transition-colors hover:text-amber"
                    >
                      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-amber" />
                      <span>{comparison.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="editorial-eyebrow mb-3">Related use cases</div>
              <ul className="space-y-2">
                {relUseCases.map((useCase) => (
                  <li key={useCase.id}>
                    <Link
                      to="/use-cases"
                      className="group flex items-start gap-2 text-sm text-foreground/90 transition-colors hover:text-amber"
                    >
                      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-amber" />
                      <span>{useCase.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {path.learningReferenceIds.length > 0 ? (
            <div className="mt-10">
              <LearningReferenceList ids={path.learningReferenceIds} title="Recommended learning" />
            </div>
          ) : null}
        </>
      ) : null}
    </article>
  );
}

function Block({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="editorial-eyebrow mb-1.5">{label}</div>
      <p className="text-sm text-foreground/90 leading-relaxed">{value}</p>
    </div>
  );
}
