import { PageHeader } from '@/components/blocks/PageHeader'
import { PricingTiers } from '@/components/blocks/PricingTiers'
import { ComparisonTable } from '@/components/blocks/ComparisonTable'
import { ResourceBand } from '@/components/blocks/ResourceBand'
import { CtaBand } from '@/components/blocks/CtaBand'
import { PRICING } from '@/content/pricing'
import { useSeo } from '@/lib/useSeo'

export default function Pricing() {
  useSeo({ ...PRICING.seo, path: '/pricing' })

  return (
    <>
      <PageHeader hero={PRICING.hero} />
      <PricingTiers tiers={PRICING.tiers} guarantee={PRICING.guarantee} />
      <ComparisonTable comparison={PRICING.comparison} />
      <ResourceBand resource={PRICING.resource} />
      <CtaBand close={PRICING.close} />
    </>
  )
}
