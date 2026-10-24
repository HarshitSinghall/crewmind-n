import { readFile, readdir, copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve, relative } from 'node:path';
import { build as bundle } from 'esbuild';
import { readJson, write, writeJson, within } from './lib/io.ts';
import type { Manifest } from './lib/types.ts';
import { renderCrewmind, robotsText, sitemap } from './lib/crewmind.ts';
import { pages } from '../src/content/crewmind.ts';
import { images, crops, placements, imageUrl } from '../src/content/imagery.ts';
import type { ImageId, Crop } from '../src/content/imagery.ts';
import { heroPhotoIds, heroPhotoUrl } from '../src/content/hero-photography.ts';
import { exampleMockups, exampleMockupUrl, type ExampleMockupId } from '../src/content/example-mockups.ts';
import { lowerVisuals, lowerVisualUrl, type LowerVisualId } from '../src/content/lower-visuals.ts';
import { serviceVisualIds, serviceVisualUrl } from '../src/content/service-visuals.ts';

// Only presentation dependencies are deployed. Captured recruitment content stays in source.
const manifest = await readJson<Manifest>('snapshot/manifest.json');
const output = resolve('dist');
if (relative(process.cwd(), output) !== 'dist') throw new Error('Unsafe build directory');
await rm(output, { recursive: true, force: true });
const themePrefix = '/wp-content/themes/sphere-digital-recruitment/dist/';
const dependencies = manifest.assets.filter(asset => asset.status === 200 && !asset.error &&
  (asset.path.startsWith(themePrefix) || asset.path === '/wp-includes/js/jquery/jquery.min.js'));
const assetMap: Record<string, string> = {};
const paths: string[] = [];
for (const asset of dependencies) {
  const target = asset.path.startsWith(themePrefix) ? asset.path.replace(themePrefix, '/_theme/') : '/_theme/jquery.js';
  assetMap[asset.url] = target;
  const destination = within('dist', target);
  await mkdir(dirname(destination), { recursive: true });
  if (target.endsWith('.css')) {
    const css = await readFile(within('snapshot/assets', asset.path), 'utf8');
    await write(destination, css.replaceAll(themePrefix, '/_theme/'));
  } else if (target === '/_theme/js/app.min.js') {
    const source = await readFile(within('snapshot/assets', asset.path), 'utf8');
    // The preserved carousel dispatches synthetic resize events after images load.
    // Close menus only for an actual viewport change, not a carousel settling.
    const before = 'window.addEventListener("resize",(()=>{Slate.elements.body.element.classList.contains("menu-open")';
    const after = 'var crewMenuWidth=window.innerWidth,crewMenuHeight=window.innerHeight;window.addEventListener("resize",(()=>{if(crewMenuWidth===window.innerWidth&&crewMenuHeight===window.innerHeight)return;crewMenuWidth=window.innerWidth;crewMenuHeight=window.innerHeight;Slate.elements.body.element.classList.contains("menu-open")';
    if (source.split(before).length !== 2) throw new Error('Theme menu patch needs review after snapshot changes.');
    await write(destination, source.replace(before, after));
  } else await copyFile(within('snapshot/assets', asset.path), destination);
  paths.push(target);
}
const raw = await readFile('snapshot/pages/index.html', 'utf8');
for (const page of pages) await write(within('dist', `${page.route}/index.html`), renderCrewmind(raw, page.route, assetMap));
await write('dist/404.html', renderCrewmind(raw, '/404/', assetMap));
await mkdir('dist/_crew/images', { recursive: true });
for (const id of Object.keys(images) as ImageId[]) for (const crop of Object.keys(crops) as Crop[]) for (const small of [false, true]) {
  const path = imageUrl(id, crop, small);
  await copyFile(`src/images/${path.split('/').at(-1)}`, within('dist', path));
  paths.push(path);
}
for (const id of heroPhotoIds) for (const small of [false, true]) {
  const path = heroPhotoUrl(id, small);
  await copyFile(`src/images/${path.split('/').at(-1)}`, within('dist', path));
  paths.push(path);
}
for (const id of Object.keys(exampleMockups) as ExampleMockupId[]) for (const small of [false, true]) {
  const path = exampleMockupUrl(id, small);
  await copyFile(`src/images/${path.split('/').at(-1)}`, within('dist', path));
  paths.push(path);
}
for (const id of Object.keys(lowerVisuals) as LowerVisualId[]) for (const small of [false, true]) {
  const path = lowerVisualUrl(id, small);
  await copyFile(`src/images/${path.split('/').at(-1)}`, within('dist', path));
  paths.push(path);
}
for (const id of serviceVisualIds) for (const small of [false, true]) {
  const path = serviceVisualUrl(id, small);
  await copyFile(`src/images/${path.split('/').at(-1)}`, within('dist', path));
  paths.push(path);
}
await writeJson('dist/_crew/images/manifest.json', { images, crops, placements, heroPhotography: { subjects: heroPhotoIds, generated: true }, exampleMockups, lowerVisuals, serviceVisuals: serviceVisualIds });
paths.push('/_crew/images/manifest.json');
// Keep supplied brand assets in the repository so deployments are self-contained.
await mkdir('dist/_crew/brand', { recursive: true });
for (const file of await readdir('src/brand')) {
  if (!/\.(svg|png|ico)$/.test(file)) continue;
  await copyFile(`src/brand/${file}`, `dist/_crew/brand/${file}`);
  paths.push(`/_crew/brand/${file}`);
}
await write('dist/_crew/site.css', await readFile('src/crewmind.css', 'utf8'));
await bundle({ entryPoints: ['src/crewmind.ts'], outfile: 'dist/_crew/site.js', bundle: true, target: 'es2022', format: 'iife' });
await bundle({ entryPoints: ['src/guard.ts'], outfile: 'dist/_local/guard.js', bundle: true, target: 'es2022', format: 'iife' });
paths.push( '/_crew/site.css', '/_crew/site.js', '/_local/guard.js');
await writeJson('dist/_local/routes.json', pages.map(p => p.route));
await writeJson('dist/_local/redirects.json', {});
await write('dist/robots.txt', robotsText);
await write('dist/sitemap.xml', sitemap(pages.map(page => page.route)));
await writeJson('dist/build-report.json', { builtAt: new Date().toISOString(), pages: pages.length, assets: paths, auditDelivery: 'disabled', sourceSnapshotRetained: true });
console.log(`Crewmind built: ${pages.length} pages, branded 404, ${paths.length} assets. Audit delivery is disabled.`);
