import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { dirname, resolve, relative, isAbsolute } from 'node:path';

export const root = process.cwd();
export async function readJson<T>(path: string, fallback?: T): Promise<T> {
  try { return JSON.parse(await readFile(path, 'utf8')); }
  catch (error) { if (fallback !== undefined && (error as NodeJS.ErrnoException).code === 'ENOENT') return fallback; throw error; }
}
export async function write(path: string, data: string | Uint8Array) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, data);
}
let jsonWriteSequence = 0;
export async function writeJson(path: string, data: unknown) {
  const text = JSON.stringify(data, null, 2) + '\n';
  const temporary = `${path}.tmp-${process.pid}-${jsonWriteSequence++}`;
  await write(temporary, text);
  await rename(temporary, path);
}
export function within(base: string, path: string) {
  const result = resolve(base, path.replace(/^[/\\]+/, ''));
  const rel = relative(resolve(base), result);
  if (rel.startsWith('..') || isAbsolute(rel)) throw new Error(`Unsafe output path: ${path}`);
  return result;
}
export async function pool<T>(items: T[], concurrency: number, run: (item: T, index: number) => Promise<void>) {
  let next = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (next < items.length) { const index = next++; await run(items[index], index); }
  }));
}
export async function request(url: string, retries = 2): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(35000), headers: { 'User-Agent': 'SphereStaticSnapshot/1.0 (public-page archival)', Accept: '*/*' } });
      if ((response.status === 429 || response.status >= 500) && attempt < retries) {
        await response.body?.cancel();
        const retryAfter = Number(response.headers.get('retry-after'));
        await new Promise(done => setTimeout(done, Math.max(Number.isFinite(retryAfter) ? retryAfter * 1000 : 0, 2000 * 2 ** attempt))); continue;
      }
      return response;
    } catch (error) {
      if (attempt >= retries) throw error;
      await new Promise(done => setTimeout(done, 500 * (attempt + 1)));
    }
  }
}
