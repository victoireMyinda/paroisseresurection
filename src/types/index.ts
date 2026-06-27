export interface SubCommission {
  name: string
  description: string
}

export interface Commission {
  id: string
  name: string
  mission: string
  description: string
  responsible: string
  contact: string
  image?: string
  subCommissions: SubCommission[]
}

export interface Announcement {
  id: string
  title: string
  category: string
  date: string
  excerpt: string
  content: string
  media?: EventMedia
}

export type EventMedia =
  | { type: 'image'; imageKey: string }
  | { type: 'video'; youtubeId: string }

export interface WeeklyActivity {
  type: string
  title: string
  time: string
  responsible: string
}

export type WeeklySchedule = Record<string, WeeklyActivity[]>

export interface PaymentMethod {
  id: string
  name: string
  number: string
  logo: string
}

export const announcementCategories: Record<string, string> = {
  communiques: 'Communiqués',
  evenements: 'Événements',
  retraites: 'Retraites',
  veillees: 'Veillées',
  bans: 'Bans de mariage',
  baptemes: 'Baptêmes',
  ordinations: 'Ordinations',
  funerailles: 'Funérailles',
  pelerinages: 'Pèlerinages',
}

export const dayLabels: Record<string, string> = {
  lundi: 'Lundi',
  mardi: 'Mardi',
  mercredi: 'Mercredi',
  jeudi: 'Jeudi',
  vendredi: 'Vendredi',
  samedi: 'Samedi',
  dimanche: 'Dimanche',
}
