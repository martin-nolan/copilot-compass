import { Link } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Home" },
  { to: "/choose-path", label: "Choose a Path" },
  { to: "/walkthrough", label: "Walkthrough" },
  { to: "/learn", label: "Learn" },
  { to: "/use-cases", label: "Use Cases" },
  { to: "/decisions", label: "Decisions" },
] as const;

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-amber to-amber-soft shadow-[0_0_30px_-8px_var(--color-amber)]">
            <span className="h-2 w-2 rounded-sm bg-background" />
          </span>
          <span className="text-sm font-medium tracking-tight whitespace-nowrap">
            Copilot <span className="text-muted-foreground">Compass</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 text-sm overflow-x-auto no-scrollbar">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-2 sm:px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors text-xs whitespace-nowrap"
              activeProps={{
                className:
                  "px-2 sm:px-2.5 py-1.5 rounded-md text-foreground bg-secondary/60 text-xs whitespace-nowrap",
              }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="hidden sm:inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
          >
            <Search className="h-3.5 w-3.5" />
            Search
            <span className="text-[10px] text-muted-foreground/70">⌘K</span>
          </button>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="border-border bg-card">
              <SheetHeader>
                <SheetTitle>Copilot Compass</SheetTitle>
                <SheetDescription>Move between the guide's main surfaces.</SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-2">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block rounded-xl border border-border px-4 py-3 text-sm text-foreground/90 transition-colors hover:border-amber/40 hover:text-amber"
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
                  className="flex w-full items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm text-foreground/90 transition-colors hover:border-amber/40 hover:text-amber"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
