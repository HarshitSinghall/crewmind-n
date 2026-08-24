import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
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

describe('About', () => {
  it('renders with its real content module', () => {
    renderAbout()
    expect(screen.getByText(ABOUT.hero.sub)).toBeInTheDocument()
  })

  it('has exactly one h1', () => {
    const { container } = renderAbout()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('renders every team member once', () => {
    renderAbout()
    for (const member of ABOUT.team.members) {
      expect(
        screen.getByRole('heading', { name: member.name }),
        `member ${member.id}`,
      ).toBeInTheDocument()
      expect(screen.getByText(member.bio)).toBeInTheDocument()
    }
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
