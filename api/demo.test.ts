import { afterEach, describe, expect, it, vi } from 'vitest'
import handler, { handleDemoRequest, normaliseIndianMobile } from './demo'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

function request(body: Record<string, unknown>) {
  return new Request('https://crewmind.in/api/demo', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('demo API', () => {
  it('normalises supported Indian mobile formats', () => {
    expect(normaliseIndianMobile('98765 43210')).toBe('+919876543210')
    expect(normaliseIndianMobile('+91-98765-43210')).toBe('+919876543210')
    expect(normaliseIndianMobile('09876543210')).toBe('+919876543210')
    expect(normaliseIndianMobile('123')).toBeNull()
  })

  it('rejects an invalid number without contacting n8n', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await handleDemoRequest(request({ phone: '123' }))

    expect(response.status).toBe(422)
    expect(await response.json()).toMatchObject({
      ok: false,
      reason: 'invalid_phone',
    })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('silently drops honeypot submissions', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await handleDemoRequest(
      request({ phone: '9876543210', trap_field: 'filled by bot' }),
    )

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true, queued: false })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('adds the private token and only confirms an explicitly queued call', async () => {
    vi.stubEnv('CREWMIND_DEMO_WEBHOOK_URL', 'https://n8n.example/webhook/demo/call')
    vi.stubEnv('CREWMIND_DEMO_WEBHOOK_TOKEN', 'server-only-token')
    const fetchMock = vi.fn().mockResolvedValue(
      Response.json({ ok: true, queued: true }),
    )
    vi.stubGlobal('fetch', fetchMock)

    const response = await handleDemoRequest(
      request({
        phone: '98765 43210',
        name: 'A'.repeat(70),
        locality: 'Gurugram',
        property_interest: '3BHK',
      }),
    )

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true, queued: true })
    expect(fetchMock).toHaveBeenCalledOnce()

    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://n8n.example/webhook/demo/call')
    expect(options.headers).toMatchObject({
      'x-crewmind-token': 'server-only-token',
    })
    expect(JSON.parse(String(options.body))).toMatchObject({
      source: 'website_demo',
      phone: '+919876543210',
      locality: 'Gurugram',
      property_interest: '3BHK',
      name: 'A'.repeat(60),
    })
  })

  it('adapts Vercel Node requests and completes the response', async () => {
    const setHeader = vi.fn()
    const end = vi.fn()
    const response = { setHeader, end, statusCode: 0 }

    await handler(
      { method: 'POST', body: { phone: '123' } } as never,
      response as never,
    )

    expect(response.statusCode).toBe(422)
    expect(setHeader).toHaveBeenCalledWith('cache-control', 'no-store')
    expect(JSON.parse(String(end.mock.calls[0][0]))).toMatchObject({
      ok: false,
      reason: 'invalid_phone',
    })
  })
})
