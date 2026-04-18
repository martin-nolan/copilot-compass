import { useEffect, useState, useCallback } from "react";
import type { PathId } from "@/data/paths";
import type { Recommendation, Answers } from "@/data/walkthrough";

const KEY = "copilot-pathways:store:v1";

export type RecentItem = {
  type: "module" | "comparison" | "use-case" | "path" | "page";
  id: string;
  label: string;
  href: string;
  at: number;
};

export type StoredRecommendation = {
  recommendation: Recommendation;
  answers: Answers;
  at: number;
};

export type LocalStore = {
  currentPath: PathId | null;
  bookmarks: {
    modules: string[];
    comparisons: string[];
    useCases: string[];
    paths: PathId[];
  };
  completedModules: string[];
  recents: RecentItem[]; // most-recent first, capped
  lastRecommendation: StoredRecommendation | null;
};

const empty: LocalStore = {
  currentPath: null,
  bookmarks: { modules: [], comparisons: [], useCases: [], paths: [] },
  completedModules: [],
  recents: [],
  lastRecommendation: null,
};

let memory: LocalStore = empty;
const listeners = new Set<() => void>();

function load(): LocalStore {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<LocalStore>;
    return {
      ...empty,
      ...parsed,
      bookmarks: { ...empty.bookmarks, ...(parsed.bookmarks ?? {}) },
    };
  } catch {
    return empty;
  }
}

function persist(next: LocalStore) {
  memory = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

export function useLocalStore() {
  const [state, setState] = useState<LocalStore>(empty);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    memory = load();
    setState(memory);
    setHydrated(true);
    const l = () => setState({ ...memory });
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const setCurrentPath = useCallback((id: PathId | null) => {
    persist({ ...memory, currentPath: id });
  }, []);

  const toggleBookmark = useCallback(
    (kind: keyof LocalStore["bookmarks"], id: string) => {
      const list = memory.bookmarks[kind] as string[];
      const next = list.includes(id)
        ? list.filter((x) => x !== id)
        : [...list, id];
      persist({
        ...memory,
        bookmarks: { ...memory.bookmarks, [kind]: next },
      });
    },
    [],
  );

  const isBookmarked = useCallback(
    (kind: keyof LocalStore["bookmarks"], id: string) =>
      (memory.bookmarks[kind] as string[]).includes(id),
    [],
  );

  const toggleModuleComplete = useCallback((id: string) => {
    const next = memory.completedModules.includes(id)
      ? memory.completedModules.filter((x) => x !== id)
      : [...memory.completedModules, id];
    persist({ ...memory, completedModules: next });
  }, []);

  const trackRecent = useCallback((item: Omit<RecentItem, "at">) => {
    const cleaned = memory.recents.filter(
      (r) => !(r.type === item.type && r.id === item.id),
    );
    const next = [{ ...item, at: Date.now() }, ...cleaned].slice(0, 8);
    persist({ ...memory, recents: next });
  }, []);

  const saveRecommendation = useCallback(
    (rec: Recommendation, answers: Answers) => {
      persist({
        ...memory,
        lastRecommendation: { recommendation: rec, answers, at: Date.now() },
      });
    },
    [],
  );

  const clearRecommendation = useCallback(() => {
    persist({ ...memory, lastRecommendation: null });
  }, []);

  const importStore = useCallback((data: Partial<LocalStore>) => {
    persist({
      ...empty,
      ...data,
      bookmarks: { ...empty.bookmarks, ...(data.bookmarks ?? {}) },
    });
  }, []);

  return {
    state,
    hydrated,
    setCurrentPath,
    toggleBookmark,
    isBookmarked,
    toggleModuleComplete,
    trackRecent,
    saveRecommendation,
    clearRecommendation,
    importStore,
  };
}
