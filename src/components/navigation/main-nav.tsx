import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { mainNavigation } from '@/config/navigation'
import { useLanguage } from '@/i18n/language-provider'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

function isGroupActive(pathname: string, item: (typeof mainNavigation)[number]) {
  if (item.children) return item.children.some((c) => isActive(pathname, c.href))
  return isActive(pathname, item.href)
}

export function MainNav() {
  const { t } = useLanguage()
  const location = useLocation()
  const [openKey, setOpenKey] = useState<string | null>(null)

  return (
    <nav className="hidden items-center gap-0.5 xl:flex" aria-label={t('footer.navigation')}>
      {mainNavigation.map((item) =>
        item.children ? (
          <div
            key={item.key}
            className="relative"
            onMouseEnter={() => setOpenKey(item.key)}
            onMouseLeave={() => setOpenKey(null)}
          >
            <button
              type="button"
              className={cn(
                'flex items-center gap-1 rounded-md px-2.5 py-2 text-sm font-medium transition-colors hover:bg-accent',
                isGroupActive(location.pathname, item)
                  ? 'text-primary dark:text-gold'
                  : 'text-muted-foreground'
              )}
              aria-expanded={openKey === item.key}
            >
              {t(item.key)}
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>
            {openKey === item.key && (
              <div className="absolute left-0 top-full z-50 min-w-[240px] rounded-lg border bg-popover p-2 shadow-lg">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    className={cn(
                      'block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent',
                      isActive(location.pathname, child.href) && 'bg-accent font-medium'
                    )}
                  >
                    {t(child.key)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'rounded-md px-2.5 py-2 text-sm font-medium transition-colors hover:bg-accent',
              isActive(location.pathname, item.href)
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground'
            )}
          >
            {t(item.key)}
          </Link>
        )
      )}
    </nav>
  )
}

export function MobileNav({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useLanguage()
  const location = useLocation()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="space-y-1">
      {mainNavigation.map((item) =>
        item.children ? (
          <div key={item.key}>
            <button
              type="button"
              onClick={() => setExpanded(expanded === item.key ? null : item.key)}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
            >
              {t(item.key)}
              <ChevronDown className={cn('h-4 w-4 transition-transform', expanded === item.key && 'rotate-180')} />
            </button>
            {expanded === item.key && (
              <div className="ml-3 space-y-1 border-l pl-3">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    onClick={onNavigate}
                    className={cn(
                      'block rounded-md px-3 py-2 text-sm',
                      isActive(location.pathname, child.href)
                        ? 'bg-accent font-medium text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent'
                    )}
                  >
                    {t(child.key)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            className={cn(
              'block rounded-md px-3 py-2 text-sm font-medium',
              isActive(location.pathname, item.href)
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent'
            )}
          >
            {t(item.key)}
          </Link>
        )
      )}
    </div>
  )
}
