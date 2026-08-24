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
      'The people behind the systems. We design, build, and deploy AI automation that fits the way your business already works.',
  },

  hero: {
    eyebrow: 'About Us',
    headline: {
      lead: 'Building smarter businesses,',
      emphasis: 'one system at a time',
    },
    sub: 'We help ambitious companies operate more efficiently by designing, building, and deploying AI-powered automation that fits the way they already work.',
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
      `Founded in late 2025, ${BRAND.name} was built on a straightforward belief: the best AI tools shouldn't be locked behind enterprise budgets and six-month consulting engagements.`,
      'We saw businesses of all sizes, from growing startups to established companies, spending too much time on manual processes that could be automated. Meanwhile, AI was advancing faster than most teams could keep up with.',
      `So we built ${BRAND.name} to bridge that gap, giving companies the AI infrastructure they need to work smarter, move faster, and focus on what actually grows the business.`,
    ],
  },

  pillars: {
    eyebrow: 'What we stand on',
    title: 'Three commitments we hold every engagement to.',
    items: [
      {
        id: 'mission',
        title: 'Our Mission',
        body: 'To make powerful AI automation accessible to every ambitious business, helping them eliminate inefficiencies, scale operations, and compete at the highest level.',
      },
      {
        id: 'vision',
        title: 'Our Vision',
        body: 'A world where every business, regardless of size, has access to AI systems that let their teams focus on strategy, creativity, and growth instead of repetitive tasks.',
      },
      {
        id: 'approach',
        title: 'Our Approach',
        body: 'We listen first, build second. Every solution is tailored to your specific workflows, integrated with your existing tools, and designed to deliver measurable ROI from day one.',
      },
    ],
  },

  close: {
    eyebrow: 'Work with us',
    title: 'Tell us what your team keeps doing by hand.',
    sub: "Bring the process that eats your week. We'll tell you on the call whether it's worth automating — and say so if it isn't.",
    cta: {
      primary: { label: 'Book a Free Discovery Call', href: BRAND.calendly },
      secondary: { label: 'See our work', href: '/past-projects' },
    },
  },
}
