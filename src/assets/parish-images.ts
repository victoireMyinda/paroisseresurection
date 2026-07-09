import eglise from './eglise.webp'
import paroisse from './paroisse.webp'
import chorale from './chorale.webp'
import fidele from './fidele.webp'
import cloche from './cloche.webp'
import cloche2 from './cloche2.webp'
import grotte from './grotte.webp'
import anciennegrotte from './anciennegrotte.webp'
import nouvellegrotte from './nouvellegrotte.webp'
import statutmarie from './statutmarie.webp'
import mediaData from '@/data/media.json'
import { resolvePhotoFullSrc, resolvePhotoSrc, resolveYoutubeUrls } from '@/lib/media-utils'
import type { MediaPhotoData } from '@/lib/media-utils'

export const parishImages = {
  hero: eglise,
  logo: paroisse,
  eglise,
  paroisse,
  chorale,
  fidele,
  cloche,
  cloche2,
  grotte,
  anciennegrotte,
  nouvellegrotte,
  statutmarie,
} as const

export interface GalleryImage {
  id: string
  src: string
  thumbSrc: string
  title: string
  category: string
}

export const galleryImages: GalleryImage[] = mediaData.photos.map((photo) => {
  const p = photo as MediaPhotoData
  return {
    id: p.id,
    src: resolvePhotoFullSrc(p),
    thumbSrc: resolvePhotoSrc(p, true),
    title: p.title,
    category: p.category,
  }
})

export const galleryVideos = mediaData.videos.map((video) => {
  const urls = resolveYoutubeUrls(video.youtubeId)
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnail: urls.thumbnail || chorale,
    watchUrl: urls.watchUrl || '#',
    embedUrl: urls.embedUrl,
  }
})

export const commissionImageMap: Record<string, string> = {
  liturgique: chorale,
  catechese: fidele,
  jeunesse: paroisse,
  famille: statutmarie,
  'justice-paix': eglise,
  caritas: fidele,
  finance: cloche2,
  communication: paroisse,
  evangelisation: grotte,
  mouvements: chorale,
}

export const parishLifeImages = [chorale, fidele, grotte, paroisse] as const

export const pageBanners: Record<string, string> = {
  commissions: chorale,
  'annonces-hebdomadaires': fidele,
  annonces: paroisse,
  dons: statutmarie,
  medias: eglise,
  contact: paroisse,
}
