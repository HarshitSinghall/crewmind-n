import type { RatingSource, Testimonial } from './types'

/* ---------------------------------------------------------------------------
   PLACEHOLDER CONTENT — see CONTENT-SWAP.md

   ONE array, deduped. The reference site emits its entire review set twice
   in the homepage DOM (and again on every service page). The seamless
   marquee loop is achieved in <Marquee> with an aria-hidden visual clone,
   so assistive tech and the DOM only ever see each review once.
--------------------------------------------------------------------------- */

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'tommy-reid-1',
    name: 'Tommy Reid',
    date: 'Jun 2026',
    body: 'Exceeded my expectations from start to finish. Their team truly understands how to build high-end AI infrastructure and autonomous systems tailored specifically to your business goals. Professional, innovative, and incredibly easy to work with.',
    initials: 'TR',
  },
  {
    id: 'tommy-reid-2',
    name: 'Tommy Reid',
    date: 'Jul 2026',
    headline: 'Second Review',
    body: 'Helps those in need of AI lead bots for whatever task they like, lead gen for marketing efforts and more.',
    initials: 'TR',
  },
  {
    id: 'marcella-yip',
    name: 'Marcella Yip',
    date: 'Jul 2026',
    headline: 'Good service for AI infrastructure',
    body: 'Good service for AI infrastructure!',
    initials: 'MY',
  },
  {
    id: 'beng-rui-han',
    name: 'Beng Rui Han',
    date: 'Jul 2026',
    body: 'Helped us a lot with our systems. We are a small banking firm in Shenzhen and before everything was quite messy, but now most workflows are automated and we have a big knowledge base. The AI setup they built in around 1 month is very useful and will help us for a long time.',
    initials: 'BH',
  },
  {
    id: 'dave-homes',
    name: 'Dave Homes',
    date: 'Jun 4, 2026',
    body: 'The business owner was very helpful throughout the process, and was very honest and provided me with helpful insights into other aspects on top of his services.',
    initials: 'DH',
  },
  {
    id: 'andy-watkins',
    name: 'Andy Watkins, JD',
    date: 'Mar 8, 2026',
    headline: 'Easy to book and get the work done',
    body: 'Easy to book and get the work done. Will use them again!',
    initials: 'AW',
  },
  {
    id: 'chris-mateo',
    name: 'Chris Mateo',
    date: 'Feb 28, 2026',
    body: 'Great service and support — they got me set up and running in 2 days!',
    initials: 'CM',
  },
  {
    id: 'darach-gannon',
    name: 'Darach Gannon',
    date: 'Feb 26, 2026',
    body: 'I had set up the framework myself but hit some problems with memory. The team talked me through a total reset and reinstall. Working great now. They also helped with connecting to email and setting up scheduled tasks.',
    initials: 'DG',
  },
  {
    id: 'dan-shepard',
    name: 'Dan Shepard',
    date: 'Jul 24, 2026',
    body: "The team are wizards when it comes to setting up AI for legitimate systems, use cases, and business needs. I've been impressed to say the least and have seen firsthand their ability to work and communicate well and quickly, traits you would want to find in any partner.",
    initials: 'DS',
  },
  {
    id: 'kibeak-yen',
    name: 'Kibeak Yen',
    meta: 'US',
    date: 'Mar 12, 2026',
    headline: 'Literally just automated my real estate business',
    body: 'Literally just automated pretty much all the tedious errands I had to do for my business with their help. Made me an entire AI agent system around my real estate business.',
    initials: 'KY',
  },
  {
    id: 'marcus-yeung',
    name: 'Marcus Yeung',
    meta: 'US',
    date: 'Mar 5, 2026',
    headline: 'Did everything I needed to automate my business',
    body: 'Did everything I needed to automate my business, super helpful and so fast.',
    initials: 'MY2',
  },
]

export const RATINGS: RatingSource[] = [
  { id: 'google', platform: 'Google Reviews', score: '5.0', href: '#' },
  { id: 'trustpilot', platform: 'Trustpilot', score: '4.5', href: '#' },
]
