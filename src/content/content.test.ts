import { describe, expect, it } from 'vitest'
import { BRAND, FOOTER_LINKS, NAV_LINKS, PRIMARY_CTA } from './site'
import { RATINGS, TESTIMONIALS } from './testimonials'
import { HOME } from './home'
import { PRICING } from './pricing'
import { ABOUT } from './about'
import { ENTERPRISE } from './enterprise'

/* Routes the app actually serves. Keep in sync with App.tsx. */
const STATIC_ROUTES = new Set([
  '/',
  '/pricing',
  '/about',
  '/enterprise',
  '/services',
  '/past-projects',
  '/privacy',
  '/terms',
])

function resolves(href: string): boolean {
  if (href.startsWith('#') || /^(https?:|mailto:|tel:)/.test(href)) return true
  if (STATIC_ROUTES.has(href)) return true
  // Dynamic service detail route.
  return /^\/services\/[a-z0-9-]+$/.test(href)
}

describe('content integrity', () => {
  it('every nav link resolves to a route', () => {
    for (const link of NAV_LINKS) {
      expect(resolves(link.href), `nav link ${link.href}`).toBe(true)
    }
  })

  it('every footer link resolves to a route', () => {
    for (const link of FOOTER_LINKS) {
      expect(resolves(link.href), `footer link ${link.href}`).toBe(true)
    }
  })

  it('every homepage CTA resolves', () => {
    const hrefs = [
      PRIMARY_CTA.href,
      HOME.hero.cta.primary.href,
      HOME.hero.cta.secondary.href,
      HOME.close.cta.primary.href,
      HOME.close.cta.secondary.href,
      HOME.services.enterprise.cta.href,
      HOME.work.cta.href,
      ...HOME.work.items.map((i) => i.href),
      ...HOME.services.items.map((s) => `/services/${s.slug}`),
    ]
    for (const href of hrefs) {
      expect(resolves(href), `cta ${href}`).toBe(true)
    }
  })

  it('has no duplicate testimonial ids', () => {
    const ids = TESTIMONIALS.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has no duplicate case study ids', () => {
    const ids = HOME.work.items.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has no duplicate service slugs', () => {
    const slugs = HOME.services.items.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('uses url-safe service slugs', () => {
    for (const s of HOME.services.items) {
      expect(s.slug, `slug ${s.slug}`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('gives every testimonial a body and initials', () => {
    for (const t of TESTIMONIALS) {
      expect(t.body.length, `${t.id} body`).toBeGreaterThan(0)
      expect(t.initials.length, `${t.id} initials`).toBeGreaterThan(0)
    }
  })

  it('keeps every rating within 0-5', () => {
    for (const r of RATINGS) {
      const n = Number(r.score)
      expect(Number.isNaN(n), `${r.id} is numeric`).toBe(false)
      expect(n).toBeGreaterThanOrEqual(0)
      expect(n).toBeLessThanOrEqual(5)
    }
  })

  it('builds a valid whatsapp deep link', () => {
    const url = new URL(BRAND.whatsapp('hello there'))
    expect(url.hostname).toBe('wa.me')
    expect(url.searchParams.get('text')).toBe('hello there')
  })

  it('gives every process step a visual', () => {
    expect(HOME.process.steps.length).toBeGreaterThan(0)
    for (const step of HOME.process.steps) {
      expect(step.visual.kind, `step ${step.step}`).toBeTruthy()
    }
  })

  it('emphasises exactly one phrase in the hero headline', () => {
    expect(HOME.hero.headline.emphasis.trim().length).toBeGreaterThan(0)
  })
})

/* --- Phase 2 ------------------------------------------------------------- */

describe('pricing content', () => {
  it('resolves every cta', () => {
    const hrefs = [
      ...PRICING.tiers.flatMap((t) => [
        t.cta.href,
        ...(t.secondaryCta ? [t.secondaryCta.href] : []),
      ]),
      PRICING.resource.cta.href,
      PRICING.proof.cta.href,
      PRICING.close.cta.primary.href,
      PRICING.close.cta.secondary.href,
    ]
    for (const href of hrefs) {
      expect(resolves(href), `cta ${href}`).toBe(true)
    }
  })

  it('features exactly one tier', () => {
    expect(PRICING.tiers.filter((t) => t.featured)).toHaveLength(1)
  })

  it('has no duplicate tier ids', () => {
    const ids = PRICING.tiers.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('gives every comparison row one value per column', () => {
    for (const row of PRICING.comparison.rows) {
      expect(row.values, `row ${row.id}`).toHaveLength(PRICING.comparison.columns.length)
    }
  })

  it('has no duplicate comparison row ids', () => {
    const ids = PRICING.comparison.rows.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('names the same two engagements in the tiers and the table', () => {
    // The table is a restructure of the tiers, not a second source of truth.
    expect(PRICING.comparison.columns).toEqual(PRICING.tiers.map((t) => t.title))
  })
})

describe('about content', () => {
  it('has no duplicate team member ids', () => {
    const ids = ABOUT.team.members.map((m) => m.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('gives every member initials for the avatar fallback', () => {
    for (const m of ABOUT.team.members) {
      expect(m.initials.length, `${m.id} initials`).toBeGreaterThan(0)
      expect(m.bio.length, `${m.id} bio`).toBeGreaterThan(0)
    }
  })

  it('resolves every close cta', () => {
    expect(resolves(ABOUT.close.cta.primary.href)).toBe(true)
    expect(resolves(ABOUT.close.cta.secondary.href)).toBe(true)
  })

  it('carries no real third-party team identities', () => {
    // The reference site names seven real people. Staging them as this
    // company's staff is not something to ship, even as placeholder copy.
    const REFERENCE_NAMES = [
      'Ty Chen',
      'Jaiden Lau',
      'Karan Patel',
      'Amiri Mouhab',
      'Nouman Ejaz',
      'Idan Lau',
    ]
    const blob = JSON.stringify(ABOUT)
    for (const name of REFERENCE_NAMES) {
      expect(blob, `reference name ${name}`).not.toContain(name)
    }
    for (const m of ABOUT.team.members) {
      expect(m.links, `${m.id} links`).toHaveLength(0)
    }
  })
})

describe('enterprise content', () => {
  it('has no duplicate capability, case or faq ids', () => {
    for (const ids of [
      ENTERPRISE.capabilities.items.map((c) => c.id),
      ENTERPRISE.cases.items.map((c) => c.id),
      ENTERPRISE.faq.items.map((f) => f.id),
      ENTERPRISE.why.items.map((p) => p.id),
      ENTERPRISE.ownership.items.map((p) => p.id),
    ]) {
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('answers every faq question', () => {
    expect(ENTERPRISE.faq.items.length).toBeGreaterThan(0)
    for (const item of ENTERPRISE.faq.items) {
      expect(item.question.endsWith('?'), `${item.id} is a question`).toBe(true)
      expect(item.answer.length, `${item.id} answer`).toBeGreaterThan(40)
    }
  })

  it('numbers its process steps in order', () => {
    const steps = ENTERPRISE.process.steps.map((s) => Number(s.step))
    expect(steps).toEqual(steps.map((_, i) => i + 1))
  })

  it('gives every capability a stack', () => {
    for (const c of ENTERPRISE.capabilities.items) {
      expect(c.stack.length, `${c.id} stack`).toBeGreaterThan(0)
    }
  })

  it('resolves every cta', () => {
    const hrefs = [
      ENTERPRISE.hero.cta!.primary.href,
      ENTERPRISE.hero.cta!.secondary.href,
      ENTERPRISE.close.cta.primary.href,
      ENTERPRISE.close.cta.secondary.href,
      ...ENTERPRISE.cases.items.flatMap((c) => (c.link ? [c.link.href] : [])),
    ]
    for (const href of hrefs) {
      expect(resolves(href), `cta ${href}`).toBe(true)
    }
  })

  it('does not claim a named third-party client', () => {
    const blob = JSON.stringify(ENTERPRISE)
    expect(blob).not.toContain('Saludsa')
  })
})
