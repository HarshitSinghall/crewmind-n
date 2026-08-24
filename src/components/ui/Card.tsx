import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

interface CardProps {
  children: ReactNode
  /** Turns the whole card into a link. */
  href?: string
  /** `raised` for the one card per section that should pull focus. */
  tone?: 'default' | 'raised'
  className?: string
}

const BASE =
  'group relative flex flex-col rounded-[var(--r-lg)] border p-6 transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)]'

const TONES = {
  default: 'border-[var(--border-subtle)] bg-[var(--surface-1)]',
  raised: 'border-[var(--border-strong)] bg-[var(--surface-2)] shadow-[var(--shadow-2)]',
} as const

const INTERACTIVE =
  'hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)] hover:shadow-[var(--shadow-2)]'

export function Card({ children, href, tone = 'default', className }: CardProps) {
  const classes = cn(BASE, TONES[tone], href && INTERACTIVE, className)

  if (!href) return <div className={classes}>{children}</div>

  const isExternal = /^https?:/.test(href)
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={classes}>
      {children}
    </Link>
  )
}
