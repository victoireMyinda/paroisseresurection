import commissionsData from '@/data/commissions.json'
import announcementsData from '@/data/announcements.json'
import parishData from '@/data/parish.json'
import weeklyScheduleData from '@/data/weekly-schedule.json'
import donationsData from '@/data/donations.json'
import { galleryImages, galleryVideos } from '@/assets/parish-images'
import type { Commission, Announcement, WeeklySchedule } from '@/types'

export const parish = parishData
export const commissions = commissionsData as Commission[]
export const announcements = announcementsData as Announcement[]
export const weeklySchedule = weeklyScheduleData as WeeklySchedule
export const donations = donationsData

export { galleryImages, galleryVideos }
