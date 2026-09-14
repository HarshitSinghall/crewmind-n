# Public content readiness

Updated 12 September 2026.

## Completed

- The homepage, pricing, about, service, automation, and enterprise capability
  copy now uses original Crewmind language.
- Unapproved price bands, universal delivery timelines, money-back promises,
  volume claims, review scores, and outcome guarantees were removed.
- All third-party testimonials and aggregate ratings were removed from the
  public pages. The underlying collections remain empty until Crewmind has
  documented permission and a verifiable source for each entry.
- Invented team profiles remain removed. The about page now renders three
  user-approved leadership profiles with supplied portraits and roles.
- The supplied Crewmind logo pack now provides the responsive header and
  footer lockups, favicon, touch/PWA icons, and social-sharing image.
- The placeholder social link was removed. Calendly, email, phone, WhatsApp,
  entity, GSTIN, and location continue to use the configured Crewmind values.
- The placeholder homepage video is not rendered.
- The former borrowed project catalogue remains replaced by original Crewmind
  system blueprints and clearly attributed public references.
- `/privacy` and `/terms` now contain substantive public documents.
- The demo form requires affirmative consent and the server rejects a valid
  phone number when that consent is absent.

## Explicit exception

The enterprise case-study block was left unchanged by direct instruction. It
still requires separate evidence and publication approval. Do not infer that
this content sweep verifies or approves those claims.

## Still required before public launch

- Have qualified counsel review the privacy policy, terms, demo-call consent,
  retention language, processor disclosures, and governing-law wording.
- Verify that operational retention and deletion match the published privacy
  policy. The product handoff currently records that cleanup execution has not
  been verified.
- Complete keyboard, mobile, reduced-motion, light/dark contrast, link, and
  browser-level form QA.
- Resolve every test failure and warning, then run the production build.
- Keep the live demo unavailable until its provider, tenant, contact-policy,
  opt-out, completion, and authorised-fixture gates are accepted.

## Verification commands

```text
npm test
npm run typecheck
npm run build
rg -n -i "placeholder|example\.(com|us)|autoploy" src
```
