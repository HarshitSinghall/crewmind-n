import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WaitClock, elapsedSinceLastNight } from './WaitClock'

/** 2026-08-24 04:10:30 IST === 2026-08-23 22:40:30 UTC */
const IST_0410 = Date.UTC(2026, 7, 23, 22, 40, 30)

describe('elapsedSinceLastNight', () => {
  it('measures from 11:40pm IST the previous night', () => {
    const ms = elapsedSinceLastNight(23, 40, IST_0410)
    // 11:40pm IST to 4:10:30am IST is 4h 30m 30s.
    expect(ms).toBe(((4 * 60 + 30) * 60 + 30) * 1000)
  })

  it('rolls back a full day when the target has not happened yet today', () => {
    // 2026-08-24 09:00 IST — 11:40pm IST is still hours away today, so the
    // relevant lead is yesterday's and the clock reads 9h 20m.
    const ist0900 = Date.UTC(2026, 7, 24, 3, 30, 0)
    expect(elapsedSinceLastNight(23, 40, ist0900)).toBe((9 * 60 + 20) * 60 * 1000)
  })

  it('never returns a negative elapsed time', () => {
    for (let h = 0; h < 24; h++) {
      const t = Date.UTC(2026, 7, 24, h, 0, 0)
      expect(elapsedSinceLastNight(23, 40, t)).toBeGreaterThanOrEqual(0)
    }
  })
})

describe('WaitClock', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(IST_0410)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function renderClock() {
    return render(
      <WaitClock
        label="Last night's lead has been waiting"
        sinceHour={23}
        sinceMinute={40}
        foot="This is the ordinary case."
      />,
    )
  }

  it('renders its label and footnote', () => {
    renderClock()
    expect(
      screen.getByText("Last night's lead has been waiting"),
    ).toBeInTheDocument()
    expect(screen.getByText('This is the ordinary case.')).toBeInTheDocument()
  })

  it('shows the elapsed time zero-padded to two digits', () => {
    const { container } = renderClock()
    const cells = container.querySelectorAll('[data-clock-cell]')
    expect(Array.from(cells).map((c) => c.textContent)).toEqual(['04', '30', '30'])
  })

  it('advances once a second', () => {
    const { container } = renderClock()
    vi.advanceTimersByTime(2000)
    const cells = container.querySelectorAll('[data-clock-cell]')
    expect(cells[2].textContent).toBe('32')
  })

  it('does not announce every tick to screen readers', () => {
    const { container } = renderClock()
    expect(container.querySelector('[aria-live]')).toHaveAttribute(
      'aria-live',
      'off',
    )
  })

  it('clears its interval on unmount', () => {
    const clear = vi.spyOn(globalThis, 'clearInterval')
    const { unmount } = renderClock()
    unmount()
    expect(clear).toHaveBeenCalled()
    clear.mockRestore()
  })
})
