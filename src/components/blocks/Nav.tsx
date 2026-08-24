import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Container } from '@/components/ui/Container'
import { BRAND, NAV_LINKS, PRIMARY_CTA } from '@/content/site'
import { cn } from '@/lib/cn'

/** Past this scroll depth the bar gets its surface, and the CTA appears. */
const SURFACE_AT = 24
const CTA_AT = 560

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > SURFACE_AT)
      setShowCta(y > CTA_AT)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer on navigation.
  useEffect(() => setOpen(false), [location.pathname])

  // Lock the page while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)]',
        scrolled
          ? 'border-b border-[var(--border-subtle)] bg-[color-mix(in_oklch,var(--bg)_82%,transparent)] backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
      style={{ height: 'var(--nav-h)' }}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5 font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-[var(--text-1)]"
        >
          <Logomark />
          {BRAND.name}
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="rounded-[var(--r-sm)] px-3 py-2 text-[0.875rem] font-medium text-[var(--text-2)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--text-1)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/*
            The primary CTA is deliberately absent until the hero scrolls
            past, so there is never more than one primary action on screen.
          */}
          <div
            className={cn(
              'hidden transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)] lg:block',
              showCta ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0',
            )}
          >
            <Button href={PRIMARY_CTA.href} size="sm">
              {PRIMARY_CTA.label}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--r-md)] border border-[var(--border-subtle)] text-[var(--text-2)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-1)] lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-[var(--border-subtle)] bg-[var(--bg)] lg:hidden"
      >
        <Container className="flex flex-col gap-1 py-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="rounded-[var(--r-md)] px-3 py-3 text-[1rem] font-medium text-[var(--text-2)] transition-colors hover:bg-[var(--surface-1)] hover:text-[var(--text-1)]"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3">
            <Button href={PRIMARY_CTA.href} size="lg" className="w-full">
              {PRIMARY_CTA.label}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  )
}

/** Three ascending bars — automation, compounding. Deliberately not a robot. */
function Logomark() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--r-sm)] border border-[var(--border-subtle)] bg-[var(--surface-2)]"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="8" width="3" height="5" rx="1" fill="var(--accent-dim)" />
        <rect x="5.5" y="5" width="3" height="8" rx="1" fill="var(--accent)" />
        <rect x="10" y="1" width="3" height="12" rx="1" fill="var(--accent)" />
      </svg>
    </span>
  )
}
