import { createFileRoute, Link } from "@tanstack/react-router";
import { changelog } from "@/data/changelog";
import { learnModules } from "@/data/learnModules";
import { formatMonthYear } from "@/lib/utils";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog — Copilot Compass" },
      {
        name: "description",
        content: "A running editorial log of how Copilot Compass is changing.",
      },
    ],
  }),
  component: ChangelogPage,
});

function ChangelogPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="max-w-2xl">
        <div className="editorial-eyebrow mb-4">Changelog</div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
          A living field guide should look alive.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Editorial changes, not release-note theatre. Each entry explains what changed in the guide
          and why it matters.
        </p>
      </div>

      <div className="mt-12 space-y-6">
        {changelog.map((entry) => (
          <article key={entry.date} className="premium-card p-6">
            <div className="editorial-eyebrow mb-2">{formatMonthYear(entry.date)}</div>
            <p className="text-sm text-foreground/90 leading-relaxed">{entry.summary}</p>
            {entry.relatedModuleIds?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {entry.relatedModuleIds.map((moduleId) => {
                  const module = learnModules.find((item) => item.id === moduleId);
                  if (!module) return null;
                  return (
                    <Link
                      key={module.id}
                      to="/learn"
                      hash={module.id}
                      className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-foreground/85 transition-colors hover:border-amber/40 hover:text-amber"
                    >
                      {module.title}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
