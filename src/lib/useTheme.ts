import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'
export type ThemePreference = Theme | 'system'

const STORAGE_KEY = 'crewmind-theme'

/** Reads the stored choice. Storage can throw outright in locked-down modes. */
function readStored(): ThemePreference {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'dark' || value === 'light' ? value : 'system'
  } catch {
    return 'system'
  }
}

function systemTheme(): Theme {
  // jsdom and very old browsers have no matchMedia; dark is the primary theme,
  // so that is the honest fallback rather than guessing light.
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/**
 * Theme state, in three parts:
 *
 * - `preference` is what the user chose: 'dark', 'light', or 'system'
 * - `theme` is what is actually rendering right now
 * - `setPreference` persists the choice and stamps `data-theme` on <html>
 *
 * The CSS does the real work (see tokens.css). This hook only owns the
 * attribute and the stored value, so a visitor with JS disabled still gets a
 * correct theme from `prefers-color-scheme` — it just cannot be toggled.
 *
 * The initial attribute is set by an inline script in index.html so there is
 * no flash of the wrong theme before React mounts; this hook deliberately
 * agrees with that script rather than fighting it.
 */
export function useTheme() {
  const [preference, setPreferenceState] = useState<ThemePreference>(readStored)
  const [resolved, setResolved] = useState<Theme>(() =>
    preference === 'system' ? systemTheme() : preference,
  )

  // Follow the OS while the preference is 'system'.
  useEffect(() => {
    if (preference !== 'system') {
      setResolved(preference)
      return
    }

    setResolved(systemTheme())

    if (typeof window === 'undefined' || !window.matchMedia) return
    const query = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => setResolved(systemTheme())

    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [preference])

  // Mirror the preference onto <html>. 'system' removes the attribute so the
  // media query in tokens.css takes over again.
  useEffect(() => {
    const root = document.documentElement
    if (preference === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', preference)
  }, [preference])

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
    try {
      if (next === 'system') localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage unavailable — the choice still applies for this page view.
    }
  }, [])

  /** Flips to the opposite of whatever is on screen, leaving 'system' behind. */
  const toggle = useCallback(() => {
    setPreference(resolved === 'dark' ? 'light' : 'dark')
  }, [resolved, setPreference])

  return { theme: resolved, preference, setPreference, toggle }
}
