import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import axe from 'axe-core'
import Services from './Services'
import ServiceDetail from './ServiceDetail'
import { SERVICES } from '@/content/services'
import { PROJECTS } from '@/content/projects'

function renderIndex() {
  return render(
    <MemoryRouter>
      <Services />
    </MemoryRouter>,
  )
}

function renderDetail(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/services/${slug}`]}>
      <Routes>
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Services index', () => {
  it('has exactly one h1', () => {
    const { container } = renderIndex()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('lists all eight services and links each to its detail page', () => {
    renderIndex()
    expect(SERVICES).toHaveLength(8)

    for (const service of SERVICES) {
      const heading = screen.getByRole('heading', { name: service.title })
      expect(heading, `service ${service.slug}`).toBeInTheDocument()
      expect(heading.closest('a')).toHaveAttribute('href', `/services/${service.slug}`)
    }
  })
})

describe('ServiceDetail', () => {
  it.each(SERVICES.map((s) => s.slug))('renders /services/%s', (slug) => {
    const service = SERVICES.find((s) => s.slug === slug)!
    const { container } = renderDetail(slug)

    expect(container.querySelectorAll('h1'), `${slug} h1 count`).toHaveLength(1)
    expect(screen.getByText(service.hero.sub)).toBeInTheDocument()
  })

  it('renders every section of a fully detailed service', () => {
    const service = SERVICES.find((s) => s.slug === 'ai-call-centers')!
    const { container } = renderDetail('ai-call-centers')

    for (const section of service.sections) {
      expect(
        container.querySelector(`#${section.id}`),
        `section ${section.id} did not render`,
      ).toBeInTheDocument()
    }
  })

  it('renders the voice control checklist without an invented comparison', () => {
    renderDetail('ai-call-centers')
    const service = SERVICES.find((s) => s.slug === 'ai-call-centers')!
    const checklist = service.sections.find((s) => s.kind === 'checklist')!

    if (checklist.kind !== 'checklist') throw new Error('expected a checklist section')
    for (const item of checklist.items) {
      expect(screen.getByText(item)).toBeInTheDocument()
    }
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('shows related work drawn from the matching project category', () => {
    const service = SERVICES.find((s) => s.slug === 'ai-personal-assistants')!
    renderDetail('ai-personal-assistants')

    const expected = PROJECTS.filter((p) => p.category === service.category).slice(0, 3)
    expect(expected.length).toBeGreaterThan(0)

    for (const project of expected) {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    }

    expect(
      screen.getByRole('link', { name: new RegExp(`View all ${service.title}`) }),
    ).toHaveAttribute('href', `/past-projects?category=${service.category}`)
  })

  it('omits the related-work block when the category has no projects yet', () => {
    // GEO has no shipped case studies; the block must not render an empty
    // grid and a link into nothing.
    renderDetail('geo')
    expect(screen.queryByRole('heading', { name: /What we've built/ })).toBeNull()
  })

  it('404s on an unknown slug', () => {
    renderDetail('not-a-real-service')
    expect(screen.queryByRole('heading', { level: 1 })?.textContent).not.toBe('')
    // NotFound renders, so no service hero copy is present.
    for (const service of SERVICES) {
      expect(screen.queryByText(service.hero.sub)).toBeNull()
    }
  })

  it('has no detectable axe violations', async () => {
    const { container } = renderDetail('ai-personal-assistants')
    const results = await axe.run(container, {
      // jsdom has no layout, so geometry-dependent rules cannot run here.
      rules: { 'color-contrast': { enabled: false } },
    })
    const summary = results.violations.map(
      (v) => `${v.id}: ${v.nodes.length} node(s) — ${v.help}`,
    )
    expect(summary).toEqual([])
  }, 20000)
})
