import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

test('preview builds block crawling while production builds allow it', () => {
  for (const environment of ['production', 'preview', 'development']) {
    const output = execFileSync(process.execPath, ['--input-type=module', '-e',
      "import {indexable,robotsText} from './scripts/lib/seo.ts'; console.log(JSON.stringify({indexable,robotsText}));"],
    { env: { ...process.env, VERCEL_ENV: environment }, encoding: 'utf8' });
    const policy = JSON.parse(output);
    assert.equal(policy.indexable, environment === 'production');
    assert.match(policy.robotsText, environment === 'production' ? /Allow: \/\n/ : /Disallow: \/\n/);
  }
});
