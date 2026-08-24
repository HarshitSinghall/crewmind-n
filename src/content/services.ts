import type { ServiceContent, ServicesIndexContent } from './types'
import { BRAND } from './site'

/* ---------------------------------------------------------------------------
   PLACEHOLDER CONTENT — see CONTENT-SWAP.md
   Transcribed from docs/reference/autoploy-services.md and the four service
   detail pages captured alongside it.

   Two named third-party products in the reference ("OpenClaw", "Hermes
   Agent", "Retell AI", "Higgsfield") are referred to generically here. They
   are another vendor's stack choices, and hardcoding them into our copy
   claims a partnership nobody has.

   COVERAGE, per spec section 10: four services carry full detail (geo,
   ai-personal-assistants, lead-gen-outreach, ai-call-centers). The other four
   have thinner `sections` arrays — they render correctly and completely, they
   simply carry less copy. Those are marked TODO below.
--------------------------------------------------------------------------- */

const bookCta = { label: 'Book a Free Strategy Call', href: BRAND.calendly }

const whatsappCta = (topic: string) => ({
  label: 'Message Us on WhatsApp',
  href: BRAND.whatsapp(`Hello, I'd like to learn more about ${topic}.`),
})

export const SERVICES_INDEX: ServicesIndexContent = {
  seo: {
    title: 'Services',
    description:
      'From AI assistants to workflow automation and 24/7 voice agents, we build custom AI systems that run your business while you sleep. One-time setup, no subscriptions.',
  },
  hero: {
    eyebrow: 'What we offer',
    headline: {
      lead: 'End-to-end AI automation,',
      emphasis: 'built to your workflow',
    },
    sub: 'Eight services, every one done for you — scoped, built, integrated, and handed over working. Pick the problem you actually have.',
  },
  close: {
    eyebrow: 'Not sure which one',
    title: 'Describe the problem. We will name the service.',
    sub: 'Most engagements start with a process someone is doing by hand. Bring that, and we will tell you what it maps to.',
    cta: {
      primary: bookCta,
      secondary: { label: 'See our work', href: '/past-projects' },
    },
  },
}

export const SERVICES: ServiceContent[] = [
  /* ======================================================================
     1. GEO — full detail
  ====================================================================== */
  {
    slug: 'geo',
    title: 'GEO — Get Recommended by AI',
    description:
      "We make AI recommend your business. When your customers ask ChatGPT, Gemini, or Perplexity a question, we make sure you're the answer they get.",
    features: ['AI visibility audit', 'LLM optimisation', 'Competitive AI positioning'],
    category: 'geo',
    seo: {
      title: 'GEO — Get Recommended by AI',
      description:
        "We make AI recommend your business. When your customers ask an AI assistant for a recommendation, we make sure you're the answer they get.",
    },
    hero: {
      eyebrow: 'Generative Engine Optimisation',
      headline: {
        lead: 'We make AI',
        emphasis: 'recommend your service',
      },
      sub: "When your customers ask AI a question, we make sure you're the recommended answer — not your competitor.",
      cta: { primary: bookCta, secondary: whatsappCta('your GEO service') },
      assurances: ['ChatGPT', 'Gemini', 'Perplexity', 'Claude'],
    },
    sections: [
      {
        kind: 'pillars',
        id: 'problem',
        eyebrow: 'The problem',
        title: 'Search moved into the chatbox.',
        sub: "AI now answers the questions buyers used to type into a search engine. If it can't see you, you're not in the conversation.",
        items: [
          {
            id: 'discovery',
            title: 'Buyers ask AI first',
            body: 'Before they visit a site or read a review, your customers ask AI who to choose. That answer becomes their shortlist.',
          },
          {
            id: 'risk',
            title: 'AI names your competitors',
            body: "If AI doesn't know enough about you, it confidently recommends someone else — by name, in your category.",
          },
          {
            id: 'blind-spot',
            title: 'You never see it happen',
            body: "It never shows in your analytics. The lost sale looks like it never happened. That's the part that costs the most.",
          },
        ],
      },
      {
        kind: 'stats',
        id: 'score',
        eyebrow: 'AI visibility score',
        title: 'Every brand has an AI score. Most are losing without knowing it.',
        sub: 'AI recommends brands it understands and trusts. When those signals are thin, it names someone else. We show you exactly where you stand.',
        items: [
          {
            value: '38/100',
            label: 'Typical starting score',
            body: 'Where most brands sit before any generative-engine work at all.',
          },
          {
            value: '38%',
            label: 'Visibility',
            body: 'How often AI surfaces you when a buyer asks for options in your category.',
          },
          {
            value: '45%',
            label: 'Authority',
            body: 'Whether the sources AI trusts have enough to say about you.',
          },
          {
            value: '53%',
            label: 'Coverage',
            body: 'How much of your offer AI can actually describe when asked.',
          },
        ],
      },
      {
        kind: 'pillars',
        id: 'service',
        eyebrow: 'The service',
        title: 'We handle it all. You do nothing.',
        sub: 'We audit your AI visibility, build your presence, and improve it over time.',
        items: [
          {
            id: 'reports',
            title: 'Know where you stand',
            body: 'See which AI platforms recommend you, which do not, and exactly what your customers see when they ask.',
          },
          {
            id: 'presence',
            title: 'Get recommended more',
            body: 'We publish authority content and join the online conversations AI reads, so it mentions your brand when buyers ask.',
          },
          {
            id: 'tracking',
            title: 'See what is changing',
            body: 'A monthly walkthrough — what improved, what we did, and how you compare to competitors.',
          },
          {
            id: 'managed',
            title: 'Fully managed',
            body: 'After a short onboarding, we handle everything. You run your business.',
          },
        ],
      },
      {
        kind: 'checklist',
        id: 'included',
        title: "Here's exactly what we do:",
        items: [
          'Baseline audit across every major AI assistant',
          'Replies to AI-indexed conversations in your category',
          'Authority content published on the sources AI cites',
          'Improvements to your AI citation footprint',
          'Monthly score rebalancing and competitor comparison',
          'A monthly video walkthrough of what changed and why',
        ],
      },
    ],
    close: {
      eyebrow: 'Get started',
      title: "Find out if you're invisible to AI.",
      sub: 'We will run a free audit across the major assistants and show you exactly where you stand.',
      cta: { primary: bookCta, secondary: whatsappCta('your GEO service') },
    },
  },

  /* ======================================================================
     2. AI agents & assistants — full detail
  ====================================================================== */
  {
    slug: 'ai-personal-assistants',
    title: 'AI Agents & Assistants',
    description:
      'Done-for-you setup of two powerful agent frameworks that handle your inbox, outreach, scheduling, and ops 24/7.',
    features: [
      'Personal AI assistant',
      'Autonomous outreach agent',
      'CRM & tool integrations',
    ],
    category: 'ai-personal-assistants',
    seo: {
      title: 'AI Agents & Assistants',
      description:
        'Get a full AI team running 24/7 — a personal assistant for inbox and calendar, an autonomous agent for outreach. Done for you, no code required.',
    },
    hero: {
      eyebrow: 'Done for you · No code required',
      headline: {
        lead: 'Wake up to an AI team',
        emphasis: 'already working for you',
      },
      sub: 'One assistant manages your inbox, calendar, and tasks. The other messages your leads, books calls, and executes across every channel — both running by tomorrow.',
      cta: {
        primary: bookCta,
        secondary: whatsappCta('the AI agents and assistants setup'),
      },
      assurances: ['100+ setups completed', 'Live in days, not months', '30-day support'],
    },
    sections: [
      {
        kind: 'pillars',
        id: 'frameworks',
        eyebrow: 'Two frameworks, one setup',
        title: 'An assistant for inside. An agent for outside.',
        sub: 'While you slept, your assistant checked your emails and updated your calendar, and your outreach agent messaged prospects, followed up with leads, and updated your CRM. That is what clients wake up to.',
        items: [
          {
            id: 'assistant',
            title: 'The personal assistant',
            body: 'Your chief of staff. Email triaging and drafting, calendar and scheduling, chat integrations, CRM updates and notes — anything internal.',
          },
          {
            id: 'agent',
            title: 'The outreach agent',
            body: 'Autonomous and external. Multi-channel messaging, lead outreach and follow-up, call booking automation, and task execution around the clock.',
          },
        ],
      },
      {
        kind: 'checklist',
        id: 'included',
        title: "Here's exactly what you get:",
        items: [
          'Full installation on a VPS, a Mac Mini, or your preferred setup',
          'Outreach agent configured for messaging, follow-up and task execution',
          'Custom agents built for your specific business or personal needs',
          'Your tools integrated — CRM, email, chat, calendar, and more',
          'Multi-channel messaging and task execution running 24/7',
          'Personality and memory tailored to how you work',
          'Skills picked and configured for your use case',
          'A security protocol proven across 100+ setups',
          'Bug fixes and troubleshooting for existing setups',
          '30-day support included',
          'Full breakdown and walkthrough so you understand everything',
        ],
      },
      {
        kind: 'audience',
        id: 'audience',
        eyebrow: 'Built for',
        title: 'Why people hire us',
        items: [
          'Founders & CEOs — delegate outreach, follow-ups, email triage and ops to AI that never sleeps',
          'Freelancers & creators — automate client comms, scheduling, and content workflows',
          'Small teams — a shared AI team for sales, ops and support, with no developer needed',
          'Technical teams — get both frameworks running properly without the headaches',
        ],
      },
      {
        kind: 'steps',
        id: 'process',
        title: 'How it works',
        sub: 'Four steps, about a week, and you are running.',
        steps: [
          {
            step: '01',
            title: 'Reach out to us',
            body: 'Tell us your goals. We plan which agents fit your workflows best, and what the first month should look like.',
          },
          {
            step: '02',
            title: 'We set up secure access',
            body: 'We connect over an encrypted tunnel. No passwords are shared, and access is scoped to what the build needs.',
          },
          {
            step: '03',
            title: 'We build everything for you',
            body: 'Custom agents, integrations, and channel connections, all built for you. Plan on day one, build across days two and three, connect on day four.',
          },
          {
            step: '04',
            title: "You're up and running",
            body: 'Everything tested and tailored. We walk you through it and hand over documentation on day five.',
          },
        ],
      },
      {
        kind: 'stats',
        id: 'why-us',
        title: 'Why clients choose us',
        items: [
          {
            value: '29 hrs',
            label: 'Returned per week',
            body: 'Email drafting and triage, outreach follow-ups, calendar scheduling, and manual CRM updates, added up.',
          },
          {
            value: '0',
            label: 'Code required',
            body: 'You never need to touch a terminal or write a single line.',
          },
          {
            value: '24/7',
            label: 'Always on',
            body: 'Once set up, your AI team runs around the clock.',
          },
        ],
      },
      {
        kind: 'faq',
        id: 'faq',
        title: 'Frequently asked questions',
        items: [
          {
            id: 'both',
            question: 'Do I get both the assistant and the outreach agent in one setup?',
            answer:
              'Yes, if both fit your workflows. Most clients start with the internal assistant because the time saving is immediate and obvious, then add outreach once they trust it. We scope which combination makes sense on the call rather than selling you both by default.',
          },
          {
            id: 'technical',
            question: 'Do I need technical knowledge?',
            answer:
              'No. We install, configure, and integrate everything, then hand over a walkthrough and written documentation. If you can describe how you work, you can operate what we build.',
          },
          {
            id: 'timeline',
            question: 'How long does setup take?',
            answer:
              'About a week from kickoff to handover for a standard setup — day one to plan, days two and three to build, day four to connect your tools, day five to walk you through it. Heavier integration work extends that, and we tell you before we start if it will.',
          },
          {
            id: 'extend',
            question: 'Can I add more capabilities later?',
            answer:
              'Yes. The agents are yours, including the configuration and any custom skills we wrote. You can extend them yourself, or bring us back for a scoped addition.',
          },
          {
            id: 'breaks',
            question: 'What if something breaks?',
            answer:
              'Support is included for 30 days after handover, which covers the period where real-world use surfaces the things testing did not. Beyond that we offer troubleshooting as a separate engagement, including for setups we did not originally build.',
          },
        ],
      },
    ],
    close: {
      eyebrow: 'Limited availability',
      title: 'We take a limited number of clients per month.',
      sub: 'Book your setup call now. By next week, your AI agents will be working for you.',
      cta: {
        primary: bookCta,
        secondary: whatsappCta('the AI agents and assistants setup'),
      },
    },
  },

  /* ======================================================================
     3. Lead gen & outreach — full detail
  ====================================================================== */
  {
    slug: 'lead-gen-outreach',
    title: 'Lead Gen & Outreach Systems',
    description:
      'We find leads matching your exact target audience, populate a live sheet, and automatically send outreach via email, LinkedIn, and SMS.',
    features: ['ICP-based lead discovery', 'Live sheet feed', 'Email & LinkedIn automation'],
    category: 'lead-gen-outreach',
    seo: {
      title: 'Lead Gen & Outreach Systems',
      description:
        'We build systems that find your ideal leads, populate a live sheet, and automatically reach out via email, LinkedIn, and SMS — all on autopilot.',
    },
    hero: {
      eyebrow: 'Lead generation & outreach · Email · LinkedIn · SMS',
      headline: {
        lead: 'Ten times the pipeline,',
        emphasis: 'none of the prospecting',
      },
      sub: 'We build a system that finds leads matching your exact target audience, populates a live sheet you can always refer to, and automatically sends personalised outreach across email, LinkedIn, and SMS.',
      cta: {
        primary: bookCta,
        secondary: whatsappCta('your lead gen and outreach systems'),
      },
      assurances: ['1,000+ leads/day', '3 channels', 'Pauses the moment they reply'],
    },
    sections: [
      {
        kind: 'audience',
        id: 'audience',
        eyebrow: "Who it's for",
        title: 'Works for any business that sells',
        items: [
          'B2B sales teams',
          'SaaS & tech companies',
          'Recruiting & staffing',
          'Marketing agencies',
          'Real estate & property',
          'Service businesses',
        ],
      },
      {
        kind: 'checklist',
        id: 'included',
        title: "Here's exactly what you get:",
        items: [
          'ICP-based lead discovery across professional networks, forums, and search',
          'Every lead delivered into a live sheet you can always access',
          'Automated email outreach sequences with follow-ups',
          'Direct message automation on professional networks',
          'SMS outreach campaigns',
          'Real-time lead status tracking and reply detection',
          'Custom filters: industry, job title, company size, location',
          'De-duplication and bounce filtering built in',
          'Outreach auto-pauses when a lead replies — you take it from there',
          '30-day support and optimisation included',
        ],
      },
      {
        kind: 'steps',
        id: 'process',
        title: 'How it works',
        sub: 'You describe the customer. We build the machine that finds them.',
        steps: [
          {
            step: '01',
            title: 'Tell us your ICP',
            body: 'Share your ideal customer profile — industry, job title, company size, geography, or any signal that matters. The more specific, the better the leads.',
          },
          {
            step: '02',
            title: 'We build the lead engine',
            body: 'We configure scrapers, data APIs, and enrichment tools that continuously find new prospects matching your criteria across every source worth watching.',
          },
          {
            step: '03',
            title: 'Leads flow into your sheet',
            body: 'Every lead is added in real time — name, company, contact details, source, and any qualifying data. You always have full visibility.',
          },
          {
            step: '04',
            title: 'Outreach runs automatically',
            body: 'Personalised emails, direct messages, and SMS go out on a schedule. When someone replies, outreach pauses and you are notified to take over the conversation.',
          },
        ],
      },
      {
        kind: 'stats',
        id: 'why-us',
        title: 'Why clients choose us',
        items: [
          {
            value: '1,000+',
            label: 'Leads found per day',
            body: 'Continuously sourced against your exact ICP criteria.',
          },
          {
            value: '3',
            label: 'Outreach channels',
            body: 'Email, professional networks, and SMS, all running simultaneously.',
          },
          {
            value: '38 hrs',
            label: 'Automated per week',
            body: 'Manual prospecting, email follow-ups, network outreach, and CRM updates.',
          },
        ],
      },
      {
        kind: 'faq',
        id: 'faq',
        title: 'Frequently asked questions',
        items: [
          {
            id: 'sources',
            question: 'How do you find leads?',
            answer:
              'A mix of professional network data, enrichment APIs, public forums, and search — chosen per client based on where your buyers actually leave signals. For some businesses that is a job board; for others it is a neighbourhood forum. We work that out during scoping rather than pointing the same scraper at everyone.',
          },
          {
            id: 'review',
            question: 'Can I review leads before outreach starts?',
            answer:
              'Yes, and we recommend it for the first two weeks. Leads land in the sheet with a status column, and outreach only fires for rows you approve. Once you trust the filtering, most clients switch it to fully automatic.',
          },
          {
            id: 'spam',
            question: 'Will this get flagged as spam?',
            answer:
              'It can, if it is run carelessly — which is why we build in de-duplication, bounce filtering, sending limits, domain warm-up, and per-lead personalisation rather than blasting a template. We also stop outreach the moment someone replies. None of that makes cold outreach risk-free, and we will tell you honestly whether your domain setup is ready for it.',
          },
          {
            id: 'timeline',
            question: 'How quickly can this be set up?',
            answer:
              'A straightforward single-channel system takes about a week. Multi-channel with heavy enrichment and CRM integration runs closer to two or three. You get a written scope with the timeline before anything starts.',
          },
        ],
      },
    ],
    close: {
      eyebrow: 'Limited availability',
      title: 'Ready to fill your pipeline automatically?',
      sub: 'Book a call and we will scope your lead gen system. No commitment required.',
      cta: {
        primary: bookCta,
        secondary: whatsappCta('your lead gen and outreach systems'),
      },
    },
  },

  /* ======================================================================
     4. 24/7 AI receptionist — full detail
  ====================================================================== */
  {
    slug: 'ai-call-centers',
    title: '24/7 AI Receptionist',
    description:
      'AI phone agents for bookings, customer support, and lead qualification. Never miss a call again.',
    features: ['Human-like voices', 'Live appointment booking', 'CRM syncing'],
    category: 'ai-call-centers',
    seo: {
      title: '24/7 AI Receptionist',
      description:
        'AI phone agents that answer calls, book appointments, qualify leads, and follow up — even at 2am. No hold music, no missed revenue.',
    },
    hero: {
      eyebrow: 'AI phone agents · 24/7/365 coverage',
      headline: {
        lead: 'Never miss another',
        emphasis: 'customer call',
      },
      sub: '74% of calls to small businesses go unanswered, and every missed call is a lost customer. We build voice agents that pick up every single call, around the clock.',
      cta: { primary: bookCta, secondary: whatsappCta('the 24/7 AI receptionist') },
      assurances: [
        'Answers in under 1 second',
        'Handles 100 calls at once',
        'Books against live availability',
      ],
    },
    sections: [
      {
        kind: 'pillars',
        id: 'problem',
        eyebrow: 'The problem',
        title: 'This is costing you more than you think.',
        items: [
          {
            id: 'working',
            title: 'Missing calls while working',
            body: "You're with a client or on a job. The phone rings. They don't leave a voicemail — they call your competitor.",
          },
          {
            id: 'after-hours',
            title: 'After-hours means zero coverage',
            body: 'Customers call at 8pm, on weekends, on holidays. Most hang up when they hear voicemail. Revenue walks out every night.',
          },
          {
            id: 'one-at-a-time',
            title: 'One receptionist, one call',
            body: "Three calls at once means two go to hold or voicemail. You're paying a full-time salary for one conversation at a time.",
          },
          {
            id: 'cost',
            title: 'A receptionist is a salary',
            body: 'Salary, benefits, sick days, training, turnover — and still no nights, weekends, or holidays.',
          },
          {
            id: 'holding',
            title: 'Callers hate holding',
            body: 'Most customers name hold time as the most frustrating part of contacting a business. Long waits mean bad reviews and lost clients.',
          },
          {
            id: 'blind',
            title: "You don't know what you're losing",
            body: "Most owners don't track missed calls. Five today or fifty? You're flying blind on your biggest revenue channel.",
          },
        ],
      },
      {
        kind: 'pillars',
        id: 'solution',
        eyebrow: 'The solution',
        title: 'A receptionist that never sleeps.',
        sub: 'Handles a hundred calls at once. Never calls in sick. Costs a fraction of a hire.',
        items: [
          {
            id: 'instant',
            title: 'Answers every call instantly',
            body: 'No rings, no hold music, no voicemail. Every call picked up in under a second, 2pm Tuesday or 11pm on a holiday.',
          },
          {
            id: 'human',
            title: 'Sounds like a real person',
            body: 'Natural conversation, not a robot menu. Greets callers by name, understands what they need, responds naturally.',
          },
          {
            id: 'booking',
            title: 'Books appointments live',
            body: 'Checks your live availability and books on the spot. Confirmation sent to both of you. No double-booking.',
          },
          {
            id: 'faqs',
            title: 'Answers your FAQs',
            body: 'Pricing, hours, location, services — it handles the routine calls so you only deal with the ones that need you.',
          },
          {
            id: 'qualify',
            title: 'Qualifies leads',
            body: 'Asks the right questions about need, budget, and timeline. Leads reach you pre-qualified and ready to close.',
          },
          {
            id: 'transfer',
            title: 'Transfers when needed',
            body: 'Complex issue or a VIP caller? It transfers to you instantly with full context of what was discussed.',
          },
        ],
      },
      {
        kind: 'audience',
        id: 'industries',
        title: 'Industries that need this',
        items: [
          'Medical & dental offices',
          'Law firms',
          'Real estate',
          'Home services — HVAC, plumbing, electrical',
          'Restaurants',
          'Auto dealerships & repair',
          'Insurance agencies',
          'Fitness & wellness',
          'Property management',
          'E-commerce & retail',
        ],
      },
      {
        kind: 'comparison',
        id: 'compare',
        spec: {
          eyebrow: 'Honest comparison',
          title: 'AI, a receptionist, or voicemail.',
          sub: 'A human receptionist beats AI on judgment and warmth. On coverage and concurrency, it is not close. Here is the actual trade.',
          columns: ['AI agent', 'Receptionist', 'Voicemail'],
          rows: [
            {
              id: 'availability',
              label: 'Available 24/7/365',
              values: ['Yes', 'No', 'Yes, but nobody uses it'],
            },
            {
              id: 'speed',
              label: 'Answers instantly',
              values: ['Under 1 second', 'If not already busy', 'No'],
            },
            {
              id: 'concurrency',
              label: 'Multiple calls at once',
              values: ['Unlimited', 'One at a time', 'No'],
            },
            {
              id: 'booking',
              label: 'Books appointments',
              values: ['Yes', 'Yes', 'No'],
            },
            {
              id: 'qualify',
              label: 'Qualifies leads',
              values: ['Yes, to a script', 'Yes, and can use judgment', 'No'],
            },
            {
              id: 'judgment',
              label: 'Handles the unexpected',
              values: ['Escalates to a human', 'Yes — this is the real edge', 'No'],
            },
            {
              id: 'crm',
              label: 'Logs to CRM',
              values: ['Automatically', 'If they remember', 'No'],
            },
            {
              id: 'sick',
              label: 'Calls in sick',
              values: ['Never', 'Occasionally', 'Not applicable'],
            },
          ],
          note: 'Most clients end up running both: AI takes overflow, after-hours, and routine booking, and the human handles everything that needs a person.',
        },
      },
      {
        kind: 'steps',
        id: 'process',
        title: 'How we set it up',
        steps: [
          {
            step: '01',
            title: 'Call audit',
            body: 'We analyse your call volume, missed calls, and what they are costing you. You see the number before you commit to anything.',
          },
          {
            step: '02',
            title: 'We build your agent',
            body: 'We create a voice agent trained on your business, services, pricing, FAQs, booking rules, and tone of voice.',
          },
          {
            step: '03',
            title: 'Connect your phone line',
            body: 'It connects to your existing number — no new number needed. Calls route through the agent first, then to you when needed.',
          },
          {
            step: '04',
            title: 'Every call answered',
            body: 'From day one, every call gets picked up. A dashboard shows call volume, outcomes, bookings, and leads captured.',
          },
        ],
      },
      {
        kind: 'faq',
        id: 'faq',
        title: 'Frequently asked questions',
        items: [
          {
            id: 'know',
            question: "Will callers know it's AI?",
            answer:
              'Some will, and we think you should let them. The agent identifies itself as a virtual assistant if asked directly — pretending otherwise damages trust the moment someone works it out, and in some jurisdictions disclosure is required. In practice callers care far more that someone picked up.',
          },
          {
            id: 'cannot-handle',
            question: "What if the AI can't handle a call?",
            answer:
              'It escalates. Anything outside its scope, any caller who asks for a person, and any case flagged as urgent transfers to a human with the full context of the conversation so far. You define what counts as out of scope during setup.',
          },
          {
            id: 'number',
            question: 'Do I need a new phone number?',
            answer:
              'No. It connects to your existing line. Calls route through the agent first and forward to you under the rules you set.',
          },
          {
            id: 'existing-staff',
            question: 'What if I already have a receptionist?',
            answer:
              'Then this is overflow and after-hours cover, not a replacement. Most clients in this position route calls to the AI only when the line is busy or the office is closed. Your receptionist stops losing the callers they never had a chance to reach.',
          },
          {
            id: 'timeline',
            question: 'How fast can this be set up?',
            answer:
              'Around three weeks: a free audit, a week of training the agent on your business, a week of testing against real call scenarios, then going live. Simple deployments move faster.',
          },
          {
            id: 'languages',
            question: 'Can it handle other languages?',
            answer:
              'Yes. Multilingual handling is configured during setup, including routing by detected language. Quality varies by language, so we test the specific ones you need before going live rather than promising blanket coverage.',
          },
        ],
      },
    ],
    close: {
      eyebrow: 'Stop losing calls',
      title: "Every missed call is a customer you'll never get back.",
      sub: '15 minutes, no commitment. We will show you what you are losing.',
      cta: { primary: bookCta, secondary: whatsappCta('the 24/7 AI receptionist') },
    },
  },

  /* ======================================================================
     5. Social media automation — TODO: thin, source detail or write fresh
  ====================================================================== */
  {
    slug: 'social-media-automation',
    title: 'Social Media Automation Systems',
    description:
      'AI content generation built for your brand, custom dashboard, algorithm-aligned calendar, hook engineering, and every piece routed back to your mission.',
    features: [
      'AI video generation',
      'Content dashboard & calendar',
      'Hook & retention engineering',
    ],
    badge: 'New',
    category: 'social-media-automation',
    seo: {
      title: 'Social Media Automation Systems',
      description:
        'AI content systems built for your brand — video generation, a content dashboard and calendar, and hook engineering, all routed back to your mission.',
    },
    hero: {
      eyebrow: 'Social media automation',
      headline: {
        lead: 'A content team that',
        emphasis: 'never runs out of ideas',
      },
      sub: 'AI content generation systems built for your brand: a custom dashboard, an algorithm-aligned calendar, hook engineering, and every piece routed back to your mission.',
      cta: { primary: bookCta, secondary: whatsappCta('social media automation') },
    },
    sections: [
      {
        kind: 'checklist',
        id: 'included',
        title: "Here's exactly what you get:",
        items: [
          'AI video generation using current-generation motion and visual tools',
          'A custom content dashboard and publishing calendar',
          'Hook and retention engineering tuned to your niche',
          'Trend and format monitoring feeding weekly production briefs',
          'Every piece routed back to your brand mission and voice',
          'Performance tracking feeding back into the next content cycle',
        ],
      },
    ],
    close: {
      eyebrow: 'Get started',
      title: 'Stop trading your week for a content calendar.',
      sub: 'Book a call and we will scope a content system around the formats that actually work in your niche.',
      cta: { primary: bookCta, secondary: whatsappCta('social media automation') },
    },
  },

  /* ======================================================================
     6. AI copywriting — TODO: thin, source detail or write fresh
  ====================================================================== */
  {
    slug: 'ai-copywriting',
    title: 'AI Copywriting Systems',
    description:
      'Websites, landing pages, sales emails, and case studies — AI trained on your brand voice, your existing materials, and refined until it converts.',
    features: [
      'Brand voice training',
      'Landing page & website copy',
      'Sales email sequences',
    ],
    category: 'ai-copywriting',
    seo: {
      title: 'AI Copywriting Systems',
      description:
        'Websites, landing pages, sales emails, and case studies — an AI copywriting system trained on your brand voice and refined until it converts.',
    },
    hero: {
      eyebrow: 'AI copywriting',
      headline: {
        lead: 'Copy in your voice,',
        emphasis: 'at the volume you need',
      },
      sub: 'Websites, landing pages, sales emails, and case studies — trained on your brand voice and your existing materials, then refined until it converts.',
      cta: { primary: bookCta, secondary: whatsappCta('AI copywriting systems') },
    },
    sections: [
      {
        kind: 'checklist',
        id: 'included',
        title: "Here's exactly what you get:",
        items: [
          'Brand voice training on your existing materials and best-performing copy',
          'Landing page and full website copy',
          'Sales email sequences with follow-ups',
          'Product descriptions at catalogue scale',
          'Case studies written from your own project notes',
          'A review-and-approve loop, so nothing publishes unread',
        ],
      },
    ],
    close: {
      eyebrow: 'Get started',
      title: 'Sound like yourself, faster.',
      sub: 'Bring the copy you already have. We will train a system on it and show you the first drafts on the call.',
      cta: { primary: bookCta, secondary: whatsappCta('AI copywriting systems') },
    },
  },

  /* ======================================================================
     7. Custom AI agent team — TODO: thin, source detail or write fresh
  ====================================================================== */
  {
    slug: 'ai-agent-team',
    title: 'Custom AI Agent Team',
    description:
      'A complete AI operating system — a dedicated team of specialised agents, each one focused on helping your business achieve its mission.',
    features: ['Dedicated agent roles', 'Mission-aligned output', 'Full team coordination'],
    category: 'ai-agent-team',
    seo: {
      title: 'Custom AI Agent Team',
      description:
        'A complete AI operating system — a dedicated team of specialised agents, each focused on a role, coordinated around your business mission.',
    },
    hero: {
      eyebrow: 'Custom AI agent team',
      headline: {
        lead: 'Not one assistant.',
        emphasis: 'A whole team',
      },
      sub: 'A complete AI operating system: a dedicated team of specialised agents, each one focused on a role, all coordinated around what your business is actually trying to do.',
      cta: { primary: bookCta, secondary: whatsappCta('a custom AI agent team') },
    },
    sections: [
      {
        kind: 'checklist',
        id: 'included',
        title: "Here's exactly what you get:",
        items: [
          'Dedicated agent roles scoped to how your business actually divides work',
          'Mission-aligned output, with every agent briefed on the same goals',
          'Full team coordination, including handoffs between agents',
          'An approval queue so a human signs off before anything ships',
          'A shared dashboard showing what every agent is working on',
          'Documentation and a walkthrough so your team can run it',
        ],
      },
    ],
    close: {
      eyebrow: 'Get started',
      title: 'Describe the roles. We will build the team.',
      sub: 'Most agent teams start as an org chart sketched on a call. Bring yours.',
      cta: { primary: bookCta, secondary: whatsappCta('a custom AI agent team') },
    },
  },

  /* ======================================================================
     8. Custom AI solutions — TODO: thin, source detail or write fresh
  ====================================================================== */
  {
    slug: 'custom-ai-solutions',
    title: 'Custom AI Solutions',
    description:
      'Already have an AI system in place? We extend, enhance, and integrate your existing setup — zero disruption, maximum impact.',
    features: [
      'Existing AI system integration',
      'Enhancement & extension',
      'Architecture audit & upgrade',
    ],
    category: 'custom-ai-solutions',
    seo: {
      title: 'Custom AI Solutions',
      description:
        'Already have an AI system in place? We extend, enhance, and integrate your existing setup — custom workflow bridging and architecture audits included.',
    },
    hero: {
      eyebrow: 'Custom AI solutions',
      headline: {
        lead: 'You already built something.',
        emphasis: 'We make it work',
      },
      sub: 'Already have an AI system or solution in place? We extend, enhance, and integrate your existing setup — zero disruption, maximum impact.',
      cta: { primary: bookCta, secondary: whatsappCta('custom AI solutions') },
    },
    sections: [
      {
        kind: 'checklist',
        id: 'included',
        title: "Here's exactly what you get:",
        items: [
          'Integration with the AI systems you already run',
          'Enhancement and extension of existing agents and pipelines',
          'Custom workflow bridging between tools that do not talk to each other',
          'An architecture audit, with an honest verdict on what to keep',
          'Migration off anything that is costing more than it returns',
          'Documentation for whatever we touch',
        ],
      },
    ],
    close: {
      eyebrow: 'Get started',
      title: "Bring us what you've already built.",
      sub: 'We will audit it and tell you plainly whether it is worth extending or worth replacing.',
      cta: { primary: bookCta, secondary: whatsappCta('custom AI solutions') },
    },
  },
]

/** Slug lookup for the detail route. */
export function getService(slug: string | undefined): ServiceContent | undefined {
  return SERVICES.find((service) => service.slug === slug)
}
