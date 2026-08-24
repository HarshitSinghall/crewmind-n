import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clapperboard,
  FileText,
  Inbox,
  LifeBuoy,
  PhoneCall,
  Send,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import { useReveal } from '@/lib/useReveal'
import { useCountUp } from '@/lib/useCountUp'
import { cn } from '@/lib/cn'
import { AUTOMATIONS } from '@/content/automations'
import type { Automation, AutomationIcon, ShowcaseBlock } from '@/content/types'

/*
  The one interactive block on the site. Everything else reveals on scroll and
  then sits still; this plays a pipeline.

  Two independent clocks run here and they are deliberately not merged:

    · the RUN clock advances the nodes of the selected automation (STAGE_MS
      per node), and restarts whenever the selection changes
    · the CYCLE clock advances the selection itself (CYCLE_MS), and stops
      permanently the first time the visitor picks a tab themselves

  Handing the cycle clock over on first interaction matters more than it
  looks: an auto-advancing panel that keeps moving under someone who is
  reading it is the single most common defect in this pattern.
*/

/** How long each node in the pipeline holds before the next lights up. */
const STAGE_MS = 520
/** How long a selected automation stays on screen while auto-advancing. */
const CYCLE_MS = 8000

const ICONS: Record<AutomationIcon, LucideIcon> = {
  phone: PhoneCall,
  send: Send,
  inbox: Inbox,
  support: LifeBuoy,
  document: FileText,
  calendar: CalendarCheck,
  content: Clapperboard,
}

interface AutomationShowcaseProps {
  showcase: ShowcaseBlock
  items?: Automation[]
  /** Base for the section anchor and its aria-labelledby. */
  id?: string
}

export function AutomationShowcase({
  showcase,
  items = AUTOMATIONS,
  id = 'automations',
}: AutomationShowcaseProps) {
  const titleId = `${id}-title`
  const [active, setActive] = useState(0)
  /** Set on first deliberate selection — retires the cycle clock for good. */
  const [manual, setManual] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { ref, shown, reduced } = useReveal<HTMLDivElement>({ threshold: 0.25 })
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const cycling = shown && !manual && !hovered && !reduced

  useEffect(() => {
    if (!cycling) return
    const timer = window.setTimeout(
      () => setActive((i) => (i + 1) % items.length),
      CYCLE_MS,
    )
    return () => window.clearTimeout(timer)
  }, [cycling, active, items.length])

  const select = useCallback((index: number) => {
    setManual(true)
    setActive(index)
  }, [])

  /*
    Roving tabindex: only the selected tab is reachable by Tab, and the arrow
    keys move between them. This is the tablist pattern browsers and screen
    readers already expect, so it needs no explanation to the visitor.
  */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = items.length - 1
    let next: number | null = null

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last

    if (next === null) return
    e.preventDefault()
    select(next)
    tabRefs.current[next]?.focus()
  }

  const current = items[active]

  return (
    <Section id={id} divided aria-labelledby={titleId}>
      <Container>
        <Reveal>
          <div className="mb-4 flex">
            <Eyebrow>{showcase.eyebrow}</Eyebrow>
          </div>
        </Reveal>

        <Reveal index={1}>
          <Heading level={2} size="xl" id={titleId} className="max-w-[34rem]">
            {showcase.title.lead} <Emphasis>{showcase.title.emphasis}</Emphasis>
            {showcase.title.trail}
          </Heading>
        </Reveal>

        <Reveal index={2}>
          <Text className="mt-5 max-w-[42rem]">{showcase.sub}</Text>
        </Reveal>

        <div
          ref={ref}
          className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-6"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setHovered(true)}
          onBlurCapture={() => setHovered(false)}
        >
          {/* --- The rail ---------------------------------------------------- */}
          <div
            role="tablist"
            aria-label="AI automations"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="scroll-x flex gap-2 pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {items.map((automation, i) => (
              <Tab
                key={automation.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                automation={automation}
                idBase={id}
                panelId={`${id}-panel`}
                selected={i === active}
                cycling={cycling && i === active}
                onSelect={() => select(i)}
              />
            ))}
          </div>

          {/* --- The canvas -------------------------------------------------- */}
          <div
            role="tabpanel"
            id={`${id}-panel`}
            aria-labelledby={`${id}-tab-${current.id}`}
            tabIndex={-1}
          >
            <Canvas key={current.id} automation={current} shown={shown} reduced={reduced} />
          </div>
        </div>

        <Reveal>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <p className="max-w-[42rem] text-[0.8125rem] leading-[1.6] text-[var(--text-3)]">
              {showcase.note}
            </p>

            {showcase.cta && (
              <Link
                to={showcase.cta.href}
                className="group inline-flex shrink-0 items-center gap-2 text-[0.875rem] font-medium text-[var(--accent)]"
              >
                {showcase.cta.label}
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Rail                                                                      */
/* -------------------------------------------------------------------------- */

interface TabProps {
  automation: Automation
  /** Section id prefix, so the tab id matches the panel's aria-labelledby. */
  idBase: string
  panelId: string
  selected: boolean
  /** True only while the cycle clock is actually counting down on this tab. */
  cycling: boolean
  onSelect: () => void
  ref?: React.Ref<HTMLButtonElement>
}

function Tab({ automation, idBase, panelId, selected, cycling, onSelect, ref }: TabProps) {
  const Icon = ICONS[automation.icon]

  return (
    <button
      ref={ref}
      role="tab"
      id={`${idBase}-tab-${automation.id}`}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      className={cn(
        'group relative flex w-[15rem] shrink-0 flex-col gap-1 overflow-hidden rounded-[var(--r-lg)] border p-4 text-left transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)] lg:w-auto',
        selected
          ? 'border-[color-mix(in_oklch,var(--accent)_45%,transparent)] bg-[var(--surface-1)] shadow-[var(--shadow-2)]'
          : 'border-[var(--border-subtle)] bg-transparent hover:border-[var(--border-strong)] hover:bg-[var(--surface-1)]',
      )}
    >
      {/* Accent spine on the selected tab — grows from the top rather than
          fading in, so the eye tracks the move down the rail. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[2px] bg-[var(--accent)] transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)]"
        style={{ transformOrigin: 'top', transform: selected ? 'scaleY(1)' : 'scaleY(0)' }}
      />

      <div className="flex items-center gap-2.5">
        <Icon
          size={15}
          aria-hidden="true"
          className={cn(
            'shrink-0 transition-colors duration-[var(--dur-base)]',
            selected ? 'text-[var(--accent)]' : 'text-[var(--text-3)] group-hover:text-[var(--text-2)]',
          )}
        />
        <span
          className={cn(
            'font-display text-[0.9375rem] font-semibold leading-snug tracking-[-0.018em]',
            selected ? 'text-[var(--text-1)]' : 'text-[var(--text-2)]',
          )}
        >
          {automation.name}
        </span>
        <span className="tnum ml-auto shrink-0 font-mono text-[0.6875rem] text-[var(--text-3)]">
          {automation.index}
        </span>
      </div>

      <span className="pl-[1.625rem] text-[0.8125rem] leading-[1.5] text-[var(--text-3)]">
        {automation.tagline}
      </span>

      {/* The cycle clock, made visible. Remounts on selection change so the
          animation restarts from zero rather than resuming mid-sweep. */}
      {cycling && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[var(--accent-dim)]"
          style={{ animation: `showcase-progress ${CYCLE_MS}ms linear forwards` }}
        />
      )}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/*  Canvas                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Advances a stage counter once the panel is on screen.
 *
 * Stage 0 is "nothing has fired yet"; stage 1 is the trigger; stages 2…n+1
 * are the steps; stage n+2 is the outcome. Under reduced motion it jumps
 * straight to complete, so the pipeline reads as finished rather than stuck.
 */
function useRunSequence(steps: number, active: boolean, reduced: boolean): number {
  const total = steps + 2
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setStage(total)
      return
    }

    setStage(0)
    let n = 0
    const timer = window.setInterval(() => {
      n += 1
      setStage(n)
      if (n >= total) window.clearInterval(timer)
    }, STAGE_MS)

    return () => window.clearInterval(timer)
  }, [total, active, reduced])

  return stage
}

type NodeState = 'idle' | 'running' | 'done'

function Canvas({
  automation,
  shown,
  reduced,
}: {
  automation: Automation
  shown: boolean
  reduced: boolean
}) {
  const stage = useRunSequence(automation.steps.length, shown, reduced)
  const finished = stage >= automation.steps.length + 2
  const value = useCountUp(automation.metric.value, finished, 900)

  return (
    <div className="relative h-full overflow-hidden rounded-[var(--r-xl)] border border-[var(--border-subtle)] bg-[var(--surface-1)]">
      {/* Instrument texture: a dot grid at low contrast, plus one accent
          bloom in the corner the run finishes in. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, var(--border-subtle) 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-[var(--r-full)] blur-[90px] transition-opacity duration-[var(--dur-slow)]"
        style={{
          opacity: finished ? 'calc(0.22 * var(--bloom-opacity))' : 'calc(0.06 * var(--bloom-opacity))',
          background: 'radial-gradient(closest-side, var(--accent), transparent 70%)',
        }}
      />

      <div className="relative flex h-full flex-col">
        <Statusbar automation={automation} finished={finished} />

        <div className="flex-1 px-5 py-6 sm:px-7">
          <ol className="flex flex-col">
            <Terminal
              kind="trigger"
              label={automation.trigger}
              state={stage >= 1 ? 'done' : 'idle'}
            />

            {automation.steps.map((step, i) => {
              // Stage 2 is the first step, so the step's own stage is i + 2.
              const own = i + 2
              const state: NodeState =
                stage > own ? 'done' : stage === own ? 'running' : 'idle'
              return (
                <StepNode
                  key={step.label}
                  index={i + 1}
                  step={step}
                  state={state}
                  firing={stage === own}
                />
              )
            })}

            <Terminal
              kind="outcome"
              label={automation.outcome}
              state={finished ? 'done' : 'idle'}
              firing={stage === automation.steps.length + 2}
            />
          </ol>
        </div>

        <Metricbar automation={automation} value={value} finished={finished} />
      </div>
    </div>
  )
}

function Statusbar({ automation, finished }: { automation: Automation; finished: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] px-5 py-3 sm:px-7">
      <p className="min-w-0 truncate font-mono text-[0.6875rem] tracking-[0.06em] text-[var(--text-3)]">
        <span className="text-[var(--text-2)]">run</span> / {automation.id}
      </p>

      <p className="flex shrink-0 items-center gap-2 font-mono text-[0.6875rem] tracking-[0.06em]">
        <span
          aria-hidden="true"
          className={cn(
            'inline-block h-1.5 w-1.5 rounded-[var(--r-full)] transition-colors duration-[var(--dur-base)]',
            finished ? 'bg-[var(--success)]' : 'bg-[var(--accent)]',
          )}
          style={finished ? undefined : { animation: 'node-pulse 1.4s ease-in-out infinite' }}
        />
        <span className={finished ? 'text-[var(--success)]' : 'text-[var(--accent)]'}>
          {finished ? 'complete' : 'running'}
        </span>
      </p>
    </div>
  )
}

/** The two ends of the pipeline: what starts it, and what it leaves behind. */
function Terminal({
  kind,
  label,
  state,
  firing = false,
}: {
  kind: 'trigger' | 'outcome'
  label: string
  state: NodeState
  firing?: boolean
}) {
  const lit = state === 'done'
  const isOutcome = kind === 'outcome'

  return (
    <li className="flex flex-col">
      {isOutcome && <Connector lit={lit} firing={firing} />}

      <div
        className={cn(
          'flex items-center gap-2.5 self-start rounded-[var(--r-full)] border px-3.5 py-2 transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)]',
          lit
            ? isOutcome
              ? 'border-[color-mix(in_oklch,var(--success)_40%,transparent)] bg-[color-mix(in_oklch,var(--success)_12%,transparent)]'
              : 'border-[color-mix(in_oklch,var(--accent)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent)_12%,transparent)]'
            : 'border-[var(--border-subtle)] bg-[var(--surface-2)]',
        )}
        style={{ transform: lit ? 'none' : 'translateY(3px)', opacity: lit ? 1 : 0.55 }}
      >
        {isOutcome ? (
          <Check
            size={13}
            aria-hidden="true"
            className={lit ? 'text-[var(--success)]' : 'text-[var(--text-3)]'}
          />
        ) : (
          <Zap
            size={13}
            aria-hidden="true"
            className={lit ? 'text-[var(--accent)]' : 'text-[var(--text-3)]'}
          />
        )}
        <span
          className={cn(
            'font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em]',
            lit
              ? isOutcome
                ? 'text-[var(--success)]'
                : 'text-[var(--accent)]'
              : 'text-[var(--text-3)]',
          )}
        >
          {kind}
        </span>
        <span className="text-[0.8125rem] leading-snug text-[var(--text-1)]">{label}</span>
      </div>
    </li>
  )
}

function StepNode({
  index,
  step,
  state,
  firing,
}: {
  index: number
  step: { label: string; detail: string }
  state: NodeState
  firing: boolean
}) {
  const lit = state !== 'idle'

  return (
    <li className="flex flex-col">
      <Connector lit={lit} firing={firing} />

      <div
        className={cn(
          'flex gap-3.5 rounded-[var(--r-lg)] border p-3.5 transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)]',
          state === 'running'
            ? 'border-[color-mix(in_oklch,var(--accent)_45%,transparent)] bg-[var(--surface-2)] shadow-[var(--shadow-1)]'
            : state === 'done'
              ? 'border-[var(--border-subtle)] bg-[var(--surface-2)]'
              : 'border-[var(--border-subtle)] bg-transparent',
        )}
        style={{
          opacity: lit ? 1 : 0.45,
          transform: lit ? 'none' : 'translateY(4px)',
        }}
      >
        <StatusDot state={state} />

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              'text-[0.875rem] font-medium leading-snug transition-colors duration-[var(--dur-base)]',
              lit ? 'text-[var(--text-1)]' : 'text-[var(--text-2)]',
            )}
          >
            {step.label}
          </p>
          <p className="mt-1.5 text-[0.8125rem] leading-[1.6] text-[var(--text-2)]">
            {step.detail}
          </p>
        </div>

        <span className="tnum shrink-0 font-mono text-[0.6875rem] text-[var(--text-3)]">
          {String(index).padStart(2, '0')}
        </span>
      </div>
    </li>
  )
}

function StatusDot({ state }: { state: NodeState }) {
  if (state === 'done') {
    return (
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[var(--r-full)] border border-[color-mix(in_oklch,var(--accent)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)]"
      >
        <Check size={11} className="text-[var(--accent)]" />
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[var(--r-full)] border',
        state === 'running'
          ? 'border-[color-mix(in_oklch,var(--accent)_50%,transparent)]'
          : 'border-[var(--border-subtle)]',
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-[var(--r-full)]',
          state === 'running' ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]',
        )}
        style={
          state === 'running'
            ? { animation: 'node-pulse 1.1s ease-in-out infinite' }
            : undefined
        }
      />
    </span>
  )
}

/**
 * The wire between two nodes. It draws downward as the run reaches it, and
 * while that node is firing a single packet falls along it — the one piece of
 * motion here that says "data is moving" rather than "a thing appeared".
 */
function Connector({ lit, firing }: { lit: boolean; firing: boolean }) {
  return (
    <div aria-hidden="true" className="relative ml-6 h-6 w-px">
      <span className="absolute inset-0 bg-[var(--border-subtle)]" />
      <span
        className="absolute inset-0 origin-top bg-[var(--accent-dim)] transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)]"
        style={{ transform: lit ? 'scaleY(1)' : 'scaleY(0)' }}
      />
      {firing && (
        <span
          className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-[var(--r-full)] bg-[var(--accent)]"
          style={{ animation: `signal-drop ${STAGE_MS}ms var(--ease-out-expo) forwards` }}
        />
      )}
    </div>
  )
}

function Metricbar({
  automation,
  value,
  finished,
}: {
  automation: Automation
  value: number
  finished: boolean
}) {
  return (
    <div className="flex flex-col gap-4 border-t border-[var(--border-subtle)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
      <div className="flex items-baseline gap-3">
        <span
          className={cn(
            'tnum font-mono text-step-3 font-semibold leading-none transition-colors duration-[var(--dur-slow)]',
            finished ? 'text-[var(--accent)]' : 'text-[var(--text-3)]',
          )}
        >
          {value}
          {automation.metric.suffix}
        </span>
        <span className="text-[0.8125rem] leading-snug text-[var(--text-2)]">
          {automation.metric.label}
        </span>
      </div>

      <ul className="flex flex-wrap items-center gap-1.5">
        {automation.stack.map((tool, i) => (
          <li
            key={tool}
            className="rounded-[var(--r-sm)] border border-[var(--border-subtle)] bg-[var(--surface-2)] px-2 py-1 font-mono text-[0.6875rem] text-[var(--text-3)]"
            style={{
              opacity: finished ? 1 : 0.5,
              transition: `opacity var(--dur-base) var(--ease-out-expo) ${i * 60}ms`,
            }}
          >
            {tool}
          </li>
        ))}
      </ul>
    </div>
  )
}
