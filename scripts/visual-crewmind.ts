import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { writeJson } from './lib/io.ts';

// Current-content evidence, not a pixel comparison against obsolete recruitment copy.
const port = 4175;
const server = spawn(process.execPath, ['scripts/serve.ts', '--port', String(port)], { windowsHide: true, stdio: 'pipe' });
const origin = `http://127.0.0.1:${port}`;
let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
try {
  let ready = false;
  for (let i = 0; i < 80; i++) {
    if (server.exitCode !== null) throw new Error('Visual preview server stopped before startup.');
    if (await fetch(origin).then(r => r.ok).catch(() => false)) { ready = true; break; }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  if (!ready) throw new Error('Visual preview server did not start.');
  browser = await chromium.launch();
  const evidence: { width: number; route: string; horizontalOverflow: boolean; headingFits: boolean }[] = [];
  for (const width of [390, 768, 1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    for (const route of ['/', '/services/', '/examples/', '/about/', '/audit/']) {
      await page.goto(origin + route);
      await page.evaluate(() => document.fonts.ready);
      for (const block of await page.locator('main > section').all()) {
        await block.scrollIntoViewIfNeeded();
        await page.waitForTimeout(140);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(450);
      const state = await page.locator('h1').evaluate(el => {
        const rect = el.getBoundingClientRect();
        return { horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1, headingFits: rect.left >= 0 && rect.right <= innerWidth + 1 };
      });
      evidence.push({ width, route, ...state });
      const name = route === '/' ? 'home' : route.replaceAll('/', '');
      await page.screenshot({ path: `artifacts/crewmind-visual/${name}-${width}.png`, fullPage: true });
    }
    await page.close();
  }
  await writeJson('artifacts/crewmind-visual/report.json', { comparisons: 'Current-content screenshots; no animated pixel-fidelity claim.', evidence });
  if (evidence.some(item => item.horizontalOverflow || !item.headingFits)) throw new Error('Copy overflow detected; inspect visual report.');
  console.log(`Saved ${evidence.length} Crewmind screenshots; heading and horizontal-overflow checks passed.`);
} finally {
  await browser?.close();
  server.kill();
}
