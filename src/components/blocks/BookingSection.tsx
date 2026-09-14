import { ExternalLink } from 'lucide-react'
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
  Calendly, embedded as a plain iframe and loaded near the viewport.

  No widget.js. Calendly's script is ~100KB and mostly exists to auto-size the
  frame and emit postMessage events; the booking flow itself works in a bare
  iframe. Native lazy loading keeps it out of the initial page load while
  removing the extra click when a visitor reaches the booking section.

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
            {(
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
