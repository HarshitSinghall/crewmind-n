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
