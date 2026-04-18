import { useEffect, useState, useCallback } from "react";
import type { PathId } from "@/data/paths";
import type { Recommendation, Answers } from "@/data/walkthrough";

const KEY = "copilot-compass:store:v1";
const BACKUP_KEY = "copilot-compass:store:backup:v1";
const BACKUP_INTERVAL_MS = 1000 * 60 * 60 * 24 * 7;

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

export type WalkthroughDraft = {
  step: number;
  answers: Answers;
  updatedAt: number;
};

export type StoreBackup = {
  savedAt: number;
  store: LocalStore;
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
  walkthroughDraft: WalkthroughDraft | null;
  lastBackupAt: number | null;
};

const empty: LocalStore = {
  currentPath: null,
  bookmarks: { modules: [], comparisons: [], useCases: [], paths: [] },
  completedModules: [],
  recents: [],
  lastRecommendation: null,
  walkthroughDraft: null,
  lastBackupAt: null,
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
  const previousSerialized = JSON.stringify(memory);
  const nextSerialized = JSON.stringify(next);
  if (previousSerialized === nextSerialized) return;

  memory = next;
  try {
    localStorage.setItem(KEY, nextSerialized);
    const shouldBackup = !next.lastBackupAt || Date.now() - next.lastBackupAt > BACKUP_INTERVAL_MS;
    if (shouldBackup) {
      const backup: StoreBackup = {
        savedAt: Date.now(),
        store: { ...next, lastBackupAt: Date.now() },
      };
      localStorage.setItem(BACKUP_KEY, JSON.stringify(backup));
      memory = backup.store;
      localStorage.setItem(KEY, JSON.stringify(memory));
    }
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

function readBackup(): StoreBackup | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    return raw ? (JSON.parse(raw) as StoreBackup) : null;
  } catch {
    return null;
  }
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
    if (memory.currentPath === id) return;
    persist({ ...memory, currentPath: id });
  }, []);

  const toggleBookmark = useCallback((kind: keyof LocalStore["bookmarks"], id: string) => {
    const list = memory.bookmarks[kind] as string[];
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    persist({
      ...memory,
      bookmarks: { ...memory.bookmarks, [kind]: next },
    });
  }, []);

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
    const cleaned = memory.recents.filter((r) => !(r.type === item.type && r.id === item.id));
    const next = [{ ...item, at: Date.now() }, ...cleaned].slice(0, 8);
    persist({ ...memory, recents: next });
  }, []);

  const saveRecommendation = useCallback((rec: Recommendation, answers: Answers) => {
    persist({
      ...memory,
      lastRecommendation: { recommendation: rec, answers, at: Date.now() },
    });
  }, []);

  const clearRecommendation = useCallback(() => {
    if (!memory.lastRecommendation) return;
    persist({ ...memory, lastRecommendation: null });
  }, []);

  const saveWalkthroughDraft = useCallback((step: number, answers: Answers) => {
    const current = memory.walkthroughDraft;
    const sameAnswers = JSON.stringify(current?.answers ?? {}) === JSON.stringify(answers);
    if (current && current.step === step && sameAnswers) return;

    persist({
      ...memory,
      walkthroughDraft: {
        step,
        answers,
        updatedAt: Date.now(),
      },
    });
  }, []);

  const clearWalkthroughDraft = useCallback(() => {
    if (!memory.walkthroughDraft) return;
    persist({ ...memory, walkthroughDraft: null });
  }, []);

  const importStore = useCallback((data: Partial<LocalStore>) => {
    const next = {
      ...empty,
      ...data,
      bookmarks: { ...empty.bookmarks, ...(data.bookmarks ?? {}) },
    };
    persist(next);
  }, []);

  const restoreBackup = useCallback(() => {
    const backup = readBackup();
    if (!backup) return false;
    if (JSON.stringify(memory) === JSON.stringify(backup.store)) return true;
    persist(backup.store);
    return true;
  }, []);

  const getBackup = useCallback(() => readBackup(), []);

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
    saveWalkthroughDraft,
    clearWalkthroughDraft,
    importStore,
    restoreBackup,
    getBackup,
  };
}
