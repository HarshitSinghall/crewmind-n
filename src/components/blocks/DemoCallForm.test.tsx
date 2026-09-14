import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DemoCallForm } from './DemoCallForm'
import { PRIYA } from '@/content/priya'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('DemoCallForm', () => {
  it('submits the visitor details and only celebrates a queued call', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      Response.json({ ok: true, queued: true }),
    )
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()

    render(<DemoCallForm demo={PRIYA.demo} />)
    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: 'Rajesh' },
    })
    fireEvent.change(screen.getByLabelText(/Indian mobile number/i), {
      target: { value: '9876543210' },
    })
    fireEvent.change(screen.getByLabelText(/^Locality/i), {
      target: { value: 'Gurugram' },
    })
    fireEvent.change(screen.getByLabelText(/Property to ask about/i), {
      target: { value: '3BHK' },
    })
    await user.click(screen.getByRole('checkbox', { name: /I am 18 or older/i }))
    await user.click(screen.getByRole('button', { name: 'Call me now' }))

    expect(await screen.findByText(PRIYA.demo.success.title)).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledOnce()
    const [, options] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(JSON.parse(String(options.body))).toMatchObject({
      phone: '9876543210',
      name: 'Rajesh',
      locality: 'Gurugram',
      property_interest: '3BHK',
      consent: true,
    })
  })

  it('offers the prepared WhatsApp rescue when the proxy is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    const user = userEvent.setup()

    render(<DemoCallForm demo={PRIYA.demo} />)
    fireEvent.change(screen.getByLabelText(/Indian mobile number/i), {
      target: { value: '9876543210' },
    })
    await user.click(screen.getByRole('checkbox', { name: /I am 18 or older/i }))
    await user.click(screen.getByRole('button', { name: 'Call me now' }))

    const rescue = await screen.findByRole('link', {
      name: PRIYA.demo.fallback.rescueLabel,
    })
    expect(rescue).toHaveAttribute('href', expect.stringContaining('wa.me'))
    expect(rescue).toHaveAttribute('href', expect.stringContaining('9876543210'))
  })
})
