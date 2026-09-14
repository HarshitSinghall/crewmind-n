import type { ServiceContent, ServicesIndexContent } from './types'
import { BRAND } from './site'

const bookCta = { label: 'Book a scoping call', href: BRAND.calendly }

const whatsappCta = (topic: string) => ({
  label: 'Discuss on WhatsApp',
  href: BRAND.whatsapp(`Hello, I'd like to discuss ${topic}.`),
})

export const SERVICES_INDEX: ServicesIndexContent = {
  seo: {
    title: 'AI Voice and Workflow Services',
    description:
      'Explore the AI voice, knowledge, research, content, and workflow systems Crewmind can scope around your existing operations and controls.',
  },
  hero: {
    eyebrow: 'Services',
    headline: {
      lead: 'Start with the workflow,',
      emphasis: 'then choose the technology',
    },
    sub: 'Each service below describes a capability area. The actual tools, integrations, permissions, delivery plan, and acceptance criteria are agreed for your environment before work begins.',
  },
  close: {
    eyebrow: 'Not sure where it fits',
    title: 'Describe the trigger, the manual work, and the desired next action.',
    sub: 'We will help separate a useful first workflow from ideas that need more evidence or a different owner.',
    cta: {
      primary: bookCta,
      secondary: { label: 'Explore system blueprints', href: '/past-projects' },
    },
  },
}

export const SERVICES: ServiceContent[] = [
  {
    slug: 'geo',
    title: 'AI Search Visibility',
    description:
      'Measure how public, source-backed information about your business appears in AI-assisted research and recommendation journeys.',
    features: ['Baseline prompt set', 'Source audit', 'Repeatable measurement'],
    category: 'geo',
    seo: {
      title: 'AI Search Visibility',
      description:
        'A measurable audit and improvement plan for how public business information appears in AI-assisted research.',
    },
    hero: {
      eyebrow: 'AI search visibility',
      headline: { lead: 'Understand what AI systems can find,', emphasis: 'cite, and miss' },
      sub: 'We define a representative query set, inspect the public sources that support an answer, and track changes without promising control over a third-party model’s recommendation.',
      cta: { primary: bookCta, secondary: whatsappCta('AI search visibility') },
      assurances: ['Source based', 'Measured over time', 'No ranking guarantee'],
    },
    sections: [
      {
        kind: 'steps',
        id: 'geo-method',
        eyebrow: 'Method',
        title: 'A baseline you can run again.',
        steps: [
          { step: '01', title: 'Define the question set', body: 'Choose the customer questions, locations, services, and comparison prompts that matter.' },
          { step: '02', title: 'Inspect the evidence', body: 'Review owned pages, third-party citations, entity consistency, and gaps in public source material.' },
          { step: '03', title: 'Prioritise changes', body: 'Separate content, technical, and distribution work and name the metric for each change.' },
          { step: '04', title: 'Repeat the audit', body: 'Run the same query set on an agreed cadence and record what changed and what did not.' },
        ],
      },
      {
        kind: 'faq',
        id: 'geo-faq',
        title: 'Common questions',
        items: [
          { id: 'geo-guarantee', question: 'Can you guarantee that an AI assistant recommends us?', answer: 'No. Third-party models, sources, and ranking behaviour change outside our control. We can improve source clarity and measure visibility against an agreed query set.' },
          { id: 'geo-proof', question: 'What do we receive?', answer: 'The proposed deliverables are a baseline, source inventory, prioritised changes, and a repeatable measurement method. The final scope is agreed before work starts.' },
        ],
      },
    ],
    close: {
      eyebrow: 'Start with evidence',
      title: 'Bring the questions your buyers ask before they contact you.',
      sub: 'We will turn them into a measurable visibility baseline.',
      cta: { primary: bookCta, secondary: whatsappCta('an AI visibility baseline') },
    },
  },
  {
    slug: 'ai-personal-assistants',
    title: 'AI Agents & Assistants',
    description:
      'Assistive workflows that retrieve approved information, prepare work, and route decisions without hiding the human owner.',
    features: ['Knowledge retrieval', 'Draft queues', 'Permission-aware tools'],
    category: 'ai-personal-assistants',
    seo: { title: 'AI Agents and Assistants', description: 'Bounded AI assistants designed around approved knowledge, permissions, review, and measurable tasks.' },
    hero: {
      eyebrow: 'Assistive workflows',
      headline: { lead: 'Give repetitive knowledge work', emphasis: 'a controlled first pass' },
      sub: 'An assistant can retrieve, summarise, draft, and prepare actions. Your workflow decides what it may access, what it may change, and where a person must approve.',
      cta: { primary: bookCta, secondary: whatsappCta('an AI assistant workflow') },
      assurances: ['Approved sources', 'Scoped permissions', 'Human review'],
    },
    sections: [
      {
        kind: 'checklist',
        id: 'assistant-scope',
        eyebrow: 'Possible scope',
        title: 'The useful parts of an assistant are operational.',
        sub: 'A proposal can include the relevant parts below after access and risk are reviewed.',
        items: ['Approved knowledge retrieval with citations', 'Inbox or work-queue classification', 'Draft preparation without automatic sending', 'Tool permissions by role and action', 'Exception queue and audit events', 'Representative quality evaluations'],
      },
      {
        kind: 'faq',
        id: 'assistant-faq',
        title: 'Common questions',
        items: [
          { id: 'assistant-autonomy', question: 'Will the assistant act without approval?', answer: 'Only where the agreed workflow explicitly allows it. Consequential messages, record changes, and external actions should have permission checks, validation, and an appropriate human stop.' },
          { id: 'assistant-tools', question: 'Which tools can it connect to?', answer: 'That depends on available APIs, authentication, data sensitivity, and the permissions your organisation approves. Integrations are named in the proposal rather than assumed on this page.' },
        ],
      },
    ],
    close: { eyebrow: 'Choose one queue', title: 'Start with the work people repeat and still need to review.', sub: 'That is usually the best boundary for a first assistant.', cta: { primary: bookCta, secondary: whatsappCta('an internal assistant') } },
  },
  {
    slug: 'lead-gen-outreach',
    title: 'Lead Research & Outreach Workflows',
    description:
      'Research and follow-up systems designed around provenance, consent, suppression, channel rules, and human ownership.',
    features: ['Source provenance', 'Suppression controls', 'Reply handoff'],
    category: 'lead-gen-outreach',
    seo: { title: 'Lead Research and Outreach Workflows', description: 'Consent-aware lead research and follow-up workflows with suppression rules and accountable handoff.' },
    hero: {
      eyebrow: 'Lead operations',
      headline: { lead: 'Build the follow-up path around', emphasis: 'permission and context' },
      sub: 'We scope how a lead enters, which source and consent evidence travels with it, when contact is allowed, and who owns the reply.',
      cta: { primary: bookCta, secondary: whatsappCta('a lead workflow') },
      assurances: ['Provenance', 'Opt-out first', 'Human-owned replies'],
    },
    sections: [
      {
        kind: 'steps',
        id: 'outreach-flow',
        eyebrow: 'Workflow',
        title: 'Every contact starts with a trusted source.',
        steps: [
          { step: '01', title: 'Validate the source', body: 'Record where the lead came from and the permission that supports the intended contact.' },
          { step: '02', title: 'Apply policy', body: 'Check suppression, quiet hours, frequency, channel rules, and tenant identity at the final dispatch boundary.' },
          { step: '03', title: 'Prepare or send', body: 'Draft for review or dispatch only through the channel and scope that were approved.' },
          { step: '04', title: 'Stop and hand over', body: 'Stop automation on reply or opt-out and route the context to the accountable person.' },
        ],
      },
      {
        kind: 'faq',
        id: 'outreach-faq',
        title: 'Common questions',
        items: [
          { id: 'outreach-lists', question: 'Do you supply contact lists?', answer: 'List sourcing is not promised here. Any source, lawful basis, consent evidence, and permitted channel must be reviewed before it enters a workflow.' },
          { id: 'outreach-volume', question: 'How much can the system send?', answer: 'Volume is bounded by consent, channel policy, reputation, quiet hours, reply handling, and operational capacity. We do not publish a universal volume claim.' },
        ],
      },
    ],
    close: { eyebrow: 'Start with the source', title: 'Show us how a lead enters and where permission is recorded.', sub: 'The automation design follows from that boundary.', cta: { primary: bookCta, secondary: whatsappCta('lead research and outreach') } },
  },
  {
    slug: 'ai-call-centers',
    title: 'AI Voice Reception & Qualification',
    description:
      'Voice workflows for authorised calls, structured qualification, and callback or visit requests with clear human handoff.',
    features: ['Contact gates', 'Grounded answers', 'Human handoff'],
    category: 'ai-call-centers',
    seo: { title: 'AI Voice Reception and Qualification', description: 'Governed AI voice workflows for authorised enquiry response, qualification, and human follow-up.' },
    hero: {
      eyebrow: 'Voice AI',
      headline: { lead: 'Respond quickly without losing', emphasis: 'consent or accountability' },
      sub: 'A voice workflow should distinguish a requested call from a completed connection, a viewing request from a confirmed booking, and AI qualification from a human decision.',
      cta: { primary: { label: 'Explore Priya', href: '/priya' }, secondary: whatsappCta('a voice workflow') },
      assurances: ['Authorised contacts', 'Recorded outcomes', 'Human escalation'],
    },
    sections: [
      {
        kind: 'checklist',
        id: 'voice-controls',
        eyebrow: 'Control points',
        title: 'The call is only one part of the system.',
        items: ['Trusted lead and tenant identity', 'Opt-out, quiet-hour, cooldown, and capacity checks', 'Approved knowledge and qualification questions', 'Provider-backed call outcome', 'Callback or viewing request without false confirmation', 'Human task, monitoring, and audit trail'],
      },
      {
        kind: 'faq',
        id: 'voice-faq',
        title: 'Common questions',
        items: [
          { id: 'voice-human', question: 'Does the voice agent replace the sales team?', answer: 'No. It can handle an agreed first-response and qualification path. A person remains responsible for advice, negotiation, exceptions, and confirmation of consequential next steps.' },
          { id: 'voice-booking', question: 'Can it confirm a site visit?', answer: 'Only if the agreed calendar workflow returns a durable confirmation. Otherwise it should record a request and tell the caller that a person will confirm it.' },
        ],
      },
    ],
    close: { eyebrow: 'Flagship workflow', title: 'See how Priya is designed for property enquiries.', sub: 'The product page separates the intended workflow, limits, and commercial plan.', cta: { primary: { label: 'Explore Priya', href: '/priya' }, secondary: whatsappCta('Priya') } },
  },
  {
    slug: 'social-media-automation',
    title: 'Content Operations',
    description:
      'A review-led system for turning approved source material into channel-specific drafts and a controlled publishing queue.',
    features: ['Approved sources', 'Brand review', 'Publishing approval'],
    category: 'social-media-automation',
    seo: { title: 'Content Operations', description: 'Source-grounded content workflows with brand checks, review history, and publication approval.' },
    hero: {
      eyebrow: 'Content operations',
      headline: { lead: 'Increase reuse without turning your brand', emphasis: 'into an autopilot' },
      sub: 'The workflow can extract, adapt, and organise material. A named owner still approves claims, context, rights, and publication.',
      cta: { primary: bookCta, secondary: whatsappCta('a content workflow') },
      assurances: ['Source grounded', 'Rights checked', 'Approval before publish'],
    },
    sections: [
      { kind: 'checklist', id: 'content-scope', eyebrow: 'Possible scope', title: 'A controlled path from source to queue.', items: ['Approved asset intake', 'Reusable claims and brand rules', 'Channel-specific draft formats', 'Human fact and rights review', 'Version history and approval state', 'Scheduled handoff to existing publishing tools'] },
      { kind: 'faq', id: 'content-faq', title: 'Common questions', items: [
        { id: 'content-auto', question: 'Does it publish automatically?', answer: 'Not by default. Publication should remain an explicit approval step unless a narrow, low-risk content class is separately authorised.' },
        { id: 'content-performance', question: 'Do you guarantee reach or engagement?', answer: 'No. The system can improve consistency and traceability, but platform distribution and audience response are outside our control.' },
      ] },
    ],
    close: { eyebrow: 'Start with one source', title: 'Bring an asset your team already struggles to reuse.', sub: 'We will map the approvals between that source and the publishing queue.', cta: { primary: bookCta, secondary: whatsappCta('content operations') } },
  },
  {
    slug: 'ai-copywriting',
    title: 'Evidence-led Drafting Systems',
    description:
      'Drafting workflows that use approved evidence, preserve source links and versions, and keep final claims under human review.',
    features: ['Evidence library', 'Brand rules', 'Versioned approval'],
    category: 'ai-copywriting',
    seo: { title: 'Evidence-led Drafting Systems', description: 'AI-assisted drafting grounded in approved sources, brand rules, and human sign-off.' },
    hero: {
      eyebrow: 'Drafting systems',
      headline: { lead: 'Make the first draft faster,', emphasis: 'not less accountable' },
      sub: 'We design a path from approved evidence to a reviewable draft. The system should show where a claim came from and who approved the final version.',
      cta: { primary: bookCta, secondary: whatsappCta('an evidence-led drafting system') },
      assurances: ['Traceable sources', 'Brand constraints', 'Human sign-off'],
    },
    sections: [
      { kind: 'checklist', id: 'drafting-scope', eyebrow: 'Possible scope', title: 'The controls around the text matter.', items: ['Approved evidence and example library', 'Audience, voice, and prohibited-claim rules', 'Structured brief intake', 'Draft, critique, and revision stages', 'Citations or source trace where needed', 'Named final approver'] },
      { kind: 'faq', id: 'drafting-faq', title: 'Common questions', items: [
        { id: 'drafting-train', question: 'Do you train a model on our brand?', answer: 'The approach depends on the material and risk. Often a curated evidence library, examples, and explicit rules are more controllable than model training.' },
        { id: 'drafting-convert', question: 'Will the copy convert better?', answer: 'That is a hypothesis to test, not a promise. The workflow can support clearer experiments and version tracking; results depend on the offer, audience, channel, and execution.' },
      ] },
    ],
    close: { eyebrow: 'Start with the evidence', title: 'Bring the brief, sources, and approval path.', sub: 'We will map a drafting system that preserves all three.', cta: { primary: bookCta, secondary: whatsappCta('a drafting workflow') } },
  },
  {
    slug: 'ai-agent-team',
    title: 'Multi-agent Operations',
    description:
      'Several bounded agents coordinated through explicit roles, shared context, permissions, and exception handling.',
    features: ['Defined roles', 'Controlled handoffs', 'Shared audit trail'],
    category: 'ai-agent-team',
    seo: { title: 'Multi-agent Operations', description: 'Coordinated AI agents with explicit roles, tool boundaries, human review, and observable handoffs.' },
    hero: {
      eyebrow: 'Agent operations',
      headline: { lead: 'Use more than one agent only when', emphasis: 'the handoffs justify it' },
      sub: 'A multi-agent design should make responsibilities clearer. Each role needs a bounded task, permitted tools, an exit condition, and an owner for exceptions.',
      cta: { primary: bookCta, secondary: whatsappCta('a multi-agent workflow') },
      assurances: ['Bounded roles', 'Explicit handoffs', 'Observable state'],
    },
    sections: [
      { kind: 'checklist', id: 'agent-team-scope', eyebrow: 'Design questions', title: 'Coordination is an architecture problem.', items: ['Why one workflow is not enough', 'Role and tool permissions per agent', 'Shared context and data ownership', 'Deterministic handoff conditions', 'Human exception queue', 'End-to-end and per-agent evaluations'] },
      { kind: 'faq', id: 'agent-team-faq', title: 'Common questions', items: [
        { id: 'agent-team-count', question: 'How many agents do we need?', answer: 'Usually fewer than the first diagram suggests. We add a separate role only when it needs a distinct context, permission boundary, evaluation, or owner.' },
        { id: 'agent-team-control', question: 'How do we know what happened?', answer: 'The design should record inputs, transitions, tool results, exceptions, and final disposition without exposing unnecessary personal or secret data.' },
      ] },
    ],
    close: { eyebrow: 'Start with the handoff', title: 'Show us where work changes owner today.', sub: 'That is where a multi-agent design either becomes useful or unnecessary.', cta: { primary: bookCta, secondary: whatsappCta('agent operations') } },
  },
  {
    slug: 'custom-ai-solutions',
    title: 'Custom AI Systems',
    description:
      'A scoped architecture for workflows that do not fit a standard category or cross several data and operational boundaries.',
    features: ['Architecture review', 'Integration contracts', 'Release evidence'],
    category: 'custom-ai-solutions',
    seo: { title: 'Custom AI Systems', description: 'Custom AI architecture, integration, evaluation, and handoff for bounded operational workflows.' },
    hero: {
      eyebrow: 'Custom systems',
      headline: { lead: 'When the workflow is unusual,', emphasis: 'make the boundaries explicit' },
      sub: 'We start by understanding the current system, trusted identities, data movement, failure cost, and human ownership before choosing a model or framework.',
      cta: { primary: bookCta, secondary: whatsappCta('a custom AI system') },
      assurances: ['Architecture first', 'Smallest coherent scope', 'Acceptance evidence'],
    },
    sections: [
      { kind: 'steps', id: 'custom-method', eyebrow: 'Method', title: 'Move from problem to a releaseable system.', steps: [
        { step: '01', title: 'Observe the current workflow', body: 'Record real inputs, decisions, owners, exceptions, and existing controls.' },
        { step: '02', title: 'Define the contract', body: 'Name trusted identity, data boundaries, allowed actions, outputs, and failure behaviour.' },
        { step: '03', title: 'Build the smallest path', body: 'Implement one coherent workflow before expanding roles or integrations.' },
        { step: '04', title: 'Test and hand over', body: 'Run representative acceptance cases and document operation, monitoring, rollback, and change ownership.' },
      ] },
      { kind: 'faq', id: 'custom-faq', title: 'Common questions', items: [
        { id: 'custom-existing', question: 'Can you work with an existing prototype?', answer: 'Yes. We first separate demonstrated behaviour from production evidence, then inspect the interfaces, data, controls, and failure paths that already exist.' },
        { id: 'custom-stack', question: 'Which stack will you use?', answer: 'The stack follows the operating constraints, existing environment, team capability, and ownership model. It is documented in the proposed architecture before implementation.' },
      ] },
    ],
    close: { eyebrow: 'Bring the current state', title: 'Show us what exists, what fails, and who needs to trust it.', sub: 'We will turn that into a bounded architecture and acceptance plan.', cta: { primary: bookCta, secondary: whatsappCta('a custom AI system') } },
  },
]

export function getService(slug: string | undefined): ServiceContent | undefined {
  return SERVICES.find((service) => service.slug === slug)
}
