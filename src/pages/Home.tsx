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
import { HeroProductBand } from '@/components/blocks/HeroProductBand'
import { PayrollMath } from '@/components/blocks/PayrollMath'
import { HOME } from '@/content/home'
import { PRIYA_HOME } from '@/content/priya'
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

      {/*
        The hero puts "80% less" in the headline, so the reader's first
        objection is that the number is invented. This answers it before
        anything else is asked of him — two columns of line items that add up
        in public, using the only real prices we have.
      */}
      <PayrollMath payroll={HOME.payroll} />

      {/*
        The one employee we have actually built, immediately after the
        arithmetic that quotes her price. The role grid below names seven jobs
        the visitor has to take on faith; this shows one finished thing first,
        with a clock that is actually running.
      */}
      <HeroProductBand product={PRIYA_HOME} />

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
