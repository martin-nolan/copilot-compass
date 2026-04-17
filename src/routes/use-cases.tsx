import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCases } from "@/data/pathways";
import { UseCaseCard } from "@/components/site/UseCaseCard";
import { UseCaseDetail } from "@/components/site/UseCaseDetail";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    meta: [
      { title: "Use Cases — Copilot Pathways" },
      {
        name: "description",
        content:
          "Practical Copilot use cases — internal knowledge, training, workflows, support triage, dashboards, research.",
      },
      { property: "og:title", content: "Use Cases — Copilot Pathways" },
      {
        property: "og:description",
        content:
          "Realistic shapes for Copilot ideas with PoC, production, and React app fit notes.",
      },
    ],
  }),
  component: UseCasesPage,
});

function UseCasesPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = useCases.find((u) => u.id === openId) ?? null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <div className="editorial-eyebrow mb-4">Use Cases</div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
          Six shapes worth thinking through.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Each one is a small, realistic Copilot idea — with notes on the
          recommended starting path and how the shape changes from PoC to
          production.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {useCases.map((u) => (
          <UseCaseCard key={u.id} useCase={u} onOpen={setOpenId} />
        ))}
      </div>

      <UseCaseDetail useCase={open} onClose={() => setOpenId(null)} />
    </div>
  );
}
