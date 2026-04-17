import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { IntroCard } from "@/components/site/IntroCard";
import { comparisons, useCases } from "@/data/pathways";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Copilot Pathways — A field guide for Copilot decisions" },
      {
        name: "description",
        content:
          "Choose the right Copilot path before you build. Learn when to use M365 Copilot, Copilot Studio, or a React app — for PoC or production.",
      },
      { property: "og:title", content: "Copilot Pathways" },
      {
        property: "og:description",
        content:
          "A personal field guide for Microsoft 365 Copilot, Copilot Studio, and React app experiences.",
      },
    ],
  }),
  component: HomePage,
});

const intros = [
  {
    eyebrow: "Path",
    title: "M365 Copilot",
    description:
      "The Microsoft-native surface — fastest path to a working assistant inside familiar tools.",
    symbol: "M",
    to: "/compare" as const,
  },
  {
    eyebrow: "Path",
    title: "Copilot Studio",
    description:
      "More structure, more control, more rollout options when the idea starts to feel real.",
    symbol: "S",
    to: "/compare" as const,
  },
  {
    eyebrow: "Lens",
    title: "PoC vs Production",
    description:
      "Same idea, different rules. Knowing which mode you're in changes every choice.",
    symbol: "↔",
    to: "/compare" as const,
  },
  {
    eyebrow: "Path",
    title: "React App Integration",
    description:
      "When UX is the product and the assistant is one part of a larger journey.",
    symbol: "R",
    to: "/compare" as const,
  },
];

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative hero-glow">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="editorial-eyebrow mb-6">A personal field guide</div>
          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight max-w-4xl leading-[1.05]">
            Choose the right{" "}
            <span className="text-amber-grad font-serif italic">Copilot</span>{" "}
            path before you build.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A personal field guide for learning Microsoft 365 Copilot, Copilot
            Studio, and how these fit into real PoCs, product ideas, and React
            app experiences.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-medium text-amber-foreground hover:bg-amber/90 transition-colors shadow-[0_0_60px_-10px_var(--color-amber)]"
            >
              Explore Comparisons <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/use-cases"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Browse Use Cases
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-6xl px-6 mt-8">
        <div className="hairline" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-14">
          <div>
            <div className="editorial-eyebrow mb-3">The lenses</div>
            <h2 className="text-2xl font-medium tracking-tight">
              Two simple ways to think about it.
            </h2>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
            <div>
              <div className="text-foreground font-medium mb-1.5">
                Where the intelligence lives
              </div>
              Microsoft 365 Copilot, Copilot Studio, a React app — or split
              across them. The right home for the experience changes everything
              downstream.
            </div>
            <div>
              <div className="text-foreground font-medium mb-1.5">
                PoC vs Production
              </div>
              What helps move quickly is rarely what holds up in production.
              Naming the mode you're in keeps the next decision honest.
            </div>
          </div>
        </div>
        <div className="hairline" />
      </section>

      {/* INTRO CARDS */}
      <section className="mx-auto max-w-6xl px-6 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {intros.map((i) => (
            <IntroCard key={i.title} {...i} />
          ))}
        </div>
      </section>

      {/* FEATURED COMPARISONS */}
      <section className="mx-auto max-w-6xl px-6 mt-28">
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
          {comparisons.map((c) => (
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
      <section className="mx-auto max-w-6xl px-6 mt-28">
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
    </div>
  );
}
