import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  /** Allow more than one panel open at a time. */
  multiple?: boolean
  className?: string
}

/**
 * Disclosure list, not a tablist.
 *
 * Each header is a real <button>, so Enter, Space and Tab work without a
 * keydown handler — the accessible accordion is the one that doesn't
 * reimplement the button. `aria-expanded` and `aria-controls` tie the header
 * to its panel; the panel is a labelled region so screen readers announce
 * what they have landed in.
 *
 * The panel stays mounted and collapses via `grid-template-rows: 0fr -> 1fr`,
 * which animates to intrinsic height without measuring anything in JS. It is
 * `hidden` while closed so its content is out of the a11y tree and untabbable.
 */
export function Accordion({ items, multiple = false, className }: AccordionProps) {
  const baseId = useId()
  const [open, setOpen] = useState<string[]>([])

  const toggle = (id: string) =>
    setOpen((current) => {
      if (current.includes(id)) return current.filter((x) => x !== id)
      return multiple ? [...current, id] : [id]
    })

  return (
    <ul className={cn('flex flex-col', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id)
        const headerId = `${baseId}-${item.id}-header`
        const panelId = `${baseId}-${item.id}-panel`

        return (
          <li key={item.id} className="border-b border-[var(--border-subtle)] first:border-t">
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-[var(--dur-fast)] hover:text-[var(--accent)]"
              >
                <span className="font-display text-[1.0625rem] font-medium leading-snug tracking-[-0.018em] text-[var(--text-1)] transition-colors duration-[var(--dur-fast)]">
                  {item.question}
                </span>
                <Plus
                  size={18}
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 shrink-0 text-[var(--accent)] transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)]',
                    isOpen && 'rotate-45',
                  )}
                />
              </button>
            </h3>

            <div
              className="grid transition-[grid-template-rows] duration-[var(--dur-base)] ease-[var(--ease-out-expo)]"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  hidden={!isOpen}
                  className="pb-6 pr-10"
                >
                  <p className="text-[0.9375rem] leading-[1.65] text-[var(--text-2)]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
