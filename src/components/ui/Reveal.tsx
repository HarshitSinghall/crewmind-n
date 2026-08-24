import type { ReactNode } from 'react'
import { useReveal } from '@/lib/useReveal'
import { cn } from '@/lib/cn'

interface RevealProps {
  children: ReactNode
  /** Stagger index — multiplied by 60ms. */
  index?: number
  as?: 'div' | 'li' | 'section'
  className?: string
}

/**
 * 16px rise + fade on enter, 480ms, 60ms stagger. Under reduced motion the
 * transform is dropped entirely and the content is visible from the start.
 */
export function Reveal({ children, index = 0, as = 'div', className }: RevealProps) {
  const { ref, shown, reduced } = useReveal<HTMLDivElement>()
  // `as` only ever renders a plain block element, so a single element type
  // satisfies the ref contract for all three without widening it to a union.
  const Tag = as as 'div'

  return (
    <Tag
      ref={ref}
      className={cn('transition-all', className)}
      style={{
        opacity: shown ? 1 : 0,
        transform: reduced || shown ? 'none' : 'translateY(16px)',
        transitionDuration: reduced ? 'var(--dur-fast)' : 'var(--dur-slow)',
        transitionTimingFunction: 'var(--ease-out-expo)',
        transitionDelay: reduced ? '0ms' : `${index * 60}ms`,
        transitionProperty: reduced ? 'opacity' : 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  )
}
