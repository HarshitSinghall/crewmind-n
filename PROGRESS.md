# Product progress

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

Generated verification reports are retained in the local archive. Dependencies are cached in ../node_modules on this workstation; a fresh checkout uses npm ci normally. Build output and local verification reports are kept outside the final source folder after verification. Git ignores these generated directories if future commands recreate them.
