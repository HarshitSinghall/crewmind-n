import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * A portrait card that opens into a detail panel.
 *
 * Adapted from the `expandable-profile-card` item in the watermelon.sh shadcn
 * registry. Four things changed in the port, and all four were necessary:
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
 *  3. NO PHOTO. Every team member currently has `avatar: undefined`, so an
 *     image-led card would be a grid of empty rectangles. Without a portrait
 *     it falls back to initials on a token gradient, at the same size, so the
 *     grid does not reflow the day real headshots land.
 *  4. NO MOTION LIBRARY, AND NO SHARED-ELEMENT MORPH. The original pairs the
 *     trigger and the panel under one `layoutId` so the thumbnail appears to
 *     grow into the modal. That is the whole reason the component is
 *     interesting, and it did not survive the port.
 *
 * WHY THE MORPH IS GONE. With both nodes mounted under the same `layoutId`,
 * motion locked the panel to the trigger's measured box — it opened at the
 * card's 373x467 instead of expanding — left the trigger stuck at
 * `opacity: 0` after closing, and never called `safeToRemove`. That last one
 * mattered: the exiting `fixed inset-0` overlay stayed mounted with
 * `pointer-events: auto`, sitting invisibly over the whole page. It
 * reproduced portalled and inline, with and without a keyed motion root, and
 * with and without the nested `layoutId`s.
 *
 * With the morph unavailable, a 44KB animation dependency was buying a spring
 * and a fade, which does not pay for itself — and this codebase has a
 * measured decision against animation libraries. So the enter is the same
 * mount-then-transition pattern `useReveal` already uses, on tokens, and the
 * close unmounts immediately. Nothing can be left behind, because there is
 * nothing to wait for.
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

export function ExpandableProfileCard({
  id,
  title,
  subtitle,
  initials,
  imageSrc,
  children,
  className,
}: ExpandableProfileCardProps) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  // Derived from the caller's stable id, so the dialog's label survives
  // re-renders and is legible in the DOM.
  const headingId = `profile-${id}-title`

  /*
    Mount first at the "from" state, then flip to the "to" state on the next
    frame so the browser has something to transition between. Same trick
    useReveal uses. Under reduced motion it starts settled.
  */
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (!open) {
      setEntered(false)
      return
    }
    if (reduced) {
      setEntered(true)
      return
    }
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [open, reduced])

  const close = useCallback(() => setOpen(false), [])

  /* Escape closes, Tab stays inside. */
  useEffect(() => {
    if (!open) return

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
  }, [open, close])

  /* Lock the page behind the panel, and give focus to it. */
  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const firstFocusable =
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE) ?? null
    firstFocusable?.focus()

    return () => {
      document.body.style.overflow = previous
      // Send focus back where it came from, not to the top of the document.
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${title}, ${subtitle} — read more`}
        className={cn(
          'group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] text-left shadow-[var(--shadow-1)] transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-2)]',
          className,
        )}
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
        wide inside the card's own column. The portal is what makes `fixed`
        mean the viewport.
      */}
      {typeof document !== 'undefined' &&
        createPortal(
          open && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity ease-[var(--ease-out-expo)] sm:p-6"
              style={{
                opacity: entered ? 1 : 0,
                transitionDuration: reduced
                  ? 'var(--dur-fast)'
                  : 'var(--dur-base)',
              }}
            >
              <div
                onClick={close}
                className="absolute inset-0 bg-[color-mix(in_oklch,var(--bg)_78%,transparent)] backdrop-blur-md"
              />

              <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={headingId}
                className="relative z-10 flex max-h-[85vh] w-full max-w-[54rem] flex-col overflow-hidden rounded-[var(--r-xl)] border border-[var(--border-strong)] bg-[var(--surface-1)] shadow-[var(--shadow-3)] transition-transform ease-[var(--ease-spring)] md:flex-row"
                style={{
                  transform: entered ? 'none' : 'translateY(12px) scale(0.97)',
                  transitionDuration: reduced
                    ? 'var(--dur-fast)'
                    : 'var(--dur-base)',
                }}
              >
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
          ),
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
