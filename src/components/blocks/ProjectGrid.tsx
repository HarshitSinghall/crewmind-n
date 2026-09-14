import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { Stat } from '@/components/ui/Stat'
import type { ProjectCase } from '@/content/types'

/**
 * The blueprint card grid, shared by /past-projects and the "related work"
 * block on every service page.
 *
 * Cards are `<article>`, not links: there is no per-project detail route, so
 * making the whole card clickable would promise a destination that does not
 * exist. The reference site does exactly that and every card goes nowhere.
 */
export function ProjectGrid({ projects }: { projects: ProjectCase[] }) {
  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {projects.map((project, i) => (
        <Reveal as="li" key={project.id} index={i % 2} className="flex">
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </ul>
  )
}

function ProjectCard({ project }: { project: ProjectCase }) {
  return (
    <article className="flex w-full flex-col rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-6 transition-colors duration-[var(--dur-base)] hover:border-[var(--border-strong)]">
      <p className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--text-3)]">
        {project.client} · {project.when}
      </p>

      <h3 className="mb-4 font-display text-[1.125rem] font-semibold leading-snug tracking-[-0.022em] text-[var(--text-1)]">
        {project.title}
      </h3>

      <div className="mb-5 border-y border-[var(--border-subtle)] py-4">
        <Stat value={project.impact} label="Success signal" size="sm" />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <Panel label="Use case" body={project.challenge} />
        <Panel label="Build pattern" body={project.solution} />
      </div>

      <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-[var(--border-subtle)] pt-5">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Badge>{tag}</Badge>
          </li>
        ))}
      </ul>

      {project.source ? (
        <a
          href={project.source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-fit items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--accent)] transition-colors hover:text-[var(--text-1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          {project.source.label}
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      ) : null}
    </article>
  )
}

function Panel({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <h4 className="mb-1.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
        {label}
      </h4>
      <p className="text-[0.875rem] leading-[1.62] text-[var(--text-2)]">{body}</p>
    </div>
  )
}
