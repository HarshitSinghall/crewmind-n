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
    'Five employees who never sleep, never resign, and cost 80% less. Tell us the jobs — we build them.',
  email: 'hello@crewmind.in',
  phone: '+91 70175 31825',
  phoneHref: 'tel:+917017531825',
  address: ['Gurugram', 'Delhi NCR', 'India'],
  /*
    The real scheduling link. Public by design — it is the page invitees
    book on, and it carries no credential.

    Two things about this event live in Calendly's own settings and cannot be
    fixed from here: the account timezone is still America/New_York (Calendly's
    default), so availability is being offered in US Eastern rather than IST,
    and the event is still called "30 Minute Meeting". Both show to invitees.
  */
  calendly: 'https://calendly.com/harshitsinghal822/30min',
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

/*
  The nav CTA, which renders on every page.

  It used to point at '#book', but that anchor only exists inside
  BookingSection, and BookingSection only renders on the homepage — so the
  button silently scrolled nowhere on /about, /pricing, /priya and the rest.
  Pointing it straight at the scheduler works from anywhere. The homepage
  still has its in-page path via the hero CTA, which keeps '#book'.
*/
export const PRIMARY_CTA = {
  label: 'Book a free hiring call',
  href: BRAND.calendly,
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
