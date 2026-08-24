import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Reveal } from '@/components/ui/Reveal'

function mockReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

describe('Reveal under reduced motion', () => {
  it('drops the transform and shows content immediately', () => {
    mockReducedMotion(true)
    render(<Reveal>revealed content</Reveal>)

    const el = screen.getByText('revealed content')
    expect(el.style.transform).toBe('none')
    expect(el.style.opacity).toBe('1')
    expect(el.style.transitionProperty).toBe('opacity')
    expect(el.style.transitionDelay).toBe('0ms')
  })

  it('animates transform when motion is allowed', () => {
    mockReducedMotion(false)
    render(<Reveal index={2}>animated content</Reveal>)

    const el = screen.getByText('animated content')
    expect(el.style.transitionProperty).toBe('opacity, transform')
    expect(el.style.transitionDelay).toBe('120ms')
  })
})
