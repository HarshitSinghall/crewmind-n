import type { Brand, NavLink } from './types'

/* ---------------------------------------------------------------------------
   PLACEHOLDER CONTENT — see CONTENT-SWAP.md
   Brand identity lives here and nowhere else. Change these values and the
   whole site follows.
--------------------------------------------------------------------------- */

const WHATSAPP_NUMBER = '85228105510'

export const BRAND: Brand = {
  name: 'CrewMind',
  url: 'https://crewmind.example',
  tagline: 'Simplifying and automating business processes using cutting-edge AI.',
  email: 'hello@crewmind.example',
  phone: '+852 2810 5510',
  phoneHref: 'tel:+85228105510',
  address: ['801-802 Stag Building', '148-150 Queens Road Central', 'Hong Kong'],
  calendly: 'https://calendly.com/example/discovery-call',
  whatsapp: (message = "Hello I'd like to learn more about your services.") =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
  socials: [{ label: 'LinkedIn', href: 'https://linkedin.com/company/example' }],
  sisterSite: undefined,
}

/** `pending: true` marks routes that land in Phase 2/3. */
export const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '/services', pending: true },
  { label: 'GEO', href: '/services/geo', pending: true },
  { label: 'Pricing', href: '/pricing' },
  { label: 'See Our Work', href: '/past-projects', pending: true },
  { label: 'Meet the Team', href: '/about' },
  { label: 'Enterprise', href: '/enterprise' },
]

export const PRIMARY_CTA = {
  label: 'Book a Free Discovery Call',
  href: '#book',
} as const

export const FOOTER_LINKS: NavLink[] = [
  { label: 'Services', href: '/services', pending: true },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'See Our Work', href: '/past-projects', pending: true },
  { label: 'Meet the Team', href: '/about' },
]
