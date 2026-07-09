import { churchSectionIds } from '@/config/navigation'
import type { SiteContent } from '@/i18n/content/types'

const emptyCurateMessage = {
  title: '',
  name: '',
  role: '',
  greeting: '',
  content: '',
  signature: '',
}

const emptyLiturgy = {
  season: '',
  color: '',
  readings: [] as SiteContent['liturgy']['readings'],
  gospel: { reference: '', text: '' },
  psalm: { reference: '', text: '' },
  saint: { name: '', feast: '', meditation: '' },
  homily: { title: '', liturgicalDay: '', heading: '', excerpt: '', content: '' },
}

const emptyChurch = Object.fromEntries(
  churchSectionIds.map((id) => [id, { title: '', subtitle: '', blocks: [] }]),
) as SiteContent['church']

/** Contenu vide — le portail public ne lit que Firestore (admin). */
export const emptySiteContent: SiteContent = {
  parish: {
    presentation: '',
    historySummary: '',
    history: { title: '', sections: [] },
    curates: [],
    groups: [],
    parishLife: { title: '', description: '', highlights: [] },
    curateMessage: emptyCurateMessage,
    liturgySchedule: [],
  },
  events: { works: [] },
  liturgy: emptyLiturgy,
  announcements: [],
  announcementCategories: {},
  commissions: [],
  weeklySchedule: [],
  donations: {
    spiritualIntro: '',
    spiritualTitle: '',
    verses: [],
    spiritualMessage: '',
    thankYou: '',
    receiptNote: '',
  },
  church: emptyChurch,
  media: {
    albums: [],
    galleryCategories: {},
    imageTitles: {},
  },
  live: {
    title: '',
    subtitle: '',
    description: '',
    scheduleNote: '',
    upcoming: [],
  },
  visitHours: {
    secretary: [],
    curate: [],
  },
}

export function buildAnnouncementCategories(
  announcements: SiteContent['announcements'],
): Record<string, string> {
  return Object.fromEntries(
    [...new Set(announcements.map((a) => a.category))].map((category) => [category, category]),
  )
}
