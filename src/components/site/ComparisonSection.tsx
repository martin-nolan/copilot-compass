import type { Comparison } from "@/data/pathways";
import { LearningReferenceList } from "./LearningReferenceList";
import { ArrowRight } from "lucide-react";

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

      {/* Comparison table */}
      <div className="mt-10 rounded-2xl border border-border overflow-hidden bg-card">
        {/* Sticky headers */}
        <div className="sticky top-16 z-20 grid grid-cols-[140px_1fr_1fr] bg-card/95 backdrop-blur-md border-b border-border">
          <div className="p-4 sm:p-5 border-r border-border">
            <div className="editorial-eyebrow">Criteria</div>
          </div>
          <div className="p-4 sm:p-5 border-r border-border">
            <div className="editorial-eyebrow text-amber">{comparison.leftEyebrow}</div>
            <div className="mt-1 text-base sm:text-lg font-medium tracking-tight">
              {comparison.leftTitle}
            </div>
          </div>
          <div className="p-4 sm:p-5">
            <div className="editorial-eyebrow">{comparison.rightEyebrow}</div>
            <div className="mt-1 text-base sm:text-lg font-medium tracking-tight">
              {comparison.rightTitle}
            </div>
          </div>
        </div>

        {/* Rows */}
        <div>
          {comparison.criteria.map((row, idx) => (
            <div
              key={row.label}
              className={`grid grid-cols-[140px_1fr_1fr] ${
                idx % 2 === 1 ? "bg-background/30" : ""
              }`}
            >
              <div className="p-4 sm:p-5 border-t border-r border-border">
                <div className="editorial-eyebrow leading-tight">{row.label}</div>
              </div>
              <div className="p-4 sm:p-5 border-t border-r border-border">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {row.leftValue}
                </p>
              </div>
              <div className="p-4 sm:p-5 border-t border-border">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {row.rightValue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="premium-card p-5">
          <div className="editorial-eyebrow text-amber mb-2">Best when</div>
          <div className="text-xs text-muted-foreground mb-1">
            {comparison.leftTitle}
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {comparison.bestWhenLeft}
          </p>
        </div>
        <div className="premium-card p-5">
          <div className="editorial-eyebrow mb-2">Best when</div>
          <div className="text-xs text-muted-foreground mb-1">
            {comparison.rightTitle}
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {comparison.bestWhenRight}
          </p>
        </div>
        <div className="premium-card p-5 bg-gradient-to-br from-amber/5 to-transparent">
          <div className="editorial-eyebrow mb-2 text-amber flex items-center gap-1.5">
            <ArrowRight className="h-3 w-3" /> Likely first move
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {comparison.likelyFirstMove}
          </p>
        </div>
      </div>

      {comparison.learningReferenceIds.length > 0 && (
        <div className="mt-10 max-w-3xl">
          <LearningReferenceList ids={comparison.learningReferenceIds} title="Official references" />
        </div>
      )}
    </section>
  );
}
