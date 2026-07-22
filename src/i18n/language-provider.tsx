import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  defaultLocale,
  translate,
  type Locale,
  languages,
} from '@/i18n/locales'
import { mergeLocalizedContent } from '@/i18n/merge-content'
import { useSiteData } from '@/contexts/site-data-provider'
import type { SiteContent } from '@/i18n/content/types'
import type { LiveStreamConfig } from '@/components/live/live-stream-ui'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  content: SiteContent
  liveStreamConfig: LiveStreamConfig
  languages: typeof languages
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const STORAGE_KEY = 'locale'

const localeToOg: Record<Locale, string> = {
  fr: 'fr_CD',
  en: 'en_US',
  ln: 'ln_CD',
  lua: 'lu_CD',
  kg: 'kg_CD',
  sw: 'sw_CD',
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { content: cmsContent, liveStreamConfig: cmsLiveConfig } = useSiteData()
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return defaultLocale
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored && languages.some((l) => l.code === stored)) return stored
    return defaultLocale
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale === 'kg' ? 'kg' : locale

    let ogLocale = document.querySelector('meta[property="og:locale"]')
    if (!ogLocale) {
      ogLocale = document.createElement('meta')
      ogLocale.setAttribute('property', 'og:locale')
      document.head.appendChild(ogLocale)
    }
    ogLocale.setAttribute('content', localeToOg[locale])
  }, [locale])

  const content = useMemo(
    () => mergeLocalizedContent(cmsContent, locale),
    [cmsContent, locale],
  )

  const liveStreamConfig = useMemo<LiveStreamConfig>(
    () => ({
      ...cmsLiveConfig,
      title: content.live.title || cmsLiveConfig.title,
      subtitle: content.live.subtitle || cmsLiveConfig.subtitle,
      description: content.live.description || cmsLiveConfig.description,
      scheduleNote: content.live.scheduleNote || cmsLiveConfig.scheduleNote,
      upcoming: content.live.upcoming.length ? content.live.upcoming : cmsLiveConfig.upcoming,
    }),
    [cmsLiveConfig, content.live],
  )

  const setLocale = (newLocale: Locale) => setLocaleState(newLocale)
  const t = (key: string) => translate(locale, key)

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t, content, liveStreamConfig, languages }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}

export { localeToOg }
