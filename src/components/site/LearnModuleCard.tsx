import type { LearnModule } from "@/data/learnModules";
import { LearningReferenceList } from "./LearningReferenceList";
import { Check, Minus } from "lucide-react";

export function LearnModuleCard({ module, index }: { module: LearnModule; index: number }) {
  return (
    <article
      id={module.id}
      className="scroll-mt-24 premium-card p-6 sm:p-8"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-serif italic text-amber/70 text-2xl tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <div className="editorial-eyebrow mb-1.5">Module</div>
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight">
            {module.title}
          </h3>
        </div>
      </div>

      <p className="mt-5 text-foreground/90 leading-relaxed max-w-3xl">
        {module.summary}
      </p>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="editorial-eyebrow mb-2.5 text-amber">Good for</div>
          <ul className="space-y-1.5">
            {module.goodFor.map((g) => (
              <li key={g} className="flex gap-2 text-sm text-foreground/90 leading-relaxed">
                <Check className="h-3.5 w-3.5 mt-1 shrink-0 text-amber" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="editorial-eyebrow mb-2.5">Less ideal for</div>
          <ul className="space-y-1.5">
            {module.lessIdealFor.map((g) => (
              <li key={g} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                <Minus className="h-3.5 w-3.5 mt-1 shrink-0" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hairline mt-8" />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="editorial-eyebrow mb-1.5">PoC shape</div>
          <p className="text-sm text-foreground/90 leading-relaxed">{module.pocShape}</p>
        </div>
        <div>
          <div className="editorial-eyebrow mb-1.5">Production shape</div>
          <p className="text-sm text-foreground/90 leading-relaxed">{module.productionShape}</p>
        </div>
      </div>

      {module.learningReferenceIds.length > 0 && (
        <div className="mt-8">
          <LearningReferenceList ids={module.learningReferenceIds} title="Official references" />
        </div>
      )}
    </article>
  );
}
