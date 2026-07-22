import { Link } from 'react-router-dom'
import {
  Bell,
  Church,
  BookOpen,
  Radio,
  Image,
  Cross,
  Phone,
  ChevronRight,
  LayoutGrid,
} from 'lucide-react'
import { SectionHeading, FadeIn } from '@/components/section-heading'
import { siteMenuGroups } from '@/config/navigation'
import { useLanguage } from '@/i18n/language-provider'
import { cn } from '@/lib/utils'

const groupIcons: Record<string, typeof Bell> = {
  'nav.announcements': Bell,
  'nav.parish': Church,
  'nav.liturgy': BookOpen,
  'nav.live': Radio,
  'nav.media': Image,
  'nav.church': Cross,
  'nav.services': Phone,
}

export function HomeExploreSection() {
  const { t } = useLanguage()

  return (
    <section id="explorer" className="section-padding border-t bg-muted/30">
      <div className="container-wide">
        <SectionHeading
          title={t('home.exploreSite')}
          subtitle={t('home.exploreSiteSub')}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteMenuGroups.map((group, i) => {
            const Icon = groupIcons[group.key] ?? LayoutGrid

            return (
              <FadeIn key={group.key} delay={i * 0.04}>
                <article
                  className={cn(
                    'flex h-full flex-col rounded-xl border bg-card p-4 shadow-sm',
                    group.priority && 'border-primary/20 dark:border-gold/20',
                  )}
                >
                  <div className="mb-3 flex items-start gap-3">
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                        group.priority
                          ? 'bg-primary/10 text-primary dark:bg-gold/10 dark:text-gold'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      {group.href ? (
                        <Link
                          to={group.href}
                          className="group/title flex items-center gap-1 text-base font-bold leading-snug hover:text-primary dark:hover:text-gold"
                        >
                          {t(group.key)}
                          <ChevronRight
                            className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover/title:opacity-70"
                            aria-hidden
                          />
                        </Link>
                      ) : (
                        <h3 className="text-base font-bold leading-snug">{t(group.key)}</h3>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-1">
                    {group.children.length > 0 ? (
                      group.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            to={child.href}
                            className="flex min-h-10 items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          >
                            {t(child.key)}
                          </Link>
                        </li>
                      ))
                    ) : group.href ? (
                      <li>
                        <Link
                          to={group.href}
                          className="flex min-h-10 items-center rounded-md px-2 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-accent dark:text-gold"
                        >
                          {t('common.seeAll')}
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
