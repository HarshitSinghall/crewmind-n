import { Hero } from '@/components/blocks/Hero'
import { BookingSection } from '@/components/blocks/BookingSection'
import { ServiceGrid } from '@/components/blocks/ServiceGrid'
import { AutomationShowcase } from '@/components/blocks/AutomationShowcase'
import { Positioning } from '@/components/blocks/Positioning'
import { ProcessTimeline } from '@/components/blocks/ProcessTimeline'
import { CaseStudyRail } from '@/components/blocks/CaseStudyRail'
import { ScarcityClose } from '@/components/blocks/ScarcityClose'
import { HeroProductBand } from '@/components/blocks/HeroProductBand'
import { HOME } from '@/content/home'
import { PRIYA_HOME } from '@/content/priya'
import { AUTOMATIONS_HOME } from '@/content/automations'
import { useSeo } from '@/lib/useSeo'

export default function Home() {
  useSeo({ ...HOME.seo, path: '/' })

  return (
    <>
      <Hero hero={HOME.hero} />

      {/*
        The flagship, one scroll in. The service grid below names eight
        categories the visitor has to take on faith; this shows one finished
        thing first, with a clock that is actually running.
      */}
      <HeroProductBand product={PRIYA_HOME} />

      <BookingSection booking={HOME.booking} />
      <ServiceGrid services={HOME.services} />

      <AutomationShowcase showcase={AUTOMATIONS_HOME} />

      <Positioning positioning={HOME.positioning} />
      <ProcessTimeline process={HOME.process} />
      <CaseStudyRail work={HOME.work} />
      <ScarcityClose close={HOME.close} />
    </>
  )
}
