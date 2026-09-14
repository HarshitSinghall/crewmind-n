import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import PastProjects from './PastProjects'
import { CATEGORIES, PROJECTS } from '@/content/projects'

/** Surfaces the current URL so filter tests can assert on it. */
function LocationProbe() {
  const location = useLocation()
  return <div data-testid="url">{location.pathname + location.search}</div>
}

function renderProjects(initial = '/past-projects') {
  return render(
    <MemoryRouter initialEntries={[initial]}>
      <Routes>
        <Route
          path="/past-projects"
          element={
            <>
              <PastProjects />
              <LocationProbe />
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  )
}

const url = () => screen.getByTestId('url').textContent

describe('PastProjects', () => {
  it('renders every project when unfiltered', () => {
    renderProjects()
    for (const project of PROJECTS) {
      expect(
        screen.getByRole('heading', { name: project.title }),
        `project ${project.id}`,
      ).toBeInTheDocument()
    }
  })

  it('has exactly one h1', () => {
    const { container } = renderProjects()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('offers a chip only for categories that have work', () => {
    // A filter that leads to an empty grid reads as a broken catalogue.
    renderProjects()
    for (const category of CATEGORIES) {
      const count = PROJECTS.filter((p) => p.category === category.id).length
      const chip = screen.queryByRole('button', { name: new RegExp(category.label) })

      if (count > 0) expect(chip, `${category.id} should have a chip`).toBeInTheDocument()
      else expect(chip, `${category.id} is empty and must not have a chip`).toBeNull()
    }
  })

  it('reads the initial filter from the URL', () => {
    renderProjects('/past-projects?category=ai-call-centers')

    const expected = PROJECTS.filter((p) => p.category === 'ai-call-centers')
    const other = PROJECTS.find((p) => p.category !== 'ai-call-centers')!

    for (const project of expected) {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    }
    expect(screen.queryByRole('heading', { name: other.title })).toBeNull()
  })

  it('writes the filter into the URL when a chip is pressed', async () => {
    const user = userEvent.setup()
    renderProjects()

    const category = CATEGORIES.find(
      (c) => PROJECTS.filter((p) => p.category === c.id).length > 0,
    )!
    await user.click(screen.getByRole('button', { name: new RegExp(category.label) }))

    expect(url()).toBe(`/past-projects?category=${category.id}`)
  })

  it('marks the active chip as pressed', async () => {
    const user = userEvent.setup()
    renderProjects()

    const all = screen.getByRole('button', { name: /^All/ })
    expect(all).toHaveAttribute('aria-pressed', 'true')

    const chip = screen.getByRole('button', { name: /Voice & Lead Response/ })
    await user.click(chip)

    expect(chip).toHaveAttribute('aria-pressed', 'true')
    expect(all).toHaveAttribute('aria-pressed', 'false')
  })

  it('clears the filter back to an empty query string', async () => {
    const user = userEvent.setup()
    renderProjects('/past-projects?category=ai-call-centers')

    await user.click(screen.getByRole('button', { name: /^All/ }))

    expect(url()).toBe('/past-projects')
    expect(screen.getAllByRole('article')).toHaveLength(PROJECTS.length)
  })

  it('falls back to showing everything for an unknown category', () => {
    // The query string is shareable, so it will get hand-edited eventually.
    renderProjects('/past-projects?category=not-a-real-category')

    expect(screen.getAllByRole('article')).toHaveLength(PROJECTS.length)
    expect(screen.getByRole('button', { name: /^All/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('announces the result count politely', async () => {
    const user = userEvent.setup()
    const { container } = renderProjects()

    const live = container.querySelector('[aria-live="polite"]')!
    expect(live).toHaveTextContent(`${PROJECTS.length} blueprints`)

    const category = CATEGORIES.find((c) => c.id === 'ai-call-centers')!
    await user.click(screen.getByRole('button', { name: new RegExp(category.label) }))

    const count = PROJECTS.filter((p) => p.category === category.id).length
    expect(live).toHaveTextContent(`${count} blueprints in ${category.label}`)
  })

  it('shows challenge and solution on every visible card', () => {
    renderProjects('/past-projects?category=ai-agent-team')

    for (const card of screen.getAllByRole('article')) {
      const scoped = within(card)
      expect(scoped.getByText('Use case')).toBeInTheDocument()
      expect(scoped.getByText('Build pattern')).toBeInTheDocument()
    }
  })
})
