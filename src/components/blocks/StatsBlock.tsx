import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Stat } from '@/components/ui/Stat'
import { Reveal } from '@/components/ui/Reveal'

interface StatsBlockProps {
  id: string
  eyebrow?: string
  title: string
  sub?: string
  items: { value: string; label: string; body?: string }[]
}

export function StatsBlock({ id, eyebrow, title, sub, items }: StatsBlockProps) {
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

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal as="li" key={item.label} index={i % 4}>
              <div className="border-t border-[var(--border-strong)] pt-5">
                <Stat value={item.value} label={item.label} />
                {item.body && (
                  <p className="mt-3 text-[0.875rem] leading-[1.6] text-[var(--text-2)]">
                    {item.body}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
