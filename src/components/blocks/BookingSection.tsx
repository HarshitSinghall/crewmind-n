import { useState } from 'react'
import { CalendarCheck, ExternalLink } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import { BRAND } from '@/content/site'
import { useTheme } from '@/lib/useTheme'
import type { HomeContent } from '@/content/types'

/*
  Calendly, embedded as a plain iframe and loaded on click.

  No widget.js. Calendly's script is ~100KB and mostly exists to auto-size the
  frame and emit postMessage events; the booking flow itself works in a bare
  iframe. This codebase has a standing objection to third-party weight, and
  the scheduler is used by a small fraction of visitors, so it does not get to
  tax everyone's first load.

  Click-to-load, not load-on-scroll: until someone asks for it there are zero
  external requests, no Calendly cookies, and nothing for a consent banner to
  be about. That was the intent of the placeholder this replaces.

  The token that was used to look this URL up is NOT here and must never be.
  The scheduling URL is public; a Calendly PAT in a static bundle would hand
  the account to every visitor.
*/

/**
 * Hex approximations of the canvas tokens, for Calendly's colour parameters.
 * The API takes hex only, so oklch tokens cannot be passed through — these
 * are matched to `--bg` / `--text-1` / `--cta` and the backgrounds are the
 * same values index.html already uses for `theme-color`.
 */
const EMBED_COLOURS = {
  dark: { background: '0c0e13', text: 'f4f5f7', primary: 'f2a344' },
  light: { background: 'fbfbfc', text: '2a2e35', primary: 'ef9f42' },
} as const

function embedUrl(theme: 'dark' | 'light'): string {
  const c = EMBED_COLOURS[theme]
  const params = new URLSearchParams({
    hide_gdpr_banner: '1',
    hide_landing_page_details: '1',
    background_color: c.background,
    text_color: c.text,
    primary_color: c.primary,
  })
  return `${BRAND.calendly}?${params.toString()}`
}

export function BookingSection({ booking }: { booking: HomeContent['booking'] }) {
  const [live, setLive] = useState(false)
  const { theme } = useTheme()

  return (
    <Section id="book" spacing="default" divided aria-labelledby="book-title">
      <Container width="narrow">
        <Reveal>
          <div className="text-center">
            <div className="mb-5 flex justify-center">
              <Eyebrow>{booking.prompt}</Eyebrow>
            </div>
            <Heading level={2} size="xl" id="book-title" className="mb-4">
              {booking.title}
            </Heading>
            <Text size="lg" className="mx-auto max-w-[38rem]">
              {booking.sub}
            </Text>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="mt-10 overflow-hidden rounded-[var(--r-xl)] border border-[var(--border-subtle)] bg-[var(--surface-1)]">
            {live ? (
              /*
                Keyed on the theme so a toggle reloads the frame with matching
                colours — Calendly reads them from the URL at load and has no
                way to restyle in place.
              */
              <iframe
                key={theme}
                src={embedUrl(theme)}
                title={`Book a call with ${BRAND.name}`}
                loading="lazy"
                className="h-[44rem] w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setLive(true)}
                className="group flex min-h-[22rem] w-full cursor-pointer flex-col items-center justify-center gap-4 p-10 text-center transition-colors duration-[var(--dur-base)] hover:bg-[var(--surface-2)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-[var(--r-full)] border border-[var(--border-subtle)] bg-[var(--surface-2)] transition-colors duration-[var(--dur-base)] group-hover:border-[var(--border-strong)]">
                  <CalendarCheck size={20} className="text-[var(--accent)]" />
                </span>
                <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-[var(--text-1)]">
                  Load the scheduler
                </span>
                <span className="max-w-[26rem] text-[0.875rem] leading-[1.6] text-[var(--text-3)]">
                  Opens Calendly here on this page. Nothing is requested from
                  them until you click.
                </span>
              </button>
            )}
          </div>
        </Reveal>

        <Reveal index={2}>
          <p className="mt-5 text-center text-[0.8125rem] text-[var(--text-3)]">
            <a
              href={BRAND.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors duration-[var(--dur-fast)] hover:text-[var(--text-1)]"
            >
              Prefer a new tab? Open the scheduler directly
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
