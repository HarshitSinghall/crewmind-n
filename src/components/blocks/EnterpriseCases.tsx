import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Badge } from '@/components/ui/Badge'
import { Stat } from '@/components/ui/Stat'
import { Reveal } from '@/components/ui/Reveal'
import type { EnterpriseCaseStudy, EnterpriseContent } from '@/content/types'

export function EnterpriseCases({ cases }: { cases: EnterpriseContent['cases'] }) {
  return (
    <Section id="cases" divided aria-labelledby="cases-title">
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            <Eyebrow className="mb-5">{cases.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id="cases-title" className="mb-4">
              {cases.title}
            </Heading>
            <Text size="lg">{cases.sub}</Text>
          </div>
        </Reveal>

        <ul className="mt-14 flex flex-col gap-4">
          {cases.items.map((item, i) => (
            <Reveal as="li" key={item.id} index={i}>
              <CaseCard study={item} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function CaseCard({ study }: { study: EnterpriseCaseStudy }) {
  return (
    <article className="rounded-[var(--r-xl)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-6 sm:p-8">
      <div className="flex flex-col gap-6 border-b border-[var(--border-subtle)] pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-[42rem]">
          <p className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--text-3)]">
            {study.meta}
          </p>
          <h3 className="mb-3 font-display text-step-2 font-semibold tracking-[-0.026em] text-[var(--text-1)]">
            {study.title}
          </h3>
          <p className="text-[0.875rem] leading-[1.55] text-[var(--text-2)]">
            {study.stackLine}
          </p>
        </div>

        <div className="flex shrink-0 items-start gap-6">
          <Stat value={study.metric.value} label={study.metric.label} />
          {study.link && (
            <a
              href={study.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 pt-1 text-[0.875rem] text-[var(--text-2)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--accent)]"
            >
              {study.link.label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className="grid gap-8 py-6 sm:grid-cols-2">
        <Panel label="Challenge" body={study.challenge} />
        <Panel label="Solution" body={study.solution} />
      </div>

      <ul className="flex flex-wrap gap-1.5 border-t border-[var(--border-subtle)] pt-6">
        {study.tags.map((tag) => (
          <li key={tag}>
            <Badge>{tag}</Badge>
          </li>
        ))}
      </ul>
    </article>
  )
}

function Panel({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <h4 className="mb-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
        {label}
      </h4>
      <p className="text-[0.875rem] leading-[1.65] text-[var(--text-2)]">{body}</p>
    </div>
  )
}
