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

const DEVANAGARI = /[ऀ-ॿ]/

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
    // The two a weaker page would quietly cut. Asserted by id against the
    // content module rather than by a loose heading match — the FAQ asks
    // about Haryanvi too, and a regex catches both.
    const ids = PRIYA.limits.items.map((l) => l.id)
    expect(ids).toContain('accents')
    expect(ids).toContain('volume')
  })

  it('marks every devanagari transcript line with lang="hi"', () => {
    const { container } = renderPriya()

    for (const turn of PRIYA.call.turns) {
      const node = Array.from(container.querySelectorAll('dd')).find(
        (el) => el.textContent === turn.line,
      )
      expect(node, `turn ${turn.id} rendered`).toBeTruthy()
      if (DEVANAGARI.test(turn.line)) {
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
    expect(
      screen.getAllByText(PRIYA.leadCard.card.caption).length,
    ).toBeGreaterThan(0)
  })

  it('renders both race lanes and tags the proverb as hindi', () => {
    renderPriya()
    for (const lane of PRIYA.race.lanes) {
      expect(screen.getByText(lane.label), `lane ${lane.id}`).toBeInTheDocument()
    }
    expect(screen.getByText(PRIYA.race.proverb)).toHaveAttribute('lang', 'hi')
  })

  it('carries no unmeasured market-audit statistics', () => {
    const { container } = renderPriya()
    // These were published once as a first-person measurement and were never
    // run. They must never come back. See the spec's honesty constraints.
    expect(container.textContent).not.toMatch(/31 brokerages/i)
    expect(container.textContent).not.toMatch(/14h 20m/i)
  })

  it('states the real price and the setup fee together', () => {
    renderPriya()
    // ₹12,000 appears twice on purpose — in the telecaller comparison and on
    // the plan card. The setup fee is never separated from the monthly.
    expect(screen.getAllByText(/₹12,000/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/₹30,000/).length).toBeGreaterThan(0)
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
