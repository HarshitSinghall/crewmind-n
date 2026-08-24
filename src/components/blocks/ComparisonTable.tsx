import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import type { ComparisonSpec } from '@/content/types'

/**
 * A real <table> — this is tabular data, and a grid of divs would lose the
 * row/column relationships that make it navigable by screen reader.
 *
 * It is wider than a phone, so it scrolls inside its own `.scroll-x` box
 * rather than pushing the page sideways. The wrapper is focusable and
 * labelled so keyboard users can reach and scroll it too, which a plain
 * `overflow-x: auto` div does not allow.
 */
interface ComparisonTableProps {
  comparison: ComparisonSpec
  /** Anchor + aria-labelledby base. Must be unique on the page. */
  id?: string
}

export function ComparisonTable({ comparison, id = 'compare' }: ComparisonTableProps) {
  const titleId = `${id}-title`

  return (
    <Section id={id} divided aria-labelledby={titleId}>
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            <Eyebrow className="mb-5">{comparison.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id={titleId} className="mb-4">
              {comparison.title}
            </Heading>
            <Text size="lg">{comparison.sub}</Text>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div
            className="scroll-x mt-12 rounded-[var(--r-lg)] border border-[var(--border-subtle)]"
            tabIndex={0}
            role="group"
            aria-labelledby={titleId}
          >
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <caption className="sr-only">{comparison.title}</caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-[13rem] border-b border-[var(--border-subtle)] bg-[var(--surface-1)] px-5 py-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--text-3)]"
                  >
                    <span className="sr-only">Attribute</span>
                  </th>
                  {comparison.columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="border-b border-[var(--border-subtle)] bg-[var(--surface-1)] px-5 py-4 font-display text-[0.9375rem] font-semibold tracking-[-0.016em] text-[var(--text-1)]"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors duration-[var(--dur-fast)] hover:bg-[var(--surface-1)]"
                  >
                    <th
                      scope="row"
                      className="border-b border-[var(--border-subtle)] px-5 py-4 align-top font-mono text-[0.75rem] font-medium uppercase tracking-[0.1em] text-[var(--text-3)]"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={comparison.columns[i] ?? i}
                        className="border-b border-[var(--border-subtle)] px-5 py-4 align-top text-[0.875rem] leading-[1.55] text-[var(--text-2)]"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {comparison.note && (
          <Reveal index={2}>
            <p className="mt-5 text-[0.875rem] text-[var(--text-3)]">{comparison.note}</p>
          </Reveal>
        )}
      </Container>
    </Section>
  )
}
