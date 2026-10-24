import { test, expect } from '@playwright/test';

test('public content and crawler discovery work without JavaScript', async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    const response = await page.goto('http://127.0.0.1:4173/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('recurring task');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.crewmindhq.com/');
    const robots = await request.get('/robots.txt');
    expect(await robots.text()).toContain('Allow: /');
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain('<loc>https://www.crewmindhq.com/about/</loc>');
    expect(await sitemap.text()).not.toContain('/404/');
    const missing = await page.goto('http://127.0.0.1:4173/aws-check-missing-page/');
    expect(missing?.status()).toBe(404);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
  } finally { await context.close(); }
});
