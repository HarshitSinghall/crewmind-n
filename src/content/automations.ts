import { BRAND } from './site'
import type { Automation, AutomationsContent, ShowcaseBlock } from './types'

/* ---------------------------------------------------------------------------
   PLACEHOLDER CONTENT — see CONTENT-SWAP.md

   The seven automations buyers ask for by name. Selection is grounded in what
   the 2026 market actually transacts on — voice agents, AI SDRs, RAG support
   deflection, inbox triage, document/invoice extraction, meeting-to-CRM, and
   content repurposing — rather than on what is fun to build.

   RULES FOR THIS FILE
   1. No vendor is claimed as a partner. `stack` chips name categories and
      widely-used tools; they are rendered as plain text, never as logos.
   2. Every `metric.value` is an integer so the count-up can animate it. The
      unit lives in `suffix`. Numbers here are illustrative targets, and the
      showcase says so in `showcase.note` — do not quietly drop that line.
   3. Every `service` must be a slug in services.ts. content.test.ts asserts
      it, so a renamed service cannot orphan an automation.
--------------------------------------------------------------------------- */

export const AUTOMATIONS: Automation[] = [
  {
    id: 'ai-voice-receptionist',
    index: '01',
    name: 'AI Voice Receptionist',
    tagline: 'Answers every call, books the job, never sleeps.',
    icon: 'phone',
    trigger: 'Inbound call rings',
    steps: [
      {
        label: 'Answer on the second ring',
        detail:
          'Picks up in under a second with your greeting, your tone, and your business hours — including the ones nobody staffs.',
      },
      {
        label: 'Qualify against your criteria',
        detail:
          'Asks the questions your best receptionist asks: what, where, when, budget band, and whether this is a fit at all.',
      },
      {
        label: 'Check the live calendar',
        detail:
          'Reads real availability rather than a static list, so it never offers a slot that has already gone.',
      },
      {
        label: 'Book, log, and hand off',
        detail:
          'Writes the appointment, creates the CRM record, and pings the right person on Slack when a call needs a human.',
      },
    ],
    outcome: 'Booked appointment + CRM record',
    metric: { value: 100, suffix: '%', label: 'of calls answered, 2am included' },
    before:
      'Calls outside office hours go to voicemail. A large share of those callers never ring back — and you never find out which ones they were.',
    after:
      'Every call is answered, qualified, and either booked straight into the calendar or routed to a human who already has the context.',
    stack: ['Telephony', 'Google Calendar', 'CRM', 'Slack'],
    service: 'ai-call-centers',
  },

  {
    id: 'ai-sdr-outbound',
    index: '02',
    name: 'AI SDR — Outbound Engine',
    tagline: 'Finds the accounts, writes the email, runs the follow-up.',
    icon: 'send',
    trigger: 'Daily at 06:00, or a new target list lands',
    steps: [
      {
        label: 'Source matching accounts',
        detail:
          'Pulls companies that match your ICP from the databases and directories your market actually lives in.',
      },
      {
        label: 'Enrich and verify contacts',
        detail:
          'Finds the decision-maker, verifies the address, and drops anything that would bounce before it costs you domain reputation.',
      },
      {
        label: 'Score against your ICP',
        detail:
          'Ranks each account on the signals that predicted your last ten deals, so the weak half never gets contacted.',
      },
      {
        label: 'Write in your voice',
        detail:
          'Drafts a first line that proves the research happened, on top of a body written from your own past winning emails.',
      },
      {
        label: 'Send and follow up',
        detail:
          'Runs the sequence across email and LinkedIn, stops the moment someone replies, and hands the thread to you.',
      },
    ],
    outcome: 'Warm replies land in your inbox',
    metric: { value: 400, suffix: '+', label: 'personalised touches per week' },
    before:
      'A rep spends the morning on lists and the afternoon on templates. Volume and personalisation trade off against each other, and both lose.',
    after:
      'The pipeline runs before anyone logs in. Your team spends its day on replies, not on research and copy-paste.',
    stack: ['Lead databases', 'Enrichment', 'Email infra', 'LinkedIn', 'CRM'],
    service: 'lead-gen-outreach',
  },

  {
    id: 'inbox-triage-agent',
    index: '03',
    name: 'Inbox Triage Agent',
    tagline: 'Reads everything, drafts the replies, waits for your yes.',
    icon: 'inbox',
    trigger: 'Every email that hits the inbox',
    steps: [
      {
        label: 'Classify and de-noise',
        detail:
          'Sorts each message into needs-you, needs-someone-else, or needs-nobody — and archives the third bucket quietly.',
      },
      {
        label: 'Summarise the thread',
        detail:
          'Compresses a 14-message chain into what was decided, what is being asked, and what is still open.',
      },
      {
        label: 'Draft the reply in your voice',
        detail:
          'Writes the response from your own sent folder, so it sounds like you on a good day rather than like a model.',
      },
      {
        label: 'Queue for one-click approval',
        detail:
          'Nothing sends itself. Drafts sit ready; you read, adjust if needed, and send in a single pass.',
      },
    ],
    outcome: 'A morning queue of drafts, nothing missed',
    metric: { value: 11, suffix: ' hrs', label: 'of inbox time returned weekly' },
    before:
      'Two hours a day in the inbox, and the important message still surfaces late because it arrived under forty that were not.',
    after:
      'One pass in the morning. The thinking is already done; what is left is judgement and a send button.',
    stack: ['Gmail / Outlook', 'Calendar', 'Notion', 'Slack'],
    service: 'ai-personal-assistants',
  },

  {
    id: 'support-deflection-agent',
    index: '04',
    name: 'Support Agent on Your Docs',
    tagline: 'Answers from your own material, cites it, escalates honestly.',
    icon: 'support',
    trigger: 'Ticket, live chat, or WhatsApp message arrives',
    steps: [
      {
        label: 'Retrieve from your own docs',
        detail:
          'Searches your help centre, policies, and past resolved tickets — not the open internet, and not its own memory.',
      },
      {
        label: 'Answer with a citation',
        detail:
          'Every reply links the source it came from, so the customer and your team can both check the work.',
      },
      {
        label: 'Resolve or escalate',
        detail:
          'When confidence is low it stops and hands over, with the full history attached, rather than guessing fluently.',
      },
      {
        label: 'Log the gap',
        detail:
          'Anything it could not answer becomes a documentation ticket, so the same question does not escalate twice.',
      },
    ],
    outcome: 'Resolved ticket, or a human with full context',
    metric: { value: 68, suffix: '%', label: 'of tier-one tickets closed unaided' },
    before:
      'The same forty questions arrive every week. Your team answers them by hand, and the queue is longest exactly when customers are least patient.',
    after:
      'Routine questions are answered in seconds with a citation. Your team only sees the tickets that genuinely need a person.',
    stack: ['Help centre', 'Vector search', 'Zendesk / Intercom', 'WhatsApp'],
    service: 'custom-ai-solutions',
  },

  {
    id: 'document-processing',
    index: '05',
    name: 'Invoice & Document Processing',
    tagline: 'Reads the PDF, extracts the fields, posts the entry.',
    icon: 'document',
    trigger: 'A PDF lands in the folder or the inbox',
    steps: [
      {
        label: 'Read the document',
        detail:
          'Handles scans, photos, and native PDFs in whatever layout each supplier decided on this quarter.',
      },
      {
        label: 'Extract the fields',
        detail:
          'Pulls supplier, dates, line items, tax, and totals into a structured record with a confidence score per field.',
      },
      {
        label: 'Validate against the PO',
        detail:
          'Checks the maths and matches the purchase order. Mismatches are held for review instead of posted quietly.',
      },
      {
        label: 'Post to accounting',
        detail:
          'Writes the entry into your ledger, files the original, and notifies the approver when a threshold is crossed.',
      },
    ],
    outcome: 'A clean, matched entry in your ledger',
    metric: { value: 30, suffix: ' sec', label: 'per invoice, from nine minutes' },
    before:
      'Someone opens each PDF, retypes eight fields, checks the maths, and files it. It is unskilled, unavoidable, and error-prone at volume.',
    after:
      'The queue clears itself overnight. A person only touches the invoices that failed validation — usually the ones worth reading.',
    stack: ['OCR', 'Document AI', 'Xero / QuickBooks', 'Drive'],
    service: 'custom-ai-solutions',
  },

  {
    id: 'meeting-to-crm',
    index: '06',
    name: 'Meeting → CRM & Follow-up',
    tagline: 'Turns the call recording into notes, records, and a sent email.',
    icon: 'calendar',
    trigger: 'The call ends and the recording drops',
    steps: [
      {
        label: 'Transcribe and identify speakers',
        detail:
          'Produces a clean transcript that knows who said what, across accents and a bad connection.',
      },
      {
        label: 'Pull decisions and actions',
        detail:
          'Separates what was agreed from what was discussed, and names the owner and date for each action.',
      },
      {
        label: 'Update the CRM record',
        detail:
          'Writes stage, next step, objections raised, and the notes field your team has never once filled in on time.',
      },
      {
        label: 'Send the follow-up',
        detail:
          'Drafts the recap email with the agreed actions and sends it while the conversation is still warm.',
      },
    ],
    outcome: 'CRM current, follow-up sent, actions assigned',
    metric: { value: 4, suffix: ' min', label: 'from call ending to recap sent' },
    before:
      'Notes get written up two days later, if at all. The CRM is a fiction, and the follow-up email arrives after the buyer has cooled.',
    after:
      'The recap is in their inbox before your next call starts, and the pipeline reflects what actually happened.',
    stack: ['Zoom / Meet', 'Transcription', 'CRM', 'Task tracker'],
    service: 'ai-agent-team',
  },

  {
    id: 'content-repurposing',
    index: '07',
    name: 'Content Repurposing Engine',
    tagline: 'One recording becomes a fortnight of scheduled posts.',
    icon: 'content',
    trigger: 'One long-form asset is published',
    steps: [
      {
        label: 'Find the strongest moments',
        detail:
          'Scores the transcript for the passages that stand alone — the claim, the story, the number, the disagreement.',
      },
      {
        label: 'Cut and caption the clips',
        detail:
          'Reframes to vertical, tracks the speaker, burns in captions, and keeps the cut on a sentence boundary.',
      },
      {
        label: 'Write per-platform copy',
        detail:
          'Rewrites the hook for each platform rather than posting one caption everywhere and hoping.',
      },
      {
        label: 'Schedule across the calendar',
        detail:
          'Spaces the posts to your posting cadence and queues them for approval, never straight to live.',
      },
    ],
    outcome: 'Two weeks of scheduled, on-brand posts',
    metric: { value: 24, suffix: ' posts', label: 'from a single recording' },
    before:
      'The good material exists once, in a 40-minute video eleven people watched, and then never appears anywhere again.',
    after:
      'Every asset you record keeps working for a fortnight, in the formats each platform actually rewards.',
    stack: ['Video AI', 'Captioning', 'Buffer / Later', 'Content calendar'],
    service: 'social-media-automation',
  },
]

const bookCta = { label: 'Book a free hiring call', href: BRAND.calendly }

export const AUTOMATIONS_PAGE: AutomationsContent = {
  seo: {
    title: 'The 7 AI Automations Businesses Actually Buy',
    description:
      'Voice receptionists, AI SDRs, inbox triage, support agents, invoice processing, meeting-to-CRM, and content repurposing — what each one does, step by step, and what it replaces.',
  },

  hero: {
    eyebrow: 'The automation catalogue',
    headline: {
      lead: 'Seven automations that',
      emphasis: 'pay for themselves',
      trail: '.',
    },
    sub: 'These are the systems the market asks for by name. Each one is a pipeline, not a chatbot — a trigger, a handful of steps, and something concrete at the end. Here is exactly what happens in between.',
    cta: {
      primary: bookCta,
      secondary: { label: 'See the work', href: '/past-projects' },
    },
    assurances: ['Built to your workflow', 'One-time setup', 'You own it'],
  },

  showcase: {
    eyebrow: 'Watch one run',
    title: {
      lead: 'Pick an automation.',
      emphasis: 'Watch it work',
      trail: '.',
    },
    sub: 'Every automation below is a real pipeline we have shipped. Select one and the canvas plays the run, step by step, exactly as it executes in production.',
    note: 'Figures are typical outcomes from comparable builds, not a guarantee. We scope yours against your own numbers on the call.',
  },

  catalogue: {
    eyebrow: 'Before and after',
    title: 'What each one actually replaces.',
    sub: 'The honest version: the manual job on the left, the same job once the automation is running on the right.',
  },

  close: {
    eyebrow: 'Start with one',
    title: 'Which of these is costing you the most right now?',
    sub: 'Most engagements start with a single automation from this list, shipped in weeks. Bring the process you do by hand and we will tell you which one it is.',
    cta: {
      primary: bookCta,
      secondary: { label: 'Message us on WhatsApp', href: BRAND.whatsapp() },
    },
  },
}

/**
 * The homepage cut. Same seven pipelines, different job: the /automations
 * page is for someone comparing options, the homepage is for someone who has
 * not yet believed that any of this is real. So it opens on proof and ends
 * on a way through, rather than on a catalogue.
 */
export const AUTOMATIONS_HOME: ShowcaseBlock = {
  eyebrow: 'Seven automations',
  title: {
    lead: 'The systems businesses',
    emphasis: 'actually buy',
    trail: '.',
  },
  sub: 'Not demos. These seven are what the market asks for by name — and each one is a pipeline you can watch run, step by step, before you ever talk to us.',
  note: 'Figures are typical outcomes from comparable builds, not a guarantee.',
  cta: { label: 'See all seven, side by side', href: '/automations' },
}

/** Lookup used by the showcase and by tests. */
export function getAutomation(id: string | undefined): Automation | undefined {
  return AUTOMATIONS.find((a) => a.id === id)
}
