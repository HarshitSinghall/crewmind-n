import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import type { HomeContent } from '@/content/types'

/** The claim section — short, high-contrast, no CTA. Lets the page breathe. */
export function Positioning({ positioning }: { positioning: HomeContent['positioning'] }) {
  return (
    <Section spacing="tight" divided aria-labelledby="positioning-title">
      <Container width="narrow">
        <Reveal>
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <Eyebrow>{positioning.eyebrow}</Eyebrow>
            </div>
            <Heading level={2} size="xl" id="positioning-title" className="mb-5">
              {positioning.title.lead}{' '}
              <Emphasis>{positioning.title.emphasis}</Emphasis>
            </Heading>
            <Text size="lg" className="mx-auto max-w-[38rem]">
              {positioning.sub}
            </Text>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
