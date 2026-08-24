import { describe, expect, it } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import About from './About'
import { ABOUT } from '@/content/about'

function renderAbout() {
  return render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  )
}

/** The trigger for one member's expandable card. */
function cardFor(name: string) {
  return screen.getByRole('button', { name: new RegExp(name, 'i') })
}

describe('About', () => {
  it('renders with its real content module', () => {
    renderAbout()
    expect(screen.getByText(ABOUT.hero.sub)).toBeInTheDocument()
  })

  it('has exactly one h1', () => {
    const { container } = renderAbout()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('renders a reachable card for every team member', () => {
    renderAbout()
    for (const member of ABOUT.team.members) {
      // The trigger is a real button, so it is keyboard reachable, and its
      // accessible name carries both the person and their role.
      const card = cardFor(member.name)
      expect(card, `card ${member.id}`).toBeInTheDocument()
      expect(card).toHaveAccessibleName(new RegExp(member.role, 'i'))
    }
  })

  it('opens a member panel showing their full bio', async () => {
    const user = userEvent.setup()
    renderAbout()

    const member = ABOUT.team.members[0]
    expect(screen.queryByText(member.bio)).not.toBeInTheDocument()

    await user.click(cardFor(member.name))

    const dialog = await screen.findByRole('dialog')
    expect(within(dialog).getByText(member.bio)).toBeInTheDocument()
    expect(dialog).toHaveAccessibleName(member.name)
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('closes the panel on Escape and returns focus to the card', async () => {
    const user = userEvent.setup()
    renderAbout()

    const member = ABOUT.team.members[1]
    const card = cardFor(member.name)
    await user.click(card)
    await screen.findByRole('dialog')

    await user.keyboard('{Escape}')

    await waitFor(
      () => expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
      { timeout: 3000 },
    )
    // Focus goes back where it came from, not to the top of the document.
    expect(cardFor(member.name)).toHaveFocus()
  })

  it('closes the panel from its close button', async () => {
    const user = userEvent.setup()
    renderAbout()

    await user.click(cardFor(ABOUT.team.members[2].name))
    const dialog = await screen.findByRole('dialog')

    await user.click(within(dialog).getByRole('button', { name: /close/i }))

    await waitFor(
      () => expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
      { timeout: 3000 },
    )
  })

  it('locks the page behind the open panel', async () => {
    const user = userEvent.setup()
    renderAbout()

    await user.click(cardFor(ABOUT.team.members[0].name))
    await screen.findByRole('dialog')
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')
    await waitFor(
      () => expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
      { timeout: 3000 },
    )
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('renders each pillar', () => {
    renderAbout()
    for (const pillar of ABOUT.pillars.items) {
      expect(screen.getByRole('heading', { name: pillar.title })).toBeInTheDocument()
    }
  })

  it('renders the full story', () => {
    renderAbout()
    for (const paragraph of ABOUT.story.paragraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    }
  })
})
