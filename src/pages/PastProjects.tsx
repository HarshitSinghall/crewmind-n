import { useSearchParams } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { Reveal } from '@/components/ui/Reveal'
import { PageHeader } from '@/components/blocks/PageHeader'
import { ProjectGrid } from '@/components/blocks/ProjectGrid'
import { CtaBand } from '@/components/blocks/CtaBand'
import { CATEGORIES, PROJECTS, PROJECTS_PAGE } from '@/content/projects'
import { useSeo } from '@/lib/useSeo'
import { cn } from '@/lib/cn'

export default function PastProjects() {
  const [params, setParams] = useSearchParams()

  const requested = params.get('category')
  // An unknown ?category= falls back to "all" rather than showing nothing.
  // The parameter is shareable, so it will eventually be typed by hand.
  const active = CATEGORIES.some((c) => c.id === requested) ? requested : null

  const visible = active ? PROJECTS.filter((p) => p.category === active) : PROJECTS
  const activeLabel = CATEGORIES.find((c) => c.id === active)?.label

  /*
    Only categories that actually have work get a chip. GEO is the newest
    service and has no shipped case studies yet — offering a filter that
    leads to an empty grid makes the catalogue look broken rather than young.
    The category itself stays in projects.ts, so the chip appears by itself
    the day the first GEO project lands.
  */
  const chips = CATEGORIES.map((category) => ({
    ...category,
    count: PROJECTS.filter((p) => p.category === category.id).length,
  })).filter((category) => category.count > 0)

  useSeo({
    ...PROJECTS_PAGE.seo,
    title: activeLabel
      ? `${activeLabel} Projects`
      : PROJECTS_PAGE.seo.title,
    path: active ? `/past-projects?category=${active}` : '/past-projects',
  })

  /**
   * Writes the filter into the URL rather than component state, so a filtered
   * view is shareable and the back button steps through filters the way a
   * visitor expects. `replace` keeps a filter spree from burying the page
   * they arrived from under twenty history entries.
   */
  const select = (id: string | null) => {
    if (id) setParams({ category: id }, { replace: true })
    else setParams({}, { replace: true })
  }

  return (
    <>
      <PageHeader hero={PROJECTS_PAGE.hero} />

      <Section id="projects" spacing="tight" aria-labelledby="projects-title">
        <Container>
          <h2 id="projects-title" className="sr-only">
            {activeLabel ? `${activeLabel} projects` : 'All projects'}
          </h2>

          <Reveal>
            <div
              role="group"
              aria-label={PROJECTS_PAGE.filterLabel}
              className="flex flex-wrap gap-2"
            >
              <FilterChip
                label={PROJECTS_PAGE.allLabel}
                count={PROJECTS.length}
                active={active === null}
                onSelect={() => select(null)}
              />
              {chips.map((category) => (
                <FilterChip
                  key={category.id}
                  label={category.label}
                  count={category.count}
                  active={active === category.id}
                  onSelect={() => select(category.id)}
                />
              ))}
            </div>
          </Reveal>

          {/*
            The count is announced politely so a screen reader user learns the
            result of pressing a filter. Without it the change is silent — the
            grid below simply becomes different, with no feedback at all.
          */}
          <p aria-live="polite" className="mt-6 text-[0.875rem] text-[var(--text-3)]">
            {visible.length} {visible.length === 1 ? 'project' : 'projects'}
            {activeLabel ? ` in ${activeLabel}` : ''}
          </p>

          <div className="mt-10">
            {visible.length > 0 ? (
              <ProjectGrid projects={visible} />
            ) : (
              <Text>{PROJECTS_PAGE.emptyMessage}</Text>
            )}
          </div>
        </Container>
      </Section>

      <CtaBand close={PROJECTS_PAGE.close} />
    </>
  )
}

interface FilterChipProps {
  label: string
  count: number
  active: boolean
  onSelect: () => void
}

function FilterChip({ label, count, active, onSelect }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      // aria-pressed rather than a fake tablist: these are toggles that
      // rewrite the URL, not tabs, and they must not swallow arrow keys.
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-2 rounded-[var(--r-full)] border px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-[var(--dur-fast)]',
        active
          ? 'border-[color-mix(in_oklch,var(--accent)_45%,transparent)] bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-[var(--accent)]'
          : 'border-[var(--border-subtle)] bg-[var(--surface-1)] text-[var(--text-2)] hover:border-[var(--border-strong)] hover:text-[var(--text-1)]',
      )}
    >
      {label}
      <span className="tnum font-mono text-[0.6875rem] text-[var(--text-3)]">{count}</span>
    </button>
  )
}
