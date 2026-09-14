import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { BRAND, FOOTER_LINKS } from '@/content/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-1)]/40">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <BrandLogo className="mb-4 h-10" />
            <p className="max-w-[24rem] text-[0.875rem] leading-[1.6] text-[var(--text-2)]">
              {BRAND.tagline}
            </p>
          </div>

          <nav aria-labelledby="footer-nav-title">
            <h2
              id="footer-nav-title"
              className="mb-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[var(--text-3)]"
            >
              Site
            </h2>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[0.875rem] text-[var(--text-2)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--text-1)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[var(--text-3)]">
              Contact
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-2.5 text-[0.875rem] text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]"
                >
                  <Mail size={14} aria-hidden="true" className="shrink-0 text-[var(--text-3)]" />
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.phoneHref}
                  className="flex items-center gap-2.5 text-[0.875rem] text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]"
                >
                  <Phone size={14} aria-hidden="true" className="shrink-0 text-[var(--text-3)]" />
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[0.875rem] text-[var(--text-2)]">
                <MapPin
                  size={14}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-[var(--text-3)]"
                />
                <span>
                  {BRAND.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/*
          The registered entity, on the page on purpose. A broker deciding
          whether to hand over his customers' phone numbers can verify a GSTIN
          in about thirty seconds, and an AI company with no traceable legal
          entity is exactly the thing he has been warned about.
        */}
        {BRAND.legal && (
          <p className="mt-10 border-t border-[var(--border-subtle)] pt-6 text-[0.8125rem] leading-[1.7] text-[var(--text-3)]">
            {BRAND.legal.entity} · GSTIN {BRAND.legal.gstin}
            <br />
            {BRAND.legal.addressLine}
          </p>
        )}

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border-subtle)] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-[var(--text-3)]">
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-5">
            <li>
              <Link
                to="/privacy"
                className="text-[0.8125rem] text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-[0.8125rem] text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]"
              >
                Terms of Service
              </Link>
            </li>
            {BRAND.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.8125rem] text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
