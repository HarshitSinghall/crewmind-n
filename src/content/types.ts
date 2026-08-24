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
  /** De-identified client descriptor, e.g. "Chiropractic Clinic". */
  client: string
  when: string
  impact: string
  /** Must match a ProjectCategory id. */
  category: string
  tags: string[]
  challenge: string
  solution: string
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
