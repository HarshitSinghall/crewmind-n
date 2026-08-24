import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { TestimonialRail } from './TestimonialRail'
import type { PricingContent } from '@/content/types'

/**
 * Heading + the shared rail. The rail reads the one deduped TESTIMONIALS
 * array, so a page can only ever show each review once no matter how many
 * places want social proof.
 */
export function ReviewsBand({ proof }: { proof: PricingContent['proof'] }) {
  return (
    <Section divided spacing="tight" aria-labelledby="reviews-title">
      <Container>
        <Reveal>
          <div className="mx-auto mb-10 max-w-[36rem] text-center">
            <Heading level={2} size="lg" id="reviews-title" className="mb-3">
              {proof.title}
            </Heading>
            <Text>{proof.sub}</Text>
          </div>
        </Reveal>
      </Container>

      <TestimonialRail />

      <Container>
        <div className="mt-8 flex justify-center">
          <Button
            href={proof.cta.href}
            variant="ghost"
            trailing={<ArrowUpRight size={15} />}
          >
            {proof.cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
