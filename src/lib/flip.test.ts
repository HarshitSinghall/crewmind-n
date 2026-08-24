import { describe, expect, it } from 'vitest'
import { computeFlip, isIdentity, type Rect } from './flip'

/** The real case: a 373x467 portrait card morphing into an 838x420 panel. */
const CARD: Rect = { top: 429, left: 263, width: 373, height: 467 }
const PANEL: Rect = { top: 190, left: 420, width: 838, height: 420 }

describe('computeFlip', () => {
  it('scales the panel down to the card it came from', () => {
    const flip = computeFlip(CARD, PANEL)
    expect(flip.scaleX).toBeCloseTo(373 / 838, 5)
    expect(flip.scaleY).toBeCloseTo(467 / 420, 5)
  })

  it('translates corner to corner, not centre to centre', () => {
    // transform-origin is top left, so the delta is a plain corner delta.
    const flip = computeFlip(CARD, PANEL)
    expect(flip.dx).toBe(263 - 420)
    expect(flip.dy).toBe(429 - 190)
  })

  it('emits a transform string in translate-then-scale order', () => {
    // Order matters: scaling first would scale the translation too.
    const flip = computeFlip(CARD, PANEL)
    expect(flip.transform).toMatch(/^translate\(.+\) scale\(.+\)$/)
    expect(flip.transform).toContain(`translate(${flip.dx}px, ${flip.dy}px)`)
  })

  it('counter-transform is the exact inverse of the scale', () => {
    const flip = computeFlip(CARD, PANEL)
    expect(flip.counterTransform).toBe(
      `scale(${1 / flip.scaleX}, ${1 / flip.scaleY})`,
    )
    // Container scale times content scale must come back to 1, or type is
    // rendered condensed for the length of the animation.
    const [cx, cy] = flip.counterTransform
      .replace(/scale\(|\)/g, '')
      .split(',')
      .map(Number)
    expect(flip.scaleX * cx).toBeCloseTo(1, 10)
    expect(flip.scaleY * cy).toBeCloseTo(1, 10)
  })

  it('is the identity when the rects already match', () => {
    const flip = computeFlip(CARD, CARD)
    expect(flip.scaleX).toBe(1)
    expect(flip.scaleY).toBe(1)
    expect(flip.dx).toBe(0)
    expect(flip.dy).toBe(0)
    expect(isIdentity(flip)).toBe(true)
  })

  it('reports a real morph as not the identity', () => {
    expect(isIdentity(computeFlip(CARD, PANEL))).toBe(false)
  })

  describe('degenerate measurements never produce NaN or Infinity', () => {
    const zero: Rect = { top: 0, left: 0, width: 0, height: 0 }

    it('survives a zero-sized target', () => {
      // Happens if the panel is measured before layout — a naive ratio here
      // yields Infinity and the element vanishes.
      const flip = computeFlip(CARD, zero)
      expect(flip.scaleX).toBe(1)
      expect(flip.scaleY).toBe(1)
      expect(flip.transform).not.toMatch(/NaN|Infinity/)
      expect(flip.counterTransform).not.toMatch(/NaN|Infinity/)
    })

    it('survives a zero-sized source', () => {
      const flip = computeFlip(zero, PANEL)
      expect(flip.scaleX).toBe(1)
      expect(flip.scaleY).toBe(1)
      expect(flip.transform).not.toMatch(/NaN|Infinity/)
    })

    it('survives non-finite input', () => {
      const bad = { top: NaN, left: NaN, width: NaN, height: NaN }
      const flip = computeFlip(bad, PANEL)
      expect(flip.transform).not.toMatch(/NaN|Infinity/)
      expect(flip.counterTransform).not.toMatch(/NaN|Infinity/)
      expect(flip.dx).toBe(0)
      expect(flip.dy).toBe(0)
    })

    it('never emits a scale of exactly zero', () => {
      // A zero scale is unrecoverable: the inverse is Infinity.
      const sliver: Rect = { top: 0, left: 0, width: 0.00001, height: 0.00001 }
      const flip = computeFlip(sliver, PANEL)
      expect(flip.scaleX).toBeGreaterThan(0)
      expect(flip.scaleY).toBeGreaterThan(0)
      expect(flip.counterTransform).not.toMatch(/Infinity/)
    })
  })
})
