/* ---------------------------------------------------------------------------
   Content shapes. Every string shown on the site flows through one of these.
   Components accept these as props and never reach into content modules
   themselves (the one exception is templates/ServicePage).
--------------------------------------------------------------------------- */

export interface NavLink {
  label: string
  href: string
  /** Marks a route that is not built yet, so Nav can style it honestly. */
  pending?: boolean
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
