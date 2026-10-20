/** Generated interface concepts, not screenshots of a delivered product. */
export const exampleMockups = {
  enquiries: 'Illustrative enquiry inbox with incoming messages categorized and assigned to sales; incomplete details remain in a review tray.',
  onboarding: 'Illustrative onboarding checklist with welcome and document steps completed, details pending, and a final approval step.',
  reporting: 'Illustrative reporting dashboard with source tabs, a sample chart, missing input flagged, and a draft ready for review.',
  voice: 'Illustrative call workspace with an audio waveform, captured enquiry details, appointment and transfer actions, and a human fallback.',
  'speed-to-lead': 'Illustrative first-response conversation with an acknowledgement sent and the sales team notified.',
  'follow-up': 'Illustrative follow-up queue with a scheduled message, a sequence paused after a reply, and opt-out respected.',
  booking: 'Illustrative appointment calendar with a fictional confirmed consultation and a scheduled reminder.',
  support: 'Illustrative support conversation using approved answers and sharing context with a person when more help is needed.',
} as const;
export type ExampleMockupId = keyof typeof exampleMockups;
export function exampleMockupUrl(id: ExampleMockupId, small = false): string {
  return `/_crew/images/example-${id}${small ? '-small' : ''}.webp`;
}
