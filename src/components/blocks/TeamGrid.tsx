import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Reveal } from '@/components/ui/Reveal'
import type { AboutContent, TeamMember } from '@/content/types'

export function TeamGrid({ team }: { team: AboutContent['team'] }) {
  return (
    <Section id="team" divided aria-labelledby="team-title">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[36rem]">
              <Heading level={2} size="xl" id="team-title" className="mb-3">
                {team.title}
              </Heading>
              <Text size="lg">{team.sub}</Text>
            </div>
            <Badge>{team.note}</Badge>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member, i) => (
            <Reveal as="li" key={member.id} index={i % 3} className="flex">
              <MemberCard member={member} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex w-full flex-col gap-4 rounded-[var(--r-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-6 transition-colors duration-[var(--dur-base)] hover:border-[var(--border-strong)]">
      <div className="flex items-center gap-3.5">
        {/*
          A real photo when there is one, initials when there isn't. Both
          paths are the same fixed size, so the row never reflows when a
          headshot is swapped in.
        */}
        <Avatar initials={member.initials} name={member.name} src={member.avatar} />
        <div className="min-w-0">
          <h3 className="truncate font-display text-[1rem] font-semibold tracking-[-0.018em] text-[var(--text-1)]">
            {member.name}
          </h3>
          <p className="text-[0.8125rem] text-[var(--text-3)]">{member.role}</p>
        </div>
      </div>

      <p className="flex-1 text-[0.875rem] leading-[1.62] text-[var(--text-2)]">
        {member.bio}
      </p>

      {member.links.length > 0 && (
        <ul className="flex flex-wrap gap-3 border-t border-[var(--border-subtle)] pt-4">
          {member.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[0.8125rem] text-[var(--text-2)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--accent)]"
              >
                {link.label}
                <ArrowUpRight size={13} aria-hidden="true" />
                <span className="sr-only">, {member.name}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
