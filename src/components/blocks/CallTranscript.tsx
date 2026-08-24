import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import type { PriyaContent } from '@/content/types'

/**
 * The sample call.
 *
 * A description list: speaker is the term, the line is the definition. That
 * is what a transcript is, and it means a screen reader reads "प्रिया — line"
 * rather than two unrelated runs of text.
 *
 * `lang="hi"` on every Devanagari line is load-bearing, not decoration.
 * Without it the line is read with an English voice and is incomprehensible.
 *
 * AI and customer turns differ by alignment AND by a labelled speaker AND by
 * surface — never by colour alone, so the distinction survives greyscale.
 *
 * The audio player renders only when `recordingUrl` is a real file. It is
 * null and must stay null until a recording is actually chosen; while it is
 * null the deck labels this transcript representative rather than actual.
 */
export function CallTranscript({ call }: { call: PriyaContent['call'] }) {
  return (
    <Section id="call" divided aria-labelledby="call-title">
      <Container width="narrow">
        <Reveal>
          <Eyebrow className="mb-5">{call.eyebrow}</Eyebrow>
          <Heading level={2} size="xl" id="call-title" className="mb-4">
            {call.title}
          </Heading>
          <Text size="lg">{call.sub}</Text>
        </Reveal>

        {call.recordingUrl && (
          <Reveal index={1}>
            <audio
              controls
              preload="none"
              src={call.recordingUrl}
              className="mt-8 w-full"
            >
              {/* The transcript below is the caption, and always renders. */}
            </audio>
          </Reveal>
        )}

        <Reveal index={1}>
          <dl className="mt-10 flex flex-col gap-5">
            {call.turns.map((turn) => {
              const ai = turn.role === 'ai'
              return (
                <div
                  key={turn.id}
                  className={cn(
                    'flex max-w-[86%] flex-col gap-1.5',
                    ai ? 'items-start self-start' : 'items-start self-end',
                  )}
                >
                  <dt className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--text-3)]">
                    <span lang={turn.lang}>{turn.who}</span>
                    {ai && <Badge tone="accent">AI</Badge>}
                  </dt>
                  <dd
                    lang={turn.lang}
                    className={cn(
                      'rounded-[var(--r-lg)] border px-4 py-3 text-[0.9375rem] leading-[1.6]',
                      ai
                        ? 'border-[color-mix(in_oklch,var(--accent)_28%,transparent)] bg-[color-mix(in_oklch,var(--accent)_9%,transparent)] text-[var(--text-1)]'
                        : 'border-[var(--border-subtle)] bg-[var(--surface-2)] text-[var(--text-2)]',
                    )}
                  >
                    {turn.line}
                  </dd>
                </div>
              )
            })}
          </dl>
        </Reveal>

        <Reveal index={2}>
          <p className="mt-10 border-t border-[var(--border-subtle)] pt-6 text-[0.9375rem] leading-[1.65] text-[var(--text-2)]">
            {call.caption}
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
