import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-3">
        <div>A field guide for Microsoft Copilot paths. Built for clarity, not volume.</div>
        <Link to="/changelog" className="transition-colors hover:text-amber">
          Changelog
        </Link>
      </div>
    </footer>
  );
}
