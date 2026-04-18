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
import { BookmarkButton } from "./BookmarkButton";
import { learnModules } from "@/data/learnModules";
import { useDecisions } from "@/hooks/useDecisions";
import { useLocalStore } from "@/hooks/useLocalStore";
import { getPath } from "@/data/paths";
import { Save, Zap, Shield, Layout, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { type ReactNode, useState, useEffect } from "react";
import { daysSince, formatMonthYear } from "@/lib/utils";

type Props = {
  useCase: UseCase | null;
  onClose: () => void;
};

export function UseCaseDetail({ useCase, onClose }: Props) {
  const { add } = useDecisions();
  const { trackRecent } = useLocalStore();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (useCase) setSaved(false);
  }, [useCase]);

  useEffect(() => {
    if (!useCase) return;
    const timeoutId = window.setTimeout(() => {
      trackRecent({
        type: "use-case",
        id: useCase.id,
        label: useCase.title,
        href: "/use-cases",
      });
    }, 1000);
    return () => window.clearTimeout(timeoutId);
  }, [trackRecent, useCase]);

  const saveAsDecision = () => {
    if (!useCase) return;
    add({
      ideaName: useCase.title,
      chosenPath: getPath(useCase.recommendedPathId)?.shortName ?? useCase.recommendedPath,
      why: useCase.why,
      pocNotes: useCase.pocShape,
      productionNotes: useCase.productionShape,
      reactNotes: useCase.reactAngle,
      nextSteps: `Risks: ${useCase.risks}`,
      agentType: useCase.recommendedAgentType,
      tags: [useCase.recommendedAgentType, useCase.reactFit],
    });
    setSaved(true);
  };

  return (
    <Dialog open={!!useCase} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto bg-card border-border">
        {useCase && (
          <>
            <DialogHeader className="text-left">
              <div className="flex items-center justify-between gap-3">
                <div className="editorial-eyebrow">Use Case</div>
                <BookmarkButton kind="useCases" id={useCase.id} size="sm" />
              </div>
              <DialogTitle className="text-2xl font-medium tracking-tight mt-1">
                {useCase.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {useCase.summary}
              </DialogDescription>
              <div className="mt-2 text-xs text-muted-foreground">
                {daysSince(useCase.reviewedAt) > 180
                  ? "Worth re-checking"
                  : `Reviewed ${formatMonthYear(useCase.reviewedAt)}`}
              </div>
            </DialogHeader>

            {/* Recommendation strip */}
            <div className="mt-4 rounded-xl border border-amber/30 bg-amber/5 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="editorial-eyebrow mb-1 text-amber">Recommended path</div>
                  <p className="text-sm font-medium text-foreground">{useCase.recommendedPath}</p>
                </div>
                <div>
                  <div className="editorial-eyebrow mb-1 text-amber">Recommended agent type</div>
                  <p className="text-sm font-medium text-foreground">
                    {useCase.recommendedAgentType}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <TagPill tone="amber">PoC: {useCase.pocFit}</TagPill>
              <TagPill tone="amber">Prod: {useCase.productionFit}</TagPill>
              <TagPill tone="amber">React: {useCase.reactFit}</TagPill>
            </div>

            <div className="hairline mt-6" />

            <div className="mt-6 space-y-5">
              <Block label="Why this path makes sense" value={useCase.why} />
              <Block label="Key risks & tradeoffs" value={useCase.risks} />
            </div>

            {/* Three decision cards */}
            <div className="mt-7">
              <div className="editorial-eyebrow mb-3">Three ways to think about it</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <DecisionMini
                  icon={<Zap className="h-3.5 w-3.5" />}
                  title="Fastest start"
                  body={useCase.pocShape}
                  note="Don't overbuild — prove the loop first."
                  tone="amber"
                />
                <DecisionMini
                  icon={<Shield className="h-3.5 w-3.5" />}
                  title="Most production-safe"
                  body={useCase.productionShape}
                  note="Adds operational weight. Earn it."
                  tone="default"
                />
                <DecisionMini
                  icon={<Layout className="h-3.5 w-3.5" />}
                  title="When React is justified"
                  body={useCase.reactAngle}
                  note={
                    useCase.reactFit === "Essential" || useCase.reactFit === "Strong"
                      ? "Likely yes — UX is part of the value."
                      : "Probably not — keep it light."
                  }
                  tone="default"
                />
              </div>
            </div>

            {useCase.relatedModuleIds.length > 0 && (
              <div className="mt-8">
                <div className="editorial-eyebrow mb-3">What to learn next</div>
                <ul className="divide-y divide-border border-y border-border">
                  {useCase.relatedModuleIds.map((id) => {
                    const m = learnModules.find((x) => x.id === id);
                    if (!m) return null;
                    return (
                      <li key={id}>
                        <Link
                          to="/learn"
                          hash={m.id}
                          className="group flex items-start justify-between gap-4 py-3"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-foreground group-hover:text-amber transition-colors">
                              {m.title}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                              {m.summary}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber shrink-0 mt-1" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {useCase.learningReferenceIds.length > 0 && (
              <div className="mt-6">
                <LearningReferenceList
                  ids={useCase.learningReferenceIds}
                  title="Recommended learning"
                />
              </div>
            )}

            <div className="mt-8 flex items-center justify-end gap-2 sticky bottom-0 -mx-6 -mb-6 px-6 pb-6 pt-4 bg-card/95 backdrop-blur-md border-t border-border">
              <button
                onClick={saveAsDecision}
                disabled={saved}
                className="inline-flex items-center gap-2 rounded-md bg-amber px-4 py-2 text-sm font-medium text-amber-foreground hover:bg-amber/90 transition-colors disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saved ? "Saved to Decisions" : "Save to Decisions"}
              </button>
            </div>
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

function DecisionMini({
  icon,
  title,
  body,
  note,
  tone,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  note: string;
  tone: "amber" | "default";
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        tone === "amber" ? "border-amber/30 bg-amber/5" : "border-border bg-background/30"
      }`}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <span className={tone === "amber" ? "text-amber" : "text-muted-foreground"}>{icon}</span>
        <div className={`editorial-eyebrow ${tone === "amber" ? "text-amber" : ""}`}>{title}</div>
      </div>
      <p className="text-xs text-foreground/90 leading-relaxed">{body}</p>
      <p className="mt-2 text-[11px] text-muted-foreground italic leading-relaxed">{note}</p>
    </div>
  );
}
