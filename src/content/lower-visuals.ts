/** Decorative generated artwork used only below the homepage capability grid. */
export const lowerVisuals = {
  'pilot-journey': { width: 1440, height: 1080 },
  'orbit-enquiries': { width: 384, height: 384 },
  'orbit-delivery': { width: 384, height: 384 },
  'orbit-reporting': { width: 384, height: 384 },
  'orbit-support': { width: 384, height: 384 },
  'orbit-maintenance': { width: 384, height: 384 },
  'orbit-monitoring': { width: 384, height: 384 },
  'faq-free-pilot': { width: 960, height: 720 },
  'faq-seven-days': { width: 960, height: 720 },
  'faq-after-pilot': { width: 960, height: 720 },
} as const;
export type LowerVisualId = keyof typeof lowerVisuals;
export const orbitVisualIds = ['orbit-enquiries', 'orbit-delivery', 'orbit-reporting', 'orbit-support', 'orbit-maintenance', 'orbit-monitoring'] as const;
export const faqVisualIds = ['faq-free-pilot', 'faq-seven-days', 'faq-after-pilot'] as const;
export function lowerVisualUrl(id: LowerVisualId, small = false): string {
  return `/_crew/images/${id}${small ? '-small' : ''}.webp`;
}
