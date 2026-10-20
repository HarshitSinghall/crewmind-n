import { test, expect } from '@playwright/test';

test('all pages reflow at a narrow 320px viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of ['/', '/services/', '/examples/', '/about/', '/audit/']) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toBeVisible();
    const fits = await page.locator('h1').evaluate(heading => {
      const box = heading.getBoundingClientRect();
      return document.documentElement.scrollWidth <= innerWidth + 1 && box.left >= 0 && box.right <= innerWidth + 1;
    });
    expect(fits, `${route} must fit at 320px`).toBe(true);
  }
});

for (const width of [768, 1440, 1920]) {
  test(`hero action labels align horizontally at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const centers = await page.locator('.banner__txt .btn-group').evaluate(group => {
      const center = (element: Element) => {
        const range = document.createRange();
        range.selectNodeContents(element);
        const box = range.getBoundingClientRect();
        return box.top + box.height / 2;
      };
      return [center(group.querySelector('.btn__txt')!), center(group.querySelector('.cm-hero-link')!)];
    });
    expect(Math.abs(centers[0] - centers[1])).toBeLessThanOrEqual(2);
  });
}

test('builder link has readable contrast against its dark section', async ({ page }) => {
  await page.goto('/about/');
  const contrast = await page.locator('#working-together .cm-text-link').evaluate(link => {
    const luminance = (color: string) => {
      const components = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(value => {
        const channel = value / 255;
        return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
      });
      return .2126 * components[0] + .7152 * components[1] + .0722 * components[2];
    };
    const foreground = luminance(getComputedStyle(link).color);
    const background = luminance(getComputedStyle(link.closest('section')!).backgroundColor);
    return (Math.max(foreground, background) + .05) / (Math.min(foreground, background) + .05);
  });
  expect(contrast).toBeGreaterThanOrEqual(4.5);
});
