import { PageShell } from '@/components/content/page-shell'
import { FadeIn } from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { parishImages } from '@/assets/parish-images'
import {
  LiveFeaturedPlayer,
  LivePlatformCards,
  LiveStatusBadge,
  getWatchLabels,
} from '@/components/live/live-stream-ui'

export function LiveStreamPage() {
  const { t, content, liveStreamConfig } = useLanguage()
  const { getBanner } = useSiteData()
  const { platforms, featuredVideo } = liveStreamConfig
  const isAnyLive = platforms.some((p) => p.isLive)
  const watchLabels = getWatchLabels(t)

  return (
    <PageShell
      title={content.live.title}
      subtitle={content.live.subtitle}
      image={getBanner('/messe-en-direct', parishImages.chorale)}
      path="/messe-en-direct"
    >
      <FadeIn>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <LiveStatusBadge
            isLive={isAnyLive}
            liveLabel={t('live.liveBadge')}
            offlineLabel={t('common.noLiveNow')}
          />
          <p className="text-sm text-muted-foreground">{content.live.scheduleNote}</p>
        </div>
      </FadeIn>

      <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground leading-relaxed">
        {content.live.description}
      </p>

      <FadeIn>
        <div className="mb-10">
          <LiveFeaturedPlayer
            platforms={platforms}
            featured={featuredVideo}
            liveLabel={t('live.liveBadge')}
            watchLabel={t('common.open')}
          />
        </div>
      </FadeIn>

      <h2 className="mb-6 text-center text-xl font-bold">{t('common.nextBroadcasts')}</h2>
      <div className="mx-auto mb-12 grid max-w-2xl gap-4">
        {content.live.upcoming.map((item) => (
          <FadeIn key={item.title}>
            <div className="flex items-center justify-between rounded-xl border bg-card p-4">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </div>
              <Badge variant="outline">{item.platform}</Badge>
            </div>
          </FadeIn>
        ))}
      </div>

      <LivePlatformCards
        platforms={platforms}
        openLabel={t('common.open')}
        directMassesLabel={t('live.directMasses')}
        watchLabels={watchLabels}
        streamHint={t('live.streamHint')}
      />

      <p className="mt-8 text-center text-sm text-muted-foreground">{t('live.notifyHint')}</p>
    </PageShell>
  )
}
