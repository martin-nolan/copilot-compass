import type { UseCase } from "@/data/pathways";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TagPill } from "./TagPill";
import { LearningReferenceList } from "./LearningReferenceList";

type Props = {
  useCase: UseCase | null;
  onClose: () => void;
};

export function UseCaseDetail({ useCase, onClose }: Props) {
  return (
    <Dialog open={!!useCase} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
        {useCase && (
          <>
            <DialogHeader className="text-left">
              <div className="editorial-eyebrow mb-2">Use Case</div>
              <DialogTitle className="text-2xl font-medium tracking-tight">
                {useCase.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {useCase.summary}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-2 flex flex-wrap gap-2">
              <TagPill tone="amber">PoC: {useCase.pocFit}</TagPill>
              <TagPill tone="amber">Prod: {useCase.productionFit}</TagPill>
              <TagPill tone="amber">React: {useCase.reactFit}</TagPill>
            </div>

            <div className="hairline mt-6" />

            <div className="mt-6 space-y-6">
              <Block label="Recommended starting path" value={useCase.recommendedPath} />
              <Block label="Why this path makes sense" value={useCase.why} />
              <Block label="Good PoC shape" value={useCase.pocShape} />
              <Block label="Better production shape" value={useCase.productionShape} />
              <Block label="React app angle" value={useCase.reactAngle} />
              <Block label="Key risks & tradeoffs" value={useCase.risks} />
            </div>

            {useCase.learningReferenceIds.length > 0 && (
              <div className="mt-8">
                <LearningReferenceList ids={useCase.learningReferenceIds} />
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Block({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="editorial-eyebrow mb-1.5">{label}</div>
      <p className="text-sm text-foreground/90 leading-relaxed">{value}</p>
    </div>
  );
}
