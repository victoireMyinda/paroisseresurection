import { useState } from 'react'
import { eventsSubNav } from '@/config/navigation'
import { PageShell } from '@/components/content/page-shell'
import { FadeIn } from '@/components/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/i18n/language-provider'
import { formatDate } from '@/lib/utils'
import { parishImages } from '@/assets/parish-images'
import { EventMediaDisplay, EventMediaThumb } from '@/components/events/event-media'
import type { AnnouncementContent } from '@/i18n/content/types'

function AnnouncementCard({ ann, categories }: { ann: AnnouncementContent; categories: Record<string, string> }) {
  const hasMedia = Boolean(ann.media)

  return (
    <Card className={`h-full overflow-hidden ${hasMedia ? 'pt-0' : ''}`}>
      <EventMediaDisplay media={ann.media} title={ann.title} aspect={ann.media?.type === 'video' ? 'video' : 'banner'} />
      <CardHeader className={hasMedia ? 'pt-4' : undefined}>
        <div className="flex items-start justify-between gap-2">
          <Badge variant="outline">{categories[ann.category] ?? ann.category}</Badge>
          <span className="shrink-0 text-xs text-muted-foreground">{formatDate(ann.date)}</span>
        </div>
        <CardTitle className="text-lg leading-snug">{ann.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{ann.excerpt}</p>
        <p className="mt-4 text-sm leading-relaxed">{ann.content}</p>
      </CardContent>
    </Card>
  )
}

export function EventsAnnouncementsPage() {
  const { t, content } = useLanguage()

  return (
    <PageShell
      title={t('nav.events.announcements')}
      subtitle={t('home.latestNewsSub')}
      image={parishImages.paroisse}
      path="/evenements/annonces"
      subNav={eventsSubNav}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {content.announcements.map((ann, i) => (
          <FadeIn key={ann.id} delay={i * 0.04}>
            <AnnouncementCard ann={ann} categories={content.announcementCategories} />
          </FadeIn>
        ))}
      </div>
    </PageShell>
  )
}

export function EventsCalendarPage() {
  const { t, content } = useLanguage()
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')
  const today = new Date().toISOString().slice(0, 10)

  const filtered = content.announcements.filter((a) => {
    if (filter === 'upcoming') return a.date >= today
    if (filter === 'past') return a.date < today
    return true
  })

  return (
    <PageShell
      title={t('nav.events.all')}
      subtitle={t('common.allEvents')}
      image={parishImages.fidele}
      path="/evenements/calendrier"
      subNav={eventsSubNav}
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {(['all', 'upcoming', 'past'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? t('common.filterAll') : f === 'upcoming' ? t('common.filterUpcoming') : t('common.filterPast')}
          </Button>
        ))}
      </div>
      <div className="space-y-4">
        {filtered.map((event, i) => (
          <FadeIn key={event.id} delay={i * 0.03}>
            <div className="overflow-hidden rounded-xl border bg-card">
              <div className="flex flex-col sm:flex-row">
                {event.media && (
                  <div className="relative h-36 w-full shrink-0 sm:h-auto sm:w-44">
                    <EventMediaThumb media={event.media} title={event.title} />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-4">
                    {!event.media && (
                      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <span className="text-xs font-medium">
                          {new Date(event.date).toLocaleDateString(undefined, { month: 'short' })}
                        </span>
                        <span className="text-xl font-bold">{new Date(event.date).getDate()}</span>
                      </div>
                    )}
                    <div>
                      <Badge variant="outline" className="mb-1">
                        {content.announcementCategories[event.category] ?? event.category}
                      </Badge>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{formatDate(event.date)} — {event.excerpt}</p>
                    </div>
                  </div>
                  <Badge variant={event.date >= today ? 'gold' : 'secondary'} className="w-fit shrink-0">
                    {event.date >= today ? t('common.filterUpcoming') : t('common.filterPast')}
                  </Badge>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </PageShell>
  )
}

export function EventsWorksPage() {
  const { t, content } = useLanguage()

  const statusLabel = {
    planned: t('common.statusPlanned'),
    in_progress: t('common.statusInProgress'),
    completed: t('common.statusCompleted'),
  }

  return (
    <PageShell
      title={t('nav.events.works')}
      subtitle={t('site.aboutExtra')}
      image={parishImages.nouvellegrotte}
      path="/evenements/travaux"
      subNav={eventsSubNav}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {content.events.works.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.06}>
            <Card className="overflow-hidden">
              <img src={project.image} alt={project.title} className="h-48 w-full object-cover" />
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{project.title}</CardTitle>
                  <Badge>{statusLabel[project.status]}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <p className="text-sm"><strong>{t('common.progress')}:</strong> {project.goal}</p>
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>{t('common.progress')}</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gold transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </PageShell>
  )
}
