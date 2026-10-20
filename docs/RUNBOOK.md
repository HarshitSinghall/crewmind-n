# Operations

## Local build and verification

Use Node.js 24. Run npm ci, npm run typecheck, npm test, npm run build, npm run audit, and npm run test:e2e. Install Chromium using npx playwright install chromium if required. npm run test:visual captures the five pages at four widths. Build must finish before audits or browsers read dist.

npm run dev serves port 5173 and rebuilds source changes. npm run preview serves the built dist on port 4173. If the Windows tsx launcher fails, Node.js 24 can run scripts/build.ts, scripts/audit.ts, and tests/unit/*.test.ts directly. Never use archived snapshot/capture builders to publish the site.

## Vercel

Import the GitHub repository and deploy main. Root Directory is ./ (the repository already contains the website root). Use Other framework, Node.js 24.x, npm ci, npm run build, and dist. No environment variables are needed. Commit source/template/delivery assets; do not commit node_modules or dist. No Vercel project creation or connection is implied by a Git push.

After deployment, verify /, /services/, /examples/, /about/, /audit/, an unknown route returning 404, images/fonts, mobile menu, carousel, and accordion. Confirm the request form remains unavailable and robots restrictions remain until deliberately configured. No live URL is recorded until hosting is verified.

## Recovery and archive

Use Vercel's previous deployment or revert the relevant Git commit to recover a published version. Existing repository history is preserved. The local ../website-archive/2026-10-20 contains the full pre-cleanup snapshot, image masters, removed utilities, research, prior documentation, and cleanup record. It is not part of a fresh checkout and must never become a runtime dependency. Normal builds only need retained files.

For image changes requiring regeneration, restore the specific archived generator and masters in a separate working area, review outputs, and copy approved delivery WebPs into src/images/. Keep fictional/sample labels and image dimensions accurate.
