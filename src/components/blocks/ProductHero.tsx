import { ArrowRight, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { WaitClock } from '@/components/ui/WaitClock'
import type { PriyaContent } from '@/content/types'

/**
 * The product page's opening block, and the only place on the site where a
 * hero is two columns.
 *
 * PageHeader is centred and copy-only, which is right for every other page.
 * This one has to put a running clock beside the claim, because the claim is
 * about elapsed time and a centred column would either bury the clock below
 * the fold or push the headline off it.
 */
export function ProductHero({ hero }: { hero: PriyaContent['hero'] }) {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+3.5rem)] pb-16 sm:pt-[calc(var(--nav-h)+5rem)] sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(closest-side, color-mix(in oklch, var(--accent) 22%, transparent), transparent)',
          opacity: 'var(--bloom-opacity)',
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow className="mb-6">{hero.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal index={1}>
              <Heading level={1} size="display" className="mb-6">
                {hero.headline.lead} <Emphasis>{hero.headline.emphasis}</Emphasis>
                {hero.headline.trail}
              </Heading>
            </Reveal>

            <Reveal index={2}>
              <Text size="lg" className="max-w-[36rem]">
                {hero.sub}
              </Text>
            </Reveal>

            {hero.cta && (
              <Reveal index={3}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button
                    href={hero.cta.primary.href}
                    size="lg"
                    trailing={<ArrowRight size={17} />}
                  >
                    {hero.cta.primary.label}
                  </Button>
                  <Button href={hero.cta.secondary.href} variant="secondary" size="lg">
                    {hero.cta.secondary.label}
                  </Button>
                </div>
              </Reveal>
            )}

            {hero.assurances && (
              <Reveal index={4}>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
                  {hero.assurances.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[0.8125rem] text-[var(--text-3)]"
                    >
                      <Check
                        size={14}
                        aria-hidden="true"
                        className="shrink-0 text-[var(--success)]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <Reveal index={2}>
            <WaitClock
              label={hero.clock.label}
              sinceHour={hero.clock.sinceHour}
              sinceMinute={hero.clock.sinceMinute}
              foot={hero.clock.foot}
            />
            <p className="mt-6 text-[0.875rem] leading-[1.65] text-[var(--text-2)]">
              {hero.trust}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
