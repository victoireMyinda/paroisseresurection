import type { ChurchSectionId } from '@/config/navigation'

export interface ContentBlock {
  heading?: string
  paragraphs: string[]
}

export interface ChurchSectionContent {
  title: string
  subtitle: string
  blocks: ContentBlock[]
}

export interface CurateRecord {
  name: string
  period: string
  achievements: string[]
  image?: string
}

export interface GroupRecord {
  name: string
  mission: string
  activities: string
  responsible: string
}

export interface WorkProject {
  id: string
  title: string
  status: 'planned' | 'in_progress' | 'completed'
  progress: number
  description: string
  goal: string
  image: string
}

export interface AnnouncementContent {
  id: string
  title: string
  category: string
  date: string
  excerpt: string
  content: string
  media?: { type: 'image'; imageKey: string } | { type: 'video'; youtubeId: string }
}

export interface CommissionContent {
  id: string
  name: string
  mission: string
  description: string
  responsible: string
  contact: string
  subCommissions: { name: string; description: string }[]
}

export interface WeeklyDay {
  day: string
  activities: { time: string; title: string; location: string }[]
}

export interface LiturgyDayContent {
  season: string
  color: string
  readings: { type: string; reference: string; text: string }[]
  gospel: { reference: string; text: string }
  psalm: { reference: string; text: string }
  saint: { name: string; feast: string; meditation: string }
  homily: { title: string; liturgicalDay: string; heading: string; excerpt: string; content: string }
}

export interface SiteContent {
  parish: {
    presentation: string
    historySummary: string
    history: { title: string; sections: ContentBlock[] }
    curates: CurateRecord[]
    groups: GroupRecord[]
    parishLife: { title: string; description: string; highlights: { title: string; description: string }[] }
    curateMessage: {
      title: string
      name: string
      role: string
      greeting: string
      content: string
      signature: string
    }
    liturgySchedule: {
      category: string
      items: { day: string; time: string; description: string }[]
    }[]
  }
  events: {
    works: WorkProject[]
  }
  liturgy: LiturgyDayContent
  announcements: AnnouncementContent[]
  announcementCategories: Record<string, string>
  commissions: CommissionContent[]
  weeklySchedule: WeeklyDay[]
  donations: {
    spiritualIntro: string
    spiritualTitle: string
    verses: { reference: string; text: string }[]
    spiritualMessage: string
    thankYou: string
    receiptNote: string
  }
  church: Record<ChurchSectionId, ChurchSectionContent>
  media: {
    albums: { id: string; title: string; description: string; imageIds: string[] }[]
    galleryCategories: Record<string, string>
    imageTitles: Record<string, string>
  }
  live: {
    title: string
    subtitle: string
    description: string
    scheduleNote: string
    upcoming: { title: string; date: string; platform: string }[]
  }
}
