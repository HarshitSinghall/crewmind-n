import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Counts from 0 to `target` once `active` flips true.
 * Under reduced motion it jumps straight to the target.
 */
export function useCountUp(target: number, active: boolean, durationMs = 1200): number {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setValue(target)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1)
      // easeOutExpo — fast start, gentle settle.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setValue(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active, durationMs, reduced])

  return value
}
