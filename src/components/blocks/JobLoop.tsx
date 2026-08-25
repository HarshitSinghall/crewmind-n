import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import type { JobLoopSpec, JobPhase } from '@/content/types'

/**
 * The job description — fourteen stages, in the order they happen.
 *
 * Fourteen list items is enough to become wallpaper, so they are grouped into
 * three phases with the phase label held in its own column. The numbering runs
 * continuously across the phases rather than restarting, because the argument
 * is that this is ONE job with fourteen parts, not three separate features.
 *
 * Each phase is its own `<ol start=…>`, so the sequence a screen reader hears
 * matches the numbers a sighted reader sees. The grouping is a real <section>
 * per phase with its label as the accessible name, so the phase headings are
 * navigable instead of being decorative text floating beside a list.
 */
export function JobLoop({ job }: { job: JobLoopSpec }) {
  // Running offset so phase two starts at 07 rather than back at 01.
  let counter = 0

  return (
    <Section id="job" divided aria-labelledby="job-title">
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            <Eyebrow className="mb-5">{job.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id="job-title" className="mb-4">
              {job.title}
            </Heading>
            <Text size="lg">{job.sub}</Text>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-12">
          {job.phases.map((phase, i) => {
            const start = counter + 1
            counter += phase.stages.length
            return <Phase key={phase.id} phase={phase} start={start} index={i} />
          })}
        </div>

        <Reveal>
          <p className="mt-12 max-w-[46rem] font-display text-[1.375rem] font-semibold leading-[1.35] tracking-[-0.018em] text-[var(--text-1)] sm:text-[1.5rem]">
            {job.closing}
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

function Phase({
  phase,
  start,
  index,
}: {
  phase: JobPhase
  start: number
  index: number
}) {
  const labelId = `job-phase-${phase.id}`

  return (
    <Reveal index={index}>
      <section
        aria-labelledby={labelId}
        className="grid gap-6 border-t border-[var(--border-subtle)] pt-8 lg:grid-cols-[14rem_1fr] lg:gap-12"
      >
        <h3
          id={labelId}
          className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--accent)] lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start"
        >
          {phase.label}
        </h3>

        <ol start={start} className="flex flex-col gap-7">
          {phase.stages.map((stage, i) => (
            <li key={stage.id} className="grid grid-cols-[2.5rem_1fr] gap-4">
              <span
                aria-hidden="true"
                className="pt-0.5 font-mono text-[0.8125rem] font-semibold tabular-nums text-[var(--text-3)]"
              >
                {String(start + i).padStart(2, '0')}
              </span>
              <div>
                <p className="font-display text-[1.0625rem] font-semibold tracking-[-0.016em] text-[var(--text-1)]">
                  {stage.title}
                </p>
                <p className="mt-1.5 text-[0.9375rem] leading-[1.65] text-[var(--text-2)]">
                  {stage.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </Reveal>
  )
}
