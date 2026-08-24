import { PageHeader } from '@/components/blocks/PageHeader'
import { AutomationShowcase } from '@/components/blocks/AutomationShowcase'
import { AutomationCatalogue } from '@/components/blocks/AutomationCatalogue'
import { CtaBand } from '@/components/blocks/CtaBand'
import { AUTOMATIONS_PAGE } from '@/content/automations'
import { useSeo } from '@/lib/useSeo'

export default function Automations() {
  useSeo({ ...AUTOMATIONS_PAGE.seo, path: '/automations' })

  return (
    <>
      <PageHeader hero={AUTOMATIONS_PAGE.hero} />
      <AutomationShowcase showcase={AUTOMATIONS_PAGE.showcase} />
      <AutomationCatalogue catalogue={AUTOMATIONS_PAGE.catalogue} />
      <CtaBand close={AUTOMATIONS_PAGE.close} />
    </>
  )
}
