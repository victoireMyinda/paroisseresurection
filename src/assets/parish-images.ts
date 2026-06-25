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

export const parishImages = {
  hero: eglise,
  logo: eglise,
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
  title: string
  category: string
}

export const galleryImages: GalleryImage[] = [
  { id: '1', src: eglise, title: 'Notre église', category: 'Église' },
  { id: '2', src: paroisse, title: 'Vue de la paroisse', category: 'Église' },
  { id: '3', src: chorale, title: 'Chorale paroissiale', category: 'Liturgie' },
  { id: '4', src: fidele, title: 'Communauté des fidèles', category: 'Vie paroissiale' },
  { id: '5', src: cloche, title: 'Cloche paroissiale', category: 'Patrimoine' },
  { id: '6', src: cloche2, title: 'Clocher', category: 'Patrimoine' },
  { id: '7', src: grotte, title: 'Grotte mariale', category: 'Dévotion' },
  { id: '8', src: anciennegrotte, title: 'Ancienne grotte', category: 'Histoire' },
  { id: '9', src: nouvellegrotte, title: 'Nouvelle grotte', category: 'Dévotion' },
  { id: '10', src: statutmarie, title: 'Statue de la Vierge Marie', category: 'Dévotion' },
]

export const galleryVideos = [
  {
    id: 'v1',
    title: 'Célébration paroissiale',
    thumbnail: 'https://img.youtube.com/vi/FxMDSUhFgSk/hqdefault.jpg',
    watchUrl: 'https://www.youtube.com/watch?v=FxMDSUhFgSk',
    embedUrl: 'https://www.youtube.com/embed/FxMDSUhFgSk',
  },
  { id: 'v2', title: 'Chorale — Chants liturgiques', thumbnail: chorale, watchUrl: '#', embedUrl: '' },
  { id: 'v3', title: 'Grotte mariale — Prière', thumbnail: grotte, watchUrl: '#', embedUrl: '' },
]

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
