import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { WaitClock } from '@/components/ui/WaitClock'
import { LeadCardFigure } from '@/components/blocks/LeadCard'
import type { HeroProductContent } from '@/content/types'

/**
 * The homepage's one product feature.
 *
 * It sits above the service grid on purpose: the grid names eight categories
 * the visitor has to take on faith, and this shows one finished, running
 * thing before he gets there.
 *
 * One link, no secondary action. The band's whole job is to move him to
 * /priya, and a second CTA here would split that.
 */
export function HeroProductBand({ product }: { product: HeroProductContent }) {
  return (
    <Section id="flagship" divided aria-labelledby="flagship-title">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow className="mb-5">{product.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal index={1}>
              <Heading level={2} size="xl" id="flagship-title" className="mb-5">
                {product.title.lead} <Emphasis>{product.title.emphasis}</Emphasis>
                {product.title.trail}
              </Heading>
            </Reveal>

            <Reveal index={2}>
              <Text size="lg" className="max-w-[34rem]">
                {product.sub}
              </Text>
            </Reveal>

            <Reveal index={3}>
              <ul className="mt-7 flex flex-wrap gap-2">
                {product.points.map((point) => (
                  <li
                    key={point}
                    className="rounded-[var(--r-full)] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.04em] text-[var(--text-2)]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal index={4}>
              <div className="mt-9">
                <Button
                  href={product.cta.href}
                  size="lg"
                  trailing={<ArrowRight size={17} />}
                >
                  {product.cta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal index={2}>
            <div className="flex flex-col gap-6">
              <WaitClock
                label={product.clock.label}
                sinceHour={product.clock.sinceHour}
                sinceMinute={product.clock.sinceMinute}
                size="sm"
              />
              <LeadCardFigure card={product.card} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
