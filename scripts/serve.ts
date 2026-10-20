import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import sirv from 'sirv';
import { readJson } from './lib/io.ts';
const portIndex = process.argv.indexOf('--port');
const port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : process.env.PORT || 4173);
const redirects = await readJson<Record<string, string>>('dist/_local/redirects.json', {});
const files = sirv('dist', { dev: true, etag: true, single: false });
createServer((req, res) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  const path = new URL(req.url || '/', 'http://localhost').pathname;
  if (redirects[path] && redirects[path] !== path) { res.writeHead(302, { Location: redirects[path] }); res.end(); return; }
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end('This is a static demo.'); return; }
  files(req, res, () => { void readFile('dist/404.html').then(html => { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(html); }).catch(() => { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Page not found. Run npm run build to generate the complete site.'); }); });
}).listen(port, '0.0.0.0', () => console.log(`Crewmind: http://localhost:${port}`));
