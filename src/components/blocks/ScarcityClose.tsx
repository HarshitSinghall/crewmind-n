import { CtaBand } from './CtaBand'
import type { HomeContent } from '@/content/types'

/**
 * The homepage's single closing CTA. The reference site repeats its hero CTA
 * block here verbatim; one considered close converts better than a second
 * copy of the opening ask.
 *
 * The band itself is shared with the other pages — see CtaBand.
 */
export function ScarcityClose({ close }: { close: HomeContent['close'] }) {
  return <CtaBand close={close} />
}
