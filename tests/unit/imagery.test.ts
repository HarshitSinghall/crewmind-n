import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as cheerio from 'cheerio';
import { renderCrewmind } from '../../scripts/lib/crewmind.ts';

test('diagram and mockup subjects follow section meaning and replace every placeholder path', async () => {
  const raw = await readFile('snapshot/pages/index.html', 'utf8');
  const home = cheerio.load(renderCrewmind(raw, '/', {}));
  assert.equal(home('.img-links__item img').eq(1).attr('data-image-id'), 'chat');
  assert.equal(home('img[data-image-id="workspace"]').length, 0, 'Builder section must not use an illustrative desk as identity evidence.');
  const hero = JSON.parse(home('.banner__imgs').attr('data-img-grid-urls')!);
  assert.equal(hero.length, 12);
  assert.equal(new Set(hero.map((entry: { desktop: string }) => entry.desktop)).size, 6);
  assert.ok(hero.every((entry: { desktop: string; mobile: string }) => entry.desktop.includes('/hero-') && entry.mobile === entry.desktop.replace('.webp', '-small.webp')));
  assert.notEqual(hero[0].desktop, hero[0].mobile);
  assert.equal(home('.banner img').first().attr('srcset'), undefined, 'Theme swaps img.src; stale srcset would hide the animation.');
  const services = cheerio.load(renderCrewmind(raw, '/services/', {}));
  assert.deepEqual(services('#chat img').map((_, el) => services(el).attr('data-image-id')).get(), ['chat', 'support', 'enquiries']);
  for (const route of ['/', '/services/', '/examples/', '/about/', '/audit/']) {
    const html = renderCrewmind(raw, route, {});
    assert.doesNotMatch(html, /workflow-\d+\.svg/);
    const $ = cheerio.load(html);
    $('img[data-image-id]').each((_, el) => {
      assert.ok($(el).attr('width'));
      assert.ok($(el).attr('height'));
      if (!$(el).closest('.banner').length) {
        assert.ok($(el).attr('srcset'));
        assert.ok($(el).attr('sizes'));
      }
      assert.equal($(el).attr('src'), $(el).attr('data-path'));
    });
  }
});
