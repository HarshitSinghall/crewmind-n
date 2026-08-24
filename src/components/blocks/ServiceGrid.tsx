import { ArrowUpRight, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import type { HomeContent, ServiceSummary } from '@/content/types'

export function ServiceGrid({ services }: { services: HomeContent['services'] }) {
  return (
    <Section id="services" divided aria-labelledby="services-title">
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            <Eyebrow className="mb-5">{services.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id="services-title" className="mb-4">
              {services.title}
            </Heading>
            <Text size="lg">{services.sub}</Text>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, i) => (
            <Reveal as="li" key={item.slug} index={i % 3} className="flex">
              <ServiceCard service={item} />
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <EnterpriseCallout enterprise={services.enterprise} />
        </Reveal>
      </Container>
    </Section>
  )
}

function ServiceCard({ service }: { service: ServiceSummary }) {
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
        {service.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check
              size={13}
              aria-hidden="true"
              className="mt-1 shrink-0 text-[var(--accent)]"
            />
            <span className="text-[0.8125rem] text-[var(--text-2)]">{f}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function EnterpriseCallout({
  enterprise,
}: {
  enterprise: HomeContent['services']['enterprise']
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-[var(--r-lg)] border border-[var(--border-strong)] bg-[var(--surface-2)] p-6 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[38rem]">
          <div className="mb-4 flex items-center gap-3">
            <Eyebrow marker={false}>{enterprise.eyebrow}</Eyebrow>
            <Badge tone="accent">{enterprise.badge}</Badge>
          </div>
          <h3 className="mb-3 font-display text-step-2 font-semibold tracking-[-0.026em] text-[var(--text-1)]">
            {enterprise.title}
          </h3>
          <p className="text-[0.9375rem] leading-[1.6] text-[var(--text-2)]">
            {enterprise.body}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {enterprise.tags.map((t) => (
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>
        </div>
        <div className="shrink-0">
          <Button
            href={enterprise.cta.href}
            variant="secondary"
            size="lg"
            trailing={<ArrowUpRight size={16} />}
          >
            {enterprise.cta.label}
          </Button>
        </div>
      </div>
    </div>
  )
}
