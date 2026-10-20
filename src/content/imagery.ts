import { visuals } from './visuals.ts';
import { heroPlacements, type HeroPhotoId } from './hero-photography.ts';

/** Local workflow diagrams and fictional interface mockups. */
export const images = visuals;
export type ImageId = keyof typeof images;
export type Crop = 'square' | 'landscape' | 'portrait';
export const crops = { square: [960, 960], landscape: [1280, 720], portrait: [768, 960] } as const;
export const placements = {
  examples: ['enquiries', 'onboarding', 'reporting', 'voice', 'speed-to-lead', 'follow-up', 'booking', 'support'],
  hero: heroPlacements,
  capabilities: ['enquiries', 'chat', 'voice', 'documents', 'portals', 'internal-tools'],
  services: [ ['enquiries', 'onboarding', 'reporting'], ['chat', 'support', 'enquiries'], ['voice', 'booking', 'support'], ['documents', 'onboarding', 'reporting'], ['portals', 'enquiries', 'booking'], ['internal-tools', 'reporting', 'onboarding'] ],
  process: ['discovery', 'build', 'live-review'],
  globe: ['maintenance', 'live-review', 'enquiries', 'reporting', 'build'],
  faq: ['build', 'live-review', 'maintenance'],
  // The workspace master is retained in the asset library, not used as builder evidence.
  builder: [],
} as const satisfies Record<string, readonly (ImageId | HeroPhotoId)[] | readonly (readonly ImageId[])[]>;
export function imageUrl(id: ImageId, crop: Crop = 'square', small = false): string {
  return `/_crew/images/${id}-${crop}${small ? '-small' : ''}.webp`;
}
export const visualRules = 'Crisp workflow diagrams and fictional interface studies. Ivory canvas, charcoal text, lavender steps and mint human checkpoints. Each aspect ratio has its own composition; text is not cropped from a master.';
export const negativePrompt = 'No real customer information, client results, live integrations, vendor logos, invented metrics, or fabricated builder identity.';
export function imagePrompt(id: ImageId): string { return `${visualRules} ${images[id].alt}`; }
