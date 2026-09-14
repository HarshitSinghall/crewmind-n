import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { computeFlip, isIdentity } from '@/lib/flip'
import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * A portrait card that morphs into a detail panel when opened.
 *
 * Adapted from the `expandable-profile-card` item in the watermelon.sh shadcn
 * registry. Three things changed in the port:
 *
 *  1. COLOUR. The original is written against shadcn's semantic classes
 *     (`bg-card`, `text-foreground`, `border-border`, `text-primary`). None of
 *     those exist in this codebase, so they would have resolved to nothing —
 *     transparent borders and inherited text. Everything here is on our own
 *     tokens and works in both themes.
 *  2. KEYBOARD AND SCREEN READERS. The original trigger is a <div onClick>,
 *     which no keyboard can reach, and the panel is a bare <div> with no
 *     dialog role, no focus management and no Escape. This is a real modal:
 *     it traps focus, restores it on close, locks the page behind it, and
 *     labels itself from the person's name.
 *  3. PHOTO FALLBACK. Approved portraits render when supplied; initials use
 *     the same frame when a future profile has no image, so the grid does not
 *     reflow as team assets are added.
 *
 * THE MORPH IS HAND-ROLLED FLIP, NOT A LIBRARY.
 *
 * The original gets its shared-element effect from motion's `layoutId`. That
 * was tried first and appeared badly broken — panel stuck at the trigger's
 * measured box, trigger stranded at `opacity: 0`, exit never completing, so
 * an invisible `position: fixed` overlay stayed over the page swallowing
 * clicks. In fairness to motion, most of that was probably an artefact of
 * where it was being tested: an automated browser tab reports
 * `visibilityState: 'hidden'`, and Chrome pauses `requestAnimationFrame`
 * entirely in hidden tabs, so any rAF-driven animation freezes on frame zero
 * and never signals completion. motion may well behave correctly in a real
 * foreground tab.
 *
 * FLIP is kept anyway, on its own merits: no dependency in a codebase that
 * has a measured decision against animation libraries, maths that is pure and
 * unit-tested (`@/lib/flip`), and — see the fallback timer below — an
 * end state that is guaranteed even when rAF never runs at all. That last
 * property is what the library version could not offer here.
 *
 * The technique: the panel lays out where it belongs, we measure both rects,
 * apply the transform that makes the panel sit exactly on top of the card,
 * then animate that transform away. Only `transform` and `opacity` animate,
 * so it stays on the compositor.
 *
 * Two details that are load-bearing:
 *
 *  - `transform-origin: top left` on both the panel and its content wrapper.
 *    The maths treats `dx`/`dy` as a corner-to-corner delta; a centre origin
 *    makes the translation wrong by half the size difference.
 *  - The content wrapper carries the INVERSE scale. Without it the panel's
 *    text renders visibly condensed for the length of the animation, because
 *    the container is squashed to roughly 0.45x horizontally on frame one.
 */

interface ExpandableProfileCardProps {
  /** Stable and unique on the page. */
  id: string
  title: string
  subtitle: string
  /** Two-letter fallback shown when there is no portrait. */
  initials: string
  imageSrc?: string
  /** The detail shown in the open panel. */
  children: ReactNode
  className?: string
}

/** Elements that can hold focus inside the panel. */
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Morph duration. Defined here rather than as a token because the same number
 * has to drive both the CSS transition and the JavaScript fallback timer, and
 * two sources for one duration is how animations end up stuck half-finished.
 */
const MORPH_MS = 420

type Phase = 'closed' | 'opening' | 'open' | 'closing'

export function ExpandableProfileCard({
  id,
  title,
  subtitle,
  initials,
  imageSrc,
  children,
  className,
}: ExpandableProfileCardProps) {
  const [phase, setPhase] = useState<Phase>('closed')
  const reduced = useReducedMotion()

  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  /** The card's rect at the moment the morph started. FLIP's "First". */
  const firstRect = useRef<DOMRect | null>(null)

  const mounted = phase !== 'closed'
  const headingId = `profile-${id}-title`

  const open = useCallback(() => {
    firstRect.current = triggerRef.current?.getBoundingClientRect() ?? null
    setPhase('opening')
  }, [])

  const close = useCallback(() => {
    // Re-measure: the page may have scrolled while the panel was open, and
    // morphing back to a stale rect sends the panel to where the card was.
    firstRect.current = triggerRef.current?.getBoundingClientRect() ?? null
    setPhase((p) => (p === 'closed' ? p : 'closing'))
  }, [])

  /* ---- The morph itself ------------------------------------------------- */

  useLayoutEffect(() => {
    if (phase !== 'opening' && phase !== 'closing') return

    const panel = panelRef.current
    const content = contentRef.current
    const overlay = overlayRef.current
    const settle = () => setPhase(phase === 'opening' ? 'open' : 'closed')

    if (reduced || !panel || !content || !firstRect.current) {
      settle()
      return
    }

    // "Last": where the panel actually sits, with no transform applied.
    panel.style.transition = 'none'
    content.style.transition = 'none'
    panel.style.transform = ''
    content.style.transform = ''

    const last = panel.getBoundingClientRect()
    const flip = computeFlip(firstRect.current, last)

    if (isIdentity(flip)) {
      settle()
      return
    }

    const opening = phase === 'opening'

    // "Invert": snap the panel onto the card, untransitioned.
    panel.style.transformOrigin = 'top left'
    content.style.transformOrigin = 'top left'
    panel.style.transform = opening ? flip.transform : 'none'
    content.style.transform = opening ? flip.counterTransform : 'none'
    content.style.opacity = opening ? '0' : '1'
    if (overlay) {
      overlay.style.transition = 'none'
      overlay.style.opacity = opening ? '0' : '1'
    }

    // Flush the inverted state to the DOM, otherwise the browser coalesces it
    // with the "Play" state below and nothing animates at all.
    void panel.getBoundingClientRect()

    /*
      Armed BEFORE the frame is requested, not inside it.

      requestAnimationFrame does not run in a background tab — Chrome pauses
      it entirely when `document.visibilityState` is 'hidden'. If the fallback
      is armed inside the callback, then a tab backgrounded between the invert
      and the first frame never schedules it, and the panel is left frozen in
      the inverted state: scaled down onto the card, with the real content
      clipped inside it. setTimeout still fires when hidden (throttled to
      about a second), so this is what guarantees the morph always ends.
    */
    let fallback = window.setTimeout(settle, MORPH_MS + 160)

    const frame = requestAnimationFrame(() => {
      // "Play".
      const ease = 'var(--ease-out-expo)'
      panel.style.transition = `transform ${MORPH_MS}ms ${ease}`
      content.style.transition = `transform ${MORPH_MS}ms ${ease}, opacity ${Math.round(MORPH_MS * 0.6)}ms ease-out`
      panel.style.transform = opening ? 'none' : flip.transform
      content.style.transform = opening ? 'none' : flip.counterTransform
      content.style.opacity = opening ? '1' : '0'
      if (overlay) {
        overlay.style.transition = `opacity ${MORPH_MS}ms ${ease}`
        overlay.style.opacity = opening ? '1' : '0'
      }

      // Re-arm from the moment the animation actually starts. Never trust
      // transitionend alone: an interrupted transition, or a property that
      // does not end up changing, fires nothing at all.
      window.clearTimeout(fallback)
      fallback = window.setTimeout(settle, MORPH_MS + 80)
    })

    const onEnd = (e: TransitionEvent) => {
      if (e.target !== panel || e.propertyName !== 'transform') return
      window.clearTimeout(fallback)
      settle()
    }
    panel.addEventListener('transitionend', onEnd)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(fallback)
      panel.removeEventListener('transitionend', onEnd)
    }
  }, [phase, reduced])

  /* Clear the inline styles once settled, so nothing is left mid-transform. */
  useLayoutEffect(() => {
    if (phase !== 'open') return
    for (const el of [panelRef.current, contentRef.current, overlayRef.current]) {
      if (!el) continue
      el.style.transition = ''
      el.style.transform = ''
      el.style.transformOrigin = ''
      el.style.opacity = ''
    }
  }, [phase])

  /* ---- Modal behaviour -------------------------------------------------- */

  /* Escape closes, Tab stays inside. */
  useEffect(() => {
    if (!mounted) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab') return

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!nodes || nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mounted, close])

  /* Lock the page behind the panel, and give focus to it. */
  useEffect(() => {
    if (!mounted) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    return () => {
      document.body.style.overflow = previous
      // Send focus back where it came from, not to the top of the document.
      // The trigger is faded but never hidden, so it is still focusable.
      triggerRef.current?.focus()
    }
  }, [mounted])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-label={`${title}, ${subtitle} — read more`}
        className={cn(
          'group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] text-left shadow-[var(--shadow-1)] transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-2)]',
          className,
        )}
        style={{
          // Faded rather than hidden while the panel stands in for it — a
          // `visibility: hidden` element cannot take focus back on close.
          opacity: mounted ? 0 : 1,
          transitionDuration: mounted ? '120ms' : 'var(--dur-base)',
        }}
      >
        <Portrait imageSrc={imageSrc} initials={initials} title={title} />

        {/*
          Spans, not <p> and <h3>. A <button> may only contain phrasing
          content, so the heading lives in the dialog and the trigger carries
          its accessible name through aria-label instead.
        */}
        <span className="absolute inset-x-0 bottom-0 block p-5">
          <span
            className={cn(
              'mb-1.5 block font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em]',
              imageSrc ? 'text-white/80' : 'text-[var(--accent)]',
            )}
          >
            {subtitle}
          </span>
          <span
            className={cn(
              'block font-display text-[1.0625rem] font-semibold tracking-[-0.02em]',
              imageSrc ? 'text-white' : 'text-[var(--text-1)]',
            )}
          >
            {title}
          </span>
        </span>
      </button>

      {/*
        Portalled to <body>. The card sits inside a grid <li> whose ancestors
        can establish a containing block, and a `position: fixed` panel then
        sizes against that ancestor rather than the viewport — it opened 312px
        wide inside the card's own column. FLIP is unaffected by the portal:
        both rects are read in viewport coordinates.
      */}
      {typeof document !== 'undefined' &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <div
              ref={overlayRef}
              onClick={close}
              className="absolute inset-0 bg-[color-mix(in_oklch,var(--bg)_78%,transparent)] backdrop-blur-md"
            />

            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={headingId}
              className="relative z-10 flex max-h-[85vh] w-full max-w-[54rem] flex-col overflow-hidden rounded-[var(--r-xl)] border border-[var(--border-strong)] bg-[var(--surface-1)] shadow-[var(--shadow-3)] md:flex-row"
            >
              <div ref={contentRef} className="flex w-full flex-col md:flex-row">
                <button
                  type="button"
                  onClick={close}
                  className="absolute right-4 top-4 z-20 inline-flex h-8 w-8 items-center justify-center rounded-[var(--r-full)] border border-[var(--border-subtle)] bg-[var(--surface-2)] text-[var(--text-2)] transition-colors duration-[var(--dur-fast)] hover:border-[var(--border-strong)] hover:text-[var(--text-1)]"
                >
                  <X size={15} aria-hidden="true" />
                  <span className="sr-only">Close</span>
                </button>

                <div className="relative h-56 w-full shrink-0 overflow-hidden md:h-auto md:w-[42%] md:self-stretch">
                  <Portrait
                    imageSrc={imageSrc}
                    initials={initials}
                    title={title}
                    large
                  />
                </div>

                <div className="flex w-full flex-col overflow-y-auto p-6 sm:p-8">
                  <p className="mb-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                    {subtitle}
                  </p>
                  <h3
                    id={headingId}
                    className="mb-6 border-b border-[var(--border-subtle)] pb-5 font-display text-step-3 font-semibold tracking-[-0.028em] text-[var(--text-1)]"
                  >
                    {title}
                  </h3>

                  <div className="text-[0.9375rem] leading-[1.65] text-[var(--text-2)]">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

/**
 * The portrait itself. A photo when there is one, initials on a token
 * gradient when there is not.
 *
 * The scrim is only drawn over a real photo — a dark gradient under initials
 * would be unreadable in the light theme, and the initials path already sits
 * on token surfaces that carry their own contrast.
 */
function Portrait({
  imageSrc,
  initials,
  title,
  large = false,
}: {
  imageSrc?: string
  initials: string
  title: string
  large?: boolean
}) {
  if (imageSrc) {
    return (
      <>
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
        />
      </>
    )
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[var(--surface-3)] to-[var(--surface-1)]"
    >
      <span
        className={cn(
          'font-display font-semibold tracking-[-0.03em] text-[var(--text-3)]',
          large ? 'text-step-6' : 'text-step-5',
        )}
      >
        {initials.slice(0, 2).toUpperCase()}
      </span>
    </div>
  )
}
