import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import type { PillarSet } from '@/content/types'

interface PillarRowProps {
  pillars: PillarSet
  /** Anchor + aria-labelledby base. Must be unique on the page. */
  id: string
  divided?: boolean
}

/**
 * Three short commitments in a row. Used for About's mission/vision/approach,
 * Enterprise's why-custom, and Enterprise's ownership band — same shape each
 * time, so it is one block rather than three near-identical ones.
 */
export function PillarRow({ pillars, id, divided = true }: PillarRowProps) {
  const titleId = `${id}-title`

  return (
    <Section
      id={id}
      divided={divided}
      aria-labelledby={pillars.title ? titleId : undefined}
    >
      <Container>
        {(pillars.eyebrow || pillars.title || pillars.sub) && (
          <Reveal>
            <div className="max-w-[42rem]">
              {pillars.eyebrow && <Eyebrow className="mb-5">{pillars.eyebrow}</Eyebrow>}
              {pillars.title && (
                <Heading level={2} size="xl" id={titleId} className="mb-4">
                  {pillars.title}
                </Heading>
              )}
              {pillars.sub && <Text size="lg">{pillars.sub}</Text>}
            </div>
          </Reveal>
        )}

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.items.map((item, i) => (
            <Reveal as="li" key={item.id} index={i}>
              <div className="border-t border-[var(--border-strong)] pt-5">
                <h3 className="mb-3 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-[var(--text-1)]">
                  {item.title}
                </h3>
                <p className="text-[0.9375rem] leading-[1.62] text-[var(--text-2)]">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
