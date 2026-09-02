import { useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  MessageCircle,
  PhoneCall,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Heading } from '@/components/ui/Heading'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { BRAND } from '@/content/site'
import type { DemoCallSpec } from '@/content/types'

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'fallback'

const ACTIONABLE_REASONS = new Set([
  'invalid_phone',
  'throttled',
  'daily_cap',
  'opted_out',
])

interface DemoResponse {
  ok?: boolean
  queued?: boolean
  reason?: string
  message?: string
}

export function DemoCallForm({ demo }: { demo: DemoCallSpec }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [locality, setLocality] = useState('')
  const [propertyInterest, setPropertyInterest] = useState('')
  const [trapField, setTrapField] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const rescueLink = BRAND.whatsapp(
    `${demo.rescueMessage}${name ? ` My name: ${name}.` : ''} My number: ${phone || ''}${
      locality ? ` Locality: ${locality}.` : ''
    }${propertyInterest ? ` Property: ${propertyInterest}.` : ''}`,
  )

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          phone,
          locality,
          name,
          property_interest: propertyInterest,
          trap_field: trapField,
        }),
      })
      const data = (await response.json().catch(() => ({}))) as DemoResponse

      if (response.ok && data.ok && data.queued) {
        setStatus('success')
        return
      }

      if (
        data.reason &&
        ACTIONABLE_REASONS.has(data.reason) &&
        typeof data.message === 'string'
      ) {
        setMessage(data.message)
        setStatus('error')
        return
      }

      setStatus('fallback')
    } catch {
      setStatus('fallback')
    }
  }

  return (
    <Section id="demo-call" spacing="loose" divided aria-labelledby="demo-call-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <Reveal>
            <div>
              <Eyebrow className="mb-5">{demo.eyebrow}</Eyebrow>
              <Heading level={2} size="xl" id="demo-call-title" className="mb-5">
                {demo.title}
              </Heading>
              <Text size="lg">{demo.sub}</Text>

              <ol className="mt-8 grid gap-5">
                {demo.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="tnum mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] text-[0.75rem] font-semibold text-[var(--accent)]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-[var(--text-1)]">{step.title}</p>
                      <p className="mt-1 text-[0.875rem] leading-[1.6] text-[var(--text-3)]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal index={1}>
            <div className="rounded-[var(--r-xl)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5 shadow-[var(--shadow-2)] sm:p-8">
              {status === 'success' ? (
                <StatusPanel
                  icon={<CheckCircle2 size={23} />}
                  tone="success"
                  title={demo.success.title}
                  body={demo.success.body}
                  action={{ label: demo.success.rescueLabel, href: rescueLink }}
                />
              ) : status === 'fallback' ? (
                <StatusPanel
                  icon={<AlertCircle size={23} />}
                  tone="warning"
                  title={demo.fallback.title}
                  body={demo.fallback.body}
                  action={{ label: demo.fallback.rescueLabel, href: rescueLink }}
                />
              ) : (
                <form onSubmit={submit} aria-labelledby="demo-call-title">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="demo-name"
                      label={demo.fields.name.label}
                      placeholder={demo.fields.name.placeholder}
                      value={name}
                      onChange={setName}
                      autoComplete="name"
                      maxLength={60}
                    />
                    <Field
                      id="demo-phone"
                      label={demo.fields.phone.label}
                      placeholder={demo.fields.phone.placeholder}
                      value={phone}
                      onChange={setPhone}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={24}
                      required
                      invalid={status === 'error'}
                      describedBy={status === 'error' ? 'demo-call-error' : undefined}
                    />
                    <Field
                      id="demo-locality"
                      label={demo.fields.locality.label}
                      placeholder={demo.fields.locality.placeholder}
                      value={locality}
                      onChange={setLocality}
                      maxLength={80}
                    />
                    <Field
                      id="demo-property"
                      label={demo.fields.propertyInterest.label}
                      placeholder={demo.fields.propertyInterest.placeholder}
                      value={propertyInterest}
                      onChange={setPropertyInterest}
                      maxLength={80}
                    />
                  </div>

                  <div
                    aria-hidden="true"
                    className="absolute h-0 w-0 overflow-hidden opacity-0"
                  >
                    <label htmlFor="demo-trap">Leave this field empty</label>
                    <input
                      id="demo-trap"
                      name="trap_field"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      data-lpignore="true"
                      data-1p-ignore
                      data-form-type="other"
                      value={trapField}
                      onChange={(event) => setTrapField(event.target.value)}
                    />
                  </div>

                  {status === 'error' ? (
                    <p
                      id="demo-call-error"
                      role="alert"
                      className="mt-5 flex items-start gap-2 text-[0.875rem] text-[var(--warn)]"
                    >
                      <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                      {message}
                    </p>
                  ) : null}

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--r-lg)] bg-[var(--cta)] px-6 font-semibold text-[var(--cta-fg)] shadow-[var(--shadow-2)] transition-all duration-[var(--dur-fast)] hover:-translate-y-px hover:bg-[var(--cta-hover)] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {status === 'submitting' ? (
                        <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
                      ) : (
                        <PhoneCall size={18} aria-hidden="true" />
                      )}
                      {status === 'submitting' ? demo.submittingLabel : demo.submitLabel}
                    </button>
                    <a
                      href={rescueLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--r-lg)] border border-[var(--border-subtle)] px-5 font-medium text-[var(--text-2)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)] hover:text-[var(--text-1)]"
                    >
                      <MessageCircle size={18} aria-hidden="true" />
                      {demo.whatsappLabel}
                    </a>
                  </div>

                  <p className="mt-5 text-[0.8125rem] leading-[1.6] text-[var(--text-3)]">
                    {demo.privacy}
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

interface FieldProps {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'tel'
  inputMode?: 'text' | 'tel'
  autoComplete?: string
  maxLength: number
  required?: boolean
  invalid?: boolean
  describedBy?: string
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  inputMode = 'text',
  autoComplete,
  maxLength,
  required,
  invalid,
  describedBy,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.8125rem] font-medium text-[var(--text-2)]">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        maxLength={maxLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className="mt-2 h-12 w-full rounded-[var(--r-md)] border border-[var(--border-subtle)] bg-[var(--surface-2)] px-4 text-[0.9375rem] text-[var(--text-1)] outline-none transition-colors placeholder:text-[var(--text-3)] hover:border-[var(--border-strong)] focus:border-[var(--accent)]"
      />
    </div>
  )
}

interface StatusPanelProps {
  icon: React.ReactNode
  tone: 'success' | 'warning'
  title: string
  body: string
  action: { label: string; href: string }
}

function StatusPanel({ icon, tone, title, body, action }: StatusPanelProps) {
  const color = tone === 'success' ? 'var(--success)' : 'var(--accent)'

  return (
    <div aria-live="polite" className="py-3 sm:py-6">
      <div
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface-3)]"
        style={{ color }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <Heading level={3} size="md" className="mb-3">
        {title}
      </Heading>
      <Text>{body}</Text>
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-[var(--r-md)] border border-[var(--border-subtle)] px-5 text-[0.875rem] font-medium transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]"
      >
        <MessageCircle size={17} aria-hidden="true" />
        {action.label}
      </a>
    </div>
  )
}
