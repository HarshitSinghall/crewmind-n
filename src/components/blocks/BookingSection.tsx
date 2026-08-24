import { CalendarCheck } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import { BRAND } from '@/content/site'
import type { HomeContent } from '@/content/types'

export function BookingSection({ booking }: { booking: HomeContent['booking'] }) {
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
            {/*
              Calendly embed slot. Kept as an explicit placeholder rather than
              a live third-party script so the page has zero external requests
              until the real URL is configured in site.ts.
            */}
            <div className="flex min-h-[22rem] flex-col items-center justify-center gap-4 p-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-[var(--r-full)] border border-[var(--border-subtle)] bg-[var(--surface-2)]">
                <CalendarCheck size={20} className="text-[var(--accent)]" />
              </span>
              <p className="font-mono text-[0.8125rem] text-[var(--text-3)]">
                {/* TODO: replace with the Calendly inline embed. */}
                Scheduler embed goes here
              </p>
              <a
                href={BRAND.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.875rem] font-medium text-[var(--accent)] underline decoration-[var(--accent-dim)] underline-offset-4 transition-colors hover:text-[var(--text-1)]"
              >
                Open the scheduler in a new tab
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
