import { test, expect } from '@playwright/test';

test('capabilities lead to related examples and closed requests offer a useful next step', async ({ page }) => {
  await page.goto('/services/');
  await page.locator('#workflows .cm-related-examples a[href="/examples/#enquiries"]').click();
  await expect(page).toHaveURL(/\/examples\/#enquiries$/);
  await expect(page.locator('#enquiries h2')).toHaveText('Route enquiries to the right person');
  await page.goto('/audit/#request');
  await expect(page.locator('#request h2')).toContainText('not open yet');
  await page.locator('#request a[href="#pilot-fit"]').click();
  await expect(page.locator('#pilot-fit')).toBeInViewport();
  await page.goto('/audit/#faq-10');
  await expect(page.locator('#faq-10')).toHaveAttribute('open', '');
  await expect(page.locator('#faq-10')).toContainText('nothing extends automatically');
});

test('sample walkthrough exposes its exception and example links lead to complete sequences', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'See a sample automation', exact: true }).click();
  const sample = page.locator('#workflow-walkthrough');
  await expect(sample).toContainText('not connected to an inbox or CRM');
  await sample.locator('summary').filter({ hasText: 'What if the details are missing?' }).click();
  await expect(sample.locator('.cm-exception')).toBeVisible();
  await expect(sample.locator('.cm-exception')).toContainText(/human review/i);
  await page.goto('/examples/');
  await page.locator('.cm-example-nav a[href="#reporting"]').click();
  await expect(page.locator('#reporting ol.cm-flow li')).toHaveCount(3);
  await page.locator('#reporting .cm-example-details summary').click();
  await expect(page.locator('#reporting .cm-example-details')).toContainText('source data');
});

test('Crewmind exposes only its five pages and retires recruitment routes', async ({ page, request }) => {
  for (const route of ['/', '/services/', '/examples/', '/about/', '/audit/']) {
    await page.goto(route);
    await expect(page).toHaveTitle(/Crewmind/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect.poll(() => page.locator('.header__logo img, .cm-footer-brand img').evaluateAll(images => images.length === 3 && images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
    await expect(page.locator('body')).not.toContainText(/Hire Talent|Find a Job|Liberty London|Ed Steer|free audit|prioritized roadmap|audit does not include/i);
    await expect(page.locator('.header__section--btn')).toHaveCount(0);
  }
  for (const route of ['/jobs/', '/account/log-in/', '/case-studies/', '/team/']) {
    const response = await request.get(route);
    expect(response.status()).toBe(404);
    expect(await response.text()).toContain('Crewmind');
  }
});

test('examples never imply client results and pilot form never fakes delivery', async ({ page }) => {
  await page.goto('/examples/');
  await expect(page.getByText('Illustrative example—not a completed client project', { exact: true })).toHaveCount(8);
  for (const id of ['voice-agent', 'speed-to-lead', 'lead-follow-up', 'appointment-booking', 'customer-support']) {
    await expect(page.locator(`#${id} h2`)).toBeVisible();
  }
  await expect(page.getByRole('heading', { name: 'How we would check it helps', exact: true })).toHaveCount(8);
  const posts: string[] = [];
  page.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
  await page.goto('/audit/');
  await expect(page.getByRole('button', { name: 'Request a discovery call' })).toBeDisabled();
  await expect(page.locator('#audit-availability')).toBeVisible();
  expect(posts).toEqual([]);
});

test('original menu, images, carousel and accordion work without external requests', async ({ page }) => {
  const errors: string[] = [], external: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4173') && /^https?:/.test(request.url())) external.push(request.url()); });
  await page.goto('/');
  await page.locator('[data-menu-opener="menu"]').click();
  await expect(page.locator('.header__menu--main')).toHaveClass(/active/);
  await expect(page.locator('.header__logo .cm-logo--dark')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.header__menu--main')).not.toHaveClass(/active/);
  await expect.poll(() => page.locator('.banner img').evaluateAll(images => images.length > 0 && images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  const slider = page.locator('[data-slider="case-study"]');
  await slider.scrollIntoViewIfNeeded();
  await expect(slider).toHaveClass(/flickity-enabled/);
  await expect(slider.locator('.case-study-preview__link')).toHaveCount(8);
  await slider.getByRole('button', { name: /next/i }).click();
  await expect(slider.locator('.flickity__item.is-selected h3')).toContainText('client');
  const row = page.locator('.accordion__row').nth(1);
  await row.locator('.accordion__row-header').scrollIntoViewIfNeeded();
  await row.locator('.accordion__row-header').focus();
  await page.keyboard.press('Enter');
  await expect(row.locator('.accordion__row-content')).toBeVisible();
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

for (const width of [390, 768, 1440, 1920]) {
  test(`copy fits at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/', '/services/', '/examples/', '/about/', '/audit/']) {
      await page.goto(route);
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
    await page.goto('/');
    await page.locator('[data-menu-opener="menu"]').click();
    await expect(page.locator('.header__menu--main')).toHaveClass(/active/);
    await page.evaluate(() => window.dispatchEvent(new Event('resize')));
    await expect(page.locator('.header__menu--main')).toHaveClass(/active/);
    await page.locator('.main-menu a[href="/audit/"]').click();
    await expect(page).toHaveURL(/\/audit\//);
  });
}

test('reduced motion keeps content and controls usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await page.locator('[data-menu-opener="menu"]').click();
  await expect(page.locator('.main-menu a[href="/services/"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.header__menu--main')).not.toHaveClass(/active/);
});
