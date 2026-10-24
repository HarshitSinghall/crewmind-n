# Product progress

## AWS crawler remediation release - 2026-10-24

The live site blocked all crawlers in robots.txt, HTML metadata, and HTTP headers. The owner authorized publishing the correction. This release changes only crawl permissions, canonical/social URLs, sitemap generation, related audits/tests, and handoff documentation. The five-page presentation and disabled request form remain unchanged. Unpublished bookkeeping work stays in a separate working branch.

Production builds now permit crawling. Vercel preview/development builds remain blocked, and the branded 404 remains noindex. Local preview headers remain noindex. The read-only public check records HTTP status, discovery metadata, and basic bot-user-agent responses; it does not impersonate or fully reproduce AWS's private verifier.

Release verification passed: TypeScript, all 10 unit tests, production build, static audit (six HTML documents, 195 assets, zero errors), and all 30 Chromium scenarios. The browser suite ran after the completed build. No visual or form behavior changed.

Commit ba4318f was pushed to main and Vercel reported successful deployment. Live checks confirmed all five content routes return 200 with index,follow HTML, correct canonical URLs, and no blocking X-Robots-Tag. robots.txt permits all crawlers and links to a working XML sitemap. Unknown URLs still return 404 with noindex metadata. Amazonbot and Googlebot user-agent probes return 200. This verifies the public technical fix, not AWS approval.

Outstanding: authoritative DNS lacks Google Workspace MX records, and Vercel browser access is denied by a saved permission setting. Signed-in Google Admin confirms domain ownership is verified and flags MX and DKIM as incorrect and SPF as missing; the existing DKIM selector is google._domainkey. No email records, mailbox settings, application, or support message have been changed. Operator details, a working contact route, and AWS eligibility confirmation for the actual agency business remain open. Crawler repairs do not guarantee approval.

## Deployment configuration encoding — 2026-10-20

The reported Vercel error was `Invalid vercel.json file provided`. The committed file began with a UTF-8 byte-order mark (EF BB BF). Strict JSON parsing reproduced the failure before any build could run. Removed only that encoding prefix; all deployment settings remain unchanged. Added a unit regression check that reads and parses the actual vercel.json without stripping encoding prefixes. The check failed on the original file and passed after correction. No Vercel account or project settings were changed.

## Deployment repository cleanup — 2026-10-20

Prepared the current five-page Crewmind presentation for repository-root Vercel builds. Moved research, image masters, old reports, capture tooling, unused source modules, historical recruitment tests, and the full reference snapshot to ../website-archive/2026-10-20. Retained only the homepage presentation template, minimal manifest, and 22 required theme assets from that snapshot.

Removed obsolete package commands and generator/image-comparison dependencies. Retained build, development, preview, type checking, current unit/browser tests, static audit, visual capture, and GitHub verification workflow. Updated README, context, architecture, operations, and related handoff documents for the new paths and deployment settings.

The archive contains the original documents and metadata, cleanup-record.json, and hashes of pre-cleanup public output. Repository publication preserves existing GitHub history. Requests and indexing remain disabled. Connecting Vercel, verifying its deployment/domain, and enabling real lead delivery are separate remaining tasks.

## Verification

- Fresh npm ci succeeded with zero reported vulnerabilities. Type checking passed.
- All eight retained unit tests passed. The original 18-test suite also passed before archiving historical recruitment/catalog coverage.
- Clean production build and static audit passed: five public pages, branded 404, 195 assets, and zero audit errors.
- All 204 deterministic production files match the pre-cleanup SHA-256 baseline. The time-varying build report is excluded.
- All 29 Chromium browser scenarios passed on a completed build. An earlier overlapping build/browser run briefly served the local missing-output response to one tablet scenario; the serial rerun passed without product changes.
- The staged files contain no common credential signatures or environment/key files. This check is not a full security audit.

GitHub's first Linux build exposed an inherited broad dist/ ignore rule that also excluded nested theme dependencies. Scoped the rule to /dist/ and committed all 22 required theme assets. A clean checkout must contain every asset listed in snapshot/manifest.json; local filesystem presence alone is insufficient proof of deployment completeness.

Generated verification reports are retained in the local archive. Dependencies are cached in ../node_modules on this workstation; a fresh checkout uses npm ci normally. Build output and local verification reports are kept outside the final source folder after verification. Git ignores these generated directories if future commands recreate them.
