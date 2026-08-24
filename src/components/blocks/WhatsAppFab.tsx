import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { BRAND } from '@/content/site'
import { cn } from '@/lib/cn'

/**
 * Secondary contact affordance. Deliberately understated: the reference site
 * runs a live-chat widget with an animated "attention grabber" that competes
 * with its own primary CTA. This waits until the visitor has actually
 * scrolled, then sits quietly in the corner.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={BRAND.whatsapp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        'fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-[var(--r-full)] border border-[var(--border-strong)] bg-[color-mix(in_oklch,var(--surface-2)_88%,transparent)] py-3 pl-4 pr-5 shadow-[var(--shadow-3)] backdrop-blur-xl transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)] hover:border-[var(--accent-dim)] hover:bg-[var(--surface-3)]',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <MessageCircle size={16} aria-hidden="true" className="text-[var(--accent)]" />
      <span className="text-[0.8125rem] font-medium text-[var(--text-1)]">
        Message us
      </span>
    </a>
  )
}
