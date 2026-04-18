import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  walkthroughQuestions,
  recommend,
  serializeAnswers,
  deserializeAnswers,
  getGapDrivers,
  getRankedPaths,
  type Answers,
} from "@/data/walkthrough";
import { paths, getPath } from "@/data/paths";
import { learnModules } from "@/data/learnModules";
import { comparisons, useCases } from "@/data/pathways";
import { LearningReferenceList } from "@/components/site/LearningReferenceList";
import { useLocalStore } from "@/hooks/useLocalStore";
import { useDecisions } from "@/hooks/useDecisions";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  GitCompareArrows,
  RotateCcw,
  Save,
} from "lucide-react";
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

function getFirstIncompleteStep(answers: Answers) {
  const firstIncomplete = walkthroughQuestions.findIndex((question) => !answers[question.id]);
  if (firstIncomplete === -1) return walkthroughQuestions.length - 1;
  return firstIncomplete;
}

function writeAnswerQuery(answers: Answers | null) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  const current = url.searchParams.get("a") ?? "";
  const next = answers && Object.keys(answers).length > 0 ? serializeAnswers(answers) : "";

  if (current === next) return;

  if (!answers || Object.keys(answers).length === 0) {
    url.searchParams.delete("a");
  } else {
    url.searchParams.set("a", next);
  }
  window.history.replaceState({}, "", url.toString());
}

function WalkthroughPage() {
  const navigate = useNavigate();
  const {
    hydrated,
    saveRecommendation,
    saveWalkthroughDraft,
    clearWalkthroughDraft,
    setCurrentPath,
    state,
  } = useLocalStore();
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState<"link" | "text" | null>(null);
  const total = walkthroughQuestions.length;
  const hasHydratedFromState = useRef(false);
  const choose = useCallback((questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }, []);

  const next = useCallback(() => {
    if (step < total - 1) {
      setStep((current) => current + 1);
      return;
    }

    const recommendation = recommend(answers);
    saveRecommendation(recommendation, answers);
    setCurrentPath(recommendation.pathId);
    clearWalkthroughDraft();
    setShowResult(true);
  }, [answers, clearWalkthroughDraft, saveRecommendation, setCurrentPath, step, total]);

  useEffect(() => {
    if (!hydrated || hasHydratedFromState.current) return;
    hasHydratedFromState.current = true;

    const queryAnswers = deserializeAnswers(
      typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("a"),
    );

    if (Object.keys(queryAnswers).length > 0) {
      setAnswers(queryAnswers);
      setStep(getFirstIncompleteStep(queryAnswers));
      setShowResult(Object.keys(queryAnswers).length === walkthroughQuestions.length);
      return;
    }

    if (state.walkthroughDraft) {
      setAnswers(state.walkthroughDraft.answers);
      setStep(
        Math.min(
          state.walkthroughDraft.step,
          getFirstIncompleteStep(state.walkthroughDraft.answers),
        ),
      );
    }
  }, [hydrated, state.walkthroughDraft]);

  useEffect(() => {
    if (!hydrated || showResult) return;
    if (Object.keys(answers).length === 0) {
      clearWalkthroughDraft();
      writeAnswerQuery(null);
      return;
    }
    saveWalkthroughDraft(step, answers);
    writeAnswerQuery(answers);
  }, [answers, clearWalkthroughDraft, hydrated, saveWalkthroughDraft, showResult, step]);

  useEffect(() => {
    if (showResult) writeAnswerQuery(answers);
  }, [answers, showResult]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (showResult) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const question = walkthroughQuestions[step];
      if (!question) return;

      if (event.key >= "1" && event.key <= "9") {
        const index = Number(event.key) - 1;
        const option = question.options[index];
        if (option) {
          event.preventDefault();
          choose(question.id, option.id);
        }
      }

      if (event.key === "ArrowLeft" && step > 0) {
        event.preventDefault();
        setStep((current) => Math.max(0, current - 1));
      }

      if (event.key === "ArrowRight" && (answers[question.id] || question.optional)) {
        event.preventDefault();
        next();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [answers, choose, next, showResult, step]);

  const rec = useMemo(() => recommend(answers), [answers]);
  const question = walkthroughQuestions[step];
  const chosen = question ? answers[question.id] : undefined;
  const canNext = question ? !!chosen || question.optional : false;
  const progress = (Object.keys(answers).length / total) * 100;

  const skip = () => {
    if (!question?.optional) return;
    setAnswers((prev) => {
      const nextAnswers = { ...prev };
      delete nextAnswers[question.id];
      return nextAnswers;
    });
    next();
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setShowResult(false);
    clearWalkthroughDraft();
    writeAnswerQuery(null);
  };

  const jumpToStep = (questionId: string) => {
    const index = walkthroughQuestions.findIndex((item) => item.id === questionId);
    if (index === -1) return;
    setShowResult(false);
    setStep(index);
  };

  const copyLink = async () => {
    const url = typeof window === "undefined" ? "" : window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied("link");
    window.setTimeout(() => setCopied(null), 1600);
  };

  const copyRealityCheck = async () => {
    const text = buildRealityCheck(rec);
    await navigator.clipboard.writeText(text);
    setCopied("text");
    window.setTimeout(() => setCopied(null), 1600);
  };

  if (showResult) {
    return (
      <Result
        answers={answers}
        copied={copied}
        onCopyLink={copyLink}
        onCopyRealityCheck={copyRealityCheck}
        onEditStep={jumpToStep}
        onRestart={restart}
        rec={rec}
      />
    );
  }

  if (!question) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="editorial-eyebrow mb-4">Walkthrough</div>
      <h1 className="text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
        A few short questions.
      </h1>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Decide honestly, not aspirationally. The point is to expose tradeoffs, not to guess the
        "right" answer.
      </p>

      <div className="mt-12">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span aria-current="step">
            Step {step + 1} of {total}
            {question.optional ? <span className="ml-1.5 text-amber/70">· optional</span> : null}
          </span>
          <span className="tabular-nums">{Math.round(progress)}%</span>
        </div>
        <div
          aria-valuemax={total}
          aria-valuemin={0}
          aria-valuenow={step + 1}
          className="h-1 w-full overflow-hidden rounded-full bg-secondary/50"
          role="progressbar"
        >
          <div
            className="h-full bg-gradient-to-r from-amber to-amber-soft transition-all duration-500 motion-reduce:transition-none"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-10 premium-card p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-medium tracking-tight">{question.question}</h2>
        {question.helper ? (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{question.helper}</p>
        ) : null}

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {question.options.map((option, index) => {
            const selected = chosen === option.id;
            return (
              <button
                key={option.id}
                className={cn(
                  "rounded-xl border p-4 text-left transition-all focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none",
                  selected
                    ? "border-amber/50 bg-amber/10"
                    : "border-border bg-background/30 hover:border-border-strong hover:bg-background/50",
                )}
                onClick={() => choose(question.id, option.id)}
                type="button"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {index + 1}
                    </div>
                    <div className="mt-1 text-sm font-medium text-foreground">{option.label}</div>
                  </div>
                  {selected ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" /> : null}
                </div>
                {option.hint ? (
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {option.hint}
                  </p>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
          disabled={step === 0}
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          type="button"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          {question.optional ? (
            <button
              className="px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
              onClick={skip}
              type="button"
            >
              Skip
            </button>
          ) : null}
          <button
            className="inline-flex items-center gap-2 rounded-md bg-amber px-5 py-2 text-sm font-medium text-amber-foreground transition-colors hover:bg-amber/90 disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
            disabled={!canNext}
            onClick={next}
            type="button"
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
  onEditStep,
  onCopyLink,
  onCopyRealityCheck,
  copied,
}: {
  rec: ReturnType<typeof recommend>;
  answers: Answers;
  onRestart: () => void;
  onEditStep: (questionId: string) => void;
  onCopyLink: () => Promise<void>;
  onCopyRealityCheck: () => Promise<void>;
  copied: "link" | "text" | null;
}) {
  const path = getPath(rec.pathId)!;
  const { add } = useDecisions();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const ranked = getRankedPaths(rec.scores);
  const runnerUp = ranked[1] ? getPath(ranked[1].pathId) : null;
  const gapDrivers = runnerUp ? getGapDrivers(answers, rec.pathId, runnerUp.id) : [];

  const learnNextMods = rec.learnNext
    .map((id) => learnModules.find((module) => module.id === id))
    .filter(Boolean);

  const relComparisons = comparisons.filter((comparison) =>
    path.relatedComparisons.includes(comparison.id),
  );
  const relUseCases = useCases.filter((useCase) => path.relatedUseCaseIds.includes(useCase.id));

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
      nextSteps: `Learn next: ${learnNextMods.map((module) => module!.title).join(", ")}`,
      agentType: rec.agentType,
      tags: [path.shortName, rec.agentType],
    });
    setSaved(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="editorial-eyebrow mb-4">Recommendation</div>
      <h1 className="text-3xl sm:text-5xl font-medium tracking-tight leading-tight">
        Start with <span className="text-amber-grad font-serif italic">{path.shortName}</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
        This is the lightest path that fits your answers. The goal is not certainty. The goal is a
        sensible first move and a clearer tradeoff model.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {walkthroughQuestions.map((question) => {
          const answerId = answers[question.id];
          const answer = question.options.find((option) => option.id === answerId);
          if (!answer) return null;
          return (
            <button
              key={question.id}
              className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-foreground/90 transition-colors hover:border-amber/40 hover:text-amber focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
              onClick={() => onEditStep(question.id)}
              type="button"
            >
              {question.question}: {answer.label} · change
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
        <Stat accent label="Recommended path" value={path.name} />
        <Stat label="Recommended platform" value={rec.platform} />
        <Stat label="Recommended agent type" value={rec.agentType} />
      </div>

      {runnerUp ? (
        <div className="mt-8 rounded-2xl border border-amber/30 bg-amber/5 p-6">
          <div className="editorial-eyebrow mb-2 text-amber">Runner-up path</div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {runnerUp.shortName} scored nearly as high. The answers creating the biggest gap were{" "}
            {gapDrivers.length > 0
              ? gapDrivers.map((driver) => `"${driver.optionLabel}"`).join(" and ")
              : "your last two tradeoff calls"}
            . Change those and the recommendation could flip.
          </p>
        </div>
      ) : null}

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Why this fits" body={rec.why} />
        <Card accent title="Best first move" body={rec.bestFirstMove} />
        <Card title="Common mistake to avoid" body={rec.commonMistake} />
        <Card title="When to revisit" body={rec.whenToRevisit} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="premium-card p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="editorial-eyebrow text-amber">2-minute reality check</div>
            <button
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
              onClick={onCopyRealityCheck}
              type="button"
            >
              <Copy className="h-3 w-3" />
              {copied === "text" ? "Copied" : "Copy as text"}
            </button>
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
            <p>
              <strong>Path:</strong> {path.shortName}
            </p>
            <p>
              <strong>First move:</strong> {rec.bestFirstMove}
            </p>
            <p>
              <strong>Common mistake:</strong> {rec.commonMistake}
            </p>
            <p>
              <strong>Learn next:</strong>{" "}
              {learnNextMods[0]?.title ?? "Start with the first recommended module"}
            </p>
          </div>
        </div>

        <div className="premium-card p-6">
          <div className="editorial-eyebrow mb-3">How the paths scored</div>
          <div className="space-y-2">
            {paths.map((candidate) => {
              const total = Math.max(...Object.values(rec.scores), 1);
              const score = rec.scores[candidate.id];
              return (
                <div key={candidate.id} className="flex items-center gap-3 text-xs">
                  <div className="w-36 shrink-0 text-muted-foreground">{candidate.shortName}</div>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary/50">
                    <div
                      className={cn(
                        "h-full transition-all motion-reduce:transition-none",
                        candidate.id === rec.pathId ? "bg-amber" : "bg-muted-foreground/30",
                      )}
                      style={{ width: `${(score / total) * 100}%` }}
                    />
                  </div>
                  <div className="w-6 text-right tabular-nums text-muted-foreground">{score}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-10 premium-card p-6">
        <div className="editorial-eyebrow mb-3 text-amber">What to learn next</div>
        <ul className="divide-y divide-border">
          {learnNextMods.map((module) => (
            <li key={module!.id}>
              <Link
                className="group flex items-start justify-between gap-4 py-3"
                hash={module!.id}
                to="/learn"
              >
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground transition-colors group-hover:text-amber">
                    {module!.title}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                    {module!.summary.slice(0, 120)}…
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-amber" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="premium-card p-6">
          <div className="editorial-eyebrow mb-3">Related tradeoffs</div>
          <ul className="space-y-2">
            {relComparisons.map((comparison) => (
              <li key={comparison.id}>
                <Link
                  className="text-sm text-foreground/90 transition-colors hover:text-amber"
                  hash={comparison.id}
                  to="/choose-path"
                >
                  {comparison.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="premium-card p-6">
          <div className="editorial-eyebrow mb-3">Relevant use cases</div>
          <ul className="space-y-2">
            {relUseCases.map((useCase) => (
              <li key={useCase.id}>
                <Link
                  className="text-sm text-foreground/90 transition-colors hover:text-amber"
                  to="/use-cases"
                >
                  {useCase.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {path.learningReferenceIds.length > 0 ? (
        <div className="mt-10 premium-card p-6">
          <LearningReferenceList
            ids={path.learningReferenceIds}
            title="Recommended official learning"
          />
        </div>
      ) : null}

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-md bg-amber px-4 py-2 text-sm font-medium text-amber-foreground transition-colors hover:bg-amber/90 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
          disabled={saved}
          onClick={saveToDecisions}
          type="button"
        >
          <Save className="h-4 w-4" />
          {saved ? "Saved to Decisions" : "Save to Decisions"}
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
          onClick={onCopyLink}
          type="button"
        >
          <Copy className="h-4 w-4" />
          {copied === "link" ? "Link copied" : "Copy link to this recommendation"}
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
          onClick={() => navigate({ to: "/learn", hash: learnNextMods[0]?.id })}
          type="button"
        >
          <BookOpen className="h-4 w-4" /> View recommended learning
        </button>
        <Link
          className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
          hash={relComparisons[0]?.id}
          to="/choose-path"
        >
          <GitCompareArrows className="h-4 w-4" /> Explore tradeoffs
        </Link>
        <button
          className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
          onClick={onRestart}
          type="button"
        >
          <RotateCcw className="h-4 w-4" /> Start over
        </button>
      </div>
    </div>
  );
}

function buildRealityCheck(rec: ReturnType<typeof recommend>) {
  const path = getPath(rec.pathId)!;
  const learnNext = rec.learnNext
    .map((id) => learnModules.find((module) => module.id === id)?.title)
    .filter(Boolean)[0];

  return [
    `# Copilot Compass reality check`,
    ``,
    `Path: ${path.shortName}`,
    `Platform: ${rec.platform}`,
    `Agent type: ${rec.agentType}`,
    `First move: ${rec.bestFirstMove}`,
    `Common mistake: ${rec.commonMistake}`,
    `Learn next: ${learnNext ?? "Start with the first recommended module"}`,
  ].join("\n");
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        accent ? "border-amber/40 bg-amber/5" : "border-border bg-card",
      )}
    >
      <div className={cn("editorial-eyebrow mb-1.5", accent && "text-amber")}>{label}</div>
      <p className="text-sm text-foreground/90 leading-relaxed">{value}</p>
    </div>
  );
}

function Card({ title, body, accent }: { title: string; body: string; accent?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        accent ? "border-amber/30 bg-amber/5" : "border-border bg-card",
      )}
    >
      <div className={cn("editorial-eyebrow mb-2", accent && "text-amber")}>{title}</div>
      <p className="text-sm text-foreground/90 leading-relaxed">{body}</p>
    </div>
  );
}
