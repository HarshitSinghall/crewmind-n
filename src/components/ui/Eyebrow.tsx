import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface EyebrowProps {
  children: ReactNode
  /** Shows the accent tick before the label. */
  marker?: boolean
  className?: string
}

/**
 * Small mono label above a heading. Accent-coloured, wide-tracked — one of
 * the main carriers of the "technical, not salesy" tone.
 */
export function Eyebrow({ children, marker = true, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-[var(--accent)]',
        className,
      )}
    >
      {marker && (
        <span
          aria-hidden="true"
          className="inline-block h-px w-6 bg-[var(--accent-dim)]"
        />
      )}
      {children}
    </p>
  )
}
