import { describe, expect, it } from 'vitest'
import { BRAND, FOOTER_LINKS, NAV_LINKS, PRIMARY_CTA } from './site'
import { RATINGS, TESTIMONIALS } from './testimonials'
import { HOME } from './home'
import { PRICING } from './pricing'
import { ABOUT } from './about'
import { ENTERPRISE } from './enterprise'
import { SERVICES, SERVICES_INDEX, getService } from './services'
import { CATEGORIES, PROJECTS, PROJECTS_PAGE } from './projects'
import { AUTOMATIONS, AUTOMATIONS_HOME, AUTOMATIONS_PAGE, getAutomation } from './automations'
import { PRIYA, PRIYA_HOME } from './priya'

/* Routes the app actually serves. Keep in sync with App.tsx. */
const STATIC_ROUTES = new Set([
  '/',
  '/priya',
  '/pricing',
  '/about',
  '/enterprise',
  '/services',
  '/automations',
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

  it('carries the real brand facts, not the reference placeholders', () => {
    expect(BRAND.url).toBe('https://crewmind.in')
    expect(BRAND.email).toBe('hello@crewmind.in')
    expect(BRAND.phoneHref).toBe('tel:+917017531825')
    expect(BRAND.address.join(' ')).toMatch(/Gurugram/)

    // calendly and socials are still placeholders on purpose — no real values
    // for them exist yet, and they stay listed in CONTENT-SWAP.md. Everything
    // a visitor could actually contact us on has to be real.
    const contactable = JSON.stringify({
      name: BRAND.name,
      url: BRAND.url,
      tagline: BRAND.tagline,
      email: BRAND.email,
      phone: BRAND.phone,
      phoneHref: BRAND.phoneHref,
      address: BRAND.address,
      legal: BRAND.legal,
    })
    expect(contactable).not.toMatch(/example|Hong Kong|85228105510/i)
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

/* --- Phase 3 ------------------------------------------------------------- */

describe('services content', () => {
  it('has no duplicate slugs and every slug is url-safe', () => {
    const slugs = SERVICES.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) {
      expect(slug, `slug ${slug}`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('resolves every slug through the lookup the route uses', () => {
    for (const service of SERVICES) {
      expect(getService(service.slug)?.title, service.slug).toBe(service.title)
    }
    expect(getService('not-a-real-service')).toBeUndefined()
    expect(getService(undefined)).toBeUndefined()
  })

  it('backs every homepage service card with a real detail page', () => {
    // The homepage grid links to /services/<slug>. If a slug drifts, that
    // link 404s and nothing else in the suite would notice.
    for (const summary of HOME.services.items) {
      expect(
        getService(summary.slug),
        `homepage links to /services/${summary.slug}, which has no content`,
      ).toBeDefined()
    }
  })

  it('points every service at a category that exists', () => {
    const ids = new Set(CATEGORIES.map((c) => c.id))
    for (const service of SERVICES) {
      expect(ids.has(service.category), `${service.slug} → ${service.category}`).toBe(true)
    }
  })

  it('gives every section a page-unique id', () => {
    for (const service of SERVICES) {
      const ids = service.sections.map((s) => s.id)
      expect(new Set(ids).size, `${service.slug} has duplicate section ids`).toBe(
        ids.length,
      )
    }
  })

  it('gives every service at least one section and a close', () => {
    for (const service of SERVICES) {
      expect(service.sections.length, `${service.slug} sections`).toBeGreaterThan(0)
      expect(service.close.cta.primary.label.length).toBeGreaterThan(0)
    }
  })

  it('resolves every service cta', () => {
    for (const service of SERVICES) {
      const hrefs = [
        service.close.cta.primary.href,
        service.close.cta.secondary.href,
        ...(service.hero.cta
          ? [service.hero.cta.primary.href, service.hero.cta.secondary.href]
          : []),
      ]
      for (const href of hrefs) {
        expect(resolves(href), `${service.slug}: ${href}`).toBe(true)
      }
    }
  })

  it('keeps every comparison section internally consistent', () => {
    for (const service of SERVICES) {
      for (const section of service.sections) {
        if (section.kind !== 'comparison') continue
        for (const row of section.spec.rows) {
          expect(row.values, `${service.slug}/${row.id}`).toHaveLength(
            section.spec.columns.length,
          )
        }
      }
    }
  })

  it('answers every service faq question', () => {
    for (const service of SERVICES) {
      for (const section of service.sections) {
        if (section.kind !== 'faq') continue
        for (const item of section.items) {
          expect(item.question.endsWith('?'), `${service.slug}/${item.id}`).toBe(true)
          expect(item.answer.length, `${service.slug}/${item.id}`).toBeGreaterThan(40)
        }
      }
    }
  })

  it('resolves the services index ctas', () => {
    expect(resolves(SERVICES_INDEX.close.cta.primary.href)).toBe(true)
    expect(resolves(SERVICES_INDEX.close.cta.secondary.href)).toBe(true)
  })
})

describe('projects content', () => {
  it('has no duplicate project ids', () => {
    const ids = PROJECTS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has no duplicate category ids', () => {
    const ids = CATEGORIES.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('puts every project in a category that exists', () => {
    const ids = new Set(CATEGORIES.map((c) => c.id))
    for (const project of PROJECTS) {
      expect(ids.has(project.category), `${project.id} → ${project.category}`).toBe(true)
    }
  })

  it('maps every category onto a real service slug', () => {
    // The filter chips deep-link from service pages, so a category with no
    // service is a link into nothing.
    const slugs = new Set(SERVICES.map((s) => s.slug))
    for (const category of CATEGORIES) {
      expect(slugs.has(category.id), `category ${category.id} has no service`).toBe(true)
    }
  })

  it('tolerates a category with no projects yet', () => {
    // GEO is the newest service and has no shipped case studies, so its
    // category is legitimately empty. The catalogue keeps the category —
    // it maps to a real service — and PastProjects hides the empty chip
    // rather than rendering a filter that leads to nothing. That behaviour
    // is asserted in PastProjects.test.tsx; this only records the fact.
    const empty = CATEGORIES.filter(
      (c) => !PROJECTS.some((p) => p.category === c.id),
    ).map((c) => c.id)

    expect(empty).toEqual(['geo'])
  })

  it('gives every project a challenge, a solution and an impact', () => {
    for (const project of PROJECTS) {
      expect(project.challenge.length, `${project.id} challenge`).toBeGreaterThan(40)
      expect(project.solution.length, `${project.id} solution`).toBeGreaterThan(40)
      expect(project.impact.length, `${project.id} impact`).toBeGreaterThan(0)
      expect(project.tags.length, `${project.id} tags`).toBeGreaterThan(0)
    }
  })

  it('resolves the projects page ctas', () => {
    expect(resolves(PROJECTS_PAGE.close.cta.primary.href)).toBe(true)
    expect(resolves(PROJECTS_PAGE.close.cta.secondary.href)).toBe(true)
  })

  it('carries no real third-party client identities', () => {
    const blob = JSON.stringify({ PROJECTS, SERVICES })
    for (const name of [
      'totsyscan',
      'La Truie',
      'latruie',
      'Prime1Sports',
      'prime1sports',
      'Zest Cleaning',
      'cleanwithzest',
      'SFG Capital',
      'TONGAL',
      'Dr. Bill',
      'Dr. Steve',
      'InjuryTrak',
      'Autoploy',
    ]) {
      expect(blob, `reference identity ${name}`).not.toContain(name)
    }
  })
})

describe('automations', () => {
  const slugs = new Set(SERVICES.map((s) => s.slug))

  it('ships exactly seven', () => {
    expect(AUTOMATIONS).toHaveLength(7)
  })

  it('has no duplicate ids', () => {
    const ids = AUTOMATIONS.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('numbers the rail 01 through 07 in order', () => {
    AUTOMATIONS.forEach((automation, i) => {
      expect(automation.index, automation.id).toBe(String(i + 1).padStart(2, '0'))
    })
  })

  it('maps every automation onto a real service', () => {
    for (const automation of AUTOMATIONS) {
      expect(slugs.has(automation.service), `${automation.id} -> ${automation.service}`).toBe(
        true,
      )
    }
  })

  it('gives every automation a pipeline the canvas can render', () => {
    for (const automation of AUTOMATIONS) {
      expect(automation.trigger, `${automation.id} trigger`).toBeTruthy()
      expect(automation.outcome, `${automation.id} outcome`).toBeTruthy()
      // Three is the floor for a pipeline to read as one; past five the
      // canvas stops fitting on a laptop without scrolling.
      expect(automation.steps.length, `${automation.id} steps`).toBeGreaterThanOrEqual(3)
      expect(automation.steps.length, `${automation.id} steps`).toBeLessThanOrEqual(5)
      expect(automation.stack.length, `${automation.id} stack`).toBeGreaterThan(0)
    }
  })

  it('keeps every metric an integer so the count-up can animate it', () => {
    for (const automation of AUTOMATIONS) {
      expect(Number.isInteger(automation.metric.value), `${automation.id} metric`).toBe(true)
      expect(automation.metric.value, `${automation.id} metric`).toBeGreaterThan(0)
    }
  })

  it('states the before and after as distinct claims', () => {
    for (const automation of AUTOMATIONS) {
      expect(automation.before, automation.id).not.toBe(automation.after)
    }
  })

  it('carries the caveat on both cuts of the showcase', () => {
    expect(AUTOMATIONS_PAGE.showcase.note).toBeTruthy()
    expect(AUTOMATIONS_HOME.note).toBeTruthy()
  })

  it('resolves every automations-page cta', () => {
    const hrefs = [
      AUTOMATIONS_PAGE.hero.cta!.primary.href,
      AUTOMATIONS_PAGE.hero.cta!.secondary.href,
      AUTOMATIONS_PAGE.close.cta.primary.href,
      AUTOMATIONS_PAGE.close.cta.secondary.href,
      AUTOMATIONS_HOME.cta!.href,
      ...AUTOMATIONS.map((a) => `/services/${a.service}`),
    ]
    for (const href of hrefs) {
      expect(resolves(href), `cta ${href}`).toBe(true)
    }
  })

  it('looks up by id and misses cleanly', () => {
    expect(getAutomation('ai-voice-receptionist')?.name).toBe('AI Voice Receptionist')
    expect(getAutomation('nope')).toBeUndefined()
    expect(getAutomation(undefined)).toBeUndefined()
  })
})

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
