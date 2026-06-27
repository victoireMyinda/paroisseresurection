import { Play } from 'lucide-react'
import type { EventMedia } from '@/types'
import {
  getEventYoutubeEmbed,
  getEventYoutubeThumbnail,
  resolveEventImage,
} from '@/lib/event-media'
import { cn } from '@/lib/utils'

interface EventMediaDisplayProps {
  media?: EventMedia
  title: string
  className?: string
  aspect?: 'video' | 'banner'
}

export function EventMediaDisplay({
  media,
  title,
  className,
  aspect = 'banner',
}: EventMediaDisplayProps) {
  if (!media) return null

  const aspectClass = aspect === 'video' ? 'aspect-video' : 'aspect-[16/9] max-h-44'

  if (media.type === 'video' && media.youtubeId) {
    const embed = getEventYoutubeEmbed(media)
    if (!embed) return null

    return (
      <div className={cn('overflow-hidden rounded-t-lg bg-black', className)}>
        <div className={cn('relative w-full', aspectClass)}>
          <iframe
            title={title}
            src={embed}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    )
  }

  if (media.type === 'image') {
    const src = resolveEventImage(media.imageKey)
    if (!src) return null

    return (
      <div className={cn('overflow-hidden rounded-t-lg', className)}>
        <img
          src={src}
          alt=""
          className={cn('w-full object-cover', aspectClass)}
          loading="lazy"
        />
      </div>
    )
  }

  return null
}

/** Compact thumbnail for list/calendar views — video shows poster + play icon */
export function EventMediaThumb({ media }: { media?: EventMedia; title?: string }) {
  if (!media) return null

  if (media.type === 'image') {
    const src = resolveEventImage(media.imageKey)
    if (!src) return null
    return (
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
    )
  }

  if (media.type === 'video') {
    const thumb = getEventYoutubeThumbnail(media)
    if (!thumb) return null
    return (
      <div className="relative h-full w-full">
        <img src={thumb} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/90 text-[#0a0a0a]">
            <Play className="h-4 w-4 fill-current" />
          </span>
        </div>
      </div>
    )
  }

  return null
}
