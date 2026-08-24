import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import type { PricingContent } from '@/content/types'

/** Low-commitment offer for visitors who aren't ready to book anything. */
export function ResourceBand({ resource }: { resource: PricingContent['resource'] }) {
  return (
    <Section spacing="tight" aria-labelledby="resource-title">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[38rem]">
              <Eyebrow marker={false} className="mb-4">
                {resource.eyebrow}
              </Eyebrow>
              <h2
                id="resource-title"
                className="mb-2.5 font-display text-step-2 font-semibold tracking-[-0.026em] text-[var(--text-1)]"
              >
                {resource.title}
              </h2>
              <p className="text-[0.9375rem] leading-[1.6] text-[var(--text-2)]">
                {resource.body}
              </p>
            </div>
            <div className="shrink-0">
              <Button
                href={resource.cta.href}
                variant="secondary"
                size="lg"
                trailing={<ArrowUpRight size={16} />}
              >
                {resource.cta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
