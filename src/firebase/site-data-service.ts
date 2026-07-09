import { collection, onSnapshot, type Unsubscribe } from 'firebase/firestore'
import { CMS_PUBLIC_COLLECTIONS } from '@/firebase/cms-contract'
import { firestore } from '@/firebase/app'
import type { CmsDatabase } from '@/types/cms'

function isFirebaseConfigured(): boolean {
  return Boolean(import.meta.env.VITE_FIREBASE_PROJECT_ID)
}

function sortByOrder<T extends { order?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

const ORDERED_COLLECTIONS = new Set([
  'parishAnnouncements',
  'weeklyAnnouncements',
  'mediaPhotos',
  'mediaVideos',
  'mediaAlbums',
  'homeHeroSlides',
  'parishHistorySections',
  'parishCurates',
  'parishWeeklyDays',
  'parishMassCategories',
  'parishCommissions',
  'parishGroups',
  'parishSecretaryVisits',
  'parishCurateVisits',
  'churchSections',
  'donationPaymentMethods',
  'liveStreamPlatforms',
  'navigationItems',
  'pageBanners',
  'socialNetworks',
])

export function isFirebaseConfiguredForPublic(): boolean {
  return isFirebaseConfigured()
}

export function subscribeCmsData(onData: (data: Partial<CmsDatabase>) => void): Unsubscribe {
  if (!isFirebaseConfigured()) {
    onData({})
    return () => {}
  }

  const state: Partial<CmsDatabase> = {}
  const unsubs: Unsubscribe[] = []

  for (const name of CMS_PUBLIC_COLLECTIONS) {
    const unsub = onSnapshot(
      collection(firestore, name),
      (snapshot) => {
        const records = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as CmsDatabase[typeof name]
        state[name] = (ORDERED_COLLECTIONS.has(name)
          ? sortByOrder(records as Array<{ order?: number }>)
          : records) as CmsDatabase[typeof name]
        onData({ ...state })
      },
      (error) => {
        console.warn(`[Firestore] Erreur lecture ${name}:`, error.message)
      },
    )
    unsubs.push(unsub)
  }

  return () => unsubs.forEach((u) => u())
}
