import type { ServiceContent, ServicesIndexContent } from './types'
import { BRAND } from './site'

/* ---------------------------------------------------------------------------
   The roles we build.

   Rewritten onto the employee positioning. Each entry is a JOB, not a product
   category, and every page below is shaped like a job description rather than
   a brochure:

     what happens when nobody has this job
     → what is in the job description
     → how you hire one
     → what is NOT in the job description
     → the questions people actually ask

   The limits section is not decoration and must not be dropped to make a page
   read stronger. It is the same commitment the Priya page makes and the same
   one `about.ts` puts in its pillars: the limits are published before the
   price. A page here that only lists capabilities is off-brand.

   FIGURES REMOVED IN THIS PASS. The reference's numbers were being presented
   as our typical results and none of them were ours:
     - geo: the "38/100 / 38% / 45% / 53%" AI visibility scores
     - ai-personal-assistants: "29 hrs returned per week", "100+ setups"
     - lead-gen-outreach: "1,000+ leads per day", "38 hrs automated per week"
     - ai-call-centers: "74% of calls to small businesses go unanswered"
   Do not put any of them back without a measurement behind them. Where a
   `stats` section survives, its values are commitments we control (support
   window, coverage, channel count) rather than outcomes we do not.

   Two named third-party products in the reference ("OpenClaw", "Hermes
   Agent", "Retell AI", "Higgsfield") are referred to generically. They are
   another vendor's stack choices, and hardcoding them claims a partnership
   nobody has.

   The `title`, `description` and `features` of every entry are duplicated on
   the homepage grid in `home.ts`. They must stay identical — a card and the
   page it opens contradicting each other is the defect this note exists to
   prevent.
--------------------------------------------------------------------------- */

const bookCta = { label: 'Book a free hiring call', href: BRAND.calendly }

const whatsappCta = (topic: string) => ({
  label: 'Message us on WhatsApp',
  href: BRAND.whatsapp(`Hello, I'd like to talk about ${topic}.`),
})

export const SERVICES_INDEX: ServicesIndexContent = {
  seo: {
    title: 'The Roles We Build',
    description:
      'Eight jobs you can hand to an AI employee — reception, prospecting, executive support, content, copy, AI search, and whole departments. Built to your business and handed over working.',
  },
  hero: {
    eyebrow: 'The roles we build',
    headline: {
      lead: 'Eight jobs you can stop',
      emphasis: 'doing by hand',
    },
    sub: 'Each one is a role, not a piece of software — built around your business, wired into the tools you already run, and handed over working. Start with the job your team keeps dropping.',
  },
  close: {
    eyebrow: 'Not sure which one',
    title: 'Describe the job. We will tell you if it can be staffed.',
    sub: 'Most engagements start with something someone is doing by hand at eleven at night. Bring that, and we will tell you which role it is — or that it is not one, if that is the honest answer.',
    cta: {
      primary: bookCta,
      secondary: { label: 'See our work', href: '/past-projects' },
    },
  },
}

export const SERVICES: ServiceContent[] = [
  /* ======================================================================
     1. AI search — the job of being the answer
  ====================================================================== */
  {
    slug: 'geo',
    title: 'Your AI-search specialist',
    description:
      'Your buyers now ask ChatGPT and Perplexity who to use before they ask anyone else. This is the job of making sure the answer that comes back is you.',
    features: ['AI visibility audit', 'LLM optimisation', 'Competitive AI positioning'],
    category: 'geo',
    seo: {
      title: 'Your AI-Search Specialist',
      description:
        'Your buyers ask ChatGPT and Perplexity who to use before they ask anyone else. This is the job of making sure the answer that comes back is you.',
    },
    hero: {
      eyebrow: 'AI search · the job of being the answer',
      headline: {
        lead: 'Your buyer asked an AI who to use.',
        emphasis: 'It named someone else',
      },
      sub: 'Nobody on your team has the job of being findable inside ChatGPT, Gemini or Perplexity. It is not marketing and it is not SEO — it is somebody watching what the assistants say about your category and doing something about it.',
      cta: { primary: bookCta, secondary: whatsappCta('the AI-search role') },
      assurances: ['ChatGPT', 'Gemini', 'Perplexity', 'Claude'],
    },
    sections: [
      {
        kind: 'pillars',
        id: 'problem',
        eyebrow: 'When nobody has this job',
        title: 'Search moved into the chatbox, and nobody was reassigned.',
        sub: 'Your buyers now ask an assistant the questions they used to type into a search engine. The shortlist gets decided before anyone visits a website.',
        items: [
          {
            id: 'discovery',
            title: 'They ask an AI first',
            body: 'Before the site, before the reviews, before the call. Whatever comes back becomes the three names they actually consider.',
          },
          {
            id: 'risk',
            title: 'It answers with a competitor',
            body: 'When an assistant does not know enough about you, it does not hedge. It confidently recommends somebody else, by name, in your category.',
          },
          {
            id: 'blind-spot',
            title: 'You never see it happen',
            body: 'It leaves no trace in your analytics. No bounce, no impression, no lost session — the sale simply looks like it never existed. That is what makes it worth somebody owning.',
          },
        ],
      },
      {
        kind: 'checklist',
        id: 'included',
        title: 'What is in the job description:',
        items: [
          'A baseline audit across every major assistant — the actual answers they give when somebody asks for options in your category',
          'A written record of who gets named instead of you, and what those sources say that yours do not',
          'Authority content published on the sources the assistants actually cite',
          'Participation in the indexed conversations your category happens in',
          'Repair of the places your own material is thin, contradictory or missing',
          'A monthly re-run of the same audit, so movement is measured against the same questions',
          'A monthly walkthrough: what changed, what we did, and where you now sit against the competitors who keep coming up',
        ],
      },
      {
        kind: 'steps',
        id: 'process',
        title: 'How you hire one',
        sub: 'The first month is measurement. Nothing gets changed before we know what the assistants currently say.',
        steps: [
          {
            step: '01',
            title: 'We ask the assistants about you',
            body: 'The real questions your buyers ask, put to each major assistant, with the answers recorded verbatim. You read what your customers read.',
          },
          {
            step: '02',
            title: 'We work out why',
            body: 'Who gets named instead, which sources those answers lean on, and what is missing from the ones that mention you. This is the part that tells us whether the job is worth doing at all.',
          },
          {
            step: '03',
            title: 'The work starts',
            body: 'Authority content on the sources that get cited, participation where your category is discussed, and repair of your own thin material.',
          },
          {
            step: '04',
            title: 'The same questions, every month',
            body: 'Re-asked, re-recorded, compared. Movement or no movement, you see the transcript rather than a dashboard number.',
          },
        ],
      },
      {
        kind: 'pillars',
        id: 'limits',
        eyebrow: 'Limits',
        title: 'What is not in the job description.',
        sub: 'Written down here so you do not find it out in month three.',
        items: [
          {
            id: 'no-guarantee',
            title: 'Nobody can guarantee you a position',
            body: 'Not us, and not anyone else selling this. There is no ranking to buy and no index to submit to — model answers shift with retraining, and anyone promising a fixed spot is describing a mechanism that does not exist.',
          },
          {
            id: 'slow',
            title: 'It is slow',
            body: 'This moves in months, not weeks, because it depends on sources being published, indexed and then picked up. If you need pipeline this quarter, hire the prospector instead and come back to this one.',
          },
          {
            id: 'not-seo',
            title: 'It is not a replacement for search',
            body: 'Google still sends you traffic and this does not change that. It is a second front that currently has nobody assigned to it, not a migration off the first.',
          },
          {
            id: 'no-audience',
            title: 'It does nothing if nobody asks about your category',
            body: 'Some categories simply are not researched this way yet. The audit tells us that in the first fortnight, and if that is your answer we will say so rather than sell you a retainer.',
          },
        ],
      },
      {
        kind: 'faq',
        id: 'faq',
        title: 'The questions people actually ask',
        items: [
          {
            id: 'vs-seo',
            question: 'Is this just SEO with a new name?',
            answer:
              'They overlap and they are not the same. SEO optimises for a ranked list of links; this optimises for what a model says in a sentence when there is no list. The tactics differ most in where the work gets published — assistants lean on a narrower, more citable set of sources than a search index does.',
          },
          {
            id: 'measure',
            question: 'How do I know it is working?',
            answer:
              'The same questions get asked every month and you read the answers. That is deliberately a transcript rather than a score, because a score we invent is not evidence and you have no way to check it.',
          },
          {
            id: 'howlong',
            question: 'How long before anything changes?',
            answer:
              'Usually months. Sources have to be published, indexed and then actually picked up. We would rather set that expectation now than have you cancel in week six because a number did not move.',
          },
          {
            id: 'diy',
            question: 'Could I do this myself?',
            answer:
              'Yes, genuinely. It is research, writing and participation, and none of it is secret. The reason people hire it out is that it needs doing every month by somebody whose job it is — which is the same reason this whole site exists.',
          },
        ],
      },
    ],
    close: {
      eyebrow: 'Start with the audit',
      title: 'Find out what the assistants say about you.',
      sub: 'We will run the audit across the major assistants and send you the answers in full, whether or not they make the case for hiring us.',
      cta: { primary: bookCta, secondary: whatsappCta('the AI-search role') },
    },
  },

  /* ======================================================================
     2. Executive assistant — the job inside the business
  ====================================================================== */
  {
    slug: 'ai-personal-assistants',
    title: 'Your executive assistant',
    description:
      'Runs the inbox, the calendar and the chasing — the four hours a day that sit between you and the work you are actually paid for.',
    features: ['Inbox & calendar management', 'Autonomous follow-up', 'CRM & tool integrations'],
    category: 'ai-personal-assistants',
    seo: {
      title: 'Your Executive Assistant',
      description:
        'Inbox, calendar, chasing and CRM updates — the work that has to happen, that nobody was hired to do, and that lands on whoever is most senior and least available.',
    },
    hero: {
      eyebrow: 'Executive support · inside the business',
      headline: {
        lead: 'The four hours a day',
        emphasis: 'that are not your job',
      },
      sub: 'Inbox triage, calendar, chasing, notes, CRM updates. Work that has to happen, that nobody was ever hired to do, and that therefore lands on whoever is most senior and least available — which is usually you.',
      cta: {
        primary: bookCta,
        secondary: whatsappCta('the executive assistant role'),
      },
      assurances: ['Live in about a week', 'No code, ever', '30 days of support'],
    },
    sections: [
      {
        kind: 'pillars',
        id: 'shape',
        eyebrow: 'Two shapes of the same hire',
        title: 'One faces inward. One faces outward.',
        sub: 'Most people start with the inward one, because the time it gives back is immediate and obvious, then add the outward one once they trust it.',
        items: [
          {
            id: 'assistant',
            title: 'The assistant, facing in',
            body: 'Your chief of staff. Email triage and drafting, calendar and scheduling, chat, notes, CRM updates — everything internal that eats the day in fifteen-minute pieces.',
          },
          {
            id: 'agent',
            title: 'The agent, facing out',
            body: 'Talks to other people. Multi-channel messaging, lead follow-up, booking calls, and chasing the things you said you would chase. It stops the moment a human on your side picks up the thread.',
          },
        ],
      },
      {
        kind: 'checklist',
        id: 'included',
        title: 'What is in the job description:',
        items: [
          'Full installation on a VPS, a Mac Mini, or whatever you already run',
          'Inbox triage, drafting and filing against rules you set and can change',
          'Calendar and scheduling, including the back-and-forth of finding a time',
          'Follow-up and chasing across email and chat, with a stop rule when a human replies',
          'Your tools connected — CRM, email, chat, calendar, and the rest',
          'Personality, tone and memory tuned to how you actually work',
          'Custom skills built for the parts of your job nobody else has',
          'A security protocol, with access scoped to what the build needs and nothing more',
          'Bug fixes and troubleshooting, including for setups we did not originally build',
          '30 days of support, and a walkthrough so you understand what it is doing',
        ],
      },
      {
        kind: 'audience',
        id: 'audience',
        eyebrow: 'Who hires this one',
        title: 'The people who end up doing this work themselves',
        items: [
          'Founders and CEOs — outreach, follow-up, triage and ops, delegated to something that does not need managing',
          'Freelancers and creators — client comms, scheduling, and the admin around the work',
          'Small teams — a shared assistant across sales, ops and support, with no developer in the loop',
          'Technical teams — the same frameworks, set up properly, without losing a fortnight to it',
        ],
      },
      {
        kind: 'steps',
        id: 'process',
        title: 'How you hire one',
        sub: 'About a week from the call to it running.',
        steps: [
          {
            step: '01',
            title: 'Write the job description',
            body: 'Tell us what the person would do and what "done" looks like. We work out which shape fits and what the first month should cover.',
          },
          {
            step: '02',
            title: 'We set up access',
            body: 'Over an encrypted tunnel, scoped to what the build needs. No passwords get shared and nothing is given blanket access to your accounts.',
          },
          {
            step: '03',
            title: 'We build it',
            body: 'Plan on day one, build across days two and three, connect your tools on day four. You do nothing during this part.',
          },
          {
            step: '04',
            title: 'First shift',
            body: 'Tested and tailored, then a walkthrough and written documentation on day five. You are shown how to change its rules yourself.',
          },
        ],
      },
      {
        kind: 'stats',
        id: 'commitments',
        eyebrow: 'What we commit to',
        title: 'Four things we control, and will hold to.',
        sub: 'Not outcome claims. These are the terms of the engagement, which is a different kind of number and the only kind we will print.',
        items: [
          {
            value: '24/7',
            label: 'On shift',
            body: 'Once it is running, it runs — including the nights and weekends nobody was covering.',
          },
          {
            value: '0',
            label: 'Code required',
            body: 'You never open a terminal or write a line. If you can describe how you work, you can operate it.',
          },
          {
            value: '30d',
            label: 'Support included',
            body: 'The window where real use surfaces what testing did not, answered by the person who built it.',
          },
          {
            value: 'Yours',
            label: 'The configuration',
            body: 'The agents, the prompts and any custom skills are yours to keep, extend, or take elsewhere.',
          },
        ],
      },
      {
        kind: 'pillars',
        id: 'limits',
        eyebrow: 'Limits',
        title: 'What is not in the job description.',
        sub: 'Written down here so you do not find it out in month two.',
        items: [
          {
            id: 'judgment',
            title: 'It does not make the call for you',
            body: 'It drafts, sorts, chases and prepares. Anything that commits you — a price, a promise, a hire, a no — comes to you first. That boundary is set during the build and you can move it, but the default is conservative on purpose.',
          },
          {
            id: 'messy-process',
            title: 'It cannot fix a process you do not have',
            body: 'If nobody knows what should happen to a given kind of email, an assistant does not resolve that — it makes the ambiguity happen faster. Part of the build is agreeing the rules, and occasionally that conversation is the whole value.',
          },
          {
            id: 'mistakes',
            title: 'It will get things wrong',
            body: 'Mostly filing and tone, occasionally something that matters. Everything it does is logged, so you see it rather than hearing about it from a client. Anyone claiming otherwise has not run one on a real inbox.',
          },
          {
            id: 'not-a-replacement',
            title: 'It does not replace an assistant you already have',
            body: 'If you employ somebody in this role, this takes the fifteen-minute pieces off them and gives them back the work that needed a person. We will say so on the call if what you actually need is the human.',
          },
        ],
      },
      {
        kind: 'faq',
        id: 'faq',
        title: 'The questions people actually ask',
        items: [
          {
            id: 'both',
            question: 'Do I get both the inward and the outward one?',
            answer:
              'If both fit. Most people start with the inward one because the time saving is immediate and obvious, then add outreach once they trust it. We scope which combination makes sense on the call rather than selling you both by default.',
          },
          {
            id: 'technical',
            question: 'Do I need to be technical?',
            answer:
              'No. We install, configure and integrate everything, then hand over a walkthrough and written documentation. If you can describe how you work, you can operate what we build and change its rules afterwards.',
          },
          {
            id: 'timeline',
            question: 'How long does it take to set up?',
            answer:
              'About a week from kickoff to handover for a standard build — a day to plan, two to build, one to connect your tools, one to walk you through it. Heavier integration work extends that, and we tell you before we start rather than after.',
          },
          {
            id: 'access',
            question: 'How much access does it need to my email?',
            answer:
              'As little as the job needs, scoped during the build, and revocable by you at any time from your own account. We will tell you exactly which permissions a given capability requires, and which capabilities you can drop if you would rather not grant them.',
          },
          {
            id: 'extend',
            question: 'Can I add to it later?',
            answer:
              'Yes. The configuration and any custom skills are yours. Extend it yourself, or bring us back for a scoped addition.',
          },
          {
            id: 'breaks',
            question: 'What if something breaks?',
            answer:
              'Support is included for 30 days after handover, which covers the period where real use surfaces what testing did not. After that we troubleshoot as a separate engagement — including for setups somebody else built.',
          },
        ],
      },
    ],
    close: {
      eyebrow: 'We keep the roster small',
      title: 'We take a limited number of builds a month.',
      sub: 'Bring the part of your week that is not your job. By this time next week it could be somebody else’s.',
      cta: {
        primary: bookCta,
        secondary: whatsappCta('the executive assistant role'),
      },
    },
  },

  /* ======================================================================
     3. Prospector — the job that slips first
  ====================================================================== */
  {
    slug: 'lead-gen-outreach',
    title: 'Your prospector',
    description:
      'Finds the people who match your buyer, puts them in a live sheet you can watch fill up, and opens the conversation over email, LinkedIn and SMS.',
    features: ['ICP-based lead discovery', 'Live sheet feed', 'Email & LinkedIn outreach'],
    category: 'lead-gen-outreach',
    seo: {
      title: 'Your Prospector',
      description:
        'The job of finding the right people and opening the conversation, every day, whether or not anyone feels like it. Email, LinkedIn and SMS, stopping the moment somebody replies.',
    },
    hero: {
      eyebrow: 'Prospecting · email, LinkedIn, SMS',
      headline: {
        lead: 'Nobody wakes up wanting',
        emphasis: 'to do prospecting',
      },
      sub: 'Which is why it is the first thing that slips in a busy week, and why your pipeline arrives in lumps. This is the job of finding the right people and opening the conversation every day, whether or not anyone feels like it.',
      cta: {
        primary: bookCta,
        secondary: whatsappCta('the prospector role'),
      },
      assurances: ['Three channels', 'Stops the moment they reply', '30 days of support'],
    },
    sections: [
      {
        kind: 'pillars',
        id: 'problem',
        eyebrow: 'When nobody has this job',
        title: 'It is never urgent, so it is never done.',
        sub: 'Prospecting has no deadline and nobody chasing it, which is exactly why it loses to everything else on the list.',
        items: [
          {
            id: 'slips',
            title: 'It loses to whatever is on fire',
            body: 'A live deal, a client problem, an invoice. All of them beat cold outreach on urgency, every single day, and none of them fill next quarter.',
          },
          {
            id: 'lumpy',
            title: 'Your pipeline arrives in lumps',
            body: 'A burst of outreach in a quiet week, nothing for a month, then a scramble. The gaps show up in your revenue about ninety days later.',
          },
          {
            id: 'closers',
            title: 'Your closers are doing it badly',
            body: 'The people who are good at conversations are spending their mornings building lists, which is neither what you hired them for nor what they are good at.',
          },
        ],
      },
      {
        kind: 'audience',
        id: 'audience',
        eyebrow: 'Who hires this one',
        title: 'Any business where somebody has to go first',
        items: [
          'B2B sales teams',
          'SaaS and technology companies',
          'Recruiting and staffing',
          'Marketing agencies',
          'Real estate and property',
          'Service businesses',
        ],
      },
      {
        kind: 'checklist',
        id: 'included',
        title: 'What is in the job description:',
        items: [
          'Lead discovery against your ICP across professional networks, forums and search',
          'Every lead into a live sheet you can open at any time and check yourself',
          'Custom filters: industry, job title, company size, location, and any signal that matters to you',
          'De-duplication and bounce filtering, so the same person is not approached twice',
          'Personalised email sequences with follow-ups',
          'Direct messaging on professional networks',
          'SMS campaigns where that is appropriate for your market',
          'Reply detection, with outreach pausing the second somebody answers',
          'Live status tracking, so you can see which stage every name is at',
          '30 days of support and tuning after it goes live',
        ],
      },
      {
        kind: 'steps',
        id: 'process',
        title: 'How you hire one',
        sub: 'You describe the buyer. We build the thing that goes and finds them.',
        steps: [
          {
            step: '01',
            title: 'Describe the buyer',
            body: 'Industry, job title, company size, geography, or any signal that actually predicts a good conversation. The more specific you are, the less noise comes back.',
          },
          {
            step: '02',
            title: 'We build the finder',
            body: 'Scrapers, data APIs and enrichment configured against your criteria, pointed at the places your buyers actually leave signals rather than at the same source as everybody else.',
          },
          {
            step: '03',
            title: 'Names start arriving',
            body: 'Into the sheet, in real time, with contact details, source and the data that qualified them. You watch it fill for a fortnight before anything is sent.',
          },
          {
            step: '04',
            title: 'Outreach starts',
            body: 'Email, direct message and SMS on a schedule you set. When somebody replies, everything queued for that person stops and you are told to take over.',
          },
        ],
      },
      {
        kind: 'stats',
        id: 'commitments',
        eyebrow: 'What we commit to',
        title: 'Three things we control.',
        sub: 'Volume depends on your market and your criteria, so we size that with you rather than printing an average here. These are ours to hold to.',
        items: [
          {
            value: '3',
            label: 'Channels',
            body: 'Email, professional networks and SMS, coordinated so the same person is not hit three ways at once.',
          },
          {
            value: '0',
            label: 'Messages after a reply',
            body: 'Reply detection stops the queue for that person immediately. Nobody gets an automated follow-up on top of a live conversation.',
          },
          {
            value: '30d',
            label: 'Support and tuning',
            body: 'The first month is where the filtering gets sharpened against real responses, and that is included.',
          },
        ],
      },
      {
        kind: 'pillars',
        id: 'limits',
        eyebrow: 'Limits',
        title: 'What is not in the job description.',
        sub: 'This is the role where the honest version matters most, because the dishonest version of it is everywhere.',
        items: [
          {
            id: 'no-close',
            title: 'It does not close, and it barely sells',
            body: 'It opens conversations. The moment somebody is interested, a person on your side takes over — and if you have nobody to take over, this generates replies you cannot service and makes you look worse than doing nothing.',
          },
          {
            id: 'spam',
            title: 'It can absolutely get you flagged',
            body: 'We build in de-duplication, bounce filtering, sending limits, domain warm-up and real per-lead personalisation rather than blasting a template. None of that makes cold outreach risk-free. If your domain setup is not ready, we will say so before we start rather than burn it.',
          },
          {
            id: 'bad-offer',
            title: 'It cannot rescue a weak offer',
            body: 'Volume against the wrong audience just produces a bigger pile of no. If the problem is what you are saying rather than how many people hear it, hire the copywriter first — and we will tell you if we think that on the call.',
          },
          {
            id: 'compliance',
            title: 'The rules are yours to meet',
            body: 'Consent, data protection and the marketing regulations of the markets you send into are your obligations. We build to what you tell us applies and we will flag what looks wrong, but we are not your compliance function.',
          },
        ],
      },
      {
        kind: 'faq',
        id: 'faq',
        title: 'The questions people actually ask',
        items: [
          {
            id: 'sources',
            question: 'How do you find the leads?',
            answer:
              'A mix of professional network data, enrichment APIs, public forums and search — chosen per client based on where your buyers actually leave signals. For some businesses that is a job board; for others it is a neighbourhood forum. We work that out during scoping rather than pointing the same scraper at everyone.',
          },
          {
            id: 'review',
            question: 'Can I see the leads before anything is sent?',
            answer:
              'Yes, and we recommend it for the first two weeks. Names land in the sheet with a status column and outreach only fires for rows you approve. Once you trust the filtering, most people switch it to automatic.',
          },
          {
            id: 'spam',
            question: 'Will this get my domain flagged?',
            answer:
              'It can, if it is run carelessly. We build in de-duplication, bounce filtering, sending limits, domain warm-up and per-lead personalisation, and we stop the moment somebody replies. That reduces the risk rather than removing it, and we will tell you honestly whether your current domain setup is ready for it.',
          },
          {
            id: 'volume',
            question: 'How many leads a day will I get?',
            answer:
              'It depends entirely on how narrow your criteria are and how many people match them, so any number printed here would be marketing rather than information. We size it against your actual ICP during scoping and tell you before you commit.',
          },
          {
            id: 'timeline',
            question: 'How quickly can it be running?',
            answer:
              'A straightforward single-channel build takes about a week. Multi-channel with heavy enrichment and CRM integration runs closer to two or three. You get a written scope with the timeline before anything starts.',
          },
        ],
      },
    ],
    close: {
      eyebrow: 'We keep the roster small',
      title: 'Stop losing prospecting to whatever is on fire.',
      sub: 'Book the call and describe your buyer. We will tell you how many of them there are before you commit to anything.',
      cta: {
        primary: bookCta,
        secondary: whatsappCta('the prospector role'),
      },
    },
  },

  /* ======================================================================
     4. Receptionist — the job that runs out of hours
  ====================================================================== */
  {
    slug: 'ai-call-centers',
    title: 'Your receptionist',
    description:
      'Answers every call, at any hour, in the language it was made in. Books the appointment, takes the details, and never puts anyone on hold or lets it ring out.',
    features: ['Human-like voice', 'Live appointment booking', 'CRM syncing'],
    category: 'ai-call-centers',
    seo: {
      title: 'Your Receptionist',
      description:
        'Answers every call, at any hour, in the language it was made in. Books the appointment, takes the details, and never puts anyone on hold or lets it ring out.',
    },
    hero: {
      eyebrow: 'Reception · every hour of every day',
      headline: {
        lead: 'The call you missed last night',
        emphasis: 'went to someone else',
      },
      /*
        The reference opened this page with "74% of calls to small businesses
        go unanswered". It is uncited, we have not measured it, and the page
        makes the same point without it — count your own missed calls.
      */
      sub: 'Look at your call log for last Saturday, and for anything after seven on a weekday. Every one of those rang out to a person who needed something and then called the next number down the list.',
      cta: { primary: bookCta, secondary: whatsappCta('the receptionist role') },
      assurances: [
        'Answers in under a second',
        'Takes every call at once',
        'Books against live availability',
      ],
    },
    sections: [
      {
        kind: 'pillars',
        id: 'problem',
        eyebrow: 'When nobody has this job',
        title: 'The phone is your biggest revenue channel and nobody is watching it.',
        items: [
          {
            id: 'working',
            title: 'You are with a customer',
            body: 'The phone rings while you are on a job or mid-appointment. They do not leave a voicemail. They call the next number.',
          },
          {
            id: 'after-hours',
            title: 'After seven, there is nobody',
            body: 'People call at 8pm, on Sundays, on holidays — often precisely because that is when the problem happened. Most hang up on a voicemail greeting.',
          },
          {
            id: 'one-at-a-time',
            title: 'One person, one call',
            body: 'Three calls at once means two go to hold or voicemail. You are paying a full salary for one conversation at a time.',
          },
          {
            id: 'holding',
            title: 'Nobody waits on hold any more',
            body: 'Hold time is the thing customers complain about most, and the alternative is one tap away in their recent calls list.',
          },
          {
            id: 'blind',
            title: 'You do not know the number',
            body: 'Most owners do not track missed calls at all. Five today or fifty? Count last week before you talk to us — it is the only figure that matters here, and it is yours rather than ours.',
          },
        ],
      },
      {
        kind: 'checklist',
        id: 'included',
        title: 'What is in the job description:',
        items: [
          'Every call answered in under a second, at any hour, on any day',
          'Natural conversation rather than a keypad menu',
          'As many calls at once as arrive — nobody is put on hold',
          'Your routine questions answered: pricing, hours, location, what you do',
          'Appointments booked against your live availability, with confirmations to both sides',
          'Callers qualified on need, timing and budget before they reach you',
          'Transfer to a person, with the context of the conversation so far, whenever it is asked for or your rules say so',
          'Every call logged to your CRM automatically, at the time it happened',
          'Connected to your existing number — no new line to advertise',
        ],
      },
      {
        kind: 'audience',
        id: 'industries',
        eyebrow: 'Who hires this one',
        title: 'Businesses where a missed call is a lost customer',
        items: [
          'Medical and dental practices',
          'Law firms',
          'Real estate',
          'Home services — HVAC, plumbing, electrical',
          'Restaurants',
          'Auto dealerships and repair',
          'Insurance agencies',
          'Fitness and wellness',
          'Property management',
          'E-commerce and retail',
        ],
      },
      {
        kind: 'comparison',
        id: 'compare',
        spec: {
          eyebrow: 'The honest comparison',
          title: 'This one, a person, or voicemail.',
          sub: 'A human receptionist beats this on judgment and warmth, and it is not close. On coverage and concurrency it is not close the other way. Here is the actual trade.',
          columns: ['AI receptionist', 'A person', 'Voicemail'],
          rows: [
            {
              id: 'availability',
              label: 'Available at 2am',
              values: ['Yes', 'No', 'Yes, but nobody uses it'],
            },
            {
              id: 'speed',
              label: 'Answers instantly',
              values: ['Under a second', 'If not already busy', 'No'],
            },
            {
              id: 'concurrency',
              label: 'Several calls at once',
              values: ['Yes', 'One at a time', 'No'],
            },
            {
              id: 'booking',
              label: 'Books appointments',
              values: ['Yes', 'Yes', 'No'],
            },
            {
              id: 'qualify',
              label: 'Qualifies the caller',
              values: ['Yes, to your rules', 'Yes, and can use judgment', 'No'],
            },
            {
              id: 'judgment',
              label: 'Handles the unexpected',
              values: ['Escalates to a person', 'Yes — this is the real edge', 'No'],
            },
            {
              id: 'upset',
              label: 'Handles an angry customer',
              values: [
                'Escalates, and should',
                'Yes, and this is why you keep one',
                'Makes it worse',
              ],
            },
            {
              id: 'crm',
              label: 'Logs the call',
              values: ['Automatically, every time', 'If they remember', 'No'],
            },
            {
              id: 'sick',
              label: 'Calls in sick',
              values: ['Never', 'Occasionally', 'Not applicable'],
            },
          ],
          note: 'Most people end up running both. This takes overflow, after-hours and routine booking; the person handles everything that needs a person. If you are choosing between this and hiring somebody, and your call volume is low, hire the person.',
        },
      },
      {
        kind: 'steps',
        id: 'process',
        title: 'How you hire one',
        steps: [
          {
            step: '01',
            title: 'Count the missed calls',
            body: 'We go through your call volume and what is currently going unanswered. You see that number before you commit to anything, and sometimes it is small enough that we tell you not to bother.',
          },
          {
            step: '02',
            title: 'We build it',
            body: 'Trained on your services, your prices, your booking rules, your FAQs and the way your business talks. It only answers from what you gave it.',
          },
          {
            step: '03',
            title: 'Connect your line',
            body: 'To your existing number. Calls route through it first and forward to you under rules you set — busy, after hours, always, or never.',
          },
          {
            step: '04',
            title: 'First shift',
            body: 'Every call answered from day one, with a dashboard showing volume, outcomes, bookings and what was captured.',
          },
        ],
      },
      {
        kind: 'pillars',
        id: 'limits',
        eyebrow: 'Limits',
        title: 'What is not in the job description.',
        sub: 'Written down here so you do not find it out from a customer.',
        items: [
          {
            id: 'upset',
            title: 'It should not handle an upset customer',
            body: 'It can, and it should not. Anger, complaints and anything emotionally loaded are set to escalate to a person — because the version of this that tries to de-escalate on its own is the version that ends up in a screenshot.',
          },
          {
            id: 'disclosure',
            title: 'It tells people what it is',
            body: 'If a caller asks directly, it says so. Pretending otherwise damages trust the moment somebody works it out, and in some places disclosure is required outright. In practice callers care far more that somebody picked up.',
          },
          {
            id: 'no-invention',
            title: 'It will not invent an answer',
            body: 'Prices, availability and policy come only from what you gave it. When it does not know, it says it will find out and takes a message rather than guessing — a made-up price is the worst thing that can come out of a call.',
          },
          {
            id: 'accents',
            title: 'It struggles with some accents and bad lines',
            body: 'Strong regional accents and poor reception will sometimes make it ask somebody to repeat themselves. Every call is recorded, so you will see where that happened rather than wonder.',
          },
          {
            id: 'volume',
            title: 'It is not worth it on low call volume',
            body: 'If you miss two calls a week, a person answering the phone is genuinely the better answer and this will not pay for itself. The audit in step one tells us that, and we will say it.',
          },
        ],
      },
      {
        kind: 'faq',
        id: 'faq',
        title: 'The questions people actually ask',
        items: [
          {
            id: 'know',
            question: 'Will callers know it is an AI?',
            answer:
              'Some will, and we think you should let them. It identifies itself if asked directly. Pretending otherwise damages trust the moment somebody works it out, and in some jurisdictions disclosure is required. In practice callers care far more that someone picked up at all.',
          },
          {
            id: 'cannot-handle',
            question: 'What happens when it cannot handle a call?',
            answer:
              'It escalates. Anything outside its scope, anyone who asks for a person, and anything flagged urgent transfers to a human with the full context of what was said. You define what counts as out of scope during the build, and you can change it afterwards.',
          },
          {
            id: 'number',
            question: 'Do I need a new phone number?',
            answer:
              'No. It connects to your existing line. Calls route through it first and forward to you under the rules you set.',
          },
          {
            id: 'existing-staff',
            question: 'I already have a receptionist. Then what?',
            answer:
              'Then this is overflow and after-hours cover, not a replacement. Most people in that position route calls to it only when the line is busy or the office is shut. Your receptionist stops losing the callers they never had a chance to reach in the first place.',
          },
          {
            id: 'timeline',
            question: 'How fast can it be running?',
            answer:
              'Around three weeks: the audit, a week training it on your business, a week testing against real call scenarios, then live. Simple deployments move faster and we will tell you which yours is.',
          },
          {
            id: 'languages',
            question: 'Can it handle other languages?',
            answer:
              'Yes, including routing by the language it detects. Quality varies by language, so we test the specific ones you need before going live rather than promising blanket coverage.',
          },
        ],
      },
    ],
    close: {
      eyebrow: 'Count them first',
      title: 'Go and look at last Saturday.',
      sub: 'Fifteen minutes, no commitment. We will work out what is currently ringing out — and tell you if the number is too small to be worth fixing.',
      cta: { primary: bookCta, secondary: whatsappCta('the receptionist role') },
    },
  },

  /* ======================================================================
     5. Content marketer
  ====================================================================== */
  {
    slug: 'social-media-automation',
    title: 'Your content marketer',
    description:
      'Posts every day in your brand voice, without a Sunday night scramble. Video, captions, and a calendar built around the algorithm instead of around guessing.',
    features: ['AI video generation', 'Content calendar & dashboard', 'Hook & retention engineering'],
    category: 'social-media-automation',
    seo: {
      title: 'Your Content Marketer',
      description:
        'Posts every day in your brand voice, without a Sunday night scramble. Video, captions, and a calendar built around the algorithm instead of around guessing.',
    },
    hero: {
      eyebrow: 'Content · every day, not every other Tuesday',
      headline: {
        lead: 'You know you should post daily.',
        emphasis: 'You post on Sundays',
      },
      sub: 'Because posting is somebody’s fifth priority and it shows. This is the job of turning up every day in your voice — the formats, the hooks, the calendar, and the part where somebody actually presses publish.',
      cta: { primary: bookCta, secondary: whatsappCta('the content marketer role') },
      assurances: ['Your voice, trained', 'A calendar you can see', 'You approve before it ships'],
    },
    sections: [
      {
        kind: 'pillars',
        id: 'problem',
        eyebrow: 'When nobody has this job',
        title: 'It is not a talent problem. It is a nobody-owns-it problem.',
        items: [
          {
            id: 'burst',
            title: 'You post in bursts',
            body: 'Four in a good week, nothing for a fortnight. Every platform reads that as a reason to stop showing you to people.',
          },
          {
            id: 'ideas',
            title: 'The blank page is the bottleneck',
            body: 'Not the filming and not the editing. Sitting down on Sunday with no idea what to say is the part that makes the whole thing collapse.',
          },
          {
            id: 'format',
            title: 'Nobody is watching what is working',
            body: 'Formats and hooks in your niche move every few weeks. Keeping up with that is a job, and right now it is nobody’s.',
          },
        ],
      },
      {
        kind: 'checklist',
        id: 'included',
        title: 'What is in the job description:',
        items: [
          'Video generated with current-generation motion and visual tools',
          'A content dashboard and publishing calendar you can open and see weeks ahead',
          'Hooks and retention structure tuned to what is working in your niche now',
          'Trend and format monitoring, feeding weekly production briefs',
          'Captions and copy in your voice, trained on what you have already published',
          'Every piece traced back to something your business actually wants to be known for',
          'Performance tracking that feeds the following week, rather than a monthly report nobody reads',
          'An approval queue — nothing publishes without a human saying yes',
        ],
      },
      {
        kind: 'steps',
        id: 'process',
        title: 'How you hire one',
        steps: [
          {
            step: '01',
            title: 'We learn your voice',
            body: 'From what you have already posted, what performed, and what you would never say. This is the part that decides whether the output sounds like you or like everybody else.',
          },
          {
            step: '02',
            title: 'We build the pipeline',
            body: 'Briefs, generation, the calendar and the dashboard, wired to the accounts you already run.',
          },
          {
            step: '03',
            title: 'You approve the first weeks',
            body: 'Everything sits in a queue and you say yes or no. Most people run it that way for a month, then loosen it on the formats they have stopped correcting.',
          },
          {
            step: '04',
            title: 'It keeps turning up',
            body: 'Daily, in your voice, with what worked last week shaping what goes out this week.',
          },
        ],
      },
      {
        kind: 'pillars',
        id: 'limits',
        eyebrow: 'Limits',
        title: 'What is not in the job description.',
        items: [
          {
            id: 'no-audience',
            title: 'It does not buy you an audience',
            body: 'Consistency and format get you a fair hearing from the algorithm. Whether people care about what you have to say is still down to what you have to say.',
          },
          {
            id: 'not-strategy',
            title: 'It is not your marketing strategy',
            body: 'It executes a position. It does not decide what your business should be known for — that comes from you, and if it is vague the output will be too.',
          },
          {
            id: 'approval',
            title: 'It needs somebody to press yes',
            body: 'The approval queue is not a formality. Fully unattended publishing in your brand’s name is a bad idea and we do not recommend it, however good the drafts get.',
          },
          {
            id: 'faces',
            title: 'It does not replace you being on camera',
            body: 'In most niches the posts that build trust have a person in them. This covers the volume around those; it does not remove the need for them.',
          },
        ],
      },
    ],
    close: {
      eyebrow: 'Get started',
      title: 'Stop trading your Sunday for a content calendar.',
      sub: 'Bring what you have already posted. We will tell you which formats are worth building a pipeline around in your niche.',
      cta: { primary: bookCta, secondary: whatsappCta('the content marketer role') },
    },
  },

  /* ======================================================================
     6. Copywriter
  ====================================================================== */
  {
    slug: 'ai-copywriting',
    title: 'Your copywriter',
    description:
      'Landing pages, sales emails, case studies. Trained on your voice and the material you have already written, then rewritten against what actually converts.',
    features: ['Brand voice training', 'Landing page & website copy', 'Sales email sequences'],
    category: 'ai-copywriting',
    seo: {
      title: 'Your Copywriter',
      description:
        'Landing pages, sales emails, case studies — trained on your voice and the material you have already written, then rewritten against what actually converts.',
    },
    hero: {
      eyebrow: 'Copy · in your voice, at volume',
      headline: {
        lead: 'The page you have been meaning to rewrite',
        emphasis: 'for eight months',
      },
      sub: 'Landing pages, sales emails, case studies, product descriptions. All of it needs writing, none of it is urgent, and the person best placed to write it is the person with the least time.',
      cta: { primary: bookCta, secondary: whatsappCta('the copywriter role') },
      assurances: ['Trained on your material', 'Nothing publishes unread', '30 days of support'],
    },
    sections: [
      {
        kind: 'pillars',
        id: 'problem',
        eyebrow: 'When nobody has this job',
        title: 'Copy is the work that is always next week.',
        items: [
          {
            id: 'stale',
            title: 'Your site describes a business you no longer run',
            body: 'The offer moved, the pricing changed, the good case study never got written up. The page is a year behind and everybody knows it.',
          },
          {
            id: 'voice',
            title: 'Everything sounds like everyone',
            body: 'When copy gets outsourced piecemeal it drifts toward the category average — which is exactly the thing you were trying not to sound like.',
          },
          {
            id: 'volume',
            title: 'There is more of it than you think',
            body: 'Sequences, descriptions, a landing page per campaign, the follow-up email nobody wrote. It is a steady job, not a project.',
          },
        ],
      },
      {
        kind: 'checklist',
        id: 'included',
        title: 'What is in the job description:',
        items: [
          'Voice training on your existing material and your best-performing copy',
          'Landing page and full website copy',
          'Sales email sequences, including the follow-ups nobody gets around to',
          'Product descriptions at catalogue scale',
          'Case studies written up from your own project notes and call recordings',
          'Rewrites of what you already have, tested against what it is meant to do',
          'A review-and-approve loop, so nothing goes out unread',
        ],
      },
      {
        kind: 'steps',
        id: 'process',
        title: 'How you hire one',
        steps: [
          {
            step: '01',
            title: 'Bring what you already have',
            body: 'Your site, your best emails, the deck you actually use. The training is only as good as the material, and most businesses have more usable material than they think.',
          },
          {
            step: '02',
            title: 'We agree what good sounds like',
            body: 'Including what you would never say. Ruling things out is more useful here than ruling them in.',
          },
          {
            step: '03',
            title: 'First drafts, on the call',
            body: 'You see output against a real brief before you commit to anything, and you can tell us it is wrong while it is still cheap to fix.',
          },
          {
            step: '04',
            title: 'It keeps producing',
            body: 'To brief, in your voice, into a queue somebody signs off before it publishes.',
          },
        ],
      },
      {
        kind: 'pillars',
        id: 'limits',
        eyebrow: 'Limits',
        title: 'What is not in the job description.',
        items: [
          {
            id: 'positioning',
            title: 'It cannot fix your positioning',
            body: 'If you cannot say who this is for and why it beats the alternative, no amount of drafting rescues that. Vague in, vague out, faster.',
          },
          {
            id: 'facts',
            title: 'It does not know things you did not tell it',
            body: 'Claims, numbers and case study outcomes come from what you provide. It will not source a statistic for you, and it is instructed to flag rather than invent.',
          },
          {
            id: 'unread',
            title: 'Nothing should publish unread',
            body: 'The approval loop stays. Copy that goes out in your name without a person reading it is how a small error becomes a public one.',
          },
          {
            id: 'not-a-strategist',
            title: 'It is a writer, not a marketer',
            body: 'It writes what it is briefed to write, well. Deciding what should be written, and in what order, is still a person’s job — often ours on the call, but a person’s.',
          },
        ],
      },
    ],
    close: {
      eyebrow: 'Get started',
      title: 'Sound like yourself, faster.',
      sub: 'Bring the copy you already have. We will train on it and show you the first drafts on the call, before you commit to anything.',
      cta: { primary: bookCta, secondary: whatsappCta('the copywriter role') },
    },
  },

  /* ======================================================================
     7. The department
  ====================================================================== */
  {
    slug: 'ai-agent-team',
    title: 'The rest of the org chart',
    description:
      'Several of the above at once, built to hand work to each other rather than sit in separate tabs. A department, not a hire.',
    features: ['Defined roles per employee', 'Work handed between them', 'One place to watch it run'],
    category: 'ai-agent-team',
    seo: {
      title: 'The Rest Of The Org Chart',
      description:
        'Several roles at once, built to hand work to each other rather than sit in separate tabs. A department, not a hire.',
    },
    hero: {
      eyebrow: 'Several roles · one department',
      headline: {
        lead: 'Not one hire.',
        emphasis: 'A department',
      },
      sub: 'Roles that hand work to each other: the prospector passes to the setter, the setter passes to a person, the assistant files what happened. One place to watch it, one set of rules, one approval queue.',
      cta: { primary: bookCta, secondary: whatsappCta('building a whole department') },
      assurances: ['Roles you define', 'Handoffs between them', 'A human signs off'],
    },
    sections: [
      {
        kind: 'pillars',
        id: 'problem',
        eyebrow: 'Why one at a time stops working',
        title: 'Three good employees who never speak are three more tabs.',
        items: [
          {
            id: 'silos',
            title: 'The handoff is where work dies',
            body: 'A prospector that cannot pass to a setter just produces a list. The value was never in the individual role, it was in what happens between them.',
          },
          {
            id: 'context',
            title: 'Nobody has the whole picture',
            body: 'When each role keeps its own record, you end up asking three systems what happened to one customer and getting three answers.',
          },
          {
            id: 'oversight',
            title: 'You cannot supervise what you cannot see',
            body: 'Separate tools mean separate dashboards, separate rules and separate ways to be surprised. A department needs one place you look.',
          },
        ],
      },
      {
        kind: 'checklist',
        id: 'included',
        title: 'What is in the job description:',
        items: [
          'Roles scoped to how your business actually divides work, not to a template org chart',
          'Defined handoffs, so work moves between roles instead of stopping at the edge of one',
          'A shared record, so one customer has one history rather than three',
          'One set of rules about what may be said, promised and committed to',
          'An approval queue where a human signs off before anything leaves the building',
          'A dashboard showing what every role is working on right now',
          'Documentation and a walkthrough, so your team can run and change it',
        ],
      },
      {
        kind: 'steps',
        id: 'process',
        title: 'How you hire one',
        sub: 'Most departments start as an org chart sketched on a call.',
        steps: [
          {
            step: '01',
            title: 'Draw the org chart',
            body: 'Which roles, what each is accountable for, and where work passes from one to the next. This is the whole design and it takes about an hour.',
          },
          {
            step: '02',
            title: 'We build one role first',
            body: 'Never all of them at once. One goes live, you watch it for a fortnight, and what you learn changes how the next one gets built.',
          },
          {
            step: '03',
            title: 'We add the handoffs',
            body: 'The second role, then the join between them. This is the part that is actually difficult, and it is why the roles are not sold as a bundle on day one.',
          },
          {
            step: '04',
            title: 'One place to watch it',
            body: 'The dashboard, the approval queue and the shared record, plus a walkthrough of how to change the rules without us.',
          },
        ],
      },
      {
        kind: 'pillars',
        id: 'limits',
        eyebrow: 'Limits',
        title: 'What is not in the job description.',
        items: [
          {
            id: 'not-all-at-once',
            title: 'We will not build five of them at once',
            body: 'It is the fastest way to ship something nobody trusts. Roles go live one at a time, and if you need all five running next month we are the wrong people.',
          },
          {
            id: 'no-manager',
            title: 'It still needs a manager',
            body: 'Somebody on your side owns the approval queue and the rules. A department with no supervisor drifts, and this one drifts faster than a human one because it never gets tired of being wrong.',
          },
          {
            id: 'complexity',
            title: 'More roles means more to go wrong',
            body: 'Handoffs are where failures compound. Two roles that work is better than five that mostly do, and we will push back if the org chart you draw is bigger than the problem.',
          },
          {
            id: 'not-a-company',
            title: 'It does not run the business',
            body: 'It runs process. Judgment, relationships and anything that commits you stay with people, and the approval queue is where that boundary lives.',
          },
        ],
      },
    ],
    close: {
      eyebrow: 'Get started',
      title: 'Describe the roles. We will build the first one.',
      sub: 'Bring the org chart you would draw if headcount were not the constraint. We will tell you which role to start with, and why.',
      cta: { primary: bookCta, secondary: whatsappCta('building a whole department') },
    },
  },

  /* ======================================================================
     8. The job with no title
  ====================================================================== */
  {
    slug: 'custom-ai-solutions',
    title: 'The job that has no title yet',
    description:
      'Some of what a business does by hand does not map to a role anyone has named. Describe it and we will tell you whether it can be staffed this way.',
    features: ['Scoped on a call', 'Built to your process', 'Handed over working'],
    category: 'custom-ai-solutions',
    seo: {
      title: 'The Job That Has No Title Yet',
      description:
        'Some of what a business does by hand does not map to a role anyone has named. Describe it and we will tell you whether it can be staffed this way — including if the answer is no.',
    },
    hero: {
      eyebrow: 'The work that fits nowhere else',
      headline: {
        lead: 'Somebody does it every Friday.',
        emphasis: 'It has no name',
      },
      sub: 'The reconciliation, the report nobody asked for but everyone reads, the thing your operations manager does in a spreadsheet at 6pm. It is not reception and it is not prospecting, and it is often the most expensive hour in the week.',
      cta: { primary: bookCta, secondary: whatsappCta('a job that does not fit your other roles') },
      assurances: ['Scoped before it is quoted', 'Built to your process', 'You own it'],
    },
    sections: [
      {
        kind: 'pillars',
        id: 'problem',
        eyebrow: 'What this covers',
        title: 'Three shapes this usually takes.',
        items: [
          {
            id: 'ritual',
            title: 'The weekly ritual',
            body: 'Pulling numbers out of three systems into one sheet, every Friday, by somebody whose actual job is something else entirely.',
          },
          {
            id: 'bridge',
            title: 'The tools that do not talk',
            body: 'Two pieces of software you pay for that will not speak to each other, so a person is the integration. Usually the same person, usually by copy and paste.',
          },
          {
            id: 'half-built',
            title: 'The thing you already built',
            body: 'You or somebody on your team put an AI system together and it half works. Extending it, fixing it, or telling you honestly to scrap it is a job too.',
          },
        ],
      },
      {
        kind: 'checklist',
        id: 'included',
        title: 'What is in the job description:',
        items: [
          'A scoping session that ends in a written description of the job, before any quote',
          'Built around the process you actually run, not the one a tool assumes',
          'Bridging between tools that do not talk to each other',
          'Integration with, and extension of, AI systems you already have',
          'An architecture audit with an honest verdict on what to keep and what to bin',
          'Migration off anything costing more than it returns',
          'Documentation for everything we touch, including the parts we did not build',
          'Handed over working, and yours to run',
        ],
      },
      {
        kind: 'steps',
        id: 'process',
        title: 'How you hire one',
        steps: [
          {
            step: '01',
            title: 'Describe the Friday',
            body: 'Walk us through what somebody actually does, in order, including the bits they only do sometimes. Those are usually the ones that decide whether this is buildable.',
          },
          {
            step: '02',
            title: 'We tell you if it is a job',
            body: 'Some work resolves into something that can be staffed and some does not. You get that answer before a number — and sometimes the answer is that a person should keep doing it.',
          },
          {
            step: '03',
            title: 'A written scope, then a price',
            body: 'Fixed, against a description you have read and agreed. No open-ended discovery and no hourly drift.',
          },
          {
            step: '04',
            title: 'Built, tested, handed over',
            body: 'Working, documented, and running on your accounts, with 30 days of support from whoever built it.',
          },
        ],
      },
      {
        kind: 'pillars',
        id: 'limits',
        eyebrow: 'Limits',
        title: 'What is not in the job description.',
        items: [
          {
            id: 'not-everything',
            title: 'Not everything is a job',
            body: 'Work that changes shape every time, or that is really a series of judgment calls, does not staff well. We will tell you that at step two rather than take the scope and find out together.',
          },
          {
            id: 'garbage-in',
            title: 'It cannot fix your data',
            body: 'If the three systems disagree because nobody maintains them, automating the reconciliation makes the disagreement faster rather than smaller. Sometimes the real answer is a fortnight of cleanup first.',
          },
          {
            id: 'inherit',
            title: 'We may tell you to scrap what you built',
            body: 'The audit is honest or it is worthless. Occasionally the cheapest path is deleting something you paid for, and we would rather say that than bill you to keep it alive.',
          },
          {
            id: 'ongoing',
            title: 'A one-off build is a one-off build',
            body: 'When your process changes, what we built does not change with it. We will tell you which parts are likely to move and design for that, but this is a hire rather than a subscription to us.',
          },
        ],
      },
    ],
    close: {
      eyebrow: 'Get started',
      title: 'Describe the Friday afternoon.',
      sub: 'Bring the thing that fits nowhere else, or the system you already built that half works. We will tell you plainly whether it is worth staffing, extending, or scrapping.',
      cta: { primary: bookCta, secondary: whatsappCta('a job that does not fit your other roles') },
    },
  },
]

/** Slug lookup for the detail route. */
export function getService(slug: string | undefined): ServiceContent | undefined {
  return SERVICES.find((service) => service.slug === slug)
}
