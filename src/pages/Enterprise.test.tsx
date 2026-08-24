import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Enterprise from './Enterprise'
import { ENTERPRISE } from '@/content/enterprise'

function renderEnterprise() {
  return render(
    <MemoryRouter>
      <Enterprise />
    </MemoryRouter>,
  )
}

describe('Enterprise', () => {
  it('renders with its real content module', () => {
    renderEnterprise()
    expect(screen.getByText(ENTERPRISE.hero.sub)).toBeInTheDocument()
  })

  it('has exactly one h1', () => {
    const { container } = renderEnterprise()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('renders all six capabilities', () => {
    renderEnterprise()
    for (const c of ENTERPRISE.capabilities.items) {
      expect(
        screen.getByRole('heading', { name: c.title }),
        `capability ${c.id}`,
      ).toBeInTheDocument()
    }
  })

  it('renders each case study with its challenge and solution', () => {
    renderEnterprise()
    for (const c of ENTERPRISE.cases.items) {
      expect(screen.getByText(c.challenge), `${c.id} challenge`).toBeInTheDocument()
      expect(screen.getByText(c.solution), `${c.id} solution`).toBeInTheDocument()
    }
  })

  it('announces each stack item exactly once despite the marquee clone', () => {
    const { container } = renderEnterprise()
    // Scoped to the marquee section — most of these tool names legitimately
    // appear again in the capability cards and case study tags.
    const stack = within(container.querySelector('#stack') as HTMLElement)

    for (const tool of ENTERPRISE.stack.items) {
      const visibleToAt = stack
        .getAllByText(tool, { exact: true })
        .filter((el) => !el.closest('[aria-hidden="true"]'))
      expect(visibleToAt, `stack item ${tool}`).toHaveLength(1)
    }
  })
})

describe('Enterprise FAQ', () => {
  it('starts fully collapsed', () => {
    renderEnterprise()
    for (const item of ENTERPRISE.faq.items) {
      const header = screen.getByRole('button', { name: item.question })
      expect(header).toHaveAttribute('aria-expanded', 'false')
    }
    expect(screen.queryByText(ENTERPRISE.faq.items[0].answer)).not.toBeVisible()
  })

  it('opens a panel on click and points the header at it', async () => {
    const user = userEvent.setup()
    renderEnterprise()
    const [first] = ENTERPRISE.faq.items

    const header = screen.getByRole('button', { name: first.question })
    await user.click(header)

    expect(header).toHaveAttribute('aria-expanded', 'true')

    const panelId = header.getAttribute('aria-controls')
    const panel = document.getElementById(panelId!)
    expect(panel).toBeVisible()
    expect(panel).toHaveTextContent(first.answer)
    expect(panel).toHaveAttribute('aria-labelledby', header.id)
  })

  it('is operable from the keyboard alone', async () => {
    const user = userEvent.setup()
    renderEnterprise()
    const [first] = ENTERPRISE.faq.items

    const header = screen.getByRole('button', { name: first.question })
    header.focus()
    expect(header).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(header).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard(' ')
    expect(header).toHaveAttribute('aria-expanded', 'false')
  })

  it('keeps only one panel open at a time', async () => {
    const user = userEvent.setup()
    renderEnterprise()
    const [first, second] = ENTERPRISE.faq.items

    const firstHeader = screen.getByRole('button', { name: first.question })
    const secondHeader = screen.getByRole('button', { name: second.question })

    await user.click(firstHeader)
    await user.click(secondHeader)

    expect(firstHeader).toHaveAttribute('aria-expanded', 'false')
    expect(secondHeader).toHaveAttribute('aria-expanded', 'true')
  })
})
