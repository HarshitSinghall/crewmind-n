import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { useSeo } from '@/lib/useSeo'
import type { LegalDocument } from '@/content/legal'

export default function LegalPage({ document, path }: { document: LegalDocument; path: string }) {
  useSeo({ ...document.seo, path })

  return (
    <Section spacing="loose">
      <Container width="narrow">
        <header className="pt-12 sm:pt-16">
          <Eyebrow className="mb-5">{document.eyebrow}</Eyebrow>
          <Heading level={1} size="xl" className="mb-4">
            {document.title}
          </Heading>
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-[var(--text-3)]">
            Effective {document.effectiveDate}
          </p>
          <p className="mt-7 text-[1.0625rem] leading-[1.72] text-[var(--text-2)]">
            {document.intro}
          </p>
        </header>

        <div className="mt-12 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {document.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 py-9 sm:py-11">
              <Heading level={2} size="md" className="mb-4">
                {section.title}
              </Heading>
              <div className="space-y-4 text-[0.9375rem] leading-[1.72] text-[var(--text-2)]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items ? (
                  <ul className="list-disc space-y-2 pl-5 marker:text-[var(--accent)]">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/" variant="secondary" size="lg">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to home
          </Button>
        </div>
      </Container>
    </Section>
  )
}
