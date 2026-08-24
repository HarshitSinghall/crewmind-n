import { BRAND } from './site'
import { RATINGS } from './testimonials'
import type { HomeContent } from './types'

/* ---------------------------------------------------------------------------
   PLACEHOLDER CONTENT — see CONTENT-SWAP.md
   Every user-facing string on the homepage lives in this file.
--------------------------------------------------------------------------- */

export const HOME: HomeContent = {
  seo: {
    title: 'Custom AI Agents & Automation For Your Business',
    description:
      'We build AI teams that handle your calls, leads, emails, and operations 24/7. No monthly fees. You own everything. Book a free strategy call today.',
  },

  hero: {
    eyebrow: 'AI Transformation Partner',
    avatars: [
      { name: 'Sarah', initials: 'SA' },
      { name: 'James', initials: 'JA' },
      { name: 'Aisha', initials: 'AI' },
    ],
    headline: {
      lead: 'Build the AI infrastructure to',
      emphasis: 'win the next decade',
      trail: '.',
    },
    sub: 'We build AI agents, automations, and full operating systems that run your business in the background, so you and your team can focus on the work that actually matters.',
    videoPrompt: 'Start here — watch the 2 minute overview',
    video: {
      duration: '2:14',
      label: 'How we build your AI infrastructure',
    },
    cta: {
      primary: { label: 'Book a Free Strategy Call', href: '#book' },
      secondary: { label: 'Message us on WhatsApp', href: BRAND.whatsapp() },
    },
  },

  proof: {
    note: 'Verified reviews across Google and Trustpilot',
    ratings: RATINGS,
  },

  booking: {
    prompt: 'Step 2',
    title: 'Book your free AI strategy call',
    sub: "On this call we'll map out exactly how to implement an AI system for your business — what to automate first, what it takes, and what it's worth. No deck, no pitch.",
  },

  services: {
    eyebrow: 'What we build',
    title: "Pick your problem. We've solved it.",
    sub: 'Every service is done for you, installed, integrated, and handed over working. Not a template. Not a tutorial.',
    items: [
      {
        slug: 'social-media-automation',
        title: 'Social Media Automation Systems',
        description:
          'AI content generation built for your brand, custom dashboard, algorithm-aligned calendar, hook engineering, and every piece routed back to your mission.',
        features: ['AI video generation', 'Content dashboard & calendar', 'Hook & retention engineering'],
        badge: 'New',
      },
      {
        slug: 'geo',
        title: 'GEO — Get Recommended by AI',
        description:
          "We make AI recommend your business. When your customers ask ChatGPT, Gemini, or Perplexity a question, we make sure you're the answer they get.",
        features: ['AI visibility audit', 'LLM optimisation', 'Competitive AI positioning'],
      },
      {
        slug: 'ai-personal-assistants',
        title: 'AI Agents & Assistants',
        description:
          'Done-for-you setup of two powerful agent frameworks that handle your inbox, outreach, scheduling, and ops 24/7.',
        features: ['Personal AI assistant', 'Autonomous outreach agent', 'CRM & tool integrations'],
      },
      {
        slug: 'lead-gen-outreach',
        title: 'Lead Gen & Outreach Systems',
        description:
          'We find leads matching your exact target audience, populate a live sheet, and automatically send outreach via email, LinkedIn, and SMS.',
        features: ['ICP-based lead discovery', 'Live sheet feed', 'Email & LinkedIn automation'],
      },
      {
        slug: 'ai-call-centers',
        title: '24/7 AI Receptionist',
        description:
          'AI phone agents for bookings, customer support, and lead qualification. Never miss a call again.',
        features: ['Human-like voices', 'Live appointment booking', 'CRM syncing'],
      },
      {
        slug: 'ai-copywriting',
        title: 'AI Copywriting Systems',
        description:
          'Websites, landing pages, sales emails, and case studies — AI trained on your brand voice, your existing materials, and refined until it converts.',
        features: ['Brand voice training', 'Landing page & website copy', 'Sales email sequences'],
      },
      {
        slug: 'ai-agent-team',
        title: 'Custom AI Agent Team',
        description:
          'A complete AI operating system — a dedicated team of specialised agents, each one focused on helping your business achieve its mission.',
        features: ['Dedicated agent roles', 'Mission-aligned output', 'Full team coordination'],
      },
    ],
    enterprise: {
      eyebrow: 'Enterprise',
      badge: 'New',
      title: 'Need a fully custom AI system built for enterprise scale?',
      body: 'We partner with enterprise teams to design and build from scratch — RAG pipelines, private LLM deployments, AI agents, and workflow automation. All on your infrastructure. All IP yours.',
      tags: ['RAG systems', 'AI agents', 'Private LLMs', 'Open source', 'Full IP ownership'],
      cta: { label: 'Explore enterprise', href: '/enterprise' },
    },
  },

  positioning: {
    eyebrow: 'What actually happens',
    title: {
      lead: 'Most AI agencies sell decks.',
      emphasis: 'We ship things that run.',
    },
    sub: 'No six-week discovery sprints. No "AI strategy" PDFs. We get on a call, understand your workflow, and hand you a working system — usually within a week.',
  },

  process: {
    title: 'How it works',
    steps: [
      {
        step: '01',
        title: 'Book a strategy call',
        body: 'Tell us what you need automated. We plan your agents, integrations, and workflows. Free, no commitment.',
        visual: {
          kind: 'timeSaved',
          rows: [
            { label: 'Email & inbox management', value: '8h/wk' },
            { label: 'Lead outreach & follow-up', value: '10h/wk' },
            { label: 'Manual data entry & CRM', value: '6h/wk' },
            { label: 'Scheduling & calendar', value: '5h/wk' },
          ],
          total: '29 hrs/week returned to you',
        },
      },
      {
        step: '02',
        title: 'We build everything for you',
        body: 'Custom AI agents, automations, and integrations, built around your exact tools and workflows. You sit back.',
        visual: {
          kind: 'flow',
          from: 'Your business',
          nodes: ['AI agents', 'Automations', 'Integrations'],
          to: 'Running',
        },
      },
      {
        step: '03',
        title: 'We launch & hand over',
        body: 'Everything tested, live, and documented. We walk you through it and make sure it runs exactly as planned.',
        visual: {
          kind: 'schedule',
          items: [
            { label: 'Call', when: 'Day 1' },
            { label: 'Build', when: 'Day 2–4' },
            { label: 'Test', when: 'Day 5' },
            { label: 'Live', when: 'Day 6' },
          ],
        },
      },
      {
        step: '04',
        title: 'Real support, real humans',
        body: '30-day support on every build. Message us and the person who built your system responds — not a ticket queue.',
        visual: {
          kind: 'stats',
          items: [
            { value: '24/7', label: 'Always running' },
            { value: '30d', label: 'Support included' },
            { value: '0', label: 'Code required' },
            { value: 'Yours', label: 'You own it' },
          ],
        },
      },
    ],
  },

  work: {
    title: 'See our work in action',
    items: [
      {
        id: 'reels-growth',
        title: 'AI Social Media Content System',
        impact: '85K+ followers from a fully automated short-form pipeline',
        tags: ['Social Media', 'AI Video', 'Short-Form'],
        href: '/past-projects',
      },
      {
        id: 'sales-pipeline',
        title: 'Sales Pipeline Autopilot',
        impact: '24/7 autonomous prospecting, zero manual outreach',
        tags: ['AI Assistants', 'Sales', 'Prospecting'],
        href: '/past-projects',
      },
      {
        id: 'chief-of-staff',
        title: 'AI Chief of Staff + Sales Engine',
        impact: '2-agent system running inbox, calendar, and outreach',
        tags: ['AI Assistants', 'Executive AI'],
        href: '/past-projects',
      },
      {
        id: 'marketing-team',
        title: 'Full AI Marketing Team',
        impact: '6-agent team running autonomously across 8 clients',
        tags: ['Multi-Agent', 'Marketing', 'Agency'],
        href: '/past-projects',
      },
      {
        id: 'bizdev-setter',
        title: 'BizDev Setter Agent',
        impact: 'Lead response time cut from hours to 60 seconds',
        tags: ['Lead Generation', 'CRM'],
        href: '/past-projects',
      },
      {
        id: 'content-team',
        title: 'Discord AI Content Team',
        impact: 'Publication-ready content in under 20 minutes',
        tags: ['Multi-Agent', 'Content'],
        href: '/past-projects',
      },
    ],
    cta: { label: 'View all projects', href: '/past-projects' },
  },

  close: {
    eyebrow: 'We keep the roster small on purpose',
    title: 'We only work with a handful of clients at a time.',
    sub: "Not a sales tactic — it's how we keep the quality high. If you're serious about getting AI working in your business, book a call and let's see if we're a fit.",
    cta: {
      primary: { label: 'Book a Free Strategy Call', href: '#book' },
      secondary: { label: 'Message us on WhatsApp', href: BRAND.whatsapp() },
    },
  },
}
