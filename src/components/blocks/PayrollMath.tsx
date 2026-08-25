import { useId, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import type { PayrollMathSpec } from '@/content/types'

/**
 * What the job costs now, against what it costs staffed this way.
 *
 * This block deliberately does not assert a ratio. Everyone in this market
 * asserts one, the reader has learned to skip them, and any single number we
 * picked would be wrong for most businesses that read it. So he puts his own
 * headcount, salaries, loading and lead volume in, and the gap is computed in
 * front of him — including the case where the gap is small, which is a real
 * outcome on low volumes and one we would rather he discovered here.
 *
 * The CrewMind side is driven by `spec.price`, which carries Priya's real
 * published pricing. It is not a number invented for this page.
 *
 * Outputs sit in one aria-live="polite" region so a screen reader hears the
 * result settle once rather than on every keystroke.
 */

/** Indian digit grouping — 1,26,000 rather than 126,000. */
const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/** Empty, negative and non-finite inputs all resolve to a usable number. */
function toNumber(raw: string, max = Number.MAX_SAFE_INTEGER): number {
  const n = Number(raw)
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.min(n, max)
}

export function PayrollMath({ payroll }: { payroll: PayrollMathSpec }) {
  const [people, setPeople] = useState(String(payroll.defaults.people))
  const [salary, setSalary] = useState(String(payroll.defaults.salary))
  const [loading, setLoading] = useState(String(payroll.defaults.loading))
  const [leads, setLeads] = useState(String(payroll.defaults.leads))

  const peopleN = toNumber(people, 999)
  const salaryN = toNumber(salary)
  const loadingN = toNumber(loading, 500)
  const leadsN = toNumber(leads)

  // Salary is the part people quote; the loading is the part they forget.
  const humanCost = Math.round(peopleN * salaryN * (1 + loadingN / 100))

  const extraLeads = Math.max(0, leadsN - payroll.price.includedLeads)
  const crewCost = payroll.price.base + extraLeads * payroll.price.perExtraLead

  const gap = humanCost - crewCost
  const pct = humanCost > 0 ? Math.round((gap / humanCost) * 100) : 0

  return (
    <Section id="payroll" divided aria-labelledby="payroll-title">
      <Container>
        <Reveal>
          <div className="max-w-[42rem]">
            <Eyebrow className="mb-5">{payroll.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" id="payroll-title" className="mb-4">
              {payroll.title.lead} <Emphasis>{payroll.title.emphasis}</Emphasis>
              {payroll.title.trail}
            </Heading>
            <Text size="lg">{payroll.sub}</Text>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            <div className="flex flex-col gap-5 rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-6">
              <Field label={payroll.inputs.people} value={people} onChange={setPeople} />
              <Field
                label={payroll.inputs.salary}
                value={salary}
                onChange={setSalary}
                prefix="₹"
              />
              <Field
                label={payroll.inputs.loading}
                value={loading}
                onChange={setLoading}
                suffix="%"
              />
              <Field label={payroll.inputs.leads} value={leads} onChange={setLeads} />
            </div>

            <div
              aria-live="polite"
              className="flex flex-col gap-4 rounded-[var(--r-lg)] border border-[var(--border-strong)] bg-[var(--surface-2)] p-6 shadow-[var(--shadow-2)]"
            >
              <Output
                testId="pay-human"
                label={payroll.outputs.human}
                value={inr.format(humanCost)}
              />
              <Output
                testId="pay-crewmind"
                label={payroll.outputs.crewmind}
                value={inr.format(crewCost)}
              />
              <Output
                testId="pay-gap"
                label={payroll.outputs.gap}
                value={inr.format(Math.max(0, gap))}
                /*
                  The percentage is derived from his inputs, never asserted by
                  us — and it only renders when there is actually a gap, so a
                  low-volume business does not get shown a triumphant "0%".
                */
                foot={gap > 0 ? `${pct}% less, on the numbers you just entered` : undefined}
                accent
              />
            </div>
          </div>
        </Reveal>

        <Reveal index={2}>
          <p className="mt-10 max-w-[46rem] font-display text-[1.375rem] font-semibold leading-[1.35] tracking-[-0.018em] text-[var(--text-1)] sm:text-[1.5rem]">
            {payroll.resolve}
          </p>
        </Reveal>

        <Reveal index={3}>
          <div className="mt-6 grid max-w-[58rem] gap-6 lg:grid-cols-2">
            <p className="text-[0.875rem] leading-[1.65] text-[var(--text-3)]">
              {payroll.caveat}
            </p>
            <p className="text-[0.875rem] leading-[1.65] text-[var(--text-3)]">
              {payroll.invite}
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
}: {
  label: string
  value: string
  onChange: (next: string) => void
  prefix?: string
  suffix?: string
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
  foot,
  accent = false,
}: {
  label: string
  value: string
  testId: string
  foot?: string
  accent?: boolean
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-[var(--border-subtle)] pb-4 last:border-b-0 last:pb-0">
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--text-3)]">
        {label}
      </span>
      <span
        data-testid={testId}
        className={
          accent
            ? 'tnum font-display text-step-4 font-semibold tracking-[-0.03em] text-[var(--accent)]'
            : 'tnum font-display text-step-3 font-semibold tracking-[-0.03em] text-[var(--text-1)]'
        }
      >
        {value}
      </span>
      {foot && (
        <span className="mt-1 text-[0.8125rem] text-[var(--text-3)]">{foot}</span>
      )}
    </div>
  )
}
