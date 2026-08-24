import { describe, expect, it } from 'vitest'
import { BRAND, FOOTER_LINKS, NAV_LINKS, PRIMARY_CTA } from './site'
import { RATINGS, TESTIMONIALS } from './testimonials'
import { HOME } from './home'

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
