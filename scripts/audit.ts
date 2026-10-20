import { readFile, readdir, stat } from 'node:fs/promises';
import * as cheerio from 'cheerio';
import { readJson, within, writeJson } from './lib/io.ts';
import { pages } from '../src/content/crewmind.ts';

const errors: string[] = [];
const report = await readJson<{ assets: string[] }>('dist/build-report.json');
const documents = new Map<string, ReturnType<typeof cheerio.load>>();
for (const route of [...pages.map(page => page.route), '/404/']) {
  const file = route === '/404/' ? 'dist/404.html' : within('dist', `${route}/index.html`);
  const $ = cheerio.load(await readFile(file, 'utf8'));
  documents.set(route, $);
  if ($('h1').length !== 1) errors.push(`Expected one h1: ${route}`);
  if (!$('title').text().includes('Crewmind')) errors.push(`Missing brand title: ${route}`);
  const visible = $('body').clone(); visible.find('script,style').remove();
  if (/Sphere|Hire Talent|Find a Job|Liberty London|Ogilvy|Samsung Ads|Ed Steer|Hires made|spherelondon/i.test(visible.text())) errors.push(`Recruitment content: ${route}`);
  if ($('script:not([src])').length) errors.push(`Unexpected inline scripts: ${route}`);
  if (/workflow-\d+\.svg/.test($.html())) errors.push(`Obsolete workflow placeholder: ${route}`);
  for (const element of $('[data-path],[data-img-grid-urls]').toArray()) {
    const node = $(element);
    const refs = node.attr('data-path') ? [node.attr('data-path')!] : Object.values(JSON.parse(node.attr('data-img-grid-urls')!)).flatMap(value => Object.values(value as Record<string, string>));
    for (const ref of refs) if (!ref.startsWith('/_crew/images/') || !await stat(within('dist', ref)).then(s => s.size > 0).catch(() => false)) errors.push(`Invalid dynamic image on ${route}: ${ref}`);
  }
  $('img[data-image-id]').each((_, el) => {
    const image = $(el);
    if (!image.attr('width') || !image.attr('height') || (!image.closest('.banner').length && (!image.attr('srcset') || !image.attr('sizes')))) errors.push(`Missing responsive image metadata on ${route}`);
    if (!image.closest('.banner').length && image.attr('loading') !== 'lazy') errors.push(`Below-fold image not lazy on ${route}`);
  });
  if ($('meta[name="robots"]').attr('content') !== 'noindex,nofollow') errors.push(`Indexing enabled: ${route}`);
  $('form').each((_, form) => {
    if (!$(form).find('fieldset[disabled]').length || $(form).find('[name]').length) errors.push(`Unconfigured form enabled: ${route}`);
  });
  for (const el of $('[src],[href],[srcset],[data-img-grid-urls]').toArray()) {
    const node = $(el);
    for (const attribute of ['src', 'href', 'srcset']) {
      const value = node.attr(attribute);
      if (!value || value.startsWith('#') || node.is('a') && attribute === 'href') continue;
      const refs = attribute === 'srcset' ? value.split(',').map(v => v.trim().split(/\s/)[0]) : [value];
      for (const ref of refs) {
        if (/^https?:|^\/\//.test(ref)) errors.push(`External asset on ${route}: ${ref}`);
        else if (ref.startsWith('/') && !await stat(within('dist', ref)).then(s => s.isFile()).catch(() => false)) errors.push(`Missing asset on ${route}: ${ref}`);
      }
    }
  }
}
for (const [route, $] of documents) {
  $('a[href]').each((_, element) => {
    const href = $(element).attr('href')!;
    if (!href.startsWith('/') && !href.startsWith('#')) { errors.push(`Unexpected destination on ${route}: ${href}`); return; }
    const [path, hash] = href.split('#');
    const target = documents.get(path || route);
    if (!target) errors.push(`Unknown route on ${route}: ${href}`);
    else if (hash && !target('[id]').toArray().some(e => target(e).attr('id') === hash)) errors.push(`Missing anchor on ${route}: ${href}`);
  });
}
for (const asset of report.assets) {
  if (!await stat(within('dist', asset)).then(s => s.size > 0).catch(() => false)) errors.push(`Missing build asset: ${asset}`);
  if (asset.endsWith('.css')) {
    const css = await readFile(within('dist', asset), 'utf8');
    for (const match of css.matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)/g)) {
      if (/^data:|^#/.test(match[1])) continue;
      const target = new URL(match[1], `https://local.test${asset}`);
      if (target.hostname !== 'local.test' || !await stat(within('dist', target.pathname)).then(s => s.isFile()).catch(() => false)) errors.push(`Missing CSS resource: ${target.pathname}`);
    }
  }
}
// Clean output must not retain old routes or recruitment catalogs.
const allowed = new Set(['index.html', '404.html', 'robots.txt', 'build-report.json', '_crew', '_theme', '_local', 'services', 'examples', 'about', 'audit']);
for (const entry of await readdir('dist')) if (!allowed.has(entry)) errors.push(`Unexpected public output: ${entry}`);
const result = { pages: documents.size, assets: report.assets.length, errors: [...new Set(errors)] };
await writeJson('artifacts/audit.json', result);
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
