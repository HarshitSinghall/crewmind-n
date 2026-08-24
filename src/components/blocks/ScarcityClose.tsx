import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import type { HomeContent } from '@/content/types'

/**
 * The single closing CTA. The reference site repeats its hero CTA block here
 * verbatim; one considered close converts better than a second copy of the
 * opening ask.
 */
export function ScarcityClose({ close }: { close: HomeContent['close'] }) {
  return (
    <Section spacing="loose" divided aria-labelledby="close-title">
      <Container width="narrow">
        <Reveal>
          <div className="relative overflow-hidden rounded-[var(--r-xl)] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.14] blur-[80px]"
              style={{
                background:
                  'radial-gradient(closest-side, var(--accent), transparent 70%)',
              }}
            />

            <div className="relative">
              <div className="mb-6 flex justify-center">
                <Eyebrow>{close.eyebrow}</Eyebrow>
              </div>

              <Heading level={2} size="lg" id="close-title" className="mb-4">
                {close.title}
              </Heading>

              <Text className="mx-auto max-w-[34rem]">{close.sub}</Text>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href={close.cta.primary.href}
                  size="lg"
                  trailing={<ArrowRight size={16} />}
                >
                  {close.cta.primary.label}
                </Button>
                <Button href={close.cta.secondary.href} variant="ghost" size="lg">
                  {close.cta.secondary.label}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
