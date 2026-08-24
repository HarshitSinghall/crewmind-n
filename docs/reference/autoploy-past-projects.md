# autoploy.us/past-projects — captured 2026-08-24

**SEO title:** AI Automation Case Studies | Real Results
**SEO description:** See how we've helped businesses automate sales, customer support, lead gen, and operations with custom AI agents and workflows.

## Hero
- Eyebrow: Success Stories
- H1: Real Results From Real Clients
- Sub: Every project below is a real business we helped, or based on real client work. No fluff, no fake metrics.

## Filter taxonomy

The reference filters via `?category=<slug>`, and every slug matches a service
slug — which is what `projects.ts` reproduces, and what `content.test.ts`
asserts stays true.

`All` · `ai-personal-assistants` · `lead-gen-outreach` · `ai-call-centers` ·
`social-media-automation` · `ai-copywriting` · `ai-agent-team` · `geo` ·
`custom-ai-solutions`

**`geo` has no projects.** The reference still renders the chip, so it leads
to an empty grid. Our version hides a zero-count chip and drops the related-
work block on the GEO service page — see `PastProjects.tsx` and
`PastProjects.test.tsx`.

## Client identities — the departure

The reference credits named individuals and named client brands, and links
their live social accounts and websites:

| Reference credit | Our descriptor |
|---|---|
| Karan (@totsyscan) | Personal Brand, Health Tech |
| Dr. Bill / BRO Clinics | Orthodontic Practice, Southern California |
| Dr. Steve / SFG Capital | Injury Services Firm / Specialty Finance Firm |
| Dean, SFG Capital | Specialty Finance Firm |
| Mick / Tommy, TONGAL AI | Creator Relations Team |
| Dr. Steve, Dreas Healthcare | Healthcare Group, Ohio |
| La Truie (@latruie.hq) | DTC Food Brand |
| Prime1Sports (@prime1sports) | Sports Media Brand |
| Zest Cleaning (cleanwithzest.com) | Cleaning Services Company |

Sector, scale, challenge, solution, metrics and stack are transcribed as
written. Names, handles, and outbound links are not. `content.test.ts`
asserts none of the above names reappear in the shipped content.

## Projects captured

~40 case studies were on the page. `projects.ts` carries 30, chosen to cover
every non-empty category with at least three entries. The ones left out are
near-duplicates of an entry already included (several near-identical lead-gen
scrapers, and four cybersecurity engagements that map to no service on the
current list).

Each entry keeps: client descriptor, recency, impact line, tags, challenge
paragraph, solution paragraph.

## Close
- Eyebrow: Have a similar challenge?
- Title: Let's talk about your project.
- CTA: Book a FREE Strategy Call

## Also dropped

Every card in the reference carries a "Show Images" / "Images Not Authorized"
/ "Show Video" control. There are no images to ship, so `ProjectGrid` renders
no media affordance at all rather than a button that reveals nothing.
