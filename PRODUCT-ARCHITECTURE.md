# Product architecture

Source pages: `src/index.html`, `src/privacy.html`, `src/terms.html`. Shared styling and native mobile navigation: `src/site.css`, `src/site.js`. Fonts, artwork and supplied brand assets are local. Content, booking, navigation and demo instructions are usable without JavaScript.

`node build.mjs` copies source into `dist/` and optionally configures canonical/social URLs from `SITE_URL`; `PUBLIC_INDEXING=true` removes preview noindex. `server.mjs` provides local preview. `vercel.json` sets the dependency-free build, `dist` output and clean policy routes. Use repository root for hosting.

No website APIs or credentials. The email quotation demo is a static catalogue snapshot, downloads and a mailto request; visitors send through their email app to an independently operated processor. Scheduling/contact links are external. The old demo API, React source and Vite configuration are removed; history retains them.

Historical `docs/reference/` and `docs/superpowers/` do not describe current deployment.
