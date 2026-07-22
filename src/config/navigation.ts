export interface NavItem {
  key: string
  href: string
  children?: NavItem[]
}

export const mainNavigation: NavItem[] = [
  { key: 'nav.home', href: '/' },
  {
    key: 'nav.announcements',
    href: '/annonces/semaine',
    children: [
      { key: 'nav.announcements.weekly', href: '/annonces/semaine' },
      { key: 'nav.announcements.all', href: '/annonces/toutes' },
    ],
  },
  {
    key: 'nav.parish',
    href: '/notre-paroisse/histoire',
    children: [
      { key: 'nav.parish.history', href: '/notre-paroisse/histoire' },
      { key: 'nav.parish.curates', href: '/notre-paroisse/cures' },
      { key: 'nav.parish.masses', href: '/notre-paroisse/messes' },
      { key: 'nav.parish.commissions', href: '/notre-paroisse/commissions' },
      { key: 'nav.parish.groups', href: '/notre-paroisse/groupes' },
      { key: 'nav.parish.visits', href: '/visites-horaires' },
    ],
  },
  {
    key: 'nav.liturgy',
    href: '/liturgie/homelie',
    children: [
      { key: 'nav.liturgy.homily', href: '/liturgie/homelie' },
      { key: 'nav.liturgy.daily', href: '/liturgie/parole-saint' },
      { key: 'nav.liturgy.calendar', href: '/liturgie/calendrier' },
    ],
  },
  { key: 'nav.live', href: '/messe-en-direct' },
  { key: 'nav.media', href: '/medias' },
  { key: 'nav.contact', href: '/contact' },
  {
    key: 'nav.church',
    href: '/eglise/histoire',
    children: [
      { key: 'nav.church.history', href: '/eglise/histoire' },
      { key: 'nav.church.sacraments', href: '/eglise/sacrements' },
      { key: 'nav.church.liturgy', href: '/eglise/liturgie' },
      { key: 'nav.church.seasons', href: '/eglise/temps-liturgique' },
      { key: 'nav.church.feasts', href: '/eglise/fetes' },
      { key: 'nav.church.saints', href: '/eglise/saints' },
      { key: 'nav.church.prayers', href: '/eglise/prieres' },
      { key: 'nav.church.catechism', href: '/eglise/catechisme' },
      { key: 'nav.church.documents', href: '/eglise/documents' },
      { key: 'nav.church.bible', href: '/eglise/bible' },
      { key: 'nav.church.councils', href: '/eglise/conciles' },
      { key: 'nav.church.popes', href: '/eglise/papes' },
      { key: 'nav.church.vocations', href: '/eglise/vocations' },
      { key: 'nav.church.faq', href: '/eglise/faq' },
    ],
  },
]

export const parishSubNav = mainNavigation.find((n) => n.key === 'nav.parish')!.children!
export const announcementsSubNav = mainNavigation.find((n) => n.key === 'nav.announcements')!.children!
/** @deprecated Utiliser announcementsSubNav */
export const eventsSubNav = announcementsSubNav
export const liturgySubNav = mainNavigation.find((n) => n.key === 'nav.liturgy')!.children!
export const churchSubNav = mainNavigation.find((n) => n.key === 'nav.church')!.children!

export type ChurchSectionId =
  | 'histoire'
  | 'sacrements'
  | 'liturgie'
  | 'temps-liturgique'
  | 'fetes'
  | 'saints'
  | 'prieres'
  | 'catechisme'
  | 'documents'
  | 'bible'
  | 'conciles'
  | 'papes'
  | 'vocations'
  | 'faq'

export const churchSectionIds: ChurchSectionId[] = [
  'histoire',
  'sacrements',
  'liturgie',
  'temps-liturgique',
  'fetes',
  'saints',
  'prieres',
  'catechisme',
  'documents',
  'bible',
  'conciles',
  'papes',
  'vocations',
  'faq',
]

/** Liens essentiels — affichés en tête des menus mobile */
export const priorityNavLinks: NavItem[] = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.announcements.weekly', href: '/annonces/semaine' },
  { key: 'nav.announcements.all', href: '/annonces/toutes' },
  { key: 'nav.parish.history', href: '/notre-paroisse/histoire' },
  { key: 'nav.liturgy.homily', href: '/liturgie/homelie' },
  { key: 'nav.liturgy.daily', href: '/liturgie/parole-saint' },
  { key: 'nav.live', href: '/messe-en-direct' },
]

/** Groupes complets pour plan du site et menus étendus */
export interface SiteMenuGroup {
  key: string
  href?: string
  priority?: boolean
  children: NavItem[]
}

export const siteMenuGroups: SiteMenuGroup[] = [
  {
    key: 'nav.announcements',
    href: '/annonces/semaine',
    priority: true,
    children: announcementsSubNav,
  },
  {
    key: 'nav.parish',
    href: '/notre-paroisse/histoire',
    priority: true,
    children: parishSubNav,
  },
  {
    key: 'nav.liturgy',
    href: '/liturgie/homelie',
    priority: true,
    children: liturgySubNav,
  },
  {
    key: 'nav.live',
    href: '/messe-en-direct',
    priority: true,
    children: [],
  },
  {
    key: 'nav.media',
    href: '/medias',
    children: [],
  },
  {
    key: 'nav.church',
    href: '/eglise/histoire',
    children: churchSubNav,
  },
  {
    key: 'nav.services',
    children: [
      { key: 'nav.contact', href: '/contact' },
      { key: 'nav.parish.visits', href: '/visites-horaires' },
      { key: 'nav.donations', href: '/dons' },
    ],
  },
]

export const legacyRedirects: Record<string, string> = {
  '/commissions': '/notre-paroisse/commissions',
  '/annonces-hebdomadaires': '/annonces/semaine',
  '/notre-paroisse/annonces-semaine': '/annonces/semaine',
  '/annonces': '/annonces/toutes',
  '/evenements/annonces': '/annonces/toutes',
  '/evenements/calendrier': '/annonces/toutes',
  '/evenements/travaux': '/annonces/toutes',
}
