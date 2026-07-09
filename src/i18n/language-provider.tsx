import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  defaultLocale,
  translate,
  type Locale,
  languages,
} from '@/i18n/locales'
import { useSiteData } from '@/contexts/site-data-provider'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  content: ReturnType<typeof useSiteData>['content']
  languages: typeof languages
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const STORAGE_KEY = 'locale'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { content } = useSiteData()
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return defaultLocale
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored && languages.some((l) => l.code === stored)) return stored
    return defaultLocale
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale === 'kg' ? 'kg' : locale
  }, [locale])

  const setLocale = (newLocale: Locale) => setLocaleState(newLocale)
  const t = (key: string) => translate(locale, key)

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, content, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
