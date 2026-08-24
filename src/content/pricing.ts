import type { PricingContent } from './types'
import { BRAND } from './site'

/* ---------------------------------------------------------------------------
   PLACEHOLDER CONTENT — see CONTENT-SWAP.md
   Transcribed from docs/reference/autoploy-pricing.md. Every string here is
   third-party copy standing in until real CrewMind copy is written.
--------------------------------------------------------------------------- */

export const PRICING: PricingContent = {
  seo: {
    title: 'Pricing',
    description:
      'One scoped proposal, one fixed fee, and a full refund if we do not deliver exactly what was agreed. No monthly charges, and you own everything we build.',
  },

  hero: {
    eyebrow: 'Pricing',
    headline: {
      lead: 'One proposal.',
      emphasis: 'Guaranteed results.',
    },
    sub: "We scope every project with a clear proposal. If we don't deliver exactly what's in it, you get 100% of your money back.",
    assurances: [
      'One-time project fee',
      'No monthly charges',
      'You own all code and workflows',
    ],
  },

  tiers: [
    {
      id: 'build',
      badge: 'Standard Build',
      title: 'AI Setup & Build',
      body: 'For businesses that need a specific AI system built, agents, automations, RAG pipelines, or custom integrations. Scoped, built, and handed over working.',
      price: {
        label: 'Starting from',
        value: '$500 – $7,000+',
        note: 'One-time project fee. No monthly charges to us.',
      },
      features: [
        'Full discovery & requirements document',
        'Custom-built to your exact specification',
        'Integrated with your existing tools',
        'Tested and handed over working',
        '30-day post-launch support',
        'You own all code, agents & workflows',
        'No monthly fees to us',
      ],
      cta: { label: 'Book a Free Strategy Call', href: BRAND.calendly },
      secondaryCta: {
        label: 'Message Us on WhatsApp',
        href: BRAND.whatsapp("Hello I'd like to learn more about the pricing."),
      },
      featured: true,
    },
    {
      id: 'enterprise',
      badge: 'Enterprise',
      title: 'Enterprise & Partnership',
      body: 'For teams with complex AI infrastructure needs, RAG systems, private LLM deployments, multi-agent workflows, and deep integrations. We scope this together on a call.',
      features: [
        'Dedicated project team across the engagement',
        'Architecture & system design upfront',
        'RAG systems, private LLM deployments, AI agents',
        'Full integration into your existing infrastructure',
        'IP and source code ownership transferred',
        'Ongoing retainer options available',
      ],
      note: 'We ask that you book a call before we commit to anything. We invest real time and expertise in every engagement — just as we ask you to value yours, we ask you to value ours.',
      cta: { label: 'Book a Strategy Call', href: BRAND.calendly },
    },
  ],

  guarantee: {
    title: '100% Money-Back Guarantee',
    body: "If we don't deliver exactly what's agreed in your proposal and requirements, you get every dollar back. No questions asked.",
  },

  /*
    Not in the reference — the reference leaves the two tiers as parallel
    feature lists and makes you read both to work out which one you are.
    Same facts, restructured into the one question a visitor actually has.
  */
  comparison: {
    eyebrow: 'Which one am I',
    title: 'Two ways to work with us.',
    sub: 'Same engineering team, same ownership terms. The difference is scope, and how the scope gets decided.',
    columns: ['AI Setup & Build', 'Enterprise & Partnership'],
    rows: [
      {
        id: 'fit',
        label: 'Best for',
        values: [
          'A specific system you can describe today',
          'Infrastructure that needs designing first',
        ],
      },
      {
        id: 'scoping',
        label: 'How it is scoped',
        values: [
          'Discovery call, then a fixed written proposal',
          'Architecture and system design before any quote',
        ],
      },
      {
        id: 'price',
        label: 'Investment',
        values: ['$500 – $7,000+ one-time', 'Scoped together on a call'],
      },
      {
        id: 'team',
        label: 'Team',
        values: [
          'Assigned engineer through delivery',
          'Dedicated project team across the engagement',
        ],
      },
      {
        id: 'scope',
        label: 'Typical scope',
        values: [
          'Agents, automations, integrations, RAG pipelines',
          'RAG systems, private LLM deployments, multi-agent workflows',
        ],
      },
      {
        id: 'support',
        label: 'After launch',
        values: ['30-day post-launch support', 'Ongoing retainer options available'],
      },
      {
        id: 'ownership',
        label: 'Ownership',
        values: [
          'You own all code, agents & workflows',
          'IP and source code ownership transferred',
        ],
      },
      {
        id: 'recurring',
        label: 'Monthly fees to us',
        values: ['None', 'None, unless you choose a retainer'],
      },
    ],
    note: 'Not sure which line you fall on? Book the call — scoping it is the call.',
  },

  /*
    Repointed at the flagship. The tiers above are still the reference's
    placeholder band and are flagged in CONTENT-SWAP.md; Priya's price is
    real, named in full, and one click away — so the page has at least one
    honest number on it while those tiers wait to be rewritten.
  */
  resource: {
    eyebrow: 'Flagship product',
    title: 'Looking for Priya?',
    body: 'Our lead-response product is priced separately and plainly: ₹30,000 one-time setup, then ₹12,000 a month with 500 leads included. Every enquiry called inside sixty seconds, in Hindi, at any hour.',
    cta: { label: 'See the Priya plan', href: '/priya' },
  },

  proof: {
    title: 'Rated 4.5 on Trustpilot',
    sub: 'See what our verified clients have to say',
    cta: {
      label: 'View all reviews on Trustpilot',
      href: 'https://www.trustpilot.com/review/example.com',
    },
  },

  close: {
    eyebrow: 'Next step',
    title: 'Get the proposal before you commit a dollar.',
    sub: 'The strategy call is free, and you leave it with a scoped plan whether or not you hire us.',
    cta: {
      primary: { label: 'Book a Free Strategy Call', href: BRAND.calendly },
      secondary: { label: 'See what we have built', href: '/past-projects' },
    },
  },
}
