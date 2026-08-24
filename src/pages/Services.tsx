import { ArrowUpRight, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { PageHeader } from '@/components/blocks/PageHeader'
import { CtaBand } from '@/components/blocks/CtaBand'
import { SERVICES, SERVICES_INDEX } from '@/content/services'
import { useSeo } from '@/lib/useSeo'
import type { ServiceContent } from '@/content/types'

export default function Services() {
  useSeo({ ...SERVICES_INDEX.seo, path: '/services' })

  return (
    <>
      <PageHeader hero={SERVICES_INDEX.hero} />

      <Section id="all-services" aria-labelledby="all-services-title">
        <Container>
          <h2 id="all-services-title" className="sr-only">
            All services
          </h2>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal as="li" key={service.slug} index={i % 3} className="flex">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand close={SERVICES_INDEX.close} />
    </>
  )
}

function ServiceCard({ service }: { service: ServiceContent }) {
  return (
    <Card href={`/services/${service.slug}`} className="w-full gap-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-[var(--text-1)]">
          {service.title}
        </h3>
        {service.badge ? (
          <Badge tone="accent">{service.badge}</Badge>
        ) : (
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[var(--text-3)] transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
          />
        )}
      </div>

      <p className="text-[0.875rem] leading-[1.62] text-[var(--text-2)]">
        {service.description}
      </p>

      <ul className="mt-auto flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-4">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check size={13} aria-hidden="true" className="mt-1 shrink-0 text-[var(--accent)]" />
            <span className="text-[0.8125rem] text-[var(--text-2)]">{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
