import { BRAND } from './site'
import type { Automation, AutomationsContent, ShowcaseBlock } from './types'

/**
 * Capability blueprints, not client deployments or performance claims.
 * Numeric values exist only because the visual component animates a number;
 * each label identifies it as an illustrative workflow parameter.
 */
export const AUTOMATIONS: Automation[] = [
  {
    id: 'ai-voice-receptionist',
    index: '01',
    name: 'Property Enquiry Voice Response',
    tagline: 'Screens an authorised request, qualifies it, and hands it to a person.',
    icon: 'phone',
    trigger: 'Authorised enquiry received',
    steps: [
      { label: 'Apply contact policy', detail: 'Check trusted identity, opt-out, quiet hours, cooldown, and capacity before dispatch.' },
      { label: 'Run the agreed call', detail: 'Use approved context and questions, with a clear path for refusal, uncertainty, and handoff.' },
      { label: 'Record the outcome', detail: 'Store provider-backed evidence and route a callback or viewing request to the responsible person.' },
    ],
    outcome: 'Recorded attempt + accountable next action',
    metric: { value: 1, suffix: ' lead', label: 'illustrative workflow unit' },
    before: 'A new enquiry can sit in a portal or spreadsheet without a clearly owned first response.',
    after: 'The proposed workflow gives an authorised enquiry a policy check, recorded attempt, and named human owner.',
    stack: ['Lead source', 'Policy engine', 'Voice provider', 'CRM'],
    service: 'ai-call-centers',
  },
  {
    id: 'ai-sdr-outbound',
    index: '02',
    name: 'Consent-aware Lead Follow-up',
    tagline: 'Preserves source and permission before preparing the next touch.',
    icon: 'send',
    trigger: 'Lead enters an approved queue',
    steps: [
      { label: 'Verify provenance', detail: 'Carry the lead source, intended channel, and permission evidence into the workflow.' },
      { label: 'Check suppression', detail: 'Stop on opt-out, duplicate, quiet-hour, frequency, or tenant mismatch.' },
      { label: 'Route the reply', detail: 'Prepare or send only the authorised message and hand any response to a person.' },
    ],
    outcome: 'Policy-checked follow-up task',
    metric: { value: 3, suffix: ' gates', label: 'illustrative minimum before dispatch' },
    before: 'Source, permission, and ownership can become separated as a lead moves between tools.',
    after: 'The proposed workflow keeps provenance, policy checks, and the accountable reply owner together.',
    stack: ['Lead source', 'Suppression list', 'Messaging channel', 'CRM'],
    service: 'lead-gen-outreach',
  },
  {
    id: 'inbox-triage-agent',
    index: '03',
    name: 'Inbox Triage & Draft Queue',
    tagline: 'Classifies incoming work and prepares drafts without sending them.',
    icon: 'inbox',
    trigger: 'New message arrives',
    steps: [
      { label: 'Classify the request', detail: 'Use agreed categories, urgency rules, and ownership rather than a generic priority guess.' },
      { label: 'Retrieve approved context', detail: 'Find the relevant policy, account, or knowledge source and preserve citations.' },
      { label: 'Queue a draft', detail: 'Prepare a response for the named owner to review, edit, and send.' },
    ],
    outcome: 'Prioritised queue + reviewable draft',
    metric: { value: 3, suffix: ' states', label: 'illustrative triage design' },
    before: 'Important requests and routine messages share one queue and depend on manual sorting.',
    after: 'The proposed workflow separates priority, prepares context, and leaves the send decision with a person.',
    stack: ['Email', 'Knowledge base', 'Task queue', 'Audit log'],
    service: 'ai-personal-assistants',
  },
  {
    id: 'support-deflection-agent',
    index: '04',
    name: 'Knowledge Support with Handoff',
    tagline: 'Answers from approved material and escalates when evidence is missing.',
    icon: 'support',
    trigger: 'Support question arrives',
    steps: [
      { label: 'Retrieve evidence', detail: 'Search only the approved knowledge sources available to that user and request.' },
      { label: 'Answer or abstain', detail: 'Return a cited answer when supported; otherwise say what is missing.' },
      { label: 'Escalate with context', detail: 'Route the question, retrieved sources, and uncertainty to the appropriate person.' },
    ],
    outcome: 'Grounded answer or explained escalation',
    metric: { value: 2, suffix: ' exits', label: 'answer or human handoff' },
    before: 'Routine questions repeat, while unusual ones can receive an answer without enough evidence.',
    after: 'The proposed workflow makes grounded response and explicit escalation equally valid outcomes.',
    stack: ['Help centre', 'Retrieval', 'Support queue', 'Feedback log'],
    service: 'ai-agent-team',
  },
  {
    id: 'document-processing',
    index: '05',
    name: 'Document Intake & Review',
    tagline: 'Extracts structured fields and sends uncertain records to a reviewer.',
    icon: 'document',
    trigger: 'Approved document received',
    steps: [
      { label: 'Read and classify', detail: 'Identify the document type and required fields without treating every upload as trustworthy.' },
      { label: 'Extract and validate', detail: 'Capture structured values, run agreed checks, and retain confidence or source location.' },
      { label: 'Post or hold', detail: 'Write only records that meet the acceptance rule; hold exceptions for review.' },
    ],
    outcome: 'Validated record or exception task',
    metric: { value: 2, suffix: ' paths', label: 'accepted or held for review' },
    before: 'People retype fields and may discover mismatches after the downstream record already exists.',
    after: 'The proposed workflow validates before write and gives exceptions a visible owner.',
    stack: ['Document store', 'Extraction', 'Validation rules', 'System of record'],
    service: 'custom-ai-solutions',
  },
  {
    id: 'meeting-to-crm',
    index: '06',
    name: 'Meeting Notes to CRM Draft',
    tagline: 'Turns an authorised meeting record into reviewable notes and actions.',
    icon: 'calendar',
    trigger: 'Authorised meeting record available',
    steps: [
      { label: 'Prepare the transcript', detail: 'Process the permitted recording or notes and separate speakers where evidence allows.' },
      { label: 'Extract decisions', detail: 'Distinguish agreed actions from discussion, and mark uncertain ownership or dates.' },
      { label: 'Queue the updates', detail: 'Prepare CRM fields, tasks, and a recap for review before external sending.' },
    ],
    outcome: 'Reviewable CRM update + action list',
    metric: { value: 3, suffix: ' outputs', label: 'notes, actions, and CRM draft' },
    before: 'Meeting context can be split between personal notes, memory, and an incomplete CRM record.',
    after: 'The proposed workflow assembles a review queue while preserving the person responsible for approval.',
    stack: ['Meeting source', 'Transcription', 'CRM', 'Task tracker'],
    service: 'ai-agent-team',
  },
  {
    id: 'content-repurposing',
    index: '07',
    name: 'Approved Content Repurposing',
    tagline: 'Turns one approved source into channel drafts with a publishing gate.',
    icon: 'content',
    trigger: 'Approved source asset added',
    steps: [
      { label: 'Extract supported ideas', detail: 'Identify reusable claims, stories, and examples while retaining the source.' },
      { label: 'Adapt by channel', detail: 'Create drafts for the chosen formats using the brand and rights rules for each.' },
      { label: 'Queue for approval', detail: 'Present drafts, sources, and asset rights to the person authorised to publish.' },
    ],
    outcome: 'Channel drafts awaiting approval',
    metric: { value: 1, suffix: ' source', label: 'illustrative starting asset' },
    before: 'Useful source material can be hard to reuse consistently without losing context or approval history.',
    after: 'The proposed workflow keeps every draft tied to its source and final publishing owner.',
    stack: ['Asset library', 'Brand rules', 'Review queue', 'Publishing tools'],
    service: 'social-media-automation',
  },
]

const bookCta = { label: 'Book a scoping call', href: BRAND.calendly }

export const AUTOMATIONS_PAGE: AutomationsContent = {
  seo: {
    title: 'Automation Blueprints',
    description:
      'Seven illustrative AI workflow blueprints showing triggers, control points, handoffs, and intended outcomes without client or performance claims.',
  },
  hero: {
    eyebrow: 'Automation blueprints',
    headline: { lead: 'See the workflow before', emphasis: 'believing the promise', trail: '.' },
    sub: 'These examples show how a controlled automation can be structured. They are capability blueprints, not claims that Crewmind has deployed each system or achieved the illustrated parameters for a client.',
    cta: { primary: bookCta, secondary: { label: 'Explore system blueprints', href: '/past-projects' } },
    assurances: ['Illustrative flows', 'Control points named', 'No performance guarantee'],
  },
  showcase: {
    eyebrow: 'Explore a flow',
    title: { lead: 'Pick a workflow.', emphasis: 'Inspect each handoff', trail: '.' },
    sub: 'The canvas shows a possible trigger, processing path, and outcome. A real implementation is designed and tested against the customer’s systems and policies.',
    note: 'All numeric values are illustrative workflow parameters, not customer results or performance benchmarks.',
  },
  catalogue: {
    eyebrow: 'Current and proposed state',
    title: 'What changes in the operating model.',
    sub: 'The left describes a common manual-state problem. The right describes the intended controlled workflow, subject to discovery and acceptance testing.',
  },
  close: {
    eyebrow: 'Start with one boundary',
    title: 'Which queue or handoff is hardest to operate today?',
    sub: 'Bring the current workflow and its exceptions. We will identify whether automation is appropriate and what must remain human.',
    cta: { primary: bookCta, secondary: { label: 'Message us on WhatsApp', href: BRAND.whatsapp() } },
  },
}

export const AUTOMATIONS_HOME: ShowcaseBlock = {
  eyebrow: 'Automation blueprints',
  title: { lead: 'Inspect the system,', emphasis: 'not just the output', trail: '.' },
  sub: 'Seven illustrative flows show where policy, AI work, validation, and human ownership fit together.',
  note: 'Blueprints and numeric parameters are illustrative, not customer deployments or results.',
  cta: { label: 'Explore all seven blueprints', href: '/automations' },
}

export function getAutomation(id: string | undefined): Automation | undefined {
  return AUTOMATIONS.find((automation) => automation.id === id)
}
