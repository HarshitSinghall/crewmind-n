import { Star } from 'lucide-react'
import type { RatingSource } from '@/content/types'

interface RatingBadgeProps {
  rating: RatingSource
}

export function RatingBadge({ rating }: RatingBadgeProps) {
  const score = Number(rating.score)
  const full = Math.floor(score)

  return (
    <a
      href={rating.href}
      target={rating.href.startsWith('http') ? '_blank' : undefined}
      rel={rating.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group inline-flex items-center gap-3 rounded-[var(--r-md)] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-4 py-2.5 transition-colors duration-[var(--dur-fast)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]"
    >
      <span className="text-[0.8125rem] font-medium text-[var(--text-2)] transition-colors group-hover:text-[var(--text-1)]">
        {rating.platform}
      </span>
      <span aria-hidden="true" className="h-4 w-px bg-[var(--border-subtle)]" />
      <span className="flex items-center gap-1.5">
        <span className="flex" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              size={12}
              strokeWidth={0}
              className={
                i < full
                  ? 'fill-[var(--warn)]'
                  : i === full && score % 1 >= 0.5
                    ? 'fill-[var(--warn)] opacity-50'
                    : 'fill-[var(--border-strong)]'
              }
            />
          ))}
        </span>
        <span className="tnum font-mono text-[0.8125rem] font-semibold text-[var(--text-1)]">
          {rating.score}
        </span>
      </span>
      <span className="sr-only">
        Rated {rating.score} out of 5 on {rating.platform}
      </span>
    </a>
  )
}
