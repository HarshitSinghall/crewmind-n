# Crewmind website

Five static pages: Home, Services, Examples, About, and First Automation at /audit/, plus a branded 404. The site uses committed images and a preserved presentation template. Builds do not contact the original reference website.

## Run locally

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:5173. Source changes rebuild automatically; refresh the browser to view them.

```sh
npm run build
npm run preview
```

Preview serves dist at http://localhost:4173.

## Deploy with Vercel

Import this GitHub repository. The repository root is the website; leave Root Directory empty or use ./.

- Framework preset: Other.
- Node.js version: 24.x.
- Install command: npm ci.
- Build command: npm run build.
- Output directory: dist.
- Environment variables: none required.

vercel.json defines the build, output directory, trailing slashes, and current noindex response header. No original backend, authentication, tracking, or form submission is enabled. The First Automation request form remains disabled. Publishing the presentation does not activate requests or search indexing.

## Files

- src/: website content, browser behavior, styles, branding, and delivery images.
- scripts/: build, local server, static audit, and visual verification with their required helpers.
- snapshot/: only the homepage template, minimal manifest, and 22 required theme assets.
- tests/, playwright.config.ts, and .github/: automated deployment checks.
- docs/ and root handoff files: current product and deployment guidance.

Original image masters, research, capture utilities, historical tests, full snapshot, and old reports were moved to ../website-archive/2026-10-20 on the local workstation. They are not required for deployment and are not uploaded. The archive records the moves and contains the pre-cleanup production hashes. node_modules, dist, and generated test reports are ignored by Git.

The workstation's installed dependencies were moved to ../node_modules, which Node/npm can resolve locally. Generated output and verification reports are archived after checks. A fresh checkout remains self-contained: npm ci installs dependencies and npm run build recreates dist.

## Verify

```sh
npm run typecheck
npm test
npm run build
npm run audit
npx playwright install chromium
npm run test:e2e
```

npm run test:visual captures all five routes at four widths. Screenshots do not certify exact animated fidelity. See docs/RUNBOOK.md for deployment and recovery, and docs/GO-LIVE-CHECKLIST.md for remaining lead-generation launch inputs.
