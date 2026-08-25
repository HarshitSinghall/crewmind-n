import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PayrollMath } from './PayrollMath'
import { HOME } from '@/content/home'
import { PRIYA } from '@/content/priya'

function renderPayroll() {
  return render(<PayrollMath payroll={HOME.payroll} />)
}

/** Strips the non-breaking spaces Intl puts after the currency symbol. */
function digits(el: HTMLElement) {
  return (el.textContent ?? '').replace(/\s/g, '')
}

describe('PayrollMath', () => {
  it('computes the defaults: 3 people, ₹30,000 each, 40% loading, 600 leads', () => {
    renderPayroll()
    // Human: 3 × 30,000 × 1.4 = 1,26,000.
    // CrewMind: 12,000 base + (600 − 500) × 25 = 14,500.
    expect(digits(screen.getByTestId('pay-human'))).toBe('₹1,26,000')
    expect(digits(screen.getByTestId('pay-crewmind'))).toBe('₹14,500')
    expect(digits(screen.getByTestId('pay-gap'))).toBe('₹1,11,500')
  })

  it('charges nothing per lead below the included allowance', async () => {
    const user = userEvent.setup()
    renderPayroll()

    const leads = screen.getByLabelText(HOME.payroll.inputs.leads)
    await user.clear(leads)
    await user.type(leads, '400')

    // Under the 500 included, so the base price stands alone.
    expect(digits(screen.getByTestId('pay-crewmind'))).toBe('₹12,000')
  })

  it('derives the percentage from the reader’s inputs rather than asserting one', async () => {
    const user = userEvent.setup()
    renderPayroll()

    const people = screen.getByLabelText(HOME.payroll.inputs.people)
    await user.clear(people)
    await user.type(people, '1')

    // 1 × 30,000 × 1.4 = 42,000 against 14,500 — a 65% gap, not the 80%
    // the headline uses as a provocation. The number must follow the inputs.
    expect(digits(screen.getByTestId('pay-human'))).toBe('₹42,000')
    expect(screen.getByText(/65% less/)).toBeInTheDocument()
  })

  it('shows no triumphant percentage when the gap closes', async () => {
    const user = userEvent.setup()
    renderPayroll()

    const people = screen.getByLabelText(HOME.payroll.inputs.people)
    await user.clear(people)
    await user.type(people, '0')

    // A business with nobody on this job should not be shown a saving.
    expect(digits(screen.getByTestId('pay-gap'))).toBe('₹0')
    expect(screen.queryByText(/% less, on the numbers/)).not.toBeInTheDocument()
  })

  it('never renders NaN when an input is cleared', async () => {
    const user = userEvent.setup()
    const { container } = renderPayroll()

    await user.clear(screen.getByLabelText(HOME.payroll.inputs.salary))

    expect(container.textContent).not.toMatch(/NaN/)
    expect(digits(screen.getByTestId('pay-human'))).toBe('₹0')
  })

  it('announces the result politely rather than on every keystroke', () => {
    renderPayroll()
    expect(screen.getByTestId('pay-gap').closest('[aria-live]')).toHaveAttribute(
      'aria-live',
      'polite',
    )
  })

  it('prices the CrewMind column off Priya’s real published plan', () => {
    // The homepage must not drift into quoting a price the product page does
    // not charge. If Priya's plan changes, this fails until both agree.
    const note = PRIYA.plan.tier.price?.note ?? ''
    expect(PRIYA.plan.tier.price?.value).toContain(
      String(HOME.payroll.price.base / 1000),
    )
    expect(note).toContain(String(HOME.payroll.price.includedLeads))
    expect(note).toContain(String(HOME.payroll.price.perExtraLead))
  })
})
