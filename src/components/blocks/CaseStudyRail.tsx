import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import type { HomeContent } from '@/content/types'

export function CaseStudyRail({ work }: { work: HomeContent['work'] }) {
  return (
    <Section id="work" divided aria-labelledby="work-title">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading level={2} size="xl" id="work-title" className="max-w-[26rem]">
              {work.title}
            </Heading>
            <Button
              href={work.cta.href}
              variant="ghost"
              trailing={<ArrowRight size={15} />}
            >
              {work.cta.label}
            </Button>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {work.items.map((item, i) => (
            <Reveal as="li" key={item.id} index={i % 3} className="flex">
              <Card href={item.href} className="w-full gap-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-[1rem] font-semibold leading-snug tracking-[-0.018em] text-[var(--text-1)]">
                    {item.title}
                  </h3>
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[var(--text-3)] transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                  />
                </div>

                <p className="flex-1 text-[0.875rem] leading-[1.6] text-[var(--text-2)]">
                  {item.impact}
                </p>

                <ul className="flex flex-wrap gap-1.5 border-t border-[var(--border-subtle)] pt-4">
                  {item.tags.map((t) => (
                    <li key={t}>
                      <Badge>{t}</Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
