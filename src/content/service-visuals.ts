/** Decorative homepage service illustrations, ordered to match the six service cards. */
export const serviceVisualIds = [
  'service-workflow-automation', 'service-ai-chat', 'service-voice-assistant',
  'service-document-workflows', 'service-client-portals', 'service-internal-tools',
] as const;
export type ServiceVisualId = typeof serviceVisualIds[number];
export const serviceVisualSize = 768;
export function serviceVisualUrl(id: ServiceVisualId, small = false): string {
  return `/_crew/images/${id}${small ? '-small' : ''}.webp`;
}
