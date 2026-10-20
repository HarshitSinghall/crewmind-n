import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

for (const width of [375, 768, 1024, 1440]) test(`lower homepage artwork fits and stays clear of controls at ${width}px`, async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await mkdir('artifacts/lower-visuals', { recursive: true });
  for (const [name, selector] of Object.entries({ process: '.cm-pilot-art', support: '.cm-support-art', faq: '.cm-home-faq' })) {
    const section = page.locator(selector);
    await section.scrollIntoViewIfNeeded();
    await section.locator('img').evaluateAll(nodes => Promise.all(nodes.map(node => { const image = node as HTMLImageElement; image.loading = 'eager'; return image.decode(); })));
    await page.waitForTimeout(300);
    const failures = await section.locator('img[data-art-id]').evaluateAll(nodes => nodes.filter(node => {
      const box = node.getBoundingClientRect();
      const inCarousel = Boolean(node.closest('.flickity-enabled'));
      return !(node as HTMLImageElement).naturalWidth || getComputedStyle(node).objectFit !== 'contain' || (!inCarousel && box.width > 0 && (box.left < -1 || box.right > innerWidth + 1));
    }).map(node => node.dataset.artId));
    expect(failures).toEqual([]);
    await section.screenshot({ path: `artifacts/lower-visuals/${name}-${width}.png`, animations: 'disabled' });
  }
  await expect(page.locator('.cm-pilot-art img')).toHaveCount(1);
  await expect(page.locator('.cm-support-art img')).toHaveCount(6);
  await expect(page.locator('.cm-home-faq img')).toHaveCount(3);
  const overlap = await page.locator('.cm-support-art').evaluate(section => {
    const graphic = section.querySelector('.globe-graphic-with-txt__graphic')!.getBoundingClientRect();
    const center = { left: graphic.x + graphic.width * .41, right: graphic.x + graphic.width * .59, top: graphic.y + graphic.height * .41, bottom: graphic.y + graphic.height * .59 };
    const labels = [...section.querySelectorAll('.globe-graphic-with-txt__graphic text')].map(node => node.getBoundingClientRect());
    return [...section.querySelectorAll('.cm-orbit-object')].filter(node => {
      const box = node.getBoundingClientRect();
      if (!box.width) return false;
      return [center, ...labels].some(other => box.left < other.right && box.right > other.left && box.top < other.bottom && box.bottom > other.top);
    }).map(node => node.className);
  });
  expect(overlap).toEqual([]);
  if (width === 375) {
    await expect(page.locator('.cm-home-faq [data-slider]')).not.toHaveClass(/flickity-enabled/);
    const cards = await page.locator('.cm-home-faq .flickity__item').evaluateAll(nodes => nodes.map(node => ({ top: node.getBoundingClientRect().top, bottom: node.getBoundingClientRect().bottom, hidden: node.getAttribute('aria-hidden') })));
    expect(cards.every((card, index) => card.hidden !== 'true' && card.bottom > card.top && (!index || card.top >= cards[index - 1].bottom)), JSON.stringify(cards)).toBe(true);
  }
  const header = page.locator('.cm-pilot-art .accordion__row-header').nth(2);
  await header.scrollIntoViewIfNeeded();
  await header.click();
  await expect(header).toHaveAttribute('aria-expanded', 'true');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  expect(errors).toEqual([]);
});

test('orbit motion stops under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.locator('.cm-orbit-object img').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).animationName === 'none'))).toBe(true);
});
