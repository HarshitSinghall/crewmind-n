import { createHash } from 'node:crypto';
import * as cheerio from 'cheerio';

export const ORIGIN = 'https://www.spheredigitalrecruitment.com';
export const sourceHost = 'www.spheredigitalrecruitment.com';
const regions = /^\/(us|sa|eu)(\/|$)/;
const infrastructure = /^\/(wp-admin|wp-json|wp-login\.php|feed|xmlrpc\.php|calendar)(\/|$)/;
const tracking = /googletagmanager|google-analytics|cookieyes|hotjar|facebook\.net|perfmatters|cloudflareinsights|cdn-cgi\/challenge-platform|\/honeypot\/|wp-armour|recaptcha|gstatic\.com\/recaptcha/i;
const serverScript = /gravityforms|gravity-forms/i;

export function isUkPage(input: string): boolean {
  try {
    const u = new URL(input, ORIGIN);
    return u.hostname.replace(/^www\./, '') === sourceHost.replace(/^www\./, '') &&
      !regions.test(u.pathname) && !infrastructure.test(u.pathname) &&
      !/\/(?:feed|log-out)\/?$/.test(u.pathname) &&
      !/\.[a-z\d]{2,8}$/i.test(u.pathname) && !u.search;
  } catch { return false; }
}

export function localRoute(input: string): string {
  if (/^(#|\?|mailto:|tel:|javascript:)/i.test(input)) return input;
  try {
    const u = new URL(input, ORIGIN);
    if (u.hostname.replace(/^www\./, '') === sourceHost.replace(/^www\./, '') && !regions.test(u.pathname)) {
      return `${u.pathname.replace(/\/{2,}/g, '/')}${u.search}${u.hash}`;
    }
  } catch { /* Retain non-URL attributes. */ }
  return input;
}

export function assetPath(input: string): string {
  const u = new URL(input, ORIGIN);
  let path = decodeURI(u.pathname).replace(/[^/a-zA-Z0-9._~-]/g, '_');
  if (!path || path.endsWith('/')) path += 'resource';
  const local = u.hostname.replace(/^www\./, '') === sourceHost.replace(/^www\./, '');
  // WordPress cache-busting versions do not change an asset's identity.
  const meaningfulQuery = new URLSearchParams(u.search);
  meaningfulQuery.delete('ver'); meaningfulQuery.delete('v');
  const suffix = meaningfulQuery.size ? `-${createHash('sha256').update(meaningfulQuery.toString()).digest('hex').slice(0, 12)}` : '';
  if (suffix) path = path.replace(/(\.[^/.]+)?$/, `${suffix}$1`);
  return local ? path : `/_vendor/${u.hostname}${path}`;
}

export function normalizeAsset(input: string, base: string): string | null {
  if (!input || /^(data:|blob:|#|javascript:|mailto:|tel:)/i.test(input)) return null;
  try {
    const u = new URL(input, base);
    if (!/^https?:$/.test(u.protocol) || tracking.test(u.href)) return null;
    u.hash = '';
    return u.href;
  } catch { return null; }
}

export function extractAssets(html: string, pageUrl: string): string[] {
  const $ = cheerio.load(html);
  const assets = new Set<string>();
  const add = (value: string) => { const url = normalizeAsset(value, pageUrl); if (url) assets.add(url); };
  $('script[src], link[href], img, source, video, audio, iframe, image, use').each((_, el) => {
    const node = $(el);
    if (el.tagName === 'iframe') return;
    if (el.tagName === 'link' && !/stylesheet|icon|preload/.test(node.attr('rel') || '')) return;
    for (const attr of ['src', 'href', 'xlink:href', 'poster', 'data-src']) {
      const value = node.attr(attr); if (value) add(value);
    }
    for (const attr of ['srcset', 'data-srcset']) {
      node.attr(attr)?.split(',').forEach(part => add(part.trim().split(/\s+/)[0]));
    }
  });
  // Includes images in lazy-load/grid JSON and font/image references in inline CSS.
  const unescaped = html.replace(/\\\//g, '/').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  for (const match of unescaped.matchAll(/https?:\/\/[^\s"'<>\\)]+\.(?:webp|jpe?g|png|svg|gif|avif|woff2?|ttf|otf|mp4|webm|pdf)(?:\?[^\s"'<>\\)]*)?/gi)) add(match[0]);
  for (const match of unescaped.matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)/gi)) add(match[1]);
  return [...assets];
}

export function transformHtml(html: string, route: string, assetMap: Record<string, string> = {}): string {
  const $ = cheerio.load(html, { decodeEntities: false } as never);
  $('script').each((_, el) => {
    const node = $(el), src = node.attr('src') || '', code = node.html() || '';
    if (tracking.test(src) || serverScript.test(src) || (!src && /gtag\(|GoogleAnalyticsObject|perfmatters|cookieyes|gform\.|gformInitialize|gform_gravityforms|gform_theme|gform_i18n|wpApiSettings|wpa_field|wpae|__CF\$cv\$params|challenge-platform/i.test(code))) { node.remove(); return; }
    if (node.attr('type') === 'pmdelayedscript') {
      const type = node.attr('data-perfmatters-type');
      if (type) node.attr('type', type); else node.removeAttr('type');
    }
    for (const key of Object.keys(el.attribs)) if (key.startsWith('data-perfmatters')) node.removeAttr(key);
    if (!src && code) {
      let clean = code.replace(/"(?:adminUrl|ajaxAdminUrl|ajaxurl|ajax_url)"\s*:\s*"[^"]*"/g, '"disabledEndpoint":""');
      clean = clean.replace(/"[^"\n]*(?:nonce|Nonce)[^"\n]*"\s*:\s*"[^"]*"/g, '"removedToken":""');
      node.html(clean);
    }
  });
  $('link[rel="alternate"], link[rel="https://api.w.org/"], link[rel="EditURI"], meta[name="generator"]').remove();
  $('input').each((_, el) => {
    const node = $(el), name = node.attr('name') || '';
    if (/nonce|gform_ajax|gform_unique_id|state_|gform_target_page|gform_source_page|is_submit|wpa_|gform_submission_method|gform_field_values/i.test(name)) node.remove();
  });
  $('form').each((_, el) => {
    const form = $(el), isSearch = (form.attr('method') || '').toLowerCase() === 'get';
    if (!isSearch) {
      form.attr('data-demo-form', 'true').attr('action', '#').attr('method', 'get').removeAttr('target');
      form.find('[onclick], [onsubmit]').removeAttr('onclick').removeAttr('onsubmit');
      form.find('[name]').each((_, field) => { const item = $(field); item.attr('data-field-name', item.attr('name') || '').removeAttr('name'); });
    } else { form.attr('data-local-search', 'true').attr('action', localRoute(form.attr('action') || route)); }
    form.removeAttr('onsubmit');
  });
  $('iframe[name^="gform_ajax_frame"]').remove();
  $('a[href]').each((_, el) => { const a = $(el); a.attr('href', localRoute(a.attr('href')!)); });
  $('link[rel="canonical"]').attr('href', route);
  $('head').prepend('<script src="/_local/guard.js"></script>');
  $('body').append('<script type="module" src="/_local/demo.js"></script>');
  let result = $.html();
  // Both escaped JSON URLs and ordinary attributes must resolve locally.
  result = result.replace(/https?:\\?\/\\?\/(?:(?!&quot;|&#34;|&apos;)[^\s"'<>])+/g, value => {
    const escaped = value.includes('\\/');
    const normalized = value.replace(/\\\//g, '/').replace(/&amp;/g, '&');
    // URLs can be followed by srcset descriptors, CSS brackets, or entity-encoded JSON quotes.
    const end = normalized.search(/&quot;|[)\\]/);
    const key = end === -1 ? normalized : normalized.slice(0, end);
    const replacement = assetMap[key];
    if (!replacement) return value;
    return (escaped ? replacement.replace(/\//g, '\\/') : replacement) + (end === -1 ? '' : normalized.slice(end));
  });
  return result;
}
