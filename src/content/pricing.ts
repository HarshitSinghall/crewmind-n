import type { PricingContent } from './types'
import { BRAND } from './site'

/* Public commercial copy. Only Priya has a published price; other work is scoped. */

export const PRICING: PricingContent = {
  seo: {
    title: 'Pricing',
    description:
      'Crewmind scopes custom AI work after discovery. Priya has a published plan; other engagements are quoted against an agreed architecture and acceptance criteria.',
  },

  hero: {
    eyebrow: 'Pricing',
    headline: {
      lead: 'Price the workflow',
      emphasis: 'after the boundaries are clear',
    },
    sub: 'Custom work is priced after we understand the systems involved, the controls required, and how acceptance will be tested. No invented starting band and no outcome promise before discovery.',
    assurances: [
      'Written scope before work',
      'Dependencies named upfront',
      'Ownership agreed in the proposal',
    ],
  },

  tiers: [
    {
      id: 'build',
      badge: 'Focused workflow',
      title: 'Scoped Automation Build',
      body: 'For a defined operational workflow with known inputs, owners, integrations, and acceptance cases.',
      features: [
        'Current-state workflow map',
        'Proposed architecture and responsibility boundaries',
        'Named integrations and access requirements',
        'Representative acceptance and failure cases',
        'Deployment, support, and ownership terms in writing',
      ],
      cta: { label: 'Book a Scoping Call', href: BRAND.calendly },
      secondaryCta: {
        label: 'Message Us on WhatsApp',
        href: BRAND.whatsapp("Hello I'd like to learn more about the pricing."),
      },
      featured: true,
    },
    {
      id: 'enterprise',
      badge: 'Multi-system scope',
      title: 'Architecture & Integration Engagement',
      body: 'For workflows that cross several systems, permission models, data sources, teams, or operational controls.',
      features: [
        'Architecture and data-flow review',
        'Identity, permission, and audit boundaries',
        'Integration and deployment planning',
        'Evaluation and release criteria',
        'Handover and operating model',
      ],
      note: 'Scope, staffing, timing, commercial model, ownership, and support are agreed after the architecture is understood.',
      cta: { label: 'Book a Strategy Call', href: BRAND.calendly },
    },
  ],

  guarantee: {
    title: 'Acceptance before promises',
    body: 'Each proposal should define what will be delivered, how it will be tested, the customer dependencies, and what happens when an acceptance case does not pass.',
  },

  /*
    Not in the reference — the reference leaves the two tiers as parallel
    feature lists and makes you read both to work out which one you are.
    Same facts, restructured into the one question a visitor actually has.
  */
  comparison: {
    eyebrow: 'Which one am I',
    title: 'Two ways to work with us.',
    sub: 'The difference is how many systems, teams, and control boundaries the work crosses.',
    columns: ['Scoped Automation Build', 'Architecture & Integration Engagement'],
    rows: [
      {
        id: 'fit',
        label: 'Best for',
        values: [
          'One bounded workflow with a named owner',
          'A cross-system programme requiring architecture first',
        ],
      },
      {
        id: 'scoping',
        label: 'How it is scoped',
        values: [
          'Workflow mapping followed by a written proposal',
          'Architecture review followed by a phased proposal',
        ],
      },
      {
        id: 'price',
        label: 'Investment',
        values: ['Quoted after workflow review', 'Quoted after architecture review'],
      },
      {
        id: 'team',
        label: 'Team',
        values: [
          'Named delivery owner in the proposal',
          'Roles agreed for each phase',
        ],
      },
      {
        id: 'scope',
        label: 'Typical scope',
        values: [
          'One automation, agent, or integration path',
          'Multiple data, agent, and integration boundaries',
        ],
      },
      {
        id: 'support',
        label: 'After launch',
        values: ['Defined in the proposal', 'Defined per phase or operating model'],
      },
      {
        id: 'ownership',
        label: 'Ownership',
        values: [
          'Defined in the signed proposal',
          'Defined in the signed agreement',
        ],
      },
      {
        id: 'recurring',
        label: 'Recurring costs',
        values: ['Provider and support costs identified in scope', 'Operating costs modelled during architecture'],
      },
    ],
    note: 'If the workflow cannot be bounded on the first call, it belongs in architecture discovery.',
  },

  resource: {
    eyebrow: 'Flagship product',
    title: 'Looking for Priya?',
    body: 'Priya has a published plan: ₹30,000 one-time setup, then ₹12,000 a month with 500 leads included. The product page states the intended service level, exclusions, and limits; availability remains subject to readiness and the signed agreement.',
    cta: { label: 'See the Priya plan', href: '/priya' },
  },

  proof: {
    title: 'No public review score',
    sub: 'Crewmind does not currently publish an aggregate customer rating.',
    cta: {
      label: 'Review the system blueprints',
      href: '/past-projects',
    },
  },

  close: {
    eyebrow: 'Next step',
    title: 'Start with a scope you can challenge.',
    sub: 'Bring the workflow, constraints, and systems involved. The next step is a written scope, not an unsupported result promise.',
    cta: {
      primary: { label: 'Book a Scoping Call', href: BRAND.calendly },
      secondary: { label: 'See what we have built', href: '/past-projects' },
    },
  },
}
