import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import type { EnterpriseContent } from '@/content/types'

/**
 * Numbered process, one column, connected by a single rule.
 *
 * The homepage timeline carries a data visual per step; this one is copy
 * only, so it stays a list with a connector rather than reusing a component
 * built around visuals it would have to fake.
 */
export function StepList({ process }: { process: EnterpriseContent['process'] }) {
  return (
    <Section id="process" divided aria-labelledby="process-title">
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            <Eyebrow className="mb-5">{process.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id="process-title" className="mb-4">
              {process.title}
            </Heading>
            <Text size="lg">{process.sub}</Text>
          </div>
        </Reveal>

        <ol className="mt-14 max-w-[46rem]">
          {process.steps.map((step, i) => (
            <Reveal as="li" key={step.step} index={i}>
              <div className="relative flex gap-6 pb-10 last:pb-0">
                {/* Connector — stops at the last node instead of dangling. */}
                {i < process.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[1.4375rem] top-12 bottom-2 w-px bg-[var(--border-subtle)]"
                  />
                )}

                <span
                  aria-hidden="true"
                  className="relative z-10 flex h-[2.875rem] w-[2.875rem] shrink-0 items-center justify-center rounded-[var(--r-full)] border border-[var(--border-strong)] bg-[var(--surface-2)] font-mono text-[0.8125rem] font-medium text-[var(--accent)]"
                >
                  {step.step}
                </span>

                <div className="pt-2">
                  <h3 className="mb-2 font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-[var(--text-1)]">
                    {step.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-[1.62] text-[var(--text-2)]">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
