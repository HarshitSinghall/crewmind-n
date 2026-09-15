const ACTIONABLE_REASONS = new Set([
  'invalid_phone',
  'throttled',
  'daily_cap',
  'opted_out',
  'consent_required',
])

interface DemoRequestBody {
  phone?: unknown
  locality?: unknown
  name?: unknown
  property_interest?: unknown
  trap_field?: unknown
  consent?: unknown
}

interface UpstreamBody {
  ok?: boolean
  queued?: boolean
  reason?: string
  message?: string
  status?: string
  workflow_run_id?: number | string
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

export async function handleDemoRequest(request: Request): Promise<Response> {
  let body: DemoRequestBody

  try {
    body = (await request.json()) as DemoRequestBody
  } catch {
    return reply(
      { ok: false, reason: 'bad_request', message: 'Could not read that request.' },
      400,
    )
  }

  return handleDemoInput(request.method, body)
}

async function handleDemoInput(
  method: string | undefined,
  body: DemoRequestBody,
): Promise<Response> {
  if (method !== 'POST') {
    return reply({ ok: false, reason: 'method_not_allowed' }, 405)
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

  if (body.consent !== true) {
    return reply(
      {
        ok: false,
        reason: 'consent_required',
        message: 'Confirm that you are authorised to request this demo call.',
      },
      422,
    )
  }

  const text = (value: unknown, max: number) =>
    String(value ?? '')
      .slice(0, max)
      .trim()

  const dograhApiKey = process.env.DOGRAH_API_KEY?.trim()
  const dograhTriggerUuid = process.env.DOGRAH_TRIGGER_UUID?.trim()
  const dograhBaseUrl =
    process.env.DOGRAH_BASE_URL?.trim().replace(/\/+$/, '') ||
    'https://api.dograh.com'
  const webhookEndpoint = process.env.CREWMIND_DEMO_WEBHOOK_URL?.trim()
  const hasPartialDograhConfig = Boolean(dograhApiKey) !== Boolean(dograhTriggerUuid)

  if (hasPartialDograhConfig) {
    console.error('[demo] incomplete Dograh configuration')
    return reply({ ok: false, reason: 'unconfigured' }, 503)
  }

  const usesDograh = Boolean(dograhApiKey && dograhTriggerUuid)
  const endpoint = usesDograh
    ? `${dograhBaseUrl}/api/v1/public/agent/${encodeURIComponent(dograhTriggerUuid!)}`
    : webhookEndpoint

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
        ...(usesDograh
          ? { 'X-API-Key': dograhApiKey! }
          : process.env.CREWMIND_DEMO_WEBHOOK_TOKEN
          ? { 'x-crewmind-token': process.env.CREWMIND_DEMO_WEBHOOK_TOKEN }
          : {}),
      },
      body: JSON.stringify(
        usesDograh
          ? {
              phone_number: phone,
              initial_context: {
                source: 'website_demo',
                name: text(body.name, 60) || null,
                locality: text(body.locality, 80) || null,
                property_interest: text(body.property_interest, 80) || null,
              },
            }
          : {
              source: 'website_demo',
              phone,
              locality: text(body.locality, 80) || null,
              name: text(body.name, 60) || null,
              property_interest: text(body.property_interest, 80) || null,
              requested_at: new Date().toISOString(),
            },
      ),
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

      console.error('[demo] call provider rejected request', upstream.status, reason)
      return reply({ ok: false, reason: 'upstream' }, 502)
    }

    const dograhAccepted =
      usesDograh &&
      detail?.status === 'initiated' &&
      ((typeof detail.workflow_run_id === 'number' &&
        Number.isFinite(detail.workflow_run_id)) ||
        (typeof detail.workflow_run_id === 'string' &&
          detail.workflow_run_id.trim().length > 0))
    const webhookAccepted =
      !usesDograh && detail?.ok === true && detail.queued === true

    // A 2xx without provider acceptance must not become a false success screen.
    if (!dograhAccepted && !webhookAccepted) {
      console.error('[demo] call provider returned no dispatch confirmation')
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

/**
 * Vercel's Node serverless runtime invokes `api/*.ts` with `(req, res)`, not
 * the Web Fetch API's `Request -> Response` signature. The adapter keeps the
 * testable business logic above web-standard while always completing Vercel's
 * HTTP response below.
 */
type VercelRequest = IncomingMessage & { body?: unknown }

export default async function handler(
  request: VercelRequest,
  response: ServerResponse,
): Promise<void> {
  const body = request.body
  const result = await handleDemoInput(
    request.method,
    body && typeof body === 'object' ? (body as DemoRequestBody) : {},
  )

  response.statusCode = result.status
  result.headers.forEach((value, name) => response.setHeader(name, value))
  response.end(await result.text())
}
import type { IncomingMessage, ServerResponse } from 'node:http'
