import { useMemo, useState, type ReactNode } from 'react'
import { FadeIn } from '@/components/section-heading'
import { useLanguage } from '@/i18n/language-provider'
import { AnnouncementFiltersBar } from './announcement-filters'
import { AnnouncementCard } from './announcement-card'
import { emptyAnnouncementFilters, filterAnnouncements } from '@/lib/announcement-filters'
import type { AnnouncementContent } from '@/i18n/content/types'

type AnnouncementListProps = {
  items: AnnouncementContent[]
  categories: Record<string, string>
  detailBasePath: string
  extraFilters?: ReactNode
}

export function AnnouncementList({ items, categories, detailBasePath, extraFilters }: AnnouncementListProps) {
  const { t } = useLanguage()
  const [filters, setFilters] = useState(emptyAnnouncementFilters)

  const filtered = useMemo(() => filterAnnouncements(items, filters), [items, filters])

  if (items.length === 0) {
    return (
      <>
        {extraFilters}
        <p className="text-sm text-muted-foreground">{t('announcements.empty')}</p>
      </>
    )
  }

  return (
    <>
      {extraFilters}
      <AnnouncementFiltersBar filters={filters} onChange={setFilters} categories={categories} />

      <p className="mb-4 text-sm text-muted-foreground">
        {filtered.length} / {items.length} {t('announcements.resultsCount')}
      </p>

      {filtered.length > 0 ? (
        <div className="grid min-w-0 grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-4 sm:gap-6">
          {filtered.map((ann, i) => (
            <FadeIn key={ann.id} delay={i * 0.03}>
              <AnnouncementCard
                ann={ann}
                categories={categories}
                detailPath={`${detailBasePath}/${ann.id}`}
              />
            </FadeIn>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{t('announcements.noResults')}</p>
      )}
    </>
  )
}
