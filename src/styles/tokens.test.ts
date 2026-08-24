import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// Read from the project root rather than import.meta.url: vitest rewrites the
// module URL during transform, so it is not a file: URL by the time it runs.
const css = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8')

/**
 * Pulls the body of a block, counting braces so nested rules don't end it
 * early. Anchored to the start of a line: the file's header comment quotes
 * these same selectors, and a plain indexOf finds the prose first.
 */
function blockBody(selector: RegExp): string {
  const match = css.match(selector)
  if (!match || match.index === undefined) {
    throw new Error(`block not found: ${selector}`)
  }
  const start = match.index

  let i = css.indexOf('{', start)
  let depth = 0
  const from = i + 1

  for (; i < css.length; i++) {
    if (css[i] === '{') depth++
    else if (css[i] === '}') {
      depth--
      if (depth === 0) return css.slice(from, i)
    }
  }
  throw new Error(`unterminated block: ${selector}`)
}

/** Custom property declarations at the top level of a block body. */
function declarations(body: string): Map<string, string> {
  const found = new Map<string, string>()
  for (const match of body.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    found.set(match[1], match[2].replace(/\s+/g, ' ').trim())
  }
  return found
}

const DARK = /^:root \{/m
const MEDIA_LIGHT = /^@media \(prefers-color-scheme: light\)/m
const ATTR_LIGHT = /^:root\[data-theme='light'\] \{/m

const dark = declarations(blockBody(DARK))
const mediaLight = declarations(blockBody(MEDIA_LIGHT))
const attrLight = declarations(blockBody(ATTR_LIGHT))

describe('theme tokens', () => {
  it('defines the full palette on bare :root, so dark needs no JS and no media query', () => {
    for (const token of [
      '--bg',
      '--surface-1',
      '--surface-2',
      '--surface-3',
      '--border-subtle',
      '--border-strong',
      '--text-1',
      '--text-2',
      '--text-3',
      '--accent',
      '--accent-dim',
      '--cta',
      '--cta-hover',
      '--cta-fg',
      '--success',
      '--warn',
    ]) {
      expect(dark.has(token), `:root is missing ${token}`).toBe(true)
    }
  })

  it('keeps the two light blocks byte-for-byte in agreement', () => {
    // The media query serves visitors who never touch the toggle; the
    // attribute block serves those who do. If they drift, the site renders
    // one light theme before you press the button and a different one after.
    expect([...attrLight.keys()].sort()).toEqual([...mediaLight.keys()].sort())

    for (const [token, value] of attrLight) {
      expect(mediaLight.get(token), `${token} differs between the light blocks`).toBe(
        value,
      )
    }
  })

  it('overrides only tokens that already exist in the dark palette', () => {
    // A light-only token would be undefined in dark mode — the exact failure
    // that produces an invisible element in one theme and not the other.
    for (const token of attrLight.keys()) {
      if (token === '--bloom-opacity') continue
      expect(dark.has(token), `${token} is defined for light but not for dark`).toBe(true)
    }
  })

  it('actually changes every colour it redefines', () => {
    for (const [token, value] of attrLight) {
      const darkValue = dark.get(token)
      if (!darkValue) continue
      expect(value, `${token} is identical in both themes — drop the override`).not.toBe(
        darkValue,
      )
    }
  })

  it('guards the media query so an explicit dark choice still wins', () => {
    expect(css).toContain(":root:not([data-theme='dark'])")
  })

  it('declares color-scheme in both themes', () => {
    expect(blockBody(DARK)).toContain('color-scheme: dark')
    expect(blockBody(ATTR_LIGHT)).toContain('color-scheme: light')
  })

  it('mirrors the surface ramp instead of copying a generic light palette', () => {
    // Each surface step moves further FROM the canvas: lighter in dark,
    // darker in light. That is what lets a Card mean "one step off the page"
    // in both themes without a single conditional in any component.
    // Lightness is the first number in oklch().
    const lightness = (value: string) => Number(value.match(/oklch\(([\d.]+)/)![1])
    const ramp = (tokens: Map<string, string>) =>
      ['--surface-1', '--surface-2', '--surface-3'].map((t) => lightness(tokens.get(t)!))

    const darkBg = lightness(dark.get('--bg')!)
    const lightBg = lightness(attrLight.get('--bg')!)

    // Dark: strictly ascending away from a dark canvas.
    let previous = darkBg
    for (const step of ramp(dark)) {
      expect(step, 'dark ramp must ascend').toBeGreaterThan(previous)
      previous = step
    }

    // Light: strictly descending away from a light canvas.
    previous = lightBg
    for (const step of ramp(attrLight)) {
      expect(step, 'light ramp must descend').toBeLessThan(previous)
      previous = step
    }

    expect(lightBg).toBeGreaterThan(0.9)
    expect(darkBg).toBeLessThan(0.3)
  })

  it('darkens the accent for light so it can carry text on a pale canvas', () => {
    const lightness = (value: string) => Number(value.match(/oklch\(([\d.]+)/)![1])
    expect(lightness(attrLight.get('--accent')!)).toBeLessThan(
      lightness(dark.get('--accent')!),
    )
  })
})
