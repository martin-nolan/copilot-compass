import type { Comparison } from "@/data/pathways";
import { LearningReferenceList } from "./LearningReferenceList";
import { CommonMistakes } from "./CommonMistakes";
import { BookmarkButton } from "./BookmarkButton";
import { useTrackRecentOnView } from "@/hooks/useTrackRecentOnView";
import { ArrowRight } from "lucide-react";
import { daysSince, formatMonthYear } from "@/lib/utils";
import { useMemo } from "react";

// Per-comparison editorial advice (decision-ready framing)
const advice: Record<
  string,
  {
    bestForQuestion: string;
    typicalChoice: string;
    moveSignal: string;
    chooseLeftWhen: string;
    chooseRightWhen: string;
    ifStartingToday: string;
    learnNext: string;
    commonMistake: string;
    pitfalls: string[];
  }
> = {
  "builder-vs-studio": {
    bestForQuestion: "Where should this declarative agent actually live?",
    typicalChoice: "Most ideas start in Agent Builder.",
    moveSignal:
      "People usually move from Builder to Studio when workflows, channels, or analytics start to matter.",
    chooseLeftWhen:
      "It's an internal helper, you want to learn the declarative shape, and rolling out inside Microsoft 365 is enough.",
    chooseRightWhen:
      "The agent has earned operational weight — testing, channels, governance, multi-step workflows, real ownership.",
    ifStartingToday:
      "Build the first cut in Agent Builder. Migrate to Studio the moment you reach for orchestration, tools, or analytics.",
    learnNext: "agent-builder",
    commonMistake:
      "Trying to make Agent Builder do operational work it wasn't built for instead of graduating to Studio.",
    pitfalls: [
      "Treating Agent Builder as a production platform",
      "Authoring topics in Studio when generative orchestration would do",
    ],
  },
  "declarative-vs-custom": {
    bestForQuestion: "Should I lean on Microsoft's orchestrator or bring my own?",
    typicalChoice: "Default to declarative.",
    moveSignal:
      "Custom engine earns its weight only when a specific declarative limitation forces it.",
    chooseLeftWhen:
      "Microsoft-shaped workflows, faster iteration, less infra to own, and Microsoft's models and orchestrator are good enough.",
    chooseRightWhen:
      "You need real control over orchestration, model choice, integrations, or multi-channel reach the declarative path can't give you.",
    ifStartingToday:
      "Start declarative. Let a real limitation push you to custom engine — heaviness is a tax, not a feature.",
    learnNext: "declarative",
    commonMistake:
      "Choosing custom engine before any concrete limitation in declarative or Studio has appeared.",
    pitfalls: [
      "Underestimating the operational tax of custom engine",
      "Confusing 'more control' with 'better outcome'",
    ],
  },
  "native-vs-react": {
    bestForQuestion: "Where does the user actually do this work?",
    typicalChoice: "Microsoft-native if the work already lives in Microsoft 365.",
    moveSignal:
      "People move to a React shell when UX is the product and the assistant is one feature inside it.",
    chooseLeftWhen:
      "The workflow lives in Teams, Outlook, SharePoint, or Word, and a custom UX would be friction, not value.",
    chooseRightWhen:
      "You need dashboards, navigation, role-aware state, saved outputs — UX matters too much for a host channel.",
    ifStartingToday:
      "Pilot inside Microsoft 365 if the work happens there. Build a React shell when the broader product is the point.",
    learnNext: "react-shell",
    commonMistake:
      "Building a React shell to chase 'control' when an in-channel experience would have been better.",
    pitfalls: [
      "Chat-on-the-side that ignores what the user is looking at",
      "Rebuilding a product around an agent instead of embedding it",
    ],
  },
  "poc-vs-production": {
    bestForQuestion: "Which mode am I actually in right now?",
    typicalChoice: "Most failed builds happen when one mode is judged by the other's rules.",
    moveSignal: "PoC graduates to production the moment people start depending on it.",
    chooseLeftWhen:
      "You don't yet know if the idea is worth building, and a small build will tell you.",
    chooseRightWhen: "You already know it works and people now depend on it.",
    ifStartingToday:
      "Name the mode out loud. Then judge every choice against the rules of that mode — not the other one.",
    learnNext: "poc-vs-production",
    commonMistake:
      "Treating a PoC like a product (over-investing) or a product like a PoC (under-investing in ops).",
    pitfalls: [
      "Sneaking PoC code into production by accident",
      "Adding production rituals to throwaway explorations",
    ],
  },
};

export function ComparisonSection({ comparison }: { comparison: Comparison }) {
  const a = advice[comparison.id];
  const recentRef = useTrackRecentOnView(
    useMemo(
      () => ({
        type: "comparison" as const,
        id: comparison.id,
        label: comparison.title,
        href: `/choose-path#${comparison.id}`,
      }),
      [comparison.id, comparison.title],
    ),
  );
  const isStale = daysSince(comparison.reviewedAt) > 180;
  return (
    <section id={comparison.id} className="scroll-mt-24" ref={recentRef}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">{comparison.title}</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">{comparison.summary}</p>
          <div className="mt-3 text-xs text-muted-foreground">
            {isStale ? "Worth re-checking" : `Reviewed ${formatMonthYear(comparison.reviewedAt)}`}
          </div>
        </div>
        <BookmarkButton kind="comparisons" id={comparison.id} size="sm" />
      </div>

      {/* Top-of-section framing */}
      {a && (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-3">
          <FrameBlock label="Best for this question" value={a.bestForQuestion} accent />
          <FrameBlock label="Typical choice" value={a.typicalChoice} />
          <FrameBlock label="When people move →" value={a.moveSignal} />
        </div>
      )}

      {/* Comparison table */}
      <div className="mt-10 rounded-2xl border border-border overflow-hidden bg-card">
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
                <p className="text-sm text-foreground/90 leading-relaxed">{row.leftValue}</p>
              </div>
              <div className="p-4 sm:p-5 border-t border-border">
                <p className="text-sm text-foreground/90 leading-relaxed">{row.rightValue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom-line decision cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="premium-card p-5">
          <div className="editorial-eyebrow text-amber mb-2">Choose this when</div>
          <div className="text-xs text-muted-foreground mb-1">{comparison.leftTitle}</div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {a?.chooseLeftWhen ?? comparison.bestWhenLeft}
          </p>
        </div>
        <div className="premium-card p-5">
          <div className="editorial-eyebrow mb-2">Choose this when</div>
          <div className="text-xs text-muted-foreground mb-1">{comparison.rightTitle}</div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {a?.chooseRightWhen ?? comparison.bestWhenRight}
          </p>
        </div>
        <div className="premium-card p-5 bg-gradient-to-br from-amber/5 to-transparent">
          <div className="editorial-eyebrow mb-2 text-amber flex items-center gap-1.5">
            <ArrowRight className="h-3 w-3" /> If I were starting today
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {a?.ifStartingToday ?? comparison.likelyFirstMove}
          </p>
        </div>
      </div>

      {a && (
        <div className="mt-6">
          <CommonMistakes items={a.pitfalls} title="Avoid these mistakes" />
        </div>
      )}

      {comparison.learningReferenceIds.length > 0 && (
        <div className="mt-10 max-w-3xl">
          <LearningReferenceList
            ids={comparison.learningReferenceIds}
            title="Official references"
          />
        </div>
      )}
    </section>
  );
}

function FrameBlock({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        accent ? "border-amber/40 bg-amber/5" : "border-border bg-card"
      }`}
    >
      <div className={`editorial-eyebrow mb-1.5 ${accent ? "text-amber" : ""}`}>{label}</div>
      <p className="text-sm text-foreground/90 leading-relaxed">{value}</p>
    </div>
  );
}
