import { useState } from 'react'
import { announcementsSubNav } from '@/config/navigation'
import { PageShell } from '@/components/content/page-shell'
import { Button } from '@/components/ui/button'
import { AnnouncementList } from '@/components/announcements/announcement-list'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { parishImages } from '@/assets/parish-images'

export function AnnouncementsWeeklyPage() {
  const { t, content } = useLanguage()
  const { weeklyAnnouncements, getBanner } = useSiteData()

  return (
    <PageShell
      title={t('nav.announcements.weekly')}
      subtitle={t('bulletin.subtitle')}
      image={getBanner('/annonces/semaine', parishImages.fidele)}
      path="/annonces/semaine"
      subNav={announcementsSubNav}
    >
      <AnnouncementList
        items={weeklyAnnouncements}
        categories={content.announcementCategories}
        detailBasePath="/annonces/semaine"
      />
    </PageShell>
  )
}

export function AnnouncementsAllPage() {
  const { t, content } = useLanguage()
  const { getBanner } = useSiteData()
  const [period, setPeriod] = useState<'all' | 'upcoming' | 'past'>('all')
  const today = new Date().toISOString().slice(0, 10)

  const items = content.announcements.filter((a) => {
    if (period === 'upcoming') return a.date >= today
    if (period === 'past') return a.date < today
    return true
  })

  return (
    <PageShell
      title={t('nav.announcements.all')}
      subtitle={t('home.latestNewsSub')}
      image={getBanner('/annonces/toutes', parishImages.paroisse)}
      path="/annonces/toutes"
      subNav={announcementsSubNav}
    >
      <AnnouncementList
        items={items}
        categories={content.announcementCategories}
        detailBasePath="/annonces/toutes"
        extraFilters={
          <div className="mb-6 flex flex-wrap gap-2">
            {(['all', 'upcoming', 'past'] as const).map((f) => (
              <Button
                key={f}
                variant={period === f ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod(f)}
              >
                {f === 'all'
                  ? t('common.filterAll')
                  : f === 'upcoming'
                    ? t('common.filterUpcoming')
                    : t('common.filterPast')}
              </Button>
            ))}
          </div>
        }
      />
    </PageShell>
  )
}
