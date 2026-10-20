import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as cheerio from 'cheerio';
import { images, crops, placements, type ImageId, type Crop } from '../../src/content/imagery.ts';
import { renderVisual } from '../../scripts/lib/visual-artwork.ts';

test('all visual aspects disclose fictional content and embed no external resources or interactions', () => {
  for (const id of Object.keys(images) as ImageId[]) {
    for (const crop of Object.keys(crops) as Crop[]) {
      const $ = cheerio.load(renderVisual(id, crop), { xmlMode: true });
      assert.equal($('svg').length, 1);
      assert.ok($('desc').text().length > 30);
      assert.match($('svg').text(), /ILLUSTRATIVE/);
      assert.match($('svg').text(), /SAMPLE ONLY.*NOT A LIVE INTEGRATION/);
      assert.equal($('script,foreignObject,image,a,form,input').length, 0);
      assert.equal($('[href],[src]').length, 0);
    }
  }
});

test('placement categories explain processes with diagrams and outputs with mockups', () => {
  assert.equal(images.enquiries.kind, 'workflow');
  assert.equal(images['follow-up'].kind, 'workflow');
  assert.equal(images.build.kind, 'workflow');
  assert.equal(images.onboarding.kind, 'interface');
  assert.equal(images.booking.kind, 'interface');
  assert.equal(images.reporting.kind, 'interface');
  assert.ok(placements.examples.some(id => images[id].kind === 'workflow'));
  assert.ok(placements.examples.some(id => images[id].kind === 'interface'));
  assert.equal(placements.builder.length, 0);
});
