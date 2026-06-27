import { parishImages } from '@/assets/parish-images'
import type { EventMedia } from '@/types'

export function resolveEventImage(imageKey?: string): string | undefined {
  if (!imageKey) return undefined
  const key = imageKey as keyof typeof parishImages
  return parishImages[key] ?? undefined
}

export function getEventYoutubeEmbed(media?: EventMedia): string | undefined {
  if (media?.type !== 'video' || !media.youtubeId) return undefined
  return `https://www.youtube.com/embed/${media.youtubeId}`
}

export function getEventYoutubeThumbnail(media?: EventMedia): string | undefined {
  if (media?.type !== 'video' || !media.youtubeId) return undefined
  return `https://img.youtube.com/vi/${media.youtubeId}/hqdefault.jpg`
}
