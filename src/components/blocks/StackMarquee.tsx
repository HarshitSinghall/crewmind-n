import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Marquee } from '@/components/ui/Marquee'
import { Reveal } from '@/components/ui/Reveal'
import type { EnterpriseContent } from '@/content/types'

/**
 * The open-source stack, on a slow loop. Marquee clones the track for the
 * seam and marks the clone aria-hidden, so each tool is announced once.
 * Pauses on hover and focus-within; static under reduced motion.
 */
export function StackMarquee({ stack }: { stack: EnterpriseContent['stack'] }) {
  return (
    <Section id="stack" divided aria-labelledby="stack-title">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[42rem] text-center">
            <div className="mb-5 flex justify-center">
              <Eyebrow>{stack.eyebrow}</Eyebrow>
            </div>
            <Heading level={2} size="lg" id="stack-title" className="mb-4">
              {stack.title}
            </Heading>
            <Text>{stack.sub}</Text>
          </div>
        </Reveal>
      </Container>

      <div className="mt-12">
        <Marquee durationSec={48}>
          {stack.items.map((tool) => (
            <span
              key={tool}
              className="flex shrink-0 items-center rounded-[var(--r-md)] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-5 py-3 font-mono text-[0.8125rem] tracking-[0.02em] whitespace-nowrap text-[var(--text-2)]"
            >
              {tool}
            </span>
          ))}
        </Marquee>
      </div>

      <Container>
        <p className="mt-8 text-center text-[0.875rem] text-[var(--text-3)]">{stack.note}</p>
      </Container>
    </Section>
  )
}
