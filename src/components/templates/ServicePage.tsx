import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Reveal } from '@/components/ui/Reveal'
import { PageHeader } from '@/components/blocks/PageHeader'
import { PillarRow } from '@/components/blocks/PillarRow'
import { ChecklistBlock } from '@/components/blocks/ChecklistBlock'
import { AudienceBlock } from '@/components/blocks/AudienceBlock'
import { StatsBlock } from '@/components/blocks/StatsBlock'
import { StepList } from '@/components/blocks/StepList'
import { ComparisonTable } from '@/components/blocks/ComparisonTable'
import { FAQ } from '@/components/blocks/FAQ'
import { CtaBand } from '@/components/blocks/CtaBand'
import { ProjectGrid } from '@/components/blocks/ProjectGrid'
import { PROJECTS } from '@/content/projects'
import { useSeo } from '@/lib/useSeo'
import type { ServiceContent, ServiceSection } from '@/content/types'

/**
 * Drives all eight /services/:slug pages.
 *
 * This is the one component allowed to take a content module as its single
 * prop (see spec section 4) — everything below it still receives plain props.
 * The page shape lives in `sections`, so reordering a service page is a data
 * edit, and adding a section kind is a compile error here until it is handled.
 */
export function ServicePage({ service }: { service: ServiceContent }) {
  useSeo({ ...service.seo, path: `/services/${service.slug}` })

  const related = PROJECTS.filter((p) => p.category === service.category).slice(0, 3)

  return (
    <>
      <PageHeader hero={service.hero} />

      {service.sections.map((section) => (
        <ServiceSectionBlock key={section.id} section={section} />
      ))}

      {related.length > 0 && (
        <Section id="work" divided aria-labelledby="work-title">
          <Container>
            <Reveal>
              <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
                <Heading level={2} size="xl" id="work-title" className="max-w-[28rem]">
                  What we&rsquo;ve built for clients like you
                </Heading>
                <Link
                  to={`/past-projects?category=${service.category}`}
                  className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-[var(--text-2)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--accent)]"
                >
                  View all {service.title} projects
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            <ProjectGrid projects={related} />
          </Container>
        </Section>
      )}

      <CtaBand close={service.close} />
    </>
  )
}

/**
 * The switch is exhaustive by construction: ServiceSection is a discriminated
 * union, so adding a kind without a case here fails the build.
 */
function ServiceSectionBlock({ section }: { section: ServiceSection }) {
  switch (section.kind) {
    case 'pillars':
      return (
        <PillarRow
          id={section.id}
          pillars={{
            eyebrow: section.eyebrow,
            title: section.title,
            sub: section.sub,
            items: section.items,
          }}
        />
      )

    case 'checklist':
      return (
        <ChecklistBlock
          id={section.id}
          eyebrow={section.eyebrow}
          title={section.title}
          sub={section.sub}
          items={section.items}
        />
      )

    case 'audience':
      return (
        <AudienceBlock
          id={section.id}
          eyebrow={section.eyebrow}
          title={section.title}
          sub={section.sub}
          items={section.items}
        />
      )

    case 'steps':
      return (
        <StepList
          id={section.id}
          eyebrow={section.eyebrow}
          title={section.title}
          sub={section.sub}
          steps={section.steps}
        />
      )

    case 'stats':
      return (
        <StatsBlock
          id={section.id}
          eyebrow={section.eyebrow}
          title={section.title}
          sub={section.sub}
          items={section.items}
        />
      )

    case 'comparison':
      return <ComparisonTable id={section.id} comparison={section.spec} />

    case 'faq':
      return <FAQ id={section.id} title={section.title} items={section.items} />
  }
}
