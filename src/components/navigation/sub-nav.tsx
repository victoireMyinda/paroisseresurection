import { Link, useLocation } from 'react-router-dom'
import type { NavItem } from '@/config/navigation'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/i18n/language-provider'

interface SubNavProps {
  items: NavItem[]
}

export function SubNav({ items }: SubNavProps) {
  const { t } = useLanguage()
  const location = useLocation()

  return (
    <div className="border-b bg-muted/40">
      <div className="container-wide overflow-x-auto px-4 md:px-8">
        <nav className="flex gap-1 py-2" aria-label={t('common.subNavigation')}>
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                location.pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
