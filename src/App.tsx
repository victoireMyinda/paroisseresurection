import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteDataProvider, useSiteData } from '@/contexts/site-data-provider'
import { LanguageProvider, useLanguage } from '@/i18n/language-provider'
import { Layout } from '@/components/layout/layout'
import { legacyRedirects } from '@/config/navigation'
import { DonationsPage } from './pages/donations-page'

const HomePage = lazy(() => import('@/pages/home-page').then((m) => ({ default: m.HomePage })))
const ParishHistoryPage = lazy(() => import('@/pages/parish/history-page').then((m) => ({ default: m.ParishHistoryPage })))
const ParishCuratesPage = lazy(() => import('@/pages/parish/history-page').then((m) => ({ default: m.ParishCuratesPage })))
const ParishMassesPage = lazy(() => import('@/pages/parish/weekly-masses-groups').then((m) => ({ default: m.ParishMassesPage })))
const ParishGroupsPage = lazy(() => import('@/pages/parish/weekly-masses-groups').then((m) => ({ default: m.ParishGroupsPage })))
const ParishCommissionsPage = lazy(() => import('@/pages/parish/commissions-page').then((m) => ({ default: m.ParishCommissionsPage })))
const AnnouncementsWeeklyPage = lazy(() =>
  import('@/pages/announcements/announcements-pages').then((m) => ({ default: m.AnnouncementsWeeklyPage })),
)
const AnnouncementsAllPage = lazy(() =>
  import('@/pages/announcements/announcements-pages').then((m) => ({ default: m.AnnouncementsAllPage })),
)
const AnnouncementWeeklyDetailPage = lazy(() =>
  import('@/pages/announcements/announcement-detail-page').then((m) => ({ default: m.AnnouncementWeeklyDetailPage })),
)
const AnnouncementAllDetailPage = lazy(() =>
  import('@/pages/announcements/announcement-detail-page').then((m) => ({ default: m.AnnouncementAllDetailPage })),
)
const LiturgyCalendarPage = lazy(() => import('@/pages/liturgy/liturgy-pages').then((m) => ({ default: m.LiturgyCalendarPage })))
const LiturgyHomilyPage = lazy(() => import('@/pages/liturgy/liturgy-pages').then((m) => ({ default: m.LiturgyHomilyPage })))
const LiturgyDailyPage = lazy(() => import('@/pages/liturgy/liturgy-pages').then((m) => ({ default: m.LiturgyDailyPage })))
const LiveStreamPage = lazy(() => import('@/pages/live-stream-page').then((m) => ({ default: m.LiveStreamPage })))
const MediaPage = lazy(() => import('@/pages/media-page').then((m) => ({ default: m.MediaPage })))
// Désactivé temporairement — relance prévue
// const DonationsPage = lazy(() => import('@/pages/donations-page').then((m) => ({ default: m.DonationsPage })))
const ContactPage = lazy(() => import('@/pages/contact-page').then((m) => ({ default: m.ContactPage })))
const VisitsHoursPage = lazy(() => import('@/pages/visits-hours-page').then((m) => ({ default: m.VisitsHoursPage })))
const ChurchSectionPage = lazy(() => import('@/pages/church/church-section-page').then((m) => ({ default: m.ChurchSectionPage })))

function PageLoader() {
  const { t } = useLanguage()
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label={t('common.loading')}>
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

function LegacyRedirect({ from }: { from: string }) {
  const to = legacyRedirects[from]
  return <Navigate to={to ?? '/'} replace />
}

function FirebaseGate({ children }: { children: ReactNode }) {
  const { ready, configured } = useSiteData()
  const { t } = useLanguage()

  if (configured && !ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background" role="status">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  if (!configured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="max-w-md text-center text-sm text-muted-foreground">
          Configuration Firebase manquante. Définissez les variables VITE_FIREBASE_* dans frontuser/.env
          (même projet que frontadmin).
        </p>
      </div>
    )
  }

  return children
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
            <Route path="notre-paroisse/annonces-semaine" element={<LegacyRedirect from="/notre-paroisse/annonces-semaine" />} />
            <Route path="notre-paroisse/messes" element={<ParishMassesPage />} />
            <Route path="notre-paroisse/commissions" element={<ParishCommissionsPage />} />
            <Route path="notre-paroisse/groupes" element={<ParishGroupsPage />} />
            <Route path="visites-horaires" element={<VisitsHoursPage />} />

            <Route path="annonces/semaine" element={<AnnouncementsWeeklyPage />} />
            <Route path="annonces/semaine/:id" element={<AnnouncementWeeklyDetailPage />} />
            <Route path="annonces/toutes" element={<AnnouncementsAllPage />} />
            <Route path="annonces/toutes/:id" element={<AnnouncementAllDetailPage />} />
            <Route path="annonces" element={<Navigate to="/annonces/toutes" replace />} />

            <Route path="evenements/annonces" element={<LegacyRedirect from="/evenements/annonces" />} />
            <Route path="evenements/calendrier" element={<LegacyRedirect from="/evenements/calendrier" />} />
            <Route path="evenements/travaux" element={<LegacyRedirect from="/evenements/travaux" />} />
            <Route path="evenements/*" element={<Navigate to="/annonces/toutes" replace />} />

            <Route path="liturgie/calendrier" element={<LiturgyCalendarPage />} />
            <Route path="liturgie/homelie" element={<LiturgyHomilyPage />} />
            <Route path="liturgie/parole-saint" element={<LiturgyDailyPage />} />

            <Route path="messe-en-direct" element={<LiveStreamPage />} />
            <Route path="medias" element={<MediaPage />} />
            <Route path="dons" element={<DonationsPage />} /> 
            <Route path="contact" element={<ContactPage />} />

            <Route path="eglise/:section" element={<ChurchSectionPage />} />
            <Route path="eglise" element={<Navigate to="/eglise/histoire" replace />} />

            <Route path="commissions" element={<LegacyRedirect from="/commissions" />} />
            <Route path="annonces-hebdomadaires" element={<LegacyRedirect from="/annonces-hebdomadaires" />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <SiteDataProvider>
        <LanguageProvider>
          <FirebaseGate>
            <AppRoutes />
          </FirebaseGate>
        </LanguageProvider>
      </SiteDataProvider>
    </ThemeProvider>
  )
}
