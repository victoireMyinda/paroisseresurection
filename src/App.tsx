import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider, useLanguage } from '@/i18n/language-provider'
import { Layout } from '@/components/layout/layout'
import { legacyRedirects } from '@/config/navigation'

const HomePage = lazy(() => import('@/pages/home-page').then((m) => ({ default: m.HomePage })))
const ParishHistoryPage = lazy(() => import('@/pages/parish/history-page').then((m) => ({ default: m.ParishHistoryPage })))
const ParishCuratesPage = lazy(() => import('@/pages/parish/history-page').then((m) => ({ default: m.ParishCuratesPage })))
const ParishWeeklyPage = lazy(() => import('@/pages/parish/weekly-masses-groups').then((m) => ({ default: m.ParishWeeklyPage })))
const ParishMassesPage = lazy(() => import('@/pages/parish/weekly-masses-groups').then((m) => ({ default: m.ParishMassesPage })))
const ParishGroupsPage = lazy(() => import('@/pages/parish/weekly-masses-groups').then((m) => ({ default: m.ParishGroupsPage })))
const ParishCommissionsPage = lazy(() => import('@/pages/parish/commissions-page').then((m) => ({ default: m.ParishCommissionsPage })))
const EventsAnnouncementsPage = lazy(() => import('@/pages/events/events-pages').then((m) => ({ default: m.EventsAnnouncementsPage })))
const EventsCalendarPage = lazy(() => import('@/pages/events/events-pages').then((m) => ({ default: m.EventsCalendarPage })))
const EventsWorksPage = lazy(() => import('@/pages/events/events-pages').then((m) => ({ default: m.EventsWorksPage })))
const LiturgyCalendarPage = lazy(() => import('@/pages/liturgy/liturgy-pages').then((m) => ({ default: m.LiturgyCalendarPage })))
const LiturgyHomilyPage = lazy(() => import('@/pages/liturgy/liturgy-pages').then((m) => ({ default: m.LiturgyHomilyPage })))
const LiturgyDailyPage = lazy(() => import('@/pages/liturgy/liturgy-pages').then((m) => ({ default: m.LiturgyDailyPage })))
const LiveStreamPage = lazy(() => import('@/pages/live-stream-page').then((m) => ({ default: m.LiveStreamPage })))
const MediaPage = lazy(() => import('@/pages/media-page').then((m) => ({ default: m.MediaPage })))
const DonationsPage = lazy(() => import('@/pages/donations-page').then((m) => ({ default: m.DonationsPage })))
const ChurchSectionPage = lazy(() => import('@/pages/church/church-section-page').then((m) => ({ default: m.ChurchSectionPage })))

function PageLoader() {
  const { t } = useLanguage()
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label={t('common.loading')}>
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent dark:border-gold dark:border-t-transparent" />
    </div>
  )
}

function LegacyRedirect({ from }: { from: string }) {
  const to = legacyRedirects[from]
  return <Navigate to={to ?? '/'} replace />
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route path="notre-paroisse/histoire" element={<ParishHistoryPage />} />
            <Route path="notre-paroisse/cures" element={<ParishCuratesPage />} />
            <Route path="notre-paroisse/annonces-semaine" element={<ParishWeeklyPage />} />
            <Route path="notre-paroisse/messes" element={<ParishMassesPage />} />
            <Route path="notre-paroisse/commissions" element={<ParishCommissionsPage />} />
            <Route path="notre-paroisse/groupes" element={<ParishGroupsPage />} />

            <Route path="evenements/annonces" element={<EventsAnnouncementsPage />} />
            <Route path="evenements/calendrier" element={<EventsCalendarPage />} />
            <Route path="evenements/travaux" element={<EventsWorksPage />} />

            <Route path="liturgie/calendrier" element={<LiturgyCalendarPage />} />
            <Route path="liturgie/homelie" element={<LiturgyHomilyPage />} />
            <Route path="liturgie/parole-saint" element={<LiturgyDailyPage />} />

            <Route path="messe-en-direct" element={<LiveStreamPage />} />
            <Route path="medias" element={<MediaPage />} />
            <Route path="dons" element={<DonationsPage />} />

            <Route path="eglise/:section" element={<ChurchSectionPage />} />
            <Route path="eglise" element={<Navigate to="/eglise/histoire" replace />} />

            <Route path="commissions" element={<LegacyRedirect from="/commissions" />} />
            <Route path="annonces-hebdomadaires" element={<LegacyRedirect from="/annonces-hebdomadaires" />} />
            <Route path="annonces" element={<LegacyRedirect from="/annonces" />} />
            <Route path="contact" element={<LegacyRedirect from="/contact" />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </ThemeProvider>
  )
}
