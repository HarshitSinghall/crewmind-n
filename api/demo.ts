const ACTIONABLE_REASONS = new Set([
  'invalid_phone',
  'throttled',
  'daily_cap',
  'opted_out',
])

interface DemoRequestBody {
  phone?: unknown
  locality?: unknown
  name?: unknown
  property_interest?: unknown
  trap_field?: unknown
}

interface UpstreamBody {
  ok?: boolean
  queued?: boolean
  reason?: string
  message?: string
}

function reply(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  })
}

/** Accept 98XXXXXXXX, 098…, +9198… and 91 98… input shapes. */
export function normaliseIndianMobile(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  let local = digits
  if (local.length === 12 && local.startsWith('91')) local = local.slice(2)
  else if (local.length === 11 && local.startsWith('0')) local = local.slice(1)
  if (!/^[6-9]\d{9}$/.test(local)) return null
  return `+91${local}`
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return reply({ ok: false, reason: 'method_not_allowed' }, 405)
  }

  let body: DemoRequestBody
  try {
    body = (await request.json()) as DemoRequestBody
  } catch {
    return reply(
      { ok: false, reason: 'bad_request', message: 'Could not read that request.' },
      400,
    )
  }

  // Browser autofill must never target this deliberately meaningless field.
  // Bots get a quiet success while no request reaches n8n.
  if (body.trap_field) return reply({ ok: true, queued: false })

  const phone = normaliseIndianMobile(String(body.phone ?? ''))
  if (!phone) {
    return reply(
      {
        ok: false,
        reason: 'invalid_phone',
        message: 'That does not look like a 10-digit Indian mobile number.',
      },
      422,
    )
  }

  const text = (value: unknown, max: number) =>
    String(value ?? '')
      .slice(0, max)
      .trim()

  const endpoint = process.env.CREWMIND_DEMO_WEBHOOK_URL
  if (!endpoint) return reply({ ok: false, reason: 'unconfigured' }, 503)

  try {
    new URL(endpoint)
  } catch {
    console.error('[demo] invalid CREWMIND_DEMO_WEBHOOK_URL')
    return reply({ ok: false, reason: 'unconfigured' }, 503)
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8_000)

  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(process.env.CREWMIND_DEMO_WEBHOOK_TOKEN
          ? { 'x-crewmind-token': process.env.CREWMIND_DEMO_WEBHOOK_TOKEN }
          : {}),
      },
      body: JSON.stringify({
        source: 'website_demo',
        phone,
        locality: text(body.locality, 80) || null,
        name: text(body.name, 60) || null,
        property_interest: text(body.property_interest, 80) || null,
        requested_at: new Date().toISOString(),
      }),
      signal: controller.signal,
    })

    const detail = (await upstream.json().catch(() => null)) as UpstreamBody | null

    if (!upstream.ok) {
      const reason = typeof detail?.reason === 'string' ? detail.reason : ''
      if (
        ACTIONABLE_REASONS.has(reason) &&
        typeof detail?.message === 'string'
      ) {
        return reply(
          { ok: false, reason, message: detail.message },
          upstream.status,
        )
      }

      console.error('[demo] webhook rejected request', upstream.status, reason)
      return reply({ ok: false, reason: 'upstream' }, 502)
    }

    // A 2xx without an explicit dispatch confirmation must not become a false
    // "your phone is ringing" screen.
    if (detail?.ok !== true || detail.queued !== true) {
      console.error('[demo] webhook returned no queue confirmation')
      return reply({ ok: false, reason: 'upstream' }, 502)
    }

    return reply({ ok: true, queued: true })
  } catch (error) {
    console.error(
      '[demo] webhook request failed',
      error instanceof Error ? error.name : 'unknown_error',
    )
    return reply({ ok: false, reason: 'upstream' }, 502)
  } finally {
    clearTimeout(timeout)
  }
}
