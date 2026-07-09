import { motion } from 'framer-motion'
import { SectionHeading, FadeIn } from '@/components/section-heading'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import {
  LiveFeaturedPlayer,
  LivePlatformCards,
  LiveStatusBadge,
  getWatchLabels,
} from '@/components/live/live-stream-ui'

export function LiveMassesSection() {
  const { t } = useLanguage()
  const { liveStreamConfig } = useSiteData()
  const { platforms, featuredVideo } = liveStreamConfig
  const isAnyLive = platforms.some((p) => p.isLive)
  const watchLabels = getWatchLabels(t)

  return (
    <section id="direct" className="section-padding bg-muted/50">
      <div className="container-wide">
        <SectionHeading title={t('live.title')} subtitle={t('live.subtitle')} />

        <FadeIn>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <LiveStatusBadge
              isLive={isAnyLive}
              liveLabel={t('live.liveBadge')}
              offlineLabel={t('common.noLiveNow')}
            />
            <p className="text-sm text-muted-foreground">{liveStreamConfig.scheduleNote}</p>
          </div>
        </FadeIn>

        <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground leading-relaxed">
          {liveStreamConfig.description}
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

        <LivePlatformCards
          platforms={platforms}
          openLabel={t('common.open')}
          directMassesLabel={t('live.directMasses')}
          watchLabels={watchLabels}
          streamHint={t('live.streamHint')}
        />

        <FadeIn>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            {liveStreamConfig.notifyHint}
          </motion.p>
        </FadeIn>
      </div>
    </section>
  )
}
