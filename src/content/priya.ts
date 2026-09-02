import { BRAND } from './site'
import type { HeroProductContent, PriyaContent } from './types'

/* ---------------------------------------------------------------------------
   Priya — the flagship product.

   REAL CONTENT. Not placeholder. Every figure here is a real price, a real
   measurement, or a real limitation, and the copy sweep described in
   CONTENT-SWAP.md must leave this file alone.

   Three things are deliberately ABSENT and must stay absent:

   1. Market-audit statistics. A previous version of this pitch published
      "31 brokerages tested, median callback 14h 20m, 9 never called" as a
      first-person measurement with a stated methodology. It was never run —
      checked against the live database and it returns zero tested rows. The
      page makes its entire argument without it. Do NOT populate this from a
      deck, a memory, or an estimate.
   2. A call recording. `call.recordingUrl` stays null until a real file is
      dropped at public/audio/, and while it is null the transcript is
      labelled representative rather than actual. When a recording lands, the
      transcript must be replaced with the transcript OF THAT RECORDING.
   3. Testimonials, client counts and outcome metrics. There are none. The
      founding-client block is the answer to "how many clients do you have".

   The one thing this whole sales motion rests on is being the company in
   this market that tells the truth about response times.
--------------------------------------------------------------------------- */

const LIVE_DEMO = '#demo-call'
const WA_DEAD_LEADS = BRAND.whatsapp(
  'I want to send fifty old leads for the free test.',
)

export const PRIYA: PriyaContent = {
  seo: {
    title: 'Priya — Every Lead Called In 60 Seconds, In Hindi, At 2am',
    description:
      'Your leads arrive at midnight. Your team starts at ten. Priya calls every property enquiry within sixty seconds, qualifies it in Hindi, and sends the card to your WhatsApp.',
  },

  hero: {
    eyebrow: 'Delhi NCR · Real estate',
    headline: {
      lead: 'Your leads arrive at midnight. Your team',
      emphasis: 'starts at ten',
      trail: '.',
    },
    sub: 'Priya calls every enquiry within sixty seconds, in Hindi, at 2am. Budget, timeline, financing — asked and answered. The card lands on your WhatsApp before your telecaller wakes up.',
    cta: {
      primary: { label: 'Call me now', href: LIVE_DEMO },
      secondary: { label: 'Test it on dead leads', href: '#dead-lead' },
    },
    assurances: [
      'No login, no app',
      'No new number to advertise',
      'Your leads land where they already land',
    ],
    clock: {
      label: "Last night's 11:40pm lead has now been waiting",
      sinceHour: 23,
      sinceMinute: 40,
      foot: 'This is the ordinary case, not the worst one.',
    },
    trust:
      'Nothing on your side changes. Your forms stay where they are, your portal accounts stay where they are, and your hoardings do not change.',
  },

  demo: {
    eyebrow: 'Live system · Not a recording',
    title: 'Send one enquiry. Watch the whole system run.',
    sub: 'Enter an Indian mobile number and Priya will call it through the same production path a property lead uses. After the call, the outcome, transcript, follow-up and agent report move through the real dashboard workflow.',
    steps: [
      {
        title: 'Your phone rings',
        body: 'The request is screened, written as a lead and dispatched to Priya through Dograh.',
      },
      {
        title: 'Priya qualifies the enquiry',
        body: 'Answer naturally. Budget, timeline, financing and property interest are captured from the call.',
      },
      {
        title: 'The operations appear',
        body: 'The dashboard updates, the lead follow-up is routed to WhatsApp, and the assigned agent receives the post-call report.',
      },
    ],
    fields: {
      name: { label: 'Your name', placeholder: 'Rajesh Sharma' },
      phone: { label: 'Indian mobile number', placeholder: '98XXX XXXXX' },
      locality: { label: 'Locality', placeholder: 'Sector 65, Gurugram' },
      propertyInterest: {
        label: 'Property to ask about',
        placeholder: '3BHK under ₹1.5 Cr',
      },
    },
    submitLabel: 'Call me now',
    submittingLabel: 'Connecting Priya',
    whatsappLabel: 'WhatsApp instead',
    privacy: 'Only the mobile number is required. One demo call; no mailing list. Cooldowns and a daily safety limit apply.',
    success: {
      title: 'Priya is calling you now.',
      body: 'Pick up an unfamiliar Indian number. When the call ends, its result will continue through the dashboard, WhatsApp and agent-report pipeline.',
      rescueLabel: 'Nothing rang after three minutes',
    },
    fallback: {
      title: 'The automated request did not go through.',
      body: 'Your details are already prepared in WhatsApp. Send the message and we will inspect or trigger the demo manually.',
      rescueLabel: 'Continue on WhatsApp',
    },
    rescueMessage: 'Namaste. I want the live Priya demo call.',
  },

  sundayTest: {
    eyebrow: 'Run this yourself',
    title: "Don't take our word for it. Open last Sunday's leads.",
    sub: 'We could put a statistic here. You would discount it, and you would be right to, because you have been shown six of them this year. So here is a measurement you can run on your own business in ninety seconds, on data you already have. We are not in the room and we cannot fudge it.',
    steps: [
      {
        step: '01',
        title: 'Find the latest lead from last weekend',
        body: 'Your portal dashboard, your Meta lead form, your website enquiry sheet. Sort by time and find the one that came in after 9pm on Saturday or Sunday.',
      },
      {
        step: '02',
        title: 'Now find the first call to that number',
        body: "Your telecaller's call log, or just ask him. You want the timestamp, not the story.",
      },
      {
        step: '03',
        title: 'Subtract',
        body: 'That number is the whole conversation. Everything else on this page is about closing that gap to sixty seconds.',
      },
    ],
    pullQuote:
      'If the answer is under an hour, close this tab. You do not need us, and we would rather tell you now than take your setup fee and find out in month two.',
  },

  race: {
    eyebrow: 'The gap, in seconds',
    title: {
      lead: 'The same lead,',
      emphasis: 'two Tuesdays',
      trail: '.',
    },
    lanes: [
      {
        id: 'today',
        label: 'Your process today',
        steps: [
          { clock: '00:00', text: 'Enquiry lands. 11:40pm, Tuesday.' },
          { clock: '00:00', text: 'It goes into the WhatsApp group.' },
          { clock: '08:20', text: 'Everyone is asleep. So is the lead.' },
          { clock: '11:15', text: 'Someone gets to it the next morning.' },
          { clock: '14:20', text: 'First call. "Main dekh ke batata hoon."' },
          { clock: '', text: 'He spoke to three other brokers on Tuesday night.' },
        ],
      },
      {
        id: 'priya',
        label: 'With Priya',
        steps: [
          { clock: '00:00', text: 'Enquiry lands. 11:40pm, Tuesday.' },
          {
            clock: '00:02',
            text: 'Checked. Duplicate? Junk number? Already spoken to this week?',
          },
          { clock: '00:09', text: 'His phone is ringing.' },
          {
            clock: '01:34',
            text: 'Budget ₹1.2 to 1.45 Cr. Loan pre-approved. Wants Sector 65.',
          },
          { clock: '01:41', text: 'The card is on your WhatsApp.' },
          { clock: '', text: 'You are the first person he spoke to.' },
        ],
      },
    ],
    resolve: 'One minute forty-one seconds. The other clock is still running.',
    closing: 'Your competitor is not better than you. He is earlier.',
    proverb: 'जो पहले call करता है, वही बेचता है।',
  },

  cause: {
    eyebrow: 'Why it happens',
    title: 'It is not your team. It is the clock.',
    sub: 'Every brokerage we have looked at has the same three holes, and none of them are a performance problem.',
    items: [
      {
        id: 'midnight',
        title: 'The 11:40pm enquiry',
        body: 'People browse property in bed. That lead gets called at eleven the next morning, if it gets called at all. Ask your team what happens to a Sunday lead.',
      },
      {
        id: 'queue',
        title: 'Five leads in one hour',
        body: 'Your telecaller works through them in order. Leads three, four and five wait — and they were not standing still while they waited.',
      },
      {
        id: 'competition',
        title: 'He filled four forms, not one',
        body: 'A serious buyer enquires with three or four brokers in the same sitting. Whoever calls first has the conversation. Everyone else gets "main dekh ke batata hoon."',
      },
    ],
  },

  call: {
    eyebrow: 'Hear it',
    title: 'Thirty seconds in, you will know.',
    sub: 'The only question that actually matters is whether your buyers stay on the line after they are told they are talking to a machine. No slide answers that. This is a representative call, in Hindi, start to finish.',
    recordingUrl: null,
    turns: [
      {
        id: 't1',
        who: 'प्रिया',
        role: 'ai',
        lang: 'hi',
        line: 'नमस्ते, मैं प्रिया बोल रही हूँ, [brokerage] की AI असिस्टेंट। आपने अभी 3BHK के लिए enquiry की थी, दो मिनट लूँगी?',
      },
      { id: 't2', who: 'ग्राहक', role: 'human', lang: 'hi', line: 'हाँ बोलिए।' },
      {
        id: 't3',
        who: 'प्रिया',
        role: 'ai',
        lang: 'hi',
        line: 'बजट कितने तक सोच रहे हैं आप?',
      },
      {
        id: 't4',
        who: 'ग्राहक',
        role: 'human',
        lang: 'hi',
        line: 'एक सवा करोड़ तक, ज़्यादा नहीं।',
      },
      {
        id: 't5',
        who: 'प्रिया',
        role: 'ai',
        lang: 'hi',
        line: 'और possession, ready to move चाहिए या under construction चल जाएगा?',
      },
      {
        id: 't6',
        who: 'ग्राहक',
        role: 'human',
        lang: 'hi',
        line: 'ready to move ही चाहिए, दिवाली से पहले shift करना है।',
      },
      {
        id: 't7',
        who: 'प्रिया',
        role: 'ai',
        lang: 'hi',
        line: 'लोन की बात हो गई है किसी बैंक से?',
      },
      {
        id: 't8',
        who: 'ग्राहक',
        role: 'human',
        lang: 'hi',
        line: 'HDFC से pre-approved है।',
      },
    ],
    caption:
      'Notice the first sentence. She says she is an AI before she says anything else, on every call, without softening it. That is why people stay on the line instead of feeling tricked, and it is why this is defensible.',
  },

  mechanism: {
    eyebrow: 'How it works',
    title: 'Every lead gets a phone call in sixty seconds.',
    sub: 'In Hindi. At 2am. On Diwali.',
    steps: [
      {
        step: '0s',
        title: 'The enquiry lands',
        body: 'Your website, your Meta lead ad, or your portal account. Nothing on your side changes.',
      },
      {
        step: '2s',
        title: 'Checked and scored',
        body: 'Duplicate? Junk number? Already spoken to this week? Then it never gets dialled.',
      },
      {
        step: '<10s',
        title: 'His phone is ringing',
        body: 'Measured on our own system at 1.2 seconds from form to dial. The rest is the network.',
      },
      {
        step: '60–120s',
        title: 'Priya has the conversation',
        body: 'Budget, timeline, financing, which project. And she answers his questions about your inventory from your own price list.',
      },
      {
        step: '+5s',
        title: 'A card lands on your WhatsApp',
        body: 'Name, numbers, what he said, and a link to the recording.',
      },
    ],
    notes: [
      {
        id: 'disclosure',
        title: 'She says she is an AI in the first sentence',
        body: 'On every call, in his language, never softened and never moved to sentence two. That is not a compliance checkbox we resent — it is the reason the conversation works.',
      },
      {
        id: 'no-invention',
        title: 'She never invents a number',
        body: 'No price, no carpet area, no possession date, no RERA number unless it came out of your own price list. When she does not know, she says she will confirm and come back. A made-up price is the worst thing that can come out of a call, and it is the thing we designed hardest against.',
      },
    ],
  },

  leadCard: {
    eyebrow: 'What you receive',
    title: {
      lead: 'This lands on your WhatsApp.',
      emphasis: 'The rest is plumbing',
      trail: '.',
    },
    card: {
      name: 'Rahul Mehta',
      track: 'HOT',
      score: 87,
      rows: [
        { k: 'Phone', v: '+91 98XXX XXXXX' },
        { k: 'Budget', v: '₹1.2 – 1.45 Cr' },
        { k: 'Timeline', v: 'Immediate, shifting before Diwali' },
        { k: 'Financing', v: 'Loan pre-approved, HDFC' },
        { k: 'Wants', v: '3BHK, Sector 65, ready to move' },
      ],
      quote:
        'Site visit Saturday morning kar sakte hain, par 1.5 se upar nahi jaana hai.',
      actions: ['Recording', 'Transcript', 'Call back'],
      time: '11:42 pm',
      caption: 'Sample card, in the format your team receives.',
    },
    closing:
      'You are not buying an AI. You are buying a shorter list, with the reason each name is on it.',
  },

  followUp: {
    eyebrow: 'Follow-up',
    title: "The follow-up your team means to do, and doesn't.",
    sub: 'Four states, and the rules that govern each one.',
    items: [
      {
        id: 'no-answer',
        title: 'He did not pick up',
        body: 'Four attempts, spaced across hours and days, never at night. Then it stops. Nobody gets harassed and your number does not get flagged.',
      },
      {
        id: 'not-ready',
        title: 'He picked up but is not ready',
        body: 'Goes onto a WhatsApp follow-up track. Six minutes, two hours, three days — at whatever pace you set.',
      },
      {
        id: 'replied',
        title: 'He replies to your agent',
        body: 'Every queued automated message stops that second. Nobody gets a bot message on top of a live conversation with your team. This is the rule we built the system around.',
      },
      {
        id: 'opt-out',
        title: 'He asks you to stop',
        body: 'Suppressed permanently, immediately, in Hindi, Hinglish or English. We keep the record of when and how he asked.',
      },
    ],
  },

  math: {
    eyebrow: 'The arithmetic',
    title: {
      lead: 'You are not short of leads. You are short of',
      emphasis: 'conversations',
      trail: '.',
    },
    defaults: { leads: 600, cpl: 700, reached: 35 },
    inputs: {
      leads: 'Leads a month, all sources',
      cpl: 'Blended cost per lead',
      reached: 'Of those, actually spoken to. Honestly.',
    },
    outputs: {
      spend: 'What you spend to get them',
      missed: 'Leads nobody ever reaches',
      wasted: 'Ad spend that never became a conversation',
    },
    under:
      'Not lost deals. Lost conversations. You paid for the phone number and never dialled it. Your lead is asleep, and someone else is calling him.',
    invite:
      'Every figure above starts as a guess about your business. Change them. The argument either gets stronger or it falls apart, and both of those are worth ten minutes of your time.',
  },

  limits: {
    eyebrow: 'Limits',
    title: 'Things this does not do.',
    sub: 'Written down so you do not find out in month two.',
    items: [
      {
        id: 'no-close',
        title: 'It does not close deals',
        body: 'It gets you a qualified name and a reason. Your agent still has to sell.',
      },
      {
        id: 'no-replace',
        title: 'It does not replace your team',
        body: 'Everyone who works for you today still works for you after this. It does the ninety seconds nobody is doing.',
      },
      {
        id: 'no-visits',
        title: 'It does not do site visits, negotiation, or paperwork',
        body: 'It hands over a warm name and stops.',
      },
      {
        id: 'accents',
        title: 'It is not good at Haryanvi or heavy Punjabi accents yet',
        body: 'Hindi, English and Hinglish, auto-detected mid-sentence. A thick regional accent will sometimes make it ask him to repeat himself. This is on the list and it is not fixed.',
      },
      {
        id: 'mistakes',
        title: 'It will occasionally get something wrong',
        body: 'Every call is recorded and transcribed, so you will see it rather than hear about it from a customer. Anyone telling you their AI never misunderstands has not run enough calls.',
      },
      {
        id: 'volume',
        title: 'It is not worth your money under 100 leads a month',
        body: 'At that volume your team can genuinely call everyone, and we will say so on the call rather than take the setup fee.',
      },
    ],
  },

  deadLead: {
    eyebrow: 'The free test',
    title: {
      lead: "Don't risk a single fresh lead.",
      emphasis: 'Give us fifty dead ones',
      trail: '.',
    },
    deck: [
      'The real objection is not the price. It is that AI will scare your customers off — and no paragraph on a website is going to argue you out of that. So do not test it where it can cost you anything.',
      'Export fifty leads from six months ago. The ones nobody has called since March, sitting in a spreadsheet you have quietly written off. We call all fifty, in Hindi, and you get every recording.',
    ],
    outcomes: [
      {
        id: 'hang-up',
        title: 'If they hang up on it',
        body: 'You have lost nothing, because those leads were worth nothing this morning. You will have found out for certain, on our rupee, and you can stop wondering.',
      },
      {
        id: 'they-talk',
        title: 'If they talk',
        body: 'You have found money inside a file you had already given up on. And you will have heard, in your buyers’ own voices, whether this works on your kind of customer.',
      },
    ],
    close:
      'Either way you keep the recordings and the transcripts. Then we sit down with them and you decide. There is nothing to sign for this.',
    cta: { label: 'Send the fifty', href: WA_DEAD_LEADS },
  },

  comparison: {
    eyebrow: 'The comparison that matters',
    title: 'Less than the telecaller who does not work Sundays.',
    sub: 'Not against another AI vendor. Against the thing you are actually doing today.',
    columns: ['One telecaller', 'Priya'],
    rows: [
      {
        id: 'cost',
        label: 'Cost',
        values: ['₹18,000 – 25,000 / month', '₹12,000 / month'],
      },
      {
        id: 'hours',
        label: 'Hours',
        values: ['10am to 7pm, six days', '24 hours, every day, including Diwali'],
      },
      {
        id: 'coverage',
        label: 'Coverage',
        values: ['The leads he gets to', 'Every lead, in 60 seconds, every time'],
      },
      {
        id: 'language',
        label: 'Language',
        values: ['Whatever he speaks', 'Hindi, English or Hinglish, auto-detected'],
      },
      {
        id: 'attrition',
        label: 'Attrition',
        values: [
          'Notice period, replacement, retraining, quits within a year',
          'None',
        ],
      },
      {
        id: 'record',
        label: 'Record',
        values: [
          'You hear about the call if he remembers it',
          'Every call recorded and transcribed',
        ],
      },
    ],
    note: 'Both columns are monthly. The setup fee is separate and is named in full below.',
  },

  plan: {
    eyebrow: 'Price',
    title: 'One plan. One number to hold in your head.',
    sub: 'No tiers, no recommended column, no decoy. There is one product and it does one thing.',
    tier: {
      id: 'priya-plan',
      badge: 'Every lead, every hour',
      title: 'Priya',
      body: 'Setup is charged because it is real work on our side, and it is done before your first lead is ever dialled: your projects, your price list, your call flow, your objection handling, and the voice tuned to the way your buyers actually speak.',
      price: {
        label: 'One-time setup ₹30,000, then',
        value: '₹12,000',
        note: '/ month · 500 leads included, ₹25 per lead after that',
      },
      features: [
        'Every lead called inside 60 seconds, 24/7',
        'Hindi, English and Hinglish, auto-detected mid-sentence',
        'Qualification on budget, timeline, financing and project',
        'Answers from your own price list — never an invented number',
        'Qualified card to your WhatsApp, with recording and transcript',
        'Four-attempt follow-up, quiet hours respected, instant opt-out',
        'Every call recorded and transcribed, exportable on request',
      ],
      note: 'That is ₹24 a lead, answered inside sixty seconds at any hour of the night. You paid several hundred rupees to buy each one of those numbers in the first place.',
      cta: { label: 'Call me now', href: LIVE_DEMO },
      secondaryCta: { label: 'Test it on dead leads first', href: '#dead-lead' },
      featured: true,
    },
    guarantee: {
      title: 'First 30 days, no monthly fee.',
      body: 'You pay setup, and the first month’s ₹12,000 is not charged. At the end of it the recordings and transcripts are yours to keep whether you continue or not. Month to month after that, no lock-in and no notice period — tell us to stop and we stop that day. Separately: 95% of your leads called inside sixty seconds, measured on a rolling thirty days with quiet-hours leads excluded. Every Monday you get the log with timestamps and you can count it yourself. If the month closes below 95, the next month is free. We do not guarantee that your customer picks up, stays on the line, or buys a flat — we do not control those.',
    },
    disqualifier:
      'Under 100 leads a month this is not worth your money, and we will tell you so on the call.',
  },

  founding: {
    eyebrow: 'Where we actually are',
    title: 'We are taking our first few brokerages.',
    sub: 'You are going to ask how many clients we have. The answer is that you would be among the first, and here is what that actually means — both ways. We would rather say this than pretend to have a hundred clients you could not name.',
    items: [
      {
        id: 'you-get',
        title: 'What you get',
        body: 'A direct number, not a support inbox. An objection you raise on Tuesday changes the product by the following week, because there is no roadmap committee to get through. Founding pricing that does not go up for you later, ever. And a system built around your objections rather than a generic brokerage.',
      },
      {
        id: 'you-take-on',
        title: 'What you are taking on',
        body: 'You are early. Something will break and you will be the one who finds it. When that happens you will hear it from us before you hear it from your customer, and it will be fixed the same week. But we would rather write that sentence now than have you discover it in month two.',
      },
    ],
  },

  faq: {
    title: 'The questions brokers actually ask',
    items: [
      {
        id: 'scare-off',
        question: 'AI se customer bhaag jaayega?',
        answer:
          'Maybe he will. It is a fair worry and no paragraph is going to argue you out of it — so do not test it on your fresh leads. Send us fifty from six months ago and listen to what happens. That offer is on this page and it costs you nothing.',
      },
      {
        id: 'team-already-calls',
        question: 'My team already calls every lead. Why would I need this?',
        answer:
          'They call the ones they get to, during the hours they work, in the order the leads arrive. Look at last Sunday’s leads and check what time the first call went out. That number is the whole conversation.',
      },
      {
        id: 'legal',
        question: 'Is this legal?',
        answer:
          'Priya identifies herself as an AI in the first sentence of every call. Opt-outs are honoured the second they are spoken. Follow-ups respect quiet hours and no number is dialled more than four times. Calls go only to people who submitted an enquiry to you — never to purchased lists, and never to a DND number that has not contacted you first. We walk you through where DLT registration sits before you sign anything, rather than after.',
      },
      {
        id: 'wrong-info',
        question: 'What if it says something wrong about a project?',
        answer:
          'It answers only from the price list and project sheet you give us, and it is instructed to say it will confirm and come back rather than guess. Every call is recorded, so when it does get something wrong you see it rather than hearing about it from a customer.',
      },
      {
        id: 'haryanvi',
        question: 'Does it understand Haryanvi?',
        answer:
          'Not well. Hindi, English and Hinglish, auto-detected mid-sentence. A thick Haryanvi or Punjabi accent will sometimes make it ask him to repeat himself. It is on the list and it is not fixed yet.',
      },
      {
        id: 'cancel',
        question: 'Can I stop whenever I want?',
        answer:
          'Monthly, no lock-in, no notice period. Tell us to stop and we stop that day. The setup fee is not refundable because that work is already done.',
      },
      {
        id: 'change-number',
        question: 'Do I have to change my website or my number?',
        answer:
          'No. Your forms stay where they are, your portal accounts stay where they are, and your hoardings and listings do not change. We connect to the place your leads already land.',
      },
      {
        id: 'data',
        question: 'Where does my data go?',
        answer:
          'Your leads, your recordings and your transcripts are yours. Held in an Indian region, exportable on request, deleted on request. We do not sell data and we do not use your leads for anybody else.',
      },
      {
        id: 'other-industries',
        question: 'We are not a brokerage. Does this work for us?',
        answer:
          'The engine is not real-estate-specific — it is instant qualified callback in the caller’s language, and it runs the same way for clinics, dealerships and education. Real estate is where we have run it hardest and where the call flows are tuned, so that is what this page claims. Ask us on a call and we will tell you honestly whether yours is close enough.',
      },
    ],
  },

  close: {
    eyebrow: 'Hear it for yourself',
    title: 'Send your number. Your phone rings in sixty seconds.',
    sub: 'No meeting room, no trial login, no proposal deck. Take the call yourself, in Hindi, and hear exactly what your buyer would hear. If it is bad, tell us it is bad — that is useful too.',
    cta: {
      primary: { label: 'Call me now', href: LIVE_DEMO },
      secondary: { label: 'See the price again', href: '#plan' },
    },
  },
}

/* ---------------------------------------------------------------------------
   The homepage band. Same product, one scroll of it.

   `card` is a REFERENCE to the page's card, not a copy. Two cards drifting
   apart is exactly the defect the content-module rule exists to prevent, and
   content.test.ts asserts the identity holds.
--------------------------------------------------------------------------- */

export const PRIYA_HOME: HeroProductContent = {
  eyebrow: 'Our flagship',
  title: {
    lead: 'Your leads arrive at midnight. Your team',
    emphasis: 'starts at ten',
    trail: '.',
  },
  sub: 'Priya calls every property enquiry within sixty seconds, in Hindi, at any hour — qualifies it on budget, timeline and financing, and sends the card to your WhatsApp.',
  points: [
    'Called in under 60 seconds',
    'Hindi, English or Hinglish',
    'Qualified card on WhatsApp',
  ],
  cta: { label: 'See how Priya works', href: '/priya' },
  clock: {
    label: "Last night's 11:40pm lead has now been waiting",
    sinceHour: 23,
    sinceMinute: 40,
  },
  card: PRIYA.leadCard.card,
}
