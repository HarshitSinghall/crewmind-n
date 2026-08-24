import { ArrowRight, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import type { PageHero } from '@/content/types'

/**
 * The opening block on every page that isn't Home. Carries the page's single
 * <h1>, and — like the homepage hero — at most one amber action.
 */
export function PageHeader({ hero }: { hero: PageHero }) {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+3.5rem)] pb-14 sm:pt-[calc(var(--nav-h)+5rem)] sm:pb-16">
      <Backdrop />

      <Container className="relative">
        <div className="mx-auto max-w-[48rem] text-center">
          <Reveal>
            <div className="mb-6 flex justify-center">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </div>
          </Reveal>

          <Reveal index={1}>
            <Heading level={1} size="xl" className="mb-5">
              {hero.headline.lead} <Emphasis>{hero.headline.emphasis}</Emphasis>
              {hero.headline.trail}
            </Heading>
          </Reveal>

          <Reveal index={2}>
            <Text size="lg" className="mx-auto max-w-[40rem]">
              {hero.sub}
            </Text>
          </Reveal>

          {hero.cta && (
            <Reveal index={3}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href={hero.cta.primary.href}
                  size="lg"
                  trailing={<ArrowRight size={16} />}
                >
                  {hero.cta.primary.label}
                </Button>
                <Button href={hero.cta.secondary.href} variant="ghost" size="lg">
                  {hero.cta.secondary.label}
                </Button>
              </div>
            </Reveal>
          )}

          {hero.assurances && (
            <Reveal index={4}>
              <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
                {hero.assurances.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <Check size={13} aria-hidden="true" className="text-[var(--accent)]" />
                    <span className="text-[0.8125rem] text-[var(--text-2)]">{a}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  )
}

/** Same accent bloom as the homepage hero, dimmer — this is a subordinate page. */
function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] blur-[100px]"
      style={{
        opacity: 'calc(0.1 * var(--bloom-opacity))',
        background: 'radial-gradient(closest-side, var(--accent), transparent 70%)',
      }}
    />
  )
}
