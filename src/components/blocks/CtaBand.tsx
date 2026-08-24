import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import type { CtaPair } from '@/content/types'

export interface CtaBandContent {
  eyebrow: string
  title: string
  sub: string
  cta: CtaPair
}

interface CtaBandProps {
  close: CtaBandContent
  /** Base for the section anchor and its aria-labelledby. */
  id?: string
}

/**
 * The single closing ask. One per page, always the last thing before the
 * footer, and the secondary action is always `ghost` — two equal-weight CTAs
 * side by side split intent, which is exactly the defect this site is
 * correcting in the reference.
 */
export function CtaBand({ close, id = 'close' }: CtaBandProps) {
  const titleId = `${id}-title`

  return (
    <Section id={id} spacing="loose" divided aria-labelledby={titleId}>
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

              <Heading level={2} size="lg" id={titleId} className="mb-4">
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
