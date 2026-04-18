import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { paths, getPath } from "@/data/paths";
import { learnModules } from "@/data/learnModules";
import { comparisons, useCases } from "@/data/pathways";
import { TagPill } from "@/components/site/TagPill";
import { useLocalStore } from "@/hooks/useLocalStore";
import { walkthroughQuestions } from "@/data/walkthrough";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Copilot Compass — Decide what to build with Copilot" },
      {
        name: "description",
        content:
          "A premium decision and learning hub for choosing the right Copilot path: low-code, structured low-code, React-led, or high-code custom engine.",
      },
      { property: "og:title", content: "Copilot Compass" },
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
  const draft = hydrated ? state.walkthroughDraft : null;
  const completedCount = hydrated ? state.completedModules.length : 0;
  const featuredComparison = comparisons.find(
    (comparison) => comparison.id === "builder-vs-studio",
  );
  const featuredUseCase = useCases.find((useCase) => useCase.id === "workflow-assistant");

  const nextTiles = [
    currentPath
      ? {
          label: "Current path",
          title: currentPath.name,
          body: currentPath.bestFirstMove,
          to: "/choose-path",
          hash: currentPath.id,
        }
      : {
          label: "Start with a route",
          title: "Choose a Path",
          body: "See the four paths side by side and pick the lightest one that fits.",
          to: "/choose-path",
        },
    {
      label: "Decision walkthrough",
      title: "Walkthrough",
      body: "Eight short questions that turn vague intent into a practical first move.",
      to: "/walkthrough",
    },
    {
      label: "Field guide",
      title: "Learn",
      body: "Concept-led modules on declarative vs custom, Studio, React, and operations.",
      to: "/learn",
    },
    {
      label: "Tradeoffs",
      title: featuredComparison?.title ?? "Choose a Path",
      body: featuredComparison?.summary ?? "Read the biggest tradeoffs side by side.",
      to: "/choose-path",
      hash: featuredComparison?.id,
    },
    {
      label: "Use case",
      title: featuredUseCase?.title ?? "Use Cases",
      body: featuredUseCase?.summary ?? "Concrete product shapes with route recommendations.",
      to: "/use-cases",
    },
    {
      label: "Saved library",
      title: "Saved",
      body: "Return to the modules, paths, and tradeoffs you bookmarked.",
      to: "/saved",
    },
  ];

  return (
    <div>
      <section className="relative hero-glow">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pb-28 sm:pt-28">
          <div className="editorial-eyebrow mb-6">Decision & learning hub</div>
          <h1 className="max-w-4xl pb-2 text-4xl font-medium tracking-tight leading-[1.1] sm:text-6xl">
            Choose the right{" "}
            <span className="text-amber-grad font-serif italic inline-block pr-1.5">Copilot</span>
            <br className="hidden sm:block" />
            path before you build.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Decide what to learn next and which Copilot path fits the idea: Agent Builder, Studio,
            React, or custom engine.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/walkthrough"
              className="inline-flex items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-medium text-amber-foreground shadow-[0_0_60px_-10px_var(--color-amber)] transition-colors hover:bg-amber/90"
            >
              <Compass className="h-4 w-4" /> Take the walkthrough
            </Link>
            <Link
              to="/choose-path"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Choose a path
            </Link>
          </div>
        </div>
      </section>

      {hydrated && (currentPath || lastRec || draft || recents.length > 0) ? (
        <section className="mx-auto mt-4 max-w-6xl px-6">
          <div className="hairline" />
          <div className="grid grid-cols-1 gap-4 py-10 lg:grid-cols-4">
            {draft ? (
              <Link to="/walkthrough" className="premium-card p-5 group">
                <div className="editorial-eyebrow mb-2 text-amber">Resume walkthrough</div>
                <div className="text-lg font-medium tracking-tight">
                  Step {draft.step + 1} of {walkthroughQuestions.length}
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Pick up where you left off and finish the recommendation.
                </p>
              </Link>
            ) : null}

            {currentPath ? (
              <Link to="/choose-path" hash={currentPath.id} className="premium-card p-5 group">
                <div className="editorial-eyebrow mb-2 text-amber">Your current path</div>
                <div className="text-lg font-medium tracking-tight">{currentPath.name}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {currentPath.tagline}
                </p>
              </Link>
            ) : null}

            {lastRec ? (
              <Link to="/walkthrough" className="premium-card p-5 group">
                <div className="editorial-eyebrow mb-2 text-amber">Last recommendation</div>
                <div className="text-lg font-medium tracking-tight">
                  {getPath(lastRec.recommendation.pathId)?.shortName}
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {lastRec.recommendation.bestFirstMove}
                </p>
              </Link>
            ) : null}

            <div className="premium-card p-5">
              <div className="editorial-eyebrow mb-2">Continue where you left off</div>
              {recents.length === 0 ? (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Recent modules, tradeoffs, and use cases will show up here.
                </p>
              ) : (
                <ul className="space-y-2">
                  {recents.slice(0, 3).map((recent) => (
                    <li key={`${recent.type}-${recent.id}`}>
                      <a
                        href={recent.href}
                        className="group flex items-start justify-between gap-2 text-sm text-foreground/90 transition-colors hover:text-amber"
                      >
                        <span className="line-clamp-1">{recent.label}</span>
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-amber" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="hairline" />
        </section>
      ) : null}

      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="editorial-eyebrow mb-2">Where to go next</div>
            <h2 className="text-3xl font-medium tracking-tight">Six useful ways in.</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-amber" />
            Editorially curated
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {nextTiles.map((tile) => (
            <Link
              key={`${tile.to}-${tile.title}`}
              to={tile.to}
              hash={tile.hash}
              className="premium-card group p-5"
            >
              <div className="editorial-eyebrow mb-2">{tile.label}</div>
              <div className="text-lg font-medium tracking-tight">{tile.title}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tile.body}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs text-amber opacity-0 transition-opacity group-hover:opacity-100">
                Open <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6 pb-8">
        <div className="hairline mb-5" />
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          <div>
            <div className="editorial-eyebrow mb-1">Field guide</div>
            <div className="flex items-center gap-2">
              <span>
                {completedCount}/{learnModules.length} modules complete
              </span>
              <TagPill tone="amber">
                {completedCount}/{learnModules.length}
              </TagPill>
            </div>
          </div>
          <Link to="/learn" className="text-muted-foreground transition-colors hover:text-amber">
            Continue learning <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
