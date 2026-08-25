import type { AboutContent } from './types'
import { BRAND } from './site'

/* ---------------------------------------------------------------------------
   PLACEHOLDER CONTENT — see CONTENT-SWAP.md
   Transcribed from docs/reference/autoploy-about.md.

   ONE DELIBERATE DEPARTURE: the reference's team section names seven real
   people and links their real LinkedIn profiles. Copying those verbatim would
   stage real individuals as this company's staff, which is not a thing to
   ship even as placeholder text. The *structure* is preserved exactly —
   seven members, same role mix, same bio length — with invented names and no
   outbound profile links. Replace wholesale with the real team.
--------------------------------------------------------------------------- */

export const ABOUT: AboutContent = {
  seo: {
    title: 'Meet the Team',
    description:
      'The people who build the employees. We design, build and hand over AI staff that do a named job inside the business you already run.',
  },

  hero: {
    eyebrow: 'About us',
    headline: {
      lead: 'The people who build',
      emphasis: 'the employees',
    },
    sub: 'We build AI staff for companies that need a job covered and cannot justify another head to cover it. One role at a time, built to your business, handed over working.',
  },

  team: {
    title: 'Meet the Team',
    sub: `The people behind ${BRAND.name}.`,
    note: 'Founded in late 2025',
    members: [
      {
        id: 'founder-ceo',
        name: 'Placeholder One',
        role: 'Co-Founder & CEO',
        bio: 'Entrepreneur obsessed with AI who has built hundreds of automation workflows across a dozen industries.',
        initials: 'P1',
        links: [],
      },
      {
        id: 'founder',
        name: 'Placeholder Two',
        role: 'Co-Founder',
        bio: 'Entrepreneur who has shipped multiple AI apps and SaaS products over the last four years.',
        initials: 'P2',
        links: [],
      },
      {
        id: 'senior-eng-1',
        name: 'Placeholder Three',
        role: 'Senior Developer',
        bio: 'Brings enterprise-grade engineering rigour to every AI system we ship, from architecture review through to handover.',
        initials: 'P3',
        links: [],
      },
      {
        id: 'senior-eng-2',
        name: 'Placeholder Four',
        role: 'Senior Developer',
        bio: 'Designs and ships robust AI systems and automation pipelines for clients across industries.',
        initials: 'P4',
        links: [],
      },
      {
        id: 'pm',
        name: 'Placeholder Five',
        role: 'Project Manager / Lead of Client Relations',
        bio: 'Leads client relations and project management, making sure every engagement runs smoothly from kickoff to delivery.',
        initials: 'P5',
        links: [],
      },
      {
        id: 'senior-eng-3',
        name: 'Placeholder Six',
        role: 'Senior Developer',
        bio: 'Builds and ships production-ready AI systems, with a focus on retrieval and evaluation.',
        initials: 'P6',
        links: [],
      },
      {
        id: 'senior-eng-4',
        name: 'Placeholder Seven',
        role: 'Senior Developer',
        bio: 'Works across the engineering team building and delivering production-ready AI systems.',
        initials: 'P7',
        links: [],
      },
    ],
  },

  story: {
    title: 'Why we started',
    paragraphs: [
      `Every business we talked to had the same shape of problem, and none of them described it as an AI problem. They described it as a person problem: nobody called the lead back, nobody chased the invoice, nobody answered the phone after seven. The work was not hard. It just needed somebody there, and there was nobody to spare.`,
      `Hiring for it rarely works. One head covers eight hours of a job that runs for twenty-four, costs more than the work is worth at that volume, and leaves within the year — taking everything they learned with them.`,
      `So ${BRAND.name} builds the other kind of employee. It does one named job, it works the hours nobody wants, it does not resign, and when it gets something wrong you can go and listen to the recording. That is the whole company.`,
    ],
  },

  pillars: {
    eyebrow: 'What we stand on',
    title: 'Three things we hold every engagement to.',
    items: [
      {
        id: 'named-job',
        title: 'A named job, or nothing',
        body: 'We do not sell capability. We build one role, with a description you could hand to a person, and we can tell you at any point whether it is doing that job or not. If a request does not resolve into a job, we say so instead of scoping it.',
      },
      {
        id: 'limits-first',
        title: 'The limits, before the price',
        body: 'Every employee we build has things it is bad at, and you will read them on our website before you read a number. Anyone who tells you their AI never misunderstands has not run enough calls through one.',
      },
      {
        id: 'turn-away',
        title: 'We will talk you out of it',
        body: 'Below a certain volume, a person genuinely can do the job and this is not worth your money. We would rather say that on the first call than take a setup fee and have you find out in month two.',
      },
    ],
  },

  close: {
    eyebrow: 'Work with us',
    title: 'Tell us what your team keeps doing by hand.',
    sub: "Bring the job that eats your week — the one somebody is doing at eleven at night. We'll tell you on the call whether it can be staffed this way, and say so plainly if it can't.",
    cta: {
      primary: { label: 'Book a free hiring call', href: BRAND.calendly },
      secondary: { label: 'See our work', href: '/past-projects' },
    },
  },
}
