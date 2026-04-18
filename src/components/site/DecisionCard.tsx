import type { Decision } from "@/hooks/useDecisions";
import { TagPill } from "./TagPill";
import { Pencil, Trash2 } from "lucide-react";
import { cn, renderSimpleMarkdown } from "@/lib/utils";

type Props = {
  decision: Decision;
  flags?: string[];
  onEdit: (decision: Decision) => void;
  onDelete: (id: string) => void;
};

export function DecisionCard({ decision, flags = [], onDelete, onEdit }: Props) {
  return (
    <article className="premium-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="editorial-eyebrow mb-1.5">Decision</div>
          <h3 className="text-lg font-medium tracking-tight">{decision.ideaName}</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <TagPill tone="amber">{decision.chosenPath}</TagPill>
            {decision.agentType && <TagPill tone="outline">{decision.agentType}</TagPill>}
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
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(decision)}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
            aria-label="Edit decision"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(decision.id)}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
            aria-label="Delete decision"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {flags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {flags.map((flag) => (
            <TagPill key={flag} tone="amber">
              {flag}
            </TagPill>
          ))}
        </div>
      )}

      {decision.why && <MarkdownBlock className="mt-4" value={decision.why} />}

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
      <MarkdownBlock value={value} />
    </div>
  );
}

function MarkdownBlock({ value, className }: { value: string; className?: string }) {
  return (
    <div
      className={cn("space-y-2 text-sm text-foreground/85 leading-relaxed", className)}
      dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(value) }}
    />
  );
}
