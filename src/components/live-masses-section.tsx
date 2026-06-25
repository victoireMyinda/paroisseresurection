import { ExternalLink, Radio } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeading, FadeIn } from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import liveData from '@/data/live.json'
import { socialLogos } from '@/assets/social'
import { siteConfig } from '@/config/site'

const platformLogos: Record<string, string> = {
  youtube: socialLogos.youtube,
  facebook: socialLogos.facebook,
}

export function LiveMassesSection() {
  const platforms = liveData.platforms.map((platform) => ({
    ...platform,
    watchUrl:
      platform.id === 'youtube'
        ? siteConfig.live.youtube
        : platform.id === 'facebook'
          ? siteConfig.live.facebook
          : platform.watchUrl,
    embedUrl:
      platform.id === 'youtube' && !platform.embedUrl
        ? siteConfig.featuredVideo.embedUrl
        : platform.embedUrl,
  }))

  return (
    <section id="direct" className="section-padding bg-muted/50">
      <div className="container-wide">
        <SectionHeading title={liveData.title} subtitle={liveData.subtitle} />

        <FadeIn>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <Badge className="gap-2 border-red-500/30 bg-red-500/10 px-4 py-1.5 text-red-600 dark:text-red-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
              </span>
              LIVE
            </Badge>
            <p className="text-sm text-muted-foreground">{liveData.scheduleNote}</p>
          </div>
        </FadeIn>

        <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground leading-relaxed">
          {liveData.description}
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
                <p className="font-semibold">{liveData.featuredVideo.title}</p>
                <p className="text-sm text-muted-foreground">
                  {liveData.featuredVideo.description}
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <a
                  href={siteConfig.featuredVideo.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir sur YouTube
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          {platforms.map((platform, i) => (
            <FadeIn key={platform.id} delay={i * 0.1}>
              <Card className="overflow-hidden">
                <div className="relative aspect-video bg-foreground/5">
                  {platform.embedUrl ? (
                    <iframe
                      title={`Messe en direct — ${platform.name}`}
                      src={platform.embedUrl}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                      <img
                        src={platformLogos[platform.id]}
                        alt=""
                        className="h-14 w-14"
                        width={56}
                        height={56}
                      />
                      <div>
                        <p className="font-semibold">Diffusion sur {platform.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Le flux vidéo apparaît ici lorsque la messe est en cours.
                        </p>
                      </div>
                      <Button asChild variant="default" size="lg">
                        <a
                          href={platform.watchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Radio className="h-4 w-4" />
                          Voir sur {platform.name}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={platformLogos[platform.id]}
                      alt=""
                      className="h-8 w-8"
                      width={32}
                      height={32}
                    />
                    <div>
                      <p className="font-semibold">{platform.name}</p>
                      <p className="text-xs text-muted-foreground">Messes en direct</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={platform.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ouvrir
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            Activez les notifications sur nos pages YouTube et Facebook pour être alerté dès le
            début de chaque diffusion.
          </motion.p>
        </FadeIn>
      </div>
    </section>
  )
}
