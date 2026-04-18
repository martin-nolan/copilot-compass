import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { PathDef } from "@/data/paths";
import { TagPill } from "./TagPill";
import { BookmarkButton } from "./BookmarkButton";

export function PathCard({ path, compact = false }: { path: PathDef; compact?: boolean }) {
  return (
    <article className="premium-card p-6 sm:p-7 h-full flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="editorial-eyebrow mb-2">{path.eyebrow}</div>
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight leading-tight">
            {path.name}
          </h3>
        </div>
        <span className="font-serif italic text-amber/60 text-3xl tabular-nums leading-none">
          {path.number}
        </span>
      </div>

      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{path.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <TagPill tone="amber">Complexity: {path.complexity}</TagPill>
        <TagPill tone="outline">Best fit: {path.bestFitMode}</TagPill>
      </div>

      {!compact && (
        <>
          <div className="hairline my-6" />
          <div className="space-y-4 text-sm">
            <Block label="When this is right" value={path.whenRight} />
            <Block label="Why this path" value={path.whyThis} />
            <Block label="Key tradeoff" value={path.keyTradeoff} />
            <Block label="Best first move" value={path.bestFirstMove} accent />
            <Block label="Avoid if" value={path.avoidIf} />
          </div>
        </>
      )}

      {compact && (
        <div className="mt-5 space-y-2 text-sm">
          <div>
            <div className="editorial-eyebrow mb-1">Best first move</div>
            <p className="text-foreground/90 leading-relaxed">{path.bestFirstMove}</p>
          </div>
        </div>
      )}

      <div className="mt-auto pt-6 flex items-center justify-between gap-3">
        <Link
          to="/choose-path"
          hash={path.id}
          className="inline-flex items-center gap-1.5 text-sm text-amber hover:text-amber/80 transition-colors"
        >
          Open path <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <BookmarkButton kind="paths" id={path.id} size="sm" />
      </div>
    </article>
  );
}

function Block({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className={`editorial-eyebrow mb-1 ${accent ? "text-amber" : ""}`}>{label}</div>
      <p className="text-foreground/90 leading-relaxed">{value}</p>
    </div>
  );
}
