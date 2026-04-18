# Copilot Compass — Improvement Plan

A grounded, opinionated plan for the next few iterations of Copilot Compass.
Every item in here is tied to real code, data, or flows in this repo — no
generic advice.

The app's identity is **an opinionated, local-first, editorial field guide
for choosing what to build in the Microsoft Copilot ecosystem**. Everything
below either sharpens that identity, closes loops already in the code, or
removes noise that competes with it.

---

## 0. Principles for this plan

1. **Local-first stays.** No auth, no server DB, no account. Export/import is
   the backup story.
2. **Editorial voice is the moat.** Opinions like _"Heaviness is a tax, not
   a feature"_ are the product, not decoration.
3. **Scope discipline.** Microsoft Copilot ecosystem only. No agent-platform
   generalisation, no chat UI.
4. **Less, but sharper.** Every screen should do one job. Remove before adding.
5. **Stack discipline.** Keep TanStack Router + Vite + shadcn/ui + Tailwind v4.
   Don't refactor for its own sake.

---

## 1. Bugs and broken loops (ship first, near-free)

These items fix things that are already half-built in the code. Highest
impact-to-effort ratio in the whole plan.

### 1.1 Unify path vocabulary

Three competing vocabularies exist for the same four paths:

- `src/data/paths.ts` → `PathDef.shortName` (`"Fastest low-code"`, etc.)
- `src/components/site/DecisionForm.tsx` → hardcoded `["M365 Copilot",
  "Copilot Studio", "React App", "Hybrid"]`
- `src/data/pathways.ts` → `pathFilters` used by `/decisions`

Result: a decision saved from the walkthrough cannot be filtered by the
form's labels on the Decisions page.

**Action:** derive the form options and `pathFilters` from `paths.map(p =>
p.shortName)`. One source of truth.

### 1.2 Wire `trackRecent` into the three content surfaces

`useLocalStore.trackRecent` is defined but **only called from the walkthrough
result flow**. `LearnModuleCard`, `ComparisonSection`, and `UseCaseDetail`
never record a visit, so the home page "Continue where you left off" stays
empty for real users.

**Action:** call `trackRecent` when a module/comparison/use case enters the
viewport for ≥1s (reuse the `IntersectionObserver` pattern already in
`learn.tsx`). Cap at the existing 8.

### 1.3 Ship a `/saved` (library) route

`bookmarks` already stores module, comparison, useCase, and path ids — and
the app has **no way to view them**. Users can star things and never find
them again.

**Action:** one route, four sections (Modules, Comparisons, Use cases, Paths),
each mapping `state.bookmarks.*` → the same cards used on their origin pages.
Empty state: a single line pointing at the walkthrough.

### 1.4 Surface learning progress

`completedModules` is tracked but never aggregated or visualised.

**Action:**
- In `/learn` header: `"3 of 11 modules complete"` + thin progress bar.
- On the home Learn promo (`index.tsx` → `LEARN PROMO`): a small
  `N/11 modules` badge next to the "Field guide" eyebrow.
- No per-chapter bars yet — keep it minimal.

### 1.5 Fix duplicate meta in `__root.tsx`

`__root.tsx` currently sets a `description` meta that overrides the per-route
one in some TanStack Router versions.

**Action:** remove the duplicate root-level `description`; keep per-route
metas as the source of truth. Verify with view-source on two routes.

---

## 2. Sharpen the walkthrough (the real differentiator)

The walkthrough is the one experience other Copilot resources don't offer.
It deserves more than a single-run quiz.

### 2.1 Persist walkthrough-in-progress

Currently a refresh mid-flow drops all answers. Answers are already in
component state; persist them to a draft key in `useLocalStore`.

- `walkthroughDraft: { step: number; answers: Record<string, string>; updatedAt: number } | null`
- Auto-save on every `choose()`.
- Clear on submit or explicit restart.
- Add a **"Resume walkthrough"** continuity card on the home page when a
  draft exists (alongside `currentPath` / `lastRec` / `recents`).

### 2.2 Make the result editable

On the result screen, show each answer as a chip ("Where: Inside Microsoft
365 — change"). Clicking jumps back to that step, keeps other answers, and
re-scores.

Right now the only option is full restart, which discourages the exact
exploration of tradeoffs this product is about.

### 2.3 Show the runner-up path and what would flip it

All four scores are already computed. Surface:

> "Path 02 scored nearly as high. The two answers most responsible for the
> gap were _Channels_ and _Governance_. If either flipped, Path 02 would
> win."

This is the product's brand: explaining tradeoffs, not just picking winners.

### 2.4 Shareable result URLs

Encode answers as a compact query string, e.g.
`/walkthrough?a=m365,knowledge,speed,fast,small,yes,studio,medium`. On load,
hydrate `answers` and `step = questions.length`.

- "Copy link to this recommendation" button next to "Save to Decisions".
- No backend required.
- Dramatically improves usefulness in Slack/Teams/email.

### 2.5 "2-minute reality check" view

A condensed one-screen result: path, first move, common mistake, one
learn-next. With a **"Copy as text"** button that outputs a Markdown block
consultants can paste into a ticket.

All data already exists on `PathDef` and `learnExtras`.

---

## 3. New features worth adding

Chosen for fit with the editorial-field-guide identity.

### 3.1 Command palette (`cmd+k`)

`cmdk` is already in `package.json` but **unused**. Index:

- Paths (by `name` and `shortName`)
- Learn modules (by `title`, `chapter`)
- Comparisons (by `title`)
- Use cases (by `title`)
- Route shortcuts ("Open walkthrough", "Saved", "Decisions")

Trigger from `NavBar` via a subtle "Search (⌘K)" button. A first-class
navigation layer for a content-heavy product, with almost no design cost.

### 3.2 "Red flag" scanner on `/decisions`

Encode the app's opinions as inline feedback on saved decisions:

- `chosenPath === "High-code custom"` and empty `productionNotes` → amber
  chip _"Heaviest path, lightest notes — revisit."_
- `stage === "Production"` with no referenced modules → _"No learning
  anchored to this decision yet."_
- Decision older than 90 days → _"Worth re-reading — the ecosystem has
  moved."_

Turns Decisions from a notes list into a lightweight coach.

### 3.3 Editable decisions + Markdown-rendered notes

Currently add/delete only; notes are plain text.

- Reuse `DecisionForm` prefilled for edit mode.
- Render notes as lightweight Markdown (links, bold, bullets). No new dep
  needed — a 40-line renderer covers what these notes actually contain.

### 3.4 `reviewedAt` + freshness indicator

Add `reviewedAt: string` to `LearnModule`, `Comparison`, `UseCase`. Show a
subtle _"Reviewed Mar 2026"_ line. When older than 180 days, render an
amber _"Worth re-checking"_ pill.

Content integrity is existential for a field guide about an ecosystem that
changes this fast. Stale content is a quiet trust killer.

### 3.5 Changelog route

`/changelog` reading from `src/data/changelog.ts`:

- Date
- One-sentence editorial entry
- Optional `relatedModuleIds`

Signals "this is a living field guide" for about half a day's work.

### 3.6 `/llms.txt` endpoint

Generate a clean Markdown digest at build time of paths + modules +
comparisons + use cases, served at `/llms.txt`. Given the audience, this
gets the guide into Copilot/ChatGPT answers about the Microsoft agent
ecosystem. Extremely on-brand.

### 3.7 Facets on `/learn`

Already available in `learnExtras`: `complexity`, `bestForPaths`. Surface as
chip filters above the module list. No new data needed.

### 3.8 "See also" module chips

Add `relatedModuleIds?: string[]` to `LearnModule`. Render as chips at the
bottom of each `LearnModuleCard`. Breaks up linear reading.

### 3.9 Auto-backup of store

Weekly snapshot to a second localStorage key
(`copilot-compass:store:backup:v1`). Shown on `/decisions` as _"Last
auto-backup: 3 days ago · Restore"_. Cheap insurance against accidental
clears.

### 3.10 Keyboard navigation in the walkthrough

`1`–`5` to pick answer, `←`/`→` to step back/forward. Makes repeat use
(which consultants will do) dramatically faster.

---

## 4. Remove this. The app is too content-heavy.

The home page is **seven vertical sections**; several routes duplicate each
other; each content card stacks 4–6 blocks of copy. A lot of it doesn't
earn its space.

### 4.1 Collapse the home page from 7 sections to 4

Current sections in `src/routes/index.tsx`:

1. Hero
2. Continuity
3. Choose-your-route preview
4. Walkthrough CTA
5. Featured comparisons
6. Featured use cases
7. Learn promo

Problems:

- The **Choose-your-route preview (3)** repeats `/choose-path` with less
  detail. Visitors who care click through; visitors who don't skim both.
- **Walkthrough CTA (4)** is already the primary CTA in the hero. Two
  walkthrough asks before section 5 is fatigue.
- **Use cases (6)** and **Learn promo (7)** compete for the same
  "secondary exploration" slot.

**Proposed home:**

1. Hero (one primary CTA — walkthrough — and one quiet secondary — Choose a
   path)
2. Continuity (only render when there's state; otherwise collapse into
   hero)
3. "Where to go next" — a single unified grid of 6 tiles mixing paths,
   comparisons, and modules, editorially curated (not auto-sliced). One
   section instead of three.
4. Learn promo as a thin hairline strip with one sentence and a link.

Result: half the scroll depth; every section earns its place.

### 4.2 Cut the third hero CTA

Hero currently has three CTAs. Three CTAs = no CTA.

- Keep: `Take the walkthrough` (amber, primary)
- Demote to quiet link: `Choose a path`
- **Remove: `Browse the field guide`** — it's linked five more times below
  and in the nav.

### 4.3 Trim `LearnModuleCard` from five copy blocks to three

Each module card currently shows: `summary`, `goodFor`, `lessIdealFor`,
`pocShape`, `productionShape`, and a collapsible references list.

- **`lessIdealFor` is almost always the inverse of `goodFor`** (verified
  against every entry in `learnModules.ts`). Cut it. If a real
  contraindication exists, fold it into `summary`.
- Collapse `pocShape` / `productionShape` into a single toggle: _"Show PoC
  shape | Show production shape"_ so only one is on screen at a time.
- Keep `summary` always visible.

Visual weight per card drops ~40%.

### 4.4 Progressive disclosure on `/choose-path`

Right now each of the four paths renders the full `PathDetail` stack at
once: `whenRight`, `whyThis`, `keyTradeoff`, `bestFirstMove`, `avoidIf`,
`focus[]`, `learnNext[]`, `relatedComparisons[]`, `relatedUseCaseIds[]`,
`learningReferenceIds[]`. That's ten sections × four paths on one page.

**Proposed:**

- Always visible: `name`, `tagline`, `complexity`, `bestFirstMove`.
- Collapsed behind _"Full profile"_ accordion: everything else.
- "Set as my path" stays in the always-visible header.

Keeps the comparison glanceable and rewards depth for people who want it.

### 4.5 Merge `/compare` lens views into `/choose-path`

`/compare` is four comparison lenses; most of them already live on the
relevant path in `relatedComparisons`. A separate top-level route competes
for attention the app can't afford at this size.

**Proposed:** demote `/compare` to anchors inside `/choose-path` ("See
tradeoff: Builder vs Studio"). Keep `ComparisonSection` as a reusable
block. Drop the nav item.

Nav goes 7 → 6 items, which matters (see 4.7).

### 4.6 Trim Use Cases from 6 to 3–4

With only 6 entries and overlap in shape (internal knowledge / support
triage / workflow assistant all rhyme), cut to the 3–4 most distinct
(`internal-knowledge`, `dashboard-companion`, `workflow-assistant`,
`research-copilot`).

Fewer, sharper examples serve the editorial voice better than a full grid.

### 4.7 Slim the NavBar

Currently 7 items horizontally, no mobile sheet. After 4.5 this becomes 6:

`Home · Choose path · Walkthrough · Learn · Use cases · Decisions`

On `< md`, collapse into a `Sheet` triggered from a menu button (`sheet`
component is already installed). Add the command-palette trigger (3.1) to
the right.

### 4.8 Kill the `Footer` or make it a single line

`src/components/site/Footer.tsx` exists and is tiny already; make sure it's
one line with attribution + build date + a link to `/changelog`. No nav
duplicates of the header.

### 4.9 Word-count pass

Target-specific trims in the content files:

- `paths.ts` → `whenRight`, `whyThis`, `keyTradeoff` are each 1–2
  sentences. Audit for sentences that start with _"Almost no …"_, _"Stronger
  lifecycle story: …"_ etc. and reduce to one crisp line.
- `index.tsx` hero subhead is 3 sentences; can be 1. _"Decide what to learn
  next and which Copilot path fits the idea — low-code, Studio, React, or
  custom."_

Rule of thumb: if a sentence doesn't change the reader's next decision, cut
it.

---

## 5. Accessibility and polish

Small, but a premium-positioned app should get these right.

- **Focus rings.** Add `focus-visible:ring-2 focus-visible:ring-amber/50`
  to every custom button-like element (walkthrough option buttons,
  `PathCard`, `UseCaseCard`, `ComparisonSection` tabs).
- **Walkthrough ARIA.** `role="progressbar"` with `aria-valuenow` /
  `aria-valuemax` on the progress bar; `aria-current="step"` on the active
  step.
- **External link hygiene.** `LearningReferenceList` should render external
  links with `rel="noopener"` and a small domain stamp
  (e.g. `learn.microsoft.com`). Internal vs external should be visually
  distinguishable.
- **Respect `prefers-reduced-motion`** for the hero glow and card hover
  transitions.
- **Learn chapter nav on `< lg`.** Currently `lg:block` only. Add a
  sticky horizontal chip row under the NavBar on smaller screens, reusing
  the existing `IntersectionObserver` active-state logic.

---

## 6. What NOT to do

- **Don't add auth or a server DB.** Kills the install-nothing pitch.
- **Don't add a chat UI.** Competes with what the guide is teaching people
  to reason about.
- **Don't broaden to non-Microsoft agent ecosystems.** Focus is the moat.
- **Don't refactor off TanStack Router.** README is explicit; spend the
  time on content and flows.
- **Don't add per-chapter progress bars yet** (4.4 style). A single
  top-level module count is enough signal.
- **Don't ship community features** (comments, forks, votes) until the
  single-user experience is tight.

---

## 7. Priority and sequencing

### Release 1 — "Tighten what exists" (≈ 1 day)

Everything here is low-risk and visible.

1. §1.1 Unify path vocabulary
2. §1.2 Wire `trackRecent`
3. §1.3 Ship `/saved`
4. §1.4 Surface learning progress
5. §1.5 Fix duplicate root meta
6. §4.2 Cut third hero CTA
7. §4.3 Trim `LearnModuleCard` (remove `lessIdealFor`, toggle PoC/Prod)
8. §5 (focus rings + walkthrough ARIA)

### Release 2 — "Less content, sharper paths" (≈ 1 day)

1. §4.1 Collapse home from 7 sections to 4
2. §4.4 Progressive disclosure on `/choose-path`
3. §4.5 Merge `/compare` into `/choose-path`, drop nav item
4. §4.6 Trim Use Cases to 3–4
5. §4.7 Slim NavBar + mobile sheet
6. §4.9 Word-count pass on `paths.ts` + hero subhead

### Release 3 — "Walkthrough as differentiator" (≈ 1 day)

1. §2.1 Persist walkthrough draft + home resume card
2. §2.2 Editable result answers
3. §2.3 Runner-up path explanation
4. §2.4 Shareable result URLs
5. §2.5 "2-minute reality check" view

### Release 4 — "Living field guide"

1. §3.1 Command palette
2. §3.2 Red-flag scanner on `/decisions`
3. §3.3 Editable decisions + Markdown notes
4. §3.4 `reviewedAt` freshness
5. §3.5 Changelog route
6. §3.6 `/llms.txt`
7. §3.7 Learn facets
8. §3.8 "See also" module chips
9. §3.9 Auto-backup + restore
10. §3.10 Keyboard walkthrough nav

---

## 8. Success signals (anecdotal, no analytics)

Because this is local-first, the measurable signals are qualitative:

- Someone can share a walkthrough URL and the recipient immediately
  understands the reasoning. (§2.4)
- A first-time visitor gets from the hero to a walkthrough result in under
  two minutes without scrolling past anything unnecessary. (§4.1, §4.2)
- Returning users see a continuity card that actually has content. (§1.2,
  §2.1)
- A decision saved three months ago flags itself as worth revisiting.
  (§3.2, §3.4)
- Users stop bookmarking external tabs and start using `/saved`. (§1.3)

If those five stop feeling aspirational, the plan is working.
