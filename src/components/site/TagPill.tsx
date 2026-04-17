import { cn } from "@/lib/utils";

type Tone = "default" | "amber" | "muted" | "outline";

const tones: Record<Tone, string> = {
  default: "bg-secondary text-foreground/90 border-border",
  amber: "bg-amber/10 text-amber border-amber/30",
  muted: "bg-muted text-muted-foreground border-transparent",
  outline: "bg-transparent text-muted-foreground border-border",
};

export function TagPill({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
