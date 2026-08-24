import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import type { NumberedStep } from '@/content/types'

interface StepListProps {
  title: string
  steps: NumberedStep[]
  eyebrow?: string
  sub?: string
  /** Anchor + aria-labelledby base. Must be unique on the page. */
  id?: string
  /**
   * A closing line that is the argument of the section rather than a step.
   * Set in the serif face — this is the one place a StepList raises its voice.
   */
  pullQuote?: string
}

/**
 * Numbered process, one column, connected by a single rule.
 *
 * The homepage timeline carries a data visual per step; this one is copy
 * only, so it stays a list with a connector rather than reusing a component
 * built around visuals it would have to fake.
 */
export function StepList({
  title,
  steps,
  eyebrow,
  sub,
  id = 'process',
  pullQuote,
}: StepListProps) {
  const titleId = `${id}-title`

  return (
    <Section id={id} divided aria-labelledby={titleId}>
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
            <Heading level={2} size="xl" id={titleId} className="mb-4">
              {title}
            </Heading>
            {sub && <Text size="lg">{sub}</Text>}
          </div>
        </Reveal>

        <ol className="mt-14 max-w-[46rem]">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.step} index={i}>
              <div className="flex gap-6 pb-10 last:pb-0">
                {/*
                  Badge and connector share a centred flex column, so the line
                  tracks the badge's centre whatever its width. The badge is a
                  pill rather than a fixed circle: these labels are not always
                  ordinals — the product page passes clock readings like
                  "60–120s", which overflowed a 2.875rem circle.
                */}
                <div className="flex shrink-0 flex-col items-center">
                  <span
                    aria-hidden="true"
                    className="flex h-[2.875rem] min-w-[2.875rem] items-center justify-center rounded-[var(--r-full)] border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 font-mono text-[0.8125rem] font-medium whitespace-nowrap text-[var(--accent)]"
                  >
                    {step.step}
                  </span>

                  {/* Stops at the last node instead of dangling. */}
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mt-2 w-px flex-1 bg-[var(--border-subtle)]"
                    />
                  )}
                </div>

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

        {pullQuote && (
          <Reveal index={steps.length}>
            <p className="mt-14 max-w-[38rem] border-l-2 border-[var(--accent-dim)] pl-6 font-serif text-step-2 leading-[1.45] text-[var(--text-1)] italic">
              {pullQuote}
            </p>
          </Reveal>
        )}
      </Container>
    </Section>
  )
}
