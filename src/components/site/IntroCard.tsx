import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  to: string;
  symbol: string;
};

export function IntroCard({ eyebrow, title, description, to, symbol }: Props) {
  return (
    <Link
      to={to}
      className="premium-card group block p-6 h-full"
    >
      <div className="flex items-start justify-between mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber/20 to-amber/5 border border-amber/20 text-amber font-serif text-lg">
          {symbol}
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-amber transition-colors" />
      </div>
      <div className="editorial-eyebrow mb-2">{eyebrow}</div>
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </Link>
  );
}
