import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionProps {
  children: ReactNode
  id?: string
  /** Vertical rhythm. Every section on the site uses one of these three. */
  spacing?: 'tight' | 'default' | 'loose'
  /** Adds a hairline top border to separate adjacent same-tone sections. */
  divided?: boolean
  className?: string
  'aria-labelledby'?: string
}

const SPACING = {
  tight: 'py-14 sm:py-16',
  default: 'py-20 sm:py-24 lg:py-28',
  loose: 'py-24 sm:py-32 lg:py-40',
} as const

export function Section({
  children,
  id,
  spacing = 'default',
  divided = false,
  className,
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative',
        SPACING[spacing],
        divided && 'border-t border-[var(--border-subtle)]',
        className,
      )}
      {...aria}
    >
      {children}
    </section>
  )
}
