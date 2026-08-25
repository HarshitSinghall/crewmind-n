import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Emphasis, Heading } from '@/components/ui/Heading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import { VideoSlot } from './VideoSlot'
import type { HomeContent } from '@/content/types'

export function Hero({ hero }: { hero: HomeContent['hero'] }) {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+4rem)] pb-16 sm:pt-[calc(var(--nav-h)+6rem)] sm:pb-20">
      <HeroBackdrop />

      <Container className="relative">
        <div className="mx-auto max-w-[52rem] text-center">
          {/*
            The eyebrow used to sit beside a stack of three invented faces.
            Under an "AI employees" positioning those faces read as the staff
            we are selling, which is a roster we do not have — so they are
            gone rather than restyled.
          */}
          <Reveal>
            <div className="mb-7 flex items-center justify-center">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </div>
          </Reveal>

          <Reveal index={1}>
            <Heading level={1} size="display" className="mb-6">
              {hero.headline.lead} <Emphasis>{hero.headline.emphasis}</Emphasis>
              {hero.headline.trail}
            </Heading>
          </Reveal>

          <Reveal index={2}>
            <Text size="lg" className="mx-auto max-w-[42rem]">
              {hero.sub}
            </Text>
          </Reveal>

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
        </div>

        <Reveal index={4}>
          <div className="mx-auto mt-16 max-w-[56rem]">
            <p className="mb-4 text-center font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--text-3)]">
              {hero.videoPrompt}
            </p>
            <VideoSlot video={hero.video} />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/**
 * A single soft accent bloom behind the headline plus a fine grid that fades
 * out. Restraint is the point — the reference site stacks gradients, glows
 * and a red progress bar, which is what makes it read as a funnel.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute left-1/2 top-[-14rem] h-[36rem] w-[64rem] -translate-x-1/2 rounded-[50%] blur-[110px]"
        style={{
          opacity: 'calc(0.16 * var(--bloom-opacity))',
          background:
            'radial-gradient(closest-side, var(--accent), transparent 72%)',
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[44rem] opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 55% at 50% 0%, black 20%, transparent 78%)',
        }}
      />
    </div>
  )
}
