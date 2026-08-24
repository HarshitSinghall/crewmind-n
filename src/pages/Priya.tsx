import { ProductHero } from '@/components/blocks/ProductHero'
import { StepList } from '@/components/blocks/StepList'
import { TimeRace } from '@/components/blocks/TimeRace'
import { PillarRow } from '@/components/blocks/PillarRow'
import { CallTranscript } from '@/components/blocks/CallTranscript'
import { LeadCard } from '@/components/blocks/LeadCard'
import { LeadMath } from '@/components/blocks/LeadMath'
import { DeadLeadOffer } from '@/components/blocks/DeadLeadOffer'
import { ComparisonTable } from '@/components/blocks/ComparisonTable'
import { PricingTiers } from '@/components/blocks/PricingTiers'
import { FAQ } from '@/components/blocks/FAQ'
import { CtaBand } from '@/components/blocks/CtaBand'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import { PRIYA } from '@/content/priya'
import { useSeo } from '@/lib/useSeo'

/**
 * The flagship product page.
 *
 * Fifteen blocks, and the order is the argument: he measures his own gap
 * (Sunday test) before he is shown ours (race), hears the thing work
 * (transcript) before he is told how (mechanism), and reads what it does NOT
 * do (limits) before he is offered a price. Reordering this weakens it.
 */
export default function Priya() {
  useSeo({ ...PRIYA.seo, path: '/priya' })

  return (
    <>
      <ProductHero hero={PRIYA.hero} />

      <StepList
        id="sunday-test"
        eyebrow={PRIYA.sundayTest.eyebrow}
        title={PRIYA.sundayTest.title}
        sub={PRIYA.sundayTest.sub}
        steps={PRIYA.sundayTest.steps}
        pullQuote={PRIYA.sundayTest.pullQuote}
      />

      <TimeRace race={PRIYA.race} />
      <PillarRow id="cause" pillars={PRIYA.cause} />
      <CallTranscript call={PRIYA.call} />

      <StepList
        id="mechanism"
        eyebrow={PRIYA.mechanism.eyebrow}
        title={PRIYA.mechanism.title}
        sub={PRIYA.mechanism.sub}
        steps={PRIYA.mechanism.steps}
      />
      {/*
        The two operating rules sit with the mechanism rather than in their own
        section — undivided and two-up, so they read as a footnote to the steps
        above rather than as a new argument.
      */}
      <PillarRow
        id="mechanism-notes"
        columns={2}
        pillars={{ items: PRIYA.mechanism.notes }}
        divided={false}
      />

      <LeadCard leadCard={PRIYA.leadCard} />
      <PillarRow id="follow-up" pillars={PRIYA.followUp} />
      <LeadMath math={PRIYA.math} />
      <PillarRow id="limits" pillars={PRIYA.limits} />

      <DeadLeadOffer offer={PRIYA.deadLead} />

      <ComparisonTable comparison={PRIYA.comparison} id="compare" />

      <Section id="plan" divided aria-labelledby="plan-title">
        <Container>
          <Reveal>
            <div className="max-w-[42rem]">
              <Eyebrow className="mb-5">{PRIYA.plan.eyebrow}</Eyebrow>
              <Heading level={2} size="xl" id="plan-title" className="mb-4">
                {PRIYA.plan.title}
              </Heading>
              <Text size="lg">{PRIYA.plan.sub}</Text>
            </div>
          </Reveal>
        </Container>

        <PricingTiers tiers={[PRIYA.plan.tier]} guarantee={PRIYA.plan.guarantee} />

        <Container>
          <Reveal>
            <p className="mt-8 max-w-[42rem] text-[0.9375rem] leading-[1.65] text-[var(--text-2)]">
              {PRIYA.plan.disqualifier}
            </p>
          </Reveal>
        </Container>
      </Section>

      <PillarRow id="founding" columns={2} pillars={PRIYA.founding} />

      <FAQ title={PRIYA.faq.title} items={PRIYA.faq.items} />
      <CtaBand close={PRIYA.close} />
    </>
  )
}
