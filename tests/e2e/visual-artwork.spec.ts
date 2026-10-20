import { test, expect } from '@playwright/test';
import { images, crops, type ImageId, type Crop } from '../../src/content/imagery.ts';
import { renderVisual } from '../../scripts/lib/visual-artwork.ts';

test('every visual aspect keeps its labels inside the canvas', async ({ page }) => {
  for (const id of Object.keys(images) as ImageId[]) {
    for (const crop of Object.keys(crops) as Crop[]) {
      await page.setContent(renderVisual(id, crop));
      await page.evaluate(() => document.fonts.ready);
      const overflowing = await page.locator('svg').evaluate(svg => {
        const box = (svg as SVGSVGElement).viewBox.baseVal;
        return [...svg.querySelectorAll('text')].filter(text => {
          const rect = text.getBBox();
          return rect.x < 0 || rect.y < 0 || rect.x + rect.width > box.width || rect.y + rect.height > box.height;
        }).map(text => text.textContent);
      });
      expect(overflowing, `${id}/${crop}`).toEqual([]);
    }
  }
});

test('example artwork is readable, unobscured, and explicitly illustrative on mobile and desktop', async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/examples/');
    for (const id of ['enquiries', 'onboarding']) {
      const figure = page.locator(`#${id} .cm-workflow-figure`);
      await expect(figure.locator('figcaption')).toContainText('not a live integration');
      const box = await figure.locator('img').boundingBox();
      expect(box!.width).toBeGreaterThan(width <= 670 ? 300 : 700);
    }
    await page.goto('/');
    const overlay = await page.locator('.case-study-preview__img').first().evaluate(element => getComputedStyle(element, '::before').display);
    expect(overlay).toBe('none');
  }
});

test('all carousel cards contain their artwork and full copy without inherited grid clipping', async ({ page }) => {
  for (const width of [390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const failures = await page.locator('.case-study-preview').evaluateAll((cards, narrow) => cards.flatMap((card, index) => {
      const bounds = card.getBoundingClientRect();
      const art = card.querySelector('.case-study-preview__img')!.getBoundingClientRect();
      const copy = card.querySelector('.case-study-preview__content')!.getBoundingClientRect();
      const reasons = [];
      if (copy.bottom > bounds.bottom + 1 || art.bottom > bounds.bottom + 1) reasons.push('Clipped child');
      if (narrow && (copy.top < art.bottom - 1 || copy.top - art.bottom > 36)) reasons.push('Incorrect stacked rows');
      return reasons.length ? [{ index, reasons }] : [];
    }), width <= 1000);
    expect(failures, `${width}px carousel layout`).toEqual([]);
    await page.locator('[data-slider="case-study"]').screenshot({ path: `artifacts/workflow-carousel-${width}.png`, animations: 'disabled' });
  }
});
