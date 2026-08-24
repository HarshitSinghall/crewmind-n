import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Automations from './Automations'
import { AUTOMATIONS, AUTOMATIONS_PAGE } from '@/content/automations'

function renderPage() {
  return render(
    <MemoryRouter>
      <Automations />
    </MemoryRouter>,
  )
}

describe('Automations', () => {
  it('renders with its real content module', () => {
    renderPage()
    expect(screen.getByText(AUTOMATIONS_PAGE.hero.sub)).toBeInTheDocument()
  })

  it('has exactly one h1', () => {
    const { container } = renderPage()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('exposes one tab per automation, with the first selected', () => {
    renderPage()
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(AUTOMATIONS.length)
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    for (const tab of tabs.slice(1)) {
      expect(tab).toHaveAttribute('aria-selected', 'false')
    }
  })

  it('each tab points at the panel it controls', () => {
    renderPage()
    const panel = screen.getByRole('tabpanel')
    for (const tab of screen.getAllByRole('tab')) {
      expect(tab.getAttribute('aria-controls')).toBe(panel.id)
    }
  })

  it('swaps the panel contents when another tab is selected', async () => {
    const user = userEvent.setup()
    renderPage()

    const second = AUTOMATIONS[1]
    const panel = screen.getByRole('tabpanel')
    expect(within(panel).queryByText(second.steps[0].detail)).not.toBeInTheDocument()

    await user.click(screen.getAllByRole('tab')[1])

    expect(screen.getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'true')
    expect(
      within(screen.getByRole('tabpanel')).getByText(second.steps[0].detail),
    ).toBeInTheDocument()
  })

  it('moves selection with the arrow keys', async () => {
    const user = userEvent.setup()
    renderPage()

    const tabs = screen.getAllByRole('tab')
    tabs[0].focus()
    await user.keyboard('{ArrowDown}')

    expect(screen.getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'true')
  })

  it('wraps from the last tab back to the first', async () => {
    const user = userEvent.setup()
    renderPage()

    const tabs = screen.getAllByRole('tab')
    tabs[0].focus()
    await user.keyboard('{ArrowUp}')

    expect(screen.getAllByRole('tab')[AUTOMATIONS.length - 1]).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('renders every automation in the catalogue with both sides of the comparison', () => {
    renderPage()
    for (const automation of AUTOMATIONS) {
      expect(
        screen.getByRole('heading', { name: automation.name }),
        `heading ${automation.id}`,
      ).toBeInTheDocument()
      expect(screen.getByText(automation.before), `before ${automation.id}`).toBeInTheDocument()
      expect(screen.getByText(automation.after), `after ${automation.id}`).toBeInTheDocument()
    }
  })

  it('keeps the honest caveat on the numbers', () => {
    renderPage()
    expect(screen.getByText(AUTOMATIONS_PAGE.showcase.note)).toBeInTheDocument()
  })
})
