import { useLocalStore, type LocalStore } from "@/hooks/useLocalStore";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  kind: keyof LocalStore["bookmarks"];
  id: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
};

export function BookmarkButton({ kind, id, label = "Save", className, size = "md" }: Props) {
  const { isBookmarked, toggleBookmark, hydrated } = useLocalStore();
  const saved = hydrated && isBookmarked(kind, id);
  const Icon = saved ? BookmarkCheck : Bookmark;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleBookmark(kind, id);
      }}
      aria-pressed={saved}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border transition-colors",
        size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs",
        saved
          ? "border-amber/40 bg-amber/10 text-amber"
          : "border-border text-muted-foreground hover:text-foreground hover:border-border-strong",
        className,
      )}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {saved ? "Saved" : label}
    </button>
  );
}
