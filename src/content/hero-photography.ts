/** Generated editorial scenes, not photographs of Crewmind staff or clients. */
export const heroPhotoIds = ['hero-founder', 'hero-collaboration', 'hero-support', 'hero-administration', 'hero-operations', 'hero-client-meeting'] as const;
export type HeroPhotoId = typeof heroPhotoIds[number];
// Retain the theme's twelve-slot motion sequence with six distinct subjects.
export const heroPlacements = [...heroPhotoIds, 'hero-operations', 'hero-support', 'hero-founder', 'hero-client-meeting', 'hero-administration', 'hero-collaboration'] as const;
export function heroPhotoUrl(id: HeroPhotoId, small = false): string {
  return `/_crew/images/${id}-square${small ? '-small' : ''}.webp`;
}
