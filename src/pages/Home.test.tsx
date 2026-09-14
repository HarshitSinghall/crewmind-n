import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'
import { HOME } from '@/content/home'
import { PRIYA_HOME } from '@/content/priya'
import { TESTIMONIALS } from '@/content/testimonials'

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  )
}

describe('Home', () => {
  it('renders with its real content module', () => {
    renderHome()
    expect(screen.getByText(HOME.hero.sub)).toBeInTheDocument()
  })

  it('has exactly one h1', () => {
    const { container } = renderHome()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('renders the emphasised hero phrase inside the h1', () => {
    const { container } = renderHome()
    const h1 = container.querySelector('h1')
    expect(h1?.textContent).toContain(HOME.hero.headline.emphasis)
  })

  it('renders every service card', () => {
    renderHome()
    for (const service of HOME.services.items) {
      expect(
        screen.getByRole('heading', { name: service.title }),
        `service ${service.slug}`,
      ).toBeInTheDocument()
    }
  })

  it('publishes no customer testimonials without verified evidence', () => {
    renderHome()
    expect(TESTIMONIALS).toEqual([])
    expect(screen.queryByText(/trustpilot/i)).not.toBeInTheDocument()
  })

  it('exposes exactly one primary CTA colour class per close section', () => {
    renderHome()
    // Both the hero and the close use variant="primary"; the guarantee we
    // care about is that the secondary action is not also amber.
    const secondary = screen.getAllByRole('link', {
      name: HOME.hero.cta.secondary.label,
    })
    for (const el of secondary) {
      expect(el.className).not.toContain('bg-[var(--cta)]')
    }
  })

  it('shows the Calendly scheduler without an extra click', () => {
    const { container } = renderHome()

    const frame = container.querySelector('iframe')
    expect(frame).toBeInTheDocument()
    expect(frame).toHaveAttribute('src', expect.stringContaining('calendly.com'))
    expect(frame).toHaveAttribute('loading', 'lazy')
  })

  it('always offers a way through to the scheduler without the embed', () => {
    renderHome()
    const direct = screen.getByRole('link', { name: /open the scheduler directly/i })
    expect(direct).toHaveAttribute('href', expect.stringContaining('calendly.com'))
    expect(direct).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('points the booking anchor at a real section', () => {
    const { container } = renderHome()
    expect(container.querySelector('#book')).toBeInTheDocument()
  })

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

  it('shows the flagship band above the service grid', () => {
    const { container } = renderHome()
    const flagship = container.querySelector('#flagship')
    const services = container.querySelector('#services')
    expect(flagship).toBeInTheDocument()
    if (services) {
      expect(
        flagship!.compareDocumentPosition(services) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy()
    }
  })
})
