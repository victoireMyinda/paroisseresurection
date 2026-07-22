import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { priorityNavLinks, siteMenuGroups } from '@/config/navigation'
import { useLanguage } from '@/i18n/language-provider'
import { Input } from '@/components/ui/input'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

interface SiteMenuProps {
  onNavigate?: () => void
  showSearch?: boolean
  compact?: boolean
}

export function SiteMenu({ onNavigate, showSearch = true, compact = false }: SiteMenuProps) {
  const { t } = useLanguage()
  const location = useLocation()
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()

  const filteredGroups = useMemo(() => {
    if (!normalizedQuery) return siteMenuGroups

    return siteMenuGroups
      .map((group) => {
        const groupLabel = t(group.key).toLowerCase()
        const matchingChildren = group.children.filter((child) =>
          t(child.key).toLowerCase().includes(normalizedQuery),
        )
        const groupMatches = groupLabel.includes(normalizedQuery)

        if (groupMatches) return group
        if (matchingChildren.length > 0) return { ...group, children: matchingChildren }
        return null
      })
      .filter(Boolean) as typeof siteMenuGroups
  }, [normalizedQuery, t])

  const filteredPriority = useMemo(() => {
    if (!normalizedQuery) return priorityNavLinks
    return priorityNavLinks.filter((link) => t(link.key).toLowerCase().includes(normalizedQuery))
  }, [normalizedQuery, t])

  const hasResults = filteredPriority.length > 0 || filteredGroups.length > 0

  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('common.searchSite')}
            className="min-h-11 pl-9"
            aria-label={t('common.searchSite')}
          />
        </div>
      )}

      {!hasResults && (
        <p className="px-1 py-4 text-center text-sm text-muted-foreground">{t('common.noResults')}</p>
      )}

      {filteredPriority.length > 0 && (
        <section aria-labelledby="site-menu-priority">
          <h2
            id="site-menu-priority"
            className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-primary dark:text-gold"
          >
            {t('home.priorityNav')}
          </h2>
          <div className={cn('grid gap-2', compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2')}>
            {filteredPriority.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={onNavigate}
                className={cn(
                  'flex min-h-11 items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive(location.pathname, link.href)
                    ? 'border-primary/30 bg-primary/10 text-primary dark:border-gold/30 dark:bg-gold/10 dark:text-gold'
                    : 'bg-card hover:border-gold/30 hover:bg-accent',
                )}
              >
                {t(link.key)}
                <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
              </Link>
            ))}
          </div>
        </section>
      )}

      {filteredGroups.length > 0 && (
        <section aria-labelledby="site-menu-all">
          <h2
            id="site-menu-all"
            className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {t('home.allSections')}
          </h2>
          <div className="space-y-4">
            {filteredGroups.map((group) => (
              <div key={group.key} className="rounded-xl border bg-card/50 p-3">
                {group.href ? (
                  <Link
                    to={group.href}
                    onClick={onNavigate}
                    className="mb-2 flex min-h-10 items-center gap-1 text-sm font-bold text-foreground hover:text-primary dark:hover:text-gold"
                  >
                    {t(group.key)}
                    <ChevronRight className="h-4 w-4 opacity-60" aria-hidden />
                  </Link>
                ) : (
                  <p className="mb-2 text-sm font-bold text-foreground">{t(group.key)}</p>
                )}
                {group.children.length > 0 ? (
                  <ul className={cn('grid gap-1', compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2')}>
                    {group.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          to={child.href}
                          onClick={onNavigate}
                          className={cn(
                            'flex min-h-10 items-center rounded-md px-2.5 py-2 text-sm transition-colors',
                            isActive(location.pathname, child.href)
                              ? 'bg-accent font-medium text-accent-foreground'
                              : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                          )}
                        >
                          {t(child.key)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : group.href ? (
                  <Link
                    to={group.href}
                    onClick={onNavigate}
                    className="flex min-h-10 items-center text-sm font-medium text-primary hover:underline dark:text-gold"
                  >
                    {t('common.seeAll')}
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
