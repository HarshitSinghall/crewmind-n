# AI Automation Agency Site — Design Spec

**Date:** 2026-08-24
**Status:** Awaiting review
**Reference:** autoploy.us (structure + placeholder copy source)

---

## 1. Goal

Build a 14-page marketing site for an AI automation agency, modelled on autoploy.us's information architecture and offer structure, but materially better on the four axes selected:

Page count: home, services index, 8 service detail pages, pricing, about, enterprise, past-projects — plus a 404.

1. **Premium / high-trust craft** — reads like an infrastructure company, not an agency funnel
2. **Stronger conversion architecture** — one clear action per viewport, honest proof
3. **Motion & interaction polish** — purposeful, interruptible, reduced-motion safe
4. **Performance & technical quality** — fast LCP, AA contrast, no CLS, real SEO metadata

### Copy status

Autoploy's copy is used **verbatim as placeholder text**, per explicit decision. The site is **not launchable as-is** — every string lives in `src/content/` so it can be swapped file-by-file before launch. A `CONTENT-SWAP.md` checklist ships with Phase 1 listing every content file and the brand-identifying strings inside it.

`src/content/site.ts` exports a single `BRAND` object (name, domain, email, phone, address, socials). Default is `CrewMind`, taken from the project directory name — change it in one place. No brand string is hardcoded in any component.

---

## 2. Stack

| Concern | Choice | Why |
|---|---|---|
| Build | Vite + React + TypeScript | Selected. Fast HMR, no framework overhead for a marketing site. |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) | Tokens live in CSS custom properties, consumed by both Tailwind utilities and raw CSS. No `tailwind.config.js` to drift out of sync. |
| Routing | react-router-dom v7 | 14 routes, nested service routes, scroll restoration. |
| Motion | `motion` (framer-motion) | Interruptible springs and path-draw; CSS alone can't do the timeline and flow diagrams well. |
| Icons | `lucide-react` | Consistent 1.5px stroke weight, tree-shakeable. |
| Testing | Vitest + React Testing Library + `vitest-axe` | Content-integrity and a11y regression tests. |
| Components | None (bespoke) | A component library is the fastest route to the generic look we are explicitly avoiding. |

---

## 3. Design language

### 3.1 Direction: "Graphite & Signal"

The reference site uses purple (`#674EA7`) plus an orange CTA plus red accents — three competing hues, none of them owned. We go the other way: a deep neutral canvas, **one** accent for identity, and **one** reserved colour that means "this is the action". Restraint is the entire premium signal.

- **Canvas** — deep graphite with a cool cast, not pure black (pure `#000` reads cheap and crushes shadow detail)
- **Accent (identity)** — a precise cyan-teal. Used for borders, glyphs, active states, data viz. Never for buttons.
- **CTA (action)** — warm amber. Used *only* on primary buttons. Because nothing else in the palette is warm, every CTA is unmissable without being loud. This is the conversion-architecture fix expressed as colour.
- All colours authored in `oklch()` for perceptually even ramps.

**Exact values:**

| Token | Value | Role |
|---|---|---|
| `--bg` | `oklch(0.145 0.012 250)` | Page canvas |
| `--surface-1` | `oklch(0.185 0.014 250)` | Cards, nav when scrolled |
| `--surface-2` | `oklch(0.225 0.016 250)` | Raised cards, hover |
| `--surface-3` | `oklch(0.275 0.018 250)` | Inputs, code blocks |
| `--border-subtle` | `oklch(0.300 0.015 250)` | Default card border |
| `--border-strong` | `oklch(0.420 0.020 250)` | Hover / focus border |
| `--text-1` | `oklch(0.970 0.004 250)` | Headings, body |
| `--text-2` | `oklch(0.760 0.008 250)` | Secondary body, ~8:1 on `--bg` |
| `--text-3` | `oklch(0.580 0.010 250)` | Meta only — see note |
| `--accent` | `oklch(0.800 0.125 195)` | Identity: borders, glyphs, active, data viz |
| `--accent-dim` | `oklch(0.580 0.090 195)` | Accent at rest / connector lines |
| `--cta` | `oklch(0.800 0.160 75)` | Primary buttons **only** |
| `--cta-fg` | `oklch(0.200 0.030 75)` | Text on `--cta` |
| `--success` | `oklch(0.780 0.140 155)` | Positive state |
| `--warn` | `oklch(0.800 0.150 55)` | Caution state |

**Contrast note:** `--text-3` lands near 4.5:1 on `--bg`, so it is
restricted to large text (18px+) and non-essential meta such as
timestamps and tag labels. Any body copy at 16px or below uses
`--text-2` or `--text-1`. This is asserted in the a11y test pass, not
left to discipline.

### 3.2 Type

| Role | Face | Notes |
|---|---|---|
| Display | Instrument Sans | Tight tracking (`-0.02em` to `-0.04em`) at large sizes |
| Emphasis | Instrument Serif *italic* | One emphasised phrase per major headline (e.g. *"win the next decade"*). The single most effective premium cue available, and cheap. |
| Body | Inter | `font-feature-settings: 'cv05','ss03'` |
| Mono | JetBrains Mono | Eyebrows, stat numbers, tags, badges. `font-variant-numeric: tabular-nums` anywhere a number can change. |

Loaded from Google Fonts with `preconnect` + `display=swap`, weights subset to exactly what is used. Every stack has a real system fallback.

### 3.3 Tokens

`src/styles/tokens.css` — the single source of truth, surfaced to Tailwind via `@theme inline`.

- **Colour:** `--bg`, `--surface-1|2|3`, `--text-1|2|3`, `--border-subtle|strong`, `--accent`, `--accent-dim`, `--cta`, `--cta-fg`, `--success`, `--warn`
- **Type scale:** 8 fluid steps via `clamp()`, `--step--1` through `--step-6`
- **Space:** 4px base, `--space-1` through `--space-24`
- **Radii:** `--r-sm|md|lg|xl|full`
- **Shadow:** 3 layered elevations, low-opacity and *tinted with the canvas hue* rather than black
- **Motion:** `--dur-fast` 120ms / `--dur-base` 240ms / `--dur-slow` 480ms; `--ease-out-expo`, `--ease-spring`

Dark is the primary and only theme. It is defined on bare `:root` — not inside a media query — so nothing depends on the visitor's OS setting.

---

## 4. Architecture

Design-system-first, with one data-driven template applied surgically to the 8 structurally-identical service pages.

```
src/
  main.tsx
  App.tsx                    # router + layout shell
  styles/
    tokens.css               # all design tokens
    global.css               # reset, base type, focus rings, skip link
  lib/
    useSeo.ts                # per-route title/meta/canonical
    useReveal.ts             # intersection observer + reduced-motion
    useCountUp.ts
    cn.ts
  components/
    ui/                      # primitives — no business content
      Section.tsx  Container.tsx  Eyebrow.tsx  Heading.tsx  Text.tsx
      Button.tsx   Card.tsx       Badge.tsx    Stat.tsx     Divider.tsx
      Avatar.tsx   AvatarStack.tsx Reveal.tsx  Marquee.tsx
      Accordion.tsx Tabs.tsx      RatingBadge.tsx
    blocks/                  # composed sections — take content as props
      Nav.tsx      Footer.tsx     WhatsAppFab.tsx
      Hero.tsx     VideoSlot.tsx  ProofBar.tsx  TestimonialRail.tsx
      BookingSection.tsx      ServiceGrid.tsx   ProcessTimeline.tsx
      StatRow.tsx  CaseStudyRail.tsx  ComparisonTable.tsx
      FAQ.tsx      ScarcityClose.tsx  AgentFlowDiagram.tsx
    templates/
      ServicePage.tsx        # drives all 8 /services/:slug pages
  content/
    types.ts                 # every content shape, typed
    site.ts                  # BRAND, nav, contact, CTA urls
    home.ts  pricing.ts  about.ts  enterprise.ts
    services.ts              # ServiceContent[] — feeds grid AND detail pages
    projects.ts              # CaseStudy[] with category tags
    testimonials.ts          # ONE array, deduped
  pages/
    Home.tsx  Services.tsx  ServiceDetail.tsx  Pricing.tsx
    About.tsx Enterprise.tsx PastProjects.tsx  NotFound.tsx
```

**The boundary that matters:** `ui/` knows nothing about the business. `blocks/` composes `ui/` and accepts content as props. `pages/` wires `content/` into `blocks/`. Nothing in `components/` imports from `content/` except `templates/ServicePage.tsx`, which takes a `ServiceContent` as its single prop.

That is what makes the copy swap a scoped edit in one directory instead of an archaeology exercise across 12 pages.

### 4.1 Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Home | Long scroll, all blocks |
| `/services` | Services | Grid from `services.ts` |
| `/services/:slug` | ServiceDetail | `ServicePage` template, 8 slugs |
| `/pricing` | Pricing | Two-tier + guarantee + proof |
| `/about` | About | Mission/vision/approach + team |
| `/enterprise` | Enterprise | Capabilities, stack, process, case studies, FAQ |
| `/past-projects` | PastProjects | Filterable by category via `?category=` |
| `*` | NotFound | |

Service pages are `React.lazy`-loaded. `?category=` is read from and written to the URL so filtered views are shareable and back-button-correct.

---

## 5. Conversion architecture — the specific fixes

These are defects in the reference site, not stylistic preferences:

1. **Testimonials render once.** The reference emits its entire review set twice in the homepage DOM (and again on service pages). Ours reads one deduped array; `Marquee` achieves the seamless loop with a CSS transform over a single cloned track, and the clone is `aria-hidden`.
2. **No fake progress bar.** The reference's video player ships `fakeBar: { active: true }`. `VideoSlot` is an honest poster with a real play affordance and a real duration label.
3. **One primary action per viewport.** Amber `Button variant="primary"` is the only amber element on screen. WhatsApp drops to `variant="ghost"`. The reference places two equal-weight CTAs side by side in four separate places, which splits intent.
4. **Sticky nav CTA** fades in only after the hero scrolls past, so there is always exactly one visible primary action without stacking two above the fold.
5. **Proof immediately after hero** — rating badges and a client-count line, before the services grid.
6. **One scarcity close**, not a repeat of the hero CTA block.
7. **`#book` anchor** scrolls with `scroll-margin-top` matched to nav height, so the heading is not hidden under the sticky bar.

---

## 6. Motion spec

| Element | Behaviour |
|---|---|
| `Reveal` | 16px rise + fade, 480ms `--ease-out-expo`, 60ms stagger, fires once at 20% visibility |
| Card hover | 120ms; `translateY(-2px)`, border to `--border-strong`, accent glyph brightens |
| Nav | Past 24px scroll: `backdrop-blur(12px)`, surface tint, bottom border fades in |
| `ProcessTimeline` | Connector line draws via `scaleY` as it enters; step nodes pop with `--ease-spring`, staggered |
| `AgentFlowDiagram` | Connectors draw left to right via `pathLength`; node labels fade in behind them |
| `Marquee` | Continuous translate, pauses on hover and on focus-within |
| Stat counters | Count up on enter, `tabular-nums` so width never shifts |

**`prefers-reduced-motion: reduce`** — all transforms, parallax, marquee, path-draw and count-up are disabled; opacity fades kept at 120ms. Enforced both in `useReveal` and in a global CSS block, so a component that forgets still degrades correctly.

---

## 7. Quality bar

- **A11y:** semantic landmarks, skip link, focus rings using `--accent` at 2px offset (never `outline: none`), AA contrast on every text/background pair, `Accordion` and `Tabs` keyboard-operable with correct ARIA, decorative `AvatarStack` images `aria-hidden`.
- **Perf:** route-level code splitting; explicit `width`/`height` or `aspect-ratio` on every image; below-fold images `loading="lazy"` + `decoding="async"`; fonts preconnected and subset; no layout shift from the sticky nav.
- **Responsive:** 320px to ultrawide. Wide content (the AI-vs-human comparison table, case-study rails) scrolls inside its own `overflow-x: auto` container — the page body never scrolls sideways.
- **SEO:** `useSeo` sets per-route title, description, canonical and OG tags from the content modules. Exactly one `<h1>` per page.

---

## 8. Testing

Light but real, per TDD:

- **Content integrity** — every slug in `services.ts` resolves to a route; every `nav` href resolves; no duplicate testimonial or project `id`; every `CaseStudy.category` exists in the service category list.
- **Rendering** — each page renders with its real content module without throwing; exactly one `<h1>`.
- **A11y** — `vitest-axe` on Home, Pricing, and one `ServicePage`.
- **Reduced motion** — `useReveal` returns the static state when the media query matches.

---

## 9. Delivery phases

**Phase 1 — Foundation + Home**
Scaffold, tokens, global CSS, all `ui/` primitives, `Nav` / `Footer` / `WhatsAppFab`, every homepage block, `Home` page, `site.ts` + `home.ts` + `testimonials.ts`, test setup, `CONTENT-SWAP.md`.

**Phase 2 — High-intent pages**
`Pricing`, `About`, `Enterprise` and their content modules. Adds `ComparisonTable`, `Accordion`-driven `FAQ`, team grid, capability grid, tech-stack marquee.

**Phase 3 — Catalogue**
`PastProjects` with URL-driven filtering, `Services` index, `ServicePage` template and all 8 service content entries.

---

## 10. Known content gap

Full copy captured for: home, pricing, about, enterprise, services index, past-projects (~40 case studies), and 4 service pages (GEO, AI Agents & Assistants, Lead Gen & Outreach, AI Receptionist).

**Summary-level only** (title, description, 3 feature bullets from the services index) for: Social Media Automation, AI Copywriting, Custom AI Agent Team, Custom AI Solutions.

Phase 3 builds all 8 from the same `ServiceContent` shape. The four above will have thinner `sections` arrays, marked `// TODO: thin — source detail or write fresh` in `services.ts`. They render correctly and completely; they simply carry less copy. Since all of it is placeholder text being replaced before launch, this is not worth another scraping pass unless the structure needs to be mirrored exactly.

---

## 11. Out of scope

No CMS, no backend, no forms that POST anywhere (Calendly is an embed, WhatsApp is a deep link), no i18n scaffolding (the reference has a 中文 toggle; we ship English and keep strings centralised so i18n stays possible later), no analytics, no live-chat widget.
