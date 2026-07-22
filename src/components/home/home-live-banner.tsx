import { Link } from 'react-router-dom'
import { Radio, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LiveStatusBadge } from '@/components/live/live-stream-ui'
import { useLanguage } from '@/i18n/language-provider'

export function HomeLiveBanner() {
  const { t, content, liveStreamConfig } = useLanguage()
  const isAnyLive = liveStreamConfig.platforms.some((p) => p.isLive)
  const nextBroadcast = content.live.upcoming[0]

  return (
    <section id="direct" className="section-padding bg-muted/50">
      <div className="container-wide">
        <FadeIn>
          <Card
            className={
              isAnyLive
                ? 'overflow-hidden border-2 border-red-500 animate-[live-glow_1.5s_ease-in-out_infinite]'
                : 'overflow-hidden border-gold/20'
            }
          >
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Radio className="h-5 w-5 shrink-0 text-gold" aria-hidden />
                  <h2 className="text-xl font-bold md:text-2xl">{t('live.title')}</h2>
                  <LiveStatusBadge
                    isLive={isAnyLive}
                    liveLabel={t('live.liveBadge')}
                    offlineLabel={t('common.noLiveNow')}
                  />
                </div>
                {isAnyLive ? (
                  <p className="text-base leading-relaxed text-muted-foreground">{t('home.liveNowHint')}</p>
                ) : nextBroadcast ? (
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {t('home.nextMass')}{' '}
                    <span className="font-semibold text-foreground">{nextBroadcast.title}</span>
                    {' — '}
                    {nextBroadcast.date}
                  </p>
                ) : (
                  <p className="text-base leading-relaxed text-muted-foreground">{content.live.scheduleNote}</p>
                )}
              </div>
              <Button
                variant={isAnyLive ? 'default' : 'gold'}
                size="lg"
                className="min-h-11 w-full shrink-0 sm:w-auto"
                asChild
              >
                <Link to="/messe-en-direct">
                  {isAnyLive ? t('home.watchLiveNow') : t('home.viewLivePage')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}
