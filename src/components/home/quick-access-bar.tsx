import { Link } from 'react-router-dom'
import { Bell, Church, Radio, BookOpen, Clock, Phone, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/i18n/language-provider'

const quickItems = [
  { href: '/annonces/semaine', key: 'nav.announcements.weekly', icon: Bell, anchor: false },
  { href: '#notre-paroisse', key: 'nav.parish', icon: Church, anchor: true },
  { href: '/messe-en-direct', key: 'nav.live', icon: Radio, anchor: false },
  { href: '#homelie', key: 'nav.liturgy.homily', icon: BookOpen, anchor: true },
  { href: '#horaires', key: 'nav.parish.masses', icon: Clock, anchor: true },
  { href: '/contact', key: 'nav.contact', icon: Phone, anchor: false },
  { href: '#explorer', key: 'home.exploreSite', icon: LayoutGrid, anchor: true },
] as const

export function QuickAccessBar() {
  const { t } = useLanguage()

  return (
    <section className="relative z-20 -mt-4 px-4 md:-mt-8 md:px-8" aria-label={t('home.quickAccess')}>
      <div className="container-wide">
        <div
          className={cn(
            'flex gap-3 overflow-x-auto pb-1',
            'snap-x snap-mandatory scroll-px-4',
            '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          )}
        >
          {quickItems.map((link) => {
            const Icon = link.icon

            const tile = (
              <div
                className={cn(
                  'flex min-h-12 min-w-[7.5rem] snap-start flex-col items-center justify-center gap-1.5',
                  'rounded-xl border bg-card px-3 py-3 shadow-md transition-colors',
                  'hover:border-gold/40 hover:bg-accent/50 active:scale-[0.98]',
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:text-gold">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <p className="text-center text-xs font-semibold leading-tight">{t(link.key)}</p>
              </div>
            )

            return link.anchor ? (
              <a key={link.key} href={link.href} className="shrink-0">
                {tile}
              </a>
            ) : (
              <Link key={link.key} to={link.href} className="shrink-0">
                {tile}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
