import { BRAND } from './site'

export interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
  items?: string[]
}

export interface LegalDocument {
  seo: { title: string; description: string }
  eyebrow: string
  title: string
  effectiveDate: string
  intro: string
  sections: LegalSection[]
}

const company = 'Antimatter Technologies Private Limited'
const contact = `${BRAND.email}; registered office: ${BRAND.legal?.addressLine ?? BRAND.address.join(', ')}`

export const PRIVACY_POLICY: LegalDocument = {
  seo: {
    title: 'Privacy Policy',
    description:
      'How Crewmind collects, uses, shares, retains and protects information submitted through this website and its demo experiences.',
  },
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  effectiveDate: '12 September 2026',
  intro: `${company} operates Crewmind. This notice explains what information we process when you use this website, book a meeting, message us, or request a product demonstration.`,
  sections: [
    {
      id: 'information-we-collect',
      title: 'Information we collect',
      paragraphs: [
        'We collect information you choose to provide, such as your name, mobile number, locality, property interest, business requirements, and the contents of messages you send us.',
        'If you request an automated call, the resulting operational record may include call status, timestamps, qualification details, a transcript, and a recording where recording is enabled and disclosed. Our hosting and security providers may also process technical logs such as IP address, browser information, request time, and error events.',
      ],
    },
    {
      id: 'how-we-use-information',
      title: 'How we use information',
      paragraphs: ['We use personal information only for the purpose explained when it is collected or for a compatible, lawful purpose.'],
      items: [
        'Provide the demo, meeting, reply, or service you requested.',
        'Operate, secure, troubleshoot, and improve the website and related workflows.',
        'Respect opt-outs, prevent repeated or abusive requests, and maintain an audit trail.',
        'Meet legal obligations and respond to valid legal requests.',
      ],
    },
    {
      id: 'demo-consent',
      title: 'Automated demo-call consent',
      paragraphs: [
        'The demo form asks for a clear affirmative confirmation before it can be submitted. By confirming and submitting, you ask Crewmind to use the supplied number and context to attempt one automated demonstration call. The number must belong to you or be under your control.',
        `You may withdraw that request before the call or opt out of further contact by emailing ${BRAND.email}, messaging us on WhatsApp, or saying that you do not want to be contacted during the call. Withdrawal does not affect processing already completed before we receive it.`,
      ],
    },
    {
      id: 'sharing',
      title: 'Who processes information for us',
      paragraphs: [
        'We share information only where needed to provide or secure the requested service. Providers used by the current website and demo path may include Vercel for hosting, Calendly for scheduling, WhatsApp when you choose to message us, and infrastructure providers such as n8n, Dograh, and Supabase for workflow, calling, and data storage.',
        'These providers process information under their own terms and may operate infrastructure outside India. We do not sell personal information or add a demo number to a marketing list merely because a demo was requested.',
      ],
    },
    {
      id: 'retention',
      title: 'Retention',
      paragraphs: [
        'We retain information only for as long as it is reasonably needed for the requested service, security, dispute resolution, recordkeeping, or a legal obligation. Retention can vary by record and provider. When information is no longer required, we delete or de-identify it where reasonably practicable.',
      ],
    },
    {
      id: 'browser-storage',
      title: 'Browser storage and third-party pages',
      paragraphs: [
        'The site stores your light or dark theme preference in your browser. It does not currently use advertising analytics or set marketing cookies itself. Google Fonts may receive a request when a page loads. Calendly is loaded only after you ask to open the embedded scheduler, and WhatsApp is opened only when you follow a WhatsApp link. Those providers may use their own cookies or similar technologies under their policies.',
      ],
    },
    {
      id: 'choices-and-rights',
      title: 'Your choices and rights',
      paragraphs: [
        `You may ask what personal information we hold about you, request correction or erasure, withdraw consent, or raise a grievance by contacting ${BRAND.email}. We may need enough information to verify that the request concerns you. Some information may be retained where required by law or needed to establish, exercise, or defend legal claims.`,
      ],
    },
    {
      id: 'security',
      title: 'Security',
      paragraphs: [
        'We use reasonable technical and organisational safeguards intended to protect personal information. No internet or storage system is completely secure, so we cannot promise absolute security.',
      ],
    },
    {
      id: 'children',
      title: 'Children',
      paragraphs: [
        'The website and demo are intended for adults acting for themselves or a business. Do not submit information about a child or request a demo call to a child’s number.',
      ],
    },
    {
      id: 'updates',
      title: 'Changes and contact',
      paragraphs: [
        `We may update this notice as the service changes. The effective date above identifies the current version. Questions, requests, and grievances can be sent to ${contact}.`,
        'For the official Indian data-protection framework, see the Digital Personal Data Protection Act, 2023 and rules published by the Ministry of Electronics and Information Technology.',
      ],
    },
  ],
}

export const TERMS_OF_SERVICE: LegalDocument = {
  seo: {
    title: 'Terms of Service',
    description:
      'Terms governing use of the Crewmind website, scheduling links, demonstrations and enquiries.',
  },
  eyebrow: 'Legal',
  title: 'Terms of Service',
  effectiveDate: '12 September 2026',
  intro: `These terms govern your use of the Crewmind website and demonstration experiences operated by ${company}. A paid engagement is governed by its own signed proposal or agreement.`,
  sections: [
    {
      id: 'using-the-site',
      title: 'Using this website',
      paragraphs: [
        'You may use the site to learn about Crewmind, review examples and blueprints, contact us, book a meeting, or request an available demonstration. You must provide accurate information and use only a phone number, account, and business information that you are authorised to use.',
      ],
    },
    {
      id: 'demo',
      title: 'Demo calls',
      paragraphs: [
        'A demo request authorises an automated demonstration call to the number you submit. A request may be refused, delayed, or unavailable because of operating hours, safety controls, capacity, suppression rules, technical failures, or product maintenance.',
        'A demo is not an emergency service, a guaranteed call connection, a confirmed booking, professional advice, or evidence that every described integration is active in your environment.',
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      paragraphs: ['You must not misuse the website or demonstration. In particular, you must not:'],
      items: [
        'Submit another person’s number without their knowledge and authority.',
        'Attempt to bypass rate limits, opt-outs, access controls, or security measures.',
        'Use the service for unlawful, deceptive, abusive, harassing, or unsolicited contact.',
        'Interfere with the site, probe it without authorisation, or introduce malicious code.',
      ],
    },
    {
      id: 'services-and-pricing',
      title: 'Services, proposals, and pricing',
      paragraphs: [
        'Website descriptions explain possible scopes, not a binding offer or delivery promise. Availability, scope, fees, ownership, support, service levels, timelines, dependencies, and acceptance criteria are agreed only in a written proposal or agreement signed by the relevant parties.',
        'Unless a page expressly says otherwise, examples, diagrams, blueprints, and public references illustrate an approach or capability. They do not by themselves establish a client relationship, deployment, result, endorsement, or guarantee.',
      ],
    },
    {
      id: 'third-parties',
      title: 'Third-party services',
      paragraphs: [
        'The site may link to or use services operated by third parties, including scheduling, messaging, hosting, and communications providers. Their terms and privacy practices apply when you choose to use them. We are not responsible for third-party services outside our control.',
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual property',
      paragraphs: [
        'Crewmind’s website content, visual design, and original materials are owned by or licensed to us. You may view and share links to the public site, but you may not copy, resell, or present our materials as your own. Ownership of deliverables from a paid engagement is determined by its signed agreement.',
      ],
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers',
      paragraphs: [
        'The public website and free demonstrations are provided on an “as available” basis. To the extent permitted by law, we disclaim implied warranties for those public surfaces. AI output can be incomplete or wrong and must be reviewed by an appropriate person before any high-impact action.',
      ],
    },
    {
      id: 'liability',
      title: 'Liability',
      paragraphs: [
        'Nothing in these terms excludes liability that cannot lawfully be excluded. To the extent permitted by law, we are not liable for indirect, incidental, special, or consequential loss arising solely from use of the public website or a free demonstration. Any liability relating to paid services is governed by the applicable signed agreement.',
      ],
    },
    {
      id: 'changes-and-law',
      title: 'Changes, suspension, and governing law',
      paragraphs: [
        'We may change or suspend the public site or a demonstration to protect users, comply with law, or maintain the service. We may update these terms; the effective date identifies the current version.',
        `These terms are governed by the laws of India. The competent courts and dispute process are determined by applicable law and, for paid work, the signed agreement. Questions can be sent to ${contact}.`,
      ],
    },
  ],
}
