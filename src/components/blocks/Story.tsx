import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Reveal } from '@/components/ui/Reveal'
import type { AboutContent } from '@/content/types'

/** Prose band. Narrow measure — this is the one place on the site to read. */
export function Story({ story }: { story: AboutContent['story'] }) {
  return (
    <Section id="story" divided aria-labelledby="story-title">
      <Container width="narrow">
        <Reveal>
          <Heading level={2} size="lg" id="story-title" className="mb-8">
            {story.title}
          </Heading>
        </Reveal>

        <div className="flex flex-col gap-6">
          {story.paragraphs.map((p, i) => (
            <Reveal key={p.slice(0, 32)} index={i}>
              <p className="text-step-1 leading-[1.62] text-[var(--text-2)]">{p}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
