import type { UseCase } from "@/data/pathways";
import { TagPill } from "./TagPill";
import { ArrowRight } from "lucide-react";

type Props = {
  useCase: UseCase;
  onOpen: (id: string) => void;
};

export function UseCaseCard({ useCase, onOpen }: Props) {
  return (
    <button
      onClick={() => onOpen(useCase.id)}
      className="premium-card group p-6 text-left h-full flex flex-col"
    >
      <div className="editorial-eyebrow mb-2">Use Case</div>
      <h3 className="text-lg font-medium text-foreground">{useCase.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {useCase.summary}
      </p>

      <div className="mt-6 hairline" />

      <div className="mt-5 space-y-3 text-xs">
        <div>
          <div className="editorial-eyebrow mb-1">Recommended path</div>
          <div className="text-sm text-foreground/90">{useCase.recommendedPath}</div>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2">
          <Fit label="PoC" value={useCase.pocFit} />
          <Fit label="Prod" value={useCase.productionFit} />
          <Fit label="React" value={useCase.reactFit} />
        </div>
      </div>

      <div className="mt-auto pt-6 flex items-center gap-1.5 text-sm text-amber opacity-0 group-hover:opacity-100 transition-opacity">
        Open notes <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </button>
  );
}

function Fit({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-1">
        <TagPill tone="amber">{value}</TagPill>
      </div>
    </div>
  );
}
