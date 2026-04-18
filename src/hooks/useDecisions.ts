import { useEffect, useState } from "react";

export type Decision = {
  id: string;
  ideaName: string;
  chosenPath: string;
  why: string;
  pocNotes: string;
  productionNotes: string;
  reactNotes: string;
  nextSteps: string;
  createdAt: number;
  // optional extras (newer decisions)
  agentType?: string;
  mode?: "PoC" | "Production" | "Either";
  reactRelevance?: "Essential" | "Useful" | "Optional" | "Not needed";
  tags?: string[];
  updatedAt?: number;
};

const KEY = "copilot-compass:decisions:v1";

export function useDecisions() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDecisions(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(decisions));
    } catch {
      // ignore
    }
  }, [decisions, hydrated]);

  const add = (d: Omit<Decision, "id" | "createdAt">) => {
    const decision: Decision = {
      ...d,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setDecisions((prev) => [decision, ...prev]);
  };

  const update = (id: string, patch: Omit<Decision, "id" | "createdAt">) => {
    setDecisions((prev) =>
      prev.map((decision) =>
        decision.id === id
          ? (() => {
              const next = { ...decision, ...patch };
              const same =
                JSON.stringify({ ...decision, updatedAt: undefined }) ===
                JSON.stringify({ ...next, updatedAt: undefined });
              return same
                ? decision
                : {
                    ...next,
                    updatedAt: Date.now(),
                  };
            })()
          : decision,
      ),
    );
  };

  const remove = (id: string) => {
    setDecisions((prev) => {
      const next = prev.filter((d) => d.id !== id);
      return next.length === prev.length ? prev : next;
    });
  };

  const replaceAll = (next: Decision[]) => {
    setDecisions((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
  };

  return { decisions, add, update, remove, replaceAll, hydrated };
}
