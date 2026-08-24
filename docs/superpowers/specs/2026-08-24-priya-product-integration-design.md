# Priya — hero product integration

**Date:** 2026-08-24
**Status:** Approved, ready for implementation planning
**Branch:** `phase-4-automations` (Phase 5 work)

---

## 1 · What this is

`crewmind-v2/` is a standalone Next.js site for the real Crewmind product: an
AI voice agent, **Priya**, that calls every property enquiry within sixty
seconds, in Hindi, at any hour, qualifies it (budget, timeline, financing,
project) and drops a card on the broker's WhatsApp.

The site in `src/` is a multi-service AI agency site whose copy is entirely
placeholder, transcribed from a structural reference (see `CONTENT-SWAP.md`).

This spec integrates the product into the agency site as its **flagship
offer**: a full product page at `/priya`, a homepage band pointing at it, and a
swap of the site's placeholder brand facts for the real registered ones.

`crewmind-v2/` is the **content source, not a build target.** It is not
compiled, imported, deployed, or moved. After this work it remains in the tree
as the reference the copy was derived from, exactly as `docs/reference/` does.

### Decisions taken before this spec

Four options were put to the product owner and all four recommendations were
accepted:

1. **Placement** — flagship page plus a homepage band. The agency site keeps
   its structure; Priya becomes its headline proof. Not a homepage takeover.
2. **Brand facts** — swap site-wide to the real entity.
3. **Voice** — English-led in the current site's register; Hindi retained only
   where it is itself the evidence.
4. **Framing** — real estate named explicitly, with one honest line noting the
   same engine runs in other verticals. No invented case studies.

---

## 2 · Naming and routing

The product is **Priya**. It is the one word in either codebase a broker will
repeat to another broker, and it is already the name the agent gives on every
call.

- Route: `/priya`
- Nav label: `Priya`, in the first slot of `NAV_LINKS`
- `GEO` is **removed** from `NAV_LINKS`. It is a deep link to `/services/geo`,
  which `Services` already covers, and the desktop bar does not hold eight
  items. The service page itself is untouched and still reachable.
- `FOOTER_LINKS` gains `Priya` in the first slot.

`/priya` must be added to `STATIC_ROUTES` in `src/content/content.test.ts`,
which is the list that makes every dangling href a test failure.

---

## 3 · Architecture

The site's existing contract is preserved without exception:

- Pages compose blocks. Blocks take content as props.
- Every user-facing string lives in `src/content/`, typed by an interface in
  `src/content/types.ts`.
- No component reaches into a content module. (`templates/ServicePage` is the
  one pre-existing exception and this work does not add a second.)
- Colour, type, space, radius, shadow and motion come from tokens. No literal
  values.
- Amber (`--cta`) appears on primary buttons and nowhere else.
- Exactly one serif `Emphasis` per major headline.

### 3.1 · Page composition

`src/pages/Priya.tsx` — fifteen blocks. Nine reuse existing components; six are
new. That ratio is the design goal: the page must read as this site, not as a
second site pasted into it.

| # | Section | Component | Status |
|---|---------|-----------|--------|
| 01 | Hero — "Your leads arrive at midnight." + live wait clock | `ProductHero` + `ui/WaitClock` | **new** |
| 02 | The Sunday Test — a measurement he runs on his own data | `StepList` | reuse + `pullQuote` |
| 03 | The same lead, two Tuesdays | `TimeRace` | **new** |
| 04 | It is not your team, it is the clock | `PillarRow` | reuse |
| 05 | A real call, in Hindi | `CallTranscript` | **new** |
| 06 | How it works — 0s / 2s / <10s / 60–120s / +5s | `StepList` | reuse |
| 07 | The card that lands on your WhatsApp | `LeadCard` | **new** |
| 08 | The follow-up your team means to do, and doesn't | `PillarRow` | reuse |
| 09 | Short of conversations, not leads — interactive | `LeadMath` | **new** |
| 10 | Things this does not do | `PillarRow` | reuse |
| 11 | Give me fifty dead leads | `DeadLeadOffer` | **new** |
| 12 | One telecaller vs Priya | `ComparisonTable` | reuse |
| 13 | ₹30,000 setup, then ₹12,000/month | `PricingTiers` | reuse |
| 14 | Founding client, both ways | `PillarRow` | reuse |
| 15 | FAQ, then the close | `FAQ` + `CtaBand` | reuse |

Blocks 02 and 06 both use `StepList`; they carry different `id`s and different
content. Blocks 04, 08, 10 and 14 all use `PillarRow` for the same reason the
component exists — same shape, different copy.

### 3.2 · Homepage

`HeroProductBand` (**new**) is inserted into `src/pages/Home.tsx` between
`ProofBar` and `ServiceGrid`. It carries the live clock, the midnight headline,
a compact lead-card figure and one link to `/priya`. Nothing else on the
homepage moves, and no existing homepage content changes.

### 3.3 · Targeted improvements to existing components

Two small, additive changes to components this work uses. Both are optional
props; every existing call site keeps its current behaviour.

- **`StepList`** gains `pullQuote?: string`, rendered under the list as a serif
  pull quote. The Sunday Test's closing line ("If the answer is under an hour,
  close this tab") is the argument of that section and cannot be a step.
- **`PillarRow`** gains `columns?: 2 | 3`, defaulting to `3`. The founding
  block is a two-sided honesty statement and reads wrong in a three-column grid
  with a hole in it.

No other existing component is modified. No refactoring beyond this.

---

## 4 · New components

### 4.1 · `ui/WaitClock`

How long a lead that arrived at 11:40pm IST has been waiting, right now. Ported
from `crewmind-v2/src/components/WaitClock.tsx`, restyled to tokens.

Four properties carried over from the original because each was a deliberate
decision there and remains correct here:

- **Digits written through refs, not state.** A `setState` every second
  re-renders the subtree 3,600 times an hour on a mid-range Android for no
  reason.
- **Fixed-width cells** (`min-w-[2ch]` plus `tnum`). A hero clock that reflows
  once a second undermines the one claim the page makes.
- **IST computed explicitly**, never the visitor's local clock. The claim is
  about a lead that arrived at 11:40pm IST and must hold for whoever reads it.
- **Stable placeholder before mount.** Renders `00` and starts ticking in an
  effect.

Under `prefers-reduced-motion` the clock still ticks — it is information, not
decoration — but nothing around it animates. The element is `aria-live="off"`;
a screen reader announcing a changing number every second is unusable.

### 4.2 · `blocks/TimeRace`

Two lanes for the same lead — "Your process today" against "Priya" — each a
list of mono timestamps and one line of text. Staggered on entry with the
existing `Reveal`. Resolves to "One minute forty-one seconds. The other clock
is still running."

Semantically two ordered lists inside a labelled group, not a table: the rows
are not row-aligned across lanes and a table would assert a relationship that
isn't there. Stacks to one lane per row on narrow screens, slow lane first.

### 4.3 · `blocks/CallTranscript`

The Hindi call, alternating AI and customer turns, with the caption explaining
that Priya identifies herself as an AI in the first sentence of every call.

- Speaker turns are a description list — speaker as the term, line as the
  definition.
- The Hindi lines carry `lang="hi"`. Without it a screen reader reads
  Devanagari with an English voice.
- The AI and customer turns differ by more than colour alone (alignment plus a
  labelled speaker), so the distinction survives greyscale and colour blindness.
- **The audio player does not render**, and must not, until a real recording
  exists. See §6.

### 4.4 · `blocks/LeadCard`

The WhatsApp card a broker receives: name, HOT track, score, five qualified
rows, the customer's own sentence in Hindi, three actions, timestamp.

Rendered as a figure with a caption reading "Sample card, in the format your
team receives." It is a facsimile of a real artefact and must be labelled as a
sample everywhere it appears, including the homepage band. The phone number is
masked (`+91 98XXX XXXXX`) as in the source.

### 4.5 · `blocks/LeadMath`

Three number inputs — leads a month, blended cost per lead, percentage actually
spoken to — computing spend, leads never reached, and ad money that never
became a conversation. Defaults 600 / ₹700 / 35%.

- A real label per input, `inputMode="numeric"`, and a visible current value.
- Outputs are `aria-live="polite"` so the result is announced once when the
  value settles, not on every keystroke.
- Inputs are clamped and non-finite results are never rendered.
- Outputs use `.tnum`.
- Closes on the invitation from the source: change the numbers, the argument
  either gets stronger or falls apart, and both are worth ten minutes.

### 4.6 · `blocks/DeadLeadOffer`

The strongest block on the page: don't risk a fresh lead, send fifty dead ones.
The one visually inverted band on `/priya` — `--surface-3` with a strong
border, matching how `CtaBand` already lifts itself off the canvas. It carries
the page's second amber action and no third.

### 4.7 · `blocks/HeroProductBand`

The homepage entry point. Clock, headline, sample card, one link to `/priya`.

---

## 5 · Content

New module `src/content/priya.ts`, exporting:

- `PRIYA: PriyaContent` — the product page
- `PRIYA_HOME: HeroProductContent` — the homepage band

New interfaces in `src/content/types.ts` under a `Phase 5` banner comment,
matching the existing file's conventions. `PriyaContent` reuses `PageHero`,
`Headline`, `Pillar`, `PillarSet`, `NumberedStep`, `ComparisonSpec`, `FaqItem`,
`PricingTier` and `CtaPair` rather than redeclaring their shapes.

New shapes required: `TranscriptTurn` (`who`, `role: 'ai' | 'human'`, `line`,
`lang`), `RaceLane` (`label`, `steps: { clock, text }[]`), `LeadCardSpec`,
`LeadMathSpec` (defaults, input labels, output labels, copy), and
`HeroProductContent`.

### 5.1 · Voice

English-led, in the current site's register: `Eyebrow` / `Heading` / `Emphasis`
rhythm, sentences that state a mechanism rather than a benefit, no exclamation
marks, no "unlock" or "supercharge", one serif emphasis per headline.

The v2 copy is already written to a high standard and its *arguments* transfer
intact. What changes is the surface: v2's poster-Hindi headlines become English
headlines in this site's voice, and v2's block-tone system (`ground` /
`ground-2` / `card` / `ink`) is dropped entirely in favour of this site's
`Section` / `Container` / token surfaces.

### 5.2 · Where Hindi survives

Hindi is kept in exactly four places, because in each of them it *is* the
evidence rather than decoration:

1. The call transcript (§4.3) — the single most persuasive asset the product
   has, and translating it destroys the thing it proves.
2. The proverb closing the time race — जो पहले call करता है, वही बेचता है।
3. The customer's own sentence quoted on the lead card.
4. One FAQ question, kept in the buyer's own words — "AI se customer bhaag
   jaayega" — because that is the real objection, phrased the way it is
   actually said.

Every Devanagari string carries `lang="hi"`. Hinglish set in Latin script does
not (it is not Hindi orthography, and tagging it makes screen readers worse,
not better).

### 5.3 · Framing

Real estate is named throughout — that is where the proof, the price-list
grounding and the Hindi calls are real. One line notes the same engine runs for
clinics, dealerships and education. **No case studies, logos, client counts or
outcome metrics are invented for those verticals**, or for real estate.

---

## 6 · Honesty constraints — non-negotiable

Three deliberate omissions in `crewmind-v2` carry over unchanged. Each is
documented at length in the source and each exists because the product's entire
sales position is being the company in this market that tells the truth about
response times.

1. **The market audit stays unpublished.** `marketAudit` is `null` in the
   source: the previously published "31 brokerages tested, median callback
   14h 20m" was never measured, and was checked against the live database and
   found to be zero rows. The page makes its whole argument without it. **Do
   not populate this from a deck, a memory, or an estimate.** `/priya` must
   ship with no market-audit block.
2. **No call recording, and the transcript is labelled representative.** A real
   recording exists on the system but has not been chosen. Until an audio file
   is actually present, `CallTranscript` renders no player and the transcript is
   captioned as representative rather than actual. When a recording lands, the
   transcript must be replaced with the transcript *of that recording*.
3. **"Things this does not do" ships in full**, all six items, including the two
   that cost money: that it is not good at Haryanvi or heavy Punjabi accents
   yet, and that it is not worth buying under 100 leads a month. Cutting either
   is the exact move the page spends ten sections arguing against.

Additionally, no testimonial, rating, client name or outcome figure is invented
for `/priya`. The founding-client block says plainly that a buyer would be among
the first, and that block is the answer to "how many clients do you have".

---

## 7 · Brand facts

`src/content/site.ts` swaps to the real registered entity, sourced from
`crewmind-v2/src/lib/site.ts`:

| Field | From (placeholder) | To (real) |
|---|---|---|
| `BRAND.url` | `https://crewmind.example` | `https://crewmind.in` |
| `BRAND.email` | `hello@crewmind.example` | `hello@crewmind.in` |
| `BRAND.phone` | `+852 2810 5510` | `+91 70175 31825` |
| `BRAND.phoneHref` | `tel:+85228105510` | `tel:+917017531825` |
| `WHATSAPP_NUMBER` | `85228105510` | `917017531825` |
| `BRAND.address` | Hong Kong | Gurugram, Delhi NCR |

`BRAND.tagline` is rewritten to name what the company actually does.

The `Brand` interface gains an optional `legal` field — entity (Antimatter
Technologies Private Limited), GSTIN (`37ABDCA0422F1Z8`) and the registered
address line — rendered as a footer line in `Footer.tsx`. This is on the page on
purpose: a broker deciding whether to hand over his customers' phone numbers can
verify a GSTIN in about thirty seconds, and an AI company with no traceable
legal entity is the thing he has been warned about.

`BRAND.calendly` and `BRAND.socials` remain placeholders — no real values for
them exist in either codebase. They stay listed in `CONTENT-SWAP.md`.

`CONTENT-SWAP.md` is updated: the brand-identity checklist at the top is ticked
off, and a short Priya section is added recording that `/priya` content is real
and must not be treated as placeholder during the eventual copy sweep.

---

## 8 · Testing

Matching the existing suite's conventions (`vitest`, Testing Library,
`MemoryRouter`, axe).

**`src/content/content.test.ts`** — extended:

- `/priya` added to `STATIC_ROUTES`
- every Priya CTA resolves
- no duplicate ids across pillars, faqs, race steps, transcript turns
- the comparison table has one value per column
- exactly one tier is featured
- the FAQ answers every question it asks
- **`marketAudit` remains absent** — a test asserting the unmeasured statistics
  never reappear in `PRIYA`, in the same spirit as the existing tests that
  assert reference names and `Saludsa` never come back

**`src/pages/Priya.test.tsx`** — new, mirroring `Automations.test.tsx`: renders
with its real content module, exactly one `h1`, the limits block renders all six
items, the transcript renders every turn with `lang="hi"` on the Devanagari, the
lead card is labelled a sample, and an axe pass with no violations.

**`src/components/ui/WaitClock.test.tsx`** — new: with fake timers and a fixed
system time, the clock renders the correct elapsed value, pads to two digits,
rolls over correctly for a time before 11:40pm, and clears its interval on
unmount.

**`src/pages/Home.test.tsx`** — extended: the product band renders and links to
`/priya`.

Gate before this is called done: `npm test` green, `npm run typecheck` clean,
`rg -i 'placeholder|example\.(com|us)|autoploy' src/content/priya.ts` returns
nothing, and a manual pass of `/priya` in **both** themes at 390px and desktop.

---

## 9 · Explicitly out of scope

- **`/pricing` keeps its placeholder `$500 – $7,000+` agency tiers.** Priya's
  real ₹ pricing will sit on `/priya` alongside them. A link from `/pricing` to
  the Priya plan is added; rewriting the agency tiers is a separate task and is
  flagged, not done.
- **`ProofBar`, `ReviewsBand` and `TestimonialRail` keep their borrowed
  Trustpilot scores and testimonials.** `CONTENT-SWAP.md` correctly flags these
  as must-go before launch. They sit one scroll above the new product band.
  Removing them is a separate decision with its own consequences for the
  homepage, and it is not this task's call to make.
- Legal pages at `/privacy` and `/terms` remain `Placeholder` stubs.
- `crewmind-v2/` is not deleted, built, or moved.
- No new runtime dependency. Not one.

---

## 10 · Files

**New**

```
src/content/priya.ts
src/pages/Priya.tsx
src/pages/Priya.test.tsx
src/components/ui/WaitClock.tsx
src/components/ui/WaitClock.test.tsx
src/components/blocks/ProductHero.tsx
src/components/blocks/TimeRace.tsx
src/components/blocks/CallTranscript.tsx
src/components/blocks/LeadCard.tsx
src/components/blocks/LeadMath.tsx
src/components/blocks/DeadLeadOffer.tsx
src/components/blocks/HeroProductBand.tsx
```

**Edited**

```
src/App.tsx                            route
src/content/site.ts                    brand facts, nav, footer links
src/content/types.ts                   Phase 5 interfaces + Brand.legal
src/content/content.test.ts            route + integrity tests
src/content/pricing.ts                 link to the Priya plan
src/pages/Home.tsx                     product band
src/pages/Home.test.tsx                band assertions
src/components/blocks/Footer.tsx       legal entity line
src/components/blocks/StepList.tsx     optional pullQuote
src/components/blocks/PillarRow.tsx    optional columns
CONTENT-SWAP.md                        tick brand section, note Priya
```
