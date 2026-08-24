import { Quote } from 'lucide-react'
import { Marquee } from '@/components/ui/Marquee'
import { Avatar } from '@/components/ui/Avatar'
import { TESTIMONIALS } from '@/content/testimonials'
import type { Testimonial } from '@/content/types'

/**
 * Rendered exactly ONCE per page. The reference site emits this set twice on
 * the homepage and again on every service page, which triples the review
 * count a screen reader announces and doubles the DOM for no gain.
 */
export function TestimonialRail() {
  return (
    <section aria-label="Client reviews" className="py-4">
      <Marquee durationSec={90}>
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </Marquee>
    </section>
  )
}

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <figure className="flex w-[21rem] shrink-0 flex-col gap-4 rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5 sm:w-[24rem]">
      <Quote
        size={16}
        aria-hidden="true"
        className="shrink-0 fill-[var(--accent-dim)] text-[var(--accent-dim)] opacity-60"
      />

      <blockquote className="flex-1">
        {t.headline && (
          <p className="mb-1.5 text-[0.9375rem] font-semibold text-[var(--text-1)]">
            {t.headline}
          </p>
        )}
        <p className="text-[0.875rem] leading-[1.62] text-[var(--text-2)]">{t.body}</p>
      </blockquote>

      <figcaption className="flex items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
        <Avatar initials={t.initials} name={t.name} src={t.avatar} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-[0.8125rem] font-medium text-[var(--text-1)]">
            {t.name}
          </p>
          <p className="tnum truncate font-mono text-[0.6875rem] text-[var(--text-3)]">
            {t.meta ? `${t.meta} · ${t.date}` : t.date}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}
