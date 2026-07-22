import { Link, useLocation } from 'react-router-dom'
import { Home, Bell, Radio, BookOpen, Menu } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { SiteMenu } from '@/components/navigation/site-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const navItems = [
  { href: '/', key: 'nav.home', icon: Home, match: (path: string) => path === '/' },
  {
    href: '/annonces/semaine',
    key: 'nav.announcements',
    icon: Bell,
    match: (path: string) => path.startsWith('/annonces'),
  },
  {
    href: '/messe-en-direct',
    key: 'nav.live',
    icon: Radio,
    match: (path: string) => path.startsWith('/messe-en-direct'),
    live: true,
  },
  {
    href: '/liturgie/homelie',
    key: 'nav.liturgy',
    icon: BookOpen,
    match: (path: string) => path.startsWith('/liturgie'),
  },
] as const

export function BottomNav() {
  const { t } = useLanguage()
  const location = useLocation()
  const { liveStreamConfig } = useSiteData()
  const [menuOpen, setMenuOpen] = useState(false)
  const isAnyLive = liveStreamConfig.platforms.some((p) => p.isLive)

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/90 md:hidden"
        aria-label={t('footer.navigation')}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <ul className="mx-auto flex max-w-lg items-stretch justify-around">
          {navItems.map(({ href, key, icon: Icon, match, live }) => {
            const active = match(location.pathname)
            const showLiveDot = live && isAnyLive

            return (
              <li key={key} className="flex-1">
                <Link
                  to={href}
                  className={cn(
                    'relative flex min-h-[56px] flex-col items-center justify-center gap-0.5 px-1 py-2 text-[0.6875rem] font-medium transition-colors',
                    active ? 'text-primary' : 'text-muted-foreground',
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="relative">
                    <Icon className="h-5 w-5" aria-hidden />
                    {showLiveDot && (
                      <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
                      </span>
                    )}
                  </span>
                  <span className="max-w-[4.5rem] truncate leading-tight">{t(key)}</span>
                </Link>
              </li>
            )
          })}
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex min-h-[56px] w-full flex-col items-center justify-center gap-0.5 px-1 py-2 text-[0.6875rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
              aria-label={t('common.menu')}
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" aria-hidden />
              <span>{t('common.menu')}</span>
            </button>
          </li>
        </ul>
      </nav>

      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
          <DialogHeader className="shrink-0 border-b px-6 py-4">
            <DialogTitle>{t('home.exploreSite')}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <SiteMenu onNavigate={() => setMenuOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
