import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { readJson, writeJson } from '../../scripts/lib/io.ts';
test('missing JSON can default, but corrupted snapshot JSON must fail visibly', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'sphere-json-'));
  try {
    const file = join(directory, 'state.json');
    assert.deepEqual(await readJson(file, {}), {});
    await writeFile(file, '{broken');
    await assert.rejects(readJson(file, {}), SyntaxError);
    await writeJson(file, { recovered: true });
    assert.deepEqual(await readJson(file), { recovered: true });
  } finally {
    assert.equal(dirname(resolve(directory)), resolve(tmpdir()));
    await rm(directory, { recursive: true, force: true });
  }
});
