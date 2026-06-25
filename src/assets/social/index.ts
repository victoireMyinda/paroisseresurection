import facebook from './facebook.svg'
import whatsapp from './whatsapp.svg'
import youtube from './youtube.svg'
import instagram from './instagram.svg'
import tiktok from './tiktok.svg'

export const socialLogos = {
  facebook,
  whatsapp,
  youtube,
  instagram,
  tiktok,
} as const

export type SocialNetwork = keyof typeof socialLogos

export interface SocialLink {
  id: SocialNetwork
  name: string
  url: string
}
