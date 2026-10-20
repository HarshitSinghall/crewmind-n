import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { serviceVisualIds } from '../../src/content/service-visuals.ts';

for (const width of [375, 768, 1024, 1440]) test(`service illustrations retain cards and navigation at ${width}px`, async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const section = page.locator('.cm-service-art');
  await section.scrollIntoViewIfNeeded();
  await section.locator('img').evaluateAll(nodes => Promise.all(nodes.map(node => (node as HTMLImageElement).decode())));
  await expect(section.locator('.img-links__item')).toHaveCount(6);
  expect(await section.locator('img').evaluateAll(nodes => nodes.map(node => node.dataset.artId))).toEqual([...serviceVisualIds]);
  const state = await section.locator('img').evaluateAll(nodes => nodes.map(node => {
    const image = node as HTMLImageElement, bounds = image.getBoundingClientRect();
    return { loaded: image.naturalWidth > 0, fit: getComputedStyle(image).objectFit, width: bounds.width, height: bounds.height, local: image.currentSrc.includes('/_crew/images/service-') };
  }));
  expect(state.every(image => image.loaded && image.local && image.fit === 'contain' && Math.abs(image.width - image.height) < 1)).toBe(true);
  expect(Math.max(...state.map(image => image.width)) - Math.min(...state.map(image => image.width))).toBeLessThan(1);
  const columns = await section.locator('.img-links__items').evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length);
  expect(columns).toBe(width <= 670 ? 2 : width <= 1000 ? 3 : 6);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await mkdir('artifacts/service-visuals', { recursive: true });
  await section.screenshot({ path: `artifacts/service-visuals/cards-${width}.png`, animations: 'disabled' });
  const firstLink = section.locator('.img-links__item').first().locator('a').first();
  await expect(firstLink).toHaveAttribute('href', '/services/#workflows');
  if (width === 1440) {
    await firstLink.hover();
    await expect.poll(() => firstLink.locator('img').evaluate(node => getComputedStyle(node).transform)).not.toBe('none');
  }
  await firstLink.click();
  await expect(page).toHaveURL(/\/services\/#workflows$/);
  expect(errors).toEqual([]);
});
