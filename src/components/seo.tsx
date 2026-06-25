import { useEffect } from 'react'
import { siteConfig } from '@/config/site'

interface SEOProps {
  title?: string
  description?: string
  path?: string
  image?: string
}

export function SEO({ title, description, path = '', image }: SEOProps) {
  const fullTitle = title
    ? `${title} | ${siteConfig.shortName}`
    : siteConfig.name
  const desc = description ?? siteConfig.description
  const url = `${siteConfig.url}${path}`
  const ogImage = image ?? `${siteConfig.url}/og-image.png`

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', desc)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', desc, true)
    setMeta('og:url', url, true)
    setMeta('og:image', ogImage, true)
    setMeta('og:type', 'website', true)
    setMeta('og:locale', siteConfig.locale, true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', desc)

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [fullTitle, desc, url, ogImage])

  return null
}
