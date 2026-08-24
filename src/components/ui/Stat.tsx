import { cn } from '@/lib/cn'

interface StatProps {
  value: string
  label: string
  size?: 'sm' | 'md'
  className?: string
}

const VALUE_SIZES = {
  sm: 'text-[1.125rem]',
  md: 'text-step-2',
} as const

/**
 * A single figure with its caption. `tnum` is not optional here — these sit
 * in grids and rails where a proportional digit set makes columns twitch as
 * values change.
 */
export function Stat({ value, label, size = 'md', className }: StatProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span
        className={cn(
          'tnum font-display font-semibold tracking-[-0.02em] text-[var(--text-1)]',
          VALUE_SIZES[size],
        )}
      >
        {value}
      </span>
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--text-3)]">
        {label}
      </span>
    </div>
  )
}
