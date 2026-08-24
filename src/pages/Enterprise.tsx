import { PageHeader } from '@/components/blocks/PageHeader'
import { PillarRow } from '@/components/blocks/PillarRow'
import { CapabilityGrid } from '@/components/blocks/CapabilityGrid'
import { StackMarquee } from '@/components/blocks/StackMarquee'
import { StepList } from '@/components/blocks/StepList'
import { EnterpriseCases } from '@/components/blocks/EnterpriseCases'
import { FAQ } from '@/components/blocks/FAQ'
import { CtaBand } from '@/components/blocks/CtaBand'
import { ENTERPRISE } from '@/content/enterprise'
import { useSeo } from '@/lib/useSeo'

export default function Enterprise() {
  useSeo({ ...ENTERPRISE.seo, path: '/enterprise' })

  return (
    <>
      <PageHeader hero={ENTERPRISE.hero} />
      <PillarRow pillars={ENTERPRISE.why} id="why-custom" divided={false} />
      <CapabilityGrid capabilities={ENTERPRISE.capabilities} />
      <StackMarquee stack={ENTERPRISE.stack} />
      <StepList process={ENTERPRISE.process} />
      <EnterpriseCases cases={ENTERPRISE.cases} />
      <PillarRow pillars={ENTERPRISE.ownership} id="ownership" />
      <FAQ title={ENTERPRISE.faq.title} items={ENTERPRISE.faq.items} />
      <CtaBand close={ENTERPRISE.close} />
    </>
  )
}
