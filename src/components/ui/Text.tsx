import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface TextProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  /**
   * `muted` is --text-2. `subtle` is --text-3 and is restricted to 18px+ or
   * non-essential meta — it only just clears AA on the canvas.
   */
  tone?: 'default' | 'muted' | 'subtle'
  className?: string
}

const SIZES = {
  sm: 'text-step--1',
  md: 'text-step-0',
  lg: 'text-step-1 leading-[1.55]',
} as const

const TONES = {
  default: 'text-[var(--text-1)]',
  muted: 'text-[var(--text-2)]',
  subtle: 'text-[var(--text-3)]',
} as const

export function Text({ children, size = 'md', tone = 'muted', className }: TextProps) {
  return <p className={cn(SIZES[size], TONES[tone], className)}>{children}</p>
}
