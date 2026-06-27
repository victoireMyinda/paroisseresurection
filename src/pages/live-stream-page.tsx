import { ExternalLink, Radio } from 'lucide-react'
import { PageShell } from '@/components/content/page-shell'
import { FadeIn } from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/i18n/language-provider'
import { siteConfig } from '@/config/site'
import { socialLogos } from '@/assets/social'
import liveData from '@/data/live.json'
import { parishImages } from '@/assets/parish-images'

export function LiveStreamPage() {
  const { t, content } = useLanguage()
  const isLive = false

  return (
    <PageShell
      title={content.live.title}
      subtitle={content.live.subtitle}
      image={parishImages.chorale}
      path="/messe-en-direct"
    >
      <FadeIn>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {isLive ? (
            <Badge className="gap-2 border-red-500/30 bg-red-500/10 px-4 py-1.5 text-red-600 dark:text-red-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
              </span>
              {t('live.liveBadge')}
            </Badge>
          ) : (
            <Badge variant="secondary">{t('common.noLiveNow')}</Badge>
          )}
          <p className="text-sm text-muted-foreground">{content.live.scheduleNote}</p>
        </div>
      </FadeIn>

      <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground leading-relaxed">
        {content.live.description}
      </p>

      <FadeIn>
        <Card className="mx-auto mb-10 max-w-4xl overflow-hidden">
          <div className="relative aspect-video">
            <iframe
              title={siteConfig.featuredVideo.title}
              src={siteConfig.featuredVideo.embedUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{t('live.featuredTitle')}</p>
              <p className="text-sm text-muted-foreground">{t('live.featuredDesc')}</p>
            </div>
            <Button asChild variant="outline" size="sm">
              <a href={siteConfig.featuredVideo.watchUrl} target="_blank" rel="noopener noreferrer">
                {t('live.watchYoutube')}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </FadeIn>

      <h2 className="mb-6 text-center text-xl font-bold">{t('common.nextBroadcasts')}</h2>
      <div className="mx-auto grid max-w-2xl gap-4">
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

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {liveData.platforms.map((platform) => (
          <FadeIn key={platform.id}>
            <Card>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-3">
                  <img
                    src={platform.id === 'youtube' ? socialLogos.youtube : socialLogos.facebook}
                    alt=""
                    className="h-10 w-10"
                  />
                  <div>
                    <p className="font-semibold">{platform.name}</p>
                    <p className="text-xs text-muted-foreground">{t('live.directMasses')}</p>
                  </div>
                </div>
                <Button asChild>
                  <a
                    href={platform.id === 'youtube' ? siteConfig.live.youtube : siteConfig.live.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Radio className="h-4 w-4" />
                    {t('common.open')}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">{t('live.notifyHint')}</p>
    </PageShell>
  )
}
