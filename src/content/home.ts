import { BRAND } from './site'
import { RATINGS } from './testimonials'
import type { HomeContent } from './types'

/* ---------------------------------------------------------------------------
   The homepage, written around one question.

   "What would you make five employees do if they never slept, never resigned,
   and cost 80% less?"

   Two rules govern this file:

   1. The page sells a JOB, not a technology. Every heading below names work
      somebody currently does by hand, or fails to. The words "agent",
      "workflow" and "automation" are deliberately rare — the visitor does not
      have an agent-shaped problem, he has a nobody-called-the-lead-back
      problem.

   2. There is no roster. We do not name four colleagues Priya does not have.
      Priya is the one employee we have actually built and run, and she carries
      the proof for the whole page; everything else is described as work we
      build to order, in the language of a job description.

   The 80% is not asserted. It is shown as arithmetic in `payroll`, using the
   only real prices we have — Priya's — and the note under it says so.

   PLACEHOLDER, still: `proof.ratings`, `hero.video`, and `work.items`. See
   CONTENT-SWAP.md. Everything else on this page is now ours.
--------------------------------------------------------------------------- */

export const HOME: HomeContent = {
  seo: {
    title: 'AI Employees, Built To Your Job Description',
    description:
      'What would you make five employees do if they never slept, never resigned, and cost 80% less? Tell us the jobs. We build them, wire them into your tools, and hand them over working.',
  },

  hero: {
    eyebrow: 'Built to your job description',
    headline: {
      lead: 'What would you do with five people who never sleep, never quit, and cost',
      emphasis: '80% less',
      trail: '?',
    },
    sub: 'Answer that honestly and you have just described your next five hires. We build them as AI employees, wire them into the tools you already use, and hand them over working. Priya — the first one we built — calls every new lead inside sixty seconds, in Hindi, at 2am.',
    videoPrompt: 'Two minutes on how one gets built',
    video: {
      duration: '2:14',
      label: 'From job description to first shift',
    },
    cta: {
      primary: { label: 'Book a free hiring call', href: '#book' },
      secondary: { label: 'Meet Priya', href: '/priya' },
    },
  },

  proof: {
    note: 'Verified reviews across Google and Trustpilot',
    ratings: RATINGS,
  },

  /*
    The 80% claim, handed to the reader to check.

    An asserted ratio is worthless here — every competitor asserts one. So
    this takes his headcount, his salaries, the loading he knows he carries,
    and his lead volume, and computes the gap on his own numbers. If it comes
    out small, he should not buy from us, and `caveat` says so.

    The CrewMind side is driven by Priya's real published pricing rather than
    a number invented for this page.
  */
  payroll: {
    eyebrow: 'Run it on your own numbers',
    title: {
      lead: 'What does calling and chasing your leads',
      emphasis: 'already cost you',
      trail: '?',
    },
    sub: 'Not your whole sales floor — just the job of getting to every enquiry and staying on it. Put your real figures in. The gap either opens up or it does not, and both of those are worth knowing before you talk to us.',
    defaults: { people: 3, salary: 30000, loading: 40, leads: 600 },
    inputs: {
      people: 'People on calling and follow-up',
      salary: 'Salary each, per month',
      loading: 'On top of salary — incentives, management, hiring, training, leave, attrition',
      leads: 'Leads a month, all sources',
    },
    outputs: {
      human: 'What that job costs you now',
      crewmind: 'What it costs with an AI employee',
      gap: 'The difference, every month',
    },
    price: { base: 12000, includedLeads: 500, perExtraLead: 25 },
    resolve:
      'The percentage is whatever your own numbers make it. We are not going to put a universal ratio on a website and ask you to believe it.',
    caveat:
      'This prices one job: calling every lead and staying on it. It is not your sales floor and it does not pretend to be — an AI employee does not close, negotiate or do site visits, and your closers still do all of that. The loading figure is the part most people underestimate; 40% is conservative once you count the month a seat sits empty.',
    invite:
      'Every figure above starts as a guess about your business. Change them. If the gap closes on your real numbers, we would rather you found that out here than three months into an engagement.',
  },

  booking: {
    prompt: 'Step 2',
    title: 'Book your free hiring call',
    sub: "Bring one job — the one your team keeps dropping. We'll tell you whether it can be staffed this way, what it would take, and what it would cost. If the answer is that you don't need us, we'll say that instead. No deck, no pitch.",
  },

  services: {
    eyebrow: 'The jobs people hand over first',
    title: 'Seven roles. Pick your five.',
    sub: 'Each one is built around your business, wired into the tools you already run, and handed over working. Not a template, not a tutorial, not another login for someone to forget.',
    items: [
      {
        slug: 'ai-call-centers',
        title: 'Your receptionist',
        description:
          'Answers every call, at any hour, in the language it was made in. Books the appointment, takes the details, and never puts anyone on hold or lets it ring out.',
        features: ['Human-like voice', 'Live appointment booking', 'CRM syncing'],
      },
      {
        slug: 'lead-gen-outreach',
        title: 'Your prospector',
        description:
          'Finds the people who match your buyer, puts them in a live sheet you can watch fill up, and opens the conversation over email, LinkedIn and SMS.',
        features: ['ICP-based lead discovery', 'Live sheet feed', 'Email & LinkedIn outreach'],
      },
      {
        slug: 'ai-personal-assistants',
        title: 'Your executive assistant',
        description:
          'Runs the inbox, the calendar and the chasing — the four hours a day that sit between you and the work you are actually paid for.',
        features: ['Inbox & calendar management', 'Autonomous follow-up', 'CRM & tool integrations'],
      },
      {
        slug: 'social-media-automation',
        title: 'Your content marketer',
        description:
          'Posts every day in your brand voice, without a Sunday night scramble. Video, captions, and a calendar built around the algorithm instead of around guessing.',
        features: ['AI video generation', 'Content calendar & dashboard', 'Hook & retention engineering'],
        badge: 'New',
      },
      {
        slug: 'ai-copywriting',
        title: 'Your copywriter',
        description:
          'Landing pages, sales emails, case studies. Trained on your voice and the material you have already written, then rewritten against what actually converts.',
        features: ['Brand voice training', 'Landing page & website copy', 'Sales email sequences'],
      },
      {
        slug: 'geo',
        title: 'Your AI-search specialist',
        description:
          'Your buyers now ask ChatGPT and Perplexity who to use before they ask anyone else. This is the job of making sure the answer that comes back is you.',
        features: ['AI visibility audit', 'LLM optimisation', 'Competitive AI positioning'],
      },
      {
        slug: 'ai-agent-team',
        title: 'The rest of the org chart',
        description:
          'Several of the above at once, built to hand work to each other rather than sit in separate tabs. A department, not a hire.',
        features: ['Defined roles per employee', 'Work handed between them', 'One place to watch it run'],
      },
    ],
    enterprise: {
      eyebrow: 'Enterprise',
      badge: 'New',
      title: 'Need the whole department, on your own infrastructure?',
      body: 'We design and build from scratch for teams who cannot send their data anywhere — RAG pipelines, private model deployments, and multi-role systems that run inside your walls. Your infrastructure, your IP, no seat licences.',
      tags: ['RAG systems', 'Private LLMs', 'Multi-role systems', 'Open source', 'Full IP ownership'],
      cta: { label: 'Explore enterprise', href: '/enterprise' },
    },
  },

  positioning: {
    eyebrow: 'Tool, or worker',
    title: {
      lead: 'Most AI companies sell you a tool.',
      emphasis: 'We hand you a worker.',
    },
    sub: 'A tool sits there until somebody remembers to open it, which is why the last three you bought are still unused. A worker has a job, a shift, and one thing it is accountable for. That is the whole difference, and it is why this page talks about salaries instead of licences.',
  },

  process: {
    title: 'How you hire one',
    steps: [
      {
        step: '01',
        title: 'Write the job description',
        body: 'Not a spec — a job. What the person would do, when, and what "done" looks like. Fifteen minutes on a call is usually enough. These four are the ones we get asked for most, with the rough week each one takes off a team.',
        visual: {
          kind: 'timeSaved',
          rows: [
            { label: 'Calling new leads back', value: '10h/wk' },
            { label: 'Inbox and follow-up', value: '8h/wk' },
            { label: 'CRM and data entry', value: '6h/wk' },
            { label: 'Scheduling and reminders', value: '5h/wk' },
          ],
          total: 'About 29 hours a week that stop being anyone’s job',
        },
      },
      {
        step: '02',
        title: 'We build the employee',
        body: 'Your voice, your rules, your tools. It learns what it is allowed to say, what it must never invent, and who to hand a live conversation to. You do nothing during this part.',
        visual: {
          kind: 'flow',
          from: 'Your job description',
          nodes: ['Voice & script', 'Your tools', 'The rules'],
          to: 'On shift',
        },
      },
      {
        step: '03',
        title: 'First shift',
        body: 'Tested against real cases before it touches a real customer, then live. We walk your team through what it does, what it refuses to do, and how to take over a conversation halfway through.',
        visual: {
          kind: 'schedule',
          items: [
            { label: 'Hiring call', when: 'Day 1' },
            { label: 'Build', when: 'Day 2–4' },
            { label: 'Test runs', when: 'Day 5' },
            { label: 'First shift', when: 'Day 6' },
          ],
        },
      },
      {
        step: '04',
        title: 'It does not resign',
        body: 'No notice period, no handover, no retraining in month seven because somebody left. Thirty days of support on every build, and the person who built it answers you — not a ticket queue.',
        visual: {
          kind: 'stats',
          items: [
            { value: '24/7', label: 'On shift' },
            { value: '30d', label: 'Support included' },
            { value: '0', label: 'Days notice to stop' },
            { value: 'Yours', label: 'Recordings & data' },
          ],
        },
      },
    ],
  },

  work: {
    title: 'Roles we have already built',
    items: [
      {
        id: 'bizdev-setter',
        title: 'The setter',
        impact: 'Lead response time cut from hours to sixty seconds',
        tags: ['Sales', 'Lead response'],
        href: '/past-projects',
      },
      {
        id: 'sales-pipeline',
        title: 'The prospector',
        impact: 'Prospecting that ran overnight, with nobody sending outreach by hand',
        tags: ['Sales', 'Outreach'],
        href: '/past-projects',
      },
      {
        id: 'chief-of-staff',
        title: 'The chief of staff',
        impact: 'Inbox, calendar and outreach handled by two roles working together',
        tags: ['Executive support'],
        href: '/past-projects',
      },
      {
        id: 'reels-growth',
        title: 'The content marketer',
        impact: '85K+ followers from a posting pipeline nobody had to staff',
        tags: ['Marketing', 'Short-form video'],
        href: '/past-projects',
      },
      {
        id: 'marketing-team',
        title: 'The marketing department',
        impact: 'Six roles running across eight clients at once',
        tags: ['Multi-role', 'Agency'],
        href: '/past-projects',
      },
      {
        id: 'content-team',
        title: 'The content desk',
        impact: 'Brief to publication-ready draft in under twenty minutes',
        tags: ['Multi-role', 'Content'],
        href: '/past-projects',
      },
    ],
    cta: { label: 'See all of them', href: '/past-projects' },
  },

  close: {
    eyebrow: 'We keep the roster small on purpose',
    title: 'We only staff a handful of companies at a time.',
    sub: 'Not a scarcity tactic. Every employee we build is tuned to one company’s calls, tools and objections, and that work does not run in parallel. If you already know which job you would hand over first, book the call and describe it.',
    cta: {
      primary: { label: 'Book a free hiring call', href: '#book' },
      secondary: { label: 'Message us on WhatsApp', href: BRAND.whatsapp() },
    },
  },
}
