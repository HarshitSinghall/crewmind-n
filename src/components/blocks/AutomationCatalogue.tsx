import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarCheck,
  Clapperboard,
  FileText,
  Inbox,
  LifeBuoy,
  PhoneCall,
  Send,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import { AUTOMATIONS } from '@/content/automations'
import { getService } from '@/content/services'
import type { Automation, AutomationIcon, AutomationsContent } from '@/content/types'

/*
  The showcase answers "how does it run". This answers the question that
  actually decides the sale: "what is different on Tuesday morning".

  Wide rows rather than a card grid, because the whole point is the
  side-by-side — a before and an after in two columns read as a comparison,
  and the same two strings stacked in a narrow card read as a paragraph.
*/

const ICONS: Record<AutomationIcon, LucideIcon> = {
  phone: PhoneCall,
  send: Send,
  inbox: Inbox,
  support: LifeBuoy,
  document: FileText,
  calendar: CalendarCheck,
  content: Clapperboard,
}

interface AutomationCatalogueProps {
  catalogue: AutomationsContent['catalogue']
  items?: Automation[]
  id?: string
}

export function AutomationCatalogue({
  catalogue,
  items = AUTOMATIONS,
  id = 'catalogue',
}: AutomationCatalogueProps) {
  const titleId = `${id}-title`

  return (
    <Section id={id} divided aria-labelledby={titleId}>
      <Container>
        <Reveal>
          <div className="mb-4 flex">
            <Eyebrow>{catalogue.eyebrow}</Eyebrow>
          </div>
        </Reveal>

        <Reveal index={1}>
          <Heading level={2} size="xl" id={titleId} className="max-w-[32rem]">
            {catalogue.title}
          </Heading>
        </Reveal>

        <Reveal index={2}>
          <Text className="mt-5 max-w-[42rem]">{catalogue.sub}</Text>
        </Reveal>

        <ul className="mt-12 flex flex-col gap-4">
          {items.map((automation, i) => (
            <Reveal as="li" key={automation.id} index={Math.min(i, 3)}>
              <Row automation={automation} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function Row({ automation }: { automation: Automation }) {
  const Icon = ICONS[automation.icon]
  const service = getService(automation.service)

  return (
    <article className="group relative overflow-hidden rounded-[var(--r-xl)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5 transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)] hover:border-[var(--border-strong)] sm:p-7">
      {/* Accent rule that draws across the top on hover — the only motion on
          a resting card, and it costs one transform. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--accent)] to-transparent transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-x-100"
      />

      <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="flex min-w-0 items-start gap-3.5">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--r-md)] border border-[var(--border-subtle)] bg-[var(--surface-2)] text-[var(--accent)] transition-colors duration-[var(--dur-base)] group-hover:border-[color-mix(in_oklch,var(--accent)_40%,transparent)]"
          >
            <Icon size={16} />
          </span>

          <div className="min-w-0">
            <div className="flex items-baseline gap-2.5">
              <span className="tnum shrink-0 font-mono text-[0.6875rem] text-[var(--text-3)]">
                {automation.index}
              </span>
              <h3 className="font-display text-step-1 font-semibold leading-snug tracking-[-0.022em] text-[var(--text-1)]">
                {automation.name}
              </h3>
            </div>
            <p className="mt-1 text-[0.875rem] leading-[1.55] text-[var(--text-2)]">
              {automation.tagline}
            </p>
          </div>
        </div>

        <p className="flex shrink-0 items-baseline gap-2 rounded-[var(--r-full)] border border-[color-mix(in_oklch,var(--accent)_30%,transparent)] bg-[color-mix(in_oklch,var(--accent)_10%,transparent)] px-3 py-1.5">
          <span className="tnum font-mono text-[0.9375rem] font-semibold leading-none text-[var(--accent)]">
            {automation.metric.value}
            {automation.metric.suffix}
          </span>
          <span className="text-[0.75rem] leading-none text-[var(--text-2)]">
            {automation.metric.label}
          </span>
        </p>
      </header>

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-4">
        <Panel kind="before" body={automation.before} />

        <div
          aria-hidden="true"
          className="flex items-center justify-center text-[var(--text-3)] transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)] group-hover:text-[var(--accent)] md:group-hover:translate-x-1"
        >
          <ArrowRight size={16} className="rotate-90 md:rotate-0" />
        </div>

        <Panel kind="after" body={automation.after} />
      </div>

      <footer className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-[var(--border-subtle)] pt-5">
        <ul className="flex flex-wrap items-center gap-1.5">
          {automation.stack.map((tool) => (
            <li
              key={tool}
              className="rounded-[var(--r-sm)] border border-[var(--border-subtle)] bg-[var(--surface-2)] px-2 py-1 font-mono text-[0.6875rem] text-[var(--text-3)]"
            >
              {tool}
            </li>
          ))}
        </ul>

        {service && (
          <Link
            to={`/services/${service.slug}`}
            className="inline-flex shrink-0 items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--accent)]"
          >
            {service.title}
            <ArrowRight
              size={13}
              aria-hidden="true"
              className="transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </footer>
    </article>
  )
}

function Panel({ kind, body }: { kind: 'before' | 'after'; body: string }) {
  const isAfter = kind === 'after'

  return (
    <div
      className={
        isAfter
          ? 'rounded-[var(--r-lg)] border border-[color-mix(in_oklch,var(--accent)_28%,transparent)] bg-[color-mix(in_oklch,var(--accent)_7%,transparent)] p-4 transition-colors duration-[var(--dur-base)] group-hover:border-[color-mix(in_oklch,var(--accent)_45%,transparent)]'
          : 'rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-4'
      }
    >
      <p
        className={`mb-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] ${
          isAfter ? 'text-[var(--accent)]' : 'text-[var(--text-3)]'
        }`}
      >
        {isAfter ? 'Once it runs' : 'Today'}
      </p>
      <p className="text-[0.875rem] leading-[1.6] text-[var(--text-2)]">{body}</p>
    </div>
  )
}
