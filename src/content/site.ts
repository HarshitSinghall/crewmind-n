import type { Brand, NavLink } from './types'

/* ---------------------------------------------------------------------------
   Brand identity, in one object. Change these values and the whole site
   follows.

   These are the REAL registered facts, sourced from the GST REG-06
   certificate. They are not placeholder copy and must not be swapped out
   during the content sweep described in CONTENT-SWAP.md.
--------------------------------------------------------------------------- */

const WHATSAPP_NUMBER = '917017531825'

export const BRAND: Brand = {
  name: 'CrewMind',
  url: 'https://crewmind.in',
  tagline:
    'AI that answers your leads in sixty seconds, at any hour, in the language they called in.',
  email: 'hello@crewmind.in',
  phone: '+91 70175 31825',
  phoneHref: 'tel:+917017531825',
  address: ['Gurugram', 'Delhi NCR', 'India'],
  calendly: 'https://calendly.com/example/discovery-call',
  whatsapp: (message = "Hello I'd like to learn more about your services.") =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
  socials: [{ label: 'LinkedIn', href: 'https://linkedin.com/company/example' }],
  sisterSite: undefined,
  legal: {
    entity: 'Antimatter Technologies Private Limited',
    gstin: '37ABDCA0422F1Z8',
    addressLine:
      '42-44-18/1, Azitnagar, Ajith Singh Nagar, Vijayawada, Andhra Pradesh 520015, India',
  },
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Priya', href: '/priya' },
  { label: 'Services', href: '/services' },
  { label: 'Automations', href: '/automations' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'See Our Work', href: '/past-projects' },
  { label: 'Meet the Team', href: '/about' },
  { label: 'Enterprise', href: '/enterprise' },
]

export const PRIMARY_CTA = {
  label: 'Book a Free Discovery Call',
  href: '#book',
} as const

export const FOOTER_LINKS: NavLink[] = [
  { label: 'Priya', href: '/priya' },
  { label: 'Services', href: '/services' },
  { label: 'Automations', href: '/automations' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'See Our Work', href: '/past-projects' },
  { label: 'Meet the Team', href: '/about' },
]
