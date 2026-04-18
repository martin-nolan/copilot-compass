import { ArrowUpRight } from "lucide-react";
import { learningReferences } from "@/data/pathways";
import { getHostname } from "@/lib/utils";

type Props = {
  ids: string[];
  title?: string;
};

export function LearningReferenceList({ ids, title = "Read More" }: Props) {
  const refs = learningReferences.filter((r) => ids.includes(r.id));
  if (refs.length === 0) return null;

  return (
    <div>
      <div className="editorial-eyebrow mb-3">{title}</div>
      <ul className="divide-y divide-border border-y border-border">
        {refs.map((r) => (
          <li key={r.id}>
            <a
              href={r.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-start justify-between gap-6 py-3.5 hover:bg-secondary/30 -mx-2 px-2 rounded-md transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {r.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground/70">
                    {getHostname(r.href)}
                  </span>
                </div>
                <div className="mt-0.5 text-sm font-medium text-foreground group-hover:text-amber transition-colors">
                  {r.title}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{r.summary}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-amber transition-colors mt-1 shrink-0" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
