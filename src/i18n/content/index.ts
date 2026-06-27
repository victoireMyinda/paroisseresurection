import type { Locale } from '@/i18n/locales'
import type { SiteContent } from '@/i18n/content/types'
import { frContent } from '@/i18n/content/fr'
import { enContent } from '@/i18n/content/en'
import { lnContent } from '@/i18n/content/ln'
import { luaContent } from '@/i18n/content/lua'
import { kgContent } from '@/i18n/content/kg'
import { swContent } from '@/i18n/content/sw'

const contentByLocale: Record<Locale, SiteContent> = {
  fr: frContent,
  en: enContent,
  ln: lnContent,
  lua: luaContent,
  kg: kgContent,
  sw: swContent,
}

export function getContent(locale: Locale): SiteContent {
  return contentByLocale[locale] ?? frContent
}

export type { SiteContent }
