import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface UseRevealOptions {
  /** Fraction of the element that must be visible before firing. */
  threshold?: number
  /** Fire only the first time it enters. */
  once?: boolean
}

interface UseRevealResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>
  /** True once the element should be shown in its resting state. */
  shown: boolean
  /** True when motion is suppressed — consumers should skip transforms. */
  reduced: boolean
}

/**
 * Intersection-observer reveal that respects `prefers-reduced-motion`.
 *
 * When motion is reduced this returns `shown: true` immediately, so the
 * content is never hidden behind an animation that will not run.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  { threshold = 0.2, once = true }: UseRevealOptions = {},
): UseRevealResult<T> {
  const ref = useRef<T | null>(null)
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    // Reduced motion, or no observer support: show it and stop.
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setShown(false)
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once, reduced])

  return { ref, shown, reduced }
}
