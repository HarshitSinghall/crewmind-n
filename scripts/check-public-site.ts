import * as cheerio from 'cheerio';
import { writeJson } from './lib/io.ts';

// Read-only external checks; never submit forms or follow contact links.
const origin = 'https://www.crewmindhq.com';
const routes = ['/', '/services/', '/examples/', '/about/', '/audit/', '/robots.txt', '/sitemap.xml', '/aws-check-missing-page/'];
const results = [];
for (const route of routes) {
  try {
    const response = await fetch(`${origin}${route}`, { signal: AbortSignal.timeout(20000) });
    const body = await response.text();
    const $ = cheerio.load(body);
    $('script,style').remove();
    results.push({ route, status: response.status, url: response.url,
      contentType: response.headers.get('content-type'), robotsHeader: response.headers.get('x-robots-tag'),
      robotsMeta: $('meta[name="robots"]').attr('content'), canonical: $('link[rel="canonical"]').attr('href'),
      title: $('title').text(), h1: $('h1').text().trim(),
      contactLinks: $('a[href^="mailto:"],a[href^="tel:"]').length,
      forms: $('form').length, disabledForms: $('form fieldset[disabled]').length,
      text: route.endsWith('.txt') ? body : $('main').text().replace(/\s+/g, ' ').trim().slice(0, 500) });
  } catch (error) { results.push({ route, error: String(error) }); }
}
// These names probe bot filtering, not the identity of AWS Activate's actual crawler.
for (const userAgent of ['Amazonbot', 'Googlebot']) {
  try {
    const response = await fetch(origin, { headers: { 'User-Agent': userAgent }, signal: AbortSignal.timeout(20000) });
    results.push({ userAgent, status: response.status, robotsHeader: response.headers.get('x-robots-tag') });
  } catch (error) { results.push({ userAgent, error: String(error) }); }
}
await writeJson('artifacts/aws-public-check.json', { checkedAt: new Date().toISOString(), results });
console.log(JSON.stringify(results, null, 2));
