import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { learnChapters, learnModules } from "@/data/learnModules";
import { learnExtras } from "@/data/learnExtras";
import { LearnModuleCard } from "@/components/site/LearnModuleCard";
import { useLocalStore } from "@/hooks/useLocalStore";
import { paths, type PathId } from "@/data/paths";
import { TagPill } from "@/components/site/TagPill";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Copilot Compass" },
      {
        name: "description",
        content:
          "A compact field guide to Microsoft Copilot agents: declarative vs custom engine, Agent Builder, Copilot Studio, orchestration, testing, and where React fits.",
      },
      { property: "og:title", content: "Learn — Copilot Compass" },
      {
        property: "og:description",
        content:
          "Concept-led modules teaching the Microsoft Copilot agent landscape — from foundations to operations.",
      },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  const [activeId, setActiveId] = useState<string>(learnModules[0]?.id ?? "");
  const [complexityFilter, setComplexityFilter] = useState<string | null>(null);
  const [pathFilter, setPathFilter] = useState<PathId | null>(null);
  const { state, hydrated } = useLocalStore();
  const completedCount = hydrated ? state.completedModules.length : 0;
  const progressPercent = (completedCount / learnModules.length) * 100;

  const visibleModules = useMemo(() => {
    return learnModules.filter((module) => {
      const extras = learnExtras[module.id];
      if (!extras) return true;
      const matchesComplexity = complexityFilter ? extras.complexity === complexityFilter : true;
      const matchesPath = pathFilter ? extras.bestForPaths.includes(pathFilter) : true;
      return matchesComplexity && matchesPath;
    });
  }, [complexityFilter, pathFilter]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    visibleModules.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [visibleModules]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <div className="editorial-eyebrow mb-4">Learn</div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
          The agent landscape, in chapters.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          A concept-led tour of the Microsoft Copilot agent world — what declarative and custom
          engine actually mean, where Agent Builder ends and Copilot Studio begins, and how a React
          app fits around any of it. Each module explains the concept first, then points at official
          references.
        </p>
        <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="tabular-nums">
            {completedCount} of {learnModules.length} modules complete
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary/50">
            <div className="h-full bg-amber" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setComplexityFilter(null)}
          type="button"
          className="focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
        >
          <TagPill tone={complexityFilter === null ? "amber" : "muted"}>All complexities</TagPill>
        </button>
        {["Low", "Medium", "High"].map((value) => (
          <button
            key={value}
            onClick={() => setComplexityFilter((current) => (current === value ? null : value))}
            type="button"
            className="focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
          >
            <TagPill tone={complexityFilter === value ? "amber" : "muted"}>{value}</TagPill>
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => setPathFilter(null)}
          type="button"
          className="focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
        >
          <TagPill tone={pathFilter === null ? "amber" : "outline"}>All paths</TagPill>
        </button>
        {paths.map((path) => (
          <button
            key={path.id}
            onClick={() => setPathFilter((current) => (current === path.id ? null : path.id))}
            type="button"
            className="focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
          >
            <TagPill tone={pathFilter === path.id ? "amber" : "outline"}>{path.shortName}</TagPill>
          </button>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
        {/* Sticky chapter nav */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="editorial-eyebrow mb-4">Chapters</div>
            <nav className="space-y-6 text-sm">
              {learnChapters.map((ch) => {
                const mods = visibleModules.filter((m) => m.chapter === ch.id);
                if (mods.length === 0) return null;
                return (
                  <div key={ch.id}>
                    <div className="text-foreground font-medium mb-2">{ch.title}</div>
                    <ul className="space-y-1.5 border-l border-border pl-3">
                      {mods.map((m) => {
                        const active = activeId === m.id;
                        return (
                          <li key={m.id}>
                            <a
                              href={`#${m.id}`}
                              className={`block text-xs leading-snug transition-colors ${
                                active
                                  ? "text-amber"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {m.title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Modules grouped by chapter */}
        <div className="space-y-20 min-w-0">
          <div className="sticky top-16 z-20 -mx-6 border-b border-border bg-background/90 px-6 py-3 backdrop-blur-md lg:hidden">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {visibleModules.map((module) => (
                <a
                  key={module.id}
                  href={`#${module.id}`}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    activeId === module.id
                      ? "border-amber/40 bg-amber/10 text-amber"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {module.title}
                </a>
              ))}
            </div>
          </div>

          {learnChapters.map((ch) => {
            const mods = visibleModules.filter((m) => m.chapter === ch.id);
            if (mods.length === 0) return null;
            return (
              <section key={ch.id} id={`chapter-${ch.id}`} className="scroll-mt-24">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <div className="editorial-eyebrow mb-2">Chapter</div>
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">{ch.title}</h2>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {mods.length} {mods.length === 1 ? "module" : "modules"}
                  </span>
                </div>
                <div className="space-y-6">
                  {mods.map((m) => {
                    const globalIndex = learnModules.findIndex((x) => x.id === m.id);
                    return <LearnModuleCard key={m.id} module={m} index={globalIndex} />;
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
