import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { announcementsSubNav } from '@/config/navigation'
import { PageShell, Breadcrumb } from '@/components/content/page-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EventMediaDisplay } from '@/components/events/event-media'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { formatDate, cn } from '@/lib/utils'
import { getWeekdayLabel } from '@/lib/announcement-filters'
import { parishImages } from '@/assets/parish-images'
import type { AnnouncementContent } from '@/i18n/content/types'

type AnnouncementDetailPageProps = {
  source: 'weekly' | 'all'
}

function AnnouncementDetailBody({
  ann,
  categories,
}: {
  ann: AnnouncementContent
  categories: Record<string, string>
}) {
  const hasMedia = Boolean(ann.media)

  return (
    <article className="mx-auto max-w-3xl">
      {hasMedia && (
        <div className="mb-6 overflow-hidden rounded-xl border">
          <EventMediaDisplay
            media={ann.media}
            title={ann.title}
            aspect={ann.media?.type === 'video' ? 'video' : 'banner'}
          />
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="outline">{categories[ann.category] ?? ann.category}</Badge>
        <span className="text-sm text-muted-foreground capitalize">{getWeekdayLabel(ann.date)}</span>
        <span className="text-sm text-muted-foreground">·</span>
        <time className="text-sm text-muted-foreground" dateTime={ann.date}>
          {formatDate(ann.date)}
        </time>
      </div>

      <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{ann.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{ann.excerpt}</p>
      <div
        className={cn(
          'mt-8 space-y-4 text-base leading-relaxed text-foreground/90',
          'whitespace-pre-line',
        )}
      >
        {ann.content}
      </div>
    </article>
  )
}

export function AnnouncementWeeklyDetailPage() {
  return <AnnouncementDetailPage source="weekly" />
}

export function AnnouncementAllDetailPage() {
  return <AnnouncementDetailPage source="all" />
}

function AnnouncementDetailPage({ source }: AnnouncementDetailPageProps) {
  const { id } = useParams<{ id: string }>()
  const { t, content } = useLanguage()
  const { weeklyAnnouncements, getBanner } = useSiteData()

  const listPath = source === 'weekly' ? '/annonces/semaine' : '/annonces/toutes'
  const listTitle = source === 'weekly' ? t('nav.announcements.weekly') : t('nav.announcements.all')
  const items = source === 'weekly' ? weeklyAnnouncements : content.announcements
  const ann = items.find((item) => item.id === id)

  if (!ann) {
    return <Navigate to={listPath} replace />
  }

  const bannerPath = source === 'weekly' ? '/annonces/semaine' : '/annonces/toutes'
  const fallbackImage = source === 'weekly' ? parishImages.fidele : parishImages.paroisse

  return (
    <PageShell
      title={ann.title}
      subtitle={formatDate(ann.date)}
      image={getBanner(bannerPath, fallbackImage)}
      seoTitle={ann.title}
      seoDescription={ann.excerpt}
      path={`${listPath}/${ann.id}`}
      subNav={announcementsSubNav}
    >
      <Breadcrumb
        items={[
          { label: t('nav.announcements'), href: '/annonces/toutes' },
          { label: listTitle, href: listPath },
          { label: ann.title },
        ]}
      />

      <div className="mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link to={listPath}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('announcements.backToList')}
          </Link>
        </Button>
      </div>

      <AnnouncementDetailBody ann={ann} categories={content.announcementCategories} />
    </PageShell>
  )
}
