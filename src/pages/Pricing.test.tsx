import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axe from 'axe-core'
import Pricing from './Pricing'
import { PRICING } from '@/content/pricing'

function renderPricing() {
  return render(
    <MemoryRouter>
      <Pricing />
    </MemoryRouter>,
  )
}

describe('Pricing', () => {
  it('renders with its real content module', () => {
    renderPricing()
    expect(screen.getByText(PRICING.hero.sub)).toBeInTheDocument()
  })

  it('has exactly one h1', () => {
    const { container } = renderPricing()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('renders every tier with its features', () => {
    const { container } = renderPricing()
    // Scoped to the plans section: the comparison table deliberately restates
    // several of these same facts, so a page-wide query finds two of each.
    const plans = within(container.querySelector('#plans') as HTMLElement)

    for (const tier of PRICING.tiers) {
      expect(
        plans.getByRole('heading', { name: tier.title }),
        `tier ${tier.id}`,
      ).toBeInTheDocument()
      for (const feature of tier.features) {
        expect(plans.getByText(feature), `${tier.id}: ${feature}`).toBeInTheDocument()
      }
    }
  })

  it('shows the guarantee against the featured tier', () => {
    renderPricing()
    expect(screen.getByText(PRICING.guarantee.body)).toBeInTheDocument()
  })

  it('puts amber on at most one action per section', () => {
    // The rule is one primary action per *viewport*, not per page — the
    // closing band is allowed its own amber CTA because you cannot see it and
    // the pricing cards at the same time. What must never happen is two amber
    // actions competing inside one section. --cta is the only warm colour in
    // the palette, so counting the class is a faithful proxy.
    const { container } = renderPricing()

    for (const section of container.querySelectorAll('section')) {
      const amber = section.querySelectorAll('[class*="bg-[var(--cta)]"]')
      expect(
        amber.length,
        `section #${section.id || '(unnamed)'} has ${amber.length} amber actions`,
      ).toBeLessThanOrEqual(1)
    }

    // ...and the page as a whole still has one, so the ask is never missing.
    expect(
      container.querySelectorAll('[class*="bg-[var(--cta)]"]').length,
    ).toBeGreaterThan(0)
  })

  it('renders the comparison as a real table with matched columns', () => {
    renderPricing()
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()

    // Header row + one row per attribute.
    const rows = table.querySelectorAll('tbody tr')
    expect(rows).toHaveLength(PRICING.comparison.rows.length)

    for (const row of rows) {
      expect(row.querySelector('th[scope="row"]')).toBeInTheDocument()
      expect(row.querySelectorAll('td')).toHaveLength(PRICING.comparison.columns.length)
    }
  })

  it('lets keyboard users reach the horizontally scrolling table', () => {
    const { container } = renderPricing()
    const scroller = container.querySelector('.scroll-x')
    expect(scroller).toHaveAttribute('tabindex', '0')
  })

  it('has no detectable axe violations', async () => {
    const { container } = renderPricing()
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
