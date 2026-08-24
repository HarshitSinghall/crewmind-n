import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/useTheme'
import { cn } from '@/lib/cn'

/**
 * Single-button theme switch.
 *
 * A two-state button rather than a three-way dark/light/system control: the
 * third state is reachable (the hook supports it) but putting it in the nav
 * costs a dropdown to serve a preference almost nobody sets by hand. Until a
 * visitor touches this, the site already follows their OS.
 *
 * The label says what pressing it will do, not what is currently on — that is
 * the phrasing that reads correctly when a screen reader announces it out of
 * context.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-[var(--r-md)] border border-[var(--border-subtle)] text-[var(--text-2)] transition-colors duration-[var(--dur-fast)] hover:border-[var(--border-strong)] hover:text-[var(--text-1)]',
        className,
      )}
    >
      {/*
        Both icons are always mounted and cross-fade, so the button never
        reflows and the swap survives reduced motion (opacity is the one
        property the global reduced-motion block keeps).
      */}
      <span className="relative inline-flex h-[18px] w-[18px] items-center justify-center">
        <Sun
          size={18}
          aria-hidden="true"
          className={cn(
            'absolute transition-opacity duration-[var(--dur-base)]',
            theme === 'dark' ? 'opacity-100' : 'opacity-0',
          )}
        />
        <Moon
          size={18}
          aria-hidden="true"
          className={cn(
            'absolute transition-opacity duration-[var(--dur-base)]',
            theme === 'dark' ? 'opacity-0' : 'opacity-100',
          )}
        />
      </span>
    </button>
  )
}
