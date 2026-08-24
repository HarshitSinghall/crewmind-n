import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface MarqueeProps {
  children: ReactNode
  /** Full loop duration. Longer = slower. */
  durationSec?: number
  className?: string
}

/**
 * Seamless horizontal loop.
 *
 * The content is rendered twice so the track can translate -50% and wrap
 * without a visible seam — but the second copy is `aria-hidden`, so screen
 * readers and the accessibility tree only ever encounter each item once.
 * The reference site solves this by literally duplicating its review data,
 * which doubles the DOM and reads every testimonial twice aloud.
 *
 * Pauses on hover and on focus-within so keyboard users can reach links
 * inside it. Fully disabled under reduced motion (see global.css).
 */
export function Marquee({ children, durationSec = 60, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        'marquee group relative flex overflow-hidden',
        // Fade the edges so items enter and leave instead of being clipped.
        '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <div
        className="marquee-track flex w-max shrink-0 gap-4"
        style={{ '--marquee-dur': `${durationSec}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 gap-4">{children}</div>
        <div className="flex shrink-0 gap-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
