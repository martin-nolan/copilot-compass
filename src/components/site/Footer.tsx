export function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-xs text-muted-foreground">
          A field guide for Microsoft 365 Copilot, Copilot Studio, and custom React experiences.
        </div>
        <div className="text-xs text-muted-foreground">
          Built for clarity. Not a docs portal.
        </div>
      </div>
    </footer>
  );
}
