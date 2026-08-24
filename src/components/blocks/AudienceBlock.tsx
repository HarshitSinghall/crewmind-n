import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'

interface AudienceBlockProps {
  id: string
  eyebrow?: string
  title: string
  sub?: string
  items: string[]
}

/**
 * "Who this is for" / "industries that need this" — short labels, sometimes
 * with an em-dash explanation. Rendered as chips that wrap, because these
 * lists run from four items to ten and a fixed grid looks broken at both ends.
 */
export function AudienceBlock({ id, eyebrow, title, sub, items }: AudienceBlockProps) {
  const titleId = `${id}-title`

  return (
    <Section id={id} divided spacing="tight" aria-labelledby={titleId}>
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
            <Heading level={2} size="lg" id={titleId} className="mb-4">
              {title}
            </Heading>
            {sub && <Text size="lg">{sub}</Text>}
          </div>
        </Reveal>

        <Reveal index={1}>
          <ul className="mt-9 flex flex-wrap gap-2.5">
            {items.map((item) => {
              // "Founders & CEOs — delegate outreach…" splits into a bold
              // label and its explanation; a plain label just renders alone.
              const [label, detail] = item.split(' — ')
              return (
                <li
                  key={item}
                  className="rounded-[var(--r-md)] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-4 py-3"
                >
                  <span className="text-[0.9375rem] font-medium text-[var(--text-1)]">
                    {label}
                  </span>
                  {detail && (
                    <span className="mt-1 block max-w-[22rem] text-[0.8125rem] leading-[1.5] text-[var(--text-2)]">
                      {detail}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
