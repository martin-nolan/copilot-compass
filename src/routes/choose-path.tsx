import { createFileRoute, Link } from "@tanstack/react-router";
import { paths, type PathDef } from "@/data/paths";
import { learnModules } from "@/data/learnModules";
import { comparisons, useCases } from "@/data/pathways";
import { TagPill } from "@/components/site/TagPill";
import { BookmarkButton } from "@/components/site/BookmarkButton";
import { LearningReferenceList } from "@/components/site/LearningReferenceList";
import { useLocalStore } from "@/hooks/useLocalStore";
import { ArrowRight, Check, Compass } from "lucide-react";

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
          Four practical routes to a Copilot agent. Start light, and only move to
          a heavier path when a real limitation forces it. If you're not sure,{" "}
          <Link to="/walkthrough" className="text-amber hover:text-amber/80">
            take the walkthrough
          </Link>
          .
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          to="/walkthrough"
          className="inline-flex items-center gap-2 rounded-md bg-amber px-4 py-2 text-sm font-medium text-amber-foreground hover:bg-amber/90 transition-colors"
        >
          <Compass className="h-4 w-4" /> Take the walkthrough
        </Link>
        {current && (
          <span className="text-xs text-muted-foreground">
            Current focus:{" "}
            <span className="text-amber">
              {paths.find((p) => p.id === current)?.shortName}
            </span>
          </span>
        )}
      </div>

      <div className="mt-16 space-y-10">
        {paths.map((p) => (
          <PathDetail
            key={p.id}
            path={p}
            isCurrent={current === p.id}
            onSetCurrent={() => setCurrentPath(current === p.id ? null : p.id)}
          />
        ))}
      </div>
    </div>
  );
}

function PathDetail({
  path,
  isCurrent,
  onSetCurrent,
}: {
  path: PathDef;
  isCurrent: boolean;
  onSetCurrent: () => void;
}) {
  const learnNextMods = path.learnNext
    .map((id) => learnModules.find((m) => m.id === id))
    .filter(Boolean);
  const relComparisons = comparisons.filter((c) => path.relatedComparisons.includes(c.id));
  const relUseCases = useCases.filter((u) => path.relatedUseCaseIds.includes(u.id));

  return (
    <article id={path.id} className="scroll-mt-24 premium-card p-6 sm:p-10">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-4">
            <span className="font-serif italic text-amber/70 text-3xl tabular-nums leading-none">
              {path.number}
            </span>
            <div>
              <div className="editorial-eyebrow mb-1.5">{path.eyebrow}</div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">
                {path.name}
              </h2>
            </div>
          </div>
          <p className="mt-4 text-foreground/90 leading-relaxed max-w-3xl">
            {path.tagline}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <TagPill tone="amber">Complexity: {path.complexity}</TagPill>
            <TagPill tone="outline">Best fit: {path.bestFitMode}</TagPill>
            {path.focus.slice(0, 4).map((f) => (
              <TagPill key={f} tone="muted">
                {f}
              </TagPill>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <button
            onClick={onSetCurrent}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
              isCurrent
                ? "bg-amber/10 border-amber/40 text-amber"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {isCurrent ? <Check className="h-3.5 w-3.5" /> : null}
            {isCurrent ? "Current focus" : "Set as my path"}
          </button>
          <BookmarkButton kind="paths" id={path.id} size="sm" />
        </div>
      </div>

      <div className="hairline my-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Block label="When this is right" value={path.whenRight} />
        <Block label="Why this path" value={path.whyThis} />
        <Block label="Key tradeoff" value={path.keyTradeoff} />
        <Block label="Avoid if" value={path.avoidIf} />
      </div>

      <div className="mt-6 rounded-xl border border-amber/30 bg-amber/5 p-5">
        <div className="editorial-eyebrow text-amber mb-1.5 flex items-center gap-1.5">
          <ArrowRight className="h-3 w-3" /> Best first move
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">{path.bestFirstMove}</p>
      </div>

      <div className="hairline my-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <div className="editorial-eyebrow mb-3">Learn next</div>
          <ul className="space-y-2">
            {learnNextMods.map((m) => (
              <li key={m!.id}>
                <Link
                  to="/learn"
                  hash={m!.id}
                  className="group flex items-start gap-2 text-sm text-foreground/90 hover:text-amber transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5 mt-1 shrink-0 text-muted-foreground group-hover:text-amber" />
                  <span>{m!.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="editorial-eyebrow mb-3">Related comparisons</div>
          <ul className="space-y-2">
            {relComparisons.map((c) => (
              <li key={c.id}>
                <Link
                  to="/compare"
                  hash={c.id}
                  className="group flex items-start gap-2 text-sm text-foreground/90 hover:text-amber transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5 mt-1 shrink-0 text-muted-foreground group-hover:text-amber" />
                  <span>{c.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="editorial-eyebrow mb-3">Related use cases</div>
          <ul className="space-y-2">
            {relUseCases.map((u) => (
              <li key={u.id}>
                <Link
                  to="/use-cases"
                  className="group flex items-start gap-2 text-sm text-foreground/90 hover:text-amber transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5 mt-1 shrink-0 text-muted-foreground group-hover:text-amber" />
                  <span>{u.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {path.learningReferenceIds.length > 0 && (
        <div className="mt-10">
          <LearningReferenceList ids={path.learningReferenceIds} title="Recommended learning" />
        </div>
      )}
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
