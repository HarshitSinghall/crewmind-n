/**
 * FLIP transform maths.
 *
 * FLIP is First, Last, Invert, Play: measure an element where it starts,
 * let it land where it belongs, then apply the transform that visually snaps
 * it back to the start and animate that transform away. The browser only ever
 * animates `transform`, so it stays on the compositor and never re-lays out.
 *
 * The maths is pure, so it lives here and is unit-tested. The DOM work — when
 * to measure, when to force a reflow, when to hand control back — lives in the
 * component, where it can be verified in a real browser.
 */

export interface Rect {
  top: number
  left: number
  width: number
  height: number
}

export interface Flip {
  scaleX: number
  scaleY: number
  dx: number
  dy: number
  /**
   * Applied to the moving element, with `transform-origin: top left`.
   * Origin matters: the maths assumes the element scales from its top-left
   * corner, which is what makes `dx`/`dy` a plain corner-to-corner delta.
   */
  transform: string
  /**
   * Applied to the element's content wrapper. Undoes the container's scale so
   * text and images keep their true proportions for the whole animation —
   * without it a panel squashed to 0.45x horizontally renders visibly
   * condensed type on the first frame.
   */
  counterTransform: string
}

/** A scale factor small enough to be a rounding artefact rather than a size. */
const MIN_SCALE = 0.0001

/** Guards a ratio against zero, negative and non-finite inputs. */
function ratio(from: number, to: number): number {
  if (!Number.isFinite(from) || !Number.isFinite(to)) return 1
  if (to <= 0 || from <= 0) return 1
  const value = from / to
  return value < MIN_SCALE ? MIN_SCALE : value
}

/**
 * The transform that makes `last` look like it is sitting at `first`.
 *
 * Returns the identity transform when the two rects already match, so a
 * no-op morph costs nothing and never emits `scale(1, 1)` churn.
 */
export function computeFlip(first: Rect, last: Rect): Flip {
  const scaleX = ratio(first.width, last.width)
  const scaleY = ratio(first.height, last.height)

  const dx = Number.isFinite(first.left - last.left) ? first.left - last.left : 0
  const dy = Number.isFinite(first.top - last.top) ? first.top - last.top : 0

  return {
    scaleX,
    scaleY,
    dx,
    dy,
    transform: `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`,
    counterTransform: `scale(${1 / scaleX}, ${1 / scaleY})`,
  }
}

/** True when the morph would not move anything, to sub-pixel tolerance. */
export function isIdentity(flip: Flip, tolerance = 0.5): boolean {
  return (
    Math.abs(flip.dx) < tolerance &&
    Math.abs(flip.dy) < tolerance &&
    Math.abs(flip.scaleX - 1) < 0.001 &&
    Math.abs(flip.scaleY - 1) < 0.001
  )
}
