import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import type { LeadCardSpec, PriyaContent } from '@/content/types'

/**
 * The card a broker actually receives.
 *
 * It is a facsimile of a real artefact, so it is a <figure> with a caption
 * naming it a sample — everywhere it appears, including the homepage band.
 * An unlabelled mock of a customer record is the kind of thing that ends up
 * screenshotted out of context.
 *
 * The phone number is masked in the content module, not here.
 */
export function LeadCardFigure({
  card,
  className,
}: {
  card: LeadCardSpec
  className?: string
}) {
  return (
    <figure className={cn('w-full', className)}>
      <div className="overflow-hidden rounded-[var(--r-lg)] border border-[var(--border-strong)] bg-[var(--surface-2)] shadow-[var(--shadow-3)]">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-[var(--text-1)]">
              {card.name}
            </span>
            <Badge tone="success">{card.track}</Badge>
          </div>
          <span className="tnum font-mono text-[0.75rem] text-[var(--text-3)]">
            {card.score}
          </span>
        </div>

        <dl className="flex flex-col">
          {card.rows.map((row) => (
            <div
              key={row.k}
              className="flex gap-4 border-b border-[var(--border-subtle)] px-5 py-3 last:border-b-0"
            >
              <dt className="w-[5.5rem] shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--text-3)]">
                {row.k}
              </dt>
              <dd className="text-[0.875rem] leading-[1.5] text-[var(--text-1)]">
                {row.v}
              </dd>
            </div>
          ))}
        </dl>

        <blockquote
          lang={card.quoteLang}
          className="border-t border-[var(--border-subtle)] bg-[var(--surface-1)] px-5 py-4 text-[0.875rem] leading-[1.6] text-[var(--text-2)] italic"
        >
          {card.quote}
        </blockquote>

        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border-subtle)] px-5 py-4">
          {card.actions.map((action) => (
            <span
              key={action}
              className="rounded-[var(--r-full)] border border-[var(--border-subtle)] px-3 py-1 font-mono text-[0.6875rem] text-[var(--text-2)]"
            >
              {action}
            </span>
          ))}
          <span className="tnum ml-auto font-mono text-[0.6875rem] text-[var(--text-3)]">
            {card.time}
          </span>
        </div>
      </div>

      <figcaption className="mt-3 text-[0.8125rem] text-[var(--text-3)]">
        {card.caption}
      </figcaption>
    </figure>
  )
}

export function LeadCard({ leadCard }: { leadCard: PriyaContent['leadCard'] }) {
  return (
    <Section id="card" divided aria-labelledby="card-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow className="mb-5">{leadCard.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id="card-title" className="mb-6">
              {leadCard.title.lead} <Emphasis>{leadCard.title.emphasis}</Emphasis>
              {leadCard.title.trail}
            </Heading>
            <p className="max-w-[34rem] text-step-1 leading-[1.55] text-[var(--text-2)]">
              {leadCard.closing}
            </p>
          </Reveal>

          <Reveal index={1}>
            <LeadCardFigure card={leadCard.card} className="mx-auto max-w-[26rem]" />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
