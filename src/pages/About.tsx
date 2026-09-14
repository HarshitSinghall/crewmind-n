import { PageHeader } from '@/components/blocks/PageHeader'
import { Story } from '@/components/blocks/Story'
import { TeamGrid } from '@/components/blocks/TeamGrid'
import { PillarRow } from '@/components/blocks/PillarRow'
import { CtaBand } from '@/components/blocks/CtaBand'
import { ABOUT } from '@/content/about'
import { useSeo } from '@/lib/useSeo'

export default function About() {
  useSeo({ ...ABOUT.seo, path: '/about' })

  return (
    <>
      <PageHeader hero={ABOUT.hero} />
      <TeamGrid team={ABOUT.team} />
      <Story story={ABOUT.story} />
      <PillarRow pillars={ABOUT.pillars} id="commitments" />
      <CtaBand close={ABOUT.close} />
    </>
  )
}
