import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface BadgeProps {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'success'
  className?: string
}

const TONES = {
  neutral:
    'border-[var(--border-subtle)] bg-[var(--surface-2)] text-[var(--text-2)]',
  accent:
    'border-[color-mix(in_oklch,var(--accent)_35%,transparent)] bg-[color-mix(in_oklch,var(--accent)_12%,transparent)] text-[var(--accent)]',
  success:
    'border-[color-mix(in_oklch,var(--success)_35%,transparent)] bg-[color-mix(in_oklch,var(--success)_12%,transparent)] text-[var(--success)]',
} as const

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[var(--r-full)] border px-2.5 py-0.5 font-mono text-[0.6875rem] font-medium tracking-[0.04em] whitespace-nowrap',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
