# Content swap checklist

**This site is not launchable as-is.**

Every visible string is placeholder copy taken from the structural reference
(autoploy.us) and must be replaced before this goes anywhere public. The copy
was used verbatim as a deliberate decision — see §1 of
`docs/superpowers/specs/2026-08-24-ai-agency-site-design.md` — so that layout
and structure could be built against real-length text instead of lorem ipsum.

Nothing outside `src/content/` needs editing to swap it. Components take copy
as props; no brand string is hardcoded in a component.

Raw captures of the reference pages live in `docs/reference/`. They are the
source these modules were transcribed from, and are not imported or built.

---

## Do this first

`src/content/site.ts` — the whole brand identity, in one object.

- [ ] `BRAND.name` — currently `CrewMind`, taken from the project directory
- [ ] `BRAND.url` — currently `https://crewmind.example`; **the canonical and
      every OG URL derive from this**
- [ ] `BRAND.tagline`
- [ ] `BRAND.email` — currently `hello@crewmind.example`
- [ ] `BRAND.phone` / `BRAND.phoneHref` — currently a Hong Kong number carried
      over from the reference
- [ ] `BRAND.address` — currently the reference's Hong Kong address
- [ ] `BRAND.calendly` — currently `https://calendly.com/example/discovery-call`
- [ ] `WHATSAPP_NUMBER` (module constant, top of file) — currently the
      reference's number, `85228105510`
- [ ] `BRAND.socials` — currently `https://linkedin.com/company/example`
- [ ] `NAV_LINKS` / `FOOTER_LINKS` labels
- [ ] `PRIMARY_CTA.label`

Also replace `public/favicon.svg` and add `public/opengraph.jpg` — `useSeo`
points every page's OG image at `${BRAND.url}/opengraph.jpg`, which does not
exist yet.

---

## Page content

### `src/content/home.ts`
- [ ] `seo` title and description
- [ ] `hero` — headline, emphasised phrase, sub, eyebrow, avatar names
- [ ] `hero.video` — label, duration, and a real poster image
- [ ] `proof.note` and `proof.ratings` (see **Ratings and reviews** below)
- [ ] `booking` prompt/title/sub
- [ ] `services.items` — 8 summaries, titles, descriptions, feature bullets
- [ ] `services.enterprise` callout
- [ ] `positioning`
- [ ] `process.steps` — copy **and** the numbers inside each `visual`
- [ ] `work.items` — case study titles, impact lines, tags
- [ ] `close`

### `src/content/pricing.ts`
- [ ] `seo`
- [ ] `hero` and `hero.assurances`
- [ ] `tiers[].price.value` — **currently `$500 – $7,000+`, the reference's
      real price band. Replace with yours before launch.**
- [ ] `tiers[].features` — both tiers
- [ ] `tiers[].note`
- [ ] `guarantee` — **a money-back promise you have not agreed to make.
      Delete it or commit to it; do not ship it undecided.**
- [ ] `comparison` — see note below, this one is ours, not the reference's
- [ ] `resource` — currently points at `https://www.skool.com/example`
- [ ] `proof` — currently claims "Rated 4.5 on Trustpilot" and links
      `trustpilot.com/review/example.com`
- [ ] `close`

### `src/content/about.ts`
- [ ] `seo`
- [ ] `hero`
- [ ] `team.members` — **all seven are invented placeholders** (`Placeholder
      One` … `Placeholder Seven`) with empty `links`. Replace with the real
      team: names, roles, bios, `initials`, and `avatar` image paths.
- [ ] `team.note` — currently "Founded in late 2025"
- [ ] `story.paragraphs` — a founding story that is not yours
- [ ] `pillars` — mission, vision, approach
- [ ] `close`

### `src/content/enterprise.ts`
- [ ] `seo`
- [ ] `hero`, `hero.assurances`
- [ ] `why` — three pillars
- [ ] `capabilities.items` — six capabilities and their `stack` lists
- [ ] `stack.items` — the tool marquee
- [ ] `process.steps` — five steps
- [ ] `cases.items` — **two engagements neither you nor anyone here
      delivered.** De-identified from the reference (see below) but still not
      yours. Replace with real work or delete the section.
- [ ] `ownership` — three pillars
- [ ] `faq.items` — five answers **written fresh, not transcribed** (see below)
- [ ] `close`

### `src/content/testimonials.ts`
- [ ] `TESTIMONIALS` — **real reviews written by real named people about a
      different company.** These must go before launch; there is no version of
      shipping them that is okay.
- [ ] `RATINGS` — platform scores and review-page URLs

---

## Ratings and reviews

Every proof element on the site is currently borrowed:

- Trustpilot score of 4.5 and the review-page link, on the homepage
  (`home.ts`) and pricing page (`pricing.ts`)
- Named client testimonials in `testimonials.ts`
- The client-count line in `home.ts` → `proof.note`

Either replace them with your own verified numbers or remove the components.
`ProofBar`, `ReviewsBand` and `TestimonialRail` all degrade cleanly if the
arrays behind them are emptied.

---

## Content that has no reference counterpart

Three blocks were written for this build rather than transcribed. They are
still placeholder — they just cannot be checked against the reference.

1. **`pricing.ts` → `comparison`** — the two-tier comparison table. The
   reference has no such table; this restructures the two tiers' own feature
   lists into a single decision. Facts come from the tiers, framing does not.
   `content.test.ts` asserts the table's columns stay in sync with the tier
   titles, so renaming a tier will fail the suite until the table follows.

2. **`enterprise.ts` → `faq.items[].answer`** — the reference renders its
   accordion panels only on expand, so the answer text is absent from the
   served markup. The five questions are verbatim; all five answers are
   written fresh and make claims about timelines, support windows and working
   practices that **nobody has agreed to**. Read them before launch.

3. **`about.ts` → `team.members`** and **`enterprise.ts` → `cases.items`** —
   deliberate departures from verbatim copying. The reference names seven real
   people (with links to their real LinkedIn profiles) and one real named
   client. Restaging real individuals as this company's staff, or another
   agency's client as our own, is not something to ship even as placeholder
   text. Structure was preserved; identities were not copied.
   `content.test.ts` asserts those names never reappear.

---

## Before you call it done

- [ ] `rg -i 'placeholder|example\.(com|us)|autoploy' src/` returns nothing
- [ ] `npm test` passes — content integrity tests catch dangling routes,
      duplicate ids, and comparison columns that drifted out of sync
- [ ] Every `href` resolves; no `#` placeholder links
- [ ] `BRAND.url` is the real domain, so canonicals and OG tags are right
- [ ] `public/opengraph.jpg` exists
- [ ] Legal pages at `/privacy` and `/terms` have real content — they are
      still `Placeholder` stubs
