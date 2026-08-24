import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useTheme } from './useTheme'

/** Stands in for matchMedia so the OS preference can be driven from a test. */
function mockSystem(prefersLight: boolean) {
  const listeners = new Set<() => void>()

  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('light') ? prefersLight : !prefersLight,
    media: query,
    onchange: null,
    addEventListener: (_: string, fn: () => void) => listeners.add(fn),
    removeEventListener: (_: string, fn: () => void) => listeners.delete(fn),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia

  return {
    change(nowPrefersLight: boolean) {
      mockSystem(nowPrefersLight)
      for (const fn of listeners) fn()
    },
  }
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useTheme', () => {
  it('follows the OS when nothing is stored', () => {
    mockSystem(true)
    const { result } = renderHook(() => useTheme())

    expect(result.current.preference).toBe('system')
    expect(result.current.theme).toBe('light')
    // No attribute, so the media query in tokens.css is what applies.
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
  })

  it('defaults to dark when the OS asks for dark', () => {
    mockSystem(false)
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('reacts to the OS changing while on system', () => {
    const system = mockSystem(false)
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')

    act(() => system.change(true))
    expect(result.current.theme).toBe('light')
  })

  it('stamps the attribute and persists an explicit choice', () => {
    mockSystem(false)
    const { result } = renderHook(() => useTheme())

    act(() => result.current.setPreference('light'))

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(localStorage.getItem('crewmind-theme')).toBe('light')
  })

  it('restores a stored choice over the OS preference', () => {
    localStorage.setItem('crewmind-theme', 'dark')
    mockSystem(true) // OS wants light...

    const { result } = renderHook(() => useTheme())

    expect(result.current.preference).toBe('dark') // ...the stored choice wins
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('ignores the OS once an explicit choice is set', () => {
    const system = mockSystem(false)
    const { result } = renderHook(() => useTheme())

    act(() => result.current.setPreference('dark'))
    act(() => system.change(true))

    expect(result.current.theme).toBe('dark')
  })

  it('toggles to the opposite of what is on screen', () => {
    mockSystem(false)
    const { result } = renderHook(() => useTheme())

    act(() => result.current.toggle())
    expect(result.current.theme).toBe('light')

    act(() => result.current.toggle())
    expect(result.current.theme).toBe('dark')
  })

  it('returning to system clears both the attribute and the stored value', () => {
    mockSystem(true)
    const { result } = renderHook(() => useTheme())

    act(() => result.current.setPreference('dark'))
    act(() => result.current.setPreference('system'))

    expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
    expect(localStorage.getItem('crewmind-theme')).toBeNull()
    expect(result.current.theme).toBe('light')
  })

  it('falls back to dark when storage throws', () => {
    mockSystem(false)
    const getItem = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('blocked')
      })

    const { result } = renderHook(() => useTheme())
    expect(result.current.preference).toBe('system')
    expect(result.current.theme).toBe('dark')

    getItem.mockRestore()
  })

  it('still applies a choice when storage cannot be written', () => {
    mockSystem(false)
    const setItem = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('quota')
      })

    const { result } = renderHook(() => useTheme())
    act(() => result.current.setPreference('light'))

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')

    setItem.mockRestore()
  })
})
