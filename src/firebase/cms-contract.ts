/**
 * Contrat Firestore partagé entre frontadmin (écriture) et frontuser (lecture).
 * Les deux projets sont indépendants ; seules ces collections les relient.
 */
export const CMS_PUBLIC_COLLECTIONS = [
  'contacts',
  'socialNetworks',
  'parishLogos',
  'navigationItems',
  'pageBanners',
  'homeHeroSlides',
  'homeCurateMessages',
  'homeAbout',
  'parishHistorySections',
  'parishCurates',
  'parishWeeklyDays',
  'parishMassCategories',
  'parishCommissions',
  'parishGroups',
  'weeklyAnnouncements',
  'parishAnnouncements',
  'liturgyCalendar',
  'liturgyHomily',
  'liturgyDaily',
  'liveStreamSettings',
  'liveStreamPlatforms',
  'mediaAlbums',
  'mediaPhotos',
  'mediaVideos',
  'churchSections',
  'donationSettings',
  'donationPaymentMethods',
  'parishSecretaryVisits',
  'parishCurateVisits',
] as const

export type CmsPublicCollectionName = (typeof CMS_PUBLIC_COLLECTIONS)[number]

/** Collections réservées à l'admin — jamais lues par le portail public. */
export const CMS_ADMIN_ONLY_COLLECTIONS = ['visitorMessages', 'parishUsers', 'siteAnalytics'] as const
