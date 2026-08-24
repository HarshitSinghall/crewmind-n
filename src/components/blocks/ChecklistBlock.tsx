import { Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'

interface ChecklistBlockProps {
  id: string
  eyebrow?: string
  title: string
  sub?: string
  items: string[]
}

/**
 * The "here's exactly what you get" list. Two columns on desktop so a
 * ten-item deliverables list does not turn into a column of scrolling.
 */
export function ChecklistBlock({ id, eyebrow, title, sub, items }: ChecklistBlockProps) {
  const titleId = `${id}-title`

  return (
    <Section id={id} divided aria-labelledby={titleId}>
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
            <Heading level={2} size="xl" id={titleId} className="mb-4">
              {title}
            </Heading>
            {sub && <Text size="lg">{sub}</Text>}
          </div>
        </Reveal>

        <Reveal index={1}>
          <ul className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-t border-[var(--border-subtle)] pt-4"
              >
                <Check
                  size={15}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-[var(--accent)]"
                />
                <span className="text-[0.9375rem] leading-[1.55] text-[var(--text-2)]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
