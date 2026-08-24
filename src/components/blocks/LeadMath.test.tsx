import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LeadMath } from './LeadMath'
import { PRIYA } from '@/content/priya'

function renderMath() {
  return render(<LeadMath math={PRIYA.math} />)
}

/** Strips the non-breaking spaces Intl puts after the currency symbol. */
function digits(el: HTMLElement) {
  return (el.textContent ?? '').replace(/\s/g, '')
}

describe('LeadMath', () => {
  it('computes the defaults: 600 leads, ₹700 each, 35% reached', () => {
    renderMath()
    // 600 × 700 = 420,000 spent; 65% of 600 = 390 never reached;
    // 390 × 700 = 273,000 wasted.
    expect(digits(screen.getByTestId('out-spend'))).toBe('₹4,20,000')
    expect(digits(screen.getByTestId('out-missed'))).toBe('390')
    expect(digits(screen.getByTestId('out-wasted'))).toBe('₹2,73,000')
  })

  it('recomputes when a figure changes', async () => {
    const user = userEvent.setup()
    renderMath()

    const leads = screen.getByLabelText(PRIYA.math.inputs.leads)
    await user.clear(leads)
    await user.type(leads, '1000')

    expect(digits(screen.getByTestId('out-spend'))).toBe('₹7,00,000')
    expect(digits(screen.getByTestId('out-missed'))).toBe('650')
  })

  it('announces the result politely rather than on every keystroke', () => {
    renderMath()
    expect(screen.getByTestId('out-spend').closest('[aria-live]')).toHaveAttribute(
      'aria-live',
      'polite',
    )
  })

  it('never renders NaN when an input is cleared', async () => {
    const user = userEvent.setup()
    const { container } = renderMath()

    await user.clear(screen.getByLabelText(PRIYA.math.inputs.leads))

    expect(container.textContent).not.toMatch(/NaN/)
    expect(digits(screen.getByTestId('out-missed'))).toBe('0')
  })

  it('clamps the reached percentage to 0-100', async () => {
    const user = userEvent.setup()
    renderMath()

    const reached = screen.getByLabelText(PRIYA.math.inputs.reached)
    await user.clear(reached)
    await user.type(reached, '150')

    // Clamped to 100 — nobody is left unreached.
    expect(digits(screen.getByTestId('out-missed'))).toBe('0')
  })
})
