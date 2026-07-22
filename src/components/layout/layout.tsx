import { Outlet } from 'react-router-dom'
import { TopBar } from '@/components/layout/top-bar'
import { Header, Footer } from '@/components/layout/header-footer'
import { BottomNav } from '@/components/navigation/bottom-nav'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { ScrollToTop } from '@/components/scroll-to-top'
import { PageViewTracker } from '@/components/page-view-tracker'
import { useLanguage } from '@/i18n/language-provider'

export function Layout() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t('common.skipToContent')}
      </a>
      <TopBar />
      <Header />
      <PageViewTracker />
      <main id="main-content" className="flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  )
}
