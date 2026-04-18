import { useEffect, useRef } from "react";
import { useLocalStore, type RecentItem } from "@/hooks/useLocalStore";

export function useTrackRecentOnView(item: Omit<RecentItem, "at">, enabled = true) {
  const ref = useRef<HTMLElement | null>(null);
  const { trackRecent } = useLocalStore();

  useEffect(() => {
    if (!enabled || !ref.current) return;

    let timeoutId: number | null = null;
    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          timeoutId = window.setTimeout(() => {
            trackRecent(item);
          }, 1000);
          return;
        }

        if (timeoutId) {
          window.clearTimeout(timeoutId);
          timeoutId = null;
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [enabled, item, trackRecent]);

  return ref;
}
