import { Link } from 'react-router-dom'
import { Bell, Calendar, Radio, BookOpen } from 'lucide-react'
import { FadeIn } from '@/components/section-heading'
import { useLanguage } from '@/i18n/language-provider'

const quickItems = [
  { href: '/notre-paroisse/annonces-semaine', key: 'nav.parish.weekly', icon: Bell },
  { href: '/liturgie/calendrier', key: 'nav.liturgy.calendar', icon: Calendar },
  { href: '/messe-en-direct', key: 'nav.live', icon: Radio },
  { href: '/eglise/histoire', key: 'nav.church', icon: BookOpen },
] as const

export function QuickAccessBar() {
  const { t } = useLanguage()

  return (
    <section className="relative z-20 -mt-10 px-4 md:px-8">
      <div className="container-wide">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickItems.map((link, i) => {
            const Icon = link.icon
            return (
              <FadeIn key={link.key} delay={i * 0.08}>
                <Link to={link.href}>
                  <div className="group flex items-center gap-4 rounded-xl border bg-card p-5 shadow-lg transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-gold/20 group-hover:text-gold dark:text-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="font-semibold text-sm leading-snug">{t(link.key)}</p>
                  </div>
                </Link>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
