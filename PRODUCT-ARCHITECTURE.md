# Product architecture

## Static build

scripts/build.ts reads snapshot/pages/index.html and the minimal snapshot/manifest.json. The manifest lists only 22 theme dependencies. scripts/lib/crewmind.ts and scripts/lib/walkthrough.ts render content from src/content/ into five allowlisted pages and a branded 404. scripts/lib/transform.ts strips original backend and tracking behavior. Theme assets are copied to /_theme/; committed delivery images and branding are copied to /_crew/.

The guarded theme patch preserves menu behavior when carousels emit synthetic resize events. esbuild bundles src/crewmind.ts and src/guard.ts. The build cleans dist before writing output. No image generation, original-site access, capture tools, or local archive is needed. The retained snapshot template is a build input, not a route served directly.

## Browser and hosting

The preserved theme handles the hero grid, globe, carousels, menu, accordion, and scroll effects. Crewmind scripts add keyboard support, focus handling, linked FAQ behavior, and unavailable-form behavior. Reduced-motion styling remains. src/guard.ts blocks original backend/tracking calls.

scripts/serve.ts serves dist locally with GET/HEAD only, a noindex header, and the branded 404. Vercel builds the repository root using Node.js 24, npm run build, and dist output. vercel.json retains trailing slash handling without a blanket noindex header. scripts/lib/seo.ts emits production crawl permissions, absolute canonical/social URLs for https://www.crewmindhq.com, and a sitemap. VERCEL_ENV=preview or development blocks crawling in robots.txt and HTML. No manually configured environment variables are required.

## Repository boundaries

src/, required scripts, and the minimal snapshot are deployment inputs. Current tests and static audit verify the presentation. Historical recruitment tests, unused runtime/catalog code, capture utilities, lossless masters, and research are preserved outside the repository in ../website-archive/2026-10-20. Recreating an image export requires the archived masters/tools; ordinary builds use committed WebPs and do not need that archive.
