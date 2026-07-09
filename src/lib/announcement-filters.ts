import type { AnnouncementContent } from '@/i18n/content/types'

export type AnnouncementFilters = {
  day: string
  date: string
  category: string
  query: string
}

export const emptyAnnouncementFilters: AnnouncementFilters = {
  day: '',
  date: '',
  category: '',
  query: '',
}

/** 1 = lundi … 7 = dimanche */
export function getWeekdayIndex(dateStr: string): number {
  const day = new Date(`${dateStr}T12:00:00`).getDay()
  return day === 0 ? 7 : day
}

export function getWeekdayLabel(dateStr: string, locale = 'fr-FR'): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(new Date(`${dateStr}T12:00:00`))
}

export function filterAnnouncements(
  items: AnnouncementContent[],
  filters: AnnouncementFilters,
): AnnouncementContent[] {
  const query = filters.query.trim().toLowerCase()

  return items.filter((ann) => {
    if (filters.category && ann.category !== filters.category) return false
    if (filters.date && ann.date !== filters.date) return false
    if (filters.day && String(getWeekdayIndex(ann.date)) !== filters.day) return false
    if (query) {
      const haystack = `${ann.title} ${ann.excerpt} ${ann.content}`.toLowerCase()
      if (!haystack.includes(query)) return false
    }
    return true
  })
}

export const WEEKDAY_OPTIONS = [
  { value: '1', label: 'Lundi' },
  { value: '2', label: 'Mardi' },
  { value: '3', label: 'Mercredi' },
  { value: '4', label: 'Jeudi' },
  { value: '5', label: 'Vendredi' },
  { value: '6', label: 'Samedi' },
  { value: '7', label: 'Dimanche' },
] as const
