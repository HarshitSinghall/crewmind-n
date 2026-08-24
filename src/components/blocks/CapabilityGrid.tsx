import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import type { Capability, EnterpriseContent } from '@/content/types'

export function CapabilityGrid({
  capabilities,
}: {
  capabilities: EnterpriseContent['capabilities']
}) {
  return (
    <Section id="capabilities" divided aria-labelledby="capabilities-title">
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            <Eyebrow className="mb-5">{capabilities.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id="capabilities-title" className="mb-4">
              {capabilities.title}
            </Heading>
            <Text size="lg">{capabilities.sub}</Text>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.items.map((item, i) => (
            <Reveal as="li" key={item.id} index={i % 3} className="flex">
              <CapabilityCard capability={item} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <Card className="w-full gap-4">
      <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-[var(--text-1)]">
        {capability.title}
      </h3>

      <p className="flex-1 text-[0.875rem] leading-[1.62] text-[var(--text-2)]">
        {capability.body}
      </p>

      {/*
        Stack names are meta, not claims — mono, --text-3, and deliberately
        quiet. They are the detail an engineering buyer scans for and a
        non-technical buyer can skip without losing the point.
      */}
      <ul className="flex flex-wrap gap-x-3 gap-y-1.5 border-t border-[var(--border-subtle)] pt-4">
        {capability.stack.map((tool) => (
          <li
            key={tool}
            className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-[var(--text-3)]"
          >
            {tool}
          </li>
        ))}
      </ul>
    </Card>
  )
}
