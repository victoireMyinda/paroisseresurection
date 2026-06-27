import type { SiteContent } from '@/i18n/content/types'
import { frContent } from '@/i18n/content/fr'

/** Builds localized content from French base with translated overlays */
export function buildContent(overrides: Partial<SiteContent>): SiteContent {
  return {
    ...frContent,
    ...overrides,
    parish: { ...frContent.parish, ...overrides.parish },
    events: { ...frContent.events, ...overrides.events },
    liturgy: { ...frContent.liturgy, ...overrides.liturgy },
    donations: { ...frContent.donations, ...overrides.donations },
    media: { ...frContent.media, ...overrides.media },
    live: { ...frContent.live, ...overrides.live },
    church: overrides.church ?? frContent.church,
    announcements: overrides.announcements ?? frContent.announcements,
    announcementCategories: overrides.announcementCategories ?? frContent.announcementCategories,
    commissions: overrides.commissions ?? frContent.commissions,
    weeklySchedule: overrides.weeklySchedule ?? frContent.weeklySchedule,
  }
}
