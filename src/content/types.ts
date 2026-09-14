/* ---------------------------------------------------------------------------
   Content shapes. Every string shown on the site flows through one of these.
   Components accept these as props and never reach into content modules
   themselves (the one exception is templates/ServicePage).
--------------------------------------------------------------------------- */

export interface NavLink {
  label: string
  href: string
}

export interface Brand {
  name: string
  url: string
  tagline: string
  email: string
  phone: string
  phoneHref: string
  address: string[]
  calendly: string
  whatsapp: (message?: string) => string
  socials: { label: string; href: string }[]
  sisterSite?: { label: string; description: string; href: string }
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
}

export interface Testimonial {
  id: string
  name: string
  /** Optional short role/company line. */
  meta?: string
  date: string
  /** Optional bold lead-in shown above the body. */
  headline?: string
  body: string
  /** Two-letter fallback shown when there is no avatar image. */
  initials: string
  avatar?: string
}

export interface RatingSource {
  id: string
  platform: string
  score: string
  href: string
}

export interface ServiceSummary {
  slug: string
  title: string
  description: string
  /** Short capability bullets shown on cards. */
  features: string[]
  badge?: string
}

export interface ProcessStep {
  step: string
  title: string
  body: string
  visual: ProcessVisual
}

export type ProcessVisual =
  | { kind: 'timeSaved'; rows: { label: string; value: string }[]; total: string }
  | { kind: 'flow'; from: string; nodes: string[]; to: string }
  | { kind: 'schedule'; items: { label: string; when: string }[] }
  | { kind: 'stats'; items: { value: string; label: string }[] }

export interface CaseStudyCard {
  id: string
  title: string
  impact: string
  tags: string[]
  href: string
}

export interface CtaPair {
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
}

export interface HomeContent {
  seo: { title: string; description: string }
  hero: {
    eyebrow: string
    avatars: { name: string; initials: string }[]
    headline: { lead: string; emphasis: string; trail: string }
    sub: string
    videoPrompt: string
    video: { poster?: string; duration: string; label: string }
    cta: CtaPair
  }
  proof: { note: string; ratings: RatingSource[] }
  booking: {
    prompt: string
    title: string
    sub: string
  }
  services: {
    eyebrow: string
    title: string
    sub: string
    items: ServiceSummary[]
    enterprise: {
      eyebrow: string
      badge: string
      title: string
      body: string
      tags: string[]
      cta: { label: string; href: string }
    }
  }
  positioning: {
    eyebrow: string
    title: { lead: string; emphasis: string }
    sub: string
  }
  process: { title: string; steps: ProcessStep[] }
  work: { title: string; items: CaseStudyCard[]; cta: { label: string; href: string } }
  close: {
    eyebrow: string
    title: string
    sub: string
    cta: CtaPair
  }
}

/* ---------------------------------------------------------------------------
   Phase 2 — shared page shapes.
--------------------------------------------------------------------------- */

/** A headline split so exactly one phrase can carry the serif emphasis. */
export interface Headline {
  lead: string
  emphasis: string
  trail?: string
}

/** The header every non-home page opens with. */
export interface PageHero {
  eyebrow: string
  headline: Headline
  sub: string
  cta?: CtaPair
  /** Short reassurance chips under the CTAs. */
  assurances?: string[]
}

/** Mission/vision/approach, why-custom, ownership — the same 2-3 up shape. */
export interface Pillar {
  id: string
  title: string
  body: string
}

export interface PillarSet {
  eyebrow?: string
  title?: string
  sub?: string
  items: Pillar[]
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface NumberedStep {
  step: string
  title: string
  body: string
}

/* --- Pricing -------------------------------------------------------------- */

export interface PricingTier {
  id: string
  badge: string
  title: string
  body: string
  /** Omitted on the tier that is scoped on a call rather than listed. */
  price?: { label: string; value: string; note: string }
  features: string[]
  /** Trailing qualifier shown under the feature list. */
  note?: string
  cta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /** The one tier that carries the amber action. */
  featured?: boolean
}

/**
 * Row-per-attribute so the table transposes cleanly to stacked cards on
 * narrow screens. `values` is index-aligned to `columns`.
 */
export interface ComparisonRow {
  id: string
  label: string
  values: string[]
}

export interface ComparisonSpec {
  eyebrow: string
  title: string
  sub: string
  columns: string[]
  rows: ComparisonRow[]
  note?: string
}

export interface PricingContent {
  seo: { title: string; description: string }
  hero: PageHero
  tiers: PricingTier[]
  guarantee: { title: string; body: string }
  comparison: ComparisonSpec
  resource: {
    eyebrow: string
    title: string
    body: string
    cta: { label: string; href: string }
  }
  proof: { title: string; sub: string; cta: { label: string; href: string } }
  close: { eyebrow: string; title: string; sub: string; cta: CtaPair }
}

/* --- About ---------------------------------------------------------------- */

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  initials: string
  avatar?: string
  links: { label: string; href: string }[]
}

export interface AboutContent {
  seo: { title: string; description: string }
  hero: PageHero
  team: { title: string; sub: string; note: string; members: TeamMember[] }
  story: { title: string; paragraphs: string[] }
  pillars: PillarSet
  close: { eyebrow: string; title: string; sub: string; cta: CtaPair }
}

/* --- Enterprise ----------------------------------------------------------- */

export interface Capability {
  id: string
  title: string
  body: string
  stack: string[]
}

export interface EnterpriseCaseStudy {
  id: string
  meta: string
  title: string
  stackLine: string
  metric: { value: string; label: string }
  challenge: string
  solution: string
  tags: string[]
  link?: { label: string; href: string }
}

export interface EnterpriseContent {
  seo: { title: string; description: string }
  hero: PageHero
  why: PillarSet
  capabilities: {
    eyebrow: string
    title: string
    sub: string
    items: Capability[]
  }
  stack: {
    eyebrow: string
    title: string
    sub: string
    items: string[]
    note: string
  }
  process: {
    eyebrow: string
    title: string
    sub: string
    steps: NumberedStep[]
  }
  cases: {
    eyebrow: string
    title: string
    sub: string
    items: EnterpriseCaseStudy[]
  }
  ownership: PillarSet
  faq: { title: string; items: FaqItem[] }
  close: { eyebrow: string; title: string; sub: string; cta: CtaPair }
}

/* ---------------------------------------------------------------------------
   Phase 3 — services and the project catalogue.
--------------------------------------------------------------------------- */

/**
 * One block on a service detail page. Eight pages share a single template, so
 * the shape of a page is data: reorder the array and the page reorders.
 *
 * Adding a `kind` means adding one case to ServicePage's switch — the compiler
 * enforces that, which is the whole reason this is a discriminated union
 * rather than a bag of optional fields.
 */
export type ServiceSection =
  | {
      kind: 'pillars'
      id: string
      eyebrow?: string
      title: string
      sub?: string
      items: Pillar[]
    }
  | {
      kind: 'checklist'
      id: string
      eyebrow?: string
      title: string
      sub?: string
      items: string[]
    }
  | {
      kind: 'audience'
      id: string
      eyebrow?: string
      title: string
      sub?: string
      items: string[]
    }
  | {
      kind: 'steps'
      id: string
      eyebrow?: string
      title: string
      sub?: string
      steps: NumberedStep[]
    }
  | {
      kind: 'stats'
      id: string
      eyebrow?: string
      title: string
      sub?: string
      items: { value: string; label: string; body?: string }[]
    }
  | { kind: 'comparison'; id: string; spec: ComparisonSpec }
  | { kind: 'faq'; id: string; title: string; items: FaqItem[] }

export interface ServiceContent {
  slug: string
  /** Card + nav title. Mirrors the summary shown on the homepage grid. */
  title: string
  description: string
  features: string[]
  badge?: string
  seo: { title: string; description: string }
  hero: PageHero
  /**
   * Project category this service maps to. Drives the "see this work"
   * link into /past-projects?category=… and is asserted to exist.
   */
  category: string
  sections: ServiceSection[]
  close: { eyebrow: string; title: string; sub: string; cta: CtaPair }
}

export interface ProjectCategory {
  id: string
  label: string
}

export interface ProjectCase {
  id: string
  title: string
  /** Honest context line, e.g. "Support workflow blueprint". */
  client: string
  /** Delivery status, never an invented recency claim. */
  when: string
  impact: string
  /** Must match a ProjectCategory id. */
  category: string
  tags: string[]
  challenge: string
  solution: string
  /** Present only for an openly published third-party reference case. */
  source?: { label: string; href: string }
}

export interface ProjectsContent {
  seo: { title: string; description: string }
  hero: PageHero
  filterLabel: string
  allLabel: string
  emptyMessage: string
  close: { eyebrow: string; title: string; sub: string; cta: CtaPair }
}

export interface ServicesIndexContent {
  seo: { title: string; description: string }
  hero: PageHero
  close: { eyebrow: string; title: string; sub: string; cta: CtaPair }
}

/* ---------------------------------------------------------------------------
   Phase 4 — the automation catalogue.

   These are the seven automations the market actually asks for by name. They
   are NOT a ninth service: each one maps onto an existing service slug, and
   exists to answer the question a service page cannot — "what does the thing
   do, step by step, when it runs?"
--------------------------------------------------------------------------- */

/** Icon key, resolved to a component through a map in AutomationShowcase. */
export type AutomationIcon =
  | 'phone'
  | 'send'
  | 'inbox'
  | 'support'
  | 'document'
  | 'calendar'
  | 'content'

export interface AutomationStep {
  /** Verb-led node label. Kept under ~28 chars so nodes never wrap twice. */
  label: string
  /** One line on what the model is actually doing at this step. */
  detail: string
}

export interface Automation {
  id: string
  /** Ordinal shown in the rail — '01'…'07'. Display only. */
  index: string
  name: string
  /** One-line promise, shown under the name in the rail. */
  tagline: string
  icon: AutomationIcon
  /** The event that starts a run. Rendered as the first node in the canvas. */
  trigger: string
  /** The pipeline. Three to five steps — more than that stops reading. */
  steps: AutomationStep[]
  /** What lands when the run finishes. Rendered as the terminal node. */
  outcome: string
  /**
   * The headline number. `value` counts up from zero when the panel opens,
   * so it must be a plain integer — the unit goes in `suffix`.
   */
  metric: { value: number; suffix: string; label: string }
  /** The manual reality this replaces. */
  before: string
  /** The same job, once this is running. */
  after: string
  /** Tools it plugs into. Chips only — no logos, no partnership claims. */
  stack: string[]
  /** Existing service slug this maps to. Asserted in content.test.ts. */
  service: string
}

/** The showcase block. Reused verbatim on the homepage with its own copy. */
export interface ShowcaseBlock {
  eyebrow: string
  title: Headline
  sub: string
  /** Sits under the canvas — the honest caveat about the numbers. */
  note: string
  /** Homepage only: the way through to the full catalogue. */
  cta?: { label: string; href: string }
}

export interface AutomationsContent {
  seo: { title: string; description: string }
  hero: PageHero
  showcase: ShowcaseBlock
  catalogue: { eyebrow: string; title: string; sub: string }
  close: { eyebrow: string; title: string; sub: string; cta: CtaPair }
}

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

export interface DemoCallSpec {
  eyebrow: string
  title: string
  sub: string
  steps: { title: string; body: string }[]
  fields: {
    name: { label: string; placeholder: string }
    phone: { label: string; placeholder: string }
    locality: { label: string; placeholder: string }
    propertyInterest: { label: string; placeholder: string }
  }
  submitLabel: string
  submittingLabel: string
  whatsappLabel: string
  privacy: string
  consentLabel: string
  success: { title: string; body: string; rescueLabel: string }
  fallback: { title: string; body: string; rescueLabel: string }
  rescueMessage: string
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
  demo: DemoCallSpec
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
