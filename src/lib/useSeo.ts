import { useEffect } from 'react'
import { BRAND } from '@/content/site'

export interface SeoInput {
  title: string
  description: string
  /** Path only, e.g. "/pricing". Combined with BRAND.url for the canonical. */
  path: string
  ogImage?: string
}

/** Upsert a <meta> tag keyed on either `name` or `property`. */
function setMeta(key: 'name' | 'property', id: string, content: string) {
  const selector = `meta[${key}="${id}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(key, id)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Sets per-route title, description, canonical and Open Graph tags.
 * Marketing sites live or die on this, and react-router gives us nothing.
 */
export function useSeo({ title, description, path, ogImage }: SeoInput): void {
  useEffect(() => {
    const full = `${title} | ${BRAND.name}`
    const url = `${BRAND.url}${path}`
    const image = ogImage ?? `${BRAND.url}/opengraph.jpg`

    document.title = full

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', BRAND.name)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', full)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)

    setCanonical(url)
  }, [title, description, path, ogImage])
}
