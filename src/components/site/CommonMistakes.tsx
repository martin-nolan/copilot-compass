import { AlertTriangle } from "lucide-react";

export function CommonMistakes({ items, title = "Common mistakes" }: { items: string[]; title?: string }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="rounded-xl border border-border bg-background/40 p-5">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-3.5 w-3.5 text-amber" />
        <div className="editorial-eyebrow">{title}</div>
      </div>
      <ul className="space-y-1.5">
        {items.map((m) => (
          <li key={m} className="text-sm text-foreground/85 leading-relaxed flex gap-2">
            <span className="text-muted-foreground mt-0.5">·</span>
            <span>{m}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
