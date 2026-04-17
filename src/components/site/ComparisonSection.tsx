import type { Comparison } from "@/data/pathways";
import { LearningReferenceList } from "./LearningReferenceList";

export function ComparisonSection({ comparison }: { comparison: Comparison }) {
  return (
    <section id={comparison.id} className="scroll-mt-24">
      <div className="max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
          {comparison.title}
        </h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          {comparison.summary}
        </p>
      </div>

      <div className="hairline mt-10" />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
        {/* Left header */}
        <div className="bg-card p-6">
          <div className="editorial-eyebrow text-amber">{comparison.leftEyebrow}</div>
          <h3 className="mt-2 text-xl font-medium">{comparison.leftTitle}</h3>
        </div>
        {/* Right header */}
        <div className="bg-card p-6">
          <div className="editorial-eyebrow">{comparison.rightEyebrow}</div>
          <h3 className="mt-2 text-xl font-medium">{comparison.rightTitle}</h3>
        </div>

        {/* Criteria rows */}
        {comparison.criteria.map((row) => (
          <div key={row.label} className="contents">
            <div className="bg-card p-6 border-t border-border">
              <div className="editorial-eyebrow mb-2">{row.label}</div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {row.leftValue}
              </p>
            </div>
            <div className="bg-card p-6 border-t border-border">
              <div className="editorial-eyebrow mb-2 lg:invisible">{row.label}</div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {row.rightValue}
              </p>
            </div>
          </div>
        ))}
      </div>

      {comparison.learningReferenceIds.length > 0 && (
        <div className="mt-10 max-w-3xl">
          <LearningReferenceList ids={comparison.learningReferenceIds} />
        </div>
      )}
    </section>
  );
}
