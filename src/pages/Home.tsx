import { Hero } from '@/components/blocks/Hero'
import { ProofBar } from '@/components/blocks/ProofBar'
import { TestimonialRail } from '@/components/blocks/TestimonialRail'
import { BookingSection } from '@/components/blocks/BookingSection'
import { ServiceGrid } from '@/components/blocks/ServiceGrid'
import { AutomationShowcase } from '@/components/blocks/AutomationShowcase'
import { Positioning } from '@/components/blocks/Positioning'
import { ProcessTimeline } from '@/components/blocks/ProcessTimeline'
import { CaseStudyRail } from '@/components/blocks/CaseStudyRail'
import { ScarcityClose } from '@/components/blocks/ScarcityClose'
import { HOME } from '@/content/home'
import { AUTOMATIONS_HOME } from '@/content/automations'
import { useSeo } from '@/lib/useSeo'

export default function Home() {
  useSeo({ ...HOME.seo, path: '/' })

  return (
    <>
      <Hero hero={HOME.hero} />
      <ProofBar proof={HOME.proof} />

      {/*
        Social proof appears once, high on the page. The reference site runs
        this rail twice on the homepage — see TestimonialRail for why that is
        worse than it looks.
      */}
      <TestimonialRail />

      <BookingSection booking={HOME.booking} />
      <ServiceGrid services={HOME.services} />

      {/*
        Sits directly under the service grid on purpose. The grid names eight
        categories; this proves one of them is a real, running thing before
        the visitor has to take anything else on faith.
      */}
      <AutomationShowcase showcase={AUTOMATIONS_HOME} />

      <Positioning positioning={HOME.positioning} />
      <ProcessTimeline process={HOME.process} />
      <CaseStudyRail work={HOME.work} />
      <ScarcityClose close={HOME.close} />
    </>
  )
}
