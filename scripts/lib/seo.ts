export const siteOrigin = 'https://www.crewmindhq.com';
// Vercel previews stay out of search; production and standalone builds are crawlable.
export const indexable = !['preview', 'development'].includes(process.env.VERCEL_ENV || '');
export const robotsText = indexable
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n';

export function sitemap(routes: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${siteOrigin}${route}</loc></url>`).join('\n')}\n</urlset>\n`;
}
