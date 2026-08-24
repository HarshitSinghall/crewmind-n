import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Accordion } from '@/components/ui/Accordion'
import { Reveal } from '@/components/ui/Reveal'
import type { FaqItem } from '@/content/types'

interface FAQProps {
  title: string
  items: FaqItem[]
  id?: string
}

export function FAQ({ title, items, id = 'faq' }: FAQProps) {
  const titleId = `${id}-title`

  return (
    <Section id={id} divided aria-labelledby={titleId}>
      <Container width="narrow">
        <Reveal>
          <Heading level={2} size="xl" id={titleId} className="mb-10">
            {title}
          </Heading>
        </Reveal>

        <Reveal index={1}>
          <Accordion items={items} />
        </Reveal>
      </Container>
    </Section>
  )
}
