import type { EnterpriseContent } from './types'
import { BRAND } from './site'

/* ---------------------------------------------------------------------------
   PLACEHOLDER CONTENT — see CONTENT-SWAP.md
   Transcribed from docs/reference/autoploy-enterprise.md.

   TWO DELIBERATE DEPARTURES:

   1. Case studies. The reference names a real client and links its real
      deliverables. Claiming another agency's named client as our own is not
      something to ship even as placeholder. The engagements below keep every
      structural detail — sector, scale, challenge, solution, stack — with the
      client de-identified and the outbound links removed.

   2. FAQ answers. The reference renders its accordion panels only on expand,
      so the answer text is absent from the served markup and there was
      nothing to transcribe. These five answers are written fresh against the
      reference's five verbatim questions.
--------------------------------------------------------------------------- */

export const ENTERPRISE: EnterpriseContent = {
  seo: {
    title: 'Enterprise AI Solutions',
    description:
      'We partner with enterprise teams to design, build, and deploy fully custom AI infrastructure — RAG systems, agents, private LLM deployments — on open source foundations you own and control.',
  },

  hero: {
    eyebrow: 'Enterprise AI Solutions',
    headline: {
      lead: 'Custom AI systems built for',
      emphasis: 'enterprise scale',
    },
    sub: 'We partner with enterprise teams to design, build, and deploy fully custom AI infrastructure, from RAG knowledge systems to autonomous agents, using open source foundations you own and control.',
    cta: {
      primary: { label: 'Book a scoping call', href: BRAND.calendly },
      secondary: {
        label: 'Message Us on WhatsApp',
        href: BRAND.whatsapp("Hello, I'd like to discuss an enterprise engagement."),
      },
    },
    assurances: [
      'Private deployment on your infrastructure',
      'You own all IP and source code',
      'No vendor lock-in',
    ],
  },

  why: {
    eyebrow: 'Why custom',
    title: "Off-the-shelf AI tools weren't built for your business.",
    sub: 'Generic SaaS AI products are designed for the average case. Enterprise workflows, data governance requirements, and security standards demand something built specifically for you.',
    items: [
      {
        id: 'security',
        title: 'Security & compliance by design',
        body: 'Your data stays on your infrastructure. We build with your security policies, access controls, and compliance requirements as constraints, not afterthoughts.',
      },
      {
        id: 'lock-in',
        title: 'No vendor lock-in',
        body: "Everything we build runs on open source foundations. If you ever want to move, extend, or rebuild, your team can. You're never hostage to a pricing change or a product shutdown.",
      },
      {
        id: 'ip',
        title: 'Full IP ownership',
        body: 'Every line of code, every trained model, every pipeline we build belongs to you. We hand over the full codebase, documentation, and deployment configs at project close.',
      },
    ],
  },

  capabilities: {
    eyebrow: 'What we build',
    title: 'Six capabilities, all custom.',
    sub: "We don't adapt templates. Every system is designed from scratch to fit how your team actually works, what data you have, and what outcomes you need.",
    items: [
      {
        id: 'rag',
        title: 'RAG Knowledge Systems',
        body: 'AI that answers from your internal documents, databases, and policies, with citations, grounded retrieval, and role-based access control.',
        stack: ['LlamaIndex', 'ChromaDB', 'pgvector', 'Weaviate'],
      },
      {
        id: 'agents',
        title: 'AI Agents & Copilots',
        body: 'Autonomous agents that complete multi-step tasks, call your APIs, and operate inside your existing tools — Slack, Teams, your internal portals.',
        stack: ['LangChain', 'CrewAI', 'AutoGen', 'Custom orchestration'],
      },
      {
        id: 'workflow',
        title: 'Workflow Automation',
        body: 'End-to-end process automation that connects your systems, handles exceptions, and routes decisions, without anyone doing it manually.',
        stack: ['n8n', 'Apache Airflow', 'Custom pipelines'],
      },
      {
        id: 'private-llm',
        title: 'Private LLM Deployments',
        body: 'Self-hosted language models running on your servers or private cloud. Full control, no data leaving your environment, model fine-tuned on your domain.',
        stack: ['Ollama', 'vLLM', 'HuggingFace', 'Fine-tuning'],
      },
      {
        id: 'integration',
        title: 'Integration & API Layers',
        body: 'Custom connectors that wire your AI systems into your CRM, ERP, HRIS, and internal tools so the intelligence reaches where decisions happen.',
        stack: ['REST APIs', 'Webhooks', 'CRM', 'ERP'],
      },
      {
        id: 'data',
        title: 'Data Pipelines & Vector Infrastructure',
        body: 'Ingestion, embedding, chunking, and retrieval pipelines built for scale, so your AI always works from fresh, structured, and queryable data.',
        stack: ['PostgreSQL', 'ETL', 'Vector stores', 'Embeddings'],
      },
    ],
  },

  stack: {
    eyebrow: 'Open source foundation',
    title: 'Built on tools your team can audit, extend, and own.',
    sub: 'We work across the full open source AI stack. The specific tools we choose depend on your infrastructure, data, and scale requirements.',
    items: [
      'LangChain',
      'LlamaIndex',
      'Ollama',
      'ChromaDB',
      'n8n',
      'Weaviate',
      'pgvector',
      'HuggingFace',
      'vLLM',
      'CrewAI',
      'Anthropic Claude',
      'OpenAI APIs',
    ],
    note: "We select the right tool for each project. We don't lock you into a single vendor or framework.",
  },

  process: {
    eyebrow: 'How it works',
    title: 'From first call to live system.',
    sub: 'We keep the process direct. No six-week discovery sprints, no strategy decks. You get a working system, not a roadmap.',
    steps: [
      {
        step: '01',
        title: 'Discovery',
        body: 'We get on a call and map your workflows, data landscape, and what outcomes you actually need the system to deliver.',
      },
      {
        step: '02',
        title: 'Architecture',
        body: 'We design the system — tech stack, data flow, integration points, access model — and walk you through it before a line of code is written.',
      },
      {
        step: '03',
        title: 'Build & Test',
        body: 'We build, integrate, and test against real scenarios with your team. You see the system working before we close the project.',
      },
      {
        step: '04',
        title: 'Handover',
        body: 'Full deployment on your infrastructure, documentation, and a handover session so your team understands and can operate what we built.',
      },
      {
        step: '05',
        title: 'Support & Maintenance',
        body: 'Ongoing support after launch. We monitor performance, apply updates, and fold your feedback back in so the system keeps improving.',
      },
    ],
  },

  cases: {
    eyebrow: 'Enterprise Case Studies',
    title: "Real enterprise systems we've built",
    sub: 'Full-scale deployments for regulated industries. Details are shared under NDA; below is what we can disclose.',
    items: [
      {
        id: 'insurer-campaigns',
        meta: 'Health Insurance · Latin America',
        title: 'Enterprise Email Marketing Automation',
        stackLine: 'Multi-agent system · HubSpot CRM · Custom campaign pipeline',
        metric: { value: 'Enterprise', label: 'Multi-agent deployment' },
        challenge:
          'The insurer’s marketing team was manually managing segmented email campaigns across thousands of policyholders and prospects. Campaign creation, A/B testing, send-time optimisation, and performance analysis were all done by hand, creating bottlenecks that slowed go-to-market and led to inconsistent messaging across customer segments.',
        solution:
          "Deployed an enterprise agent system integrated with HubSpot CRM. A Campaign Strategist agent segments the audience by profile, policy type, and engagement history, then generates personalised campaign briefs. A Copywriter agent produces email sequences in the client's brand voice, localised for the market. A Performance Analyst agent monitors open rates, CTR, and conversions, then feeds learnings back into the next cycle so the system improves with every send. Full audit trail, with human approval at each campaign launch.",
        tags: [
          'Multi-Agent',
          'HubSpot CRM',
          'Email Automation',
          'Campaign Personalisation',
        ],
      },
      {
        id: 'sales-agent-stack',
        meta: 'Regulated Services · 30 Advisors',
        title: 'AI Sales Agent: Agentic Orchestration & Security Stack',
        stackLine:
          'n8n · LangGraph · Claude Enterprise · 5-layer architecture · 7-layer security',
        metric: { value: '12 weeks', label: 'Implementation window' },
        challenge:
          'A commercial sales force of 30 advisors in a regulated industry faced three structural bottlenecks: low conversion from digital leads due to slow manual response, generic quotations that failed to resonate with individual prospect profiles, and limited follow-up productivity from manual CRM work. Sensitive end-user data had to remain entirely within the client perimeter at all times.',
        solution:
          'Built a three-function AI Sales Agent on a five-layer architecture. Lead Intelligence scrapes and scores prospects, generating a tailored sales argument per lead before the advisor engages. A 24/7 Conversion Agent responds to inbound WhatsApp and web form leads instantly, qualifies them, and books advisor calls via HubSpot. Offer Hyper-Personalisation generates a bespoke quotation and unique landing page per prospect from enriched profile data. The security stack adds a WAF, container isolation per agent, automatic PII tokenisation before any data reaches an orchestrator, immutable audit logging, and zero-retention model contracts, meeting ISO 27001 and local data protection regulation.',
        tags: [
          'n8n',
          'LangGraph',
          'Claude Enterprise',
          'HubSpot',
          'WhatsApp API',
          'PII Tokenisation',
          'ISO 27001',
        ],
      },
    ],
  },

  ownership: {
    title: "Everything you need. Nothing you don't.",
    sub: 'Every engagement is scoped around your actual problem, not a package with features you will never use.',
    items: [
      {
        id: 'source',
        title: 'You own the source code',
        body: 'We hand over the full repository. Your team can read, modify, and extend every part of what we built. No black boxes.',
      },
      {
        id: 'infra',
        title: 'Deployed on your infrastructure',
        body: 'On your cloud account, your servers, or on-premise. Your data never passes through our systems or any third-party SaaS.',
      },
      {
        id: 'fees',
        title: 'No ongoing fees to us',
        body: 'We charge for the build, not for existence. Once delivered, you run it. No monthly fees, no usage caps, no surprise invoices.',
      },
    ],
  },

  faq: {
    title: 'Common questions',
    items: [
      {
        id: 'vs-consultant',
        question: 'What makes this different from hiring an AI consultant?',
        answer:
          'A consultant usually leaves you with a strategy document and a recommendation. We leave you with a running system, its source code, and the deployment configs to rebuild it. The engagement ends when something works in your environment, not when the deck is delivered.',
      },
      {
        id: 'timeline',
        question: 'How long does a typical enterprise engagement take?',
        answer:
          'Most land between six and twelve weeks from first call to handover, depending on how many systems we have to integrate with and how long access approvals take on your side. Architecture is agreed in the first two weeks, so you know the shape of the build before the bulk of the cost is committed.',
      },
      {
        id: 'data-readiness',
        question: 'Do we need to have our data ready before starting?',
        answer:
          'No. Data is almost never ready, and waiting until it is has sunk more AI projects than any technical problem. Ingestion, cleaning, chunking, and embedding are part of the build — we scope that work explicitly in the proposal rather than assuming a tidy corpus.',
      },
      {
        id: 'internal-team',
        question: 'Can you work with our internal engineering team?',
        answer:
          'Yes, and it usually produces a better result. We can work alongside your engineers in shared repositories, review their code and have them review ours, and run the handover as a working session rather than a document drop.',
      },
      {
        id: 'after-delivery',
        question: 'What happens after the project is delivered?',
        answer:
          'The system is yours and runs on your infrastructure, so nothing depends on us staying. We include a support window after launch to monitor performance and fix anything that surfaces under real load. Beyond that, a retainer is available if you want us maintaining and extending it, but it is optional.',
      },
    ],
  },

  close: {
    eyebrow: 'Next step',
    title: 'Ready to build your AI system?',
    sub: "Book a strategy call and we'll scope your project in the first session.",
    cta: {
      primary: { label: 'Book a scoping call', href: BRAND.calendly },
      secondary: {
        label: 'Message Us on WhatsApp',
        href: BRAND.whatsapp("Hello, I'd like to discuss an enterprise engagement."),
      },
    },
  },
}
