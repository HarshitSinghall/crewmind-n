import { BRAND } from './site'
import type { HomeContent } from './types'

/* Public homepage copy. Claims are limited to capabilities and agreed process. */

export const HOME: HomeContent = {
  seo: {
    title: 'AI Voice and Workflow Systems for Real Estate Teams',
    description:
      'Crewmind designs governed AI voice and workflow systems for real-estate enquiry response, qualification, and human follow-up.',
  },

  hero: {
    eyebrow: 'Real-estate enquiry operations',
    avatars: [],
    headline: {
      lead: 'Turn a new property enquiry into',
      emphasis: 'a clear next action',
      trail: '.',
    },
    sub: 'Crewmind connects governed voice AI, workflow automation, and a human follow-up queue. Every implementation is scoped around consent, tenant boundaries, your existing systems, and the evidence your team needs to act.',
    videoPrompt: '',
    video: {
      duration: '',
      label: '',
    },
    cta: {
      primary: { label: 'Book a Scoping Call', href: '#book' },
      secondary: { label: 'Message us on WhatsApp', href: BRAND.whatsapp() },
    },
  },

  proof: {
    note: '',
    ratings: [],
  },

  booking: {
    prompt: 'Start with the workflow',
    title: 'Map one enquiry path with us',
    sub: 'Bring one lead source, the questions your team asks, and the handoff that follows. We will use the call to identify constraints, integrations, safety checks, and what would need to be validated before release.',
  },

  services: {
    eyebrow: 'What we build',
    title: 'Start with the process that needs a better system.',
    sub: 'These are the areas we can scope. The final design, tools, responsibilities, and acceptance criteria belong in the written proposal for your environment.',
    items: [
      {
        slug: 'social-media-automation',
        title: 'Social Media Automation Systems',
        description:
          'A review-led workflow for turning approved source material into channel-specific drafts, assets, and a publishing queue.',
        features: ['Approved-source intake', 'Human review gates', 'Publishing workflow'],
      },
      {
        slug: 'geo',
        title: 'AI Search Visibility',
        description:
          'A source-based audit of how your public information appears in AI-assisted research, followed by measurable content and technical improvements.',
        features: ['Visibility baseline', 'Source and content audit', 'Repeatable measurement'],
      },
      {
        slug: 'ai-personal-assistants',
        title: 'AI Agents & Assistants',
        description:
          'Assistive workflows that organise information, prepare drafts, and route work while keeping consequential actions under human control.',
        features: ['Knowledge retrieval', 'Draft and review queues', 'Tool integrations'],
      },
      {
        slug: 'lead-gen-outreach',
        title: 'Lead Gen & Outreach Systems',
        description:
          'Consent-aware lead intake and follow-up workflows designed around source provenance, suppression rules, and accountable handoff.',
        features: ['Lead-source mapping', 'Suppression controls', 'Human-owned follow-up'],
      },
      {
        slug: 'ai-call-centers',
        title: 'AI Voice Reception and Qualification',
        description:
          'Voice workflows for authorised calls, qualification, and callback or visit requests, with clear escalation to a person.',
        features: ['Consent and contact gates', 'Structured qualification', 'Human handoff'],
      },
      {
        slug: 'ai-copywriting',
        title: 'AI Copywriting Systems',
        description:
          'Evidence-led drafting systems that use approved source material, preserve review history, and require sign-off before publication.',
        features: ['Source-grounded drafts', 'Brand review', 'Versioned approval'],
      },
      {
        slug: 'ai-agent-team',
        title: 'Custom AI Agent Team',
        description:
          'Multiple bounded agents coordinated around defined roles, permissions, handoffs, and exception paths.',
        features: ['Role boundaries', 'Shared context', 'Exception handling'],
      },
    ],
    enterprise: {
      eyebrow: 'Enterprise',
      badge: 'Custom scope',
      title: 'Need a system shaped around existing controls and infrastructure?',
      body: 'We can scope retrieval, agent, integration, and workflow architecture with your technical and operational owners. Deployment model and ownership terms are agreed in writing for each engagement.',
      tags: ['RAG systems', 'AI agents', 'Workflow controls', 'Integrations', 'Evaluation'],
      cta: { label: 'Explore enterprise', href: '/enterprise' },
    },
  },

  positioning: {
    eyebrow: 'Our working principle',
    title: {
      lead: 'A convincing demo is not enough.',
      emphasis: 'The workflow must earn release',
    },
    sub: 'We separate the prototype from the production path, define what success and failure look like, and keep human ownership explicit. Scope and timing depend on the environment and are agreed before work begins.',
  },

  process: {
    title: 'How it works',
    steps: [
      {
        step: '01',
        title: 'Choose one workflow',
        body: 'Map the trigger, current manual steps, people involved, systems touched, and the decision that should come out at the end.',
        visual: {
          kind: 'timeSaved',
          rows: [
            { label: 'Current volume', value: 'Measure' },
            { label: 'Current response time', value: 'Measure' },
            { label: 'Exceptions and opt-outs', value: 'List' },
            { label: 'Human handoff', value: 'Name' },
          ],
          total: 'Agree the baseline before estimating value',
        },
      },
      {
        step: '02',
        title: 'Design the controlled path',
        body: 'Define trusted identity, permissions, model boundaries, integrations, failure handling, and the evidence required before a consequential action.',
        visual: {
          kind: 'flow',
          from: 'Authorised input',
          nodes: ['Policy checks', 'AI task', 'Human review'],
          to: 'Recorded outcome',
        },
      },
      {
        step: '03',
        title: 'Test representative cases',
        body: 'Exercise success, refusal, timeout, duplicate, opt-out, and escalation paths with authorised fixtures before release.',
        visual: {
          kind: 'schedule',
          items: [
            { label: 'Scope', when: 'Agreed' },
            { label: 'Build', when: 'Versioned' },
            { label: 'Test', when: 'Recorded' },
            { label: 'Release', when: 'Approved' },
          ],
        },
      },
      {
        step: '04',
        title: 'Hand over with ownership',
        body: 'Document how the system is operated, monitored, changed, and stopped. Support scope and ownership are set in the engagement agreement.',
        visual: {
          kind: 'stats',
          items: [
            { value: 'Scoped', label: 'Permissions' },
            { value: 'Tested', label: 'Failure paths' },
            { value: 'Logged', label: 'Key actions' },
            { value: 'Named', label: 'Human owner' },
          ],
        },
      },
    ],
  },

  work: {
    title: 'Explore the systems we design for',
    items: [
      {
        id: 'property-enquiry-response',
        title: 'Property Enquiry Response',
        impact: 'A governed voice-to-human handoff for authorised property enquiries.',
        tags: ['Real estate', 'Voice AI', 'Human handoff'],
        href: '/past-projects?category=ai-call-centers',
      },
      {
        id: 'knowledge-support-handoff',
        title: 'Knowledge Support with Handoff',
        impact: 'Grounded answers, clear escalation, and feedback the team can review.',
        tags: ['Knowledge base', 'Escalation', 'n8n'],
        href: '/past-projects?category=ai-agent-team',
      },
      {
        id: 'proposal-drafting-workflow',
        title: 'Structured Proposal Drafting',
        impact: 'Versioned drafts built from approved evidence, with accountable review.',
        tags: ['Brief intake', 'Review', 'Version history'],
        href: '/past-projects?category=ai-copywriting',
      },
      {
        id: 'competitor-intelligence-briefing',
        title: 'Competitor Intelligence Briefing',
        impact: 'Source-tracked changes prepared for a human analyst to validate.',
        tags: ['Monitoring', 'Research', 'Source tracking'],
        href: '/past-projects?category=geo',
      },
      {
        id: 'agent-quality-evaluation',
        title: 'Agent Quality & Evaluation',
        impact: 'Representative tests and trace review before a workflow earns trust.',
        tags: ['Evals', 'Trace review', 'Regression tests'],
        href: '/past-projects?category=ai-personal-assistants',
      },
      {
        id: 'internal-operations-workflow',
        title: 'Internal Operations Workflow',
        impact: 'Role-aware automation with an audit trail and human exception queue.',
        tags: ['Workflow automation', 'Access control', 'Audit trail'],
        href: '/past-projects?category=custom-ai-solutions',
      },
    ],
    cta: { label: 'Explore all blueprints', href: '/past-projects' },
  },

  close: {
    eyebrow: 'Next step',
    title: 'Bring one real workflow, not a wish list.',
    sub: 'We will map what can be automated, what must stay human, and what evidence the system would need before you rely on it.',
    cta: {
      primary: { label: 'Book a Scoping Call', href: '#book' },
      secondary: { label: 'Message us on WhatsApp', href: BRAND.whatsapp() },
    },
  },
}
