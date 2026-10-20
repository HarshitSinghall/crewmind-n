import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Vercel configuration is valid JSON without an encoding prefix', async () => {
  const source = await readFile('vercel.json', 'utf8');
  assert.doesNotThrow(() => JSON.parse(source));
});
