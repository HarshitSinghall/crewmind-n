import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import type { PriyaContent, RaceLane } from '@/content/types'

/**
 * The same lead down two lanes.
 *
 * Two ordered lists rather than a table: the rows are not aligned across
 * lanes — one resolves in 101 seconds and the other in fourteen hours — and a
 * table would assert a row relationship that does not exist.
 *
 * The fast lane is accented; the slow lane is muted. On narrow screens they
 * stack with the slow lane first, so the reader meets his own process before
 * he is shown the alternative.
 */
export function TimeRace({ race }: { race: PriyaContent['race'] }) {
  return (
    <Section id="race" divided aria-labelledby="race-title">
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            <Eyebrow className="mb-5">{race.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id="race-title">
              {race.title.lead} <Emphasis>{race.title.emphasis}</Emphasis>
              {race.title.trail}
            </Heading>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {race.lanes.map((lane, i) => (
            <Lane key={lane.id} lane={lane} fast={i === 1} index={i} />
          ))}
        </div>

        <Reveal index={2}>
          <div className="mt-14 max-w-[42rem]">
            <p className="font-display text-step-2 leading-snug tracking-[-0.02em] text-[var(--text-1)]">
              {race.resolve}
            </p>
            <p className="mt-4 text-step-1 leading-[1.55] text-[var(--text-2)]">
              {race.closing}
            </p>
            <p
              lang="hi"
              className="mt-8 border-l-2 border-[var(--accent-dim)] pl-6 font-serif text-step-2 leading-[1.5] text-[var(--accent)] italic"
            >
              {race.proverb}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

function Lane({
  lane,
  fast,
  index,
}: {
  lane: RaceLane
  fast: boolean
  index: number
}) {
  const labelId = `race-lane-${lane.id}`

  return (
    <Reveal index={index}>
      <div
        className={cn(
          'h-full rounded-[var(--r-lg)] border p-6 sm:p-7',
          fast
            ? 'border-[var(--border-strong)] bg-[var(--surface-2)] shadow-[var(--shadow-2)]'
            : 'border-[var(--border-subtle)] bg-[var(--surface-1)]',
        )}
      >
        <p
          id={labelId}
          className={cn(
            'font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em]',
            fast ? 'text-[var(--accent)]' : 'text-[var(--text-3)]',
          )}
        >
          {lane.label}
        </p>

        <ol aria-labelledby={labelId} className="mt-6 flex flex-col gap-5">
          {lane.steps.map((step, i) => (
            <li key={`${lane.id}-${i}`} className="flex gap-4">
              <span
                className={cn(
                  'tnum w-[3.25rem] shrink-0 pt-0.5 font-mono text-[0.75rem]',
                  fast ? 'text-[var(--accent)]' : 'text-[var(--text-3)]',
                )}
              >
                {step.clock}
              </span>
              <span
                className={cn(
                  'text-[0.9375rem] leading-[1.55]',
                  step.clock
                    ? 'text-[var(--text-2)]'
                    : 'font-medium text-[var(--text-1)]',
                )}
              >
                {step.text}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  )
}
