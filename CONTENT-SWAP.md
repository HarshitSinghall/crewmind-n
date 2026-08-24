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

**Done.** This file now carries the real registered facts, sourced from the
GST REG-06 certificate. `content.test.ts` asserts they stay real.

- [x] `BRAND.name` — `CrewMind`
- [x] `BRAND.url` — `https://crewmind.in`
- [x] `BRAND.tagline`
- [x] `BRAND.email` — `hello@crewmind.in`
- [x] `BRAND.phone` / `BRAND.phoneHref` — `+91 70175 31825`
- [x] `BRAND.address` — Gurugram, Delhi NCR
- [ ] `BRAND.calendly` — still `https://calendly.com/example/discovery-call`.
      **No real value for this exists yet.** Either create the booking link or
      remove the field and the components that read it.
- [x] `WHATSAPP_NUMBER` — `917017531825`
- [ ] `BRAND.socials` — still `https://linkedin.com/company/example`. **No real
      value for this exists yet.**
- [x] `NAV_LINKS` / `FOOTER_LINKS` labels — lead with `Priya`; the `GEO` deep
      link was dropped (still reachable at `/services/geo`)
- [ ] `PRIMARY_CTA.label` — tied to `BRAND.calendly`, so it waits on that

Also replace `public/favicon.svg` and add `public/opengraph.jpg` — `useSeo`
points every page's OG image at `${BRAND.url}/opengraph.jpg`, which does not
exist yet.

---

## What is NOT placeholder

`src/content/priya.ts` is **real content** and must be left alone by the sweep
described in the rest of this document. Every figure in it is a real price, a
real measurement, or a real limitation.

Three things are deliberately absent from it and must stay absent:

- **Market-audit statistics.** "31 brokerages tested, median callback 14h 20m"
  was published once as a first-person measurement and was never run. Checked
  against the live database: zero tested rows. `content.test.ts` asserts those
  strings never reappear.
- **A call recording.** `PRIYA.call.recordingUrl` is `null`, so no player
  renders and the transcript is labelled representative. When a real recording
  is dropped at `public/audio/`, the transcript must be replaced with the
  transcript **of that recording**.
- **Testimonials, ratings and client counts.** There are none. The
  founding-client block is the honest answer to "how many clients do you have".

`src/content/site.ts` is also real now — the registered entity, GSTIN, phone,
email and domain all come from the GST REG-06 certificate.

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

### `src/content/services.ts`
- [ ] `SERVICES_INDEX` — seo, hero, close
- [ ] All eight `SERVICES[]` entries — `title`, `description`, `features`,
      `seo`, `hero`, every `sections[]` block, and `close`
- [ ] **`geo` → `sections[1]` (stats)** — the AI visibility scores
      (`38/100`, `38%`, `45%`, `53%`) are the reference's numbers, presented
      as typical results. **Either measure your own or delete the block.**
- [ ] **`ai-personal-assistants` → `sections[4]` (stats)** — "29 hrs returned
      per week" and the "100+ setups completed" assurance are unverified
- [ ] **`lead-gen-outreach` → `sections[3]` (stats)** — "1,000+ leads per day"
      and "38 hrs automated per week" are unverified
- [ ] **`ai-call-centers` → hero** — "74% of calls to small businesses go
      unanswered" is an uncited statistic. Cite it or cut it.
- [ ] Every `faq` answer across every service — **written fresh, not
      transcribed** (see below)
- [ ] The four thin services marked `TODO` — `social-media-automation`,
      `ai-copywriting`, `ai-agent-team`, `custom-ai-solutions` — carry one
      `checklist` section each and need real detail

### `src/content/projects.ts`
- [ ] `CATEGORIES` labels
- [ ] **All 30 `PROJECTS[]` entries — none of this work was done by you.**
      Every challenge, solution, metric and client descriptor came from the
      reference. This is the single largest block of borrowed content on the
      site. Replace wholesale or delete the page.
- [ ] `PROJECTS_PAGE` — seo, hero, close, empty message

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

**This got more urgent.** `ProofBar` and `TestimonialRail` now sit one scroll
above the Priya band on the homepage — borrowed Trustpilot scores and reviews
written by real people about a different company, directly above a product
page whose entire argument is that we are the company in this market that
tells the truth. Shipping those two things on the same page cancels the
second one out. Remove them before launch, ahead of everything else on this
list.

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

3. **All service FAQ answers** — same cause as the enterprise FAQ. Questions
   are verbatim; every answer in `services.ts` is ours, and several make
   specific commitments: setup timelines, a 30-day support window, spam and
   deliverability practices, AI disclosure policy, and multilingual support.
   **Nobody has agreed to any of them.** Read all of them before launch.

4. **`about.ts` → `team.members`**, **`enterprise.ts` → `cases.items`**, and
   **`projects.ts` → every `client` field** —
   deliberate departures from verbatim copying. The reference names seven real
   people (with links to their real LinkedIn profiles), one real named
   enterprise client, and nine named clients across the project catalogue —
   several with links to their live Instagram accounts and websites.
   Restaging real individuals as this company's staff, or another agency's
   clients as our own, is not something to ship even as placeholder text.
   Structure was preserved; identities were not copied. `content.test.ts`
   asserts those names never reappear.

5. **Vendor product names** — the reference hardcodes third-party product
   names into its own service copy, which implies partnerships. `services.ts`
   refers to them generically ("the assistant", "the outreach agent").
   Replace with the tools you actually use.

---

## Theme

The site ships dark-primary with a light theme (spec section 3.3, amended).
Nothing here is placeholder, but two things are worth a look before launch:

- [ ] `--text-3` is the one token that only just clears AA, in **both**
      themes. It is restricted to 18px+ and non-essential meta by convention,
      not by the compiler. The axe pass cannot check contrast in jsdom, so
      this needs one manual sweep per theme.
- [ ] `index.html` sets a `theme-color` per scheme (`#0c0e13` / `#fbfbfc`).
      Update both if the canvas tokens change.

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
- [ ] Check the site in **both themes**, not just the one your OS is set to
