import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { learnModules } from "@/data/learnModules";
import { comparisons, useCases } from "@/data/pathways";
import { paths } from "@/data/paths";
import { useLocalStore } from "@/hooks/useLocalStore";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved — Copilot Compass" },
      {
        name: "description",
        content: "Your saved modules, tradeoffs, use cases, and paths in one local-first library.",
      },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { hydrated, state } = useLocalStore();
  const savedModules = learnModules.filter((module) => state.bookmarks.modules.includes(module.id));
  const savedComparisons = comparisons.filter((comparison) =>
    state.bookmarks.comparisons.includes(comparison.id),
  );
  const savedUseCases = useCases.filter((useCase) => state.bookmarks.useCases.includes(useCase.id));
  const savedPaths = paths.filter((path) => state.bookmarks.paths.includes(path.id));
  const hasSaved =
    savedModules.length > 0 ||
    savedComparisons.length > 0 ||
    savedUseCases.length > 0 ||
    savedPaths.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <div className="editorial-eyebrow mb-4">Saved</div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
          Your local library.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Saved paths, modules, tradeoffs, and use cases all live here. Nothing leaves this browser
          unless you export it.
        </p>
      </div>

      {hydrated && !hasSaved ? (
        <div className="premium-card mt-12 p-12 text-center">
          <div className="editorial-eyebrow mb-2">Empty</div>
          <p className="text-muted-foreground">
            Start with the{" "}
            <Link to="/walkthrough" className="text-amber">
              walkthrough
            </Link>{" "}
            and save the pieces worth keeping.
          </p>
        </div>
      ) : null}

      {savedPaths.length > 0 ? (
        <Section title="Paths">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {savedPaths.map((path) => (
              <Link key={path.id} to="/choose-path" hash={path.id} className="premium-card p-5">
                <div className="editorial-eyebrow mb-2 text-amber">{path.eyebrow}</div>
                <div className="text-lg font-medium tracking-tight">{path.name}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{path.tagline}</p>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {savedModules.length > 0 ? (
        <Section title="Modules">
          <div className="space-y-4">
            {savedModules.map((module) => (
              <Link
                key={module.id}
                to="/learn"
                hash={module.id}
                className="premium-card flex items-start justify-between gap-4 p-5"
              >
                <div>
                  <div className="editorial-eyebrow mb-2">Module</div>
                  <div className="text-lg font-medium tracking-tight">{module.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {module.summary}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {savedComparisons.length > 0 ? (
        <Section title="Tradeoffs">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {savedComparisons.map((comparison) => (
              <Link
                key={comparison.id}
                to="/choose-path"
                hash={comparison.id}
                className="premium-card p-5"
              >
                <div className="editorial-eyebrow mb-2">Comparison</div>
                <div className="text-lg font-medium tracking-tight">{comparison.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {comparison.summary}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {savedUseCases.length > 0 ? (
        <Section title="Use cases">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {savedUseCases.map((useCase) => (
              <Link key={useCase.id} to="/use-cases" className="premium-card p-5">
                <div className="editorial-eyebrow mb-2">Use case</div>
                <div className="text-lg font-medium tracking-tight">{useCase.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {useCase.summary}
                </p>
                <p className="mt-3 text-xs text-foreground/80">
                  Suggested start: {useCase.recommendedPath}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14">
      <div className="editorial-eyebrow mb-4">{title}</div>
      {children}
    </section>
  );
}
