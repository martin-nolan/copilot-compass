import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCases } from "@/data/pathways";
import { UseCaseCard } from "@/components/site/UseCaseCard";
import { UseCaseDetail } from "@/components/site/UseCaseDetail";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    meta: [
      { title: "Use Cases — Copilot Compass" },
      {
        name: "description",
        content:
          "Four practical Copilot use cases — internal knowledge, workflows, dashboard companions, and research.",
      },
      { property: "og:title", content: "Use Cases — Copilot Compass" },
      {
        property: "og:description",
        content:
          "Four realistic Copilot shapes with route recommendations, PoC notes, and production implications.",
      },
    ],
  }),
  component: UseCasesPage,
});

function UseCasesPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const featured = useCases.filter((useCase) =>
    [
      "internal-knowledge",
      "workflow-assistant",
      "dashboard-companion",
      "research-copilot",
    ].includes(useCase.id),
  );
  const open = featured.find((u) => u.id === openId) ?? null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <div className="editorial-eyebrow mb-4">Use Cases</div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
          Four shapes worth thinking through.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Fewer examples, sharper distinctions. Each one shows the likely starting path and how the
          shape changes from PoC to production.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((u) => (
          <UseCaseCard key={u.id} useCase={u} onOpen={setOpenId} />
        ))}
      </div>

      <UseCaseDetail useCase={open} onClose={() => setOpenId(null)} />
    </div>
  );
}
