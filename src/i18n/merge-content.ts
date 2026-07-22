import type { Locale } from '@/i18n/locales'
import { getContent } from '@/i18n/content'
import type { SiteContent } from '@/i18n/content/types'
import { churchSectionIds } from '@/config/navigation'

function hasText(value: string | undefined): boolean {
  return Boolean(value?.trim())
}

function hasHistorySections(history: SiteContent['parish']['history']): boolean {
  return history.sections.some((section) =>
    section.paragraphs.some((paragraph) => paragraph.trim()),
  )
}

function hasChurchContent(church: SiteContent['church']): boolean {
  return churchSectionIds.some((id) =>
    church[id]?.blocks?.some((block) => block.paragraphs.some((p) => p.trim())),
  )
}

function mergeChurch(
  cms: SiteContent['church'],
  localized: SiteContent['church'],
): SiteContent['church'] {
  const merged = { ...localized }
  for (const id of churchSectionIds) {
    const cmsSection = cms[id]
    const hasCmsBlocks = cmsSection?.blocks?.some((block) =>
      block.paragraphs.some((paragraph) => paragraph.trim()),
    )
    merged[id] = hasCmsBlocks ? cmsSection : localized[id]
  }
  return merged
}

function mergeAnnouncementCategories(
  cms: Record<string, string>,
  localized: Record<string, string>,
): Record<string, string> {
  const keys = new Set([...Object.keys(cms), ...Object.keys(localized)])
  return Object.fromEntries(
    [...keys].map((key) => [key, localized[key] ?? cms[key] ?? key]),
  )
}

/** Fusionne le contenu CMS (dynamique) avec les traductions statiques de la locale. */
export function mergeLocalizedContent(cms: SiteContent, locale: Locale): SiteContent {
  const localized = getContent(locale)

  const announcementCategories = mergeAnnouncementCategories(
    cms.announcementCategories,
    localized.announcementCategories,
  )

  return {
    ...localized,
    announcements: cms.announcements.map((announcement) => ({
      ...announcement,
      category: announcementCategories[announcement.category] ?? announcement.category,
    })),
    announcementCategories,
    commissions: cms.commissions.length ? cms.commissions : localized.commissions,
    weeklySchedule: cms.weeklySchedule.length ? cms.weeklySchedule : localized.weeklySchedule,
    events: cms.events.works.length ? cms.events : localized.events,
    visitHours:
      cms.visitHours.secretary.length || cms.visitHours.curate.length
        ? cms.visitHours
        : localized.visitHours,
    donations: hasText(cms.donations.spiritualIntro)
      ? {
          ...cms.donations,
          spiritualTitle: localized.donations.spiritualTitle,
          thankYou: localized.donations.thankYou,
          receiptNote: localized.donations.receiptNote,
        }
      : localized.donations,
    live: {
      title: localized.live.title,
      subtitle: localized.live.subtitle,
      description: hasText(cms.live.description) ? cms.live.description : localized.live.description,
      scheduleNote: localized.live.scheduleNote || cms.live.scheduleNote,
      upcoming: localized.live.upcoming.length ? localized.live.upcoming : cms.live.upcoming,
    },
    media: {
      albums: cms.media.albums.length ? cms.media.albums : localized.media.albums,
      galleryCategories: {
        ...localized.media.galleryCategories,
        ...cms.media.galleryCategories,
      },
      imageTitles: {
        ...localized.media.imageTitles,
        ...cms.media.imageTitles,
      },
    },
    liturgy: {
      ...localized.liturgy,
      season: cms.liturgy.season || localized.liturgy.season,
      color: cms.liturgy.color || localized.liturgy.color,
      readings: cms.liturgy.readings.length ? cms.liturgy.readings : localized.liturgy.readings,
      gospel: hasText(cms.liturgy.gospel.text) ? cms.liturgy.gospel : localized.liturgy.gospel,
      psalm: hasText(cms.liturgy.psalm.text) ? cms.liturgy.psalm : localized.liturgy.psalm,
      saint: hasText(cms.liturgy.saint.name) ? cms.liturgy.saint : localized.liturgy.saint,
      homily: hasText(cms.liturgy.homily.content)
        ? cms.liturgy.homily
        : localized.liturgy.homily,
      calendar: cms.liturgy.calendar ?? localized.liturgy.calendar,
    },
    church: hasChurchContent(cms.church)
      ? mergeChurch(cms.church, localized.church)
      : localized.church,
    parish: {
      ...localized.parish,
      presentation: cms.parish.presentation || localized.parish.presentation,
      historySummary: cms.parish.historySummary || localized.parish.historySummary,
      history: hasHistorySections(cms.parish.history) ? cms.parish.history : localized.parish.history,
      curates: cms.parish.curates.length ? cms.parish.curates : localized.parish.curates,
      groups: cms.parish.groups.length ? cms.parish.groups : localized.parish.groups,
      parishLife: hasText(cms.parish.parishLife.description)
        ? cms.parish.parishLife
        : localized.parish.parishLife,
      liturgySchedule: cms.parish.liturgySchedule.length
        ? cms.parish.liturgySchedule
        : localized.parish.liturgySchedule,
      curateMessage: hasText(cms.parish.curateMessage.content)
        ? {
            ...cms.parish.curateMessage,
            title: localized.parish.curateMessage.title,
            role: localized.parish.curateMessage.role,
            greeting: localized.parish.curateMessage.greeting,
          }
        : localized.parish.curateMessage,
    },
  }
}
