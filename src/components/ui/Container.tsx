import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps {
  children: ReactNode
  /** `wide` for rails and grids, `narrow` for prose-led sections. */
  width?: 'default' | 'wide' | 'narrow'
  className?: string
}

const WIDTHS = {
  narrow: 'max-w-[46rem]',
  default: 'max-w-[76rem]',
  wide: 'max-w-[88rem]',
} as const

export function Container({ children, width = 'default', className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', WIDTHS[width], className)}>
      {children}
    </div>
  )
}
