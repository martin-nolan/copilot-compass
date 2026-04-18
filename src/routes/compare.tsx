import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/compare")({
  beforeLoad: ({ location }) => {
    throw redirect({
      to: "/choose-path",
      hash: location.hash.replace(/^#/, "") || undefined,
    });
  },
  component: CompareRedirect,
});

function CompareRedirect() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="editorial-eyebrow mb-4">Compare</div>
      <h1 className="text-4xl font-medium tracking-tight">Tradeoffs moved.</h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Comparison views now live inside{" "}
        <Link to="/choose-path" className="text-amber">
          Choose a Path
        </Link>
        .
      </p>
    </div>
  );
}
