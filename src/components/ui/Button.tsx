import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** Trailing icon slot — arrows, chevrons. */
  trailing?: ReactNode
}

interface LinkProps extends BaseProps {
  href: string
  onClick?: never
  type?: never
}

interface ButtonProps extends BaseProps {
  href?: never
  onClick: () => void
  type?: 'button' | 'submit'
}

type Props = LinkProps | ButtonProps

/*
  Amber (--cta) appears on `primary` and nowhere else in the entire design
  system. Nothing else in the palette is warm, which is what makes every
  primary action unmissable without shouting. Do not add amber elsewhere.
*/
const VARIANTS = {
  primary:
    'bg-[var(--cta)] text-[var(--cta-fg)] font-semibold shadow-[var(--shadow-2)] hover:bg-[var(--cta-hover)] hover:-translate-y-px active:translate-y-0',
  secondary:
    'bg-[var(--surface-2)] text-[var(--text-1)] font-medium border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-3)]',
  ghost:
    'text-[var(--text-2)] font-medium border border-transparent hover:text-[var(--text-1)] hover:border-[var(--border-subtle)] hover:bg-[var(--surface-1)]',
} as const

const SIZES = {
  sm: 'h-9 px-3.5 text-[0.8125rem] gap-1.5 rounded-[var(--r-md)]',
  md: 'h-11 px-5 text-[0.9375rem] gap-2 rounded-[var(--r-md)]',
  lg: 'h-13 px-6 text-[1rem] gap-2.5 rounded-[var(--r-lg)]',
} as const

const BASE =
  'inline-flex items-center justify-center whitespace-nowrap transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-expo)] select-none'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  trailing,
  ...rest
}: Props) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)
  const inner = (
    <>
      {children}
      {trailing && <span aria-hidden="true" className="shrink-0">{trailing}</span>}
    </>
  )

  if ('href' in rest && rest.href !== undefined) {
    const { href } = rest
    const isExternal = /^(https?:|mailto:|tel:)/.test(href)
    const isAnchor = href.startsWith('#')

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {inner}
        </a>
      )
    }

    if (isAnchor) {
      return (
        <a href={href} className={classes}>
          {inner}
        </a>
      )
    }

    return (
      <Link to={href} className={classes}>
        {inner}
      </Link>
    )
  }

  const { onClick, type = 'button' } = rest as ButtonProps
  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  )
}
