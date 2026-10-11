# CrewMind — standalone Vercel website

This is the uploadable CrewMind website, with an email quotation demo and expanded agency content updated on 11 October 2026. It retains the original responsive design, local fonts, artwork, icons and layout. The Framer runtime and analytics scripts are removed. Mobile navigation uses a small native JavaScript file. All required assets are included; deployment needs no Framer account or API key.

## Run locally

Use Node.js 22 or later. No dependency installation is required.

```powershell
cd crewmind-n
npm run dev
```

Open http://localhost:3000. To preview the production output, run `npm run build`, then `npm start`.

## Publish on Vercel

Upload this folder to a Git repository, then import that repository into Vercel. For this repository, use the repository root (`.`) as **Root Directory**.

- Framework preset: **Other**
- Build command: `npm run build`
- Output directory: `dist`
- Install command: leave the default; there are no dependencies.

`vercel.json` supplies these settings and enables `/privacy` and `/terms` without file extensions. Alternatively, run `npx vercel` from this folder, sign in, and follow its prompts. Use `npx vercel --prod` when ready for production.

This repository contains the deployable standalone website at its root. The original agency workspace also provides an upload ZIP; no ZIP extraction is needed here.

Optional build environment variables:

- `SITE_URL`: your final HTTPS origin, for example `https://crewmind.example`. Adds canonical URLs and absolute social-image URLs.
- `PUBLIC_INDEXING=true`: removes the original preview's `noindex` metadata. Leave unset while reviewing.

Rebuild after changing either value.

## Brand assets

All three pages use the supplied black SVG lockup in the navigation and footer, with matching light/dark favicons, an Apple touch icon and the supplied social image. Deployed copies live in `src/assets/brand/`; originals remain in the separate agency workspace. Logos retain their proportions, accessible names and reserved space.

## Edit

`src/index.html`, `src/privacy.html` and `src/terms.html` contain the complete pages and original responsive styles. Search for visible copy to edit text. `src/assets/` contains the bundled artwork and fonts; `asset-manifest.json` maps the source asset URLs to local files. `src/site.css` contains standalone overrides. `src/site.js` implements the mobile menu. Edits are independent of Framer and do not synchronize back to the editor.

The generated Framer class names are retained to preserve the design accurately. This is HTML/CSS source, not a reconstructed React component library. No Framer subscription, service, account or API key is needed to serve it.

## Current behavior and launch inputs

Discovery-call links on all three pages open the existing published Calendly destination directly. Shared footers show published business contact channels separately from the demo inbox. No scheduler embed, enquiry backend, account system or analytics integration is added. Preview policies remain pending approval; confirmed domain, final business identity and public policy approval remain launch work. No Framer or live deployment was changed.

### Agency content

The four core services remain. Six compact capability cards extend the scope, and seven workflows are explicitly illustrative rather than client results. Leadership appears in text cards; artwork still represents AI agents. Approach and process cover named ownership, baseline measurement, representative failure tests and operating handoff. No testimonials, imported pricing, company registration details or response-time guarantees are added.

Content sources reviewed on 11 October 2026: https://crewmind.in/services, https://crewmind.in/about and https://crewmind.in/past-projects. Leadership roles follow the supplied brief. These sources inform content only; this standalone site does not synchronize with them.

### Email quotation demo

`/#email-demo` lists the three verified synthetic ACME Bearings products, four required request fields and exact `[CrewMind Demo]` email subject. The email button opens the visitor's email app with a valid request filled in. Visitors review and send it themselves; the existing Gmail/n8n quotation processor supplies the reply. No new website backend, credentials or database connection is needed. Sample TXT and catalogue CSV downloads live in `src/samples/`.

Supported formats, quotas, unsupported messages, reply expectations and fictional-price boundaries are available in native keyboard-accessible disclosure panels. `/privacy#email-demo-privacy` describes provider processing and retention. These instructions and downloads work without JavaScript. The static catalogue must be updated when approved database products change; it does not synchronize automatically.

The Framer hosting badge and editor toolbar are excluded from the standalone website. Hero artwork is visible immediately; native anchor scrolling respects reduced motion.

## Verification

Browser QA passed in the original agency workspace before publication. Reports are copied into `verification/`; screenshots and Playwright/axe tools remain in that workspace. Build validation rejects missing page content and remote Framer/font asset dependencies. No dependencies are needed to build or serve this repository.

## Repository transition

This commit replaces the earlier React/Vite website and demo API with the owner-selected standalone site. Earlier routes and the demo API are not part of the new site. Git history preserves the previous implementation. `docs/reference/` and `docs/superpowers/` are historical research/planning, not current architecture. Current routes are `/`, `/privacy` and `/terms`. Hosting connected to this repository may rebuild automatically on push; actual deployment status must be checked separately.
