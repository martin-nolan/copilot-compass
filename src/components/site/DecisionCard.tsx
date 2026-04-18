import type { Decision } from "@/hooks/useDecisions";
import { TagPill } from "./TagPill";
import { Trash2 } from "lucide-react";

type Props = {
  decision: Decision;
  onDelete: (id: string) => void;
};

export function DecisionCard({ decision, onDelete }: Props) {
  return (
    <article className="premium-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="editorial-eyebrow mb-1.5">Decision</div>
          <h3 className="text-lg font-medium tracking-tight">
            {decision.ideaName}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <TagPill tone="amber">{decision.chosenPath}</TagPill>
            {decision.agentType && (
              <TagPill tone="outline">{decision.agentType}</TagPill>
            )}
            {decision.mode && <TagPill tone="muted">{decision.mode}</TagPill>}
            {decision.reactRelevance && (
              <TagPill tone="muted">React: {decision.reactRelevance}</TagPill>
            )}
            {decision.tags?.slice(0, 3).map((t) => (
              <TagPill key={t} tone="muted">
                {t}
              </TagPill>
            ))}
          </div>
        </div>
        <button
          onClick={() => onDelete(decision.id)}
          className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-md hover:bg-secondary"
          aria-label="Delete decision"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {decision.why && (
        <p className="mt-4 text-sm text-foreground/90 leading-relaxed">
          {decision.why}
        </p>
      )}

      <div className="hairline my-5" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Block label="PoC notes" value={decision.pocNotes} />
        <Block label="Production notes" value={decision.productionNotes} />
        <Block label="React notes" value={decision.reactNotes} />
      </div>

      {decision.nextSteps && (
        <>
          <div className="hairline my-5" />
          <Block label="Next steps" value={decision.nextSteps} />
        </>
      )}
    </article>
  );
}

function Block({ label, value }: { label: string; value: string }) {
  if (!value) {
    return (
      <div>
        <div className="editorial-eyebrow mb-1.5">{label}</div>
        <p className="text-xs text-muted-foreground/60 italic">—</p>
      </div>
    );
  }
  return (
    <div>
      <div className="editorial-eyebrow mb-1.5">{label}</div>
      <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
        {value}
      </p>
    </div>
  );
}
