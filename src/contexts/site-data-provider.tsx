import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { SiteContent, AnnouncementContent } from '@/i18n/content/types'
import type { LiveStreamConfig } from '@/components/live/live-stream-ui'
import type { GalleryImage } from '@/assets/parish-images'
import { parishImages } from '@/assets/parish-images'
import { isFirebaseConfiguredForPublic, subscribeCmsData } from '@/firebase/site-data-service'
import {
  mapCmsToSiteData,
  getBannerForPath,
  getCurateMessageImage,
  getAboutImage,
  emptyLiveConfig,
  emptySiteInfo,
  type MappedSiteData,
  type SiteInfo,
  type PaymentMethodsGroup,
  type GalleryVideoItem,
} from '@/firebase/map-to-content'
import type { CmsDatabase, HomeHeroSlideRecord } from '@/types/cms'

interface SiteDataContextValue {
  ready: boolean
  configured: boolean
  content: SiteContent
  weeklyAnnouncements: AnnouncementContent[]
  siteInfo: SiteInfo
  heroSlides: HomeHeroSlideRecord[]
  galleryImages: GalleryImage[]
  galleryVideos: GalleryVideoItem[]
  pageBanners: Record<string, string>
  commissionImageMap: Record<string, string>
  liveStreamConfig: LiveStreamConfig
  paymentMethods: PaymentMethodsGroup
  getBanner: (path: string, fallback?: string) => string
  curateMessageImage: string
  aboutImage: string
}

const SiteDataContext = createContext<SiteDataContextValue | undefined>(undefined)

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const configured = isFirebaseConfiguredForPublic()
  const [rawData, setRawData] = useState<Partial<CmsDatabase>>({})
  const [ready, setReady] = useState(!configured)

  useEffect(() => {
    if (!configured) return
    const unsub = subscribeCmsData((data) => {
      setRawData(data)
      setReady(true)
    })
    return unsub
  }, [configured])

  const mapped = useMemo(() => mapCmsToSiteData(rawData), [rawData])

  const value = useMemo<SiteDataContextValue>(
    () => ({
      ready,
      configured,
      content: mapped.content,
      weeklyAnnouncements: mapped.weeklyAnnouncements,
      siteInfo: configured ? mapped.siteInfo : emptySiteInfo,
      heroSlides: mapped.heroSlides,
      galleryImages: mapped.galleryImages,
      galleryVideos: mapped.galleryVideos,
      pageBanners: mapped.pageBanners,
      commissionImageMap: mapped.commissionImageMap,
      liveStreamConfig: configured ? mapped.liveStreamConfig : emptyLiveConfig,
      paymentMethods: mapped.paymentMethods,
      getBanner: (path, fallback = parishImages.chorale) =>
        getBannerForPath(mapped.pageBanners, path, fallback),
      curateMessageImage: getCurateMessageImage(rawData, parishImages.eglise),
      aboutImage: getAboutImage(rawData, parishImages.paroisse),
    }),
    [configured, mapped, rawData, ready],
  )

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

export function useSiteData(): SiteDataContextValue {
  const context = useContext(SiteDataContext)
  if (!context) throw new Error('useSiteData must be used within SiteDataProvider')
  return context
}

export type { MappedSiteData, SiteInfo }
