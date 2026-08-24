import { Container } from '@/components/ui/Container'
import { RatingBadge } from '@/components/ui/RatingBadge'
import { Reveal } from '@/components/ui/Reveal'
import type { HomeContent } from '@/content/types'

/**
 * Proof sits immediately below the hero — before the services grid — so the
 * first thing after the claim is evidence for it.
 */
export function ProofBar({ proof }: { proof: HomeContent['proof'] }) {
  return (
    <div className="border-y border-[var(--border-subtle)] bg-[var(--surface-1)]/40 py-7">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {proof.ratings.map((r) => (
                <RatingBadge key={r.id} rating={r} />
              ))}
            </div>
            <p className="text-center text-[0.8125rem] text-[var(--text-3)] sm:text-left">
              {proof.note}
            </p>
          </div>
        </Reveal>
      </Container>
    </div>
  )
}
