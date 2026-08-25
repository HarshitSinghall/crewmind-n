import type { ProjectCase, ProjectCategory, ProjectsContent } from './types'
import { BRAND } from './site'

/* ---------------------------------------------------------------------------
   PLACEHOLDER CONTENT — see CONTENT-SWAP.md
   Transcribed from docs/reference/autoploy-past-projects.md.

   DELIBERATE DEPARTURE, same rule as about.ts and enterprise.ts: the
   reference credits named individuals and named client brands, and links
   their live Instagram accounts and websites. Every client here is reduced to
   a sector descriptor. Sector, scale, challenge, solution and stack are kept
   verbatim; identities and outbound links are not.

   Every `category` must exist in CATEGORIES below, and every CATEGORIES id
   must match a slug in services.ts — content.test.ts asserts both, so a
   renamed service cannot silently orphan a filter.
--------------------------------------------------------------------------- */

export const CATEGORIES: ProjectCategory[] = [
  { id: 'ai-personal-assistants', label: 'AI Agents & Assistants' },
  { id: 'lead-gen-outreach', label: 'Lead Gen & Outreach' },
  { id: 'ai-call-centers', label: '24/7 AI Receptionist' },
  { id: 'social-media-automation', label: 'Social Media Automation' },
  { id: 'ai-copywriting', label: 'AI Copywriting' },
  { id: 'ai-agent-team', label: 'Custom AI Agent Team' },
  { id: 'geo', label: 'GEO — AI Recommendations' },
  { id: 'custom-ai-solutions', label: 'Custom AI Solutions' },
]

export const PROJECTS: ProjectCase[] = [
  /* --- AI agents & assistants -------------------------------------------- */
  {
    id: 'sales-pipeline-autopilot',
    title: 'Sales Pipeline Autopilot',
    client: 'Consulting Firm, California',
    when: '3 weeks ago',
    impact: '24/7 autonomous prospecting',
    category: 'ai-personal-assistants',
    tags: ['AI Assistants', 'Sales', 'Prospecting'],
    challenge:
      'Needed a scalable way to find clients and apply for opportunities without dedicating headcount to manual outreach. The founder was spending 3+ hours a day on prospecting tasks that rarely converted.',
    solution:
      'Custom AI dashboard with 2 agents and 5 modules running on a Mac Mini. Client Hunter scans job boards, professional networks, and industry directories to discover and score leads by fit. Job Scout tracks active roles and auto-applies with tailored proposals. The Proposals module generates custom pitch decks per client, Outreach handles first-contact emails and multi-touch follow-up sequences, and the pipeline manager keeps everything synced to CRM. The founder wakes up to a prioritised list of warm leads every morning, with zero manual prospecting.',
  },
  {
    id: 'ai-chief-of-staff',
    title: 'AI Chief of Staff + Sales Engine',
    client: 'Video Production Company, Los Angeles',
    when: '1 month ago',
    impact: '2-agent system, 4-day setup',
    category: 'ai-personal-assistants',
    tags: ['AI Assistants', 'Executive AI', 'Outreach'],
    challenge:
      'Founder buried in admin. Calendar chaos, email overload, and manual enterprise outreach left almost no time for the actual creative work. Revenue was stalling because business development was suffering.',
    solution:
      "2-agent system running 24/7. Chief of Staff monitors the inbox and flags what needs a human response, handles calendar invites and scheduling conflicts, and sends a daily briefing at 8am with the founder's top three priorities. Sales Engine scrapes industry news and professional networks, identifies decision-makers at production houses and brands, and writes personalised outreach in the founder's own voice, queued for one-click approval before sending. Setup time: 4 days.",
  },
  {
    id: 'morning-brief-assistant',
    title: 'AI Morning Brief & Daily Assistant',
    client: 'Entrepreneur / Operator',
    when: 'Active',
    impact: 'Day planned and ready before 9am',
    category: 'ai-personal-assistants',
    tags: ['AI Assistants', 'Morning Brief', 'Productivity'],
    challenge:
      'The client was starting every morning reactive — no clear view of what mattered, tasks scattered across apps, and no system to delegate repeatable work like drafting outreach or summarising content. Time was wasted before the first real meeting.',
    solution:
      'Built a personal AI assistant running in a chat workspace. Every morning it sends a structured daily brief: a context and energy check-in, a timestamped task list pulled from calendar and project notes, and a "what I can do for you today" section listing delegatable work — drafting outreach copy, summarising long video, turning current priorities into a short action plan. Additional automations cover email triage and response drafting, meeting prep summaries, follow-up reminders, and content scheduling.',
  },
  {
    id: 'bizdev-setter-agent',
    title: 'BizDev Setter Agent',
    client: 'AI Integration Agency, Montreal',
    when: '3 weeks ago',
    impact: 'Lead response time: hours → 60 seconds',
    category: 'ai-personal-assistants',
    tags: ['AI Assistants', 'Lead Generation', 'CRM'],
    challenge:
      'Inbound leads from paid social were going cold fast. The team’s manual SMS and email follow-up was too slow — by the time someone responded, the lead had moved on.',
    solution:
      'AI agent picks up every new lead within 60 seconds of form submission. Runs a natural SMS qualification conversation covering budget, timeline, and decision-maker status, scores the lead, and books discovery calls directly into the shared calendar. CRM is updated automatically with full conversation context. Integrated with the SMS gateway, the ad platform’s lead forms, and the CRM. The team now only speaks to pre-qualified prospects who chose a time themselves.',
  },
  {
    id: 'real-estate-founder-assistant',
    title: 'Real Estate Founder AI Assistant',
    client: 'Property Investment Firm, Singapore',
    when: '3 weeks ago',
    impact: '4 hours of admin eliminated per day',
    category: 'ai-personal-assistants',
    tags: ['AI Assistants', 'Real Estate', 'Inbox Management'],
    challenge:
      'The founder was spending 4+ hours daily managing email, chasing document sign-offs, scheduling site visits, and summarising market reports — time that should have gone to sourcing deals and meeting investors.',
    solution:
      'Deployed a personal AI assistant handling inbox triage and response drafting, meeting scheduling across time zones, property research summarisation, and investor update generation. The agent connects to calendar, mail, and the firm’s notes workspace. Each morning the founder receives a structured priorities brief. Work that previously consumed most of the afternoon is now handled autonomously, with review and approval taking under 30 minutes.',
  },

  /* --- Lead gen & outreach ------------------------------------------------ */
  {
    id: 'orthodontic-patient-leads',
    title: 'Orthodontic Patient Lead System',
    client: 'Orthodontic Practice, Southern California',
    when: 'Active',
    impact: 'High-intent patient leads scraped daily across three platforms',
    category: 'lead-gen-outreach',
    tags: ['Lead Gen', 'Healthcare', 'Intent Scraping'],
    challenge:
      'The practice relied entirely on word-of-mouth and paid ads for new patients. There was no proactive system to find people actively searching for orthodontic consultations nearby, meaning warm, high-intent leads were being captured by competitors first.',
    solution:
      'Built a fully automated lead intelligence system that scrapes community platforms daily for posts showing orthodontist recommendation intent near each practice location. Every lead is tagged by intent type — recommendation request, consultation interest, adult aligner enquiry — matched to the nearest office, and delivered to a live sheet dashboard for the team to act on immediately. The system also monitors competitor pages for comparison shoppers. Identification and outreach run in the background; the client sees a live dashboard showing exactly how the automation is performing.',
  },
  {
    id: 'tariff-prospect-engine',
    title: 'Tariff Relief Prospect Engine',
    client: 'Specialty Finance Firm',
    when: 'Active',
    impact: '24,539 prospects tracked across 2,712 industries',
    category: 'lead-gen-outreach',
    tags: ['Lead Gen', 'B2B Prospecting', 'Data Enrichment'],
    challenge:
      'Identifying US businesses exposed to tariff and duty-refund risk — importers and carriers sitting on a large refund opportunity — before competitors reached them. Manual list-building could not cover the field at the required scale.',
    solution:
      'Built a prospect intelligence platform tracking 24,539 businesses across 2,712 industries and 52 states: 23,047 tier-one direct importers and 1,492 tier-two carrier-imported, with 22,656 verified email contacts. AI enrichment runs continuously to update contact details, verify deliverability, and flag top-priority targets by refund exposure size. The outreach runs automated in the background; the client receives a live dashboard to monitor it in real time.',
  },
  {
    id: 'creator-brand-outreach',
    title: 'Creator & Brand Outreach Intelligence Engine',
    client: 'Creator Relations Team',
    when: 'Active',
    impact: 'Ranked, colour-coded priority leads delivered daily',
    category: 'lead-gen-outreach',
    tags: ['Lead Gen', 'Creator Economy', 'Sales Intelligence'],
    challenge:
      'The team was manually researching brands and creators to reach out to — a slow, scattered process with no consistent prioritisation. High-value direct-to-consumer and luxury hospitality targets were getting lost in the noise, with no way to tell at a glance which leads to act on first.',
    solution:
      'Built an automated sales tracking engine that pulls in prospective brands and creator relationships daily, ranks them by opportunity tier, and delivers them to a colour-coded dashboard. Each row carries the company description, industry vertical, trend tag, priority tier, and a personalised note for the account owner. Status columns flag leads as verified, needing review, blocked, or high-priority, so the team can scan in seconds.',
  },
  {
    id: 'credit-lead-tracker',
    title: 'Tax Credit Lead Intelligence Tracker',
    client: 'Specialty Finance Firm',
    when: 'Active',
    impact: '46 outreach-ready prospects and 147 strictly assessed, tracked live',
    category: 'lead-gen-outreach',
    tags: ['Lead Gen', 'B2B Prospecting', 'Pipeline Tracking'],
    challenge:
      'The firm needed a systematic way to identify and track businesses eligible for tax credit and relief programmes, separating evidence-confirmed opportunities from outreach-ready prospects and those requiring further validation. Manual research was inconsistent, slow, and created no audit trail.',
    solution:
      'Built a multi-tab lead intelligence and outreach tracker that ingests, validates, and categorises leads across five pipeline stages, with a review queue for anything ambiguous. Each lead is strictly assessed for supporting evidence and eligibility before being promoted to outreach-ready. A live dashboard surfaces real-time counts — 46 outreach-ready, 101 held for review, 1 evidence-confirmed, 147 strictly assessed — so the team knows exactly where each opportunity stands. A sync log timestamps every refresh for full auditability.',
  },
  {
    id: 'patient-lead-tracker',
    title: 'Multi-Location Patient Lead Tracker',
    client: 'Healthcare Group, Ohio',
    when: 'Active',
    impact: '42 clean patient leads routed across 2 clinic locations',
    category: 'lead-gen-outreach',
    tags: ['Lead Gen', 'Healthcare', 'Multi-Location'],
    challenge:
      'The clinics needed a reliable system to identify, clean, and route inbound patient leads to the correct location. Leads were arriving with inconsistent data quality, missing contact details, and no clear routing logic, making follow-up slow and error-prone.',
    solution:
      'Built a patient lead tracker that imports raw prospects, runs deduplication and exclusion filters, and surfaces a clean list with clear status tiers: high priority, qualified, review queue, and excluded. Leads route automatically by geography — 28 to one clinic, 14 to the other — with a recommended workflow built into the dashboard: call high priority first, update pipeline status after each call, use notes for outcomes, skip do-not-contact records. The system syncs daily and timestamps every refresh.',
  },
  {
    id: 'insurance-prospect-scraper',
    title: 'Insurance Prospect Scraper',
    client: 'Insurance Brokerage, Multiple Carriers',
    when: 'Active',
    impact: 'Thousands of pre-qualified policy shoppers identified weekly',
    category: 'lead-gen-outreach',
    tags: ['Lead Gen', 'Insurance', 'Intent Scraping'],
    challenge:
      'Agents were cold-calling purchased lists with single-digit contact rates. There was no way to identify people actively comparing policies or unhappy with their current provider — the highest-intent window for a switch.',
    solution:
      'AI-powered scraper monitors community forums and neighbourhood platforms for insurance shopping signals: policy comparison questions, renewal complaints, rate shock posts, and open enrollment discussions. Each lead is tagged by insurance line, scored by switch intent, and delivered daily with the original post, platform, and contact context. Agents focus only on people already looking.',
  },
  {
    id: 'b2b-saas-prospect-intelligence',
    title: 'B2B SaaS Prospect Intelligence Engine',
    client: 'SaaS Company, San Francisco',
    when: 'Active',
    impact: '8,200 qualified ICP accounts identified in week one',
    category: 'lead-gen-outreach',
    tags: ['Lead Gen', 'SaaS', 'Intent Signals'],
    challenge:
      'The sales team was manually researching accounts one by one, spending 45 minutes per prospect just to determine fit before outreach. Quota targets were impossible to hit at that pace.',
    solution:
      'Built an AI prospect intelligence platform that scrapes company data from professional networks, review sites, funding databases, and web signals to identify accounts matching the ICP. Each account is enriched with company size, tech stack, growth signals, hiring trends, and decision-maker contacts, then scored and ranked by likelihood to convert. Delivered to a live dashboard with one-click export for sequences. The team went from 20 researched accounts per day to 200+, with no drop in research quality.',
  },

  /* --- 24/7 AI receptionist ----------------------------------------------- */
  {
    id: 'after-hours-call-handling',
    title: 'After-Hours Call Handling',
    client: 'Chiropractic Clinic',
    when: '3 weeks ago',
    impact: '22 after-hours bookings in month one',
    category: 'ai-call-centers',
    tags: ['Call Center AI', 'Healthcare', 'Appointment Booking'],
    challenge:
      'Calls going to voicemail after 6pm and on weekends. New patients who could not reach anyone were calling the clinic down the street instead. The clinic was losing patients it never knew it was losing.',
    solution:
      'AI receptionist answers every call in a warm, professional voice. Books appointments against real-time availability from the clinic’s scheduling system, sends SMS confirmations and 24-hour reminders, and handles rescheduling without any staff involvement. The clinic tracked 22 after-hours bookings in the first month that previously would have gone to voicemail.',
  },
  {
    id: 'veterinary-phone-agent',
    title: 'Veterinary Clinic Phone Agent',
    client: 'Veterinary Practice, Sydney',
    when: '7 weeks ago',
    impact: '45% more appointments booked',
    category: 'ai-call-centers',
    tags: ['Call Center AI', 'Healthcare', 'Triage'],
    challenge:
      'A small three-vet clinic could not answer phones during procedures. Pet owners called competitors when no one picked up, especially evenings and weekends when most pet emergencies happen.',
    solution:
      'AI phone agent answers 24/7, asks triage questions to distinguish emergencies from routine check-ups, and books appointments against each vet’s live availability from the practice management system. Sends SMS confirmations with pre-visit instructions. Emergency calls are flagged and forwarded to the on-call vet immediately. Weekend bookings increased 45% in the first 30 days, and the front desk reported 60% fewer routine booking calls.',
  },
  {
    id: 'law-firm-intake-agent',
    title: 'Law Firm Intake & Appointment Agent',
    client: 'Personal Injury Law Firm, Texas',
    when: 'Active',
    impact: 'Zero missed intakes, every call answered',
    category: 'ai-call-centers',
    tags: ['Call Center AI', 'Legal', 'Lead Qualification'],
    challenge:
      'Paralegal staff were fielding intake calls while managing casework, so calls at peak hours or after 5pm went to voicemail. High-intent leads who could not get through were calling competitor firms instead.',
    solution:
      'AI phone agent answers every call instantly, collects intake details — nature of injury, date, location, insurance status — qualifies the lead against the firm’s case criteria, and books a consultation with the right attorney. Urgent cases are flagged and escalated immediately. All intake data is logged directly to the case management system. The firm tracked a 35% increase in qualified consultations booked in the first 30 days.',
  },

  /* --- Social media automation -------------------------------------------- */
  {
    id: 'reels-content-system',
    title: 'AI Social Media Content System',
    client: 'Personal Brand, Health Tech',
    when: 'Active',
    impact: '85K+ followers from a fully automated content pipeline',
    category: 'social-media-automation',
    tags: ['Social Media', 'AI Video', 'Short-Form'],
    challenge:
      'The account needed a consistent, high-volume stream of short-form video without the time cost of manual ideation, scripting, and production. Keeping up with trending formats while maintaining a distinctive brand voice was impossible to sustain by hand.',
    solution:
      'Built an end-to-end AI content system. A Content Scout agent continuously monitors trending audio, hooks, and formats relevant to the niche, surfacing the highest-potential opportunities each week. An AI Production agent turns those briefs into polished short-form video — scripted, captioned, and formatted for vertical feeds — using AI video and motion tools. Output is reviewed and queued for publishing on a consistent schedule. The account has grown past 85,000 followers.',
  },
  {
    id: 'three-agent-social-system',
    title: '3-Agent Social System: Community, Content & Growth',
    client: 'DTC Food Brand',
    when: 'Active',
    impact: 'Autonomous production across UGC, founder-led and AI video formats',
    category: 'social-media-automation',
    tags: ['Social Media', 'AI Video', 'Multi-Agent', 'UGC'],
    challenge:
      'The brand needed to build an engaged community and drive product sales through social, but producing high-quality, varied content at the volume required to grow was unsustainable manually. It needed a system that could run continuously, adapt to performance data, and hold a distinctive creative voice without constant human input.',
    solution:
      'Built a 3-agent system. Creative Director sets the weekly content strategy, defines hooks and formats, and briefs per content type. AI Content Producer executes the brief using generative video and motion tools to produce UGC-style clips, founder-led talking-head formats, and fully AI-generated video. Analytics & Optimisation tracks engagement, reach, saves, and conversion signals, identifies which formats and hooks are performing, and feeds structured improvement notes back into the next brief. The system learns from its own data and improves output quality over time.',
  },
  {
    id: 'two-agent-growth-system',
    title: '2-Agent Growth System: Discovery & AI Video Production',
    client: 'Sports Media Brand',
    when: 'Active',
    impact: 'Automated pipeline from trend discovery to finished video',
    category: 'social-media-automation',
    tags: ['Social Media', 'AI Video', 'Content Discovery'],
    challenge:
      'The brand needed to scale its social presence rapidly without a full in-house production team. Identifying trending topics, writing compelling hooks, and consistently producing polished video across a high-volume posting schedule was too resource-intensive to manage manually.',
    solution:
      'Built a 2-agent pipeline. Content Scout continuously scans trending topics, competitor activity, and audience interest signals to surface the highest-potential subjects, extracts winning hooks, formats them into description copy in the brand voice, and queues them as production briefs. AI Video Producer takes each brief and generates fully produced short-form video using motion and particle tools for visuals and an LLM for script and caption writing. The system runs continuously in the background.',
  },
  {
    id: 'multi-platform-content-pipeline',
    title: 'Multi-Platform Content Pipeline',
    client: 'Small Business Owner, Hong Kong',
    when: '1 month ago',
    impact: 'A full week of content produced in 20 minutes',
    category: 'social-media-automation',
    tags: ['Workflow Automation', 'Content', 'Social Media'],
    challenge:
      'The owner was manually recreating content for two social platforms, a weekly newsletter, and a blog — the same ideas rewritten four times, taking up an entire day every week.',
    solution:
      'One weekly input, a voice memo or bullet points, generates platform-specific posts, a formatted newsletter, and an SEO-structured blog post. Each piece is adapted for tone, length, and format by platform. Posts schedule automatically, and performance reports land every Monday morning.',
  },

  /* --- AI copywriting ------------------------------------------------------ */
  {
    id: 'copywriting-customer-service',
    title: 'AI Copywriting + Customer Service System',
    client: 'E-commerce & Service Businesses',
    when: 'Active',
    impact: '80% of customer queries resolved without human involvement',
    category: 'ai-copywriting',
    tags: ['Copywriting', 'Customer Service AI', 'Website Build'],
    challenge:
      'Two bottlenecks hit at once. Marketing could not produce enough on-brand copy fast enough across ads, emails, landing pages, and social, and customer service was drowning in repetitive queries that required no judgment — just fast, accurate responses.',
    solution:
      'Deployed a dual system. The copywriting engine is trained on brand voice, past campaigns, and top-performing content, generating ads, email sequences, product descriptions, landing page copy, and social posts on demand, each reviewed and published in one click. A customer service assistant embedded on-site is trained on services, FAQs, and qualification criteria, handling visitor queries 24/7 and routing warm leads to specialists automatically.',
  },
  {
    id: 'ecommerce-product-ad-copy',
    title: 'E-commerce Product & Ad Copy System',
    client: 'Beauty Brand, Australia',
    when: 'Active',
    impact: '300+ product descriptions and 60 ad variants in one week',
    category: 'ai-copywriting',
    tags: ['E-commerce', 'Product Copy', 'Ad Copy'],
    challenge:
      'Relaunching with an expanded line of 300+ SKUs required unique, on-brand product descriptions plus ad creative across two platforms — a three-month copywriting project that needed to launch in two weeks.',
    solution:
      'Trained an AI copywriting system on brand voice, product positioning, audience segments, and top-performing past copy. The system generated descriptions for all 300 SKUs, 60 ad variants across three audience segments, and shopping feed copy, all reviewed and refined within one week. The in-house team spent two days on final approvals rather than months writing. The system remains in place, generating seasonal campaign copy on demand.',
  },
  {
    id: 'b2b-linkedin-content-engine',
    title: 'B2B Thought Leadership Content Engine',
    client: 'Consulting Firm, London',
    when: 'Active',
    impact: '3 weeks of content produced in 45 minutes per month',
    category: 'ai-copywriting',
    tags: ['B2B', 'Thought Leadership', 'Content Calendar'],
    challenge:
      'The firm’s partners knew professional social was a powerful business development channel, but consistently producing insightful, on-brand posts was impossible to fit into a billable-hours culture. Content went weeks without being posted.',
    solution:
      'Built a monthly content workflow. Partners submit a 30-minute voice note recapping what they have been working on and thinking about. The system extracts themes, drafts posts in each partner’s voice, builds a content calendar aligned to strategic topics, and queues everything for review. Partners spend 15 minutes approving a month of posts. Engagement increased 4x in the first 60 days, with three inbound enquiries directly attributable to content in month two.',
  },

  /* --- Custom AI agent team ------------------------------------------------ */
  {
    id: 'full-marketing-team',
    title: 'Full AI Marketing Team',
    client: 'Digital Marketing Agency',
    when: '2 months ago',
    impact: '6-agent team running autonomously',
    category: 'ai-agent-team',
    tags: ['Multi-Agent', 'Marketing', 'Agency'],
    challenge:
      'The agency owner had become the bottleneck for everything, manually handling research, ads, analytics, content, and project management across eight active clients. Scaling was impossible without burning out.',
    solution:
      '6-agent dashboard. Researcher pulls market data and competitor intel per client brief. Ads Specialist builds and monitors campaign briefs. Content Creator drafts copy and social posts. Data Analyst pulls weekly performance and surfaces key takeaways. Marketing Manager coordinates between agents and flags blockers. Project Manager tracks client deliverables against deadlines. Every output hits an approval queue, and the owner reviews and approves in under 10 minutes per day.',
  },
  {
    id: 'discord-content-team',
    title: '3-Agent Content Team',
    client: 'Content Agency',
    when: '5 weeks ago',
    impact: 'Publication-ready content in 20 minutes',
    category: 'ai-agent-team',
    tags: ['Multi-Agent', 'Content', 'Research'],
    challenge:
      'Needed to produce consistent, high-quality content daily across multiple niches without adding headcount or compromising on depth and voice.',
    solution:
      '3-agent system running in a team chat workspace. The first agent does deep research on any given topic, pulling from news, forums, and competitor content to find angles worth covering. The second drafts long-form content in the agency’s house voice from that brief. The third runs a final editing pass, tightening copy, checking tone consistency, and formatting for the target platform. Drop a topic in the channel, receive publication-ready content in under 20 minutes.',
  },
  {
    id: 'recruitment-operations-team',
    title: 'Recruitment Agency AI Operations Team',
    client: 'Specialist Recruitment Agency, Hong Kong',
    when: 'Active',
    impact: 'Time-to-shortlist cut from 5 days to 6 hours',
    category: 'ai-agent-team',
    tags: ['Multi-Agent', 'Recruitment', 'Sourcing'],
    challenge:
      'A fast-growing agency was losing placements to larger competitors who could move faster on shortlisting and outreach. Consultants were spending 80% of their time on research and admin, not client relationships.',
    solution:
      'Built a 4-agent operations team. Sourcing Agent scans professional networks and job boards to identify and rank candidates against job specs. Research Agent enriches profiles and surfaces relevant experience highlights. Outreach Agent sends personalised messages and tracks responses. Admin Agent manages scheduling, follow-ups, and CRM updates. Consultants now focus exclusively on interviews and client relationships. Placement volume increased 40% without adding headcount.',
  },

  /* --- Custom AI solutions -------------------------------------------------- */
  {
    id: 'internal-policy-bot',
    title: 'Internal Policy Bot',
    client: 'Customer Service Department, Taiwan',
    when: '5 weeks ago',
    impact: '60% drop in internal support tickets',
    category: 'custom-ai-solutions',
    tags: ['RAG Knowledge', 'Customer Service', 'Document AI'],
    challenge:
      'A 200+ person customer service team was constantly submitting internal tickets to HR and compliance for answers already documented in company policies, SOPs, and training materials, slowing everyone down.',
    solution:
      'RAG system trained on 200+ internal documents including HR policies, compliance guides, product SOPs, escalation procedures, and training materials. Employees ask questions in plain English via chat or a web interface and receive cited, accurate answers in seconds, with the source document and section shown for every response. Compliance queries that previously took two business days now resolve in under a minute.',
  },
  {
    id: 'company-knowledge-base',
    title: 'AI Company Knowledge Base',
    client: 'Operations Teams, Multiple Industries',
    when: 'Active',
    impact: 'New hire ramp time cut by 60%',
    category: 'custom-ai-solutions',
    tags: ['RAG', 'Document AI', 'Onboarding'],
    challenge:
      'Employees wasted hours every week hunting through wikis, drives, chat, and email for answers buried in SOPs, policy docs, or past meeting notes. Onboarding took weeks because institutional knowledge lived in people’s heads.',
    solution:
      'Built a custom internal knowledge base powered by retrieval-augmented generation that ingests and indexes all company documentation — SOPs, HR policies, training manuals, meeting notes, product specs, compliance guides, and email threads. Employees ask questions in plain English via a chat bot or web interface and receive accurate, cited answers in seconds. The system continuously re-indexes as new content is added, so it stays current without manual maintenance.',
  },
  {
    id: 'strategy-advisor-llm',
    title: 'Internal Strategy Advisor',
    client: 'Private Equity Firm, New York',
    when: '2 months ago',
    impact: 'Deal analysis time cut by 70%',
    category: 'custom-ai-solutions',
    tags: ['Business LLM', 'Finance', 'Document AI'],
    challenge:
      'Junior analysts were spending three to five days per deal reviewing pitch decks, financial models, and market reports before producing a recommendation memo, creating a bottleneck on how many deals the firm could evaluate.',
    solution:
      'Custom LLM fine-tuned on the firm’s past deal memos, investment thesis documents, and sector coverage notes. Analysts upload a pitch deck and receive a structured assessment in under 10 minutes covering market size, team quality, financial health, competitive moat, risks, and a preliminary recommendation with rationale drawn from comparable past deals. Deal assessment capacity doubled without adding headcount.',
  },
  {
    id: 'sales-playbook-ai',
    title: 'Sales Playbook AI',
    client: 'SaaS Company, Berlin',
    when: '6 weeks ago',
    impact: 'Ramp time cut from 90 days to 30',
    category: 'custom-ai-solutions',
    tags: ['Business LLM', 'SaaS', 'Sales Enablement'],
    challenge:
      'New sales reps took 90+ days to become effective. Product knowledge, pricing nuances, and objection handling all lived in senior reps’ heads and scattered documents nobody kept up to date.',
    solution:
      'Custom LLM trained on 200+ sales call transcripts, product documentation, pricing sheets, competitive battle cards, and win/loss analysis. New reps ask questions in plain language and get instant, accurate answers with real examples from past deals. The model also generates first-draft email responses and proposal language in the company’s sales voice.',
  },
  {
    id: 'client-onboarding-autopilot',
    title: 'Client Onboarding Autopilot',
    client: 'Accounting Firm, Singapore',
    when: '6 weeks ago',
    impact: '4-hour onboarding process → 15 minutes',
    category: 'custom-ai-solutions',
    tags: ['Workflow Automation', 'Accounting', 'Onboarding'],
    challenge:
      'Every new client required 4+ hours of manual setup: branded welcome emails, document collection portals, folder structure, billing configuration, and scheduling a kickoff call. Partners were doing admin instead of billable work.',
    solution:
      'A single trigger when a client signs sends the branded welcome pack, opens a secure document collection portal with a unique link, creates a structured folder with the correct permissions for the client’s tier, sets up the invoice and billing schedule, and books the kickoff call. The whole process completes in 15 minutes with zero staff involvement. The firm onboarded 3x more clients in Q1 with the same team.',
  },
  {
    id: 'lead-to-close-automation',
    title: 'Lead-to-Close Automation',
    client: 'Real Estate Agent, Vancouver',
    when: '2 weeks ago',
    impact: 'Zero manual touch from ad click to booked call',
    category: 'custom-ai-solutions',
    tags: ['Workflow Automation', 'Real Estate', 'Lead Generation'],
    challenge:
      'Paid social was generating solid inbound leads, but the follow-up pipeline was leaky. Slow SMS, delayed emails, and no automatic appointment booking meant warm leads going cold — or calling a competitor first.',
    solution:
      'End-to-end automation: ad click, lead capture form, AI qualification sequence over SMS and email within two minutes, appointment booked into the calendar, confirmation and reminder sent, lead logged to CRM with full conversation context. If there is no response, the agent follows up three times over 48 hours, then flags the lead for manual review.',
  },
  {
    id: 'internal-tools-hub',
    title: 'MCP Internal Tools Hub',
    client: 'B2B SaaS Company, Austin',
    when: '2 weeks ago',
    impact: 'Engineering interruptions down 80%',
    category: 'custom-ai-solutions',
    tags: ['MCP', 'SaaS', 'Internal Tools'],
    challenge:
      'The non-technical operations team was constantly pinging engineering for database lookups, ticket status checks, and document pulls, creating a daily bottleneck that frustrated both teams.',
    solution:
      'Built an assistant connected via MCP servers to the production database (read-only, with row-level permissions scoped by role), the issue tracker, and the internal documentation workspace. Operations team members type plain English questions and get live database answers, ticket summaries, and document pull-ups in seconds, with zero SQL knowledge required. Every query is logged with a full audit trail for compliance.',
  },
  {
    id: 'multi-location-ops-dashboard',
    title: 'Multi-Location Operations Dashboard & AI Reporting',
    client: 'Franchise Group, 12 Locations',
    when: 'Active',
    impact: 'Weekly ops report produced in 3 minutes instead of 3 hours',
    category: 'custom-ai-solutions',
    tags: ['Custom AI', 'Operations', 'Reporting'],
    challenge:
      'The operations director was manually compiling performance data from 12 separate spreadsheets and point-of-sale systems every week — a three-hour process prone to errors and always delivered late. Leadership had no real-time visibility into which locations were underperforming.',
    solution:
      'Built a custom operations intelligence layer that pulls live data from all 12 locations’ point-of-sale, inventory, and scheduling systems into a unified dashboard. An AI reporting agent generates a structured weekly performance brief every Monday: top and bottom performers, anomalies, staffing efficiency, and recommended actions per location. Alerts fire in real time when any location hits a defined threshold.',
  },
  {
    id: 'website-redesign-booking',
    title: 'Website Redesign, AI Imagery & Booking Automation',
    client: 'Cleaning Services Company',
    when: 'Active',
    impact: 'Full redesign plus booking automation live for owners and staff',
    category: 'custom-ai-solutions',
    tags: ['Website Redesign', 'AI Imagery', 'Booking Automation'],
    challenge:
      'The company needed a complete brand overhaul — the existing website did not reflect the quality of the service. Beyond aesthetics, there was no automated system to notify owners of new bookings or give cleaners a way to opt in or out of jobs; everything was managed manually via calls and texts.',
    solution:
      'Redesigned the entire website from the ground up, including layout, copy, and visual identity, using AI image generation for professional-grade imagery throughout. A customer service assistant embedded on the site handles visitor queries 24/7. On the operations side, a booking automation triggers the moment a new booking arrives: owners receive an instant notification with full details, and cleaners are alerted with a job card they can accept or decline. Confirmed jobs route to available staff with all follow-up communication handled automatically.',
  },
]

export const PROJECTS_PAGE: ProjectsContent = {
  seo: {
    title: 'See Our Work',
    description:
      'Real AI systems built for real businesses — lead engines, phone agents, agent teams, and internal knowledge bases. Filter by the kind of work you need.',
  },
  hero: {
    eyebrow: 'Success Stories',
    headline: {
      lead: 'Real results from',
      emphasis: 'real clients',
    },
    sub: 'Every project below is a business we helped. Filter by service to see the work closest to your own problem.',
  },
  filterLabel: 'Filter projects by service',
  allLabel: 'All',
  emptyMessage: 'No projects in this category yet.',
  close: {
    eyebrow: 'Have a similar challenge?',
    title: "Let's talk about your project.",
    sub: 'Bring the process that is eating your week. We will tell you on the call whether it is worth automating.',
    cta: {
      primary: { label: 'Book a free hiring call', href: BRAND.calendly },
      secondary: { label: 'See pricing', href: '/pricing' },
    },
  },
}
