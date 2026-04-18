import type { ReactNode } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { CommandPalette } from "@/components/site/CommandPalette";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="editorial-eyebrow mb-4">404</div>
        <h1 className="text-3xl font-medium text-foreground">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">That path doesn't exist in this guide.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-amber px-4 py-2 text-sm font-medium text-amber-foreground transition-colors hover:bg-amber/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Copilot Compass — Choose the right Copilot path" },
      { name: "author", content: "Copilot Compass" },
      { property: "og:title", content: "Copilot Compass - Choose the right Copilot path" },
      {
        property: "og:description",
        content:
          "Choose the right Copilot path before you build. Compare M365 Copilot, Copilot Studio, and React app experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Copilot Compass - Choose the right Copilot path" },
      {
        name: "description",
        content:
          "Copilot Compass is a decision and learning hub for navigating the Microsoft Copilot Agents ecosystem, helping teams choose the correct agent approach.",
      },
      {
        property: "og:description",
        content:
          "Copilot Compass is a decision and learning hub for navigating the Microsoft Copilot Agents ecosystem, helping teams choose the correct agent approach.",
      },
      {
        name: "twitter:description",
        content:
          "Copilot Compass is a decision and learning hub for navigating the Microsoft Copilot Agents ecosystem, helping teams choose the correct agent approach.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e0868a16-4520-435d-b88e-2c0f27a1e194/id-preview-7ee79c69--4c8dfcd2-0325-4d2b-a3a5-392366ac97f7.lovable.app-1776503838927.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e0868a16-4520-435d-b88e-2c0f27a1e194/id-preview-7ee79c69--4c8dfcd2-0325-4d2b-a3a5-392366ac97f7.lovable.app-1776503838927.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Fraunces:opsz,wght@9..144,400;9..144,500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CommandPalette />
    </div>
  );
}
