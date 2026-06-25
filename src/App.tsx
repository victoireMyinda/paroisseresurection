import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Layout } from '@/components/layout/layout'

const HomePage = lazy(() => import('@/pages/home-page').then((m) => ({ default: m.HomePage })))
const CommissionsPage = lazy(() => import('@/pages/commissions-page').then((m) => ({ default: m.CommissionsPage })))
const WeeklyAnnouncementsPage = lazy(() => import('@/pages/weekly-announcements-page').then((m) => ({ default: m.WeeklyAnnouncementsPage })))
const AnnouncementsPage = lazy(() => import('@/pages/announcements-page').then((m) => ({ default: m.AnnouncementsPage })))
const DonationsPage = lazy(() => import('@/pages/donations-page').then((m) => ({ default: m.DonationsPage })))
const MediaPage = lazy(() => import('@/pages/media-page').then((m) => ({ default: m.MediaPage })))
const ContactPage = lazy(() => import('@/pages/contact-page').then((m) => ({ default: m.ContactPage })))

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Chargement">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent dark:border-gold dark:border-t-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="commissions" element={<CommissionsPage />} />
              <Route path="annonces-hebdomadaires" element={<WeeklyAnnouncementsPage />} />
              <Route path="annonces" element={<AnnouncementsPage />} />
              <Route path="dons" element={<DonationsPage />} />
              <Route path="medias" element={<MediaPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}
