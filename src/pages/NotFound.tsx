import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { useSeo } from '@/lib/useSeo'

export default function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'That page does not exist.',
    path: '/404',
  })

  return (
    <Section spacing="loose">
      <Container width="narrow">
        <div className="pt-16 text-center">
          <div className="mb-6 flex justify-center">
            <Eyebrow>404</Eyebrow>
          </div>
          <Heading level={1} size="xl" className="mb-4">
            We can't find that page.
          </Heading>
          <Text size="lg" className="mx-auto max-w-[32rem]">
            The link may be out of date, or the page may have moved.
          </Text>
          <div className="mt-9 flex justify-center">
            <Button href="/" variant="secondary" size="lg">
              <ArrowLeft size={16} aria-hidden="true" />
              Back to home
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
