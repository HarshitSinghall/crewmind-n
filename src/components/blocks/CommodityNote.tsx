import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import type { CommoditySpec } from '@/content/types'

/**
 * The argument against our own category, in running prose.
 *
 * Deliberately plain: no cards, no icons, no three-column grid. This is the
 * section where we tell the reader he can buy a cheaper thing than ours and
 * why he might want to, and dressing that up as a feature comparison would
 * undercut the only reason it works, which is that it reads like someone
 * talking straight.
 *
 * The last paragraph carries the turn, so it gets display weight and the ones
 * before it do not.
 */
export function CommodityNote({ commodity }: { commodity: CommoditySpec }) {
  const lead = commodity.paragraphs.slice(0, -1)
  const last = commodity.paragraphs[commodity.paragraphs.length - 1]

  return (
    <Section id="commodity" divided aria-labelledby="commodity-title">
      <Container>
        <div className="max-w-[44rem]">
          <Reveal>
            <Eyebrow className="mb-5">{commodity.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id="commodity-title" className="mb-6">
              {commodity.title}
            </Heading>
          </Reveal>

          {lead.map((para, i) => (
            <Reveal key={para.slice(0, 32)} index={i + 1}>
              <p className="mb-5 text-[1.0625rem] leading-[1.7] text-[var(--text-2)]">
                {para}
              </p>
            </Reveal>
          ))}

          {last && (
            <Reveal index={lead.length + 1}>
              <p className="mt-8 font-display text-[1.375rem] font-semibold leading-[1.35] tracking-[-0.018em] text-[var(--text-1)] sm:text-[1.5rem]">
                {last}
              </p>
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  )
}
