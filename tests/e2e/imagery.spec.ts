import { test, expect } from '@playwright/test';

for (const width of [390, 1440]) test(`hero swaps matching responsive subjects at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('/');
  const images = page.locator('.banner__img img');
  const original = await images.evaluateAll(imgs => imgs.map(img => (img as HTMLImageElement).src));
  await expect.poll(() => images.evaluateAll((imgs, initial) => imgs.some((img, index) => (img as HTMLImageElement).src !== initial[index]), original)).toBe(true);
  await expect.poll(() => images.evaluateAll(imgs => imgs.every(node => {
    const img = node as HTMLImageElement;
    const expected = innerWidth <= 670 ? img.closest('picture')!.querySelector('source')!.srcset : img.src;
    return img.naturalWidth > 0 && img.currentSrc === new URL(expected, location.href).href;
  }))).toBe(true);
});
