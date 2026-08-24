import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

interface WaitClockProps {
  label: string
  /** Hour and minute in IST that the clock counts from. */
  sinceHour: number
  sinceMinute: number
  foot?: string
  /** `sm` for the homepage band, `md` for the product hero. */
  size?: 'sm' | 'md'
  className?: string
}

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000

/**
 * Milliseconds since the most recent occurrence of hour:minute IST.
 *
 * IST is computed explicitly rather than trusting the visitor's clock: the
 * claim is about a lead that arrived at 11:40pm IST and it has to hold for
 * whoever is reading, wherever they are.
 */
export function elapsedSinceLastNight(
  hour: number,
  minute: number,
  now: number = Date.now(),
): number {
  const ist = new Date(now + IST_OFFSET_MS)

  const target =
    Date.UTC(
      ist.getUTCFullYear(),
      ist.getUTCMonth(),
      ist.getUTCDate(),
      hour,
      minute,
      0,
    ) - IST_OFFSET_MS

  const elapsed = now - target
  // Before the target time today, the relevant lead is yesterday's.
  return elapsed >= 0 ? elapsed : elapsed + DAY_MS
}

const pad = (n: number) => String(n).padStart(2, '0')

const SIZES = {
  sm: 'text-step-4',
  md: 'text-step-5 sm:text-step-6',
} as const

/**
 * How long a lead that arrived at 11:40pm IST has been waiting, right now.
 *
 * Real elapsed time computed in the browser, which is the only reason it is
 * allowed to be here — the page sells seconds, so the honest way to open is
 * with seconds actually passing.
 *
 * Two implementation notes that matter:
 *
 *  - The digits are written straight to the DOM through refs, not through
 *    state. A setState every second would re-render this subtree 3,600 times
 *    an hour on a mid-range Android for no reason.
 *  - Each pair sits in a fixed-width cell. A clock that reflows once a second
 *    undermines the one claim the page makes.
 *
 * It keeps ticking under reduced motion: this is information, not decoration.
 * But it is aria-live="off" — a screen reader announcing a changing number
 * every second is unusable.
 */
export function WaitClock({
  label,
  sinceHour,
  sinceMinute,
  foot,
  size = 'md',
  className,
}: WaitClockProps) {
  const h = useRef<HTMLSpanElement>(null)
  const m = useRef<HTMLSpanElement>(null)
  const s = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tick = () => {
      const total = Math.floor(
        elapsedSinceLastNight(sinceHour, sinceMinute) / 1000,
      )
      if (h.current) h.current.textContent = pad(Math.floor(total / 3600))
      if (m.current) m.current.textContent = pad(Math.floor((total % 3600) / 60))
      if (s.current) s.current.textContent = pad(total % 60)
    }

    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [sinceHour, sinceMinute])

  return (
    <figure
      className={cn(
        'rounded-[var(--r-lg)] border border-[var(--border-strong)] bg-[var(--surface-2)] p-6 shadow-[var(--shadow-2)]',
        className,
      )}
    >
      <figcaption className="text-[0.9375rem] leading-snug text-[var(--text-2)]">
        {label}
      </figcaption>

      <div
        aria-live="off"
        className={cn(
          'tnum mt-4 flex items-baseline gap-1 font-display font-semibold leading-none tracking-[-0.03em] text-[var(--accent)]',
          SIZES[size],
        )}
      >
        <Cell inner={h} />
        <Sep />
        <Cell inner={m} />
        <Sep />
        <Cell inner={s} />
      </div>

      {foot && (
        <p className="mt-5 text-[0.8125rem] leading-snug text-[var(--text-3)]">
          {foot}
        </p>
      )}
    </figure>
  )
}

/**
 * Fixed two-digit cell. `ch` units against the display face keep the width
 * stable whether the value is 09 or 11.
 *
 * The "00" is static initial content, deliberately NOT driven by state. The
 * effect overwrites it through the ref on mount; because nothing here holds
 * state, React never re-renders this subtree and never clobbers what the
 * effect wrote. An earlier version flipped a `live` flag on mount, which
 * re-rendered *after* the first tick and blanked the clock for a full second.
 */
function Cell({ inner }: { inner: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <span
      ref={inner}
      data-clock-cell=""
      className="inline-block min-w-[2ch] text-center"
    >
      00
    </span>
  )
}

function Sep() {
  return (
    <span aria-hidden="true" className="opacity-50">
      :
    </span>
  )
}
