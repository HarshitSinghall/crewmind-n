# AWS Activate follow-up

Do not resubmit until the deployed site and business inbox have been checked. The website repair removes the reported crawler barrier; AWS still decides eligibility.

Website status: commit ba4318f is deployed and live crawler checks pass. Google Admin confirms domain ownership is verified but flags incorrect MX/DKIM and missing SPF. DNS repair and an actual email receipt test are still outstanding.

## Remaining owner/account actions

- Allow browser access to vercel.com so the missing Google Workspace MX record can be repaired. The authoritative DNS provider is Vercel. The root MX destination recommended by Google is smtp.google.com, priority 1, using the provider's default TTL.
- Google Admin is accessible and domain ownership is verified. Complete Gmail setup after DNS repair; confirm licensing and account status if mail still fails. Use the existing DKIM selector and public key shown there. Do not put account details or keys in this document.
- Confirm all outbound mail providers before publishing a single combined SPF record. For Google Workspace alone the value is v=spf1 include:_spf.google.com ~all. Configure DMARC after verifying SPF/DKIM alignment.
- Verify incoming mail and replies using an independent mailbox after DNS propagation. DNS correctness alone is not proof of receipt.
- Supply the approved public operator identity and contact destination. The website currently accepts no requests. Do not publish invented contact details or imply a working request flow.
- Verify founding date, funding stage, prior Activate awards, Paid Tier account, and consistent company/domain information. Free Tier credit and Activate credit are distinct programs.

## Draft eligibility question

Send through the application's Contact us route after confirming the actual release status. This draft has not been sent.

> Our AWS Activate Founders application for Crewmind was declined because AWS could not validate our website. Crewmind is an automation services agency. We identified crawler-blocking rules on our public website and have prepared corrections. Before resubmitting, could you confirm whether our agency business model and intended use of credits qualify for Activate Founders, or whether the AWS Partner Network Services Path is more appropriate? Please also confirm whether any validation requirements beyond public website access and matching business email remain outstanding.

Once live checks pass, replace “have prepared corrections” with “have deployed and verified corrections” and include https://www.crewmindhq.com/, /robots.txt, and /sitemap.xml. Add the application reference privately in the support form, not in this repository. Do not state that email delivery is repaired until an actual receipt test succeeds.

## Sources

- https://aws.amazon.com/startups/credits/
- https://aws.amazon.com/aws-startups/learn/applying-for-aws-activate-credits-a-step-by-step-guide/
- https://aws.amazon.com/partners/paths/
- https://support.google.com/a/answer/6156494
- https://support.google.com/a/answer/33786
