import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Level = 1 | 2 | 3 | 4

interface HeadingProps {
  children: ReactNode
  /** Semantic level. Decoupled from visual size on purpose. */
  level?: Level
  /** Visual size, independent of level so hierarchy stays honest. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'display'
  id?: string
  className?: string
}

const SIZES = {
  sm: 'text-step-2',
  md: 'text-step-3',
  lg: 'text-step-4',
  xl: 'text-step-5 tracking-[-0.032em]',
  display: 'text-step-6 sm:text-step-7 tracking-[-0.038em]',
} as const

export function Heading({ children, level = 2, size = 'lg', id, className }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4'
  return (
    <Tag id={id} className={cn('font-display text-[var(--text-1)]', SIZES[size], className)}>
      {children}
    </Tag>
  )
}

/**
 * Serif italic emphasis inside a heading. Exactly one per major headline —
 * the cheapest high-trust typographic cue there is, and it stops working
 * the moment it is used twice.
 */
export function Emphasis({ children }: { children: ReactNode }) {
  return (
    <em className="font-serif font-normal italic tracking-[-0.01em] text-[var(--accent)]">
      {children}
    </em>
  )
}
