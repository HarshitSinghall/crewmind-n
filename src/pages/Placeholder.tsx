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
  phase: 'Phase 2' | 'Phase 3'
  path: string
}

/**
 * Honest stub for routes that land in a later phase. Keeps every nav and
 * footer link resolving to a real page instead of a 404 or a dead "#".
 */
export default function Placeholder({ title, phase, path }: PlaceholderProps) {
  useSeo({
    title,
    description: `${title} — coming soon.`,
    path,
  })

  return (
    <Section spacing="loose">
      <Container width="narrow">
        <div className="pt-16 text-center">
          <div className="mb-6 flex justify-center">
            <Eyebrow>{phase}</Eyebrow>
          </div>
          <Heading level={1} size="xl" className="mb-4">
            {title}
          </Heading>
          <Text size="lg" className="mx-auto max-w-[34rem]">
            This page is scoped and specced — it lands in {phase} of the build.
            The route exists now so navigation never dead-ends.
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
