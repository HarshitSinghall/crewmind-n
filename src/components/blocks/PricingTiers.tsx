import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import type { PricingContent, PricingTier } from '@/content/types'

interface PricingTiersProps {
  tiers: PricingTier[]
  guarantee: PricingContent['guarantee']
}

export function PricingTiers({ tiers, guarantee }: PricingTiersProps) {
  return (
    <Section id="plans" spacing="tight" aria-labelledby="plans-title">
      <Container>
        <h2 id="plans-title" className="sr-only">
          Engagement options
        </h2>

        <ul className="grid items-start gap-4 lg:grid-cols-2">
          {tiers.map((tier, i) => (
            <Reveal as="li" key={tier.id} index={i} className="flex">
              <TierCard tier={tier} guarantee={tier.featured ? guarantee : undefined} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function TierCard({
  tier,
  guarantee,
}: {
  tier: PricingTier
  guarantee?: PricingContent['guarantee']
}) {
  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-[var(--r-xl)] border p-6 sm:p-8',
        tier.featured
          ? 'border-[var(--border-strong)] bg-[var(--surface-2)] shadow-[var(--shadow-2)]'
          : 'border-[var(--border-subtle)] bg-[var(--surface-1)]',
      )}
    >
      <div className="mb-5">
        <Badge tone={tier.featured ? 'accent' : 'neutral'}>{tier.badge}</Badge>
      </div>

      <h3 className="mb-3 font-display text-step-3 font-semibold tracking-[-0.028em] text-[var(--text-1)]">
        {tier.title}
      </h3>

      <p className="text-[0.9375rem] leading-[1.62] text-[var(--text-2)]">{tier.body}</p>

      {tier.price ? (
        <div className="mt-7 border-y border-[var(--border-subtle)] py-6">
          <p className="mb-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--text-3)]">
            {tier.price.label}
          </p>
          <p className="tnum font-display text-step-4 font-semibold tracking-[-0.032em] text-[var(--text-1)]">
            {tier.price.value}
          </p>
          <p className="mt-2 text-[0.8125rem] text-[var(--text-2)]">{tier.price.note}</p>
        </div>
      ) : (
        /*
          No invented number for the tier that is genuinely scoped on a call.
          The reference leaves this space empty and the two cards fall out of
          alignment; saying so keeps the row level and is more honest than a
          "Custom" price tag pretending to be a price.
        */
        <div className="mt-7 border-y border-[var(--border-subtle)] py-6">
          <p className="mb-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--text-3)]">
            Investment
          </p>
          <p className="font-display text-step-4 font-semibold tracking-[-0.032em] text-[var(--text-1)]">
            Scoped together
          </p>
          <p className="mt-2 text-[0.8125rem] text-[var(--text-2)]">
            Priced after the architecture session, not before it.
          </p>
        </div>
      )}

      <ul className="mt-6 flex flex-col gap-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check size={14} aria-hidden="true" className="mt-1 shrink-0 text-[var(--accent)]" />
            <span className="text-[0.875rem] leading-[1.55] text-[var(--text-2)]">{f}</span>
          </li>
        ))}
      </ul>

      {tier.note && (
        <p className="mt-6 rounded-[var(--r-md)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4 text-[0.8125rem] leading-[1.6] text-[var(--text-2)]">
          {tier.note}
        </p>
      )}

      {guarantee && (
        <div className="mt-6 rounded-[var(--r-md)] border border-[color-mix(in_oklch,var(--success)_30%,transparent)] bg-[color-mix(in_oklch,var(--success)_8%,transparent)] p-4">
          <p className="mb-1.5 flex items-center gap-2 text-[0.875rem] font-semibold text-[var(--success)]">
            <ShieldCheck size={15} aria-hidden="true" />
            {guarantee.title}
          </p>
          <p className="text-[0.8125rem] leading-[1.6] text-[var(--text-2)]">
            {guarantee.body}
          </p>
        </div>
      )}

      {/*
        Exactly one amber button on this page, and it is here. The second tier
        gets `secondary` — both cards ask for the same call, so making them
        compete visually would only split the click.
      */}
      <div className="mt-8 flex flex-col gap-3 pt-2 sm:flex-row">
        <Button
          href={tier.cta.href}
          size="lg"
          variant={tier.featured ? 'primary' : 'secondary'}
          className="w-full sm:w-auto"
          trailing={<ArrowRight size={16} />}
        >
          {tier.cta.label}
        </Button>
        {tier.secondaryCta && (
          <Button
            href={tier.secondaryCta.href}
            size="lg"
            variant="ghost"
            className="w-full sm:w-auto"
          >
            {tier.secondaryCta.label}
          </Button>
        )}
      </div>
    </div>
  )
}
