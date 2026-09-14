import type { ProjectCase, ProjectCategory, ProjectsContent } from './types'
import { BRAND } from './site'

/* ---------------------------------------------------------------------------
   ORIGINAL CREWMIND DELIVERY BLUEPRINTS

   These are not client case studies. They describe the kinds of systems
   Crewmind can scope and build, informed by publicly documented industry
   patterns. They must never acquire a client name, a date, a result, or a
   testimonial unless that evidence belongs to Crewmind and is approved for
   publication. Each card names the observable signal a pilot should measure.
--------------------------------------------------------------------------- */

export const CATEGORIES: ProjectCategory[] = [
  { id: 'ai-personal-assistants', label: 'AI Agents & Assistants' },
  { id: 'lead-gen-outreach', label: 'Lead Research & Outreach' },
  { id: 'ai-call-centers', label: 'Voice & Lead Response' },
  { id: 'social-media-automation', label: 'Content Operations' },
  { id: 'ai-copywriting', label: 'Proposal Systems' },
  { id: 'ai-agent-team', label: 'Agent Operations' },
  { id: 'geo', label: 'Research & Intelligence' },
  { id: 'custom-ai-solutions', label: 'Custom AI Systems' },
]

export const PROJECTS: ProjectCase[] = [
  {
    id: 'property-enquiry-response',
    title: 'Property Enquiry Response System',
    client: 'Crewmind product blueprint',
    when: 'Designed for a controlled pilot',
    impact: 'Measure: time to first governed contact',
    category: 'ai-call-centers',
    tags: ['Real estate', 'Voice AI', 'Human handoff'],
    challenge:
      'Property enquiries arrive outside sales hours and can lose momentum before a person responds. A useful system has to preserve consent, suppression rules, tenant boundaries, and the difference between a dial attempt, an answered call, and a confirmed viewing.',
    solution:
      'Normalize an authorised enquiry, apply final contact gates, then let a voice agent qualify only the approved questions. Store the attempt and provider evidence, route the structured outcome to the assigned human, and treat any viewing as a request until a person confirms it. A pilot should inspect response time, contact outcomes, opt-outs, and human follow-up completion.',
  },
  {
    id: 'knowledge-support-handoff',
    title: 'Knowledge Support with Human Handoff',
    client: 'Support workflow blueprint',
    when: 'Designed for a controlled pilot',
    impact: 'Measure: grounded answer and escalation rate',
    category: 'ai-agent-team',
    tags: ['Knowledge base', 'n8n', 'Escalation'],
    challenge:
      'Support teams need routine questions answered consistently without an assistant inventing policy, exposing account data, or hiding a case that needs human judgment.',
    solution:
      'Use an owner-maintained source of truth, a retrieval step, and structured output containing an answer, source reference, confidence band, and escalation decision. Log the interaction and feedback with data minimisation, and send sensitive, account-specific, or unsupported questions to a named human queue. Review unanswered questions and escalations before expanding scope.',
  },
  {
    id: 'prospect-research-brief',
    title: 'Prospect Research & Briefing Agent',
    client: 'Sales operations blueprint',
    when: 'Designed for a controlled pilot',
    impact: 'Measure: sourced briefs approved by a seller',
    category: 'lead-gen-outreach',
    tags: ['Research', 'CRM', 'Human approval'],
    challenge:
      'Sales teams lose time gathering public company context, monitoring changes, and translating scattered facts into useful preparation, while unsourced enrichment can create mistakes and compliance risks.',
    solution:
      'Start from an approved account list and gather permitted public sources into a dated research brief. Keep source links, mark uncertain data as unknown, and propose messaging for human approval rather than autonomous outreach. Log what was reviewed, approved, changed, or rejected so the team can assess research quality before sending anything.',
  },
  {
    id: 'proposal-drafting-workflow',
    title: 'Structured Proposal Drafting Workflow',
    client: 'Commercial workflow blueprint',
    when: 'Designed for a controlled pilot',
    impact: 'Measure: approved draft turnaround time',
    category: 'ai-copywriting',
    tags: ['Brief intake', 'Version history', 'Review'],
    challenge:
      'Proposal quality falls when briefs, proof points, pricing assumptions, and approvals live in separate documents. Faster drafting cannot come at the cost of invented claims or an unreviewed commercial commitment.',
    solution:
      'Capture a structured brief, pull only approved capabilities and evidence, create a versioned draft in the client’s template, and require an accountable reviewer before export. Record the source of each proof point and the final approval. Evaluate the workflow with draft cycle time, reviewer edits, and the percentage of proposals carrying traceable evidence.',
  },
  {
    id: 'competitor-intelligence-briefing',
    title: 'Competitor Intelligence Briefing',
    client: 'Market intelligence blueprint',
    when: 'Designed for a controlled pilot',
    impact: 'Measure: verified changes surfaced to the team',
    category: 'geo',
    tags: ['Monitoring', 'Source tracking', 'Weekly brief'],
    challenge:
      'Competitive changes across websites, campaigns, and public announcements are easy to notice late and hard to compare consistently when research is manual.',
    solution:
      'Monitor an approved source list on a schedule, preserve the observed source and timestamp, detect meaningful changes, and deliver a compact review queue instead of an unsupported conclusion. A human analyst validates material findings and can add context before circulation. The first success measure is useful, verified changes, not volume of scraped pages.',
  },
  {
    id: 'content-approval-pipeline',
    title: 'Content Approval Pipeline',
    client: 'Content operations blueprint',
    when: 'Designed for a controlled pilot',
    impact: 'Measure: approved assets with clear ownership',
    category: 'social-media-automation',
    tags: ['Content workflow', 'Review queue', 'Brand controls'],
    challenge:
      'Teams often need more content without losing the approved voice, factual review, or ownership of the final publishing decision.',
    solution:
      'Turn an approved brief into labelled draft variants, attach the relevant source material and brand constraints, then route each asset through a review queue. The system can prepare formats and schedules, but publishing remains a human action unless explicitly authorised. Track rejected drafts and review reasons to improve the brief, not to automate around review.',
  },
  {
    id: 'agent-quality-evaluation',
    title: 'Agent Quality & Evaluation Loop',
    client: 'Reliable agent blueprint',
    when: 'Designed for a controlled pilot',
    impact: 'Measure: pass rate on representative cases',
    category: 'ai-personal-assistants',
    tags: ['Evals', 'Trace review', 'Regression tests'],
    challenge:
      'An agent can look convincing in a short demo while failing on tool calls, edge cases, permission boundaries, or changed source data in real use.',
    solution:
      'Define representative success and failure cases before release, record privacy-safe traces, and test tool calls separately from conversational quality. Review regressions after prompt, model, or workflow changes, with human evaluation for high-impact actions. The goal is a measurable quality loop, not a one-time prompt.',
  },
  {
    id: 'internal-operations-workflow',
    title: 'Internal Operations Workflow',
    client: 'Custom system blueprint',
    when: 'Designed for a controlled pilot',
    impact: 'Measure: completed work with an audit trail',
    category: 'custom-ai-solutions',
    tags: ['Workflow automation', 'Role-based access', 'Audit trail'],
    challenge:
      'Manual handoffs between forms, documents, inboxes, and dashboards make routine operations slow and difficult to audit, especially when different roles need different access.',
    solution:
      'Map one bounded workflow, define its trigger, owner, approvals, and recovery path, then connect only the minimum systems required. Make identities and permissions explicit at every write boundary, record durable operational events, and provide a human exception queue. Measure the cycle time, exceptions, and completed work, not a vague automation percentage.',
  },
  {
    id: 'reference-ay-support-chatbot',
    title: 'Customer Support AI Chatbot Deployment',
    client: 'Industry reference · AY Automate',
    when: 'Third-party published case study',
    impact: 'Reported: owner-managed knowledge base and escalation logging',
    category: 'ai-agent-team',
    tags: ['RAG', 'n8n', 'Supabase'],
    challenge:
      'A loyalty-programme support team needed consistent answers to repetitive questions and a dependable route for sensitive, account-specific, or unsupported requests.',
    solution:
      'AY Automate describes a Dutch support chatbot grounded in a Google Drive PDF, with n8n-based re-indexing, structured confidence and escalation fields, and conversation feedback logged for review.',
    source: {
      label: 'Read AY Automate case study',
      href: 'https://www.ayautomate.com/case-studies/customer-support-automation',
    },
  },
  {
    id: 'reference-waboom-property-voice',
    title: 'Property Lead Qualification & Viewings',
    client: 'Industry reference · Waboom AI',
    when: 'Third-party published case study',
    impact: 'Reported: 49 viewings booked from a 14-day campaign',
    category: 'ai-call-centers',
    tags: ['Voice AI', 'Qualification', 'Booking'],
    challenge:
      'A property developer needed same-day qualification and viewing requests while human representatives could not respond quickly enough to every ad-form lead.',
    solution:
      'Waboom describes a voice workflow that qualifies prospects against property criteria, offers viewing slots, and reports call-level outcomes. Its figures and deployment are Waboom’s published claims, not Crewmind results.',
    source: {
      label: 'Read Waboom case-study roundup',
      href: 'https://www.waboom.ai/blog/ai-voice-agent-case-studies-nz-au',
    },
  },
  {
    id: 'reference-tezeract-pitchmark',
    title: 'Pitchmark Proposal Creation Platform',
    client: 'Industry reference · Tezeract',
    when: 'Third-party published case study',
    impact: 'Reported: proposal time reduced by 70%',
    category: 'ai-copywriting',
    tags: ['Brief intake', 'Brand controls', 'Version history'],
    challenge:
      'A marketing team needed to turn inconsistent inputs, case studies, and brand rules into reviewable proposals without recreating the process for every pitch.',
    solution:
      'Tezeract describes a structured brief, AI-generated pitch narrative, approved case-study retrieval, brand formatting, inline editing, version history, and CRM logging. The reported reduction is Tezeract’s published claim.',
    source: {
      label: 'Read Tezeract case study',
      href: 'https://tezeract.ai/ai-case-studies/pitchmark-ai-powered-marketing-pitch-creation-tool/',
    },
  },
  {
    id: 'reference-deviniti-service-agent',
    title: 'Customer-Service Message Agent',
    client: 'Industry reference · Deviniti',
    when: 'Third-party published portfolio item',
    impact: 'Focus: classification, routing, and reply drafting',
    category: 'custom-ai-solutions',
    tags: ['Classification', 'Routing', 'Human support'],
    challenge:
      'Customer-service teams need a consistent way to understand incoming messages and send complex cases to the right people without losing the original context.',
    solution:
      'Deviniti’s published portfolio describes an assistant that summarizes messages, detects purpose and tone, routes straightforward and complex requests differently, and prepares draft responses and resources for agents.',
    source: {
      label: 'Read Deviniti portfolio',
      href: 'https://deviniti.com/genai-projects-portfolio/',
    },
  },
  {
    id: 'reference-groovy-rag-platform',
    title: 'AI-Native Support Retrieval Platform',
    client: 'Industry reference · Groovy Web',
    when: 'Third-party published case study',
    impact: 'Reported: 92% answer accuracy',
    category: 'ai-agent-team',
    tags: ['Hybrid retrieval', 'pgvector', 'Evaluation'],
    challenge:
      'An HR SaaS support team needed to improve answer quality and control operating cost after a superficial chatbot integration produced unreliable answers.',
    solution:
      'Groovy Web describes hybrid keyword and vector retrieval, PostgreSQL with pgvector, an evaluation dashboard, caching, and model routing. Its accuracy and savings metrics are publisher-reported, not independently verified by Crewmind.',
    source: {
      label: 'Read Groovy Web case study',
      href: 'https://www.groovyweb.co/ai-case-studies/ai-support-platform',
    },
  },
  {
    id: 'reference-refound-competitor-monitoring',
    title: 'Competitor Ad Intelligence',
    client: 'Industry reference · Refound',
    when: 'Third-party published case study',
    impact: 'Reported: 20 hours saved per week',
    category: 'geo',
    tags: ['Competitive research', 'Monitoring', 'Briefing'],
    challenge:
      'A marketing agency needed a repeatable way to spot competitor campaign changes without spending senior-team time collecting the same signals manually.',
    solution:
      'Refound presents an automated competitor-ad monitoring engagement that collects campaign changes and turns them into decision-ready intelligence. The stated time saving belongs to Refound’s published engagement.',
    source: {
      label: 'Read Refound case studies',
      href: 'https://refoundai.com/case-studies/',
    },
  },
  {
    id: 'reference-leftclick-operations',
    title: 'Lead-to-Delivery Operations System',
    client: 'Industry reference · LeftClick AI',
    when: 'Third-party published case study',
    impact: 'Reported: approximately 90% of pipeline automated',
    category: 'custom-ai-solutions',
    tags: ['Intake', 'Task routing', 'Operations'],
    challenge:
      'A content operation needed connected intake, lead handling, task routing, contractor workflows, and financial administration rather than isolated automation experiments.',
    solution:
      'LeftClick describes a multi-step operating system spanning lead discovery, personalised outreach, client intake, project routing, hiring, payroll preparation, and dashboards. Its results are LeftClick’s reported outcomes.',
    source: {
      label: 'Read LeftClick case study',
      href: 'https://leftclick.ai/case-studies/1secondcopy',
    },
  },
  {
    id: 'reference-hamel-lucy-evals',
    title: 'Real-Estate Assistant Evaluation Practice',
    client: 'Industry reference · Hamel Husain',
    when: 'Third-party technical case study',
    impact: 'Focus: test cases, trace review, and regressions',
    category: 'ai-personal-assistants',
    tags: ['Real estate', 'Evals', 'Tool testing'],
    challenge:
      'As a real-estate assistant expands beyond a demo, teams need evidence that a change improves the correct task without silently breaking another tool, action, or edge case.',
    solution:
      'Hamel Husain documents evaluation practices around Rechat’s Lucy assistant: scoped tests, trace inspection, human or model evaluation, and controlled iteration. It is technical guidance, not a Crewmind deployment.',
    source: {
      label: 'Read Hamel Husain’s evaluation case study',
      href: 'https://hamel.dev/blog/posts/evals/index.html',
    },
  },
]

export const PROJECTS_PAGE: ProjectsContent = {
  seo: {
    title: 'System Blueprints & References',
    description:
      'Original Crewmind workflow blueprints alongside attributed public industry references for voice response, research, support, proposals, and governed AI operations.',
  },
  hero: {
    eyebrow: 'How we think about delivery',
    headline: {
      lead: 'Systems worth',
      emphasis: 'measuring',
    },
    sub: 'Crewmind blueprints sit alongside clearly attributed public industry references. External examples are not Crewmind client work; each links to its original publisher. Every card starts with a bounded problem, keeps a human in the right decision, and names the evidence to inspect.',
  },
  filterLabel: 'Filter blueprints by capability',
  allLabel: 'All blueprints',
  emptyMessage: 'No blueprint in this capability yet.',
  close: {
    eyebrow: 'Start with one workflow',
    title: 'Pick one result you need to see.',
    sub: 'We will map the trigger, data boundaries, human owner, and evidence needed before proposing automation.',
    cta: {
      primary: { label: 'Book a discovery call', href: BRAND.calendly },
      secondary: { label: 'See Priya for real estate', href: '/priya' },
    },
  },
}
