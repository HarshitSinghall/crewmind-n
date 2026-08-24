import { ArrowRight, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Reveal } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'
import { useReveal } from '@/lib/useReveal'
import { cn } from '@/lib/cn'
import type { HomeContent, ProcessStep, ProcessVisual } from '@/content/types'

export function ProcessTimeline({ process }: { process: HomeContent['process'] }) {
  return (
    <Section id="how-it-works" divided aria-labelledby="process-title">
      <Container>
        <Reveal>
          <Heading level={2} size="xl" id="process-title" className="max-w-[32rem]">
            {process.title}
          </Heading>
        </Reveal>

        <ol className="mt-14 flex flex-col">
          {process.steps.map((step, i) => (
            <Step
              key={step.step}
              step={step}
              isLast={i === process.steps.length - 1}
              flip={i % 2 === 1}
            />
          ))}
        </ol>
      </Container>
    </Section>
  )
}

function Step({
  step,
  isLast,
  flip,
}: {
  step: ProcessStep
  isLast: boolean
  flip: boolean
}) {
  const { ref, shown, reduced } = useReveal<HTMLLIElement>({ threshold: 0.25 })

  return (
    <li ref={ref} className="relative grid gap-8 pb-14 last:pb-0 lg:grid-cols-[auto_1fr_1fr] lg:gap-12">
      {/* Rail: number node + connector that draws as the step enters */}
      <div className="relative hidden w-12 shrink-0 justify-center lg:flex">
        <span
          className={cn(
            'relative z-10 flex h-12 w-12 items-center justify-center rounded-[var(--r-full)] border bg-[var(--bg)] font-mono text-[0.8125rem] font-semibold transition-all duration-[var(--dur-slow)]',
            shown
              ? 'border-[var(--accent)] text-[var(--accent)]'
              : 'border-[var(--border-subtle)] text-[var(--text-3)]',
          )}
          style={{
            transform: reduced || shown ? 'scale(1)' : 'scale(0.92)',
            transitionTimingFunction: 'var(--ease-spring)',
          }}
        >
          {step.step}
        </span>

        {!isLast && (
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-12 w-px -translate-x-1/2 bg-gradient-to-b from-[var(--accent-dim)] to-[var(--border-subtle)]"
            style={{
              height: 'calc(100% - 3rem)',
              transformOrigin: 'top',
              transform: shown ? 'scaleY(1)' : 'scaleY(0)',
              transition: reduced
                ? 'none'
                : 'transform var(--dur-slow) var(--ease-out-expo) 120ms',
            }}
          />
        )}
      </div>

      {/* Copy */}
      <div className={cn('lg:pt-1.5', flip && 'lg:order-3')}>
        <div className="mb-3 flex items-center gap-3 lg:hidden">
          <Badge tone="accent">Step {step.step}</Badge>
        </div>
        <h3 className="mb-3 font-display text-step-2 font-semibold tracking-[-0.026em] text-[var(--text-1)]">
          {step.title}
        </h3>
        <p className="max-w-[34rem] text-[0.9375rem] leading-[1.62] text-[var(--text-2)]">
          {step.body}
        </p>
      </div>

      {/* Visual */}
      <div className={cn(flip && 'lg:order-2')}>
        <Visual visual={step.visual} shown={shown} />
      </div>
    </li>
  )
}

function Visual({ visual, shown }: { visual: ProcessVisual; shown: boolean }) {
  const frame =
    'rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5'

  switch (visual.kind) {
    case 'timeSaved':
      return (
        <div className={frame}>
          <ul className="flex flex-col gap-3">
            {visual.rows.map((row, i) => (
              <li key={row.label} className="flex items-center gap-3">
                <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-[var(--text-2)]">
                  {row.label}
                </span>
                <span className="relative h-1.5 w-20 shrink-0 overflow-hidden rounded-[var(--r-full)] bg-[var(--surface-3)]">
                  <span
                    className="absolute inset-y-0 left-0 rounded-[var(--r-full)] bg-[var(--accent-dim)]"
                    style={{
                      width: shown ? `${40 + i * 14}%` : '0%',
                      transition: `width var(--dur-slow) var(--ease-out-expo) ${i * 80}ms`,
                    }}
                  />
                </span>
                <span className="tnum w-14 shrink-0 text-right font-mono text-[0.75rem] font-medium text-[var(--text-1)]">
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-[var(--border-subtle)] pt-4 font-mono text-[0.8125rem] font-semibold text-[var(--accent)]">
            {visual.total}
          </p>
        </div>
      )

    case 'flow':
      return (
        <div className={frame}>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Node label={visual.from} />
            <Connector shown={shown} />
            <div className="flex flex-1 flex-col gap-2">
              {visual.nodes.map((n, i) => (
                <span
                  key={n}
                  className="rounded-[var(--r-sm)] border border-[var(--border-subtle)] bg-[var(--surface-2)] px-3 py-1.5 text-center font-mono text-[0.6875rem] text-[var(--text-2)]"
                  style={{
                    opacity: shown ? 1 : 0,
                    transform: shown ? 'none' : 'translateX(-6px)',
                    transition: `all var(--dur-base) var(--ease-out-expo) ${160 + i * 90}ms`,
                  }}
                >
                  {n}
                </span>
              ))}
            </div>
            <Connector shown={shown} delay={420} />
            <Node label={visual.to} tone="accent" />
          </div>
        </div>
      )

    case 'schedule':
      return (
        <div className={frame}>
          <ol className="flex flex-col gap-0">
            {visual.items.map((item, i) => (
              <li key={item.label} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className="h-2 w-2 shrink-0 rounded-[var(--r-full)] bg-[var(--accent)]"
                    style={{
                      opacity: shown ? 1 : 0.25,
                      transform: shown ? 'scale(1)' : 'scale(0.6)',
                      transition: `all var(--dur-base) var(--ease-spring) ${i * 90}ms`,
                    }}
                  />
                  {i < visual.items.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="w-px flex-1 bg-[var(--border-subtle)]"
                      style={{ minHeight: '2.25rem' }}
                    />
                  )}
                </div>
                <div className="flex flex-1 items-baseline justify-between gap-4 pb-6 last:pb-0">
                  <span className="text-[0.875rem] font-medium text-[var(--text-1)]">
                    {item.label}
                  </span>
                  <span className="tnum font-mono text-[0.75rem] text-[var(--text-3)]">
                    {item.when}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )

    case 'stats':
      return (
        <div className="grid grid-cols-2 gap-3">
          {visual.items.map((item, i) => (
            <div
              key={item.label}
              className="rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? 'none' : 'translateY(8px)',
                transition: `all var(--dur-base) var(--ease-out-expo) ${i * 70}ms`,
              }}
            >
              <p className="tnum font-mono text-step-2 font-semibold leading-none text-[var(--accent)]">
                {item.value}
              </p>
              <p className="mt-2 text-[0.8125rem] text-[var(--text-2)]">{item.label}</p>
            </div>
          ))}
        </div>
      )
  }
}

function Node({ label, tone }: { label: string; tone?: 'accent' }) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center gap-1.5 rounded-[var(--r-md)] border px-3 py-2 text-center font-mono text-[0.6875rem] font-medium',
        tone === 'accent'
          ? 'border-[color-mix(in_oklch,var(--accent)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent)_12%,transparent)] text-[var(--accent)]'
          : 'border-[var(--border-subtle)] bg-[var(--surface-2)] text-[var(--text-2)]',
      )}
    >
      {tone === 'accent' && <Check size={11} aria-hidden="true" />}
      {label}
    </span>
  )
}

function Connector({ shown, delay = 120 }: { shown: boolean; delay?: number }) {
  return (
    <span
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center text-[var(--accent-dim)]"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateX(-4px)',
        transition: `all var(--dur-base) var(--ease-out-expo) ${delay}ms`,
      }}
    >
      <ArrowRight size={14} className="rotate-90 sm:rotate-0" />
    </span>
  )
}
