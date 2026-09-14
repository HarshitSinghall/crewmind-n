import { BRAND } from '@/content/site'
import { cn } from '@/lib/cn'

interface BrandLogoProps {
  kind?: 'lockup' | 'mark'
  className?: string
}

const LOGOS = {
  lockup: {
    light: '/brand/crewmind-lockup-black.svg',
    dark: '/brand/crewmind-lockup-white.svg',
    aspect: 'aspect-[107/32]',
  },
  mark: {
    light: '/brand/crewmind-mark-black.svg',
    dark: '/brand/crewmind-mark-white.svg',
    aspect: 'aspect-[35/32]',
  },
} as const

/** Uses the supplied, unmodified logo artwork for the active site theme. */
export function BrandLogo({ kind = 'lockup', className }: BrandLogoProps) {
  const logo = LOGOS[kind]

  return (
    <span
      role="img"
      aria-label={`${BRAND.name} logo`}
      className={cn('relative inline-block shrink-0', logo.aspect, className)}
    >
      <img
        src={logo.light}
        alt=""
        aria-hidden="true"
        className="brand-logo-on-light absolute inset-0 h-full w-full"
      />
      <img
        src={logo.dark}
        alt=""
        aria-hidden="true"
        className="brand-logo-on-dark absolute inset-0 h-full w-full"
      />
    </span>
  )
}
