import { ExternalLink, Radio } from 'lucide-react'
import { socialLogos, type SocialNetwork } from '@/assets/social'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type LivePlatform = {
  id: string
  name: string
  order: number
  watchUrl: string
  embedUrl: string
  offlineTitle: string
  offlineDescription: string
  isLive: boolean
}

export type LiveStreamConfig = {
  title: string
  subtitle: string
  description: string
  scheduleNote: string
  notifyHint: string
  featuredVideo: {
    title: string
    description: string
    watchUrl: string
    embedUrl: string
  }
  upcoming: { title: string; date: string; platform: string }[]
  platforms: LivePlatform[]
}

const platformLogos: Record<string, string> = {
  youtube: socialLogos.youtube,
  facebook: socialLogos.facebook,
  tiktok: socialLogos.tiktok,
}

function getPlatformLogo(id: string): string {
  return platformLogos[id] ?? socialLogos.youtube
}

export function LiveStatusBadge({ isLive, liveLabel, offlineLabel }: { isLive: boolean; liveLabel: string; offlineLabel: string }) {
  if (isLive) {
    return (
      <Badge className="gap-2 border-red-500/30 bg-red-500/10 px-4 py-1.5 text-red-600 dark:text-red-400">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
        </span>
        {liveLabel}
      </Badge>
    )
  }
  return <Badge variant="secondary">{offlineLabel}</Badge>
}

type FeaturedPlayerProps = {
  platforms: LivePlatform[]
  featured: LiveStreamConfig['featuredVideo']
  liveLabel: string
  watchLabel: string
}

export function LiveFeaturedPlayer({ platforms, featured, liveLabel, watchLabel }: FeaturedPlayerProps) {
  const livePlatform = [...platforms].sort((a, b) => a.order - b.order).find((p) => p.isLive)
  const embedUrl = livePlatform?.embedUrl || featured.embedUrl
  const title = livePlatform ? `${livePlatform.name} — ${liveLabel}` : featured.title
  const description = livePlatform?.offlineDescription || featured.description
  const watchUrl = livePlatform?.watchUrl || featured.watchUrl

  return (
    <Card className="mx-auto max-w-4xl overflow-hidden">
      <div className="relative aspect-video bg-foreground/5">
        {embedUrl ? (
          <iframe
            title={title}
            src={embedUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-lg font-semibold">{title}</p>
            <p className="max-w-md text-sm text-muted-foreground">{description}</p>
            <Button asChild>
              <a href={watchUrl} target="_blank" rel="noopener noreferrer">
                <Radio className="h-4 w-4" />
                {watchLabel}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <a href={watchUrl} target="_blank" rel="noopener noreferrer">
            {watchLabel}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

type PlatformCardsProps = {
  platforms: LivePlatform[]
  openLabel: string
  directMassesLabel: string
  watchLabels: Record<string, string>
  streamHint: string
}

export function LivePlatformCards({
  platforms,
  openLabel,
  directMassesLabel,
  watchLabels,
  streamHint,
}: PlatformCardsProps) {
  const sorted = [...platforms].sort((a, b) => a.order - b.order)

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {sorted.map((platform) => (
        <LivePlatformCard
          key={platform.id}
          platform={platform}
          openLabel={openLabel}
          directMassesLabel={directMassesLabel}
          watchLabel={watchLabels[platform.id] ?? `${openLabel} ${platform.name}`}
          streamHint={streamHint}
        />
      ))}
    </div>
  )
}

function LivePlatformCard({
  platform,
  openLabel,
  directMassesLabel,
  watchLabel,
  streamHint,
}: {
  platform: LivePlatform
  openLabel: string
  directMassesLabel: string
  watchLabel: string
  streamHint: string
}) {
  const logo = getPlatformLogo(platform.id)
  const showEmbed = platform.isLive && Boolean(platform.embedUrl)

  return (
    <Card
      className={cn(
        'overflow-hidden transition-shadow',
        platform.isLive && 'animate-[live-glow_1.5s_ease-in-out_infinite] border-2 border-red-500',
      )}
    >
      <div className="relative aspect-video bg-foreground/5">
        {showEmbed ? (
          <iframe
            title={`${platform.name} LIVE`}
            src={platform.embedUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <img src={logo} alt="" className="h-14 w-14" width={56} height={56} />
            <div>
              <p className="font-semibold">{platform.isLive ? `${platform.name} LIVE` : platform.offlineTitle}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {platform.isLive ? streamHint : platform.offlineDescription}
              </p>
            </div>
            <Button asChild variant={platform.isLive ? 'default' : 'outline'} size="lg">
              <a href={platform.watchUrl} target="_blank" rel="noopener noreferrer">
                <Radio className="h-4 w-4" />
                {watchLabel}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
        {platform.isLive && (
          <div className="absolute left-3 top-3">
            <Badge className="gap-1.5 border-red-500/40 bg-red-600 text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              LIVE
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="flex items-center justify-between gap-3 p-4">
        <div className="flex min-w-0 items-center gap-3">
          <img src={logo} alt="" className="h-8 w-8 shrink-0" width={32} height={32} />
          <div className="min-w-0">
            <p className="truncate font-semibold">{platform.name}</p>
            <p className="text-xs text-muted-foreground">{directMassesLabel}</p>
          </div>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <a href={platform.watchUrl} target="_blank" rel="noopener noreferrer">
            {openLabel}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

export function getWatchLabels(t: (key: string) => string): Record<SocialNetwork | string, string> {
  return {
    youtube: t('live.watchYoutube'),
    facebook: t('live.watchFacebook'),
    tiktok: t('live.watchTiktok'),
  }
}
