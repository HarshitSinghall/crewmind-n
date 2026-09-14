import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axe from 'axe-core'
import LegalPage from './LegalPage'
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from '@/content/legal'

function renderLegal(document: typeof PRIVACY_POLICY, path: string) {
  return render(
    <MemoryRouter>
      <LegalPage document={document} path={path} />
    </MemoryRouter>,
  )
}

describe('LegalPage', () => {
  it('publishes substantive privacy disclosures', () => {
    renderLegal(PRIVACY_POLICY, '/privacy')
    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument()
    for (const heading of ['Information we collect', 'Automated demo-call consent', 'Your choices and rights', 'Changes and contact']) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    }
  })

  it('publishes substantive website and demo terms', () => {
    renderLegal(TERMS_OF_SERVICE, '/terms')
    expect(screen.getByRole('heading', { level: 1, name: 'Terms of Service' })).toBeInTheDocument()
    for (const heading of ['Demo calls', 'Acceptable use', 'Services, proposals, and pricing', 'Liability']) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    }
  })

  it('has no detectable axe violations', async () => {
    const { container } = renderLegal(PRIVACY_POLICY, '/privacy')
    const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })
    expect(results.violations.map((violation) => violation.id)).toEqual([])
  }, 20000)
})
