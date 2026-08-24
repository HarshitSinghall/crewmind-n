# Priya Hero Product Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Priya product (AI voice agent that calls every property enquiry within 60 seconds, in Hindi) to the CrewMind agency site as its flagship offer — a full page at `/priya`, a homepage band, and a swap of placeholder brand facts for the real registered ones.

**Architecture:** The site's existing contract is preserved exactly: pages compose blocks, blocks take content as props, every string lives in `src/content/` behind an interface in `src/content/types.ts`. The `/priya` page is 15 blocks — 9 reuse existing components, 6 are new. Copy is derived from `crewmind-v2/src/lib/content.ts` (the content source; it is never imported, built, or moved) and rewritten English-led in this site's voice.

**Tech Stack:** Vite 8, React 19, TypeScript 7, react-router-dom 7, Tailwind CSS v4 (`@theme inline` over CSS custom properties), lucide-react, vitest + Testing Library + axe-core.

**Spec:** `docs/superpowers/specs/2026-08-24-priya-product-integration-design.md`

## Global Constraints

- **No new runtime dependency.** Not one. `lucide-react` is the only icon source.
- **Every user-facing string lives in `src/content/priya.ts`.** No component reaches into a content module. No string is typed into a component.
- **Tokens only.** Colour, type, space, radius, shadow and motion come from `src/styles/tokens.css` via `var(--token)` or the Tailwind `@theme inline` aliases. No hex, rgb, px font sizes, or hardcoded durations.
- **Amber (`--cta`) appears on `Button variant="primary"` and nowhere else.**
- **Exactly one serif `<Emphasis>` per major headline.**
- **`--text-3` is restricted to 18px+ text and non-essential meta.** It only just clears AA.
- **Every Devanagari string carries `lang="hi"`.** Hinglish in Latin script does not.
- **Honesty constraints (spec §6) are non-negotiable:** no market-audit statistics (`marketAudit` was never measured and is `null` in the source — do not populate it from a deck, a memory, or an estimate); no audio player until a real recording file exists, and the transcript stays captioned as representative; the "Things this does not do" block ships all six items including the two that cost money. No testimonial, rating, client name or outcome figure is invented.
- **Path alias is `@/` → `src/`.** Use it in every import.
- **Test commands:** `npm test` (vitest run), `npm run typecheck` (`tsc -b --noEmit`).
- **Real brand facts:** domain `https://crewmind.in`, email `hello@crewmind.in`, phone `+91 70175 31825` / `tel:+917017531825`, WhatsApp digits `917017531825`, city Gurugram, region Delhi NCR, entity `Antimatter Technologies Private Limited`, GSTIN `37ABDCA0422F1Z8`.
- **Real pricing:** `₹30,000` one-time setup, then `₹12,000` / month, 500 leads included, `₹25` per lead after. That is `₹24` a lead.

### A note on CTAs

`crewmind-v2` had a demo form backed by `src/app/api/demo/route.ts`. This site is a static Vite build with no backend, so **that form is not ported.** Every Priya CTA goes to one of two places that work with no server:

- Primary → `BRAND.whatsapp(...)` deep link with a pre-filled message
- Secondary → an in-page anchor (`#dead-lead`, `#plan`) or `/pricing`

Do not scaffold an API route, a serverless function, or a form that posts nowhere.

---

## Task 1: Real brand facts

**Files:**
- Modify: `src/content/types.ts` (the `Brand` interface)
- Modify: `src/content/site.ts` (whole file)
- Modify: `src/components/blocks/Footer.tsx` (add the legal line)
- Test: `src/content/content.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `BRAND.legal?: { entity: string; gstin: string; addressLine: string }`, `BRAND.whatsapp(message?: string): string` (unchanged signature, new number), `NAV_LINKS` with `{ label: 'Priya', href: '/priya' }` first and no `GEO` entry, `FOOTER_LINKS` with `Priya` first.

- [ ] **Step 1: Write the failing test**

Append to the `describe('content integrity', ...)` block in `src/content/content.test.ts`:

```ts
  it('carries the real brand facts, not the reference placeholders', () => {
    expect(BRAND.url).toBe('https://crewmind.in')
    expect(BRAND.email).toBe('hello@crewmind.in')
    expect(BRAND.phoneHref).toBe('tel:+917017531825')
    expect(BRAND.address.join(' ')).toMatch(/Gurugram/)

    const blob = JSON.stringify({ ...BRAND, whatsapp: undefined })
    expect(blob).not.toMatch(/example|Hong Kong|85228105510/i)
  })

  it('routes whatsapp at the real number', () => {
    const url = new URL(BRAND.whatsapp('test'))
    expect(url.pathname).toBe('/917017531825')
  })

  it('names the registered entity for verification', () => {
    expect(BRAND.legal?.entity).toBe('Antimatter Technologies Private Limited')
    expect(BRAND.legal?.gstin).toBe('37ABDCA0422F1Z8')
  })

  it('leads the nav with the flagship product and drops the geo deep link', () => {
    expect(NAV_LINKS[0]).toEqual({ label: 'Priya', href: '/priya' })
    expect(NAV_LINKS.some((l) => l.label === 'GEO')).toBe(false)
    expect(FOOTER_LINKS[0].href).toBe('/priya')
  })
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/content/content.test.ts`
Expected: FAIL — `expected 'https://crewmind.example' to be 'https://crewmind.in'`, and `nav link /priya` fails the existing route test because `/priya` is not yet in `STATIC_ROUTES`.

- [ ] **Step 3: Add `/priya` to the route allowlist**

In `src/content/content.test.ts`, add `'/priya',` to the `STATIC_ROUTES` set, directly after `'/'`.

- [ ] **Step 4: Extend the `Brand` interface**

In `src/content/types.ts`, add to `interface Brand`, after `sisterSite`:

```ts
  /**
   * The registered entity behind the brand. Named on the site on purpose: a
   * broker deciding whether to hand over his customers' phone numbers can
   * verify a GSTIN in about thirty seconds, and an AI company with no
   * traceable legal entity is exactly the thing he has been warned about.
   */
  legal?: {
    entity: string
    gstin: string
    addressLine: string
  }
```

- [ ] **Step 5: Rewrite `src/content/site.ts`**

Replace the whole file:

```ts
import type { Brand, NavLink } from './types'

/* ---------------------------------------------------------------------------
   Brand identity, in one object. Change these values and the whole site
   follows.

   These are the REAL registered facts, sourced from the GST REG-06
   certificate. They are not placeholder copy and must not be swapped out
   during the content sweep described in CONTENT-SWAP.md.
--------------------------------------------------------------------------- */

const WHATSAPP_NUMBER = '917017531825'

export const BRAND: Brand = {
  name: 'CrewMind',
  url: 'https://crewmind.in',
  tagline:
    'AI that answers your leads in sixty seconds, at any hour, in the language they called in.',
  email: 'hello@crewmind.in',
  phone: '+91 70175 31825',
  phoneHref: 'tel:+917017531825',
  address: ['Gurugram', 'Delhi NCR', 'India'],
  calendly: 'https://calendly.com/example/discovery-call',
  whatsapp: (message = "Hello I'd like to learn more about your services.") =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
  socials: [{ label: 'LinkedIn', href: 'https://linkedin.com/company/example' }],
  sisterSite: undefined,
  legal: {
    entity: 'Antimatter Technologies Private Limited',
    gstin: '37ABDCA0422F1Z8',
    addressLine:
      '42-44-18/1, Azitnagar, Ajith Singh Nagar, Vijayawada, Andhra Pradesh 520015, India',
  },
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Priya', href: '/priya' },
  { label: 'Services', href: '/services' },
  { label: 'Automations', href: '/automations' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'See Our Work', href: '/past-projects' },
  { label: 'Meet the Team', href: '/about' },
  { label: 'Enterprise', href: '/enterprise' },
]

export const PRIMARY_CTA = {
  label: 'Book a Free Discovery Call',
  href: '#book',
} as const

export const FOOTER_LINKS: NavLink[] = [
  { label: 'Priya', href: '/priya' },
  { label: 'Services', href: '/services' },
  { label: 'Automations', href: '/automations' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'See Our Work', href: '/past-projects' },
  { label: 'Meet the Team', href: '/about' },
]
```

`calendly` and `socials` stay as placeholders — no real values for them exist in either codebase, and inventing them would be exactly the failure this task is fixing.

- [ ] **Step 6: Render the legal line in the footer**

In `src/components/blocks/Footer.tsx`, find the closing copyright row (the last block inside `<Container>`) and add directly above it:

```tsx
        {BRAND.legal && (
          <p className="mt-10 border-t border-[var(--border-subtle)] pt-6 text-[0.8125rem] leading-[1.7] text-[var(--text-3)]">
            {BRAND.legal.entity} · GSTIN {BRAND.legal.gstin}
            <br />
            {BRAND.legal.addressLine}
          </p>
        )}
```

The grid above it is `grid gap-10 sm:grid-cols-2 lg:grid-cols-4` — this paragraph goes *after* that grid closes, as a sibling, not inside a column.

- [ ] **Step 7: Run tests to verify they pass**

Run: `npx vitest run src/content/content.test.ts`
Expected: PASS, all cases.

Then run: `npm run typecheck`
Expected: clean.

- [ ] **Step 8: Commit**

```bash
git add src/content/site.ts src/content/types.ts src/content/content.test.ts src/components/blocks/Footer.tsx
git commit -m "feat: swap placeholder brand facts for the real registered entity"
```

---

## Task 2: Phase 5 content types

**Files:**
- Modify: `src/content/types.ts` (append a Phase 5 section)

**Interfaces:**
- Consumes: `PageHero`, `Headline`, `Pillar`, `PillarSet`, `NumberedStep`, `ComparisonSpec`, `FaqItem`, `PricingTier`, `PricingContent['guarantee']`, `CtaPair` — all already in this file.
- Produces: `TranscriptTurn`, `RaceLane`, `LeadCardSpec`, `LeadMathSpec`, `DeadLeadSpec`, `PriyaContent`, `HeroProductContent`.

- [ ] **Step 1: Append the Phase 5 block to `src/content/types.ts`**

```ts
/* ---------------------------------------------------------------------------
   Phase 5 — Priya, the flagship product.

   One page, one product. The shapes below exist because the argument this
   page makes is structural: a measurement the reader runs himself, two
   clocks side by side, a real conversation, and a list of things the product
   does NOT do. None of those fit the service-page section union, and forcing
   them into it would have cost more than these seven interfaces.
--------------------------------------------------------------------------- */

/** One speaker turn in the sample call. */
export interface TranscriptTurn {
  id: string
  /** Speaker name, as it appears in the transcript. */
  who: string
  role: 'ai' | 'human'
  line: string
  /**
   * BCP-47 tag for the line. Devanagari MUST carry 'hi' or a screen reader
   * reads it with an English voice. Hinglish in Latin script must not.
   */
  lang?: 'hi'
}

/** One lane of the two-Tuesdays race. */
export interface RaceLane {
  id: string
  label: string
  /** `clock` is elapsed time, e.g. "00:00", "14:20". Empty on the closing beat. */
  steps: { clock: string; text: string }[]
}

export interface LeadCardSpec {
  name: string
  /** Qualification track — "HOT". Display only. */
  track: string
  score: number
  rows: { k: string; v: string }[]
  /** The buyer's own sentence, in his own language. */
  quote: string
  quoteLang?: 'hi'
  actions: string[]
  time: string
  /** Always shown. This is a facsimile and must be labelled as one. */
  caption: string
}

export interface LeadMathSpec {
  eyebrow: string
  title: Headline
  /** Starting values. The reader is invited to change all three. */
  defaults: { leads: number; cpl: number; reached: number }
  inputs: { leads: string; cpl: string; reached: string }
  outputs: { spend: string; missed: string; wasted: string }
  under: string
  invite: string
}

export interface DeadLeadSpec {
  eyebrow: string
  title: Headline
  /** Two paragraphs. The objection, then the offer. */
  deck: string[]
  outcomes: Pillar[]
  close: string
  cta: { label: string; href: string }
}

export interface PriyaContent {
  seo: { title: string; description: string }
  hero: PageHero & {
    clock: {
      label: string
      /** Hour and minute in IST that the clock counts from. */
      sinceHour: number
      sinceMinute: number
      foot: string
    }
    trust: string
  }
  sundayTest: {
    eyebrow: string
    title: string
    sub: string
    steps: NumberedStep[]
    pullQuote: string
  }
  race: {
    eyebrow: string
    title: Headline
    lanes: [RaceLane, RaceLane]
    resolve: string
    closing: string
    /** Devanagari. Rendered with lang="hi". */
    proverb: string
  }
  cause: PillarSet
  call: {
    eyebrow: string
    title: string
    sub: string
    /**
     * Path to a real recording under public/audio/. Stays null until one
     * exists — see the spec's honesty constraints. While null the player does
     * not render and `sub` labels the transcript as representative.
     */
    recordingUrl: string | null
    turns: TranscriptTurn[]
    caption: string
  }
  mechanism: {
    eyebrow: string
    title: string
    sub: string
    /** `step` carries the clock — "0s", "2s", "<10s". */
    steps: NumberedStep[]
    notes: Pillar[]
  }
  leadCard: {
    eyebrow: string
    title: Headline
    card: LeadCardSpec
    closing: string
  }
  followUp: PillarSet
  math: LeadMathSpec
  limits: PillarSet
  deadLead: DeadLeadSpec
  comparison: ComparisonSpec
  plan: {
    eyebrow: string
    title: string
    sub: string
    tier: PricingTier
    guarantee: { title: string; body: string }
    disqualifier: string
  }
  founding: PillarSet
  faq: { title: string; items: FaqItem[] }
  close: { eyebrow: string; title: string; sub: string; cta: CtaPair }
}

/** The homepage band that points at the product page. */
export interface HeroProductContent {
  eyebrow: string
  title: Headline
  sub: string
  /** Three short proof chips under the copy. */
  points: string[]
  cta: { label: string; href: string }
  clock: { label: string; sinceHour: number; sinceMinute: number }
  card: LeadCardSpec
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run typecheck`
Expected: clean. Nothing consumes these yet, so this is a pure type addition.

- [ ] **Step 3: Commit**

```bash
git add src/content/types.ts
git commit -m "feat: add Phase 5 content types for the Priya product page"
```

---

## Task 3: The Priya content module

**Files:**
- Create: `src/content/priya.ts`

**Interfaces:**
- Consumes: `BRAND` from `@/content/site`; every type from Task 2.
- Produces: `PRIYA: PriyaContent` and `PRIYA_HOME: HeroProductContent`.

This is the largest single deliverable and it is pure data. The copy below is the English-led rewrite of `crewmind-v2/src/lib/content.ts` in this site's voice. Write it verbatim.

- [ ] **Step 1: Create `src/content/priya.ts`**

```ts
import { BRAND } from './site'
import type { HeroProductContent, PriyaContent } from './types'

/* ---------------------------------------------------------------------------
   Priya — the flagship product.

   REAL CONTENT. Not placeholder. Every figure here is a real price, a real
   measurement, or a real limitation, and the copy sweep described in
   CONTENT-SWAP.md must leave this file alone.

   Three things are deliberately ABSENT and must stay absent:

   1. Market-audit statistics. A previous version of this pitch published
      "31 brokerages tested, median callback 14h 20m, 9 never called" as a
      first-person measurement with a stated methodology. It was never run —
      checked against the live database and it returns zero tested rows. The
      page makes its entire argument without it. Do NOT populate this from a
      deck, a memory, or an estimate.
   2. A call recording. `call.recordingUrl` stays null until a real file is
      dropped at public/audio/, and while it is null the transcript is
      labelled representative rather than actual. When a recording lands, the
      transcript must be replaced with the transcript OF THAT RECORDING.
   3. Testimonials, client counts and outcome metrics. There are none. The
      founding-client block is the answer to "how many clients do you have".

   The one thing this whole sales motion rests on is being the company in
   this market that tells the truth about response times.
--------------------------------------------------------------------------- */

const WA_DEMO = BRAND.whatsapp(
  'I want to hear Priya. Call me on this number.',
)
const WA_DEAD_LEADS = BRAND.whatsapp(
  'I want to send fifty old leads for the free test.',
)

export const PRIYA: PriyaContent = {
  seo: {
    title: 'Priya — Every Lead Called In 60 Seconds, In Hindi, At 2am',
    description:
      'Your leads arrive at midnight. Your team starts at ten. Priya calls every property enquiry within sixty seconds, qualifies it in Hindi, and sends the card to your WhatsApp.',
  },

  hero: {
    eyebrow: 'Delhi NCR · Real estate',
    headline: {
      lead: 'Your leads arrive at midnight. Your team',
      emphasis: 'starts at ten',
      trail: '.',
    },
    sub: 'Priya calls every enquiry within sixty seconds, in Hindi, at 2am. Budget, timeline, financing — asked and answered. The card lands on your WhatsApp before your telecaller wakes up.',
    cta: {
      primary: { label: 'Call me now', href: WA_DEMO },
      secondary: { label: 'Test it on dead leads', href: '#dead-lead' },
    },
    assurances: [
      'No login, no app',
      'No new number to advertise',
      'Your leads land where they already land',
    ],
    clock: {
      label: "Last night's 11:40pm lead has now been waiting",
      sinceHour: 23,
      sinceMinute: 40,
      foot: 'This is the ordinary case, not the worst one.',
    },
    trust:
      'Nothing on your side changes. Your forms stay where they are, your portal accounts stay where they are, and your hoardings do not change.',
  },

  sundayTest: {
    eyebrow: 'Run this yourself',
    title: "Don't take our word for it. Open last Sunday's leads.",
    sub: 'We could put a statistic here. You would discount it, and you would be right to, because you have been shown six of them this year. So here is a measurement you can run on your own business in ninety seconds, on data you already have. We are not in the room and we cannot fudge it.',
    steps: [
      {
        step: '01',
        title: 'Find the latest lead from last weekend',
        body: 'Your portal dashboard, your Meta lead form, your website enquiry sheet. Sort by time and find the one that came in after 9pm on Saturday or Sunday.',
      },
      {
        step: '02',
        title: 'Now find the first call to that number',
        body: "Your telecaller's call log, or just ask him. You want the timestamp, not the story.",
      },
      {
        step: '03',
        title: 'Subtract',
        body: 'That number is the whole conversation. Everything else on this page is about closing that gap to sixty seconds.',
      },
    ],
    pullQuote:
      'If the answer is under an hour, close this tab. You do not need us, and we would rather tell you now than take your setup fee and find out in month two.',
  },

  race: {
    eyebrow: 'The gap, in seconds',
    title: {
      lead: 'The same lead,',
      emphasis: 'two Tuesdays',
      trail: '.',
    },
    lanes: [
      {
        id: 'today',
        label: 'Your process today',
        steps: [
          { clock: '00:00', text: 'Enquiry lands. 11:40pm, Tuesday.' },
          { clock: '00:00', text: 'It goes into the WhatsApp group.' },
          { clock: '08:20', text: 'Everyone is asleep. So is the lead.' },
          { clock: '11:15', text: 'Someone gets to it the next morning.' },
          { clock: '14:20', text: 'First call. "Main dekh ke batata hoon."' },
          { clock: '', text: 'He spoke to three other brokers on Tuesday night.' },
        ],
      },
      {
        id: 'priya',
        label: 'With Priya',
        steps: [
          { clock: '00:00', text: 'Enquiry lands. 11:40pm, Tuesday.' },
          {
            clock: '00:02',
            text: 'Checked. Duplicate? Junk number? Already spoken to this week?',
          },
          { clock: '00:09', text: 'His phone is ringing.' },
          {
            clock: '01:34',
            text: 'Budget ₹1.2 to 1.45 Cr. Loan pre-approved. Wants Sector 65.',
          },
          { clock: '01:41', text: 'The card is on your WhatsApp.' },
          { clock: '', text: 'You are the first person he spoke to.' },
        ],
      },
    ],
    resolve: 'One minute forty-one seconds. The other clock is still running.',
    closing: 'Your competitor is not better than you. He is earlier.',
    proverb: 'जो पहले call करता है, वही बेचता है।',
  },

  cause: {
    eyebrow: 'Why it happens',
    title: 'It is not your team. It is the clock.',
    sub: 'Every brokerage we have looked at has the same three holes, and none of them are a performance problem.',
    items: [
      {
        id: 'midnight',
        title: 'The 11:40pm enquiry',
        body: 'People browse property in bed. That lead gets called at eleven the next morning, if it gets called at all. Ask your team what happens to a Sunday lead.',
      },
      {
        id: 'queue',
        title: 'Five leads in one hour',
        body: 'Your telecaller works through them in order. Leads three, four and five wait — and they were not standing still while they waited.',
      },
      {
        id: 'competition',
        title: 'He filled four forms, not one',
        body: 'A serious buyer enquires with three or four brokers in the same sitting. Whoever calls first has the conversation. Everyone else gets "main dekh ke batata hoon."',
      },
    ],
  },

  call: {
    eyebrow: 'Hear it',
    title: 'Thirty seconds in, you will know.',
    sub: 'The only question that actually matters is whether your buyers stay on the line after they are told they are talking to a machine. No slide answers that. This is a representative call, in Hindi, start to finish.',
    recordingUrl: null,
    turns: [
      {
        id: 't1',
        who: 'प्रिया',
        role: 'ai',
        lang: 'hi',
        line: 'नमस्ते, मैं प्रिया बोल रही हूँ, [brokerage] की AI असिस्टेंट। आपने अभी 3BHK के लिए enquiry की थी, दो मिनट लूँगी?',
      },
      { id: 't2', who: 'ग्राहक', role: 'human', lang: 'hi', line: 'हाँ बोलिए।' },
      {
        id: 't3',
        who: 'प्रिया',
        role: 'ai',
        lang: 'hi',
        line: 'बजट कितने तक सोच रहे हैं आप?',
      },
      {
        id: 't4',
        who: 'ग्राहक',
        role: 'human',
        lang: 'hi',
        line: 'एक सवा करोड़ तक, ज़्यादा नहीं।',
      },
      {
        id: 't5',
        who: 'प्रिया',
        role: 'ai',
        lang: 'hi',
        line: 'और possession, ready to move चाहिए या under construction चल जाएगा?',
      },
      {
        id: 't6',
        who: 'ग्राहक',
        role: 'human',
        lang: 'hi',
        line: 'ready to move ही चाहिए, दिवाली से पहले shift करना है।',
      },
      {
        id: 't7',
        who: 'प्रिया',
        role: 'ai',
        lang: 'hi',
        line: 'लोन की बात हो गई है किसी बैंक से?',
      },
      {
        id: 't8',
        who: 'ग्राहक',
        role: 'human',
        lang: 'hi',
        line: 'HDFC से pre-approved है।',
      },
    ],
    caption:
      'Notice the first sentence. She says she is an AI before she says anything else, on every call, without softening it. That is why people stay on the line instead of feeling tricked, and it is why this is defensible.',
  },

  mechanism: {
    eyebrow: 'How it works',
    title: 'Every lead gets a phone call in sixty seconds.',
    sub: 'In Hindi. At 2am. On Diwali.',
    steps: [
      {
        step: '0s',
        title: 'The enquiry lands',
        body: 'Your website, your Meta lead ad, or your portal account. Nothing on your side changes.',
      },
      {
        step: '2s',
        title: 'Checked and scored',
        body: 'Duplicate? Junk number? Already spoken to this week? Then it never gets dialled.',
      },
      {
        step: '<10s',
        title: 'His phone is ringing',
        body: 'Measured on our own system at 1.2 seconds from form to dial. The rest is the network.',
      },
      {
        step: '60–120s',
        title: 'Priya has the conversation',
        body: 'Budget, timeline, financing, which project. And she answers his questions about your inventory from your own price list.',
      },
      {
        step: '+5s',
        title: 'A card lands on your WhatsApp',
        body: 'Name, numbers, what he said, and a link to the recording.',
      },
    ],
    notes: [
      {
        id: 'disclosure',
        title: 'She says she is an AI in the first sentence',
        body: 'On every call, in his language, never softened and never moved to sentence two. That is not a compliance checkbox we resent — it is the reason the conversation works.',
      },
      {
        id: 'no-invention',
        title: 'She never invents a number',
        body: 'No price, no carpet area, no possession date, no RERA number unless it came out of your own price list. When she does not know, she says she will confirm and come back. A made-up price is the worst thing that can come out of a call, and it is the thing we designed hardest against.',
      },
    ],
  },

  leadCard: {
    eyebrow: 'What you receive',
    title: {
      lead: 'This lands on your WhatsApp.',
      emphasis: 'The rest is plumbing',
      trail: '.',
    },
    card: {
      name: 'Rahul Mehta',
      track: 'HOT',
      score: 87,
      rows: [
        { k: 'Phone', v: '+91 98XXX XXXXX' },
        { k: 'Budget', v: '₹1.2 – 1.45 Cr' },
        { k: 'Timeline', v: 'Immediate, shifting before Diwali' },
        { k: 'Financing', v: 'Loan pre-approved, HDFC' },
        { k: 'Wants', v: '3BHK, Sector 65, ready to move' },
      ],
      quote:
        'Site visit Saturday morning kar sakte hain, par 1.5 se upar nahi jaana hai.',
      actions: ['Recording', 'Transcript', 'Call back'],
      time: '11:42 pm',
      caption: 'Sample card, in the format your team receives.',
    },
    closing:
      'You are not buying an AI. You are buying a shorter list, with the reason each name is on it.',
  },

  followUp: {
    eyebrow: 'Follow-up',
    title: "The follow-up your team means to do, and doesn't.",
    sub: 'Four states, and the rules that govern each one.',
    items: [
      {
        id: 'no-answer',
        title: 'He did not pick up',
        body: 'Four attempts, spaced across hours and days, never at night. Then it stops. Nobody gets harassed and your number does not get flagged.',
      },
      {
        id: 'not-ready',
        title: 'He picked up but is not ready',
        body: 'Goes onto a WhatsApp follow-up track. Six minutes, two hours, three days — at whatever pace you set.',
      },
      {
        id: 'replied',
        title: 'He replies to your agent',
        body: 'Every queued automated message stops that second. Nobody gets a bot message on top of a live conversation with your team. This is the rule we built the system around.',
      },
      {
        id: 'opt-out',
        title: 'He asks you to stop',
        body: 'Suppressed permanently, immediately, in Hindi, Hinglish or English. We keep the record of when and how he asked.',
      },
    ],
  },

  math: {
    eyebrow: 'The arithmetic',
    title: {
      lead: 'You are not short of leads. You are short of',
      emphasis: 'conversations',
      trail: '.',
    },
    defaults: { leads: 600, cpl: 700, reached: 35 },
    inputs: {
      leads: 'Leads a month, all sources',
      cpl: 'Blended cost per lead',
      reached: 'Of those, actually spoken to. Honestly.',
    },
    outputs: {
      spend: 'What you spend to get them',
      missed: 'Leads nobody ever reaches',
      wasted: 'Ad spend that never became a conversation',
    },
    under:
      'Not lost deals. Lost conversations. You paid for the phone number and never dialled it. Your lead is asleep, and someone else is calling him.',
    invite:
      'Every figure above starts as a guess about your business. Change them. The argument either gets stronger or it falls apart, and both of those are worth ten minutes of your time.',
  },

  limits: {
    eyebrow: 'Limits',
    title: 'Things this does not do.',
    sub: 'Written down so you do not find out in month two.',
    items: [
      {
        id: 'no-close',
        title: 'It does not close deals',
        body: 'It gets you a qualified name and a reason. Your agent still has to sell.',
      },
      {
        id: 'no-replace',
        title: 'It does not replace your team',
        body: 'Everyone who works for you today still works for you after this. It does the ninety seconds nobody is doing.',
      },
      {
        id: 'no-visits',
        title: 'It does not do site visits, negotiation, or paperwork',
        body: 'It hands over a warm name and stops.',
      },
      {
        id: 'accents',
        title: 'It is not good at Haryanvi or heavy Punjabi accents yet',
        body: 'Hindi, English and Hinglish, auto-detected mid-sentence. A thick regional accent will sometimes make it ask him to repeat himself. This is on the list and it is not fixed.',
      },
      {
        id: 'mistakes',
        title: 'It will occasionally get something wrong',
        body: 'Every call is recorded and transcribed, so you will see it rather than hear about it from a customer. Anyone telling you their AI never misunderstands has not run enough calls.',
      },
      {
        id: 'volume',
        title: 'It is not worth your money under 100 leads a month',
        body: 'At that volume your team can genuinely call everyone, and we will say so on the call rather than take the setup fee.',
      },
    ],
  },

  deadLead: {
    eyebrow: 'The free test',
    title: {
      lead: "Don't risk a single fresh lead.",
      emphasis: 'Give us fifty dead ones',
      trail: '.',
    },
    deck: [
      'The real objection is not the price. It is that AI will scare your customers off — and no paragraph on a website is going to argue you out of that. So do not test it where it can cost you anything.',
      'Export fifty leads from six months ago. The ones nobody has called since March, sitting in a spreadsheet you have quietly written off. We call all fifty, in Hindi, and you get every recording.',
    ],
    outcomes: [
      {
        id: 'hang-up',
        title: 'If they hang up on it',
        body: 'You have lost nothing, because those leads were worth nothing this morning. You will have found out for certain, on our rupee, and you can stop wondering.',
      },
      {
        id: 'they-talk',
        title: 'If they talk',
        body: 'You have found money inside a file you had already given up on. And you will have heard, in your buyers’ own voices, whether this works on your kind of customer.',
      },
    ],
    close:
      'Either way you keep the recordings and the transcripts. Then we sit down with them and you decide. There is nothing to sign for this.',
    cta: { label: 'Send the fifty', href: WA_DEAD_LEADS },
  },

  comparison: {
    eyebrow: 'The comparison that matters',
    title: 'Less than the telecaller who does not work Sundays.',
    sub: 'Not against another AI vendor. Against the thing you are actually doing today.',
    columns: ['One telecaller', 'Priya'],
    rows: [
      {
        id: 'cost',
        label: 'Cost',
        values: ['₹18,000 – 25,000 / month', '₹12,000 / month'],
      },
      {
        id: 'hours',
        label: 'Hours',
        values: ['10am to 7pm, six days', '24 hours, every day, including Diwali'],
      },
      {
        id: 'coverage',
        label: 'Coverage',
        values: ['The leads he gets to', 'Every lead, in 60 seconds, every time'],
      },
      {
        id: 'language',
        label: 'Language',
        values: ['Whatever he speaks', 'Hindi, English or Hinglish, auto-detected'],
      },
      {
        id: 'attrition',
        label: 'Attrition',
        values: [
          'Notice period, replacement, retraining, quits within a year',
          'None',
        ],
      },
      {
        id: 'record',
        label: 'Record',
        values: [
          'You hear about the call if he remembers it',
          'Every call recorded and transcribed',
        ],
      },
    ],
    note: 'Both columns are monthly. The setup fee is separate and is named in full below.',
  },

  plan: {
    eyebrow: 'Price',
    title: 'One plan. One number to hold in your head.',
    sub: 'No tiers, no recommended column, no decoy. There is one product and it does one thing.',
    tier: {
      id: 'priya-plan',
      badge: 'Every lead, every hour',
      title: 'Priya',
      body: 'Setup is charged because it is real work on our side, and it is done before your first lead is ever dialled: your projects, your price list, your call flow, your objection handling, and the voice tuned to the way your buyers actually speak.',
      price: {
        label: 'One-time setup ₹30,000, then',
        value: '₹12,000',
        note: '/ month · 500 leads included, ₹25 per lead after that',
      },
      features: [
        'Every lead called inside 60 seconds, 24/7',
        'Hindi, English and Hinglish, auto-detected mid-sentence',
        'Qualification on budget, timeline, financing and project',
        'Answers from your own price list — never an invented number',
        'Qualified card to your WhatsApp, with recording and transcript',
        'Four-attempt follow-up, quiet hours respected, instant opt-out',
        'Every call recorded and transcribed, exportable on request',
      ],
      note: 'That is ₹24 a lead, answered inside sixty seconds at any hour of the night. You paid several hundred rupees to buy each one of those numbers in the first place.',
      cta: { label: 'Call me now', href: WA_DEMO },
      secondaryCta: { label: 'Test it on dead leads first', href: '#dead-lead' },
      featured: true,
    },
    guarantee: {
      title: 'First 30 days, no monthly fee.',
      body: 'You pay setup, and the first month’s ₹12,000 is not charged. At the end of it the recordings and transcripts are yours to keep whether you continue or not. Month to month after that, no lock-in and no notice period — tell us to stop and we stop that day. Separately: 95% of your leads called inside sixty seconds, measured on a rolling thirty days with quiet-hours leads excluded. Every Monday you get the log with timestamps and you can count it yourself. If the month closes below 95, the next month is free. We do not guarantee that your customer picks up, stays on the line, or buys a flat — we do not control those.',
    },
    disqualifier:
      'Under 100 leads a month this is not worth your money, and we will tell you so on the call.',
  },

  founding: {
    eyebrow: 'Where we actually are',
    title: 'We are taking our first few brokerages.',
    sub: 'You are going to ask how many clients we have. The answer is that you would be among the first, and here is what that actually means — both ways. We would rather say this than pretend to have a hundred clients you could not name.',
    items: [
      {
        id: 'you-get',
        title: 'What you get',
        body: 'A direct number, not a support inbox. An objection you raise on Tuesday changes the product by the following week, because there is no roadmap committee to get through. Founding pricing that does not go up for you later, ever. And a system built around your objections rather than a generic brokerage.',
      },
      {
        id: 'you-take-on',
        title: 'What you are taking on',
        body: 'You are early. Something will break and you will be the one who finds it. When that happens you will hear it from us before you hear it from your customer, and it will be fixed the same week. But we would rather write that sentence now than have you discover it in month two.',
      },
    ],
  },

  faq: {
    title: 'The questions brokers actually ask',
    items: [
      {
        id: 'scare-off',
        question: 'AI se customer bhaag jaayega?',
        answer:
          'Maybe he will. It is a fair worry and no paragraph is going to argue you out of it — so do not test it on your fresh leads. Send us fifty from six months ago and listen to what happens. That offer is on this page and it costs you nothing.',
      },
      {
        id: 'team-already-calls',
        question: 'My team already calls every lead. Why would I need this?',
        answer:
          'They call the ones they get to, during the hours they work, in the order the leads arrive. Look at last Sunday’s leads and check what time the first call went out. That number is the whole conversation.',
      },
      {
        id: 'legal',
        question: 'Is this legal?',
        answer:
          'Priya identifies herself as an AI in the first sentence of every call. Opt-outs are honoured the second they are spoken. Follow-ups respect quiet hours and no number is dialled more than four times. Calls go only to people who submitted an enquiry to you — never to purchased lists, and never to a DND number that has not contacted you first. We walk you through where DLT registration sits before you sign anything, rather than after.',
      },
      {
        id: 'wrong-info',
        question: 'What if it says something wrong about a project?',
        answer:
          'It answers only from the price list and project sheet you give us, and it is instructed to say it will confirm and come back rather than guess. Every call is recorded, so when it does get something wrong you see it rather than hearing about it from a customer.',
      },
      {
        id: 'haryanvi',
        question: 'Does it understand Haryanvi?',
        answer:
          'Not well. Hindi, English and Hinglish, auto-detected mid-sentence. A thick Haryanvi or Punjabi accent will sometimes make it ask him to repeat himself. It is on the list and it is not fixed yet.',
      },
      {
        id: 'cancel',
        question: 'Can I stop whenever I want?',
        answer:
          'Monthly, no lock-in, no notice period. Tell us to stop and we stop that day. The setup fee is not refundable because that work is already done.',
      },
      {
        id: 'change-number',
        question: 'Do I have to change my website or my number?',
        answer:
          'No. Your forms stay where they are, your portal accounts stay where they are, and your hoardings and listings do not change. We connect to the place your leads already land.',
      },
      {
        id: 'data',
        question: 'Where does my data go?',
        answer:
          'Your leads, your recordings and your transcripts are yours. Held in an Indian region, exportable on request, deleted on request. We do not sell data and we do not use your leads for anybody else.',
      },
      {
        id: 'other-industries',
        question: 'We are not a brokerage. Does this work for us?',
        answer:
          'The engine is not real-estate-specific — it is instant qualified callback in the caller’s language, and it runs the same way for clinics, dealerships and education. Real estate is where we have run it hardest and where the call flows are tuned, so that is what this page claims. Ask us on a call and we will tell you honestly whether yours is close enough.',
      },
    ],
  },

  close: {
    eyebrow: 'Hear it for yourself',
    title: 'Send your number. Your phone rings in sixty seconds.',
    sub: 'No meeting room, no trial login, no proposal deck. Take the call yourself, in Hindi, and hear exactly what your buyer would hear. If it is bad, tell us it is bad — that is useful too.',
    cta: {
      primary: { label: 'Call me now', href: WA_DEMO },
      secondary: { label: 'See the price again', href: '#plan' },
    },
  },
}

/* ---------------------------------------------------------------------------
   The homepage band. Same product, one scroll of it.
--------------------------------------------------------------------------- */

export const PRIYA_HOME: HeroProductContent = {
  eyebrow: 'Our flagship',
  title: {
    lead: 'Your leads arrive at midnight. Your team',
    emphasis: 'starts at ten',
    trail: '.',
  },
  sub: 'Priya calls every property enquiry within sixty seconds, in Hindi, at any hour — qualifies it on budget, timeline and financing, and sends the card to your WhatsApp.',
  points: [
    'Called in under 60 seconds',
    'Hindi, English or Hinglish',
    'Qualified card on WhatsApp',
  ],
  cta: { label: 'See how Priya works', href: '/priya' },
  clock: {
    label: "Last night's 11:40pm lead has now been waiting",
    sinceHour: 23,
    sinceMinute: 40,
  },
  card: PRIYA.leadCard.card,
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run typecheck`
Expected: clean. If it fails, the mismatch is between this data and the Task 2 interfaces — fix the data, not the interface, unless the interface is genuinely missing a field.

- [ ] **Step 3: Verify no placeholder language leaked in**

Run: `git grep -In -i -E 'placeholder|example\.(com|us)|autoploy|lorem' -- src/content/priya.ts`
Expected: only the file's own header comment saying it is NOT placeholder.

Do **not** use `npx rg` — there is no `rg` package on npm under that name, and
npx installs an unrelated stub that scaffolds a junk `README.md` into the
project root. Use `git grep`, or ripgrep if it is already on PATH.

- [ ] **Step 4: Commit**

```bash
git add src/content/priya.ts
git commit -m "feat: add the Priya product content module"
```

---

## Task 4: WaitClock

**Files:**
- Create: `src/components/ui/WaitClock.tsx`
- Test: `src/components/ui/WaitClock.test.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `WaitClock({ label, sinceHour, sinceMinute, foot }: WaitClockProps)` where `foot?: string`. Exported named. Also exports `elapsedSinceLastNight(hour: number, minute: number, now?: number): number` (milliseconds) for the test.

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/WaitClock.test.tsx`:

```tsx
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WaitClock, elapsedSinceLastNight } from './WaitClock'

/** 2026-08-24 04:10:30 IST === 2026-08-23 22:40:30 UTC */
const IST_0410 = Date.UTC(2026, 7, 23, 22, 40, 30)

describe('elapsedSinceLastNight', () => {
  it('measures from 11:40pm IST the previous night', () => {
    const ms = elapsedSinceLastNight(23, 40, IST_0410)
    // 11:40pm IST to 4:10:30am IST is 4h 30m 30s.
    expect(ms).toBe(((4 * 60 + 30) * 60 + 30) * 1000)
  })

  it('rolls back a full day when the target has not happened yet today', () => {
    // 2026-08-24 09:00 IST — 11:40pm IST is still 14h40m away today, so the
    // relevant lead is yesterday's and the clock reads 9h 20m.
    const ist0900 = Date.UTC(2026, 7, 24, 3, 30, 0)
    expect(elapsedSinceLastNight(23, 40, ist0900)).toBe(
      ((9 * 60 + 50) * 60) * 1000,
    )
  })

  it('never returns a negative elapsed time', () => {
    for (let h = 0; h < 24; h++) {
      const t = Date.UTC(2026, 7, 24, h, 0, 0)
      expect(elapsedSinceLastNight(23, 40, t)).toBeGreaterThanOrEqual(0)
    }
  })
})

describe('WaitClock', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(IST_0410)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function renderClock() {
    return render(
      <WaitClock
        label="Last night's lead has been waiting"
        sinceHour={23}
        sinceMinute={40}
        foot="This is the ordinary case."
      />,
    )
  }

  it('renders its label and footnote', () => {
    renderClock()
    expect(
      screen.getByText("Last night's lead has been waiting"),
    ).toBeInTheDocument()
    expect(screen.getByText('This is the ordinary case.')).toBeInTheDocument()
  })

  it('shows the elapsed time zero-padded to two digits', () => {
    const { container } = renderClock()
    const cells = container.querySelectorAll('[data-clock-cell]')
    expect(Array.from(cells).map((c) => c.textContent)).toEqual([
      '04',
      '30',
      '30',
    ])
  })

  it('advances once a second', () => {
    const { container } = renderClock()
    vi.advanceTimersByTime(2000)
    const cells = container.querySelectorAll('[data-clock-cell]')
    expect(cells[2].textContent).toBe('32')
  })

  it('does not announce every tick to screen readers', () => {
    const { container } = renderClock()
    expect(container.querySelector('[aria-live]')).toHaveAttribute(
      'aria-live',
      'off',
    )
  })

  it('clears its interval on unmount', () => {
    const clear = vi.spyOn(globalThis, 'clearInterval')
    const { unmount } = renderClock()
    unmount()
    expect(clear).toHaveBeenCalled()
    clear.mockRestore()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ui/WaitClock.test.tsx`
Expected: FAIL — `Failed to resolve import "./WaitClock"`.

- [ ] **Step 3: Write the implementation**

Create `src/components/ui/WaitClock.tsx`:

```tsx
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

interface WaitClockProps {
  label: string
  /** Hour and minute in IST that the clock counts from. */
  sinceHour: number
  sinceMinute: number
  foot?: string
  /** `sm` for the homepage band, `md` for the product hero. */
  size?: 'sm' | 'md'
  className?: string
}

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000

/**
 * Milliseconds since the most recent occurrence of hour:minute IST.
 *
 * IST is computed explicitly rather than trusting the visitor's clock: the
 * claim is about a lead that arrived at 11:40pm IST and it has to hold for
 * whoever is reading, wherever they are.
 */
export function elapsedSinceLastNight(
  hour: number,
  minute: number,
  now: number = Date.now(),
): number {
  const ist = new Date(now + IST_OFFSET_MS)

  const target =
    Date.UTC(
      ist.getUTCFullYear(),
      ist.getUTCMonth(),
      ist.getUTCDate(),
      hour,
      minute,
      0,
    ) - IST_OFFSET_MS

  const elapsed = now - target
  // Before the target time today, the relevant lead is yesterday's.
  return elapsed >= 0 ? elapsed : elapsed + DAY_MS
}

const pad = (n: number) => String(n).padStart(2, '0')

const SIZES = {
  sm: 'text-step-4',
  md: 'text-step-5 sm:text-step-6',
} as const

/**
 * How long a lead that arrived at 11:40pm IST has been waiting, right now.
 *
 * Real elapsed time computed in the browser, which is the only reason it is
 * allowed to be here — the page sells seconds, so the honest way to open is
 * with seconds actually passing.
 *
 * Two implementation notes that matter:
 *
 *  - The digits are written straight to the DOM through refs, not through
 *    state. A setState every second would re-render this subtree 3,600 times
 *    an hour on a mid-range Android for no reason.
 *  - Each pair sits in a fixed-width cell. A clock that reflows once a second
 *    undermines the one claim the page makes.
 *
 * It keeps ticking under reduced motion: this is information, not decoration.
 * But it is aria-live="off" — a screen reader announcing a changing number
 * every second is unusable.
 */
export function WaitClock({
  label,
  sinceHour,
  sinceMinute,
  foot,
  size = 'md',
  className,
}: WaitClockProps) {
  const h = useRef<HTMLSpanElement>(null)
  const m = useRef<HTMLSpanElement>(null)
  const s = useRef<HTMLSpanElement>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    setLive(true)

    const tick = () => {
      const total = Math.floor(
        elapsedSinceLastNight(sinceHour, sinceMinute) / 1000,
      )
      if (h.current) h.current.textContent = pad(Math.floor(total / 3600))
      if (m.current) m.current.textContent = pad(Math.floor((total % 3600) / 60))
      if (s.current) s.current.textContent = pad(total % 60)
    }

    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [sinceHour, sinceMinute])

  return (
    <figure
      className={cn(
        'rounded-[var(--r-lg)] border border-[var(--border-strong)] bg-[var(--surface-2)] p-6 shadow-[var(--shadow-2)]',
        className,
      )}
    >
      <figcaption className="text-[0.9375rem] leading-snug text-[var(--text-2)]">
        {label}
      </figcaption>

      <div
        aria-live="off"
        className={cn(
          'tnum mt-4 flex items-baseline gap-1 font-display font-semibold leading-none tracking-[-0.03em] text-[var(--accent)]',
          SIZES[size],
        )}
      >
        <Cell inner={h} live={live} />
        <Sep />
        <Cell inner={m} live={live} />
        <Sep />
        <Cell inner={s} live={live} />
      </div>

      {foot && (
        <p className="mt-5 text-[0.8125rem] leading-snug text-[var(--text-3)]">
          {foot}
        </p>
      )}
    </figure>
  )
}

function Cell({
  inner,
  live,
}: {
  inner: React.RefObject<HTMLSpanElement | null>
  live: boolean
}) {
  return (
    <span
      ref={inner}
      data-clock-cell=""
      className="inline-block min-w-[2ch] text-center"
    >
      {live ? '' : '00'}
    </span>
  )
}

function Sep() {
  return (
    <span aria-hidden="true" className="opacity-50">
      :
    </span>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/ui/WaitClock.test.tsx`
Expected: PASS, all 8 cases.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/WaitClock.tsx src/components/ui/WaitClock.test.tsx
git commit -m "feat: add the live wait clock"
```

---

## Task 5: StepList pullQuote and PillarRow columns

**Files:**
- Modify: `src/components/blocks/StepList.tsx`
- Modify: `src/components/blocks/PillarRow.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `StepList` gains `pullQuote?: string`; `PillarRow` gains `columns?: 2 | 3` (default `3`). Both additive — every existing call site is unaffected.

- [ ] **Step 1: Add `pullQuote` to StepList**

In `src/components/blocks/StepList.tsx`, add to `interface StepListProps`:

```ts
  /**
   * A closing line that is the argument of the section rather than a step.
   * Set in the serif face — this is the one place a StepList raises its voice.
   */
  pullQuote?: string
```

Add `pullQuote` to the destructured props, then render it as the last child inside `<Container>`, after the steps list closes:

```tsx
        {pullQuote && (
          <Reveal index={steps.length}>
            <p className="mt-14 max-w-[38rem] border-l-2 border-[var(--accent-dim)] pl-6 font-serif text-step-2 leading-[1.45] text-[var(--text-1)] italic">
              {pullQuote}
            </p>
          </Reveal>
        )}
```

- [ ] **Step 2: Add `columns` to PillarRow**

In `src/components/blocks/PillarRow.tsx`, add to `interface PillarRowProps`:

```ts
  /** Two for a paired statement, three for a set. Defaults to three. */
  columns?: 2 | 3
```

Destructure it with `columns = 3`, add the map above the component body:

```tsx
const COLUMNS = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
} as const
```

and change the `<ul>` className from the hardcoded grid to:

```tsx
        <ul className={cn('mt-12 grid gap-x-8 gap-y-10', COLUMNS[columns])}>
```

Add `import { cn } from '@/lib/cn'` at the top of the file.

- [ ] **Step 3: Verify nothing regressed**

Run: `npm test`
Expected: PASS. Every existing `StepList` and `PillarRow` call site omits the new props and keeps its current rendering. Then `npm run typecheck` — clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/blocks/StepList.tsx src/components/blocks/PillarRow.tsx
git commit -m "feat: add optional pull quote to StepList and column count to PillarRow"
```

---

## Task 6: ProductHero

**Files:**
- Create: `src/components/blocks/ProductHero.tsx`

**Interfaces:**
- Consumes: `WaitClock` from Task 4; `PriyaContent['hero']` from Task 2.
- Produces: `ProductHero({ hero }: { hero: PriyaContent['hero'] })`. Renders the page's single `<h1>`.

- [ ] **Step 1: Write the component**

Create `src/components/blocks/ProductHero.tsx`:

```tsx
import { ArrowRight, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { WaitClock } from '@/components/ui/WaitClock'
import type { PriyaContent } from '@/content/types'

/**
 * The product page's opening block, and the only place on the site where a
 * hero is two columns.
 *
 * PageHeader is centred and copy-only, which is right for every other page.
 * This one has to put a running clock beside the claim, because the claim is
 * about elapsed time and a centred column would either bury the clock below
 * the fold or push the headline off it.
 */
export function ProductHero({ hero }: { hero: PriyaContent['hero'] }) {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+3.5rem)] pb-16 sm:pt-[calc(var(--nav-h)+5rem)] sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(closest-side, color-mix(in oklch, var(--accent) 22%, transparent), transparent)',
          opacity: 'var(--bloom-opacity)',
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow className="mb-6">{hero.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal index={1}>
              <Heading level={1} size="display" className="mb-6">
                {hero.headline.lead} <Emphasis>{hero.headline.emphasis}</Emphasis>
                {hero.headline.trail}
              </Heading>
            </Reveal>

            <Reveal index={2}>
              <Text size="lg" className="max-w-[36rem]">
                {hero.sub}
              </Text>
            </Reveal>

            {hero.cta && (
              <Reveal index={3}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button
                    href={hero.cta.primary.href}
                    size="lg"
                    trailing={<ArrowRight size={17} />}
                  >
                    {hero.cta.primary.label}
                  </Button>
                  <Button href={hero.cta.secondary.href} variant="secondary" size="lg">
                    {hero.cta.secondary.label}
                  </Button>
                </div>
              </Reveal>
            )}

            {hero.assurances && (
              <Reveal index={4}>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
                  {hero.assurances.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[0.8125rem] text-[var(--text-3)]"
                    >
                      <Check
                        size={14}
                        aria-hidden="true"
                        className="shrink-0 text-[var(--success)]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <Reveal index={2}>
            <WaitClock
              label={hero.clock.label}
              sinceHour={hero.clock.sinceHour}
              sinceMinute={hero.clock.sinceMinute}
              foot={hero.clock.foot}
            />
            <p className="mt-6 text-[0.875rem] leading-[1.65] text-[var(--text-2)]">
              {hero.trust}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run typecheck`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/blocks/ProductHero.tsx
git commit -m "feat: add the Priya product hero"
```

---

## Task 7: TimeRace

**Files:**
- Create: `src/components/blocks/TimeRace.tsx`

**Interfaces:**
- Consumes: `PriyaContent['race']`.
- Produces: `TimeRace({ race }: { race: PriyaContent['race'] })`.

- [ ] **Step 1: Write the component**

Create `src/components/blocks/TimeRace.tsx`:

```tsx
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import type { PriyaContent, RaceLane } from '@/content/types'

/**
 * The same lead down two lanes.
 *
 * Two ordered lists rather than a table: the rows are not aligned across
 * lanes — one lane resolves in 101 seconds and the other in fourteen hours —
 * and a table would assert a row relationship that does not exist.
 *
 * The fast lane is accented; the slow lane is muted. On narrow screens they
 * stack with the slow lane first, so the reader meets his own process before
 * he is shown the alternative.
 */
export function TimeRace({ race }: { race: PriyaContent['race'] }) {
  return (
    <Section id="race" divided aria-labelledby="race-title">
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            <Eyebrow className="mb-5">{race.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id="race-title">
              {race.title.lead} <Emphasis>{race.title.emphasis}</Emphasis>
              {race.title.trail}
            </Heading>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {race.lanes.map((lane, i) => (
            <Lane key={lane.id} lane={lane} fast={i === 1} index={i} />
          ))}
        </div>

        <Reveal index={2}>
          <div className="mt-14 max-w-[42rem]">
            <p className="font-display text-step-2 leading-snug tracking-[-0.02em] text-[var(--text-1)]">
              {race.resolve}
            </p>
            <p className="mt-4 text-step-1 leading-[1.55] text-[var(--text-2)]">
              {race.closing}
            </p>
            <p
              lang="hi"
              className="mt-8 border-l-2 border-[var(--accent-dim)] pl-6 font-serif text-step-2 leading-[1.5] text-[var(--accent)] italic"
            >
              {race.proverb}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

function Lane({
  lane,
  fast,
  index,
}: {
  lane: RaceLane
  fast: boolean
  index: number
}) {
  return (
    <Reveal index={index}>
      <div
        className={cn(
          'h-full rounded-[var(--r-lg)] border p-6 sm:p-7',
          fast
            ? 'border-[var(--border-strong)] bg-[var(--surface-2)] shadow-[var(--shadow-2)]'
            : 'border-[var(--border-subtle)] bg-[var(--surface-1)]',
        )}
      >
        <p
          className={cn(
            'font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em]',
            fast ? 'text-[var(--accent)]' : 'text-[var(--text-3)]',
          )}
        >
          {lane.label}
        </p>

        <ol className="mt-6 flex flex-col gap-5">
          {lane.steps.map((step, i) => (
            <li key={`${lane.id}-${i}`} className="flex gap-4">
              <span
                className={cn(
                  'tnum w-[3.25rem] shrink-0 pt-0.5 font-mono text-[0.75rem]',
                  fast ? 'text-[var(--accent)]' : 'text-[var(--text-3)]',
                )}
              >
                {step.clock}
              </span>
              <span
                className={cn(
                  'text-[0.9375rem] leading-[1.55]',
                  step.clock
                    ? 'text-[var(--text-2)]'
                    : 'font-medium text-[var(--text-1)]',
                )}
              >
                {step.text}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run typecheck`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/blocks/TimeRace.tsx
git commit -m "feat: add the two-Tuesdays time race block"
```

---

## Task 8: CallTranscript

**Files:**
- Create: `src/components/blocks/CallTranscript.tsx`

**Interfaces:**
- Consumes: `PriyaContent['call']`.
- Produces: `CallTranscript({ call }: { call: PriyaContent['call'] })`.

- [ ] **Step 1: Write the component**

Create `src/components/blocks/CallTranscript.tsx`:

```tsx
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import type { PriyaContent } from '@/content/types'

/**
 * The sample call.
 *
 * A description list: speaker is the term, the line is the definition. That
 * is what a transcript is, and it means a screen reader reads "प्रिया — line"
 * rather than two unrelated runs of text.
 *
 * `lang="hi"` on every Devanagari line is load-bearing, not decoration.
 * Without it the line is read with an English voice and is incomprehensible.
 *
 * AI and customer turns differ by alignment AND by a labelled speaker AND by
 * surface — never by colour alone, so the distinction survives greyscale.
 *
 * The audio player renders only when `recordingUrl` is a real file. It is
 * null and must stay null until a recording is actually chosen; while it is
 * null the deck labels this transcript representative rather than actual.
 */
export function CallTranscript({ call }: { call: PriyaContent['call'] }) {
  return (
    <Section id="call" divided aria-labelledby="call-title">
      <Container width="narrow">
        <Reveal>
          <Eyebrow className="mb-5">{call.eyebrow}</Eyebrow>
          <Heading level={2} size="xl" id="call-title" className="mb-4">
            {call.title}
          </Heading>
          <Text size="lg">{call.sub}</Text>
        </Reveal>

        {call.recordingUrl && (
          <Reveal index={1}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption -- the
                transcript below IS the caption, and is always rendered. */}
            <audio
              controls
              preload="none"
              src={call.recordingUrl}
              className="mt-8 w-full"
            />
          </Reveal>
        )}

        <Reveal index={1}>
          <dl className="mt-10 flex flex-col gap-5">
            {call.turns.map((turn) => {
              const ai = turn.role === 'ai'
              return (
                <div
                  key={turn.id}
                  className={cn(
                    'flex max-w-[86%] flex-col gap-1.5',
                    ai ? 'items-start self-start' : 'items-start self-end',
                  )}
                >
                  <dt className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--text-3)]">
                    <span lang={turn.lang}>{turn.who}</span>
                    {ai && (
                      <Badge tone="accent">AI</Badge>
                    )}
                  </dt>
                  <dd
                    lang={turn.lang}
                    className={cn(
                      'rounded-[var(--r-lg)] border px-4 py-3 text-[0.9375rem] leading-[1.6]',
                      ai
                        ? 'border-[color-mix(in_oklch,var(--accent)_28%,transparent)] bg-[color-mix(in_oklch,var(--accent)_9%,transparent)] text-[var(--text-1)]'
                        : 'border-[var(--border-subtle)] bg-[var(--surface-2)] text-[var(--text-2)]',
                    )}
                  >
                    {turn.line}
                  </dd>
                </div>
              )
            })}
          </dl>
        </Reveal>

        <Reveal index={2}>
          <p className="mt-10 border-t border-[var(--border-subtle)] pt-6 text-[0.9375rem] leading-[1.65] text-[var(--text-2)]">
            {call.caption}
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run typecheck`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/blocks/CallTranscript.tsx
git commit -m "feat: add the sample call transcript block"
```

---

## Task 9: LeadCard

**Files:**
- Create: `src/components/blocks/LeadCard.tsx`

**Interfaces:**
- Consumes: `LeadCardSpec`, `PriyaContent['leadCard']`.
- Produces: `LeadCard({ leadCard }: { leadCard: PriyaContent['leadCard'] })` — the full section — and `LeadCardFigure({ card, className }: { card: LeadCardSpec; className?: string })` — the bare figure, reused by the homepage band in Task 12.

- [ ] **Step 1: Write the component**

Create `src/components/blocks/LeadCard.tsx`:

```tsx
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import type { LeadCardSpec, PriyaContent } from '@/content/types'

/**
 * The card a broker actually receives.
 *
 * It is a facsimile of a real artefact, so it is a <figure> with a caption
 * naming it a sample — everywhere it appears, including the homepage band.
 * An unlabelled mock of a customer record is the kind of thing that ends up
 * screenshotted out of context.
 *
 * The phone number is masked in the content module, not here.
 */
export function LeadCardFigure({
  card,
  className,
}: {
  card: LeadCardSpec
  className?: string
}) {
  return (
    <figure className={cn('w-full', className)}>
      <div className="overflow-hidden rounded-[var(--r-lg)] border border-[var(--border-strong)] bg-[var(--surface-2)] shadow-[var(--shadow-3)]">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-[var(--text-1)]">
              {card.name}
            </span>
            <Badge tone="success">{card.track}</Badge>
          </div>
          <span className="tnum font-mono text-[0.75rem] text-[var(--text-3)]">
            {card.score}
          </span>
        </div>

        <dl className="flex flex-col">
          {card.rows.map((row) => (
            <div
              key={row.k}
              className="flex gap-4 border-b border-[var(--border-subtle)] px-5 py-3 last:border-b-0"
            >
              <dt className="w-[5.5rem] shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--text-3)]">
                {row.k}
              </dt>
              <dd className="text-[0.875rem] leading-[1.5] text-[var(--text-1)]">
                {row.v}
              </dd>
            </div>
          ))}
        </dl>

        <blockquote
          lang={card.quoteLang}
          className="border-t border-[var(--border-subtle)] bg-[var(--surface-1)] px-5 py-4 text-[0.875rem] leading-[1.6] text-[var(--text-2)] italic"
        >
          {card.quote}
        </blockquote>

        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border-subtle)] px-5 py-4">
          {card.actions.map((action) => (
            <span
              key={action}
              className="rounded-[var(--r-full)] border border-[var(--border-subtle)] px-3 py-1 font-mono text-[0.6875rem] text-[var(--text-2)]"
            >
              {action}
            </span>
          ))}
          <span className="tnum ml-auto font-mono text-[0.6875rem] text-[var(--text-3)]">
            {card.time}
          </span>
        </div>
      </div>

      <figcaption className="mt-3 text-[0.8125rem] text-[var(--text-3)]">
        {card.caption}
      </figcaption>
    </figure>
  )
}

export function LeadCard({ leadCard }: { leadCard: PriyaContent['leadCard'] }) {
  return (
    <Section id="card" divided aria-labelledby="card-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow className="mb-5">{leadCard.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id="card-title" className="mb-6">
              {leadCard.title.lead} <Emphasis>{leadCard.title.emphasis}</Emphasis>
              {leadCard.title.trail}
            </Heading>
            <p className="max-w-[34rem] text-step-1 leading-[1.55] text-[var(--text-2)]">
              {leadCard.closing}
            </p>
          </Reveal>

          <Reveal index={1}>
            <LeadCardFigure card={leadCard.card} className="mx-auto max-w-[26rem]" />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run typecheck`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/blocks/LeadCard.tsx
git commit -m "feat: add the WhatsApp lead card block"
```

---

## Task 10: LeadMath

**Files:**
- Create: `src/components/blocks/LeadMath.tsx`
- Test: `src/components/blocks/LeadMath.test.tsx`

**Interfaces:**
- Consumes: `LeadMathSpec`.
- Produces: `LeadMath({ math }: { math: LeadMathSpec })`.

- [ ] **Step 1: Write the failing test**

Create `src/components/blocks/LeadMath.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LeadMath } from './LeadMath'
import { PRIYA } from '@/content/priya'

function renderMath() {
  return render(<LeadMath math={PRIYA.math} />)
}

describe('LeadMath', () => {
  it('computes the defaults: 600 leads, ₹700 each, 35% reached', () => {
    renderMath()
    // 600 × 700 = 420,000 spent; 65% of 600 = 390 never reached;
    // 390 × 700 = 273,000 wasted.
    expect(screen.getByTestId('out-spend')).toHaveTextContent('₹4,20,000')
    expect(screen.getByTestId('out-missed')).toHaveTextContent('390')
    expect(screen.getByTestId('out-wasted')).toHaveTextContent('₹2,73,000')
  })

  it('recomputes when a figure changes', async () => {
    const user = userEvent.setup()
    renderMath()

    const leads = screen.getByLabelText(PRIYA.math.inputs.leads)
    await user.clear(leads)
    await user.type(leads, '1000')

    expect(screen.getByTestId('out-spend')).toHaveTextContent('₹7,00,000')
    expect(screen.getByTestId('out-missed')).toHaveTextContent('650')
  })

  it('announces the result politely rather than on every keystroke', () => {
    renderMath()
    expect(screen.getByTestId('out-spend').closest('[aria-live]')).toHaveAttribute(
      'aria-live',
      'polite',
    )
  })

  it('never renders NaN when an input is cleared', async () => {
    const user = userEvent.setup()
    const { container } = renderMath()

    await user.clear(screen.getByLabelText(PRIYA.math.inputs.leads))

    expect(container.textContent).not.toMatch(/NaN/)
    expect(screen.getByTestId('out-missed')).toHaveTextContent('0')
  })

  it('clamps the reached percentage to 0-100', async () => {
    const user = userEvent.setup()
    renderMath()

    const reached = screen.getByLabelText(PRIYA.math.inputs.reached)
    await user.clear(reached)
    await user.type(reached, '150')

    // Clamped to 100 — nobody is unreached.
    expect(screen.getByTestId('out-missed')).toHaveTextContent('0')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/blocks/LeadMath.test.tsx`
Expected: FAIL — `Failed to resolve import "./LeadMath"`.

- [ ] **Step 3: Write the implementation**

Create `src/components/blocks/LeadMath.tsx`:

```tsx
import { useId, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import type { LeadMathSpec } from '@/content/types'

/**
 * The arithmetic, with the reader's own numbers in it.
 *
 * The point of this block is that he changes the figures. A static table of
 * our assumptions is exactly the kind of thing this page tells him to
 * distrust, so the inputs are real inputs and the invitation to move them is
 * printed underneath.
 *
 * Outputs live in one aria-live="polite" region so the result is announced
 * once when it settles, not three times per keystroke.
 */

/** Indian digit grouping — 4,20,000 rather than 420,000. */
const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const count = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

/** Empty, negative and non-finite inputs all resolve to a usable number. */
function toNumber(raw: string, max = Number.MAX_SAFE_INTEGER): number {
  const n = Number(raw)
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.min(n, max)
}

export function LeadMath({ math }: { math: LeadMathSpec }) {
  const [leads, setLeads] = useState(String(math.defaults.leads))
  const [cpl, setCpl] = useState(String(math.defaults.cpl))
  const [reached, setReached] = useState(String(math.defaults.reached))

  const leadsN = toNumber(leads)
  const cplN = toNumber(cpl)
  const reachedN = toNumber(reached, 100)

  const spend = leadsN * cplN
  const missed = Math.round(leadsN * ((100 - reachedN) / 100))
  const wasted = missed * cplN

  return (
    <Section id="math" divided aria-labelledby="math-title">
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            <Eyebrow className="mb-5">{math.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id="math-title">
              {math.title.lead} <Emphasis>{math.title.emphasis}</Emphasis>
              {math.title.trail}
            </Heading>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            <div className="flex flex-col gap-5 rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-6">
              <Field label={math.inputs.leads} value={leads} onChange={setLeads} />
              <Field label={math.inputs.cpl} value={cpl} onChange={setCpl} prefix="₹" />
              <Field
                label={math.inputs.reached}
                value={reached}
                onChange={setReached}
                suffix="%"
                max={100}
              />
            </div>

            <div
              aria-live="polite"
              className="flex flex-col gap-4 rounded-[var(--r-lg)] border border-[var(--border-strong)] bg-[var(--surface-2)] p-6 shadow-[var(--shadow-2)]"
            >
              <Output
                testId="out-spend"
                label={math.outputs.spend}
                value={inr.format(spend)}
              />
              <Output
                testId="out-missed"
                label={math.outputs.missed}
                value={count.format(missed)}
              />
              <Output
                testId="out-wasted"
                label={math.outputs.wasted}
                value={inr.format(wasted)}
                emphasis
              />
            </div>
          </div>
        </Reveal>

        <Reveal index={2}>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <p className="text-step-1 leading-[1.55] text-[var(--text-1)]">
              {math.under}
            </p>
            <p className="text-[0.9375rem] leading-[1.65] text-[var(--text-2)]">
              {math.invite}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  max,
}: {
  label: string
  value: string
  onChange: (next: string) => void
  prefix?: string
  suffix?: string
  max?: number
}) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--text-3)]"
      >
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-[var(--r-md)] border border-[var(--border-subtle)] bg-[var(--surface-2)] px-3.5 focus-within:border-[var(--border-strong)]">
        {prefix && <span className="text-[var(--text-3)]">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="tnum h-11 w-full bg-transparent font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-[var(--text-1)] outline-none"
        />
        {suffix && <span className="text-[var(--text-3)]">{suffix}</span>}
      </div>
    </div>
  )
}

function Output({
  label,
  value,
  testId,
  emphasis = false,
}: {
  label: string
  value: string
  testId: string
  emphasis?: boolean
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-[var(--border-subtle)] pb-4 last:border-b-0 last:pb-0">
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--text-3)]">
        {label}
      </span>
      <span
        data-testid={testId}
        className={
          emphasis
            ? 'tnum font-display text-step-4 font-semibold tracking-[-0.03em] text-[var(--warn)]'
            : 'tnum font-display text-step-3 font-semibold tracking-[-0.03em] text-[var(--text-1)]'
        }
      >
        {value}
      </span>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/blocks/LeadMath.test.tsx`
Expected: PASS, all 5 cases.

If the currency assertion fails on formatting, check what `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })` actually emits in this Node version (it may use `₹` with a non-breaking space). Adjust the **test expectation** to the real output — do not switch to manual string formatting.

- [ ] **Step 5: Commit**

```bash
git add src/components/blocks/LeadMath.tsx src/components/blocks/LeadMath.test.tsx
git commit -m "feat: add the interactive lead arithmetic block"
```

---

## Task 11: DeadLeadOffer

**Files:**
- Create: `src/components/blocks/DeadLeadOffer.tsx`

**Interfaces:**
- Consumes: `DeadLeadSpec`.
- Produces: `DeadLeadOffer({ offer }: { offer: DeadLeadSpec })`. Renders with `id="dead-lead"` — the hero's secondary CTA and the plan's secondary CTA both anchor to it.

- [ ] **Step 1: Write the component**

Create `src/components/blocks/DeadLeadOffer.tsx`:

```tsx
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import type { DeadLeadSpec } from '@/content/types'

/**
 * The offer that costs him nothing.
 *
 * The one lifted band on the page — surface-3 with a strong border, the same
 * move CtaBand already makes. It carries the page's second amber action and
 * there is no third: hero, here, and the closing band all point at the same
 * intent, and anything else competing for the click weakens all of them.
 *
 * The anchor id is load-bearing: the hero's secondary CTA and the plan's
 * secondary CTA both target #dead-lead.
 */
export function DeadLeadOffer({ offer }: { offer: DeadLeadSpec }) {
  return (
    <Section id="dead-lead" spacing="tight" aria-labelledby="dead-lead-title">
      <Container>
        <Reveal>
          <div className="rounded-[var(--r-xl)] border border-[var(--border-strong)] bg-[var(--surface-3)] px-6 py-12 shadow-[var(--shadow-3)] sm:px-10 sm:py-14">
            <div className="max-w-[44rem]">
              <Eyebrow className="mb-5">{offer.eyebrow}</Eyebrow>
              <Heading level={2} size="xl" id="dead-lead-title" className="mb-6">
                {offer.title.lead} <Emphasis>{offer.title.emphasis}</Emphasis>
                {offer.title.trail}
              </Heading>

              {offer.deck.map((para) => (
                <p
                  key={para.slice(0, 32)}
                  className="mt-4 text-step-1 leading-[1.55] text-[var(--text-2)]"
                >
                  {para}
                </p>
              ))}
            </div>

            <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {offer.outcomes.map((outcome, i) => (
                <Reveal as="li" key={outcome.id} index={i}>
                  <div className="border-t border-[var(--border-strong)] pt-5">
                    <h3 className="mb-3 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-[var(--text-1)]">
                      {outcome.title}
                    </h3>
                    <p className="text-[0.9375rem] leading-[1.62] text-[var(--text-2)]">
                      {outcome.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <div className="mt-12 flex flex-col gap-6 border-t border-[var(--border-subtle)] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[36rem] text-[0.9375rem] leading-[1.65] text-[var(--text-2)]">
                {offer.close}
              </p>
              <Button
                href={offer.cta.href}
                size="lg"
                className="shrink-0"
                trailing={<ArrowRight size={17} />}
              >
                {offer.cta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run typecheck`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/blocks/DeadLeadOffer.tsx
git commit -m "feat: add the dead-lead test offer block"
```

---

## Task 12: The Priya page and its route

**Files:**
- Create: `src/pages/Priya.tsx`
- Create: `src/pages/Priya.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: every block from Tasks 5–11, plus existing `PillarRow`, `StepList`, `ComparisonTable`, `PricingTiers`, `FAQ`, `CtaBand`; `PRIYA` from Task 3.
- Produces: default-exported `Priya` page component, routed at `/priya`.

- [ ] **Step 1: Write the failing test**

Create `src/pages/Priya.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axe from 'axe-core'
import Priya from './Priya'
import { PRIYA } from '@/content/priya'

function renderPriya() {
  return render(
    <MemoryRouter>
      <Priya />
    </MemoryRouter>,
  )
}

describe('Priya', () => {
  it('renders with its real content module', () => {
    renderPriya()
    expect(screen.getByText(PRIYA.hero.sub)).toBeInTheDocument()
  })

  it('has exactly one h1', () => {
    const { container } = renderPriya()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('ships every limit, including the ones that cost money', () => {
    renderPriya()
    for (const limit of PRIYA.limits.items) {
      expect(
        screen.getByRole('heading', { name: limit.title }),
        `limit ${limit.id}`,
      ).toBeInTheDocument()
    }
    // The two that a weaker page would cut.
    expect(screen.getByRole('heading', { name: /Haryanvi/ })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /under 100 leads a month/i }),
    ).toBeInTheDocument()
  })

  it('marks every devanagari transcript line with lang="hi"', () => {
    const { container } = renderPriya()
    const devanagari = /[ऀ-ॿ]/

    for (const turn of PRIYA.call.turns) {
      const node = Array.from(container.querySelectorAll('dd')).find(
        (el) => el.textContent === turn.line,
      )
      expect(node, `turn ${turn.id} rendered`).toBeTruthy()
      if (devanagari.test(turn.line)) {
        expect(node, `turn ${turn.id} lang`).toHaveAttribute('lang', 'hi')
      }
    }
  })

  it('renders no audio player while there is no real recording', () => {
    const { container } = renderPriya()
    expect(PRIYA.call.recordingUrl).toBeNull()
    expect(container.querySelector('audio')).toBeNull()
  })

  it('labels the lead card as a sample', () => {
    renderPriya()
    expect(screen.getAllByText(PRIYA.leadCard.card.caption).length).toBeGreaterThan(0)
  })

  it('renders both race lanes and the proverb in hindi', () => {
    const { container } = renderPriya()
    for (const lane of PRIYA.race.lanes) {
      expect(screen.getByText(lane.label)).toBeInTheDocument()
    }
    const proverb = screen.getByText(PRIYA.race.proverb)
    expect(proverb).toHaveAttribute('lang', 'hi')
    expect(container).toBeTruthy()
  })

  it('carries no unmeasured market-audit statistics', () => {
    const { container } = renderPriya()
    // These were published once as a first-person measurement and were never
    // run. They must never come back. See the spec's honesty constraints.
    expect(container.textContent).not.toMatch(/31 brokerages/i)
    expect(container.textContent).not.toMatch(/14h 20m/i)
  })

  it('has no detectable axe violations', async () => {
    const { container } = renderPriya()
    const results = await axe.run(container, {
      // jsdom has no layout, so anything that needs geometry cannot be
      // evaluated here — those are covered by the manual pass, not this test.
      rules: { 'color-contrast': { enabled: false } },
    })
    const summary = results.violations.map(
      (v) => `${v.id}: ${v.nodes.length} node(s) — ${v.help}`,
    )
    expect(summary).toEqual([])
  }, 20000)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/Priya.test.tsx`
Expected: FAIL — `Failed to resolve import "./Priya"`.

- [ ] **Step 3: Write the page**

Create `src/pages/Priya.tsx`:

```tsx
import { ProductHero } from '@/components/blocks/ProductHero'
import { StepList } from '@/components/blocks/StepList'
import { TimeRace } from '@/components/blocks/TimeRace'
import { PillarRow } from '@/components/blocks/PillarRow'
import { CallTranscript } from '@/components/blocks/CallTranscript'
import { LeadCard } from '@/components/blocks/LeadCard'
import { LeadMath } from '@/components/blocks/LeadMath'
import { DeadLeadOffer } from '@/components/blocks/DeadLeadOffer'
import { ComparisonTable } from '@/components/blocks/ComparisonTable'
import { PricingTiers } from '@/components/blocks/PricingTiers'
import { FAQ } from '@/components/blocks/FAQ'
import { CtaBand } from '@/components/blocks/CtaBand'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import { PRIYA } from '@/content/priya'
import { useSeo } from '@/lib/useSeo'

/**
 * The flagship product page.
 *
 * Fifteen blocks, and the order is the argument: he measures his own gap
 * (Sunday test) before he is shown ours (race), hears the thing work
 * (transcript) before he is told how (mechanism), and reads what it does NOT
 * do (limits) before he is offered a price. Reordering this weakens it.
 */
export default function Priya() {
  useSeo({ ...PRIYA.seo, path: '/priya' })

  return (
    <>
      <ProductHero hero={PRIYA.hero} />

      <StepList
        id="sunday-test"
        eyebrow={PRIYA.sundayTest.eyebrow}
        title={PRIYA.sundayTest.title}
        sub={PRIYA.sundayTest.sub}
        steps={PRIYA.sundayTest.steps}
        pullQuote={PRIYA.sundayTest.pullQuote}
      />

      <TimeRace race={PRIYA.race} />
      <PillarRow id="cause" pillars={PRIYA.cause} />
      <CallTranscript call={PRIYA.call} />

      <StepList
        id="mechanism"
        eyebrow={PRIYA.mechanism.eyebrow}
        title={PRIYA.mechanism.title}
        sub={PRIYA.mechanism.sub}
        steps={PRIYA.mechanism.steps}
      />
      <PillarRow
        id="mechanism-notes"
        columns={2}
        pillars={{ items: PRIYA.mechanism.notes }}
        divided={false}
      />

      <LeadCard leadCard={PRIYA.leadCard} />
      <PillarRow id="follow-up" pillars={PRIYA.followUp} />
      <LeadMath math={PRIYA.math} />
      <PillarRow id="limits" pillars={PRIYA.limits} />

      <DeadLeadOffer offer={PRIYA.deadLead} />

      <ComparisonTable comparison={PRIYA.comparison} id="compare" />

      <Section id="plan" divided aria-labelledby="plan-title">
        <Container>
          <Reveal>
            <div className="max-w-[42rem]">
              <Eyebrow className="mb-5">{PRIYA.plan.eyebrow}</Eyebrow>
              <Heading level={2} size="xl" id="plan-title" className="mb-4">
                {PRIYA.plan.title}
              </Heading>
              <Text size="lg">{PRIYA.plan.sub}</Text>
            </div>
          </Reveal>
        </Container>
        <PricingTiers tiers={[PRIYA.plan.tier]} guarantee={PRIYA.plan.guarantee} />
        <Container>
          <Reveal>
            <p className="mt-8 max-w-[42rem] text-[0.9375rem] leading-[1.65] text-[var(--text-2)]">
              {PRIYA.plan.disqualifier}
            </p>
          </Reveal>
        </Container>
      </Section>

      <PillarRow id="founding" columns={2} pillars={PRIYA.founding} />

      <FAQ title={PRIYA.faq.title} items={PRIYA.faq.items} />
      <CtaBand close={PRIYA.close} />
    </>
  )
}
```

Note: `PricingTiers` renders its own `<Section id="plans">`. Nesting a `<section>` inside a `<section>` is valid HTML and axe accepts it; the outer one carries the heading and the anchor the CTAs target.

- [ ] **Step 4: Add the route**

In `src/App.tsx`, add the import beside the other eager page imports:

```tsx
import Priya from '@/pages/Priya'
```

and the route directly after the `/` route:

```tsx
          <Route path="/priya" element={<Priya />} />
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run src/pages/Priya.test.tsx`
Expected: PASS, all 9 cases.

If axe reports `heading-order`, the fix is the `size` prop on a `Heading`, never the `level` — visual size and semantic level are decoupled on purpose in this design system.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Priya.tsx src/pages/Priya.test.tsx src/App.tsx
git commit -m "feat: add the Priya product page at /priya"
```

---

## Task 13: The homepage product band

**Files:**
- Create: `src/components/blocks/HeroProductBand.tsx`
- Modify: `src/pages/Home.tsx`
- Modify: `src/pages/Home.test.tsx`

**Interfaces:**
- Consumes: `HeroProductContent` (Task 2), `PRIYA_HOME` (Task 3), `WaitClock` (Task 4), `LeadCardFigure` (Task 9).
- Produces: `HeroProductBand({ product }: { product: HeroProductContent })`.

- [ ] **Step 1: Write the failing test**

Append to the `describe('Home', ...)` block in `src/pages/Home.test.tsx`:

```tsx
  it('features the flagship product and links to its page', () => {
    renderHome()
    expect(screen.getByText(PRIYA_HOME.sub)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: new RegExp(PRIYA_HOME.cta.label, 'i') }),
    ).toHaveAttribute('href', '/priya')
  })

  it('labels the homepage lead card as a sample too', () => {
    renderHome()
    expect(screen.getAllByText(PRIYA_HOME.card.caption).length).toBeGreaterThan(0)
  })
```

Add the import at the top of that file:

```tsx
import { PRIYA_HOME } from '@/content/priya'
```

Check the existing file for the render helper's name — if it is not `renderHome`, use whatever it defines.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/Home.test.tsx`
Expected: FAIL — unable to find the text, because the band is not rendered yet.

- [ ] **Step 3: Write the band**

Create `src/components/blocks/HeroProductBand.tsx`:

```tsx
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { WaitClock } from '@/components/ui/WaitClock'
import { LeadCardFigure } from '@/components/blocks/LeadCard'
import type { HeroProductContent } from '@/content/types'

/**
 * The homepage's one product feature.
 *
 * It sits between the proof bar and the service grid on purpose: the grid
 * names eight categories the visitor has to take on faith, and this shows one
 * finished, running thing before he gets there.
 *
 * One link, no secondary action. The band's whole job is to move him to
 * /priya, and a second CTA here would split that.
 */
export function HeroProductBand({ product }: { product: HeroProductContent }) {
  return (
    <Section id="flagship" divided aria-labelledby="flagship-title">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow className="mb-5">{product.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal index={1}>
              <Heading level={2} size="xl" id="flagship-title" className="mb-5">
                {product.title.lead}{' '}
                <Emphasis>{product.title.emphasis}</Emphasis>
                {product.title.trail}
              </Heading>
            </Reveal>

            <Reveal index={2}>
              <Text size="lg" className="max-w-[34rem]">
                {product.sub}
              </Text>
            </Reveal>

            <Reveal index={3}>
              <ul className="mt-7 flex flex-wrap gap-2">
                {product.points.map((point) => (
                  <li
                    key={point}
                    className="rounded-[var(--r-full)] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.04em] text-[var(--text-2)]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal index={4}>
              <div className="mt-9">
                <Button
                  href={product.cta.href}
                  size="lg"
                  trailing={<ArrowRight size={17} />}
                >
                  {product.cta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal index={2}>
            <div className="flex flex-col gap-6">
              <WaitClock
                label={product.clock.label}
                sinceHour={product.clock.sinceHour}
                sinceMinute={product.clock.sinceMinute}
                size="sm"
              />
              <LeadCardFigure card={product.card} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 4: Wire it into the homepage**

In `src/pages/Home.tsx`, add the imports:

```tsx
import { HeroProductBand } from '@/components/blocks/HeroProductBand'
import { PRIYA_HOME } from '@/content/priya'
```

and insert the band directly after `<TestimonialRail />` and before `<BookingSection ... />`:

```tsx
      {/*
        The flagship, one scroll in. The service grid below names eight
        categories the visitor has to take on faith; this shows one finished
        thing first, with a clock that is actually running.
      */}
      <HeroProductBand product={PRIYA_HOME} />
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run src/pages/Home.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/blocks/HeroProductBand.tsx src/pages/Home.tsx src/pages/Home.test.tsx
git commit -m "feat: feature Priya on the homepage"
```

---

## Task 14: Content integrity, the pricing cross-link, and the docs

**Files:**
- Modify: `src/content/content.test.ts`
- Modify: `src/content/pricing.ts`
- Modify: `CONTENT-SWAP.md`

**Interfaces:**
- Consumes: `PRIYA`, `PRIYA_HOME`.
- Produces: nothing new — this task closes the loop.

- [ ] **Step 1: Write the failing tests**

Add the import at the top of `src/content/content.test.ts`:

```ts
import { PRIYA, PRIYA_HOME } from './priya'
```

and append this describe block at the end of the file:

```ts
/* --- Phase 5 ------------------------------------------------------------- */

describe('priya content', () => {
  it('resolves every cta', () => {
    const hrefs = [
      PRIYA.hero.cta!.primary.href,
      PRIYA.hero.cta!.secondary.href,
      PRIYA.deadLead.cta.href,
      PRIYA.plan.tier.cta.href,
      PRIYA.plan.tier.secondaryCta!.href,
      PRIYA.close.cta.primary.href,
      PRIYA.close.cta.secondary.href,
      PRIYA_HOME.cta.href,
    ]
    for (const href of hrefs) {
      expect(resolves(href), `cta ${href}`).toBe(true)
    }
  })

  it('has no duplicate ids anywhere on the page', () => {
    for (const ids of [
      PRIYA.cause.items.map((p) => p.id),
      PRIYA.followUp.items.map((p) => p.id),
      PRIYA.limits.items.map((p) => p.id),
      PRIYA.founding.items.map((p) => p.id),
      PRIYA.mechanism.notes.map((p) => p.id),
      PRIYA.deadLead.outcomes.map((p) => p.id),
      PRIYA.call.turns.map((t) => t.id),
      PRIYA.faq.items.map((f) => f.id),
      PRIYA.comparison.rows.map((r) => r.id),
      PRIYA.race.lanes.map((l) => l.id),
    ]) {
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('gives every comparison row one value per column', () => {
    for (const row of PRIYA.comparison.rows) {
      expect(row.values, `row ${row.id}`).toHaveLength(
        PRIYA.comparison.columns.length,
      )
    }
  })

  it('answers every faq question it asks', () => {
    for (const item of PRIYA.faq.items) {
      expect(item.question.endsWith('?'), `${item.id} is a question`).toBe(true)
      expect(item.answer.length, `${item.id} answer`).toBeGreaterThan(40)
    }
  })

  it('runs both race lanes to the same number of beats', () => {
    const [slow, fast] = PRIYA.race.lanes
    expect(fast.steps).toHaveLength(slow.steps.length)
  })

  it('tags every devanagari line as hindi and leaves hinglish untagged', () => {
    const devanagari = /[ऀ-ॿ]/
    for (const turn of PRIYA.call.turns) {
      if (devanagari.test(turn.line)) {
        expect(turn.lang, `turn ${turn.id}`).toBe('hi')
      } else {
        expect(turn.lang, `turn ${turn.id}`).toBeUndefined()
      }
    }
  })

  it('publishes no unmeasured market-audit statistics', () => {
    // A previous version of this pitch published "31 brokerages tested,
    // median callback 14h 20m, 9 never called" as a first-person measurement
    // with a stated methodology. It was never run. It must never come back.
    const blob = JSON.stringify(PRIYA)
    for (const claim of ['31 brokerages', '14h 20m', 'never called']) {
      expect(blob, `unmeasured claim: ${claim}`).not.toContain(claim)
    }
  })

  it('ships no call recording until a real one exists', () => {
    expect(PRIYA.call.recordingUrl).toBeNull()
  })

  it('keeps the limits that cost money', () => {
    const ids = PRIYA.limits.items.map((l) => l.id)
    expect(ids).toContain('accents')
    expect(ids).toContain('volume')
    expect(PRIYA.limits.items.length).toBeGreaterThanOrEqual(6)
  })

  it('claims no testimonial, rating or client count', () => {
    const blob = JSON.stringify(PRIYA).toLowerCase()
    for (const word of ['trustpilot', 'testimonial', 'clients trust', 'rated']) {
      expect(blob, `unearned proof: ${word}`).not.toContain(word)
    }
  })

  it('shares one lead card between the page and the homepage band', () => {
    // Two cards drifting apart is exactly the defect the content-module rule
    // exists to prevent.
    expect(PRIYA_HOME.card).toBe(PRIYA.leadCard.card)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail, then pass**

Run: `npx vitest run src/content/content.test.ts`
Expected: PASS immediately if Task 3's content is correct. If any case fails, **fix the content, not the test** — each of these encodes a constraint from the spec.

- [ ] **Step 3: Cross-link the pricing page**

In `src/content/pricing.ts`, find the `resource` object and repoint it at the flagship:

```ts
  resource: {
    eyebrow: 'Flagship product',
    title: 'Looking for Priya?',
    body: 'Our lead-response product is priced separately and plainly: ₹30,000 one-time setup, then ₹12,000 a month with 500 leads included. Every enquiry called inside sixty seconds, in Hindi, at any hour.',
    cta: { label: 'See the Priya plan', href: '/priya' },
  },
```

The agency tiers above it keep their placeholder `$500 – $7,000+` band — rewriting those is out of scope for this work and stays flagged in `CONTENT-SWAP.md`.

- [ ] **Step 4: Update `CONTENT-SWAP.md`**

Tick every box in the "Do this first" section (they are all done as of Task 1), except `BRAND.calendly` and `BRAND.socials`, which stay unticked with a note that no real values exist yet.

Then add this section directly after "Do this first":

```markdown
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
```

Finally, in the "Ratings and reviews" section, add a line noting that these
borrowed proof elements now sit one scroll above a real product on the
homepage, which raises the priority of removing them.

- [ ] **Step 5: Full verification**

Run each of these and confirm the expected result:

```bash
npm test
```
Expected: all suites pass.

```bash
npm run typecheck
```
Expected: no output, exit 0.

```bash
git grep -In -i -E 'placeholder|example\.(com|us)|autoploy' -- src/content/priya.ts
```
Expected: only the file's own header comment saying it is NOT placeholder.

```bash
git grep -In -E '85228105510|crewmind\.example|Hong Kong|Queens Road' -- src/
```
Expected: no output.

```bash
npm run build
```
Expected: builds clean.

- [ ] **Step 6: Manual pass — both themes, both widths**

Run `npm run dev` and open `/priya` and `/`.

Confirm, in **dark** and then in **light** (toggle in the nav, do not just trust your OS setting):

- The wait clock is ticking and its digits do not reflow as they change.
- Both race lanes are readable and the fast lane is the accented one.
- The transcript's AI and customer turns are distinguishable with colour removed.
- The lead card reads as a card and its "Sample card" caption is visible.
- The arithmetic recomputes as you type and never flashes `NaN`.
- The dead-lead band is the only lifted surface on the page.
- Exactly two amber buttons above the fold across the whole page — the hero primary and the dead-lead CTA — and none anywhere else that is not `variant="primary"`.
- At 390px: nothing scrolls sideways, the comparison table scrolls inside its own box, and the hero clock sits below the copy rather than beside it.

- [ ] **Step 7: Commit**

```bash
git add src/content/content.test.ts src/content/pricing.ts CONTENT-SWAP.md
git commit -m "test: add Priya content integrity checks and cross-link pricing"
```

---

## Self-Review

**Spec coverage:**

| Spec section | Task |
|---|---|
| §2 naming, routing, nav, `STATIC_ROUTES` | 1, 12 |
| §3.1 fifteen-block page composition | 12 |
| §3.2 homepage band | 13 |
| §3.3 `StepList.pullQuote`, `PillarRow.columns` | 5 |
| §4.1 `WaitClock` | 4 |
| §4.2 `TimeRace` | 7 |
| §4.3 `CallTranscript` | 8 |
| §4.4 `LeadCard` | 9 |
| §4.5 `LeadMath` | 10 |
| §4.6 `DeadLeadOffer` | 11 |
| §4.7 `HeroProductBand` | 13 |
| §5 content module and types | 2, 3 |
| §5.2 Hindi retained in exactly four places | 3 (transcript, proverb, card quote, FAQ), asserted in 14 |
| §6 honesty constraints | 3, asserted in 12 and 14 |
| §7 brand facts and the legal footer line | 1 |
| §8 testing | 1, 4, 10, 12, 13, 14 |
| §9 out of scope | respected — no API route, agency tiers untouched, ProofBar untouched |

**Placeholder scan:** No TBDs. Every code step carries the actual code. The only intentionally deferred value is `PRIYA.call.recordingUrl = null`, which is a spec requirement (§6.2), not a placeholder.

**Type consistency:** `WaitClock` takes `{ label, sinceHour, sinceMinute, foot?, size?, className? }` in Task 4 and is called that way in Tasks 6 and 13. `LeadCardFigure({ card, className })` is defined in Task 9 and consumed in Task 13. `PillarRow` takes `pillars` (not `pillarSet`) throughout. `PRIYA_HOME.card` is a reference to `PRIYA.leadCard.card`, and Task 14 asserts identity with `toBe`, which holds only because Task 3 assigns the reference rather than duplicating the object.

**One judgement call to flag at execution time:** Task 12 renders `PillarRow` twice in a row for `mechanism` and `mechanism-notes`. If that reads as two disconnected slabs in the manual pass of Step 6, the fix is to drop `divided={false}` on the notes row so it separates cleanly — not to invent a new component.

---

## Deviations found during execution

Three things this plan did not anticipate. All three were real defects, fixed
in the task that surfaced them.

1. **`WaitClock`'s `live` flag had to go (Task 4).** The ported component
   flipped a state flag on mount to swap the "00" placeholder for the ticking
   value. That state change re-renders the subtree *after* the effect has
   written the digits through refs, blanking the clock for a full second on
   every mount. The flag guarded SSR hydration mismatch in the Next.js
   original; this site is client-rendered and does not need it. The "00" is
   now static initial content that the effect overwrites, and because nothing
   holds state React never clobbers it.

2. **`StepList`'s badge was sized for ordinals (Task 5).** A fixed
   `h-[2.875rem] w-[2.875rem]` circle with an absolutely-positioned connector
   at `left-[1.4375rem]`. The mechanism section passes clock readings —
   `<10s`, `60–120s` — which overflow it. The badge is now a pill
   (`min-w-[2.875rem] px-3 whitespace-nowrap`) and the connector sits in a
   centred flex column with the badge, so it tracks the badge's centre at any
   width. Existing call sites render identically.

3. **`PricingTiers` hardcoded a two-column grid (Task 12, found in the manual
   pass).** With the single Priya tier the card rendered in the left half with
   an empty column beside it, reading as a missing option rather than as the
   only one. The grid is now `lg:grid-cols-2` for two or more tiers and
   `mx-auto max-w-[34rem]` for one.

**One verification step could not be completed:** the 390px manual check.
`resize_window` had no effect in this environment — the browser window stayed
at 1678px across three attempts. Narrow-viewport safety was instead audited
statically: every grid in the new blocks is breakpoint-prefixed (so all
collapse to one column at mobile), and the only unprefixed fixed widths are
`w-[5.5rem]` on the lead-card term column and `w-[3.25rem]` on the race clock
column, both comfortably inside a 350px content area. **This still wants one
pass on a real phone before launch.**
