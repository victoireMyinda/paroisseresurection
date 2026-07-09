import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/i18n/language-provider'
import {
  emptyAnnouncementFilters,
  WEEKDAY_OPTIONS,
  type AnnouncementFilters,
} from '@/lib/announcement-filters'

type AnnouncementFiltersBarProps = {
  filters: AnnouncementFilters
  onChange: (filters: AnnouncementFilters) => void
  categories: Record<string, string>
}

const selectClassName =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'

export function AnnouncementFiltersBar({ filters, onChange, categories }: AnnouncementFiltersBarProps) {
  const { t } = useLanguage()
  const categoryEntries = Object.entries(categories)
  const hasActiveFilters = Boolean(filters.day || filters.date || filters.category || filters.query.trim())

  return (
    <div className="mb-8 rounded-xl border bg-card p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5 sm:col-span-2 lg:col-span-4">
          <Label htmlFor="announcement-search">{t('announcements.search')}</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="announcement-search"
              type="search"
              value={filters.query}
              onChange={(e) => onChange({ ...filters, query: e.target.value })}
              placeholder={t('announcements.searchPlaceholder')}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="announcement-day">{t('announcements.filterDay')}</Label>
          <select
            id="announcement-day"
            value={filters.day}
            onChange={(e) => onChange({ ...filters, day: e.target.value })}
            className={selectClassName}
          >
            <option value="">{t('announcements.allDays')}</option>
            {WEEKDAY_OPTIONS.map((day) => (
              <option key={day.value} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="announcement-date">{t('announcements.filterDate')}</Label>
          <Input
            id="announcement-date"
            type="date"
            value={filters.date}
            onChange={(e) => onChange({ ...filters, date: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="announcement-category">{t('announcements.filterCategory')}</Label>
          <select
            id="announcement-category"
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className={selectClassName}
          >
            <option value="">{t('announcements.allCategories')}</option>
            {categoryEntries.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange(emptyAnnouncementFilters)}>
            <X className="mr-2 h-4 w-4" />
            {t('announcements.resetFilters')}
          </Button>
        </div>
      )}
    </div>
  )
}
