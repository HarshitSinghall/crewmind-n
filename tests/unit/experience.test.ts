import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as cheerio from 'cheerio';
import { renderCrewmind } from '../../scripts/lib/crewmind.ts';
import { examples, services } from '../../src/content/crewmind.ts';

test('walkthrough explains a sample and an exception without collecting data or claiming integration', async () => {
  const raw = await readFile('snapshot/pages/index.html', 'utf8');
  const $ = cheerio.load(renderCrewmind(raw, '/', {}));
  const walkthrough = $('#workflow-walkthrough');
  assert.equal(walkthrough.length, 1);
  assert.match(walkthrough.text(), /synthetic data/i);
  assert.match(walkthrough.text(), /not connected to an inbox or CRM/i);
  assert.equal(walkthrough.find('details').length, 2);
  assert.equal(walkthrough.find('details[open]').length, 1);
  assert.match(walkthrough.find('details').last().text(), /missing|incomplete/i);
  assert.match(walkthrough.find('details').last().text(), /human review/i);
  assert.equal(walkthrough.find('form,input,textarea,script,iframe').length, 0);
  assert.ok($('main > section').toArray().indexOf(walkthrough[0]) < $('main > section').toArray().findIndex(el => $(el).find('.img-links__item').length > 0));
  assert.equal($('.header__section--btn').length, 0);
});

test('every example has a reachable selector, semantic sequence and human checkpoint without JavaScript', async () => {
  const raw = await readFile('snapshot/pages/index.html', 'utf8');
  const $ = cheerio.load(renderCrewmind(raw, '/examples/', {}));
  for (const example of examples) {
    assert.equal($(`.cm-example-nav a[href="#${example.id}"]`).length, 1);
    const block = $(`#${example.id}`);
    assert.equal(block.find('ol.cm-flow li').length, 3);
    assert.ok(block.text().includes(example.human));
    assert.equal(block.find('details.cm-example-details summary').length, 1);
    assert.ok(block.find('details.cm-example-details').text().includes(example.limit));
  }
  assert.equal($('h1').length, 1);
  assert.equal($('.cm-audit-form').length, 0);
});

test('each capability links to existing examples and separate development excludes the free pilot', async () => {
  const raw = await readFile('snapshot/pages/index.html', 'utf8');
  const $ = cheerio.load(renderCrewmind(raw, '/services/', {}));
  const validTargets = new Set(examples.map(example => `/examples/#${example.id}`));
  for (const service of services) {
    const block = $(`#${service.id}`);
    const links = block.find('.cm-related-examples a');
    assert.ok(links.length > 0, `${service.id} needs a related example`);
    links.each((_, link) => assert.ok(validTargets.has($(link).attr('href')!), 'Related example must exist'));
    if (['websites', 'apps'].includes(service.id)) {
      assert.match(block.find('.cm-disclosure').text(), /separate scope.*not included in the free pilot/);
    }
  }
});

test('closed pilot journey offers useful navigation without enabling collection', async () => {
  const raw = await readFile('snapshot/pages/index.html', 'utf8');
  const $ = cheerio.load(renderCrewmind(raw, '/audit/', {}));
  assert.equal($('#pilot-fit').length, 1);
  assert.equal($('#after-pilot').length, 1);
  assert.equal($('#request a[href="#pilot-fit"]').length, 1);
  assert.equal($('#request a[href="/examples/"]').length, 1);
  assert.match($('#request h2').text(), /not open yet/i);
  assert.equal($('.cm-audit-form fieldset[disabled]').length, 1);
  assert.equal($('.cm-audit-form [name], .cm-audit-form [action]').length, 0);
  assert.equal($('.cm-audit-form button:not([disabled])').length, 0);
  for (const id of ['faq-0', 'faq-1', 'faq-2']) assert.equal($(`#${id}`).length, 1);
});
