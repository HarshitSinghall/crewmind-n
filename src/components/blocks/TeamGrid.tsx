import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { ExpandableProfileCard } from '@/components/ui/ExpandableProfileCard'
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

/**
 * A portrait tile that opens into the full bio.
 *
 * The bio used to sit on the face of a flat card, which meant every tile was
 * as tall as its longest paragraph and the grid never lined up. Moving the
 * detail behind an expand gives the row a single shape and gives the bio more
 * room than it had before.
 */
function MemberCard({ member }: { member: TeamMember }) {
  return (
    <ExpandableProfileCard
      id={member.id}
      title={member.name}
      subtitle={member.role}
      initials={member.initials}
      imageSrc={member.avatar}
    >
      <div className="flex flex-col gap-6">
        <p>{member.bio}</p>

        {member.links.length > 0 && (
          <ul className="flex flex-wrap gap-3 border-t border-[var(--border-subtle)] pt-5">
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
      </div>
    </ExpandableProfileCard>
  )
}
