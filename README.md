# 🧭 Copilot Compass

A premium, dark-mode **decision and learning hub** for navigating the Microsoft Copilot ecosystem — before you write a line of code.

> Built with [Loveable](https://loveable.dev) through iterative prompting, visual refinement, and product-shaping — not a traditional hand-coded workflow.

Live URL: [copilot-compass.lovable.app](https://copilot-compass.lovable.app)

---

## What it is

Copilot Compass helps answer the questions that come up every time you start a new Copilot idea:

- Should this start in **Agent Builder** or **Copilot Studio**?
- Is this a **low-code**, **structured low-code**, **React-led**, or **high-code** problem?
- Is this a **genuine PoC**, or is it already drifting toward something production-shaped?
- What should I **learn next** for this route?
- When is a **React app shell** actually justified?
- When do I need real control over orchestration, tools, channels, or integrations?

The app is now shaped around **learning first, decisions second** — helping you build a mental model of the Copilot ecosystem, not just pick a path and move on.

---

## Screens

| Screen | Purpose |
|---|---|
| **Home** | Orientation and entry point |
| **Choose a Path** | Route overview — low-code → high-code |
| **Walkthrough** | Interactive decision tree for your idea |
| **Learn** | Concept-led modules on agents, declarative vs custom engine, orchestration, tools & more |
| **Compare** | Side-by-side breakdowns of major implementation choices |
| **Use Cases** | Realistic product shapes with route recommendations |
| **Decisions** | Local-first notes for saving your route, tradeoffs, and next steps |

---

## Direction

The product started as a **decision hub** — a routing tool to help you pick the right Copilot path.

It has since evolved into a **learning and decision companion**. The goal is now to:

- Build a genuine mental model of the Microsoft Copilot ecosystem
- Surface the tradeoffs and concepts that sit behind each route
- Help you move from "I've heard of Agent Builder" to "I know when and why to use it"
- Make the path from idea → correct approach as short as possible

The decision flow still matters — but learning content is now a first-class part of the product.

---

## Philosophy

This is not a docs mirror.  
It is not a corporate LMS.  
It is not an admin tool.

It is a **premium decision and learning companion** for anyone exploring how to build with Microsoft Copilot.

---

## Built with Loveable

This project is intentionally and proudly **vibe-coded**.

- Product was shaped through prompting
- UI/UX was iterated conversationally
- Structure, flows, and content hierarchy were developed interactively
- Implementation was generated and refined inside Loveable

This is a product-thinking, design-led, AI-assisted build — not a from-scratch engineering project.

---

## Working model

This repo is designed to stay compatible with **Loveable's foundation**.

That means the goal is **not** to aggressively refactor the underlying app setup into a more conventional hand-built structure just for cleanliness. The priority is to preserve the parts Loveable is likely to expect, while improving the parts humans need in order to understand and work with the project confidently.

### Foundation to keep

Keep these unless there is a clear Loveable-safe reason to change them:

- Loveable's Vite and TanStack foundation
- shadcn/ui configuration and component structure
- The current dependency graph in `package.json`
- Bun-related repo artifacts that ship with the Loveable setup

### What can still improve safely

These can be tightened without fighting the platform:

- installation story
- local reproducibility
- package-manager expectations for contributors
- repo metadata, docs, and product-facing naming

---

## Tech

- **Framework:** React + TypeScript + Vite
- **Styling:** TailwindCSS + shadcn/ui
- **Deploy:** Cloudflare (Wrangler)
- **Decisions storage:** Local-first (browser localStorage)

---

## Local development

### Canonical package manager

For humans working locally, treat **npm as the canonical package manager** for this repo.

Why:

- `package-lock.json` is present and should be treated as the primary reproducibility lockfile for local work
- npm is the safest default for contributors who are not operating through Loveable directly
- Bun artifacts are still retained because they are part of the exported Loveable foundation and should not be removed casually

### Bun and Loveable

This repo also includes `bun.lockb` and `bunfig.toml`.

Those files are kept for **Loveable compatibility**, not as a signal that contributors should freely switch package managers back and forth. Avoid changing package managers casually on the same branch unless there is a specific reason to do so.

### Install and run

```bash
npm install
npm run dev
```

Other useful commands:

```bash
npm run build
npm run lint
npm run format
```

### Lockfile policy

- Treat `package-lock.json` as the canonical local lockfile
- Keep `bun.lockb` in the repo because it is part of the Loveable-generated foundation
- Do not delete or "clean up" Bun-related files just because npm is the default for local work
- Avoid dependency pruning unless you know a package is genuinely unused and safe to remove from the Loveable setup

In short: **npm-first for local contributors, Loveable compatibility always preserved**.

---

## Status

Active concept build.

Current focus:
- Strengthening learning content and module structure
- Improving the interactive walkthrough
- Refining route recommendations
- Improving learning UX and content hierarchy
