import type { EnterpriseContent } from './types'
import { BRAND } from './site'

/*
 * Public enterprise capability copy. The existing case-study block is left
 * unchanged by explicit instruction and must be reviewed separately before launch.
 */

export const ENTERPRISE: EnterpriseContent = {
  seo: {
    title: 'Enterprise AI Solutions',
    description:
      'Crewmind scopes AI architecture, retrieval, agents, and workflow integration around an organisation’s existing controls, infrastructure, and operating owners.',
  },

  hero: {
    eyebrow: 'Enterprise AI Solutions',
    headline: {
      lead: 'Design AI systems around',
      emphasis: 'the controls you already need',
    },
    sub: 'We can work with product, engineering, security, and operations owners to define a bounded architecture. Deployment, ownership, support, and acceptance terms are agreed in writing for each engagement.',
    cta: {
      primary: { label: 'Book a Strategy Call', href: BRAND.calendly },
      secondary: {
        label: 'Message Us on WhatsApp',
        href: BRAND.whatsapp("Hello, I'd like to discuss an enterprise engagement."),
      },
    },
    assurances: [
      'Deployment model agreed in scope',
      'Identity and data boundaries documented',
      'Release criteria defined before launch',
    ],
  },

  why: {
    eyebrow: 'Why custom',
    title: 'The model is only one part of the operating system.',
    sub: 'Enterprise usefulness depends on identity, data access, integration contracts, evaluation, failure handling, and the people responsible for exceptions.',
    items: [
      {
        id: 'security',
        title: 'Security constraints first',
        body: 'We identify sensitive data, trusted identities, permitted actions, audit requirements, and deployment boundaries during architecture work.',
      },
      {
        id: 'lock-in',
        title: 'Dependencies made visible',
        body: 'The architecture names model, hosting, data, and integration dependencies so the organisation can evaluate cost, portability, and operational risk.',
      },
      {
        id: 'ip',
        title: 'Ownership agreed in writing',
        body: 'Source, configuration, customer materials, third-party components, and handover obligations are separated and defined in the signed agreement.',
      },
    ],
  },

  capabilities: {
    eyebrow: 'What we build',
    title: 'Six capability areas that can be combined.',
    sub: 'The final system should include only the capabilities needed for the agreed workflow and risk boundary.',
    items: [
      {
        id: 'rag',
        title: 'RAG Knowledge Systems',
        body: 'Retrieve from approved documents, databases, and policies with citations, access checks, abstention, and feedback paths.',
        stack: ['LlamaIndex', 'ChromaDB', 'pgvector', 'Weaviate'],
      },
      {
        id: 'agents',
        title: 'AI Agents & Copilots',
        body: 'Bounded agents that prepare or complete agreed tasks through explicitly permitted tools and escalation rules.',
        stack: ['LangChain', 'CrewAI', 'AutoGen', 'Custom orchestration'],
      },
      {
        id: 'workflow',
        title: 'Workflow Automation',
        body: 'Process orchestration that connects approved systems, validates inputs, records state, and routes exceptions to a named owner.',
        stack: ['n8n', 'Apache Airflow', 'Custom pipelines'],
      },
      {
        id: 'private-llm',
        title: 'Private LLM Deployments',
        body: 'Where appropriate, evaluate self-hosted or private-cloud model options against security, capability, cost, and operating requirements.',
        stack: ['Ollama', 'vLLM', 'HuggingFace', 'Fine-tuning'],
      },
      {
        id: 'integration',
        title: 'Integration & API Layers',
        body: 'Documented connectors that authenticate correctly, validate contracts, minimise data, and fail without inventing success.',
        stack: ['REST APIs', 'Webhooks', 'CRM', 'ERP'],
      },
      {
        id: 'data',
        title: 'Data Pipelines & Vector Infrastructure',
        body: 'Ingestion, transformation, embedding, retrieval, freshness, and deletion paths designed around the source and its access model.',
        stack: ['PostgreSQL', 'ETL', 'Vector stores', 'Embeddings'],
      },
    ],
  },

  stack: {
    eyebrow: 'Technology choices',
    title: 'Choose the stack after the operating constraints.',
    sub: 'The tools below are examples of technologies we can evaluate. Listing them does not imply a partnership, required stack, or fit for every environment.',
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
    note: 'The proposed architecture records why each dependency is selected, what data it handles, and how it can be replaced or operated.',
  },

  process: {
    eyebrow: 'How it works',
    title: 'From current state to an approved release.',
    sub: 'Timing and deliverables depend on the environment. Each phase should produce reviewable evidence before the next commitment.',
    steps: [
      {
        step: '01',
        title: 'Discovery',
        body: 'Map the current workflow, data, owners, controls, exceptions, and measurable outcome.',
      },
      {
        step: '02',
        title: 'Architecture',
        body: 'Define trusted identity, data flow, integration contracts, permissions, failure states, and deployment options.',
      },
      {
        step: '03',
        title: 'Build & Test',
        body: 'Build the smallest coherent path and test representative success, rejection, timeout, duplicate, and recovery cases with authorised fixtures.',
      },
      {
        step: '04',
        title: 'Handover',
        body: 'Release only after the agreed gate, then provide the versioned source and operating documentation defined in the agreement.',
      },
      {
        step: '05',
        title: 'Operate & Improve',
        body: 'Assign monitoring, incident, review, retention, and change owners. Any ongoing support scope is agreed separately.',
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
    title: 'Make the operating model explicit.',
    sub: 'Ownership, deployment, support, and dependencies are commercial and technical decisions recorded in the agreement.',
    items: [
      {
        id: 'source',
        title: 'Source and IP terms',
        body: 'The agreement identifies customer materials, custom deliverables, third-party components, licences, repositories, and handover obligations.',
      },
      {
        id: 'infra',
        title: 'Deployment responsibility',
        body: 'Customer cloud, managed hosting, or another model can be evaluated. The selected boundary and each provider’s data role are documented before deployment.',
      },
      {
        id: 'fees',
        title: 'Operating costs',
        body: 'Model, telephony, hosting, storage, support, and maintenance costs are identified during scoping. No universal fee claim is made on this page.',
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
          'We can scope implementation and handover as part of the engagement, but the exact deliverables are defined in the proposal. The important distinction is whether the work has observable acceptance criteria and an operating owner.',
      },
      {
        id: 'timeline',
        question: 'How long does a typical enterprise engagement take?',
        answer:
          'There is no responsible universal timeline. It depends on integration access, data readiness, security review, workflow complexity, testing evidence, and customer decisions. The proposal sets phases and dependencies after discovery.',
      },
      {
        id: 'data-readiness',
        question: 'Do we need to have our data ready before starting?',
        answer:
          'Not necessarily. Discovery should identify data ownership, quality, permissions, retention, and missing sources. Any preparation work is then named rather than assumed.',
      },
      {
        id: 'internal-team',
        question: 'Can you work with our internal engineering team?',
        answer:
          'That collaboration model can be included when repository access, review responsibility, development environments, and approval boundaries are agreed by both teams.',
      },
      {
        id: 'after-delivery',
        question: 'What happens after the project is delivered?',
        answer:
          'The agreement should name who monitors the system, handles incidents, approves changes, maintains integrations, and reviews quality after release. Any support or maintenance period is part of that written scope.',
      },
    ],
  },

  close: {
    eyebrow: 'Next step',
    title: 'Start with the boundary that is hardest to define.',
    sub: 'Bring the workflow, systems, risks, and owners. We will use the first conversation to determine what discovery is still required.',
    cta: {
      primary: { label: 'Book a Strategy Call', href: BRAND.calendly },
      secondary: {
        label: 'Message Us on WhatsApp',
        href: BRAND.whatsapp("Hello, I'd like to discuss an enterprise engagement."),
      },
    },
  },
}
