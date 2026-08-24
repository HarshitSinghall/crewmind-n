import { useId, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import type { LeadMathSpec } from '@/content/types'

/**
 * The arithmetic, with the reader's own numbers in it.
 *
 * The point of this block is that he changes the figures. A static table of
 * our assumptions is exactly the kind of thing this page tells him to
 * distrust, so the inputs are real inputs and the invitation to move them is
 * printed underneath.
 *
 * Outputs live in one aria-live="polite" region so the result is announced
 * once when it settles, not three times per keystroke.
 */

/** Indian digit grouping — 4,20,000 rather than 420,000. */
const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const count = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

/** Empty, negative and non-finite inputs all resolve to a usable number. */
function toNumber(raw: string, max = Number.MAX_SAFE_INTEGER): number {
  const n = Number(raw)
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.min(n, max)
}

export function LeadMath({ math }: { math: LeadMathSpec }) {
  const [leads, setLeads] = useState(String(math.defaults.leads))
  const [cpl, setCpl] = useState(String(math.defaults.cpl))
  const [reached, setReached] = useState(String(math.defaults.reached))

  const leadsN = toNumber(leads)
  const cplN = toNumber(cpl)
  const reachedN = toNumber(reached, 100)

  const spend = leadsN * cplN
  const missed = Math.round(leadsN * ((100 - reachedN) / 100))
  const wasted = missed * cplN

  return (
    <Section id="math" divided aria-labelledby="math-title">
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            <Eyebrow className="mb-5">{math.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id="math-title">
              {math.title.lead} <Emphasis>{math.title.emphasis}</Emphasis>
              {math.title.trail}
            </Heading>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            <div className="flex flex-col gap-5 rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-6">
              <Field label={math.inputs.leads} value={leads} onChange={setLeads} />
              <Field label={math.inputs.cpl} value={cpl} onChange={setCpl} prefix="₹" />
              <Field
                label={math.inputs.reached}
                value={reached}
                onChange={setReached}
                suffix="%"
                max={100}
              />
            </div>

            <div
              aria-live="polite"
              className="flex flex-col gap-4 rounded-[var(--r-lg)] border border-[var(--border-strong)] bg-[var(--surface-2)] p-6 shadow-[var(--shadow-2)]"
            >
              <Output
                testId="out-spend"
                label={math.outputs.spend}
                value={inr.format(spend)}
              />
              <Output
                testId="out-missed"
                label={math.outputs.missed}
                value={count.format(missed)}
              />
              <Output
                testId="out-wasted"
                label={math.outputs.wasted}
                value={inr.format(wasted)}
                emphasis
              />
            </div>
          </div>
        </Reveal>

        <Reveal index={2}>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <p className="text-step-1 leading-[1.55] text-[var(--text-1)]">
              {math.under}
            </p>
            <p className="text-[0.9375rem] leading-[1.65] text-[var(--text-2)]">
              {math.invite}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  max,
}: {
  label: string
  value: string
  onChange: (next: string) => void
  prefix?: string
  suffix?: string
  max?: number
}) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--text-3)]"
      >
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-[var(--r-md)] border border-[var(--border-subtle)] bg-[var(--surface-2)] px-3.5 focus-within:border-[var(--border-strong)]">
        {prefix && (
          <span aria-hidden="true" className="text-[var(--text-3)]">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="tnum h-11 w-full bg-transparent font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-[var(--text-1)] outline-none"
        />
        {suffix && (
          <span aria-hidden="true" className="text-[var(--text-3)]">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

function Output({
  label,
  value,
  testId,
  emphasis = false,
}: {
  label: string
  value: string
  testId: string
  emphasis?: boolean
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-[var(--border-subtle)] pb-4 last:border-b-0 last:pb-0">
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--text-3)]">
        {label}
      </span>
      <span
        data-testid={testId}
        className={
          emphasis
            ? 'tnum font-display text-step-4 font-semibold tracking-[-0.03em] text-[var(--warn)]'
            : 'tnum font-display text-step-3 font-semibold tracking-[-0.03em] text-[var(--text-1)]'
        }
      >
        {value}
      </span>
    </div>
  )
}
