import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Sparkles, ArrowUpRight } from "lucide-react";
import { paths, getPath } from "@/data/paths";
import { learnModules } from "@/data/learnModules";
import { comparisons, useCases } from "@/data/pathways";
import { TagPill } from "@/components/site/TagPill";
import { useLocalStore } from "@/hooks/useLocalStore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Copilot Pathways — Decide what to build with Copilot" },
      {
        name: "description",
        content:
          "A premium decision and learning hub for choosing the right Copilot path: low-code, structured low-code, React-led, or high-code custom engine.",
      },
      { property: "og:title", content: "Copilot Pathways" },
      {
        property: "og:description",
        content:
          "Decide what to learn next and which Copilot build path fits the idea — Agent Builder, Studio, React, or custom engine.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { state, hydrated } = useLocalStore();
  const currentPath = hydrated ? getPath(state.currentPath) : undefined;
  const lastRec = hydrated ? state.lastRecommendation : null;
  const recents = hydrated ? state.recents.slice(0, 4) : [];

  return (
    <div>
      {/* HERO */}
      <section className="relative hero-glow">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-20 sm:pt-28 sm:pb-24">
          <div className="editorial-eyebrow mb-6">Decision & learning hub</div>
          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight max-w-4xl leading-[1.1] pb-2">
            Choose the right{" "}
            <span className="text-amber-grad font-serif italic inline-block pr-1.5">
              Copilot
            </span>
            <br className="hidden sm:block" />
            path before you build.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            The place to decide what to learn next and which build path fits the
            idea — Agent Builder, Copilot Studio, a React app shell, or a
            custom engine. Low-code or high-code. PoC or production.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/walkthrough"
              className="inline-flex items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-medium text-amber-foreground hover:bg-amber/90 transition-colors shadow-[0_0_60px_-10px_var(--color-amber)]"
            >
              <Compass className="h-4 w-4" /> Take the walkthrough
            </Link>
            <Link
              to="/choose-path"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Choose a path
            </Link>
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 rounded-md text-muted-foreground hover:text-foreground px-3 py-2.5 text-sm font-medium transition-colors"
            >
              Browse the field guide
            </Link>
          </div>
        </div>
      </section>

      {/* CONTINUITY */}
      {hydrated && (currentPath || lastRec || recents.length > 0) && (
        <section className="mx-auto max-w-6xl px-6 mt-4">
          <div className="hairline" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-10">
            {currentPath ? (
              <Link
                to="/choose-path"
                hash={currentPath.id}
                className="premium-card p-5 group"
              >
                <div className="editorial-eyebrow mb-2 text-amber">Your current path</div>
                <div className="text-lg font-medium tracking-tight">{currentPath.name}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {currentPath.tagline}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-amber opacity-0 group-hover:opacity-100 transition-opacity">
                  Open path <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ) : (
              <Link to="/choose-path" className="premium-card p-5 group">
                <div className="editorial-eyebrow mb-2">Your current path</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  No path set yet. Pick one in Choose a Path or take the
                  walkthrough.
                </div>
              </Link>
            )}

            {lastRec ? (
              <Link to="/walkthrough" className="premium-card p-5 group">
                <div className="editorial-eyebrow mb-2 text-amber">Your last recommendation</div>
                <div className="text-lg font-medium tracking-tight">
                  {getPath(lastRec.recommendation.pathId)?.shortName}
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {lastRec.recommendation.bestFirstMove}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-amber opacity-0 group-hover:opacity-100 transition-opacity">
                  Re-take walkthrough <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ) : (
              <Link to="/walkthrough" className="premium-card p-5 group">
                <div className="editorial-eyebrow mb-2">Your last recommendation</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  No recommendation yet. The walkthrough takes about two
                  minutes.
                </div>
              </Link>
            )}

            <div className="premium-card p-5">
              <div className="editorial-eyebrow mb-2">Continue where you left off</div>
              {recents.length === 0 ? (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pages you visit will show up here.
                </p>
              ) : (
                <ul className="space-y-2">
                  {recents.slice(0, 3).map((r) => (
                    <li key={`${r.type}-${r.id}`}>
                      <a
                        href={r.href}
                        className="group flex items-start justify-between gap-2 text-sm text-foreground/90 hover:text-amber transition-colors"
                      >
                        <span className="line-clamp-1">{r.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-amber shrink-0 mt-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="hairline" />
        </section>
      )}

      {/* CHOOSE YOUR ROUTE PREVIEW */}
      <section className="mx-auto max-w-6xl px-6 mt-20">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <div className="editorial-eyebrow mb-2">Choose your route</div>
            <h2 className="text-3xl font-medium tracking-tight">
              Four paths. Pick the lightest one that fits.
            </h2>
          </div>
          <Link
            to="/choose-path"
            className="text-sm text-muted-foreground hover:text-amber transition-colors inline-flex items-center gap-1"
          >
            All paths <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paths.map((p) => (
            <Link
              key={p.id}
              to="/choose-path"
              hash={p.id}
              className="premium-card group p-5 flex flex-col"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-serif italic text-amber/60 text-xl tabular-nums">
                  {p.number}
                </span>
                <TagPill tone="muted">{p.complexity}</TagPill>
              </div>
              <h3 className="mt-4 text-base font-medium leading-snug">{p.name}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {p.tagline}
              </p>
              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                  First move
                </div>
                <p className="text-xs text-foreground/85 leading-relaxed line-clamp-2">
                  {p.bestFirstMove}
                </p>
              </div>
              <div className="mt-auto pt-4 inline-flex items-center gap-1 text-xs text-amber opacity-0 group-hover:opacity-100 transition-opacity">
                Open <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WALKTHROUGH CTA */}
      <section className="mx-auto max-w-6xl px-6 mt-24">
        <div className="premium-card relative overflow-hidden p-10 sm:p-14 bg-gradient-to-br from-amber/10 via-transparent to-transparent">
          <div className="absolute inset-0 hero-glow opacity-50 pointer-events-none" />
          <div className="relative max-w-2xl">
            <div className="editorial-eyebrow text-amber mb-3 inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" /> Decision walkthrough
            </div>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight leading-tight">
              Not sure where to start? Take the walkthrough.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Six to eight short questions, one tailored recommendation: which
              path, which platform, which agent type, the best first move, and
              what to learn next.
            </p>
            <div className="mt-7">
              <Link
                to="/walkthrough"
                className="inline-flex items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-medium text-amber-foreground hover:bg-amber/90 transition-colors"
              >
                Start walkthrough <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COMPARISONS */}
      <section className="mx-auto max-w-6xl px-6 mt-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="editorial-eyebrow mb-2">Featured comparisons</div>
            <h2 className="text-3xl font-medium tracking-tight">Tradeoffs at a glance</h2>
          </div>
          <Link
            to="/compare"
            className="text-sm text-muted-foreground hover:text-amber transition-colors hidden sm:inline-flex items-center gap-1"
          >
            All comparisons <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comparisons.slice(0, 3).map((c) => (
            <Link
              key={c.id}
              to="/compare"
              hash={c.id}
              className="premium-card group p-6"
            >
              <div className="editorial-eyebrow mb-3">Comparison</div>
              <h3 className="text-lg font-medium leading-snug">{c.title}</h3>
              <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                {c.summary}
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-sm text-amber opacity-0 group-hover:opacity-100 transition-opacity">
                Read comparison <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED USE CASES */}
      <section className="mx-auto max-w-6xl px-6 mt-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="editorial-eyebrow mb-2">Use cases</div>
            <h2 className="text-3xl font-medium tracking-tight">
              Real shapes, not abstractions.
            </h2>
          </div>
          <Link
            to="/use-cases"
            className="text-sm text-muted-foreground hover:text-amber transition-colors hidden sm:inline-flex items-center gap-1"
          >
            All use cases <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((u) => (
            <Link
              key={u.id}
              to="/use-cases"
              className="premium-card group p-6"
            >
              <div className="editorial-eyebrow mb-2">Use Case</div>
              <h3 className="text-base font-medium">{u.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {u.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* LEARN PROMO */}
      <section className="mx-auto max-w-6xl px-6 mt-24">
        <div className="hairline mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div>
            <div className="editorial-eyebrow mb-3">Field guide</div>
            <h2 className="text-2xl font-medium tracking-tight">
              Learn the agent landscape, in chapters.
            </h2>
            <Link
              to="/learn"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-amber hover:text-amber/80 transition-colors"
            >
              Open Learn <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {learnModules.slice(0, 4).map((m) => (
              <Link
                key={m.id}
                to="/learn"
                hash={m.id}
                className="rounded-lg border border-border bg-card/60 p-4 hover:border-border-strong transition-colors"
              >
                <div className="text-sm font-medium text-foreground">{m.title}</div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {m.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
