import { cn } from '@/lib/cn'

interface AvatarProps {
  initials: string
  name: string
  src?: string
  size?: 'sm' | 'md'
  className?: string
}

const SIZES = {
  sm: 'h-8 w-8 text-[0.625rem]',
  md: 'h-10 w-10 text-[0.75rem]',
} as const

export function Avatar({ initials, name, src, size = 'md', className }: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--r-full)] border border-[var(--border-subtle)] bg-[var(--surface-3)] font-mono font-medium tracking-[0.04em] text-[var(--text-2)]',
        SIZES[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={name} width={40} height={40} className="h-full w-full object-cover" />
      ) : (
        <span aria-hidden="true">{initials.slice(0, 2).toUpperCase()}</span>
      )}
    </span>
  )
}

interface AvatarStackProps {
  people: { name: string; initials: string; src?: string }[]
  className?: string
}

/** Overlapping stack. Purely decorative, so the whole group is hidden from AT. */
export function AvatarStack({ people, className }: AvatarStackProps) {
  return (
    <div className={cn('flex items-center', className)} aria-hidden="true">
      {people.map((p, i) => (
        <Avatar
          key={p.name}
          {...p}
          size="sm"
          className={cn(
            'ring-2 ring-[var(--bg)]',
            i > 0 && '-ml-2.5',
          )}
        />
      ))}
    </div>
  )
}
