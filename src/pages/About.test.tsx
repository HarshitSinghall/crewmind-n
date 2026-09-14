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

  it('renders the approved leadership portraits in left, centre, right order', () => {
    const { container } = renderAbout()
    expect(ABOUT.team.members.map(({ name, role }) => ({ name, role }))).toEqual([
      { name: 'Raghuraj', role: 'Co-Founder' },
      { name: 'Harshit', role: 'Founder' },
      { name: 'Yash', role: 'Sales Head' },
    ])
    expect(screen.getByRole('button', { name: /Raghuraj, Co-Founder/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Harshit, Founder/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Yash, Sales Head/i })).toBeInTheDocument()
    expect(
      Array.from(container.querySelectorAll<HTMLImageElement>('#team img')).map(
        ({ src }) => new URL(src).pathname,
      ),
    ).toEqual([
      '/team/raghuraj.webp',
      '/team/harshit-singhal.webp',
      '/team/yash.webp',
    ])
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
