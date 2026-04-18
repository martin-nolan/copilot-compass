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
};

const KEY = "copilot-pathways:decisions:v1";

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
    };
    setDecisions((prev) => [decision, ...prev]);
  };

  const remove = (id: string) => {
    setDecisions((prev) => prev.filter((d) => d.id !== id));
  };

  const replaceAll = (next: Decision[]) => {
    setDecisions(next);
  };

  return { decisions, add, remove, replaceAll, hydrated };
}
