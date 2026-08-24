import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import type { DeadLeadSpec } from '@/content/types'

/**
 * The offer that costs him nothing.
 *
 * The one lifted band on the page — surface-3 with a strong border, the same
 * move CtaBand already makes. It carries the page's second amber action and
 * there is no third: the hero, this block and the closing band all point at
 * the same intent, and anything else competing for the click weakens all of
 * them.
 *
 * The anchor id is load-bearing: the hero's secondary CTA and the plan's
 * secondary CTA both target #dead-lead.
 */
export function DeadLeadOffer({ offer }: { offer: DeadLeadSpec }) {
  return (
    <Section id="dead-lead" spacing="tight" aria-labelledby="dead-lead-title">
      <Container>
        <Reveal>
          <div className="rounded-[var(--r-xl)] border border-[var(--border-strong)] bg-[var(--surface-3)] px-6 py-12 shadow-[var(--shadow-3)] sm:px-10 sm:py-14">
            <div className="max-w-[44rem]">
              <Eyebrow className="mb-5">{offer.eyebrow}</Eyebrow>
              <Heading level={2} size="xl" id="dead-lead-title" className="mb-6">
                {offer.title.lead} <Emphasis>{offer.title.emphasis}</Emphasis>
                {offer.title.trail}
              </Heading>

              {offer.deck.map((para) => (
                <p
                  key={para.slice(0, 32)}
                  className="mt-4 text-step-1 leading-[1.55] text-[var(--text-2)]"
                >
                  {para}
                </p>
              ))}
            </div>

            <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {offer.outcomes.map((outcome, i) => (
                <Reveal as="li" key={outcome.id} index={i}>
                  <div className="border-t border-[var(--border-strong)] pt-5">
                    <h3 className="mb-3 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-[var(--text-1)]">
                      {outcome.title}
                    </h3>
                    <p className="text-[0.9375rem] leading-[1.62] text-[var(--text-2)]">
                      {outcome.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <div className="mt-12 flex flex-col gap-6 border-t border-[var(--border-subtle)] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[36rem] text-[0.9375rem] leading-[1.65] text-[var(--text-2)]">
                {offer.close}
              </p>
              <Button
                href={offer.cta.href}
                size="lg"
                className="shrink-0"
                trailing={<ArrowRight size={17} />}
              >
                {offer.cta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
