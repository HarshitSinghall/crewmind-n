import type { AboutContent } from './types'
import { BRAND } from './site'

/* Public company copy. No invented people, history, scale, or client claims. */

export const ABOUT: AboutContent = {
  seo: {
    title: 'About Crewmind',
    description:
      'How Crewmind approaches governed AI voice and workflow systems for real-estate teams.',
  },

  hero: {
    eyebrow: 'About Us',
    headline: {
      lead: 'Automation should make responsibility',
      emphasis: 'clearer, not harder to find',
    },
    sub: 'Crewmind designs operational AI around explicit permissions, observable outcomes, and a named human owner for the decisions that matter.',
  },

  team: {
    title: 'Meet the team',
    sub: `The people leading ${BRAND.name}.`,
    note: 'Leadership',
    members: [
      {
        id: 'raghuraj',
        name: 'Raghuraj',
        role: 'Co-Founder',
        bio: `Raghuraj serves as Co-Founder at ${BRAND.name}.`,
        initials: 'RG',
        avatar: '/team/raghuraj.webp',
        links: [],
      },
      {
        id: 'harshit',
        name: 'Harshit',
        role: 'Founder',
        bio: `Harshit serves as Founder at ${BRAND.name}.`,
        initials: 'HS',
        avatar: '/team/harshit-singhal.webp',
        links: [],
      },
      {
        id: 'yash',
        name: 'Yash',
        role: 'Sales Head',
        bio: `Yash serves as Sales Head at ${BRAND.name}.`,
        initials: 'YS',
        avatar: '/team/yash.webp',
        links: [],
      },
    ],
  },

  story: {
    title: 'Why we work this way',
    paragraphs: [
      'A property enquiry crosses several boundaries quickly: lead source, consent, voice provider, qualification, follow-up, and the person accountable for the next action. A fast response is useful only when those boundaries remain intact.',
      'That is why we treat prompts and conversation design as one part of a larger operating system. Identity, opt-outs, failure handling, audit records, and human handoff are designed alongside the customer experience.',
      `${BRAND.name} starts with one real workflow and a measurable baseline. We separate what is implemented from what is proposed, and we do not treat a successful demo as production evidence.`,
    ],
  },

  pillars: {
    eyebrow: 'What we stand on',
    title: 'Three commitments we hold every engagement to.',
    items: [
      {
        id: 'mission',
        title: 'Our Mission',
        body: 'Help real-estate teams respond to authorised enquiries quickly while preserving consent, evidence, and human accountability.',
      },
      {
        id: 'vision',
        title: 'Our Vision',
        body: 'Operational AI that teams can inspect, interrupt, improve, and trust only to the degree the evidence supports.',
      },
      {
        id: 'approach',
        title: 'Our Approach',
        body: 'Map the workflow, define the boundaries, build the smallest coherent path, test representative failures, and hand over the operating knowledge.',
      },
    ],
  },

  close: {
    eyebrow: 'Work with us',
    title: 'Tell us what your team keeps doing by hand.',
    sub: "Bring the process that eats your week. We'll tell you on the call whether it's worth automating — and say so if it isn't.",
    cta: {
      primary: { label: 'Book a Discovery Call', href: BRAND.calendly },
      secondary: { label: 'See our work', href: '/past-projects' },
    },
  },
}
