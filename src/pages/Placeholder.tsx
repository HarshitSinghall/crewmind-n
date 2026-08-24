import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { useSeo } from '@/lib/useSeo'

interface PlaceholderProps {
  title: string
  path: string
}

/**
 * Honest stub for the two legal routes.
 *
 * Every marketing page is built; these need a lawyer, not a developer, which
 * is a different kind of "not done" and says so. The routes exist so the
 * footer links resolve to a real page rather than a 404 or a dead "#".
 */
export default function Placeholder({ title, path }: PlaceholderProps) {
  useSeo({
    title,
    description: `${title} — not yet published.`,
    path,
  })

  return (
    <Section spacing="loose">
      <Container width="narrow">
        <div className="pt-16 text-center">
          <div className="mb-6 flex justify-center">
            <Eyebrow>Not yet published</Eyebrow>
          </div>
          <Heading level={1} size="xl" className="mb-4">
            {title}
          </Heading>
          <Text size="lg" className="mx-auto max-w-[34rem]">
            This page needs real legal copy before launch, not placeholder
            text. The route exists so navigation never dead-ends — see
            CONTENT-SWAP.md.
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
