import type { ChurchSectionId } from '@/config/navigation'
import type { LiveStreamConfig } from '@/components/live/live-stream-ui'
import type { GalleryImage } from '@/assets/parish-images'
import { parishImages } from '@/assets/parish-images'
import type { SiteContent, AnnouncementContent } from '@/i18n/content/types'
import { buildAnnouncementCategories, emptySiteContent } from '@/firebase/empty-content'
import { resolveYoutubeUrls } from '@/lib/media-utils'
import { resolveLiveEmbedUrl } from '@/lib/live-embed'
import mediaData from '@/data/media.json'
import type {
  AnnouncementRecord,
  CmsDatabase,
  DonationPaymentMethodRecord,
  HomeHeroSlideRecord,
  ParishVisitRecord,
} from '@/types/cms'
import type { VisitSlot } from '@/i18n/content/types'

export interface SiteInfo {
  phone: string
  phoneDisplay: string
  email: string
  address: string
  officeHours: string
  whatsappNumber: string
  whatsappMessage: string
  social: Record<string, string>
  logoUrl: string
  primaryTitle: string
  secondaryTitle: string
  archdioceseBannerTitle: string
  headerArchdiocese: string
  headerDeanery: string
  headerParish: string
  headerLocation: string
}

export interface PaymentMethodsGroup {
  mobile: DonationPaymentMethodRecord[]
  bank: DonationPaymentMethodRecord[]
}

export interface MappedSiteData {
  content: SiteContent
  weeklyAnnouncements: AnnouncementContent[]
  siteInfo: SiteInfo
  heroSlides: HomeHeroSlideRecord[]
  galleryImages: GalleryImage[]
  galleryVideos: GalleryVideoItem[]
  pageBanners: Record<string, PageBannerContent>
  commissionImageMap: Record<string, string>
  liveStreamConfig: LiveStreamConfig
  paymentMethods: PaymentMethodsGroup
}

export interface GalleryVideoItem {
  id: string
  title: string
  description: string
  category: string
  thumbnail: string
  watchUrl: string
  embedUrl: string
  videoUrl?: string
}

export interface PageBannerContent {
  imageUrl: string
  title: string
  titleLine2?: string
  description: string
}

export const emptySiteInfo: SiteInfo = {
  phone: '',
  phoneDisplay: '',
  email: '',
  address: '',
  officeHours: '',
  whatsappNumber: '',
  whatsappMessage: '',
  social: {},
  logoUrl: '',
  primaryTitle: '',
  secondaryTitle: '',
  archdioceseBannerTitle: '',
  headerArchdiocese: '',
  headerDeanery: '',
  headerParish: '',
  headerLocation: '',
}

export const emptyLiveConfig: LiveStreamConfig = {
  title: '',
  subtitle: '',
  description: '',
  scheduleNote: '',
  notifyHint: '',
  featuredVideo: {
    title: '',
    description: '',
    watchUrl: '',
    embedUrl: '',
  },
  upcoming: [],
  platforms: [],
}

function first<T>(items: T[] | undefined): T | undefined {
  return items?.[0]
}

function mapAnnouncement(record: AnnouncementRecord): AnnouncementContent {
  let media: AnnouncementContent['media']
  if (record.mediaType === 'image' && record.mediaImageUrl) {
    media = { type: 'image', imageKey: record.mediaImageUrl }
  } else if (record.mediaType === 'video' && record.mediaYoutubeId) {
    media = { type: 'video', youtubeId: record.mediaYoutubeId }
  }

  return {
    id: record.id,
    title: record.title,
    category: record.category,
    date: record.date,
    excerpt: record.excerpt,
    content: record.content,
    media,
  }
}

function buildGalleryImages(photos: CmsDatabase['mediaPhotos']): GalleryImage[] {
  return photos.map((photo) => ({
    id: photo.id,
    src: photo.imageUrl || photo.thumbnailUrl,
    thumbSrc: photo.thumbnailUrl || photo.imageUrl,
    title: photo.title,
    category: photo.category,
  }))
}

function buildGalleryVideos(videos: CmsDatabase['mediaVideos']): GalleryVideoItem[] {
  return videos.map((video) => {
    const isDirectVideo = (video.videoSource === 'url' || video.videoSource === 'upload') && !!video.videoUrl
    const urls = !isDirectVideo ? resolveYoutubeUrls(video.youtubeId) : { embedUrl: '', watchUrl: '', thumbnail: '' }
    return {
      id: video.id,
      title: video.title,
      description: video.description,
      category: video.category ?? '',
      thumbnail: video.thumbnailUrl || urls.thumbnail || parishImages.chorale,
      watchUrl: isDirectVideo ? video.videoUrl ?? '#' : urls.watchUrl || '#',
      embedUrl: urls.embedUrl,
      videoUrl: isDirectVideo ? video.videoUrl : undefined,
    }
  })
}

function buildPageBanners(banners: CmsDatabase['pageBanners']): Record<string, PageBannerContent> {
  const map: Record<string, PageBannerContent> = {}
  for (const banner of banners) {
    if (!banner.imageUrl) continue

    const content: PageBannerContent = {
      imageUrl: banner.imageUrl,
      title: banner.title,
      titleLine2: banner.titleLine2,
      description: banner.description,
    }
    const key = banner.pagePath.replace(/^\//, '').replace(/\//g, '-') || banner.id
    map[key] = content
    map[banner.id] = content
    map[banner.pagePath] = content
    map[banner.pagePath.replace(/^\//, '')] = content
  }
  return map
}

function buildCommissionImageMap(commissions: CmsDatabase['parishCommissions']): Record<string, string> {
  const map: Record<string, string> = {}
  for (const c of commissions) {
    if (c.imageUrl) map[c.id] = c.imageUrl
  }
  return map
}

const PARISH_LOGO_HEADER_DEFAULTS = {
  headerArchdiocese: 'Archidiocèse de Kinshasa',
  headerDeanery: 'Doyenné Elimo Santu',
  headerParish: 'PAROISSE DE LA RESURRECTION',
  headerLocation: 'Lemba/Salongo',
  archdioceseBannerTitle: 'Archidiocèse de Kinshasa',
} as const

function resolveLogoHeaderField(
  value: string | undefined,
  fallback: string,
): string {
  const trimmed = value?.trim()
  return trimmed || fallback
}

function buildSiteInfo(data: Partial<CmsDatabase>): SiteInfo {
  const contact = first(data.contacts)
  const logo = first(data.parishLogos)
  const socialEntries = (data.socialNetworks ?? []).reduce<Record<string, string>>((acc, item) => {
    acc[item.id] = item.link
    return acc
  }, {})

  const mainPhone = contact?.phones?.[0]
  const whatsappLink = socialEntries.whatsapp ?? ''

  return {
    phone: mainPhone?.number ? `+${mainPhone.number.replace(/\D/g, '')}` : '',
    phoneDisplay: mainPhone?.number ?? '',
    email: contact?.email ?? '',
    address: contact?.physicalAddress ?? '',
    officeHours: '',
    whatsappNumber: whatsappLink.replace(/\D/g, '') || '',
    whatsappMessage: '',
    social: socialEntries,
    logoUrl: logo?.imageUrl ?? '',
    primaryTitle: logo?.primaryTitle ?? '',
    secondaryTitle: logo?.secondaryTitle ?? '',
    archdioceseBannerTitle: resolveLogoHeaderField(
      logo?.archdioceseBannerTitle,
      PARISH_LOGO_HEADER_DEFAULTS.archdioceseBannerTitle,
    ),
    headerArchdiocese: resolveLogoHeaderField(
      logo?.headerArchdiocese,
      PARISH_LOGO_HEADER_DEFAULTS.headerArchdiocese,
    ),
    headerDeanery: resolveLogoHeaderField(
      logo?.headerDeanery,
      PARISH_LOGO_HEADER_DEFAULTS.headerDeanery,
    ),
    headerParish: resolveLogoHeaderField(
      logo?.headerParish,
      PARISH_LOGO_HEADER_DEFAULTS.headerParish,
    ),
    headerLocation: resolveLogoHeaderField(
      logo?.headerLocation,
      PARISH_LOGO_HEADER_DEFAULTS.headerLocation,
    ),
  }
}

function buildLiveStreamConfig(data: Partial<CmsDatabase>): LiveStreamConfig {
  const settings = first(data.liveStreamSettings)
  if (!settings) return emptyLiveConfig

  return {
    title: settings.title,
    subtitle: settings.subtitle,
    description: settings.description,
    scheduleNote: settings.scheduleNote,
    notifyHint: settings.notifyHint,
    featuredVideo: {
      title: settings.featuredTitle,
      description: settings.featuredDescription,
      watchUrl: settings.featuredWatchUrl,
      embedUrl: resolveLiveEmbedUrl(settings.featuredWatchUrl, settings.featuredEmbedUrl, 'youtube'),
    },
    upcoming: settings.upcoming ?? [],
    platforms: (data.liveStreamPlatforms ?? []).map((p) => ({
      id: p.id,
      name: p.name,
      order: p.order,
      watchUrl: p.watchUrl,
      embedUrl: resolveLiveEmbedUrl(p.watchUrl, p.embedUrl, p.id, { autoplay: p.isLive }),
      offlineTitle: p.offlineTitle,
      offlineDescription: p.offlineDescription,
      isLive: p.isLive,
    })),
  }
}

function buildChurchContent(data: Partial<CmsDatabase>): SiteContent['church'] {
  const church = { ...emptySiteContent.church }
  for (const section of data.churchSections ?? []) {
    const id = section.id as ChurchSectionId
    if (id in church) {
      church[id] = {
        title: section.title,
        subtitle: section.subtitle,
        blocks: section.blocks,
      }
    }
  }
  return church
}

function mapVisitSlot(record: ParishVisitRecord): VisitSlot {
  return {
    id: record.id,
    name: record.name,
    day: record.day,
    timeRange: record.timeRange,
    location: record.location,
    phone: record.phone,
  }
}

/** Mappe les collections Firestore vers le modèle du portail public (sans JSON local). */
export function mapCmsToSiteData(data: Partial<CmsDatabase>): MappedSiteData {
  const about = first(data.homeAbout)
  const curateMessage = first(data.homeCurateMessages)
  const calendar = first(data.liturgyCalendar)
  const homily = first(data.liturgyHomily)
  const daily = first(data.liturgyDaily)
  const donations = first(data.donationSettings)

  const parishAnnouncements = (data.parishAnnouncements ?? []).map(mapAnnouncement)
  const weeklyAnnouncements = (data.weeklyAnnouncements ?? []).map(mapAnnouncement)

  const content: SiteContent = {
    ...emptySiteContent,
    parish: {
      presentation: about?.presentation ?? '',
      historySummary: about?.historySummary ?? '',
      history: {
        title: about?.title ?? '',
        sections: (data.parishHistorySections ?? []).map((s) => ({
          heading: s.heading,
          paragraphs: [s.content],
        })),
      },
      curates: (data.parishCurates ?? []).map((c) => ({
        name: c.name,
        period: c.period,
        achievements: c.achievements,
        image: c.imageUrl,
      })),
      groups: (data.parishGroups ?? []).map((g) => ({
        name: g.name,
        mission: g.mission,
        activities: g.activities,
        responsible: g.responsible,
      })),
      parishLife: emptySiteContent.parish.parishLife,
      curateMessage: curateMessage
        ? {
            title: curateMessage.title,
            name: curateMessage.name,
            role: curateMessage.role,
            greeting: curateMessage.greeting,
            content: curateMessage.content,
            signature: curateMessage.signature,
          }
        : emptySiteContent.parish.curateMessage,
      liturgySchedule: (data.parishMassCategories ?? []).map((c) => ({
        category: c.category,
        items: c.items,
      })),
    },
    announcements: parishAnnouncements,
    announcementCategories: buildAnnouncementCategories(parishAnnouncements),
    commissions: (data.parishCommissions ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      mission: c.mission,
      description: c.description,
      responsible: c.responsible,
      contact: c.contact,
      subCommissions: c.subCommissions,
    })),
    weeklySchedule: (data.parishWeeklyDays ?? []).map((d) => ({
      day: d.dayLabel,
      activities: d.activities,
    })),
    donations: donations
      ? {
          spiritualIntro: donations.spiritualIntro,
          spiritualTitle: donations.spiritualTitle,
          verses: donations.verses,
          spiritualMessage: donations.spiritualMessage,
          thankYou: donations.thankYou,
          receiptNote: donations.receiptNote,
        }
      : emptySiteContent.donations,
    church: buildChurchContent(data),
    media: {
      albums: (data.mediaAlbums ?? []).map((a) => ({
        id: a.id,
        title: a.title,
        description: a.description,
        imageIds: Array.isArray(a.photoIds) ? a.photoIds : [],
      })),
      galleryCategories: Object.fromEntries(
        mediaData.categories.map((category) => [category, category]),
      ),
      imageTitles: Object.fromEntries((data.mediaPhotos ?? []).map((p) => [p.id, p.title])),
    },
    liturgy: {
      season: calendar?.season ?? '',
      color: calendar?.color ?? '',
      readings: daily?.readings ?? [],
      gospel: daily
        ? { reference: daily.gospelReference, text: daily.gospelText }
        : emptySiteContent.liturgy.gospel,
      psalm: daily
        ? { reference: daily.psalmReference, text: daily.psalmText }
        : emptySiteContent.liturgy.psalm,
      saint: daily
        ? { name: daily.saintName, feast: daily.saintFeast, meditation: daily.saintMeditation }
        : emptySiteContent.liturgy.saint,
      homily: homily
        ? {
            title: homily.title,
            liturgicalDay: homily.liturgicalDay,
            heading: homily.heading,
            excerpt: homily.excerpt,
            content: homily.content,
          }
        : emptySiteContent.liturgy.homily,
      calendar: calendar
        ? {
            liturgicalDay: calendar.liturgicalDay,
            nextEventTitle: calendar.nextEventTitle,
            nextEventDate: calendar.nextEventDate,
            nextEventLocation: calendar.nextEventLocation,
            featuredTitle: calendar.featuredTitle,
            featuredSubtitle: calendar.featuredSubtitle,
            featuredDescription: calendar.featuredDescription,
            featuredCtaLabel: calendar.featuredCtaLabel,
            featuredCtaHref: calendar.featuredCtaHref,
            seasons: calendar.seasons,
          }
        : undefined,
    },
    live: {
      title: data.liveStreamSettings?.[0]?.title ?? '',
      subtitle: data.liveStreamSettings?.[0]?.subtitle ?? '',
      description: data.liveStreamSettings?.[0]?.description ?? '',
      scheduleNote: data.liveStreamSettings?.[0]?.scheduleNote ?? '',
      upcoming: data.liveStreamSettings?.[0]?.upcoming ?? [],
    },
    visitHours: {
      secretary: (data.parishSecretaryVisits ?? []).map(mapVisitSlot),
      curate: (data.parishCurateVisits ?? []).map(mapVisitSlot),
    },
  }

  const paymentRecords = data.donationPaymentMethods ?? []

  return {
    content,
    weeklyAnnouncements: weeklyAnnouncements.length ? weeklyAnnouncements : parishAnnouncements,
    siteInfo: buildSiteInfo(data),
    heroSlides: data.homeHeroSlides ?? [],
    galleryImages: buildGalleryImages(data.mediaPhotos ?? []),
    galleryVideos: buildGalleryVideos(data.mediaVideos ?? []),
    pageBanners: buildPageBanners(data.pageBanners ?? []),
    commissionImageMap: buildCommissionImageMap(data.parishCommissions ?? []),
    liveStreamConfig: buildLiveStreamConfig(data),
    paymentMethods: {
      mobile: paymentRecords.filter((p) => p.type === 'mobile'),
      bank: paymentRecords.filter((p) => p.type === 'bank'),
    },
  }
}

export function getPageBannerForPath(
  banners: Record<string, PageBannerContent>,
  path: string,
): PageBannerContent | undefined {
  const normalized = path.replace(/^\//, '')
  return (
    banners[normalized] ??
    banners[normalized.replace(/\//g, '-')] ??
    banners[path] ??
    undefined
  )
}

export function getBannerForPath(banners: Record<string, PageBannerContent>, path: string, fallback: string): string {
  return getPageBannerForPath(banners, path)?.imageUrl || fallback
}

export function getCurateMessageImage(data: Partial<CmsDatabase>, fallback: string): string {
  return first(data.homeCurateMessages)?.imageUrl || fallback
}

export function getAboutImage(data: Partial<CmsDatabase>, fallback: string): string {
  return first(data.homeAbout)?.imageUrl || fallback
}
