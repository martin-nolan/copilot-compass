import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  walkthroughQuestions,
  recommend,
  type Answers,
} from "@/data/walkthrough";
import { paths, getPath } from "@/data/paths";
import { learnModules } from "@/data/learnModules";
import { comparisons, useCases } from "@/data/pathways";
import { LearningReferenceList } from "@/components/site/LearningReferenceList";
import { TagPill } from "@/components/site/TagPill";
import { useLocalStore } from "@/hooks/useLocalStore";
import { useDecisions } from "@/hooks/useDecisions";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Save, BookOpen, GitCompareArrows } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/walkthrough")({
  head: () => ({
    meta: [
      { title: "Walkthrough — Copilot Compass" },
      {
        name: "description",
        content:
          "An interactive guided flow to figure out the right Copilot build path: low-code, structured low-code, React-led, or high-code.",
      },
      { property: "og:title", content: "Walkthrough — Copilot Compass" },
      {
        property: "og:description",
        content:
          "Six to eight short questions and a tailored path recommendation with first move, what to learn next, and common mistakes.",
      },
    ],
  }),
  component: WalkthroughPage,
});

function WalkthroughPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { saveRecommendation, setCurrentPath } = useLocalStore();

  const total = walkthroughQuestions.length;
  const q = walkthroughQuestions[step];
  const progress = (Object.keys(answers).length / total) * 100;

  const choose = (qid: string, oid: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: oid }));
  };

  const next = () => {
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      const rec = recommend(answers);
      saveRecommendation(rec, answers);
      setCurrentPath(rec.pathId);
      setShowResult(true);
    }
  };

  const skip = () => {
    if (q.optional) {
      const a = { ...answers };
      delete a[q.id];
      setAnswers(a);
      next();
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setShowResult(false);
  };

  const rec = useMemo(() => (showResult ? recommend(answers) : null), [showResult, answers]);

  if (showResult && rec) {
    return <Result rec={rec} answers={answers} onRestart={restart} />;
  }

  const chosen = answers[q.id];
  const canNext = !!chosen || q.optional;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="editorial-eyebrow mb-4">Walkthrough</div>
      <h1 className="text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
        A few short questions.
      </h1>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Answer honestly — vague inputs produce vague recommendations. You can
        change your mind at the end.
      </p>

      {/* progress */}
      <div className="mt-12">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>
            Step {step + 1} of {total}
            {q.optional && <span className="ml-1.5 text-amber/70">· optional</span>}
          </span>
          <span className="tabular-nums">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 w-full rounded-full bg-secondary/50 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber to-amber-soft transition-all duration-500"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-10 premium-card p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-medium tracking-tight">{q.question}</h2>
        {q.helper && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{q.helper}</p>
        )}

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {q.options.map((o) => {
            const selected = chosen === o.id;
            return (
              <button
                key={o.id}
                onClick={() => choose(q.id, o.id)}
                className={cn(
                  "text-left rounded-xl border p-4 transition-all",
                  selected
                    ? "border-amber/50 bg-amber/10"
                    : "border-border bg-background/30 hover:border-border-strong hover:bg-background/50",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-medium text-foreground">{o.label}</div>
                  {selected && <Check className="h-4 w-4 text-amber shrink-0 mt-0.5" />}
                </div>
                {o.hint && (
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {o.hint}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          {q.optional && (
            <button
              onClick={skip}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
            >
              Skip
            </button>
          )}
          <button
            onClick={next}
            disabled={!canNext}
            className="inline-flex items-center gap-2 rounded-md bg-amber px-5 py-2 text-sm font-medium text-amber-foreground hover:bg-amber/90 transition-colors disabled:opacity-40"
          >
            {step === total - 1 ? "See recommendation" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Result({
  rec,
  answers,
  onRestart,
}: {
  rec: ReturnType<typeof recommend>;
  answers: Answers;
  onRestart: () => void;
}) {
  const path = getPath(rec.pathId)!;
  const { add } = useDecisions();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const learnNextMods = rec.learnNext
    .map((id) => learnModules.find((m) => m.id === id))
    .filter(Boolean);

  const relComparisons = comparisons.filter((c) => path.relatedComparisons.includes(c.id));
  const relUseCases = useCases.filter((u) => path.relatedUseCaseIds.includes(u.id));

  const saveToDecisions = () => {
    add({
      ideaName: `Walkthrough · ${path.shortName}`,
      chosenPath: path.shortName,
      why: rec.why,
      pocNotes: rec.bestFirstMove,
      productionNotes: rec.whenToRevisit,
      reactNotes:
        rec.pathId === "product-led-react" || rec.pathId === "high-code-custom"
          ? "React shell relevant — see related learning."
          : "Probably not needed at this stage.",
      nextSteps: `Learn next: ${learnNextMods.map((m) => m!.title).join(", ")}`,
      agentType: rec.agentType,
      tags: [path.shortName, rec.agentType],
    });
    setSaved(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="editorial-eyebrow mb-4">Recommendation</div>
      <h1 className="text-3xl sm:text-5xl font-medium tracking-tight leading-tight">
        Start with{" "}
        <span className="text-amber-grad font-serif italic">{path.shortName}</span>.
      </h1>
      <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
        Based on your answers, this is the lightest path that fits. Treat it as
        opinionated — not absolute.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
        <Stat label="Recommended path" value={path.name} accent />
        <Stat label="Recommended platform" value={rec.platform} />
        <Stat label="Recommended agent type" value={rec.agentType} />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Why this fits" body={rec.why} />
        <Card title="Best first move" body={rec.bestFirstMove} accent />
        <Card title="Common mistake to avoid" body={rec.commonMistake} />
        <Card title="When to revisit" body={rec.whenToRevisit} />
      </div>

      <div className="mt-10 premium-card p-6">
        <div className="editorial-eyebrow mb-3 text-amber">What to learn next</div>
        <ul className="divide-y divide-border">
          {learnNextMods.map((m) => (
            <li key={m!.id}>
              <Link
                to="/learn"
                hash={m!.id}
                className="group flex items-start justify-between gap-4 py-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground group-hover:text-amber transition-colors">
                    {m!.title}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {m!.summary.slice(0, 120)}…
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber transition-colors mt-1 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="premium-card p-6">
          <div className="editorial-eyebrow mb-3">Related comparisons</div>
          <ul className="space-y-2">
            {relComparisons.map((c) => (
              <li key={c.id}>
                <Link
                  to="/compare"
                  hash={c.id}
                  className="text-sm text-foreground/90 hover:text-amber transition-colors"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="premium-card p-6">
          <div className="editorial-eyebrow mb-3">Relevant use cases</div>
          <ul className="space-y-2">
            {relUseCases.map((u) => (
              <li key={u.id}>
                <Link
                  to="/use-cases"
                  className="text-sm text-foreground/90 hover:text-amber transition-colors"
                >
                  {u.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {path.learningReferenceIds.length > 0 && (
        <div className="mt-10 premium-card p-6">
          <LearningReferenceList
            ids={path.learningReferenceIds}
            title="Recommended official learning"
          />
        </div>
      )}

      {/* score breakdown */}
      <div className="mt-10">
        <div className="editorial-eyebrow mb-3">How the paths scored</div>
        <div className="space-y-2">
          {paths.map((p) => {
            const total = Math.max(...Object.values(rec.scores), 1);
            const score = rec.scores[p.id];
            const pct = (score / total) * 100;
            return (
              <div key={p.id} className="flex items-center gap-3 text-xs">
                <div className="w-44 shrink-0 text-muted-foreground">{p.shortName}</div>
                <div className="flex-1 h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all",
                      p.id === rec.pathId ? "bg-amber" : "bg-muted-foreground/30",
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="w-6 text-right tabular-nums text-muted-foreground">
                  {score}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* actions */}
      <div className="mt-12 flex flex-wrap items-center gap-3">
        <button
          onClick={saveToDecisions}
          disabled={saved}
          className="inline-flex items-center gap-2 rounded-md bg-amber px-4 py-2 text-sm font-medium text-amber-foreground hover:bg-amber/90 transition-colors disabled:opacity-60"
        >
          <Save className="h-4 w-4" /> {saved ? "Saved to Decisions" : "Save to Decisions"}
        </button>
        <button
          onClick={() => navigate({ to: "/learn", hash: learnNextMods[0]?.id })}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
        >
          <BookOpen className="h-4 w-4" /> View recommended learning
        </button>
        <Link
          to="/compare"
          hash={relComparisons[0]?.id}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
        >
          <GitCompareArrows className="h-4 w-4" /> Compare this route
        </Link>
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground hover:text-foreground px-3 py-2 transition-colors"
        >
          <RotateCcw className="h-4 w-4" /> Restart
        </button>
        <span className="ml-auto text-[11px] text-muted-foreground">
          Saved locally · {Object.keys(answers).length} answers
        </span>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        accent ? "border-amber/40 bg-amber/5" : "border-border bg-card",
      )}
    >
      <div className="editorial-eyebrow mb-1.5">{label}</div>
      <div className={cn("text-base font-medium leading-snug", accent && "text-amber")}>
        {value}
      </div>
    </div>
  );
}

function Card({ title, body, accent }: { title: string; body: string; accent?: boolean }) {
  return (
    <div
      className={cn(
        "premium-card p-5",
        accent && "bg-gradient-to-br from-amber/5 to-transparent",
      )}
    >
      <TagPill tone={accent ? "amber" : "outline"}>{title}</TagPill>
      <p className="mt-3 text-sm text-foreground/90 leading-relaxed">{body}</p>
    </div>
  );
}
