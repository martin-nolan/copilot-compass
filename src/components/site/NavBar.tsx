import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/compare", label: "Compare" },
  { to: "/use-cases", label: "Use Cases" },
  { to: "/decisions", label: "Decisions" },
] as const;

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-amber to-amber-soft shadow-[0_0_30px_-8px_var(--color-amber)]">
            <span className="h-2 w-2 rounded-sm bg-background" />
          </span>
          <span className="text-sm font-medium tracking-tight">
            Copilot <span className="text-muted-foreground">Pathways</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{
                className:
                  "px-3 py-1.5 rounded-md text-foreground bg-secondary/60",
              }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
