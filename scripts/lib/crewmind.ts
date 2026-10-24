import * as cheerio from 'cheerio';
import { siteOrigin, indexable } from './seo.ts';
import { transformHtml } from './transform.ts';
import { renderWalkthrough } from './walkthrough.ts';
import { examples, faqs, pages, principles, processSteps, services } from '../../src/content/crewmind.ts';
import { images, placements, crops, imageUrl, type ImageId, type Crop } from '../../src/content/imagery.ts';
import { heroPhotoUrl, type HeroPhotoId } from '../../src/content/hero-photography.ts';
import { exampleMockups, exampleMockupUrl } from '../../src/content/example-mockups.ts';
import { lowerVisuals, lowerVisualUrl, orbitVisualIds, faqVisualIds, type LowerVisualId } from '../../src/content/lower-visuals.ts';
import { serviceVisualIds, serviceVisualSize, serviceVisualUrl } from '../../src/content/service-visuals.ts';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const p = (s: string) => `<p>${esc(s)}</p>`;
const btn = (text = 'How the free pilot works', href = '/audit/', color = 'purple') => `<a class="btn btn--regular btn--${color}" href="${href}"><span class="btn__txt">${esc(text)}</span></a>`;
const intro = (eyebrow: string, title: string, body = '') => `<div class="section section--medium section--left section--intro mb-tiny"><div class="section__inner"><div class="content"><p class="subtitle">${esc(eyebrow)}</p><h2>${esc(title)}</h2>${body ? p(body) : ''}</div></div></div>`;
const section = (content: string, color = 'white', id = '') => `<section ${id ? `id="${id}"` : ''} class="section-colorway-${color} pv-large"><div class="section section--medium"><div class="section__inner content">${content}</div></div></section>`;
const navItems = [['Services', '/services/'], ['Examples', '/examples/'], ['About', '/about/'], ['Free pilot', '/audit/']];
const nav = () => navItems.map(([text, href]) => `<li class="menu-item"><a href="${href}">${text}</a></li>`).join('');
const disclosure = 'Illustrative example—not a completed client project';

export function renderCrewmind(raw: string, route: string, assets: Record<string, string>): string {
  const $ = cheerio.load(transformHtml(raw, '/', assets));
  const templates = $('section').toArray().map(e => $(e).clone());
  const clone = (index: number) => templates[index].clone();
  $('script:not([src]), script[src*="demo.js"], link:not([rel="stylesheet"]), meta').remove();
  $('head').prepend(`<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="${indexable && route !== '/404/' ? 'index,follow' : 'noindex,nofollow'}">`);
  $('head').append('<link rel="icon" href="/_crew/brand/favicon.ico"><link rel="apple-touch-icon" href="/_crew/brand/crewmind-mark-black-180.png"><meta property="og:image" content="/_crew/brand/crewmind-og-1200x630.png"><link rel="stylesheet" href="/_crew/site.css">');
  $('html').attr('lang', 'en');
  $('body').addClass('cm-site');
  const page = pages.find(p => p.route === route);
  if (page) $('head').append(`<link rel="canonical" href="${siteOrigin}${route}"><meta property="og:url" content="${siteOrigin}${route}">`);
  $('meta[property="og:image"]').attr('content', `${siteOrigin}/_crew/brand/crewmind-og-1200x630.png`);
  $('title').text(page?.title || 'Page not found | Crewmind');
  $('head').append(`<meta name="description" content="${esc(page?.description || 'Find your way back to Crewmind.')}"/><meta property="og:title" content="${esc(page?.title || 'Crewmind')}"/><meta property="og:description" content="${esc(page?.description || '')}"/><meta property="og:type" content="website"/>`);
  $('.page-wrap > section, .page-wrap > .popup, .page-wrap > style').remove();
  // Keep the theme's navigation and motion hooks; replace the recruitment destinations.
  $('.header__logo').attr('aria-label', 'Crewmind home').html('<img class="cm-logo cm-logo--light" src="/_crew/brand/crewmind-lockup-white.svg" alt="Crewmind" width="107" height="32"><img class="cm-logo cm-logo--dark" src="/_crew/brand/crewmind-lockup-black.svg" alt="" aria-hidden="true" width="107" height="32">');
  $('.header__section--btn').remove();
  $('.header__toggle--user-menu, .header__toggle-lang, [data-menu-target="user-menu"], [data-menu-target="lang-menu"], .header__menu-slider').remove();
  $('.main-menu').attr('aria-label', 'Main navigation').html(`<ul class="menu">${nav()}</ul>`);
  $('[data-menu-target="menu"]').attr('id', 'crew-menu');
  $('[data-menu-opener="menu"]').attr({ role: 'button', 'aria-controls': 'crew-menu', 'aria-expanded': 'false' });
  $('.footer').html(`<div class="footer__inner"><div class="footer__section footer__section--menus"><div class="footer__menu footer__menu--std"><a href="/" class="cm-footer-brand" aria-label="Crewmind home"><img src="/_crew/brand/crewmind-lockup-white.svg" alt="Crewmind" width="107" height="32"></a><p class="cm-footer-summary">One useful automation. A free pilot within agreed limits. Monthly support only if you see value.</p></div><div class="footer__menu footer__menu--std"><h2 class="footer__menu-title">Explore</h2><nav aria-label="Footer navigation" class="footer-menu"><ul class="menu">${nav()}</ul></nav></div><div class="footer__menu footer__menu--std"><h2 class="footer__menu-title">Start with the work</h2><p>Call requests are not yet open.<br>Explore the offer before you enquire.</p>${btn()}</div></div><div class="footer__section footer__section--copyright"><p class="footer__copyright">© ${new Date().getFullYear()} Crewmind</p><p>Work directly with your builder.</p></div></div>`);
  // Remove every obsolete tracking/body fragment, leaving the shared presentation scripts.
  $('.page-wrap').children().not('header, footer').remove();
  $('body > :not(.page-wrap):not(script)').remove();
  const main = $('<main id="main-content"></main>');
  $('header').first().after(main);
  $('body').prepend('<a class="cm-skip" href="#main-content">Skip to content</a>');

  function replaceImages(block: ReturnType<typeof clone>, ids: readonly (ImageId | HeroPhotoId)[], crop: Crop = 'square', sizes = '(max-width: 670px) 90vw, 40vw') {
    block.find('img').each((i, el) => {
      const id = ids[i % ids.length];
      const url = (id: ImageId | HeroPhotoId, crop: Crop, small = false) => id.startsWith('hero-') ? heroPhotoUrl(id as HeroPhotoId, small) : imageUrl(id as ImageId, crop, small);
      const actualCrop: Crop = block.hasClass('section-images-with-text') && i > 0 ? 'square' : crop;
      const [width, height] = crops[actualCrop];
      $(el).attr({ src: url(id, actualCrop), alt: '', 'data-path': url(id, actualCrop),
        'data-image-id': id, width: String(width), height: String(height), loading: 'lazy', decoding: 'async',
        srcset: `${url(id, actualCrop, true)} ${width / 2}w, ${url(id, actualCrop)} ${width}w`, sizes,
      }).removeAttr('data-src data-srcset');
      $(el).closest('picture').find('source').attr({srcset: $(el).attr('srcset')!, sizes, type: 'image/webp'}).removeAttr('data-src data-srcset');
    });
  }
  function cta() {
    const el = clone(12);
    el.find('.content').html('<p class="subtitle">One automation. Your decision.</p><h2>What keeps landing back on your plate?</h2><p>Start with a task you repeat, the tools involved, and where the work slows down. Check what makes a useful pilot before a future discovery conversation.</p><div class="btn-group">' + btn('Check whether the pilot fits', '/audit/#pilot-fit', 'black') + '</div>');
    return el;
  }
  function lowerImage(id: LowerVisualId, sizes: string) {
    const { width, height } = lowerVisuals[id];
    return `<img src="${lowerVisualUrl(id)}" data-path="${lowerVisualUrl(id)}" data-art-id="${id}" srcset="${lowerVisualUrl(id, true)} ${width / 2}w, ${lowerVisualUrl(id)} ${width}w" sizes="${sizes}" width="${width}" height="${height}" loading="lazy" decoding="async" alt="">`;
  }
  function founder() {
    return section('<p class="subtitle">Working directly with the builder</p><h2>The person who scopes it also builds it.</h2><p class="cm-section-lead">Crewmind is my independent AI automation and development practice for service businesses. I choose, build, and review the automation with you.</p><div class="cm-responsibilities"><div><h3>Before the build</h3><p>We choose one suitable task and agree what success means. I define the build with you, including access, usage limits, and human checks.</p></div><div><h3>During live use</h3><p>Your team reviews important decisions and exceptions. We compare the new process with how the task works today, including the time spent checking it.</p></div><div><h3>At the decision point</h3><p>You choose whether monthly support is worthwhile. If you stop, we follow the agreed handover or shutdown plan. There is no automatic billing.</p></div></div><a class="cm-text-link" href="/audit/#questions">Read the pilot questions before you decide</a>', 'black', 'working-together');
  }
  function process() {
    const el = clone(7).addClass('cm-pilot-art');
    el.find('.imgs-with-txt').removeClass('imgs-with-txt--img-count-3').addClass('imgs-with-txt--img-count-1');
    el.find('.imgs-with-txt__imgs').html(`<figure class="imgs-with-txt__img">${lowerImage('pilot-journey', '(max-width: 670px) 90vw, 45vw')}</figure>`);
    el.find('.imgs-with-txt__txt .content').html('<p class="subtitle">From discovery to your decision</p><h2 class="h4">Choose one task. Try it. Review the results.</h2><p>The pilot is free within agreed scope. Build timing is agreed separately; the seven-day assessment begins after go-live.</p>');
    el.find('.accordion__row').each((i, row) => {
      $(row).find('.accordion__row-title').text(processSteps[i][0]);
      $(row).find('.content').html(p(processSteps[i][1]));
      const id = `process-${i}`;
      $(row).find('.accordion__row-header').attr({ 'data-toggle-target': id, role: 'button', tabindex: '0', 'aria-expanded': 'false', 'aria-controls': id });
      $(row).find('.accordion__row-content').attr({ 'data-toggle': id, id });
    });
    return el;
  }
  function principlesSection() {
    const el = clone(9);
    el.prepend(intro('Built around your business', 'Know what changes. Keep control.'));
    el.find('.stats__item').each((i, item) => { $(item).find('.stats__item-number').text(principles[i][0]); $(item).find('.stats__item-txt').text(principles[i][1]); });
    el.find('.txt-center').remove();
    return el;
  }
  function examplesSlider() {
    const el = clone(4).attr('id', 'examples');
    el.prepend(intro('Illustrative workflows', 'Find the task you recognize.', 'Explore enquiries, onboarding, reporting, and customer support. Each example shows a possible approach; discovery checks whether one fits your business.'));
    const template = el.find('.flickity__item').first().clone();
    const track = el.find('.flickity__item').first().parent();
    el.find('.flickity__item').remove();
    examples.forEach(() => track.append(template.clone()));
    el.find('.flickity__item').each((i, item) => {
      const example = examples[i];
      const id = placements.examples[i];
      replaceImages($(item), [id], 'square', '(max-width: 1000px) 90vw, 45vw');
      $(item).find('img').attr({ src: exampleMockupUrl(id), 'data-path': exampleMockupUrl(id), srcset: `${exampleMockupUrl(id, true)} 480w, ${exampleMockupUrl(id)} 960w` });
      $(item).find('img').each((_, image) => { if (!$(image).parent().is('picture')) $(image).wrap('<picture></picture>'); });
      $(item).find('picture').each((_, picture) => {
        $(picture).find('source').remove();
        $(picture).prepend(`<source media="(max-width: 1000px)" srcset="${exampleMockupUrl(id, true)} 480w, ${exampleMockupUrl(id)} 960w" sizes="90vw">`);
      });
      $(item).find('.case-study-preview__link').attr({ href: `/examples/#${example.id}`, 'aria-label': example.title });
      $(item).find('.case-study-preview__terms').html('<span class="cm-example-label">Interface concept · sample</span>');
      $(item).find('.case-study-preview__title').text(example.title);
      $(item).find('.case-study-preview__section--stats').html(`<div class="cm-example-summary"><p><strong>Today</strong> ${esc(example.before)}</p><p><strong>Possible workflow</strong> ${esc(example.after)}</p><p class="txt-x-small">Human checkpoint: ${esc(example.human)}</p><p class="cm-disclosure">${disclosure}</p></div>`);
    });
    el.append(`<div class="section section--large mt-tiny">${btn('Explore all eight examples', '/examples/')}</div>`);
    return el;
  }
  function faqCards() {
    const el = clone(11).addClass('cm-home-faq');
    el.find('[data-slider]').addClass('flickity-static');
    el.find('.section--intro .content').html('<p class="subtitle">Before you start</p><h2>Clear answers before you commit.</h2>');
    el.find('.flickity__item').slice(3).remove();
    el.find('.flickity__item').each((i, item) => {
      $(item).find('.post-preview__img img').replaceWith(lowerImage(faqVisualIds[i], '(max-width: 670px) 90vw, 33vw'));
      $(item).find('.post-preview__img-author-avatar, .post-preview__meta, .post-preview__terms').remove();
      $(item).find('a').attr('href', `/audit/#faq-${i}`);
      $(item).find('.post-preview__title').html(`<a href="/audit/#faq-${i}">${esc(faqs[i][0])}</a>`);
      $(item).find('.post-preview__content').append(p(faqs[i][1]));
    });
    el.find('a[href="/insights/featured/"]').attr('href', '/audit/#questions').find('.btn__txt').text('More pilot questions');
    return el;
  }
  function pageHero(title: string, text: string, eyebrow: string) {
    return `<section class="section-colorway-black pv-large cm-page-hero"><div class="section section--large"><div class="section__inner content"><p class="subtitle">${esc(eyebrow)}</p><h1>${esc(title)}</h1>${p(text)}</div></div></section>`;
  }

  if (route === '/') {
    const hero = clone(0); replaceImages(hero, placements.hero, 'square', '(max-width: 670px) 30vw, 20vw');
    // The preserved animation swaps img.src and the mobile source together.
    // An img srcset would keep showing the original subject after each swap.
    hero.find('img').each((i, el) => {
      $(el).attr('loading', 'eager').removeAttr('srcset sizes');
      $(el).closest('picture').find('source').attr('srcset', heroPhotoUrl(placements.hero[i % placements.hero.length], true)).removeAttr('sizes');
    });
    hero.find('.banner__imgs').attr('data-img-grid-urls', JSON.stringify(placements.hero.map(id => ({ desktop: heroPhotoUrl(id), mobile: heroPhotoUrl(id, true) }))));
    hero.find('.banner__title .content').html('<p class="subtitle cm-hero-eyebrow">AI automation for service businesses</p><h1>Take one recurring task<br><span style="color:#9e8fff">off your plate.</span></h1>');
    hero.find('.banner__txt .content').html('<p>Still copying enquiry details, chasing documents, or assembling reports? I build a free pilot around one agreed task. We review seven days of live use; you decide whether monthly support is worthwhile.</p><div class="btn-group">' + btn('See a sample automation', '#workflow-walkthrough') + '<a class="cm-hero-link" href="/audit/">How the free pilot works</a></div><p class="txt-small">Build and running costs covered within agreed limits. Seven live days begin after the build. No automatic billing. Call requests are not yet open.</p>');
    const strip = clone(1).attr('aria-label', 'Everyday work worth reviewing');
    const words = ['Enquiries', 'Follow-ups', 'Onboarding', 'Documents', 'Reporting', 'Client support'];
    strip.find('.scrolling-logos__item').each((i, item) => { $(item).html(`<span>${words[i % 6]}</span>`); if (i >= 6) $(item).attr('aria-hidden', 'true'); });
    const opening = clone(2);
    opening.find('.avatars').remove();
    opening.find('.content').html('<p class="subtitle">When the business grows, the admin follows.</p><h2>The work between<br>the work adds up.</h2><p>An enquiry waits in your inbox. Client details get copied between tools. Another report needs updating before the day ends.</p><p>Each task looks small. Together, they take time away from clients and keep you involved in every handoff.</p>');
    const grid = clone(3).addClass('cm-service-art');
    replaceImages(grid, placements.capabilities, 'square', '(max-width: 670px) 45vw, (max-width: 1000px) 30vw, 16vw');
    grid.find('.section--intro .content').html('<p class="subtitle">One focused starting point</p><h2>Choose the task.<br>Then choose the tools.</h2>');
    grid.find('.img-links__item').each((i, item) => {
      const artwork = serviceVisualIds[i];
      $(item).find('img').attr({ src: serviceVisualUrl(artwork), 'data-path': serviceVisualUrl(artwork), 'data-art-id': artwork,
        width: String(serviceVisualSize), height: String(serviceVisualSize),
        srcset: `${serviceVisualUrl(artwork, true)} ${serviceVisualSize / 2}w, ${serviceVisualUrl(artwork)} ${serviceVisualSize}w` });
      $(item).find('source').remove();
      $(item).find('a').attr('href', `/services/#${services[i].id}`);
      $(item).find('.img-links__item-txt').html(`<h3 class="h6"><a href="/services/#${services[i].id}">${services[i].title}</a></h3><p class="txt-small">${services[i].short}</p>`);
    });
    const audit = clone(5).addClass('cm-support-art');
    audit.find('.globe-graphic-with-txt__imgs').html(orbitVisualIds.map(id => `<div class="cm-orbit-object cm-${id}" aria-hidden="true">${lowerImage(id, '(max-width: 670px) 18vw, 120px')}</div>`).join(''));
    // The reference's office names are outlined SVG paths, not searchable text.
    // Keep its globe, connecting lines, orbit geometry and motion; replace only lettering.
    const globe = audit.find('.globe-graphic-with-txt__graphic svg').eq(1);
    globe.find('g.uuid-6e5bdc74-612a-4e8c-82d3-6e9f4e21dece').remove();
    globe.children('g').children('path.uuid-30a53798-f368-4735-aa74-de15670bfc59').remove();
    for (const [label, x, y] of [['ENQUIRIES', 153, 181], ['DELIVERY', 460, 192], ['REPORTING', 124, 437], ['SUPPORT', 419, 405]]) {
      globe.append(`<text x="${x}" y="${y}" fill="white" text-anchor="middle" font-family="Arial,sans-serif" font-size="14">${label}</text>`);
    }
    audit.find('.globe-graphic-with-txt__graphic').attr({ role: 'img', 'aria-label': 'Connected workflows: enquiries, delivery, reporting and support' });
    audit.find('.globe-graphic-with-txt__txt .content').html('<p class="subtitle">Optional paid monthly support</p><h2 class="h4">Keep it running if it earns its place.</h2><p>After seven days of live use, we review what changed and the work still needed from your team.</p><p>Monthly support covers monitoring, maintenance, and improvements to the chosen automation. Additional builds are scoped separately.</p><p>We agree pricing and ongoing usage costs before you commit. If you stop, we follow the handover or shutdown plan agreed before the pilot.</p>' + btn('Read about ongoing support', '/audit/#after-pilot') + '<p class="txt-small">No automatic extension or billing.</p>');
    main.append(hero, strip, opening, renderWalkthrough(), examplesSlider(), grid, process(), founder(), principlesSection(), audit, faqCards(), cta());
  } else if (route === '/services/') {
    main.append(pageHero('Choose the approach your task needs.', 'Connect your tools, prepare routine work, and keep exceptions with your team. The free pilot covers one suitable, agreed task. Complete website and app projects are scoped separately.', 'Services'));
    main.append(section('<nav class="cm-service-nav" aria-label="Choose a capability"><p class="subtitle">Jump to a capability</p><ul>' + services.map(service => '<li><a href="#' + service.id + '">' + esc(service.title) + '</a></li>').join('') + '</ul></nav>'));
    const relatedExamples: Record<string, string[]> = { workflows: ['enquiries', 'onboarding', 'reporting'], chat: ['customer-support'], voice: ['voice-agent'], documents: ['onboarding', 'reporting'], websites: ['enquiries', 'appointment-booking'], apps: ['reporting', 'onboarding'] };
    for (const [i, service] of services.entries()) {
      const el = clone(7).attr('id', service.id); replaceImages(el, placements.services[i], 'landscape');
      el.find('.imgs-with-txt__accordion').remove();
      const separateScope = ['websites', 'apps'].includes(service.id) ? '<p class="cm-disclosure">Complete website, portal, and app projects have a separate scope and are not included in the free pilot.</p>' : '';
      const links = relatedExamples[service.id].map(id => { const example = examples.find(item => item.id === id)!; return `<li><a class="cm-text-link" href="/examples/#${id}">${esc(example.title)}</a></li>`; }).join('');
      el.find('.imgs-with-txt__txt .content').html(`<p class="subtitle">0${i + 1} / Services</p><h2>${service.title}</h2>${p(service.short)}${separateScope}<h3 class="h6">The problem</h3>${p(service.problem)}<h3 class="h6">Possible approach</h3>${p(service.build)}<h3 class="h6">What we need to make it work</h3>${p(service.inputs)}<h3 class="h6">Where people stay involved</h3>${p(service.oversight)}<nav class="cm-related-examples" aria-label="Examples related to ${esc(service.title)}"><h3 class="h6">Explore related examples</h3><ul>${links}</ul></nav>`);
      if (i % 2) el.removeClass('section-colorway-gray').addClass('section-colorway-white');
      main.append(el);
    }
    main.append(section('<h2>Not every task needs AI.</h2><p>A rule-based connection may be enough to move information or create a task. AI can help with less structured messages or documents. The task determines the approach, with agreed checks and human review.</p>' + btn('Compare the workflow examples', '/examples/')), cta());
  } else if (route === '/examples/') {
    main.append(pageHero('See where automation could fit.', 'Find a recurring task you recognize. These eight examples show the steps, where a person stays involved, and how we could check usefulness. They are illustrations, not completed client projects or working integrations.', 'Workflow examples'));
    const groups = [
      ['Handle enquiries', ['enquiries', 'speed-to-lead', 'lead-follow-up']],
      ['Serve customers', ['onboarding', 'voice-agent', 'appointment-booking', 'customer-support']],
      ['Run the business', ['reporting']],
    ] as const;
    main.append(section('<nav class="cm-example-nav" aria-label="Choose a workflow example"><h2>Where does work pile up?</h2><div class="cm-example-groups">' + groups.map(([title, ids], index) => '<div><figure class="cm-task-photo"><img src="' + heroPhotoUrl((['hero-support', 'hero-client-meeting', 'hero-operations'] as const)[index]) + '" srcset="' + heroPhotoUrl((['hero-support', 'hero-client-meeting', 'hero-operations'] as const)[index], true) + ' 480w, ' + heroPhotoUrl((['hero-support', 'hero-client-meeting', 'hero-operations'] as const)[index]) + ' 960w" sizes="(max-width: 670px) 90vw, 30vw" width="960" height="960" alt="" loading="lazy" decoding="async"><figcaption>Illustrative business scene</figcaption></figure><h3>' + title + '</h3><ul>' + ids.map(id => { const example = examples.find(item => item.id === id)!; return '<li><a href="#' + example.id + '">' + esc(example.title) + '</a></li>'; }).join('') + '</ul></div>').join('') + '</div></nav><p class="cm-disclosure">Choose one recurring task to explore. Discovery checks fit, available tools, and enough activity for a useful pilot.</p>', 'white', 'example-selector'));
    main.append(renderWalkthrough());
    for (const [i, example] of examples.entries()) {
      const id = placements.examples[i];
      const figure = `<picture><img data-image-id="${id}" src="${exampleMockupUrl(id)}" data-path="${exampleMockupUrl(id)}" srcset="${exampleMockupUrl(id, true)} 480w, ${exampleMockupUrl(id)} 960w" sizes="(max-width: 670px) 90vw, 720px" width="960" height="960" loading="lazy" decoding="async" alt="${esc(exampleMockups[id])}"></picture>`;
      main.append(section(`<p class="subtitle">${example.label}</p><h2>${example.title}</h2><p class="cm-disclosure">${disclosure}</p><figure class="cm-workflow-figure">${figure}<ol class="cm-flow" aria-label="Possible workflow sequence">${example.steps.map((step, index) => `<li><span class="cm-step-label">0${index + 1}</span><span>${esc(step)}</span></li>`).join('')}</ol><figcaption>Interface concept / fictional example, not a live integration. Possible sequence: ${example.steps.map(esc).join(' · ')}</figcaption></figure><div class="cm-detail-grid"><div><h3 class="h5">Today</h3>${p(example.before)}</div><div><h3 class="h5">Possible workflow</h3>${p(example.after)}</div><div><h3 class="h5">Human checkpoint</h3>${p(example.human)}</div><div><h3 class="h5">How we would check it helps</h3>${p(example.measurement)}</div></div><details class="cm-example-details"><summary>What we need and where it can fail</summary><div class="cm-detail-grid"><div><h3 class="h5">What starts it</h3>${p(example.trigger)}</div><div><h3 class="h5">What it needs</h3>${p(example.inputs)}</div><div><h3 class="h5">Practical limits</h3>${p(example.limit)}</div></div></details><a class="cm-text-link cm-back-to-examples" href="#example-selector">Choose another example</a>`, i % 2 ? 'gray' : 'white', example.id));
    }
    main.append(cta());
  } else if (route === '/about/') {
    main.append(pageHero('Work directly with your automation builder.', 'The person choosing the approach also builds and reviews it with you. Start with one recurring task in your service business.', 'About Crewmind'));
    main.append(founder(), section('<h2>Useful work matters more than adding another tool.</h2><p>A recurring task can look simple on paper and behave differently in a busy week. I start with how your team does it today, the tools involved, and the exceptions that need a person.</p><p>During the pilot, we look at completed tasks, errors, and the time your team spends checking the work. More automated steps do not automatically mean more useful work.</p><p>Seven live days provide evidence to review together. They do not guarantee reliable revenue results, especially when the task happens infrequently.</p>' + btn()), principlesSection(), cta());
  } else if (route === '/audit/') {
    main.append(pageHero('Try one automation before a monthly commitment.', 'Agree one recurring task. I cover the build and running costs within agreed limits. We review seven days of live use after the build, then you decide whether paid monthly support is worthwhile.', 'First Automation / Free pilot'));
    main.append(section('<div class="cm-detail-grid"><div><h2 class="h4">What makes a useful pilot?</h2><ul><li>One task your team handles repeatedly.</li><li>Tools we can access and connect appropriately.</li><li>Enough activity to learn from seven live days.</li><li>A person who can review exceptions and results.</li></ul><p>Discovery checks feasibility. If the fit is poor, we stop there.</p></div><div><h2 class="h4">Bring a task, not a specification.</h2><p>For a future discovery conversation, note:</p><ul><li>What starts the task and which tools you use.</li><li>How often it happens and who handles it.</li><li>Time spent doing it and checking for mistakes.</li><li>What goes wrong or needs a person to decide.</li></ul><p>A short overview is enough. Do not share passwords or private customer records.</p></div><div><h2 class="h4">Free within agreed scope.</h2><p>Crewmind covers the build and running costs within the agreed pilot scope. Build timing is agreed separately. The seven-day assessment starts after go-live.</p></div><div><h2 class="h4">Check whether the work improves.</h2><p>We agree how the task works today as a baseline. Compare time spent, response speed, completed tasks, errors, and human review effort. Observed changes stay separate from estimated financial value; seven days may not establish reliable revenue ROI.</p></div></div>', 'white', 'pilot-fit'));
    main.append(process());
    main.append(section('<h2>Your decision after the live review.</h2><p>Choose paid monthly support only if you see worthwhile value. We agree its price and any ongoing software or usage costs before you commit. There is no automatic extension or billing.</p><p>Support covers monitoring, maintenance, and improvements to the chosen automation. Additional builds are scoped separately.</p><p>If you stop, we follow the handover or shutdown plan agreed before starting. Any ongoing access or running costs depend on that agreement.</p>', 'white', 'after-pilot'));
    main.append(section(`<h2>Pilot requests are not open yet.</h2><p id="audit-availability" class="cm-availability">Call requests are not yet open. This disabled form is a preview; it does not collect, store, or send information.</p><p>For now, <a href="#pilot-fit">check whether your task fits</a> or <a href="/examples/">explore the sample workflows</a>. Nothing on this page reserves a pilot or confirms a booking.</p><form class="cm-audit-form" aria-describedby="audit-availability" onsubmit="return false"><fieldset disabled><legend class="cm-sr-only">Discovery call request preview</legend><div class="cm-detail-grid">${[['name','Name','text'],['email','Work email','email'],['business','Business name','text'],['website','Website — optional','url']].map(([id, label, type])=>`<div><label for="audit-${id}">${label}</label><input id="audit-${id}" type="${type}" ${id !== 'website' ? 'required' : ''} autocomplete="off"></div>`).join('')}</div><label for="audit-description">What does your business do?</label><textarea id="audit-description" rows="3" required></textarea><label for="audit-bottleneck">Where does work slow down or repeat?</label><textarea id="audit-bottleneck" rows="4" required></textarea><p class="txt-small">A short overview is enough. Please do not include passwords or private customer information.</p><button class="btn btn--regular btn--purple" type="submit" disabled><span class="btn__txt">Request a discovery call</span></button></fieldset></form>`, 'gray', 'request'));
    main.append(section(`<p class="subtitle">Before you start</p><h2>Questions about your first automation.</h2><div class="cm-faqs">${faqs.map(([question, answer], i) => `<details id="faq-${i}"><summary>${esc(question)}</summary>${p(answer)}</details>`).join('')}</div>`, 'white', 'questions'));
  } else {
    main.append(pageHero('This page has moved on.', 'The page you’re looking for is not part of Crewmind. Explore the services or return to the homepage.', '404 / Page not found'), section(btn('Back to home', '/') + ' ' + btn('Explore services', '/services/', 'green')));
  }
  $('body').append('<script src="/_crew/site.js" defer></script>');
  $('a[href]').each((_, el) => { if ($(el).attr('href') === route) $(el).attr('aria-current', 'page'); });
  return $.html();
}
