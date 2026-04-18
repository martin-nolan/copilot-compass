import { createFileRoute } from "@tanstack/react-router";
import { paths } from "@/data/paths";
import { learnModules } from "@/data/learnModules";
import { comparisons, useCases } from "@/data/pathways";

export const Route = createFileRoute("/llms/txt")({
  component: LlmsPage,
});

function LlmsPage() {
  const body = [
    "# Copilot Compass",
    "",
    "An opinionated field guide for choosing what to build in the Microsoft Copilot ecosystem.",
    "",
    "## Paths",
    ...paths.flatMap((path) => [`- ${path.name}: ${path.tagline}`]),
    "",
    "## Learn modules",
    ...learnModules.flatMap((module) => [`- ${module.title}: ${module.summary}`]),
    "",
    "## Tradeoffs",
    ...comparisons.flatMap((comparison) => [`- ${comparison.title}: ${comparison.summary}`]),
    "",
    "## Use cases",
    ...useCases.flatMap((useCase) => [`- ${useCase.title}: ${useCase.summary}`]),
  ].join("\n");

  return (
    <pre className="mx-auto max-w-5xl whitespace-pre-wrap px-6 py-20 text-sm text-foreground">
      {body}
    </pre>
  );
}
