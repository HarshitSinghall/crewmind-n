import type { PricingContent } from './types'
import { BRAND } from './site'

/* ---------------------------------------------------------------------------
   Pricing.

   Rewritten onto the employee framing: you are either buying the employee
   outright or keeping one on payroll, and this page's whole job is to tell
   you which of the two you are.

   TWO NUMBERS ON THIS PAGE ARE STILL NOT OURS — see CONTENT-SWAP.md:

   - `tiers[0].price.value` is `$500 – $7,000+`, which is the structural
     reference's own published band. It is a competitor's price list sitting
     on our pricing page and it must be replaced before launch.
   - `guarantee` promises every dollar back. Nobody here has agreed to make
     that promise. Commit to it or delete the block; do not ship it undecided.

   The one honest number on this page is Priya's, in `resource`, and it is
   real: ₹30,000 to onboard, then ₹12,000 a month.
--------------------------------------------------------------------------- */

export const PRICING: PricingContent = {
  seo: {
    title: 'Pricing — Buy the Employee, or Keep One on Payroll',
    description:
      'Two ways to pay for someone who never resigns: a one-time build you own outright, or a monthly salary and we run them. Scoped on a free call, in writing, before you commit anything.',
  },

  hero: {
    eyebrow: 'Pricing',
    headline: {
      lead: 'Two ways to pay for someone who',
      emphasis: 'never resigns',
    },
    sub: 'Build the employee once and own it outright, or keep one on payroll and let us run it. Either way you leave the first call with the scope in writing and a fixed number against it.',
    assurances: [
      'A fixed fee against a written scope',
      'No seat licences, no per-user pricing',
      'You own the code, the data and the recordings',
    ],
  },

  tiers: [
    {
      id: 'build',
      badge: 'Most people start here',
      title: 'Buy the employee',
      body: 'You know the job. We scope it, build it, wire it into your tools, and hand it over working — and then it is yours, running on your accounts, with no monthly cheque to us.',
      price: {
        label: 'Starting from',
        value: '$500 – $7,000+',
        note: 'One-time build fee, against a scope you signed off first.',
      },
      features: [
        'A written job description before anyone builds anything',
        'Built to your exact process, not configured from a template',
        'Wired into the tools your team already opens every day',
        'Tested against real cases, then handed over working',
        '30 days of support from the person who built it',
        'You own the code, the prompts and the workflows',
        'No monthly fee to us once it is yours',
      ],
      cta: { label: 'Book a free hiring call', href: BRAND.calendly },
      secondaryCta: {
        label: 'Message us on WhatsApp',
        href: BRAND.whatsapp("Hello, I'd like to talk about what a build would cost."),
      },
      featured: true,
    },
    {
      id: 'enterprise',
      badge: 'Enterprise',
      title: 'Staff the department',
      body: 'Several roles that hand work to each other, running inside your own infrastructure — because your data cannot leave it. We design the architecture before anyone quotes you a number.',
      features: [
        'A dedicated team across the whole engagement',
        'Architecture and system design before any quote',
        'RAG systems, private model deployments, multi-role setups',
        'Deployed inside your infrastructure, not ours',
        'IP and source code ownership transferred to you',
        'Ongoing retainer available if you want us running it',
      ],
      note: 'We ask you to book a call before either side commits. We put real engineering time into scoping these, and we would rather spend it on an engagement that is a genuine fit — yours and ours both.',
      cta: { label: 'Book a scoping call', href: BRAND.calendly },
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

    `columns` must stay identical to the two tier titles above; the table is a
    restructure of the tiers, not a second source of truth, and
    content.test.ts asserts it.
  */
  comparison: {
    eyebrow: 'Which one am I',
    title: 'Two ways to work with us.',
    sub: 'Same engineers, same ownership terms. What differs is how much has to be designed before anyone can name a price.',
    columns: ['Buy the employee', 'Staff the department'],
    rows: [
      {
        id: 'fit',
        label: 'Best for',
        values: [
          'One job you could describe out loud today',
          'Several roles, and infrastructure that needs designing',
        ],
      },
      {
        id: 'scoping',
        label: 'How it is scoped',
        values: [
          'One call, then a fixed written proposal',
          'Architecture and system design before any quote',
        ],
      },
      {
        id: 'price',
        label: 'What it costs',
        values: ['$500 – $7,000+ one-time', 'Scoped together on a call'],
      },
      {
        id: 'team',
        label: 'Who builds it',
        values: [
          'An assigned engineer, through to handover',
          'A dedicated team across the engagement',
        ],
      },
      {
        id: 'scope',
        label: 'Typical scope',
        values: [
          'A receptionist, a prospector, an assistant',
          'A department, on private infrastructure',
        ],
      },
      {
        id: 'support',
        label: 'After it goes live',
        values: ['30 days of support included', 'Retainer available if you want it run for you'],
      },
      {
        id: 'ownership',
        label: 'Who owns it',
        values: [
          'You — code, prompts and workflows',
          'You — IP and source transferred',
        ],
      },
      {
        id: 'recurring',
        label: 'Monthly fee to us',
        values: ['None', 'None, unless you choose a retainer'],
      },
    ],
    note: 'Not sure which line you fall on? Working that out is what the call is for.',
  },

  /*
    Repointed at the flagship. The tiers above are still carrying the
    reference's price band and are flagged in CONTENT-SWAP.md; Priya's price
    is real, named in full, and one click away — so the page has at least one
    honest number on it while those tiers wait.
  */
  resource: {
    eyebrow: 'Or keep one on payroll',
    title: 'Looking for Priya?',
    body: 'Our sales employee is priced like a salary rather than a project: ₹30,000 once to onboard her, then ₹12,000 a month with 500 leads included. Every enquiry called back inside sixty seconds, in Hindi, at any hour. Month to month, no notice period.',
    cta: { label: 'See what Priya costs', href: '/priya' },
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
    title: 'Get the number before you commit anything.',
    sub: 'The call is free, and you leave it with a written scope and a fixed price whether or not you hire us. If the job is not worth staffing this way, that is what we will tell you.',
    cta: {
      primary: { label: 'Book a free hiring call', href: BRAND.calendly },
      secondary: { label: 'See what we have built', href: '/past-projects' },
    },
  },
}
